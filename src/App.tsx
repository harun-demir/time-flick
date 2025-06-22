import { useState, useRef, useEffect } from "react";
import "./App.css";
import "./index.css";
import logo from "./assets/logo.png";
import logoMini from "./assets/logo-mini.png";
import { Input } from "./components/Input";

function App() {
  // Mesajlar: { sender: 'user' | 'ai', text: string }
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Merhaba! Size nasıl yardımcı olabilirim?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);
    // Dummy AI cevabı (gerçek API ile değiştirilebilir)
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        {
          sender: "ai",
          text: "AI: Şu anda demo modundayım. Gerçek cevap için API entegrasyonu ekleyebilirsiniz.",
        },
      ]);
      setLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="min-h-screen ">
      <header className="w-full bg-[black] min-h-[70px] flex items-center shadow-md mb-8">
        <div className="max-w-[900px] w-full mx-auto flex items-center h-[70px]">
          <img src={logo} alt="Time Flick Logo" className="h-10 ml-2" />
        </div>
      </header>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-70px)]">
        <div className="w-full max-w-[900px] min-h-[600px] rounded-2xl shadow-lg p-10 flex flex-col gap-6">
          <div className="flex flex-col items-center gap-3">
            <img src={logoMini} width={58} />
            <div className="text-[white] text-[20px] font-regular">Ne yapmak istersiniz?</div>
            <div className="text-[white] text-[20px] font-regular">Ne yapmak istersiniz?</div>
          </div>
          <div className="flex-1 min-h-[400px] max-h-[500px] overflow-y-auto p-6 mb-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                } my-3`}
              >
                <div
                  className={`${
                    msg.sender === "user"
                      ? "bg-indigo-500 text-white rounded-[18px_18px_6px_18px] shadow-indigo-200"
                      : "bg-[#e3e7ef] text-[#222] rounded-[18px_18px_18px_6px] shadow-[#e3e7ef44]"
                  } px-6 py-3 max-w-[60%] text-[17px] break-words`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start my-3">
                <div className="bg-[#e3e7ef] text-[#222] rounded-[18px_18px_18px_6px] px-6 py-3 text-[17px] max-w-[60%]">
                  <span className="opacity-60">Yazıyor...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <Input 
            input={input}
            setInput={setInput}
            onSend={handleSend}
            loading={loading}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
