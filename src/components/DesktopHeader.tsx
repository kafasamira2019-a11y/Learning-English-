import React, { useState, useEffect } from 'react';
import { Flame, Heart } from 'lucide-react';
import { DuoMascot } from './DuoMascot';
import { TabType } from '../types';
import { soundManager } from '../utils/sound';

interface DesktopHeaderProps {
  streakDays: number;
  userGems: number;
  userHearts: number;
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  isFlipping?: boolean;
}

const GREETINGS = [
  "Hi, I am Blue Monkey! Let's learn English together.",
  "Hello! You are doing great today.",
  "Keep up the good work!",
  "Monkey loves bananas, and English!",
  "Practice makes perfect! You can do it."
];

export const DesktopHeader: React.FC<DesktopHeaderProps> = ({
  streakDays,
  userGems,
  userHearts,
  activeTab,
  onSelectTab,
  isFlipping
}) => {
  const [isInteracting, setIsInteracting] = useState(false);
  const [speechText, setSpeechText] = useState("");

  let pose: any = 'happy';

  if (isInteracting) {
    pose = 'waving';
  } else if (isFlipping) {
    pose = 'flipping';
  } else {
    switch (activeTab) {
      case 'learn': pose = 'waving'; break;
      case 'lessons': 
      case 'study-guide': pose = 'studying'; break;
      case 'academic-writing': 
      case 'quiz': 
      case 'exercises': pose = 'thinking'; break;
      case 'reading': pose = 'sitting'; break;
      case 'vocabulary': 
      case 'irregular-verbs': pose = 'eating_banana'; break;
      case 'games': pose = 'super'; break;
      case 'leaderboards': 
      case 'quests': 
      case 'shop': pose = 'celebrating'; break;
      default: pose = 'happy';
    }
  }

  const handleMascotClick = () => {
    if (isInteracting) return;
    
    soundManager.playClick();
    const phrase = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
    setSpeechText(phrase);
    setIsInteracting(true);
    
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(phrase);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      
      const voices = window.speechSynthesis.getVoices();
      let preferredVoice = voices.find(v => v.name.includes('Google US English') || v.name.includes('Samantha') || (v.name.includes('Female') && v.lang.startsWith('en')));
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      window.speechSynthesis.speak(utterance);
      
      utterance.onend = () => {
        setTimeout(() => {
          setIsInteracting(false);
          setSpeechText("");
        }, 1000);
      };
      
      // Fallback in case onend doesn't fire
      setTimeout(() => {
        setIsInteracting(false);
        setSpeechText("");
      }, 5000);
    } else {
      setTimeout(() => {
        setIsInteracting(false);
        setSpeechText("");
      }, 3000);
    }
  };

  return (
    <div className="flex items-center justify-end lg:justify-between w-full pb-4 mb-4 border-b-2 border-slate-100">
      <div className="hidden lg:flex items-center gap-6">
        {/* Streak */}
        <div 
          onClick={() => onSelectTab('profile')}
          className="flex items-center gap-2 text-[#FF9600] font-extrabold cursor-pointer hover:opacity-80"
          title="Current Streak"
        >
          <Flame className="w-6 h-6 fill-current" />
          <span className="text-lg">{streakDays}</span>
        </div>
        {/* Gems */}
        <div 
          onClick={() => onSelectTab('shop')}
          className="flex items-center gap-2 text-[#1CB0F6] font-extrabold cursor-pointer hover:opacity-80"
          title="Gems Store"
        >
          <span className="text-xl leading-none">💎</span>
          <span className="text-lg">{userGems}</span>
        </div>
        {/* Hearts */}
        <div 
          onClick={() => onSelectTab('shop')}
          className="flex items-center gap-2 text-[#FF4B4B] font-extrabold cursor-pointer hover:opacity-80"
          title="Hearts"
        >
          <Heart className="w-6 h-6 fill-current" />
          <span className="text-lg">{userHearts}</span>
        </div>
      </div>
      
      {/* Center Screen Overlay when interacting */}
      {isInteracting && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
          <div className="relative z-[101] flex flex-col items-center">
            {speechText && (
              <div className="mb-4 mx-4 bg-white border-4 border-[#BAE6FD] px-6 py-3 rounded-3xl rounded-br-none shadow-xl relative animate-bounce">
                <p className="text-xl font-black text-slate-700 leading-tight text-center max-w-[85vw] sm:max-w-sm">{speechText}</p>
                <div className="absolute -bottom-3 right-8 w-5 h-5 bg-white border-b-4 border-r-4 border-[#BAE6FD] rotate-45 transform translate-x-1/2"></div>
              </div>
            )}
            <div className="animate-bounce drop-shadow-2xl">
               <DuoMascot pose="waving" size={200} />
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Blue Monkey Mascot at Top Right */}
      <div className="relative">
        <div 
          onClick={handleMascotClick}
          className="flex items-center gap-4 bg-[#F0F9FF] border-2 border-[#BAE6FD] py-2 px-4 rounded-2xl shadow-sm cursor-pointer hover:bg-[#E0F2FE] transition-colors duration-300"
        >
          <div className="text-right z-10">
            <span className="block text-sm font-black text-[#0284C7] uppercase">Blue Monkey Tutor</span>
            <span className="block text-xs font-bold text-[#38BDF8]">
              {isInteracting ? 'Talking...' : 'Always here to help!'}
            </span>
          </div>
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xs border-2 border-[#BAE6FD] relative z-20" style={{ overflow: 'visible' }}>
            <div className={`transition-opacity duration-300 ${isInteracting ? 'opacity-0' : 'opacity-100'} mt-[-10px]`}>
              <DuoMascot pose={pose} size={60} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

