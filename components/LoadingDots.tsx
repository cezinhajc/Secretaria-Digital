import React from 'react';
import { Logo } from './Logo';

export const LoadingDots: React.FC = () => {
  return (
    <div className="flex justify-start w-full mb-6 animate-fade-in">
       <div className="flex max-w-[85%] flex-row gap-4">
         <div className="flex-shrink-0 mt-1">
            <Logo className="w-8 h-8" />
         </div>
         <div className="flex items-center bg-transparent px-4 py-3 rounded-2xl rounded-tl-sm">
            <div className="flex space-x-1.5">
              <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
            </div>
         </div>
       </div>
    </div>
  );
};