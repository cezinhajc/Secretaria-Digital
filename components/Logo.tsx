import React, { useState } from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => {
  const [error, setError] = useState(false);

  return (
    <div className={`relative flex items-center justify-center rounded-full overflow-hidden bg-[#1e1f20] border border-yellow-600/30 shadow-md ${className}`}>
      {!error ? (
        <img 
          src="https://secretariadigital.simpia.com.br/assets/img/logotipo-harmonia.png" 
          alt="Brasão Harmonia e Luz" 
          className="w-full h-full object-cover"
          onError={() => setError(true)}
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-[#1e1f20]">
          <span className="text-yellow-600 font-bold text-xs select-none">HL</span>
        </div>
      )}
    </div>
  );
};