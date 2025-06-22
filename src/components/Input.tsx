import React from "react";

interface InputProps {
  input: string;
  setInput: (value: string) => void;
  onSend: () => void;
  loading: boolean;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onIconClick: () => void;
}

export const Input = ({ input, setInput, onSend, loading, onKeyDown, onIconClick }: InputProps) => {

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
        <textarea
          value={input}
          rows={4}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          style={{
            flexGrow: 1,
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            color: 'white',
            fontSize: '1rem',
            resize: 'none'
          }}
          placeholder="Type anything you want..."
        ></textarea>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                     <i className="material-symbols-outlined" style={{ cursor: 'pointer' }} onClick={onIconClick}>auto_awesome_mosaic</i>
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
             <i className="material-symbols-outlined">send</i>
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
