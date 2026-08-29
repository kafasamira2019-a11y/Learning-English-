import React from 'react';
import { 
  Menu, 
  Search, 
  Flame, 
  Volume2, 
  VolumeX, 
  Layers,
  Sparkles
} from 'lucide-react';
import { LevelType, TabType, UnitData } from '../types';

import { FirebaseSync } from './FirebaseSync';

interface TopHeaderProps {
  onOpenMobileSidebar: () => void;
  activeTab: TabType;
  selectedLevel: LevelType;
  onSelectLevel: (level: LevelType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  completedUnits?: number[];
  isAudioEnabled?: boolean;
  onToggleAudio?: () => void;
}

const TAB_TITLES: { [key in TabType]: { en: string; kh: string; emoji: string } } = {
  'learn': { en: 'KAFA Learning Path', kh: 'ការរៀនតាមជំហាន', emoji: '🏠' },
  'lessons': { en: 'Grammar Lessons', kh: 'មេរៀនវេយ្យាករណ៍ (Raymond Murphy)', emoji: '📚' },
  'academic-writing': { en: 'Academic Writing Masterclass', kh: 'តែងនិពន្ធ & ស្រាវជ្រាវ (Adrian Wallwork)', emoji: '📝' },
  'reading': { en: 'Daily Reading Lessons & Comprehension', kh: 'មេរៀនអាន & ស្វែងយល់ន័យ (Daily Reading)', emoji: '📖' },
  'vocabulary': { en: 'Regular Verbs & Vocabulary Bank', kh: 'កិរិយាសព្ទប្រក្រតី (+ed) & វាក្យសព្ទប្រចាំថ្ងៃ', emoji: '💡' },
  'games': { en: '7-Day All-Level Game Arena', kh: 'ល្បែងសិក្សា ៧ ថ្ងៃ (Grammar, Writing, Reading, Vocabulary)', emoji: '🎮' },
  'exercises': { en: 'Practice Exercises (Grammar, Writing, Reading)', kh: 'លំហាត់អនុវត្តគ្រប់ផ្នែក', emoji: '✏️' },
  'leaderboards': { en: 'KAFA Leaderboards & Leagues', kh: 'តារាងពិន្ទុ & លីគប្រកួត', emoji: '🛡️' },
  'quests': { en: 'Daily Quests & Badges', kh: 'បេសកកម្មប្រចាំថ្ងៃ & រង្វាន់', emoji: '📦' },
  'shop': { en: 'KAFA Gems & Power-ups Store', kh: 'ហាងទំនិញ & Power-ups', emoji: '🏪' },
  'profile': { en: 'Profile & Achievements', kh: 'គណនី & សមិទ្ធផល', emoji: '👤' },
  'quiz': { en: 'Instant Quiz Challenge', kh: 'តេស្ត Quiz ភ្លាមៗ', emoji: '⚡' },
  'study-guide': { en: 'Diagnostic Study Guide', kh: 'តេស្តស្ទង់កម្រិត & ណែនាំមេរៀន', emoji: '🎯' },
  'irregular-verbs': { en: 'Irregular Verbs Trainer', kh: 'វចនានុក្រមកិរិយាសព្ទមិនប្រក្រតី', emoji: '📖' },
  'progress': { en: 'Results & Progress Analytics', kh: 'លទ្ធផល & ដំណើរការសិក្សា', emoji: '🏆' },
  'ai-tutor': { en: 'AI Tutor', kh: 'គ្រូ AI', emoji: '🤖' },
};

export const TopHeader: React.FC<TopHeaderProps> = ({
  onOpenMobileSidebar,
  activeTab,
  selectedLevel,
  onSelectLevel,
  searchQuery,
  onSearchChange,
  completedUnits = [],
  isAudioEnabled = true,
  onToggleAudio
}) => {
  const currentTabInfo = TAB_TITLES[activeTab] || TAB_TITLES['lessons'];

  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-sky-100/90 shadow-xs shadow-sky-100/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-4">
          
          {/* Left: Mobile Hamburger & Current Page Indicator */}
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Button */}
            <button
              onClick={onOpenMobileSidebar}
              className="lg:hidden p-2.5 rounded-2xl bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 transition-colors cursor-pointer"
              id="open-mobile-sidebar-btn"
              title="បើកមីនុយ (Open Menu)"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Current View Title Tag */}
            <div className="flex items-center gap-2.5">
              <span className="text-xl hidden sm:inline">{currentTabInfo.emoji}</span>
              <div>
                <h1 className="text-base sm:text-lg font-black text-slate-900 leading-tight flex items-center gap-2">
                  <span>{currentTabInfo.en}</span>
                </h1>
                <p className="text-xs text-sky-700 font-khmer font-bold leading-none mt-0.5">
                  {currentTabInfo.kh}
                </p>
              </div>
            </div>
          </div>

          {/* Center: Search Bar */}
          <div className="relative flex-1 max-w-xs md:max-w-md hidden md:block">
            <Search className="w-4 h-4 text-sky-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="ស្វែងរកមេរៀន / Search unit, grammar topic..."
              className="w-full pl-10 pr-8 py-2 text-xs sm:text-sm bg-sky-50/60 hover:bg-sky-50 focus:bg-white border border-sky-200/80 rounded-2xl focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all placeholder:text-slate-400 font-medium"
              id="top-search-input"
            />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 w-5 h-5 flex items-center justify-center rounded-full hover:bg-slate-200"
              >
                ✕
              </button>
            )}
          </div>

          {/* Right Controls: Streak & Audio */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            <FirebaseSync />

            {/* Streak Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 border border-orange-200/70 rounded-2xl text-orange-600 font-black text-xs shadow-xs">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span className="font-khmer">{completedUnits.length > 0 ? `${completedUnits.length} រៀនរួច` : '🔥 ១២ ថ្ងៃ Streak'}</span>
            </div>

            {/* Level Selector on desktop header for quick switching */}
            <div className="hidden xl:flex items-center gap-1 bg-sky-50 p-1 rounded-2xl border border-sky-100 text-xs">
              {(['all', 'elementary', 'intermediate', 'advanced'] as LevelType[]).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => onSelectLevel(lvl)}
                  className={`px-2.5 py-1 rounded-xl font-bold capitalize transition-all cursor-pointer ${
                    selectedLevel === lvl
                      ? 'bg-white text-sky-700 shadow-xs border border-sky-200 font-black'
                      : 'text-slate-600 hover:text-sky-900 hover:bg-sky-100/50'
                  }`}
                  id={`top-level-btn-${lvl}`}
                >
                  {lvl === 'all' ? 'All' : lvl === 'elementary' ? 'Basic' : lvl === 'intermediate' ? 'Inter' : 'Adv'}
                </button>
              ))}
            </div>

            {/* Audio Toggle */}
            {onToggleAudio && (
              <button
                onClick={onToggleAudio}
                title={isAudioEnabled ? 'បិទសំឡេង (Mute Sound)' : 'បើកសំឡេង (Enable Sound)'}
                className={`p-2.5 rounded-2xl border transition-all cursor-pointer ${
                  isAudioEnabled 
                    ? 'bg-sky-100 border-sky-200 text-sky-700 hover:bg-sky-200 shadow-xs'
                    : 'bg-slate-100 border-slate-200 text-slate-400 hover:bg-slate-200'
                }`}
                id="top-sound-toggle-btn"
              >
                {isAudioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            )}
          </div>

        </div>

        {/* Mobile Search Bar in dropdown */}
        <div className="pb-3 md:hidden">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-sky-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="ស្វែងរកមេរៀន / Search topics..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-sky-50 border border-sky-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>

      </div>
    </header>
  );
};
