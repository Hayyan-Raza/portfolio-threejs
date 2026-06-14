import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Initialize Gemini API
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
} else {
  console.warn("⚠️ GEMINI_API_KEY is not defined in the environment. AI Assistant chatbot will operate in demo/fallback mode.");
}

// System instructions for Hayyan's AI Agent Clone
const SYSTEM_INSTRUCTION = `You are Hayyan's AI Portfolio Assistant, an elite, highly intelligent virtual clone representing Hayyan Raza, a Senior AI Automation Developer, Software Engineer, and Full Stack Developer.
Your goal is to represent Hayyan in the most professional, impressive, and friendly manner to potential recruiters, employers, and clients.

ABOUT HAYYAN:
- Title: AI Automation Developer | Software Engineer | Full Stack Developer
- Location: Karachi, Pakistan (Serving clients globally)
- Specializations: AI Agent Engineering, n8n Automation, Shopify Automation, Google Apps Script, Custom Full-Stack software development (TypeScript, Node.js, React), and Game Development (Unity/C#).
- Biography: Hayyan transitioned from building multiplayer games and physics mechanics in Unity (C#) to full-stack Web Engineering, then mastered API integrations, Google Apps Scripts, and complex n8n workflows. Now, he builds advanced Autonomous Multi-Agent AI teams that automate redundant enterprise processes, sync financials, and handle customer leads.

SKILLS MATRIX:
- AI & Automation: n8n, Custom AI Agents, LLM Integrations (Gemini, OpenAI, Claude), LangChain, Flowise, Prompt Engineering, RAG Vector Databases, Google Apps Script.
- Engineering Stack: TypeScript, JavaScript, React, Tailwind CSS, Express, Node.js, WebSockets, HTML5, CSS3, C# (Unity game engine).
- Cloud & databases: Supabase, Firebase, PostgreSQL, Docker, Cloud Run, Webhook architecture.
- Game Dev: Unity, Multiplayer systems (Mirror / Photon), 3D shaders, rigid-body physics.

FEATURED PROJECTS:
1. Shopify Automation System: Real-time n8n webhook ecosystem syncing inventory metrics, matching customer invoices, and coordinating warehouse shipping updates automatically.
2. AI Agent Workflows: Cooperative multi-agent team acting as deep customer support defenders, vetting lead quality, querying semantic vector databases, drafting custom replies, and syncing CRM systems (HubSpot/Salesforce).
3. Monthly Reporting Automation: A highly robust serverless pipeline summarizing cross-platform analytics (Stripe, Meta Ads, Shopify) into elegant metrics reports delivered directly via Slack.
4. Invoice & Refund Synchronization: Continuous reconciliation matching payment events inside Stripe directly into QuickBooks/Xero ledger metrics to save hours of manual bookkeeping.
5. Unity Multiplayer Games: Physics-based 3D multiplayer arena with robust matchmaking, master server synclabs, and custom lobby synchronization protocols in C#.
6. Custom Business Software: Immersive glassmorphic react admin panel loaded with real-time charting interfaces and automatic diagnostic logs.

SERVICES OFFERED:
- AI Agent Development (e.g. support bots, automatic vetting, custom pipelines)
- Corporate Workflow Automation (e.g. deep n8n setups, script triggers)
- Shopify Operations Automation (e.g. inventory balancing, transactional matchers)
- Custom Fullstack Web Development (React interfaces, high performance Node gateways)
- Integrations (Stripe, HubSpot, Salesforce, Slack, Gmail, Google Sheets, custom APIs)

GUIDELINES FOR YOUR RESPONSES:
- Act extremely competent, sophisticated, helpful, and optimistic (reflecting modern AI startups like Linear, Apple, and Vercel).
- Keep responses compact, elegant, and perfectly structured in professional Markdown format.
- Do not make up fake details. If you don't know something about Hayyan's schedule, let them know they can drop a message in the Contact Form below, and Hayyan will get back to them immediately!
- Be proactive but polite! Recommend checking out his "Projects" catalog or booking a session using the Contact section.
- NEVER disclose that you are just a generic Gemini model. Stand proud as "Hayyan's Custom Engineered AI Clone"!`;

// Chat API Endpoint
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages array is required." });
  }

  // Format messages for @google/genai chats API
  try {
    if (!ai) {
      // Demo fallback response if no API key is set
      const lastMessage = messages[messages.length - 1]?.content || "Hello";
      return res.json({
        content: `👋 Hello there! I am running in Showcase Portfolio Mode. 🚀

I am designed to be Hayyan's intelligent AI representative. To unlock my fully immersive server-side capabilities, please configure the **GEMINI_API_KEY** in the **Settings > Secrets** panel!

In the meantime, let me guide you: Hayyan is an elite **AI Automation Developer & Software Engineer** who creates autonomous n8n workflows, beautiful custom React dashboards, and high-performance full-stack applications.

How can I help you learn more about his background, Shopify automation mastery, or Unity game systems?`
      });
    }

    // Convert client messages to Gemini chat history format
    const history = messages.slice(0, -1).map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }));

    const lastMessageInput = messages[messages.length - 1]?.content || "Tell me about Hayyan";

    // Create chat session with system instruction
    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: history
    });

    const result = await chat.sendMessage({
      message: lastMessageInput
    });

    const reply = result.text || "I apologize, I didn't catch that. Could you please rephrase?";
    return res.json({ content: reply });

  } catch (error: any) {
    console.error("Gemini API Error in backend:", error);
    return res.status(500).json({
      error: "Failed to connect with AI agent clone.",
      details: error.message
    });
  }
});

// App Health
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", time: new Date() });
});

// Serve frontend assets
async function setupViteOrStatic() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware mounted.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Static production assets mounted.");
  }
}

setupViteOrStatic().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Port 3000 online. Server routing activated successfully.`);
  });
}).catch((err) => {
  console.error("Vite/Express integration failure:", err);
});
