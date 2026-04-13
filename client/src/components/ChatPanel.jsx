import { useState, useRef } from "react";
import { Plus, Send } from "lucide-react";

// ✅ SERVICES
import { askGemini, askHuggingFace } from "../sevices/ai/index.js";

const ChatPanel = () => {
  const textareaRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedAI, setSelectedAI] = useState("gemini");

  const [loading, setLoading] = useState(false);

  //  Auto height
  const handleChange = (e) => {
    setInput(e.target.value);

    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  };

  // TYPEWRITER FUNCTION
  const typeMessage = (text) => {
    let index = 0;

    const interval = setInterval(() => {
      setMessages((prev) => {
        const last = prev[prev.length - 1];

        if (last && last.role === "ai" && last.typing) {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...last,
            text: text.slice(0, index + 1),
          };
          return updated;
        }

        return prev;
      });

      index++;

      if (index >= text.length) {
        clearInterval(interval);

        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          updated[updated.length - 1] = {
            ...last,
            typing: false,
          };
          return updated;
        });
      }
    }, 20);
  };

  // ✅ SEND MESSAGE
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      let res;

      if (selectedAI === "gemini") {
        res = await askGemini(input);
      } else {
        res = await askHuggingFace(input);
      }

      const finalText = res?.response || "No response";

      setMessages((prev) => [...prev, { role: "ai", text: "", typing: true }]);

      setLoading(false);

      typeMessage(finalText);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Error fetching AI response" },
      ]);

      setLoading(false);
    }
  };

  return (
    <div className="w-80 bg-[#252526] border-l border-gray-700 flex flex-col text-white">
      {/* HEADER */}
      <div className="p-2 border-b border-gray-700 text-sm">
        CHAT ({selectedAI.toUpperCase()})
      </div>

      {/* ✅ बस यहाँ class add ki hai */}
      <div className="flex-1 p-2 overflow-y-auto text-sm space-y-2 chat-scroll">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded text-xs max-w-[80%] ${
              msg.role === "user"
                ? "bg-[#0e639c] ml-auto text-right"
                : "bg-[#3c3c3c] mr-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className="bg-[#3c3c3c] mr-auto p-2 rounded text-xs w-fit flex gap-1">
            <span className="animate-bounce">.</span>
            <span className="animate-bounce delay-150">.</span>
            <span className="animate-bounce delay-300">.</span>
          </div>
        )}
      </div>

      {/* INPUT */}
      <div className="p-2 border-t border-gray-700">
        <div className="flex flex-col gap-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleChange}
            rows={1}
            placeholder="Ask AI..."
            className="w-full bg-gray-800 p-2 text-xs rounded resize-none outline-none"
          />

          <div className="flex justify-between relative">
            <button
              onClick={() => setOpenDropdown(!openDropdown)}
              className="bg-gray-700 px-2 py-1 rounded"
            >
              <Plus size={14} />
            </button>

            <button onClick={handleSend} className="bg-gray-700 p-1 rounded">
              <Send size={14} />
            </button>

            {openDropdown && (
              <div className="absolute bottom-8 left-0 w-40 bg-[#2d2d2d] border border-gray-600 rounded text-xs z-50">
                <div
                  className="p-2 hover:bg-gray-700 cursor-pointer"
                  onClick={() => {
                    setSelectedAI("gemini");
                    setOpenDropdown(false);
                  }}
                >
                  Gemini
                </div>

                <div
                  className="p-2 hover:bg-gray-700 cursor-pointer"
                  onClick={() => {
                    setSelectedAI("zia");
                    setOpenDropdown(false);
                  }}
                >
                  Zia (HuggingFace)
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
