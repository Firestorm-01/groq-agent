// GroqAgentApp.jsx
import React, { useEffect, useRef, useState } from "react";
import "./index.css"; // make sure Tailwind is imported

function getInitialApiKey() {
  try {
    if (typeof process !== "undefined" && process && process.env && process.env.REACT_APP_GROQ_API_KEY) {
      return process.env.REACT_APP_GROQ_API_KEY;
    }
  } catch (e) {}
  try {
    if (typeof window !== "undefined") {
      if (window.__REACT_APP_GROQ_API_KEY) return window.__REACT_APP_GROQ_API_KEY;
      if (window.__GROQ_API_KEY) return window.__GROQ_API_KEY;
    }
  } catch (e) {}
  return "";
}

export default function GroqAgentApp() {
  const initialKey = getInitialApiKey();
  const [apiKey, setApiKey] = useState(initialKey);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const promptRef = useRef(null);

  useEffect(() => {
    promptRef.current?.focus();
    if (typeof window !== "undefined" && window.location.search.includes("test=1")) {
      injectTestMessages();
    }
  }, []);

  const groqEndpoint = "https://api.groq.com/openai/v1/chat/completions";

  const sendPrompt = async () => {
    setError("");
    const text = (prompt || "").trim();
    if (!text) return;
    if (!apiKey) {
      setError("Missing Groq API key. Paste it in the box or use a backend proxy.");
      return;
    }

    setMessages((m) => [...m, { role: "user", content: text }]);
    setPrompt("");
    setLoading(true);

    try {
      const body = {
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [{ role: "user", content: [{ type: "text", text }] }],
        temperature: 0.2,
        max_tokens: 1024,
      };

      const res = await fetch(groqEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + apiKey,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error("API Error: " + res.status + " " + errText);
      }

      const data = await res.json();

      let assistantContent = "";
      try {
        const choice = data?.choices?.[0];
        const content = choice?.message?.content || choice?.content || choice?.text;
        if (!content) assistantContent = JSON.stringify(choice || data);
        else if (Array.isArray(content))
          assistantContent = content.map((c) => (typeof c === "string" ? c : c.text || JSON.stringify(c))).join("\n");
        else if (typeof content === "string") assistantContent = content;
        else assistantContent = content.text || JSON.stringify(content);
      } catch (e) {
        assistantContent = JSON.stringify(data);
      }

      setMessages((m) => [...m, { role: "assistant", content: assistantContent }]);
    } catch (err) {
      console.error(err);
      setError(String(err.message || err));
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) sendPrompt();
  };

  const injectTestMessages = () => {
    const tests = [
      { role: "user", content: "Explain gradient descent in simple terms." },
      { role: "assistant", content: "Gradient descent is an optimization algorithm that... (test)" },
      { role: "user", content: "Provide a 3-line Python example for linear regression." },
      { role: "assistant", content: "import numpy as np\nfrom sklearn.linear_model import LinearRegression\n... (test)" },
    ];
    setMessages((m) => [...m, ...tests]);
  };

  const joinClasses = (arr) => arr.filter(Boolean).join(" ");
  const usingBuildKey = Boolean(initialKey);

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-b from-[#071428] to-[#05162a] p-6">
      <div className="flex flex-col w-full max-w-2xl bg-[linear-gradient(135deg,#061E2B,#052A33)] rounded-2xl shadow-2xl ring-1 ring-white/5 p-6 backdrop-blur h-full">

        {/* Header */}
        <header className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D2C2] to-[#0066FF] flex items-center justify-center text-white font-bold shadow-md">GQ</div>
            <div>
              <h1 className="text-white text-lg font-semibold">Groq Agent — AI/ML Specialist</h1>
              <p className="text-slate-300 text-sm">Type a prompt below. Press Ctrl/Cmd+Enter to submit.</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-300">Theme</div>
            <div className="text-sm font-medium text-white">Groq-style</div>
          </div>
        </header>

        {/* API Key Input */}
        <div className="mb-4 flex gap-3 items-center">
          <input
            aria-label="Groq API Key"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder={usingBuildKey ? "Using build-time API key (hidden)" : "Paste Groq API key here (for dev only)"}
            className="flex-1 bg-transparent border border-white/10 rounded-md px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <button onClick={() => setApiKey("")} className="text-xs px-3 py-2 rounded-md bg-white/5 text-white/90 hover:bg-white/10">Clear</button>
        </div>

        {/* Messages + Prompt */}
       <div className="flex flex-col flex-1 min-h-0">
          {/* Messages */}
          <div className="flex-1 overflow-auto min-h-0 rounded-xl border border-white/5 p-4 bg-gradient-to-b from-[#021016]/40 to-transparent">
            {messages.length === 0 && (
              <div className="text-center text-slate-400 italic">No conversation yet — ask a question to start.</div>
            )}
            <div className="flex flex-col gap-4">
              {messages.map((m, i) => {
                const messageClass = m.role === "user" ? "self-end bg-white/5" : "self-start bg-white/6";
                const classes = joinClasses(["p-3", "rounded-lg", messageClass]);
                return (
                  <div key={i} className={classes}>
                    <div className="text-xs text-slate-300 mb-1">{m.role.toUpperCase()}</div>
                    <div className="whitespace-pre-wrap text-sm text-white">{m.content}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Prompt input */}
          <div className="mt-3 flex flex-col gap-2">
            <textarea
              ref={promptRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask the agent about AI/ML, data engineering, deployment, or general queries..."
              rows={4}
              className="w-full rounded-xl bg-black/30 border border-white/5 p-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none"
            />
            <div className="flex justify-end gap-2">
              <button onClick={sendPrompt} disabled={loading} className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#00D2C2] to-[#0066FF] text-black font-semibold hover:opacity-95 disabled:opacity-50">
                {loading ? "Thinking..." : "Send"}
              </button>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && <div className="mt-4 text-sm text-red-400">{error}</div>}

        {/* Footer */}
        <footer className="mt-4 text-center text-xs text-slate-500">
          Built for Groq integration • Model: meta-llama/llama-4-scout-17b-16e-instruct
        </footer>

        {/* Dev/Test Buttons */}
        <div className="mt-4 flex gap-2">
          <button onClick={injectTestMessages} className="text-xs px-3 py-2 rounded-md bg-white/5 text-white/90 hover:bg-white/10">
            Inject test messages
          </button>
        </div>
      </div>
    </div>
  );
}
