"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// Calls our own Next.js API route — avoids CORS entirely
// The API route proxies to n8n on the server side
const CHAT_API = "/api/chat";

function getSessionId() {
  if (typeof window === "undefined") return "ssr";
  let id = sessionStorage.getItem("es_chat_session");
  if (!id) {
    id = `session_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    sessionStorage.setItem("es_chat_session", id);
  }
  return id;
}

const GREETING: Message = {
  id: "greeting",
  role: "assistant",
  content:
    "Welcome to Ethereal Sanctum. I'm Lumina, your personal sanctuary guide. ✨\n\nI'm here to help you discover the perfect treatment and reserve your experience. What brings you to the sanctum today?",
  timestamp: new Date(),
};

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => getSessionId());
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const sendMessage = useCallback(async (overrideText?: string) => {
    const text = (overrideText ?? input).trim();
    if (!text || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(CHAT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, sessionId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `Server error ${res.status}`);
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            data.reply ||
            "I apologize — something went awry in the sanctum. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } catch (err: any) {
      // Show the real error so user can diagnose
      const msg =
        err.message?.includes("fetch")
          ? "Cannot reach the server. Make sure n8n is running and your workflow is active."
          : err.message || "Unknown error. Please try again.";

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: `⚠️ ${msg}`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, sessionId]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating toggle button */}
      <motion.button
        className="fixed bottom-8 right-8 z-[90] w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary shadow-2xl flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setOpen((v) => !v)}
        transition={{ type: "spring", stiffness: 400, damping: 18 }}
        style={{ boxShadow: "0 0 32px rgba(230,213,180,0.25)" }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              className="material-symbols-outlined text-2xl"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              close
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              className="material-symbols-outlined text-2xl"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              chat_bubble
            </motion.span>
          )}
        </AnimatePresence>

        {!open && (
          <motion.div
            className="absolute inset-0 rounded-full border border-primary/40"
            animate={{ scale: [1, 1.5, 1.5], opacity: [0.6, 0, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-28 right-8 z-[90] w-[min(420px,calc(100vw-2rem))] h-[600px] bg-surface-container-low border border-outline-variant/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
            style={{
              boxShadow:
                "0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(230,213,180,0.08)",
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-4 px-6 py-5 border-b border-outline-variant/20 bg-surface-container-lowest flex-shrink-0">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-primary text-lg">
                    auto_awesome
                  </span>
                </div>
                <motion.div
                  className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-secondary border-2 border-surface-container-lowest"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div>
                <p className="text-primary font-headline text-lg leading-none">
                  Lumina
                </p>
                <p className="text-on-surface-variant text-[10px] tracking-widest uppercase mt-0.5">
                  Sanctuary Guide · Online
                </p>
              </div>
              <button
                className="ml-auto text-on-surface-variant hover:text-primary transition-colors"
                onClick={() => setOpen(false)}
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  className={`flex gap-3 ${
                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/30 to-primary-container/30 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="material-symbols-outlined text-primary text-xs">
                        auto_awesome
                      </span>
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm font-light leading-relaxed whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-primary text-on-primary rounded-tr-sm"
                        : "bg-surface-container-high text-on-surface rounded-tl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {loading && (
                  <motion.div
                    className="flex gap-3 items-end"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/30 to-primary-container/30 border border-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-primary text-xs">
                        auto_awesome
                      </span>
                    </div>
                    <div className="bg-surface-container-high px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1.5 items-center">
                      {[0, 0.2, 0.4].map((delay, i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-primary/60"
                          animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
                          transition={{
                            duration: 0.8,
                            delay,
                            repeat: Infinity,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={bottomRef} />
            </div>

            {/* Quick replies — only on first message */}
            {messages.length === 1 && (
              <motion.div
                className="px-5 pb-3 flex flex-wrap gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {[
                  "What treatments do you offer?",
                  "I need relaxation",
                  "Book Serenova Ritual",
                  "What's your most popular?",
                ].map((suggestion) => (
                  <motion.button
                    key={suggestion}
                    className="px-3 py-1.5 rounded-full border border-primary/20 text-primary text-[10px] tracking-widest uppercase hover:bg-primary/10 transition-colors duration-200"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => sendMessage(suggestion)}
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </motion.div>
            )}

            {/* Input */}
            <div className="px-5 py-4 border-t border-outline-variant/20 flex-shrink-0 bg-surface-container-lowest">
              <div className="flex items-center gap-3 bg-surface-container rounded-full px-5 py-3 border border-outline-variant/20 focus-within:border-primary/40 transition-colors duration-300">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask Lumina anything…"
                  disabled={loading}
                  className="flex-1 bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none disabled:opacity-50"
                />
                <motion.button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || loading}
                  className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 disabled:opacity-30"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                >
                  <span className="material-symbols-outlined text-on-primary text-sm">
                    arrow_upward
                  </span>
                </motion.button>
              </div>
              <p className="text-center text-[9px] text-on-surface-variant/40 tracking-widest uppercase mt-3">
                Powered by Ethereal Sanctum AI
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}