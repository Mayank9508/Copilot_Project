import { useState, useRef } from "react";
import { Plus, Monitor, Terminal, Cloud, Send } from "lucide-react";

const ChatPanel = () => {
  const textareaRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);

  // 🔥 Auto height logic
  const handleChange = (e) => {
    setInput(e.target.value);

    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";

    const maxHeight = 120;

    if (el.scrollHeight > maxHeight) {
      el.style.height = maxHeight + "px";
      el.style.overflowY = "auto";
    } else {
      el.style.height = el.scrollHeight + "px";
      el.style.overflowY = "hidden";
    }
  };

  // ✅ Send message
  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([...messages, { role: "user", text: input }]);
    setInput("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  return (
    <div className="w-80 bg-[#252526] border-l border-gray-700 flex flex-col text-white">
      
      {/* HEADER */}
      <div className="p-2 border-b border-gray-700 text-sm">
        CHAT
      </div>

      {/* MESSAGES */}
      <div className="flex-1 p-2 overflow-y-auto text-sm space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded text-xs ${
              msg.role === "user"
                ? "bg-[#0e639c] text-right"
                : "bg-gray-700"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {messages.length === 0 && (
          <p className="text-gray-400 text-xs">
            Start a conversation...
          </p>
        )}
      </div>

      {/* INPUT AREA */}
      <div className="p-2 border-t border-gray-700">
        <div className="flex flex-col gap-2">

          {/* TEXTAREA WRAPPER */}
          <div className="relative">
            
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleChange}
              rows={1}
              placeholder="Ask AI..."
              className="w-full bg-gray-800 p-2 pr-10 text-xs rounded resize-none outline-none transition-all duration-100"
            />

            {/* ✅ SEND BUTTON INSIDE (same theme) */}
            <button
              onClick={handleSend}
              className="absolute bottom-1.5 right-3 bg-gray-700 p-1 rounded hover:bg-gray-600"
            >
              <Send size={14} />
            </button>
          </div>

          {/* PLUS BUTTON */}
          <div className="flex justify-start relative">
            <button
              onClick={() => setOpenDropdown(!openDropdown)}
              className="bg-gray-700 px-2 py-1 rounded hover:bg-gray-600"
            >
              <Plus size={14} />
            </button>

            {/* DROPDOWN */}
            {openDropdown && (
              <div className="absolute bottom-8 left-0 w-64 bg-[#2d2d2d] border border-gray-600 rounded shadow-lg text-xs z-50">
                
                <div className="p-2 border-b border-gray-600 flex justify-between">
                  <span className="flex items-center gap-1">
                    <Plus size={14} /> New Chat Session
                  </span>
                  <span className="text-gray-400">Ctrl+N</span>
                </div>

                <div className="p-2 text-gray-400">
                  Continue In
                </div>

                <div className="px-2 pb-2 space-y-1">
                  <div className="flex items-center gap-2 hover:bg-gray-700 p-1 rounded cursor-pointer">
                    <Monitor size={14} /> Local
                  </div>

                  <div className="flex items-center gap-2 hover:bg-gray-700 p-1 rounded cursor-pointer">
                    <Terminal size={14} /> Copilot CLI
                  </div>

                  <div className="flex items-center gap-2 hover:bg-gray-700 p-1 rounded cursor-pointer">
                    <Cloud size={14} /> Cloud
                  </div>
                </div>

                <div className="p-2 border-t border-gray-600 text-center hover:bg-gray-700 cursor-pointer">
                  Learn about agent handoff...
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ChatPanel;