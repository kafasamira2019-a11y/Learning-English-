import React from 'react';
import { 
  Home, 
  Volume2, 
  User, 
  BookOpen, 
  PenTool, 
  Layers, 
  VolumeX, 
  X,
  BookMarked
} from 'lucide-react';
import { TabType, ExerciseSectionMode } from '../types';

interface DuolingoLeftSidebarProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType, exerciseMode?: ExerciseSectionMode) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  isAudioEnabled?: boolean;
  onToggleAudio?: () => void;
  completedUnitsCount?: number;
  totalUnitsCount?: number;
}

export const DuolingoLeftSidebar: React.FC<DuolingoLeftSidebarProps> = ({
  activeTab,
  onSelectTab,
  isOpenMobile,
  onCloseMobile,
  isAudioEnabled = true,
  onToggleAudio,
  completedUnitsCount = 0,
  totalUnitsCount = 145
}) => {
  const navItems: {
    id: TabType;
    label: string;
    khmerLabel: string;
    icon: React.ElementType;
    customIcon?: React.ReactNode;
    color: string;
  }[] = [
    { 
      id: 'ai-tutor', 
      label: 'AI TUTOR', 
      khmerLabel: 'ស្វែងរក & សួរ AI', 
      icon: BookOpen,
      customIcon: (
        <div className="w-8 h-8 rounded-xl bg-linear-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-white text-base shadow-xs">
          🤖
        </div>
      ),
      color: 'blue'
    },
    { 
      id: 'lessons', 
      label: 'GRAMMAR', 
      khmerLabel: 'វេយ្យាករណ៍ (145)', 
      icon: BookOpen,
      customIcon: (
        <div className="w-8 h-8 rounded-xl bg-[#58CC02] flex items-center justify-center text-white text-base shadow-xs">
          📚
        </div>
      ),
      color: 'green'
    },
    { 
      id: 'academic-writing', 
      label: 'WRITING', 
      khmerLabel: 'តែងនិពន្ធស្រាវជ្រាវ', 
      icon: PenTool,
      customIcon: (
        <div className="w-8 h-8 rounded-xl bg-[#CE82FF] flex items-center justify-center text-white text-base shadow-xs">
          📝
        </div>
      ),
      color: 'purple'
    },
    { 
      id: 'reading', 
      label: 'READING', 
      khmerLabel: 'អានយល់ន័យ', 
      icon: BookMarked,
      customIcon: (
        <div className="w-8 h-8 rounded-xl bg-[#00CD9C] flex items-center justify-center text-white text-base shadow-xs">
          📖
        </div>
      ),
      color: 'emerald'
    },
    { 
      id: 'vocabulary', 
      label: 'VOCABULARY', 
      khmerLabel: 'វាក្យសព្ទ & កិរិយាសព្ទ', 
      icon: BookOpen,
      customIcon: (
        <div className="w-8 h-8 rounded-xl bg-[#CE82FF] flex items-center justify-center text-white text-base shadow-xs">
          💡
        </div>
      ),
      color: 'purple'
    },
    { 
      id: 'games', 
      label: 'GAMES (7-DAY)', 
      khmerLabel: 'ល្បែងសិក្សា ៧ ថ្ងៃ', 
      icon: Layers,
      customIcon: (
        <div className="w-8 h-8 rounded-xl bg-[#FF9600] flex items-center justify-center text-white text-base shadow-xs relative">
          🎮
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        </div>
      ),
      color: 'orange'
    },
    { 
      id: 'learn', 
      label: 'LEARN', 
      khmerLabel: 'រៀនតាមជំហាន', 
      icon: Home,
      customIcon: (
        <div className="w-8 h-8 rounded-xl bg-[#FF9600] flex items-center justify-center text-white text-base shadow-xs">
          🏠
        </div>
      ),
      color: 'blue'
    },
    { 
      id: 'exercises', 
      label: 'EXERCISES', 
      khmerLabel: 'លំហាត់អនុវត្ត', 
      icon: Layers,
      customIcon: (
        <div className="w-8 h-8 rounded-xl bg-[#FFC800] flex items-center justify-center text-white text-base shadow-xs">
          ✏️
        </div>
      ),
      color: 'yellow'
    },
    { 
      id: 'profile', 
      label: 'PROFILE', 
      khmerLabel: 'គណនី & សមិទ្ធផល', 
      icon: User,
      customIcon: (
        <div className="w-8 h-8 rounded-xl bg-[#1CB0F6] flex items-center justify-center text-white text-xs font-black shadow-xs border-2 border-white">
          K
        </div>
      ),
      color: 'blue'
    },
  ];

  const handleNavClick = (tab: TabType) => {
    onSelectTab(tab);
    onCloseMobile();
  };

  const sidebarBody = (
    <div className="flex flex-col h-full bg-white border-r-2 border-[#E5E5E5] px-4 py-6 select-none">
      
      {/* Brand Header: KAFA FREE ENGLISH LEARNING SYSTEM */}
      <div className="flex items-center justify-between px-2 mb-6">
        <div 
          onClick={() => handleNavClick('learn')}
          className="flex flex-col cursor-pointer group"
          id="kafa-brand-logo"
        >
          {/* KAFA Wordmark Typography */}
          <div className="flex items-center gap-1.5">
            <span className="font-black text-2xl tracking-tight text-[#58CC02] uppercase transition-transform group-hover:scale-105 font-sans leading-none">
              KAFA
            </span>
            <span className="px-1.5 py-0.5 bg-[#58CC02] text-white text-[9px] font-black uppercase rounded-md tracking-wider">
              FREE
            </span>
          </div>
          <span className="text-[10px] font-extrabold text-slate-500 tracking-wider uppercase mt-1">
            English Learning System
          </span>
        </div>

        {/* Mobile Close Button */}
        <button
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 rounded-xl text-slate-400 hover:bg-slate-100 transition-colors"
          id="close-duo-sidebar-btn"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 space-y-1.5 overflow-y-auto no-scrollbar pr-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;

          let activeStyles = "text-slate-600 hover:bg-[#F7F7F7] hover:border-[#E5E5E5] border-transparent";
          if (isActive) {
            if (item.id === 'learn') {
              activeStyles = "bg-[#DDF4FF] border-2 border-[#1CB0F6] text-[#1CB0F6] font-extrabold shadow-[0_2px_0_0_#1899D6]";
            } else if (item.id === 'lessons') {
              activeStyles = "bg-[#D7FFB8] border-2 border-[#58CC02] text-[#58CC02] font-extrabold shadow-[0_2px_0_0_#58A700]";
            } else if (item.id === 'academic-writing') {
              activeStyles = "bg-[#F3E8FF] border-2 border-[#CE82FF] text-[#A855F7] font-extrabold shadow-[0_2px_0_0_#9333EA]";
            } else if (item.id === 'games') {
              activeStyles = "bg-[#FFF0D4] border-2 border-[#FF9600] text-[#D97706] font-extrabold shadow-[0_2px_0_0_#D97706]";
            } else {
              activeStyles = "bg-[#DDF4FF] border-2 border-[#1CB0F6] text-[#1CB0F6] font-extrabold shadow-[0_2px_0_0_#1899D6]";
            }
          }

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-4 px-3.5 py-3 rounded-2xl border-2 transition-all cursor-pointer text-left ${activeStyles}`}
              id={`duo-nav-${item.id}`}
            >
              <div className="shrink-0">
                {item.customIcon}
              </div>
              <div className="min-w-0 flex-1">
                <span className="block text-sm font-extrabold tracking-wider uppercase font-sans leading-tight">
                  {item.label}
                </span>
                <span className="block text-[13px] font-khmer text-slate-500 truncate leading-tight mt-1">
                  {item.khmerLabel}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer: Sound Toggle */}
      {onToggleAudio && (
        <div className="pt-4 border-t-2 border-[#E5E5E5] flex items-center justify-between">
          <button
            onClick={onToggleAudio}
            className={`w-full py-2.5 px-3 rounded-2xl border-2 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              isAudioEnabled
                ? 'bg-[#E5F7FF] border-[#BDE8FF] text-[#1899D6] hover:bg-[#DDF4FF]'
                : 'bg-slate-100 border-slate-200 text-slate-400'
            }`}
            id="sidebar-duo-audio-toggle"
          >
            {isAudioEnabled ? <Volume2 className="w-4 h-4 text-[#1CB0F6]" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            <span>{isAudioEnabled ? 'SOUND EFFECTS ON' : 'SOUND MUTED'}</span>
          </button>
        </div>
      )}

    </div>
  );

  return (
    <>
      {/* Desktop Left Sidebar */}
      <aside className="hidden lg:block w-[256px] shrink-0 sticky top-0 h-screen z-30">
        {sidebarBody}
      </aside>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity" 
          />
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] z-50 animate-in slide-in-from-left duration-200">
            {sidebarBody}
          </div>
        </div>
      )}
    </>
  );
};
