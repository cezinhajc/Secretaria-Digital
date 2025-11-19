import React from 'react';
import { Message, Sender } from '../types';
import { Logo } from './Logo';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full mb-6 animate-fade-in ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[85%] md:max-w-[75%] ${isUser ? 'flex-row-reverse' : 'flex-row'} gap-4`}>
        
        {/* Avatar */}
        <div className="flex-shrink-0 mt-1">
          {isUser ? (
            <div className="w-8 h-8 rounded-full bg-gray-700 text-gray-200 flex items-center justify-center text-xs font-bold shadow-sm">
              V
            </div>
          ) : (
            <Logo className="w-8 h-8" />
          )}
        </div>

        {/* Content */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <span className="text-xs text-gray-400 mb-1 ml-1 mr-1">
            {isUser ? Sender.User : Sender.AI}
          </span>
          
          <div className={`px-5 py-3.5 rounded-2xl text-sm md:text-base leading-relaxed shadow-md
            ${isUser 
              ? 'bg-[#2e2f30] text-white rounded-tr-sm' 
              : 'bg-transparent text-gray-100 border border-gray-700/50 rounded-tl-sm'
            }`}>
            {isUser ? (
              message.content
            ) : (
              <div className="whitespace-pre-wrap font-light tracking-wide">
                {message.content}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};