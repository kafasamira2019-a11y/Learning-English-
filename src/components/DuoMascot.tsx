import React from 'react';

interface DuoMascotProps {
  pose?: 'happy' | 'celebrating' | 'super' | 'studying' | 'waving' | 'thinking' | 'eating_banana' | 'sitting' | 'flipping';
  size?: number | string;
  className?: string;
}

export const DuoMascot: React.FC<DuoMascotProps> = ({ 
  pose = 'happy', 
  size = 80, 
  className = '' 
}) => {
  const numericSize = typeof size === 'number' ? size : 80;

  const monkeyStyle = `
    @keyframes sway {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      25% { transform: translateY(-4px) rotate(-2deg); }
      75% { transform: translateY(-4px) rotate(2deg); }
    }
    @keyframes tail-wag {
      0%, 100% { transform: rotate(0deg); transform-origin: 80px 85px; }
      50% { transform: rotate(15deg); transform-origin: 80px 85px; }
    }
    @keyframes flip-cheer {
      0% { transform: translateY(0) rotate(0deg); }
      30% { transform: translateY(-40px) rotate(180deg); }
      60% { transform: translateY(0) rotate(360deg); }
      100% { transform: translateY(0) rotate(360deg); }
    }
    .monkey-sway {
      animation: sway 2.5s ease-in-out infinite;
    }
    .tail-wag {
      animation: tail-wag 2s ease-in-out infinite;
    }
    .monkey-flip {
      animation: flip-cheer 1.5s ease-in-out infinite;
    }
  `;

  // Helper for common blue monkey parts to reduce code duplication
  const getMonkeyBase = (bodyProps: React.SVGProps<SVGPathElement> = {}, addStyle = true) => (
    <>
      {addStyle && <style>{monkeyStyle}</style>}
      {/* Shadow under feet */}
      <ellipse cx="60" cy="106" rx="34" ry="8" fill="#E5E5E5" />
      
      {/* Tail (Blue) - Waving */}
      <path d="M 80 85 Q 110 90, 105 60 Q 100 40, 115 45" fill="none" stroke="#1CB0F6" strokeWidth="8" strokeLinecap="round" className="tail-wag" />

      {/* Left Ear */}
      <circle cx="24" cy="55" r="12" fill="#1CB0F6" />
      <circle cx="24" cy="55" r="6" fill="#BAE6FD" />
      {/* Right Ear */}
      <circle cx="96" cy="55" r="12" fill="#1CB0F6" />
      <circle cx="96" cy="55" r="6" fill="#BAE6FD" />

      {/* Main Body */}
      <path 
        d="M60 16C38 16 26 32 26 62C26 86 38 100 60 100C82 100 94 86 94 62C94 32 82 16 60 16Z" 
        fill="#1CB0F6" 
        {...bodyProps}
      />
      
      {/* Light Blue Belly/Face Patch */}
      <path 
        d="M60 30C40 30 36 45 36 65C36 85 45 95 60 95C75 95 84 85 84 65C84 45 80 30 60 30Z" 
        fill="#BAE6FD" 
      />
    </>
  );

  const getMonkeyFace = (eyes: 'normal' | 'happy' | 'thinking' | 'reading' = 'normal', smile: 'normal' | 'open' | 'thinking' | 'chewing' = 'normal') => (
    <>
      {/* Big White Eyes */}
      <circle cx="45" cy="48" r="14" fill="#FFFFFF" />
      <circle cx="75" cy="48" r="14" fill="#FFFFFF" />
      
      {eyes === 'normal' && (
        <>
          <circle cx="47" cy="48" r="7" fill="#0f172a" />
          <circle cx="77" cy="48" r="7" fill="#0f172a" />
          <circle cx="45" cy="45" r="2.5" fill="#FFFFFF" />
          <circle cx="75" cy="45" r="2.5" fill="#FFFFFF" />
        </>
      )}
      {eyes === 'happy' && (
        <>
          <path d="M38 50C38 43 52 43 52 50" stroke="#0369A1" strokeWidth="4" strokeLinecap="round" />
          <path d="M68 50C68 43 82 43 82 50" stroke="#0369A1" strokeWidth="4" strokeLinecap="round" />
        </>
      )}
      {eyes === 'thinking' && (
        <>
          <circle cx="50" cy="45" r="6" fill="#0f172a" />
          <circle cx="70" cy="45" r="6" fill="#0f172a" />
        </>
      )}
      {eyes === 'reading' && (
        <>
          <circle cx="45" cy="52" r="6" fill="#0f172a" />
          <circle cx="75" cy="52" r="6" fill="#0f172a" />
          {/* Glasses */}
          <circle cx="45" cy="48" r="16" fill="none" stroke="#333" strokeWidth="3" />
          <circle cx="75" cy="48" r="16" fill="none" stroke="#333" strokeWidth="3" />
          <path d="M61 48 L59 48" stroke="#333" strokeWidth="3" />
        </>
      )}

      {/* Snout */}
      <ellipse cx="60" cy="68" rx="14" ry="10" fill="#7DD3FC" />
      <ellipse cx="60" cy="65" rx="3" ry="2" fill="#0284C7" />
      
      {/* Mouth */}
      {smile === 'normal' && <path d="M 52 70 Q 60 76, 68 70" fill="none" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />}
      {smile === 'open' && (
        <>
          <path d="M52 68C52 68 60 80 60 80C60 80 68 68 68 68H52Z" fill="#FF4B4B" />
        </>
      )}
      {smile === 'thinking' && <path d="M 54 72 Q 60 72, 66 72" fill="none" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />}
      {smile === 'chewing' && (
        <>
          <ellipse cx="60" cy="71" rx="6" ry="4" fill="#0284C7" opacity="0.8" />
        </>
      )}
    </>
  );

  const renderMonkey = () => {
    switch (pose) {
      case 'super':
        return (
          <>
            <style>{monkeyStyle}</style>
            <defs>
              <linearGradient id="superGrad" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00C9FF" />
                <stop offset="0.4" stopColor="#92FE9D" />
                <stop offset="0.7" stopColor="#7F00FF" />
                <stop offset="1" stopColor="#FF007F" />
              </linearGradient>
            </defs>
            <circle cx="60" cy="60" r="48" fill="url(#superGrad)" opacity="0.25" />
            <ellipse cx="100" cy="85" rx="7" ry="5" fill="#FF007F" transform="rotate(-20 100 85)" />
            <ellipse cx="108" cy="95" rx="5" ry="4" fill="#FF007F" transform="rotate(-15 108 95)" />
            <circle cx="24" cy="55" r="12" fill="url(#superGrad)" />
            <circle cx="24" cy="55" r="6" fill="#FFFFFF" opacity="0.8" />
            <circle cx="96" cy="55" r="12" fill="url(#superGrad)" />
            <circle cx="96" cy="55" r="6" fill="#FFFFFF" opacity="0.8" />
            <path d="M60 16C38 16 26 32 26 62C26 86 38 100 60 100C82 100 94 86 94 62C94 32 82 16 60 16Z" fill="url(#superGrad)" />
            <path d="M60 30C40 30 36 45 36 65C36 85 45 95 60 95C75 95 84 85 84 65C84 45 80 30 60 30Z" fill="#FFFFFF" opacity="0.9" />
            <circle cx="45" cy="48" r="14" fill="#FFFFFF" />
            <circle cx="75" cy="48" r="14" fill="#FFFFFF" />
            <circle cx="45" cy="48" r="9" fill="#00C9FF" />
            <circle cx="75" cy="48" r="9" fill="#7F00FF" />
            <circle cx="47" cy="48" r="5" fill="#111827" />
            <circle cx="77" cy="48" r="5" fill="#111827" />
            <ellipse cx="60" cy="68" rx="14" ry="10" fill="url(#superGrad)" opacity="0.5" />
            <ellipse cx="60" cy="65" rx="3" ry="2" fill="#111827" />
            <path d="M 52 70 Q 60 76, 68 70" fill="none" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" />
            <ellipse cx="45" cy="100" rx="10" ry="5" fill="#FFC800" />
            <ellipse cx="75" cy="100" rx="10" ry="5" fill="#FFC800" />
          </>
        );

      case 'celebrating':
        return (
          <>
            {getMonkeyBase()}
            {/* Raised Arms Celebrating */}
            <path d="M26 62C16 50 10 32 20 26C30 20 36 42 28 66" fill="#1CB0F6" />
            <path d="M94 62C104 50 110 32 100 26C90 20 84 42 92 66" fill="#1CB0F6" />
            {getMonkeyFace('happy', 'open')}
            {/* Feet */}
            <ellipse cx="45" cy="100" rx="10" ry="5" fill="#0284C7" />
            <ellipse cx="75" cy="100" rx="10" ry="5" fill="#0284C7" />
            {/* Confetti stars */}
            <circle cx="20" cy="20" r="3" fill="#FFC800" />
            <circle cx="102" cy="22" r="3.5" fill="#1CB0F6" />
            <circle cx="15" cy="45" r="2.5" fill="#FF4B4B" />
            <circle cx="105" cy="48" r="3" fill="#CE82FF" />
          </>
        );

      case 'eating_banana':
        return (
          <>
            {getMonkeyBase()}
            {getMonkeyFace('happy', 'chewing')}
            {/* Feet */}
            <ellipse cx="45" cy="100" rx="10" ry="5" fill="#0284C7" />
            <ellipse cx="75" cy="100" rx="10" ry="5" fill="#0284C7" />
            {/* Right arm holding banana to mouth */}
            <path d="M26 60C20 72 24 84 32 90C34 78 32 66 26 60Z" fill="#0284C7" />
            <path d="M94 60C100 65 90 75 80 72C70 69 75 60 85 58C90 57 93 58 94 60Z" fill="#0284C7" />
            {/* Banana */}
            <path d="M 68 75 Q 85 85, 80 60 Q 75 65, 68 75" fill="#FFC800" stroke="#E5A500" strokeWidth="2" strokeLinecap="round" />
          </>
        );

      case 'thinking':
        return (
          <>
            {getMonkeyBase()}
            {getMonkeyFace('thinking', 'thinking')}
            {/* Feet */}
            <ellipse cx="45" cy="100" rx="10" ry="5" fill="#0284C7" />
            <ellipse cx="75" cy="100" rx="10" ry="5" fill="#0284C7" />
            {/* Hand on chin */}
            <path d="M26 60C20 72 24 84 32 90C34 78 32 66 26 60Z" fill="#0284C7" />
            <path d="M94 60C96 68 85 85 75 75C65 65 72 65 78 70Z" fill="#0284C7" />
            {/* Question marks */}
            <text x="15" y="30" fill="#0284C7" fontSize="20" fontWeight="bold">?</text>
            <text x="95" y="25" fill="#0284C7" fontSize="16" fontWeight="bold">?</text>
          </>
        );

      case 'studying':
        return (
          <>
            {/* Sitting Monkey Body */}
            {getMonkeyBase({ d: "M60 26C38 26 26 42 26 72C26 96 38 105 60 105C82 105 94 96 94 72C94 42 82 26 60 26Z" })}
            {getMonkeyFace('reading', 'normal')}
            {/* Sitting Feet */}
            <ellipse cx="35" cy="100" rx="12" ry="6" fill="#0284C7" />
            <ellipse cx="85" cy="100" rx="12" ry="6" fill="#0284C7" />
            {/* Book */}
            <rect x="40" y="75" width="40" height="20" rx="2" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" />
            <line x1="60" y1="75" x2="60" y2="95" stroke="#0284C7" strokeWidth="2" />
            <line x1="45" y1="80" x2="55" y2="80" stroke="#BAE6FD" strokeWidth="2" />
            <line x1="45" y1="85" x2="55" y2="85" stroke="#BAE6FD" strokeWidth="2" />
            <line x1="65" y1="80" x2="75" y2="80" stroke="#BAE6FD" strokeWidth="2" />
            {/* Arms holding book */}
            <path d="M26 70C20 80 30 90 40 85" fill="none" stroke="#0284C7" strokeWidth="10" strokeLinecap="round" />
            <path d="M94 70C100 80 90 90 80 85" fill="none" stroke="#0284C7" strokeWidth="10" strokeLinecap="round" />
          </>
        );

      case 'sitting':
        return (
          <>
            {getMonkeyBase({ d: "M60 26C38 26 26 42 26 72C26 96 38 105 60 105C82 105 94 96 94 72C94 42 82 26 60 26Z" })}
            {getMonkeyFace('normal', 'normal')}
            {/* Sitting Feet */}
            <ellipse cx="35" cy="100" rx="12" ry="6" fill="#0284C7" />
            <ellipse cx="85" cy="100" rx="12" ry="6" fill="#0284C7" />
            {/* Arms tucked */}
            <path d="M26 70C20 82 24 94 32 100C34 88 32 76 26 70Z" fill="#0284C7" />
            <path d="M94 70C100 82 96 94 88 100C86 88 88 76 94 70Z" fill="#0284C7" />
          </>
        );

      case 'waving':
        return (
          <>
            {getMonkeyBase()}
            {getMonkeyFace('happy', 'open')}
            {/* Left Arm tucked */}
            <path d="M26 60C20 72 24 84 32 90C34 78 32 66 26 60Z" fill="#0284C7" />
            {/* Right Arm Waving */}
            <path d="M94 60C104 50 110 32 100 26C90 20 84 42 92 66" fill="#1CB0F6" />
            {/* Feet */}
            <ellipse cx="45" cy="100" rx="10" ry="5" fill="#0284C7" />
            <ellipse cx="75" cy="100" rx="10" ry="5" fill="#0284C7" />
          </>
        );

      case 'flipping':
        return (
          <>
            {getMonkeyBase(undefined, true)}
            {/* Raised Arms Celebrating */}
            <path d="M26 62C16 50 10 32 20 26C30 20 36 42 28 66" fill="#1CB0F6" />
            <path d="M94 62C104 50 110 32 100 26C90 20 84 42 92 66" fill="#1CB0F6" />
            {getMonkeyFace('happy', 'open')}
            {/* Feet */}
            <ellipse cx="45" cy="100" rx="10" ry="5" fill="#0284C7" />
            <ellipse cx="75" cy="100" rx="10" ry="5" fill="#0284C7" />
            {/* Confetti stars */}
            <circle cx="20" cy="20" r="3" fill="#FFC800" />
            <circle cx="102" cy="22" r="3.5" fill="#1CB0F6" />
            <circle cx="15" cy="45" r="2.5" fill="#FF4B4B" />
            <circle cx="105" cy="48" r="3" fill="#CE82FF" />
          </>
        );

      case 'happy':
      default:
        return (
          <>
            {getMonkeyBase()}
            {getMonkeyFace('normal', 'normal')}
            {/* Arms tucked */}
            <path d="M26 60C20 72 24 84 32 90C34 78 32 66 26 60Z" fill="#0284C7" />
            <path d="M94 60C100 72 96 84 88 90C86 78 88 66 94 60Z" fill="#0284C7" />
            {/* Feet */}
            <ellipse cx="45" cy="100" rx="10" ry="5" fill="#0284C7" />
            <ellipse cx="75" cy="100" rx="10" ry="5" fill="#0284C7" />
          </>
        );
    }
  };

  return (
    <svg 
      width={numericSize} 
      height={numericSize} 
      viewBox="0 0 120 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-md ${pose === 'flipping' ? 'monkey-flip' : 'monkey-sway'} ${className}`}
    >
      {renderMonkey()}
    </svg>
  );
};
