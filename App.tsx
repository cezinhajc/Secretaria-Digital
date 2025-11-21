import React, { useState, useEffect, useRef } from 'react';
import { Logo } from './components/Logo';
import { MessageBubble } from './components/MessageBubble';
import { InputArea } from './components/InputArea';
import { LoadingDots } from './components/LoadingDots';
import { sendMessageToWebhook } from './services/api';
import { Message } from './types';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const responseText = await sendMessageToWebhook(text);
      
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: responseText,
        timestamp: Date.now(),
      };
      
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: "Desculpe, não consegui conectar com o servidor. Por favor, tente novamente.",
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const isChatEmpty = messages.length === 0;

  return (
    <div className="flex flex-col h-screen bg-[#131314] text-white overflow-hidden relative selection:bg-blue-500/30">
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto w-full custom-scrollbar relative flex flex-col">
        
        {/* Header (Scrolls with content) */}
        <header className="w-full p-4 md:p-6 flex-shrink-0">
          <div className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity cursor-default w-fit">
            <Logo className="w-8 h-8 md:w-10 md:h-10" />
            <div className="hidden md:block">
              <h1 className="text-sm font-medium text-gray-200 tracking-wide">Secretaria Digital</h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">A.R.L.S. Harmonia e Luz Nº 27</p>
            </div>
          </div>
        </header>

        {!isChatEmpty && (
          // Chat History
          <div className="flex-1 w-full max-w-3xl mx-auto px-4 pb-4">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            {isLoading && <LoadingDots />}
            <div ref={messagesEndRef} className="h-4" />
          </div>
        )}
      </main>

      {/* Input Footer */}
      <footer className={`w-full p-4 md:pb-6 md:pt-2 bg-gradient-to-t from-[#131314] via-[#131314] to-transparent z-20 flex flex-col items-center ${isChatEmpty ? 'absolute bottom-[35vh] md:bottom-[25vh]' : 'sticky bottom-0'}`}>
        
        {isChatEmpty && (
          <div className="w-full max-w-3xl flex flex-col items-center mb-8 animate-fade-in">
             <div className="mb-6 transform transition-all duration-700 hover:scale-105">
                <Logo className="w-20 h-20 md:w-24 md:h-24 opacity-90" />
             </div>
             <h2 className="text-2xl md:text-4xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-100 via-white to-gray-300 text-center tracking-tight">
               Secretaria digital, como posso ajudar?
             </h2>
          </div>
        )}

        <InputArea 
          onSend={handleSend} 
          isLoading={isLoading} 
          isCentered={isChatEmpty}
        />
      </footer>
    </div>
  );
};

export default App;