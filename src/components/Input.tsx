import React from "react";

interface InputProps {
  input: string;
  setInput: (value: string) => void;
  onSend: () => void;
  loading: boolean;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const Input = ({ input, setInput, onSend, loading, onKeyDown }: InputProps) => {

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      backgroundColor: 'black',
      borderRadius: '0.5rem',
      border: '1px solid #4b5563'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '0.5rem 1rem' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          style={{
            flexGrow: 1,
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            color: 'white',
            fontSize: '1rem'
          }}
          placeholder="Type anything you want..."
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <select style={{
            backgroundColor: 'transparent',
            color: 'white',
            border: 'none',
            outline: 'none'
          }}>
            <option value="gpt-4.1">GPT 4.1</option>
            <option value="gpt-3.5-turbo">GPT 3.5 Turbo</option>
          </select>
          <button
            onClick={onSend}
            disabled={loading}
            style={{
              backgroundColor: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" viewBox="0 0 16 16">
              <path d="M15.854 8.354a.5.5 0 0 0 0-.708l-7-7a.5.5 0 0 0-.708.708L14.293 8l-6.147 6.146a.5.5 0 0 0 .708.708l7-7z"/>
              <path d="M1 8a.5.5 0 0 1 .5-.5H15a.5.5 0 0 1 0 1H1.5A.5.5 0 0 1 1 8z"/>
            </svg>
          </button>
        </div>
      </div>
      <div style={{
        padding: '0.5rem 1rem'
      }}>
        <button style={{
          backgroundColor: 'transparent',
          border: '1px solid #4b5563',
          borderRadius: '0.25rem',
          color: 'white',
          padding: '0.25rem 0.5rem'
        }}>
          + Doküman Yükle
        </button>
      </div>
    </div>
  );
};
