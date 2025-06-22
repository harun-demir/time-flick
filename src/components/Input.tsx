import { TkButton } from "@takeoff-ui/react";

interface InputProps {
  input: string;
  setInput: (value: string) => void;
  onSend: () => void;
  loading: boolean;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const Input = ({ input, setInput, onSend, loading, onKeyDown }: InputProps) => {
  return (
    <div className="flex gap-3">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Mesajınızı yazın..."
        className="flex-1 p-4 rounded-lg border border-gray-300 text-[17px] focus:outline-none focus:ring-2 focus:ring-indigo-400"
        disabled={loading}
        autoFocus
      />
      <TkButton 
        icon="send" 
        variant="white" 
        type="outlined" 
        onClick={onSend}
        disabled={loading || !input.trim()}
      />
    </div>
  );
};
