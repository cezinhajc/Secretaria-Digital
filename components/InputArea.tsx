import React, { useState, useRef, useEffect } from 'react';

interface InputAreaProps {
  onSend: (text: string) => void;
  isLoading: boolean;
  isCentered?: boolean;
}

export const InputArea: React.FC<InputAreaProps> = ({ onSend, isLoading, isCentered = false }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (input.trim() && !isLoading) {
      onSend(input.trim());
      setInput('');
      // Reset height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [input]);

  return (
    <div className={`w-full max-w-3xl mx-auto transition-all duration-500 ease-in-out ${isCentered ? '' : ''}`}>
      <div className={`relative group bg-[#1e1f20] rounded-[28px] border border-gray-700 hover:border-gray-600 focus-within:border-gray-500 focus-within:bg-[#252627] transition-colors shadow-lg`}>
        <div className="flex items-end p-2 md:p-3">
          
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Pergunte alguma coisa"
            disabled={isLoading}
            rows={1}
            className="flex-1 max-h-[150px] bg-transparent text-gray-100 placeholder-gray-500 px-4 py-3 focus:outline-none resize-none overflow-y-auto text-base custom-scrollbar"
            autoFocus
          />

          <div className="flex pb-1 pr-1 gap-1">
             {/* Mic Icon (Decorative) */}
            <button className="p-2 rounded-full text-gray-400 hover:text-gray-100 transition-colors hover:bg-gray-700/30">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
              </svg>
            </button>
            
            {/* Send Button */}
            <button 
              onClick={handleSubmit}
              disabled={!input.trim() || isLoading}
              className={`p-2 rounded-full transition-all duration-200 
                ${input.trim() && !isLoading 
                  ? 'bg-blue-600 text-white hover:bg-blue-500' 
                  : 'bg-transparent text-gray-500 cursor-not-allowed'}`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-0.5" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.126A59.768 59.768 0 0 1 21.485 12 59.77 59.77 0 0 1 3.27 20.876L5.999 12Zm0 0h7.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="text-center mt-2">
        <p className="text-[10px] md:text-xs text-gray-500">SimpIA pode cometer erros. Verifique informações importantes.</p>
      </div>
    </div>
  );
};