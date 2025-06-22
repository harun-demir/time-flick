import { useState } from "react";
import "./App.css";
import "./index.css";
import logo from "./assets/logo.png";
import logoMini from "./assets/logo-mini.png";
import { AzureOpenAI } from "openai";
import { Input } from "./components/Input";
import commits from './data/commits.json';
import issues from './data/issues.json';
import meetings from './data/meetings.json';

const SYSTEM_PROMPT = `
You are a time management assistant. You have access to the user's commit history, issues, and meeting data. For each day:
- Match commits to issues and determine which issue was worked on each day.
- Ask the user for the total hours spent per day/issue and help them fill out a timesheet.
- If the user requests, summarize what was accomplished in the sprint.
- For meetings (except daily), round up the meeting duration to the nearest hour and add it to the timesheet as effort.
- Guide the user with questions to fill in missing information and generate reports as needed.

Here is the user's data:
COMMITS: ${JSON.stringify(commits)}
ISSUES: ${JSON.stringify(issues)}
MEETINGS: ${JSON.stringify(meetings)}
`;

function App() {
  const [messages, setMessages] = useState<{ role: string, content: string }[]>([]);
  const [userInput, setUserInput] = useState<string>("");

  const func = async (userMessage: string) => {
    const endpoint = "https://hdem-mc68m1xm-eastus2.cognitiveservices.azure.com/";
    const modelName = "gpt-4.1";
    const deployment = "gpt-4.1-2025";
    const apiKey = "AcqPCyQMc6imX8aMEhtYimKpFEgaIcg7zW6DFYqpjjd6fBd9jJkQJQQJ99BFACHYHv6XJ3w3AAAAACOGHEXq";
    const apiVersion = "2024-04-01-preview";
    const options = { endpoint, apiKey, deployment, apiVersion, dangerouslyAllowBrowser: true }

    const client = new AzureOpenAI(options);

    const responseStream = await client.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage }
      ],
      stream: true,
      max_completion_tokens: 800,
      temperature: 1,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      model: modelName
    });

    let accumulatedContent = "";

    for await (const chunk of responseStream) {
      const content = chunk.choices[0]?.delta?.content || "";
      accumulatedContent += content;
    }

    setMessages(prevMessages => [...prevMessages, { role: "assistant", content: accumulatedContent }]);
  }

  const handleButtonClick = (buttonText: string) => {
    setMessages(prevMessages => [...prevMessages, { role: "user", content: buttonText }]);
    func(buttonText);
  };

  const handleSend = () => {
    if (userInput.trim()) {
      setMessages(prevMessages => [...prevMessages, { role: "user", content: userInput }]);
      func(userInput);
      setUserInput("");
    }
  };

  return (
    <div style={{
      backgroundColor: '#0c1a2e',
      backgroundImage: `url('/src/assets/bg.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: 'white',
      minHeight: '100vh',
      width: '100vw',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Fixed Header */}
      <header style={{
        width: '100%',
        minHeight: '67px',
        maxHeight: '67px',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 24px',
        backgroundColor: "black"
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={logo} alt="Time Flick Logo" style={{ height: '2.5rem' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{
            height: '40px',
            width: '40px',
            borderRadius: '50%',
            backgroundColor: '#ef4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold'
          }}>
            U
          </div>
        </div>
      </header>

      {/* Main Content: Scrollable Chat Area */}
      <div style={{
        position: 'absolute',
        top: 67 + 50, // header height + top margin
        left: 0,
        right: 0,
        bottom: 80 + 50, // input height + bottom margin
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        background: 'transparent',
      }}>
        <div style={{
          width: '55vw',
          margin: '0 auto',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {messages.length === 0 ? (
            // Initial view with logo and buttons
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: '1 1 0%', gap: '0.75rem', padding: '1.5rem' }}>
              <img src={logoMini} alt="Time Flick Logo" style={{ height: '3rem' }} />
              <div style={{ fontSize: '28px', fontWeight: 500, color: 'white' }}>Ne planlamak istersin?</div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <button onClick={() => handleButtonClick("Bu haftayı oluştur")} style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.5)', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer' }}>Bu haftayı oluştur</button>
                <button onClick={() => handleButtonClick("Geçen haftayı kopyala")} style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.5)', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer' }}>Geçen haftayı kopyala</button>
                <button onClick={() => handleButtonClick("Taskları göster")} style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.5)', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer' }}>Taskları göster</button>
                <button onClick={() => handleButtonClick("Toplantılardan efor oluştur")} style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.5)', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer' }}>Toplantılardan efor oluştur</button>
                <button onClick={() => handleButtonClick("Eksik girişleri göster")} style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.5)', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer' }}>Eksik girişleri göster</button>
              </div>
            </div>
          ) : (
            // Chat view
            <div style={{ flex: '1 1 0%', padding: '1rem', display: 'flex', flexDirection: 'column' }}>
              {messages.map((message, index) => {
                const messageContainerStyle: React.CSSProperties = {
                  display: 'flex',
                  justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                  width: '100%',
                  marginBottom: '1rem'
                };

                const messageStyle: React.CSSProperties = {
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  maxWidth: '75%',
                  backgroundColor: message.role === "user" ? '#3b82f6' : '#374151',
                  color: 'white',
                };

                return (
                  <div key={index} style={messageContainerStyle}>
                    <div style={messageStyle}>
                      <p style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{message.content}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Fixed   Input Area */}
      <div style={{
        position: 'fixed',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: 0,
        zIndex: 10,
        padding: '1rem',
        width: '55vw',
        boxSizing: 'border-box',
      }}>
        <Input
          input={userInput}
          setInput={setUserInput}
          onSend={handleSend}
          loading={false}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
      </div>
    </div>
  );
}

export default App;
