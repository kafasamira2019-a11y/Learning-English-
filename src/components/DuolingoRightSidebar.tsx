import React from 'react';
import { 
  Flame, 
  Heart, 
  Shield, 
  Sparkles, 
  Award, 
  ChevronRight, 
  Zap,
  Lock,
  CheckCircle2,
  Gift
} from 'lucide-react';
import { TabType, LevelType } from '../types';
import { DuoMascot } from './DuoMascot';

interface DuolingoRightSidebarProps {
  streakDays: number;
  gems: number;
  hearts: number;
  dailyXp: number;
  dailyXpTarget: number;
  onSelectTab: (tab: TabType) => void;
  onOpenSuperModal?: () => void;
  showKhmerLang: boolean;
  onToggleKhmerLang: () => void;
}

export const DuolingoRightSidebar: React.FC<DuolingoRightSidebarProps> = ({
  streakDays = 12,
  gems = 500,
  hearts = 5,
  dailyXp = 20,
  dailyXpTarget = 30,
  onSelectTab,
  onOpenSuperModal,
  showKhmerLang,
  onToggleKhmerLang
}) => {
  const questProgress = Math.min(100, Math.round((dailyXp / dailyXpTarget) * 100));

  return (
    <aside className="w-full lg:w-[360px] xl:w-[380px] shrink-0 space-y-6 px-4 py-6">
      
      {/* Top Header Status Bar (Flag, Streak, Gems, Hearts) */}
      <div className="flex items-center justify-between px-2 py-1">
        
        {/* Language Flag Selector */}
        <button
          onClick={onToggleKhmerLang}
          title="Toggle Khmer Translations"
          className="flex items-center gap-1.5 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          id="duo-flag-selector"
        >
          <span className="text-2xl leading-none">🇺🇸</span>
          <span className="text-[10px] font-black text-slate-500 uppercase font-khmer">
            {showKhmerLang ? '🇰🇭 ON' : 'EN'}
          </span>
        </button>

        {/* Streak Counter */}
        <div 
          onClick={() => onSelectTab('profile')}
          className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity"
          id="duo-streak-badge"
        >
          <span className="text-xl">🔥</span>
          <span className={`text-base font-extrabold ${streakDays > 0 ? 'text-[#FF9600]' : 'text-slate-400'}`}>
            {streakDays}
          </span>
        </div>

        {/* Gems / Lingots */}
        <div 
          onClick={() => onSelectTab('shop')}
          className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity"
          id="duo-gems-badge"
        >
          <div className="w-5 h-5 rounded-md bg-[#1CB0F6] flex items-center justify-center text-white text-xs font-black shadow-xs">
            💎
          </div>
          <span className="text-base font-extrabold text-[#1CB0F6]">
            {gems}
          </span>
        </div>

        {/* Hearts System */}
        <div 
          onClick={() => onSelectTab('shop')}
          className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity"
          id="duo-hearts-badge"
        >
          <span className="text-xl">❤️</span>
          <span className="text-base font-extrabold text-[#FF4B4B]">
            {hearts}
          </span>
        </div>

      </div>

      {/* 1. Super Duolingo / English Pro Promotional Card (Matches Screenshot) */}
      <div className="bg-white rounded-3xl p-5 border-2 border-[#E5E5E5] shadow-xs space-y-4 relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="inline-block px-2.5 py-0.5 bg-gradient-to-r from-[#7F00FF] to-[#FF007F] text-white text-[10px] font-black tracking-wider uppercase rounded-md italic shadow-xs">
              SUPER
            </span>
            <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
              Try Super for free
            </h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-[210px]">
              No ads, personalized practice, and unlimited Legendary!
            </p>
          </div>

          <div className="w-16 h-16 shrink-0 relative -mt-1 -mr-1">
            <DuoMascot pose="super" size={68} />
          </div>
        </div>

        {/* Royal Blue 3D Push Button */}
        <button
          onClick={() => {
            if (onOpenSuperModal) onOpenSuperModal();
            else onSelectTab('study-guide');
          }}
          className="w-full py-3.5 px-4 bg-[#1899D6] hover:bg-[#1CB0F6] active:translate-y-1 text-white text-xs font-black uppercase tracking-wider rounded-2xl border-b-4 border-[#0F75A8] active:border-b-0 shadow-sm transition-all cursor-pointer text-center"
          id="try-super-free-btn"
        >
          TRY 1 WEEK FREE
        </button>
      </div>

      {/* 2. Unlock Leaderboards! Card (Matches Screenshot) */}
      <div className="bg-white rounded-3xl p-5 border-2 border-[#E5E5E5] shadow-xs space-y-3">
        <h3 className="text-base font-extrabold text-slate-900">
          Unlock Leaderboards!
        </h3>

        <div className="flex items-center gap-4 py-2">
          <div className="w-12 h-14 rounded-2xl bg-slate-100 border-2 border-slate-200 flex items-center justify-center text-slate-400 shrink-0">
            <Shield className="w-6 h-6 fill-slate-200 text-slate-400" />
          </div>
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-slate-700 leading-relaxed">
              Complete 3 more lessons to start competing
            </p>
            <p className="text-[11px] font-khmer text-slate-400">
              បញ្ចប់ ៣ មេរៀនទៀតដើម្បីចូលរួមប្រកួតក្នុងលីគ
            </p>
          </div>
        </div>

        <button
          onClick={() => onSelectTab('leaderboards')}
          className="w-full py-2.5 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-black uppercase tracking-wider rounded-xl border border-slate-200 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          id="open-leaderboards-card-btn"
        >
          <span>VIEW LEAGUES (មើលតារាងលីគ)</span>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* 3. Daily Quests Card (Matches Screenshot) */}
      <div className="bg-white rounded-3xl p-5 border-2 border-[#E5E5E5] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-slate-900">
            Daily Quests
          </h3>
          <button
            onClick={() => onSelectTab('quests')}
            className="text-xs font-black text-[#1CB0F6] uppercase tracking-wider hover:underline cursor-pointer"
            id="view-all-quests-btn"
          >
            VIEW ALL
          </button>
        </div>

        {/* Quest Item: Earn 10 XP */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#FFC800]/20 flex items-center justify-center shrink-0">
            <span className="text-xl">⚡</span>
          </div>

          <div className="flex-1 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-slate-800">Earn 10 XP</span>
              <span className="font-extrabold text-slate-400">{dailyXp} / {dailyXpTarget}</span>
            </div>

            {/* Duolingo Progress Bar */}
            <div className="w-full bg-[#E5E5E5] h-3.5 rounded-full overflow-hidden relative">
              <div 
                className="bg-[#FFC800] h-full rounded-full transition-all duration-500"
                style={{ width: `${questProgress}%` }}
              />
            </div>
          </div>

          {/* Treasure Chest Icon at end */}
          <div className="w-8 h-8 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center shrink-0 text-base shadow-xs animate-pulse">
            📦
          </div>
        </div>

        {/* Quest Item 2: Complete 1 Lesson */}
        <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-[#58CC02]/20 flex items-center justify-center shrink-0">
            <span className="text-xl">📚</span>
          </div>

          <div className="flex-1 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-slate-800">Complete 1 Lesson</span>
              <span className="font-extrabold text-slate-400">1 / 1</span>
            </div>
            <div className="w-full bg-[#E5E5E5] h-3.5 rounded-full overflow-hidden">
              <div className="bg-[#58CC02] h-full rounded-full w-full" />
            </div>
          </div>

          <div className="w-8 h-8 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center shrink-0 text-xs font-black text-emerald-700 shadow-xs">
            ✓
          </div>
        </div>
      </div>

      {/* Footer Info Links */}
      <div className="px-2 pt-2 text-[11px] text-slate-400 space-y-1 text-center font-medium">
        <p className="font-khmer font-bold text-slate-500">KAFA FREE ENGLISH LEARNING SYSTEM</p>
        <p>© 2026 Murphy Grammar &amp; Wallwork Academic Series</p>
      </div>

    </aside>
  );
};
