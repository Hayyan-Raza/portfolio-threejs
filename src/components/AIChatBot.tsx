import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, Brain, ArrowDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  role: "user" | "bot";
  content: string;
}

const STARTER_PROMPTS = [
  "What is Hayyan's experience with n8n?",
  "Tell me about his Shopify automation projects.",
  "Can he build custom autonomous AI agents?",
  "Is Hayyan looking for full-time roles or client work?",
];

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content: `Hello! I am **Hayyan's Virtual Assistant Clone**. ⚡

I have been trained on Hayyan's expertise, timeline, projects, and specializations. Ask me anything about his technical stack, n8n automations, Shopify integrations, or availability for projects!`,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role === "user" ? "user" : "assistant",
            content: m.content,
          })),
        }),
      });

      const data = await response.json();
      if (response.ok && data.content) {
        setMessages((prev) => [...prev, { role: "bot", content: data.content }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            content: "I encountered a minor lag while syncing my neural nodes. Could we try again in a few seconds?",
          },
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: "Oops! My offline backup took over. It seems there was a network error. Let me know if there's anything else you'd like to ask!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Bubble */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          id="chat-toggle-btn"
          aria-label="Toggle AI Chat"
          className="relative group p-4 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 text-white shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          {/* Pulsing glow boundary */}
          <span className="absolute inset-0 rounded-full bg-indigo-500/30 animate-ping group-hover:animate-none pointer-events-none" />
          {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </button>
      </div>

      {/* Slide-out Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            id="ai-chat-panel"
            className="fixed bottom-24 right-4 md:right-6 z-50 w-[92vw] sm:w-[410px] h-[550px] rounded-2xl border border-zinc-800 bg-zinc-950/90 text-white shadow-2xl backdrop-blur-xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-purple-950 flex items-center justify-center border border-purple-500/30 text-purple-400">
                    <Brain className="w-5 h-5 animate-pulse" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-zinc-950" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold tracking-tight text-white flex items-center gap-1.5">
                    Hayyan.AI Agent <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                  </h4>
                  <p className="text-[10px] text-zinc-400 font-mono">MODEL: GEMINI-3.5-FLASH</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-sm scrollbar-thin scrollbar-thumb-zinc-800">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-tr-none"
                        : "bg-zinc-900 text-zinc-300 rounded-tl-none border border-zinc-800"
                    }`}
                  >
                    {/* Render basic markdown bold styling */}
                    <div className="leading-relaxed whitespace-pre-line text-sm break-words">
                      {msg.content.split("**").map((part, i) =>
                        i % 2 === 1 ? <strong key={i} className="text-white font-semibold">{part}</strong> : part
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl rounded-tl-none px-4 py-3 text-zinc-400 flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Starter Suggestion Prompts */}
            {messages.length === 1 && (
              <div className="p-3 bg-zinc-900/30 border-t border-zinc-900 space-y-1.5">
                <p className="text-[10px] text-zinc-400 uppercase font-mono px-1">Suggested Questions:</p>
                <div className="flex flex-wrap gap-1.5">
                  {STARTER_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(prompt)}
                      className="text-left text-xs bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white px-2.5 py-1.5 rounded-lg border border-zinc-800/80 transition"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Message Input Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-3 border-t border-zinc-800 bg-zinc-950 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about my n8n, AI agents, or projects..."
                className="flex-1 bg-zinc-900 rounded-xl px-4 py-2.5 text-sm text-white border border-zinc-850 focus:outline-none focus:border-purple-500/80 focus:ring-1 focus:ring-purple-500/50 placeholder-zinc-500 transition"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || loading}
                className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white transition flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
