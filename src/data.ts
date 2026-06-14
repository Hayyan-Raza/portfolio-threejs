import { Specialization, SkillCategory, Project, ExperienceEvent, Service, Stat, TimelineNode } from "./types";

export const HAYYAN_BIO = {
  name: "Hayyan",
  roles: ["AI Automation Developer", "Software Engineer", "Full Stack Developer"],
  tagline: "Building AI Agents, Automations & Software That Scale",
  subheading: "I help businesses automate operations, connect systems, and build intelligent solutions using AI, n8n, APIs, and custom software.",
  aboutText: "I am a multi-disciplinary software engineer specializing in autonomous AI agent networks, enterprise workflow automation (n8n, APIs), and high-performance full stake development. With roots in multiplayer game engineering (Unity, C#) and modern web stacks, I craft elegant, bullet-proof solutions that eliminate manual friction, slash operating costs, and empower modern workplaces to scale intelligently.",
};

export const SPECIALIZATIONS: Specialization[] = [
  {
    title: "AI Agents",
    icon: "Cpu",
    description: "Multi-agent autonomous networks, prompt engineering, self-correcting task routing, and semantic retrieval systems."
  },
  {
    title: "n8n Automation",
    icon: "Network",
    description: "Designing corporate pipelines, custom nodes, parallel workflow paths, and secure webhook triggers."
  },
  {
    title: "Shopify Automation",
    icon: "ShoppingBag",
    description: "Automating inventory sync, real-time merchant accounting logs, webhook captures, and multi-currency orders."
  },
  {
    title: "Google Apps Script",
    icon: "FileCode",
    description: "Automating Gmail, Sheets, Calendar, Slides, and Drive integrations without high hosting overheads."
  },
  {
    title: "Custom Software",
    icon: "Code",
    description: "Tailoring high-performance software applications in TypeScript, React, Node.js, and server environments."
  },
  {
    title: "Game Dev (Unity)",
    icon: "Gamepad2",
    description: "Engineering real-time physics, optimized multi-user matchmakers, gameplay systems, and C# structures."
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: "AI & Automation",
    skills: [
      { name: "n8n", level: 95 },
      { name: "AI Agents & Autonomous Loops", level: 90 },
      { name: "LLM Eng (Gemini, Claude, GPT)", level: 92 },
      { name: "Prompt Engineering & RAG", level: 95 },
      { name: "Flowise & LangChain", level: 85 },
      { name: "Google Apps Script", level: 90 }
    ]
  },
  {
    name: "Development",
    skills: [
      { name: "JavaScript / ES6+", level: 95 },
      { name: "TypeScript", level: 92 },
      { name: "React / Vite", level: 90 },
      { name: "Node.js / Express", level: 90 },
      { name: "REST & GraphQL APIs", level: 95 },
      { name: "HTML5 / Tailwind CSS", level: 93 }
    ]
  },
  {
    name: "Cloud & Databases",
    skills: [
      { name: "Supabase", level: 88 },
      { name: "PostgreSQL", level: 85 },
      { name: "Firebase", level: 90 },
      { name: "Cloud Run / Docker", level: 82 },
      { name: "Webhooks & PubSub", level: 92 }
    ]
  },
  {
    name: "Game Development",
    skills: [
      { name: "Unity", level: 85 },
      { name: "C# Scripting", level: 88 },
      { name: "Multiplayer WebSockets", level: 82 },
      { name: "Physics & Gameplay Logic", level: 90 }
    ]
  }
];

export const TIMELINE_NODES: TimelineNode[] = [
  {
    id: "step-1",
    title: "Student Developer",
    subtitle: "The Ignition Phase",
    period: "2018 - 2020",
    description: "Self-taught foundations of Javascript, C++, algorithms, and modular logic. Built browser projects, automation scripts, and classic terminal games.",
    icon: "GraduationCap"
  },
  {
    id: "step-2",
    title: "Unity Game Developer",
    subtitle: "Complex Systems & Physics Mastery",
    period: "2020 - 2022",
    description: "Architected multiplayer lobbies, physics-driven mechanics, state-machines, and real-time multiplayer integrations inside the Unity 3D engine in C#.",
    icon: "Gamepad2"
  },
  {
    id: "step-3",
    title: "Software Engineer",
    subtitle: "Enterprise Applications & High-Performance Backends",
    period: "2022 - 2024",
    description: "Pivoted to web technology, leading database schemas, advanced Node/Express APIs, cloud services, and responsive glassmorphic frontend dashboards.",
    icon: "LaptopCode"
  },
  {
    id: "step-4",
    title: "Automation Specialist",
    subtitle: "SaaS & Workflow Orchestration",
    period: "2024 - 2025",
    description: "Mastered n8n pipelines, Google Apps Scripting, API webhooks, and third-party synchronizations. Eliminated manual bottleneck for global business clients.",
    icon: "Zap"
  },
  {
    id: "step-5",
    title: "AI Agent Builder",
    subtitle: "Next-Gen Autonomous Agentic Systems",
    period: "2025 - Present",
    description: "Spearheading multi-model integrations, agentic workflow chains, RAG vector context feeding, and autonomous systems solving corporate operations.",
    icon: "Brain"
  }
];

export const PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "Shopify Sales Report Generation Automation",
    description: "Built a Shopify sales reporting automation that eliminates manual effort of generating sales reports, processing enormous data payloads via n8n.",
    details: "Eliminates 80% manual effort by generating metrics and exporting percentages into Airtable. Connects with Shopify GraphQL and Klaviyo API to process over 50MB of order data exceeding typical n8n limits. Dynamically normalizes currencies to USD and merges sales across all regional stores.",
    tech: ["n8n", "Shopify API", "Airtable", "Klaviyo API"],
    category: "AI & Automation",
    githubUrl: "#",
    liveUrl: "#",
    image: "/screenshots/Main Shopify workflow that calls yoy and monthly workflows this workflow is triggered by a n8n form which then generates a sheet which contains all 6 stores combined yoy and monthl sheet in a google sheet.png"
  },
  {
    id: "proj-2",
    title: "Retell.ai Sales Lead Generator",
    description: "AI calling agent integrated into scheduling workflows to qualify and generate more leads automatically.",
    details: "An automated lead generation AI calling agent using Retell.ai. Handles inbound/outbound calls to check available slots, create calendar appointments dynamically, and follow up with booking emails.",
    tech: ["Retell.ai", "AI Agents", "Webhooks", "GHL"],
    category: "AI & Automation",
    githubUrl: "#",
    liveUrl: "#",
    image: "/screenshots/GHL Calendar & Contacts + Retell AI Calling Agent Lead inbound and outbound.png"
  },
  {
    id: "proj-3",
    title: "Monday.com CRM Activity Sync",
    description: "Real-time pipeline sync to track and log leads instantly from Salesforce to Monday.com.",
    details: "Synchronizes activity history and lead progression automatically from Salesforce CRM into Monday.com pipelines whenever specific events (like checking an 'Add to Monday Pipeline' box) occur, completely removing manual import tasks.",
    tech: ["Monday.com API", "Salesforce", "n8n", "CRM Integration"],
    category: "Web & Cloud",
    githubUrl: "#",
    liveUrl: "#",
    image: "/screenshots/Sales force to monday lead sync .png"
  },
  {
    id: "proj-4",
    title: "Whatsapp AI Assistant",
    description: "AI Agent that answers FAQs with organization context and provides custom schedule reminders.",
    details: "A customer-facing WhatsApp bot that reads internal organization context to answer queries. Includes a chron-based automation to send daily itineraries and personalized schedule reminders to whitelisted users.",
    tech: ["WhatsApp API", "AI Agents", "LLM Context", "n8n"],
    category: "AI & Automation",
    githubUrl: "#",
    liveUrl: "#",
    image: "/screenshots/Whatsapp bot for a local school.jpg"
  },
  {
    id: "proj-5",
    title: "Vapi AI Voice Agent",
    description: "Auto Retail Lead Capture Agent capable of carrying out natural conversations to collect and log customer intents.",
    details: "An interactive voice AI agent deployed using the Vapi dashboard. Designed to handle incoming customer calls, parse structured output from conversational data, and automatically schedule Google Calendar events without human intervention.",
    tech: ["Vapi", "Voice AI", "Google Calendar API", "Structured Output"],
    category: "AI & Automation",
    githubUrl: "#",
    liveUrl: "#",
    image: "/screenshots/vapi-dashboard calling agent .png"
  },
  {
    id: "proj-6",
    title: "AuroraSolar to PandaDoc Automation",
    description: "Streamlines the leap from Solar Design to Legal Contract Generation automatically via Webhooks.",
    details: "An 11-step automation that syncs project data and design specs directly from Aurora Solar into PandaDoc. Automatically extracts battery info, extracts pricing modules, and generates a ready-to-sign PDF contract payload.",
    tech: ["Webhooks", "AuroraSolar API", "PandaDoc API", "Data Transformation"],
    category: "AI & Automation",
    githubUrl: "#",
    liveUrl: "#",
    image: "/screenshots/Aurora solar to panda doc contract automation .png"
  },
  {
    id: "proj-7",
    title: "Hermes – Autonomous OpenClaw COO",
    description: "An AI-driven Chief Operating Officer powered by OpenClaw framework and Claude 3.5 Haiku.",
    details: "Eliminates manual administrative bottlenecks by directly operating within a secure terminal environment. Interacts with HubSpot and ManyChat, runs web scrapers via Playwright to fetch meeting data, and executes daily pulse report cron jobs via Slack.",
    tech: ["OpenClaw", "Claude 3.5 Haiku", "Playwright", "HubSpot", "Slack API"],
    category: "AI & Automation",
    githubUrl: "#",
    liveUrl: "#",
    image: "/screenshots/Hermes - openclaw coo agent getting and analyzing data from themochiapp.png"
  },
  {
    id: "proj-8",
    title: "Article Generation Pipeline | Claude 3.5 Opus",
    description: "Multi-stage semantic pipeline for researching, writing, validating, and publishing structured SEO articles.",
    details: "Orchestrates Deep Research steps, AI generation via Claude Opus, self-assessment validation against formatting rules, and constructs a JSON output before automatically pushing the final formatted document to Google Drive/Docs.",
    tech: ["Claude Opus", "Content Pipeline", "Google Docs API", "n8n"],
    category: "AI & Automation",
    githubUrl: "#",
    liveUrl: "#",
    image: "/screenshots/GEO AI AGENT WITH CLAUDE API ARTICLE WRITER THEN CREATS GOOGLE DOC .png"
  }
];

export const EXPERIENCE_TIMELINE: ExperienceEvent[] = [
  {
    year: "2024 - Present",
    role: "Lead AI & Automation Architect",
    company: "Freelance / Consultancies",
    description: "Architecting bespoke, production-ready AI agents and high-throughput automations for international businesses, streamlining core operation centers.",
    achievements: [
      "Designed and optimized over 350 active workflow pipelines, slashing administrative support response latency by 85%.",
      "Engineered automated Shopify accounting workflows handling over $200k in monthly transactional value.",
      "Trained custom semantic search vectors providing contextual intelligence to customer agents safely."
    ]
  },
  {
    year: "2022 - 2024",
    role: "Senior Software & Automation Engineer",
    company: "SaaS Dev Agencies",
    description: "Engineered and maintained high-scale web platforms, custom database backends, and multi-service API architectures.",
    achievements: [
      "Built resilient REST/GraphQL APIs and integrated multi-currency payment gates handling enterprise volumes.",
      "Crafted sleek, responsive, glassmorphic admin dashboards allowing internal staff to view diagnostic workflow logs in real-time.",
      "Integrated complex CRM databases, syncing leads, deal valuations, and cold email workflows dynamically."
    ]
  },
  {
    year: "2020 - 2022",
    role: "Unity Gameplay & Systems Engineer",
    company: "Game Studios & Indie Teams",
    description: "Focused on high-performance multiplayer mechanics, rigid-body physics, rigid optimization patterns, and core C# script designs.",
    achievements: [
      "Created multiplayer matchmakers handling lobbies, master-server syncing, and dynamic netcode latency offsets.",
      "Optimized scene loading memory profiles, enhancing mobile frame render rates from 30 FPS to constant 60 FPS.",
      "Programmed structured, modular object pooling and visual effects pipelines."
    ]
  }
];

export const SERVICES: Service[] = [
  {
    title: "AI Agent Development",
    description: "Deploy custom agent groups that think, plan, look up context, and call API operations autonomously with precise guardrails.",
    icon: "BrainCircuit",
    features: ["Autonomous Multi-Agent Networks", "RAG & Vector Knowledge Integration", "AI-Powered Customer Support & Email Vetting", "Lead Scoring and Auto-Qualification"]
  },
  {
    title: "Workflow Automation",
    description: "Form secure, parallel corporate pipelines connecting cloud tools, processing background data, and running custom logic.",
    icon: "Workflow",
    features: ["n8n High-Scale Pipeline Architecture", "Google Apps Script Serverless Solutions", "Webhooks, API Integrations, Web Scrapers", "Automated Slack, Email, and WhatsApp Briefs"]
  },
  {
    title: "Shopify Automation",
    description: "Automate merchant operations, sync multibrand inventories, update bookkeeping ledgers, and match transactional refunds.",
    icon: "Layers",
    features: ["Real-time Bookkeeping & Syncs (Stripe, QuickBooks)", "Supplier Stock balancing & Auto-updates", "Custom Checkout webhooks & lead syncs", "Product data feed and category optimization"]
  },
  {
    title: "Custom Software Dev",
    description: "Get beautiful, state-of-the-art administrative dashboards and backends structured with premium interface layouts.",
    icon: "Terminal",
    features: ["Modern React & Node Fullstack Architecture", "Interactive glassmorphic data visualizers", "Robust database structures (PostgreSQL, Supabase)", "Role-based privileges & multi-user platforms"]
  },
  {
    title: "API Integrations",
    description: "Seamlessly bind any modern platforms or old service databases together with secure authorization and error recovery.",
    icon: "Puzzle",
    features: ["Stripe / PayPal Payment Integrations", "Salesforce, CRM, and HubSpot auto-logs", "Scheduled batch data migrations", "Custom REST, GraphQL, and SDK connectors"]
  },
  {
    title: "Interactive Game Engineering",
    description: "Professional C# scripts, state-machines, physics, multiplayer net lobby, and game development inside Unity.",
    icon: "Sparkles",
    features: ["Unity Gameplay Core & Network Systems", "Cross-platform mobile and desktop exports", "Object pooling & structured memory performance", "Matchmaking & real-time server synchronizations"]
  }
];

export const STATISTICS: Stat[] = [
  {
    label: "Projects Completed",
    value: "20+",
    sub: "Delivered successfully"
  },
  {
    label: "Hours Automated",
    value: "6,000+",
    sub: "Saved for business owners"
  },
  {
    label: "Workflows Built",
    value: "50+",
    sub: "Currently active"
  },
  {
    label: "Clients Served",
    value: "10+",
    sub: "Startups and companies"
  }
];



export const SCREENSHOT_GALLERY = [
  {
    id: "gallery-1",
    title: "Aurora solar to panda doc contract automation ",
    image: "/screenshots/Aurora solar to panda doc contract automation .png"
  },
  {
    id: "gallery-2",
    title: "Daily pulse report generate by hermes coo openclaw using avoma and other apis",
    image: "/screenshots/Daily pulse report generate by hermes coo openclaw using avoma and other apis.png"
  },
  {
    id: "gallery-3",
    title: "fetch products and sync updates of products from xorosoft crm to google sheet ",
    image: "/screenshots/fetch products and sync updates of products from xorosoft crm to google sheet .png"
  },
  {
    id: "gallery-4",
    title: "Generated Daily Reports in Drive Folder",
    image: "/screenshots/Generated Daily Reports in Drive Folder.png"
  },
  {
    id: "gallery-5",
    title: "GEO AI AGENT WITH CLAUDE API ARTICLE WRITER THEN CREATS GOOGLE DOC ",
    image: "/screenshots/GEO AI AGENT WITH CLAUDE API ARTICLE WRITER THEN CREATS GOOGLE DOC .png"
  },
  {
    id: "gallery-6",
    title: "GHL Calendar & Contacts + Retell AI Calling Agent Lead inbound and outbound",
    image: "/screenshots/GHL Calendar & Contacts + Retell AI Calling Agent Lead inbound and outbound.png"
  },
  {
    id: "gallery-7",
    title: "Hermes - openclaw coo agent getting and analyzing data from themochiapp",
    image: "/screenshots/Hermes - openclaw coo agent getting and analyzing data from themochiapp.png"
  },
  {
    id: "gallery-8",
    title: "Main Shopify workflow that calls yoy and monthly workflows this workflow is triggered by a n8n form which then generates a sheet which contains all 6 stores combined yoy and monthl sheet in a google sheet",
    image: "/screenshots/Main Shopify workflow that calls yoy and monthly workflows this workflow is triggered by a n8n form which then generates a sheet which contains all 6 stores combined yoy and monthl sheet in a google sheet.png"
  },
  {
    id: "gallery-9",
    title: "Monthly Report Generation - generates report of las 90 days financial data",
    image: "/screenshots/Monthly Report Generation - generates report of las 90 days financial data.png"
  },
  {
    id: "gallery-10",
    title: "Monthly Report Trigger Form",
    image: "/screenshots/Monthly Report Trigger Form.png"
  },
  {
    id: "gallery-11",
    title: "PipeDrive",
    image: "/screenshots/PipeDrive.png"
  },
  {
    id: "gallery-12",
    title: "Sales force to monday lead sync ",
    image: "/screenshots/Sales force to monday lead sync .png"
  },
  {
    id: "gallery-13",
    title: "Sales Force to monday update lead source label in monday board on lead created in monday event automation is an n8n workflow triggered by monday.com event automation uses a webhook",
    image: "/screenshots/Sales Force to monday update lead source label in monday board on lead created in monday event automation is an n8n workflow triggered by monday.com event automation uses a webhook.png"
  },
  {
    id: "gallery-14",
    title: "Setting prompt in retell dashboard for lead Agent GHL",
    image: "/screenshots/Setting prompt in retell dashboard for lead Agent GHL.png"
  },
  {
    id: "gallery-15",
    title: "Shopify Bulk Operations Graphql api to fetch product statues of thousands of items",
    image: "/screenshots/Shopify Bulk Operations Graphql api to fetch product statues of thousands of items.png"
  },
  {
    id: "gallery-16",
    title: "Shopify Daily Financial and Inventory Report Generator",
    image: "/screenshots/Shopify Daily Financial and Inventory Report Generator.png"
  },
  {
    id: "gallery-17",
    title: "Shopify Daily Report Ouput 12k rows sheet",
    image: "/screenshots/Shopify Daily Report Ouput 12k rows sheet.png"
  },
  {
    id: "gallery-18",
    title: "Shopify Refunds Credit Notes Generation shopify to IX",
    image: "/screenshots/Shopify Refunds Credit Notes Generation shopify to IX.png"
  },
  {
    id: "gallery-19",
    title: "Shopify to Invoice Express  Orders Invoice Generation ",
    image: "/screenshots/Shopify to Invoice Express  Orders Invoice Generation .png"
  },
  {
    id: "gallery-20",
    title: "Shopify Year over Year report ",
    image: "/screenshots/Shopify Year over Year report .png"
  },
  {
    id: "gallery-21",
    title: "shopify YOY report output",
    image: "/screenshots/shopify YOY report output.png"
  },
  {
    id: "gallery-22",
    title: "Shpify monthly report output",
    image: "/screenshots/Shpify monthly report output.png"
  },
  {
    id: "gallery-23",
    title: "vapi-dashboard calling agent ",
    image: "/screenshots/vapi-dashboard calling agent .png"
  },
  {
    id: "gallery-24",
    title: "whatsapp bot for a local school image 2",
    image: "/screenshots/whatsapp bot for a local school image 2.jpg"
  },
  {
    id: "gallery-25",
    title: "Whatsapp bot for a local school",
    image: "/screenshots/Whatsapp bot for a local school.jpg"
  },
  {
    id: "gallery-26",
    title: "Whop Payment Data analyzed by hermes coo openclaw agent",
    image: "/screenshots/Whop Payment Data analyzed by hermes coo openclaw agent.png"
  },
  {
    id: "gallery-27",
    title: "WixForms Lead Capture + Calendly",
    image: "/screenshots/WixForms Lead Capture + Calendly.png"
  },
  {
    id: "gallery-28",
    title: "Xoro Product Data Synced Sheet updated every 2min by automation",
    image: "/screenshots/Xoro Product Data Synced Sheet updated every 2min by automation.png"
  },
];
