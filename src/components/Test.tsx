import { AzureOpenAI } from "openai";
import { Input } from "./Input"; // Ensure Input is imported

interface TestProps {
    messages: { role: string, content: string }[];
    setMessages: React.Dispatch<React.SetStateAction<{ role: string, content: string }[]>>;
    userInput: string;
    setUserInput: React.Dispatch<React.SetStateAction<string>>;
}

export const Test = ({ messages, setMessages, userInput, setUserInput }: TestProps) => {
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
                { role: "system", content: "You are a helpful assistant." },
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

    const handleSend = () => {
        if (userInput.trim()) {
            setMessages(prevMessages => [...prevMessages, { role: "user", content: userInput }]);
            func(userInput);
            setUserInput("");
        }
    };

    return (
        <div className="flex flex-col h-screen max-w-lg mx-auto border border-gray-300 rounded-lg overflow-hidden">
            <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`mb-2 p-2 rounded-lg max-w-xs ${message.role === "user" ? "bg-blue-200 self-end" : "bg-red-200 self-start"}`}
                    >
                        <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                ))}
            </div>
            <div className="flex p-4 bg-white border-t border-gray-300">
                <Input
                    input={userInput}
                    setInput={setUserInput}
                    onSend={handleSend}
                    loading={false}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
            </div>
        </div>
    )
}
