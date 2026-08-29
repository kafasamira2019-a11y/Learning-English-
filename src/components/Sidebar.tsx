import React, { useState } from 'react';
import { 
  BookOpen, 
  PenTool, 
  Sparkles, 
  Target, 
  BookmarkCheck, 
  Award, 
  Flame, 
  Layers, 
  Volume2, 
  VolumeX, 
  X,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  BookMarked,
  FileText
} from 'lucide-react';
import { LevelType, TabType, UnitData, ExerciseSectionMode } from '../types';

interface SidebarProps {
  units?: UnitData[];
  activeTab: TabType;
  onSelectTab: (tab: TabType, exerciseMode?: ExerciseSectionMode) => void;
  selectedLevel: LevelType;
  onSelectLevel: (level: LevelType) => void;
  completedUnits?: number[];
  isAudioEnabled?: boolean;
  onToggleAudio?: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  activeExerciseMode?: ExerciseSectionMode;
}

export const Sidebar: React.FC<SidebarProps> = ({
  units = [],
  activeTab,
  onSelectTab,
  selectedLevel,
  onSelectLevel,
  completedUnits = [],
  isAudioEnabled = true,
  onToggleAudio,
  isOpenMobile,
  onCloseMobile,
  activeExerciseMode = 'grammar'
}) => {
  const [exercisesExpanded, setExercisesExpanded] = useState<boolean>(activeTab === 'exercises');

  const handleSelectCorePart = (tab: TabType, mode?: ExerciseSectionMode) => {
    if (tab === 'exercises') {
      setExercisesExpanded(true);
    }
    onSelectTab(tab, mode);
    onCloseMobile();
  };

  const toggleExercisesSubMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExercisesExpanded(prev => !prev);
  };

  const progressPercent = units.length > 0 ? Math.round((completedUnits.length / units.length) * 100) : 0;

  // Secondary Tools
  const toolItems: {
    id: TabType;
    labelEn: string;
    labelKh: string;
    icon: React.ElementType;
    emoji: string;
    badge?: string;
  }[] = [
    { id: 'quiz', labelEn: 'Instant Quiz', labelKh: 'តេស្ត Quiz', icon: Sparkles, emoji: '⚡', badge: 'PRO' },
    { id: 'study-guide', labelEn: 'Study Guide', labelKh: 'ស្ទង់កម្រិត & ណែនាំ', icon: Target, emoji: '🎯' },
    { id: 'irregular-verbs', labelEn: 'Irregular Verbs', labelKh: 'កិរិយាសព្ទមិនប្រក្រតី', icon: BookmarkCheck, emoji: '📖', badge: '100+' },
    { id: 'progress', labelEn: 'Results & Progress', labelKh: 'លទ្ធផល & វឌ្ឍនភាព', icon: Award, emoji: '🏆' },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-sky-100 shadow-sm">
      
      {/* Brand Header at top of Left Sidebar */}
      <div className="p-5 border-b border-sky-100 flex items-center justify-between">
        <div 
          onClick={() => handleSelectCorePart('lessons')}
          className="flex items-center gap-3 cursor-pointer select-none group"
          id="sidebar-brand-logo"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-600 via-indigo-600 to-emerald-500 flex items-center justify-center text-white font-black text-xl shadow-md shadow-sky-200 group-hover:scale-105 transition-all">
            <span>A</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-base text-slate-900 tracking-tight">English Pro</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-emerald-100 text-emerald-800 font-black rounded-md">
                Hub
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-khmer">វេយ្យាករណ៍ • តែងនិពន្ធ • អាន</p>
          </div>
        </div>

        {/* Close Button on Mobile */}
        <button
          onClick={onCloseMobile}
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-sky-50 transition-colors"
          id="close-sidebar-mobile-btn"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Navigation - 4 CORE DIVISIONS */}
      <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-6">
        
        {/* The 4 Main Parts */}
        <div className="space-y-2">
          <div className="px-3 pb-1 text-[11px] font-black uppercase tracking-wider text-slate-400 font-khmer flex items-center justify-between">
            <span>៤ ផ្នែកចម្បង / 4 CORE SECTIONS</span>
          </div>

          {/* 1. Grammar */}
          <button
            onClick={() => handleSelectCorePart('lessons')}
            className={`w-full text-left p-3 rounded-2xl transition-all flex items-center justify-between gap-3 cursor-pointer group ${
              activeTab === 'lessons'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-200 font-bold'
                : 'hover:bg-sky-50/80 text-slate-800'
            }`}
            id="sidebar-part-1-grammar"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black shrink-0 ${
                activeTab === 'lessons' ? 'bg-white/20 text-white' : 'bg-sky-100 text-sky-800'
              }`}>
                1
              </div>
              <div className="min-w-0 flex flex-col">
                <span className={`text-xs sm:text-sm font-black truncate leading-tight ${activeTab === 'lessons' ? 'text-white' : 'text-slate-900'}`}>
                  Grammar
                </span>
                <span className={`text-[11px] font-khmer truncate mt-0.5 ${activeTab === 'lessons' ? 'text-sky-100' : 'text-slate-500'}`}>
                  មេរៀនវេយ្យាករណ៍ (Lessons)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <span className={`text-[10px] px-2 py-0.5 rounded-lg font-black ${
                activeTab === 'lessons' ? 'bg-white/25 text-white' : 'bg-sky-100 text-sky-800'
              }`}>
                {completedUnits.length}/{units.length}
              </span>
              <ChevronRight className={`w-4 h-4 ${activeTab === 'lessons' ? 'text-white' : 'text-slate-300 group-hover:text-sky-500'}`} />
            </div>
          </button>

          {/* 2. Academic Writing */}
          <button
            onClick={() => handleSelectCorePart('academic-writing')}
            className={`w-full text-left p-3 rounded-2xl transition-all flex items-center justify-between gap-3 cursor-pointer group ${
              activeTab === 'academic-writing'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 font-bold'
                : 'hover:bg-indigo-50/80 text-slate-800'
            }`}
            id="sidebar-part-2-writing"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black shrink-0 ${
                activeTab === 'academic-writing' ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-800'
              }`}>
                2
              </div>
              <div className="min-w-0 flex flex-col">
                <span className={`text-xs sm:text-sm font-black truncate leading-tight ${activeTab === 'academic-writing' ? 'text-white' : 'text-slate-900'}`}>
                  Academic Writing
                </span>
                <span className={`text-[11px] font-khmer truncate mt-0.5 ${activeTab === 'academic-writing' ? 'text-indigo-100' : 'text-slate-500'}`}>
                  តែងនិពន្ធស្រាវជ្រាវ (Lessons)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <span className={`text-[10px] px-2 py-0.5 rounded-lg font-black ${
                activeTab === 'academic-writing' ? 'bg-white/25 text-white' : 'bg-indigo-100 text-indigo-800'
              }`}>
                Springer
              </span>
              <ChevronRight className={`w-4 h-4 ${activeTab === 'academic-writing' ? 'text-white' : 'text-slate-300 group-hover:text-indigo-500'}`} />
            </div>
          </button>

          {/* 3. Reading */}
          <button
            onClick={() => handleSelectCorePart('reading')}
            className={`w-full text-left p-3 rounded-2xl transition-all flex items-center justify-between gap-3 cursor-pointer group ${
              activeTab === 'reading'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200 font-bold'
                : 'hover:bg-emerald-50/80 text-slate-800'
            }`}
            id="sidebar-part-3-reading"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black shrink-0 ${
                activeTab === 'reading' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
              }`}>
                3
              </div>
              <div className="min-w-0 flex flex-col">
                <span className={`text-xs sm:text-sm font-black truncate leading-tight ${activeTab === 'reading' ? 'text-white' : 'text-slate-900'}`}>
                  Reading
                </span>
                <span className={`text-[11px] font-khmer truncate mt-0.5 ${activeTab === 'reading' ? 'text-emerald-100' : 'text-slate-500'}`}>
                  មេរៀនអានយល់ន័យ (Lessons)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <span className={`text-[10px] px-2 py-0.5 rounded-lg font-black ${
                activeTab === 'reading' ? 'bg-white/25 text-white' : 'bg-emerald-100 text-emerald-800'
              }`}>
                Grade 1
              </span>
              <ChevronRight className={`w-4 h-4 ${activeTab === 'reading' ? 'text-white' : 'text-slate-300 group-hover:text-emerald-500'}`} />
            </div>
          </button>

          {/* 4. Exercises (Clickable & Choose Sub-Category) */}
          <div className="space-y-1">
            <div
              onClick={() => handleSelectCorePart('exercises')}
              className={`w-full text-left p-3 rounded-2xl transition-all flex items-center justify-between gap-3 cursor-pointer group ${
                activeTab === 'exercises'
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-200 font-bold'
                  : 'hover:bg-amber-50/80 text-slate-800'
              }`}
              id="sidebar-part-4-exercises"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black shrink-0 ${
                  activeTab === 'exercises' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'
                }`}>
                  4
                </div>
                <div className="min-w-0 flex flex-col">
                  <span className={`text-xs sm:text-sm font-black truncate leading-tight ${activeTab === 'exercises' ? 'text-white' : 'text-slate-900'}`}>
                    Exercises
                  </span>
                  <span className={`text-[11px] font-khmer truncate mt-0.5 ${activeTab === 'exercises' ? 'text-amber-100' : 'text-slate-500'}`}>
                    លំហាត់អនុវត្ត (Choose Subject)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={toggleExercisesSubMenu}
                  className={`p-1 rounded-lg ${activeTab === 'exercises' ? 'hover:bg-white/20 text-white' : 'hover:bg-amber-100 text-slate-400'}`}
                >
                  {exercisesExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Exercises Sub-menu (Grammar / Writing / Reading) */}
            {exercisesExpanded && (
              <div className="pl-4 pr-1 py-1.5 space-y-1 bg-amber-50/50 rounded-2xl border border-amber-100/80 animate-in fade-in duration-150">
                <div className="px-2 py-1 text-[10px] font-black uppercase tracking-wider text-amber-800 font-khmer">
                  ជ្រើសរើសប្រភេទលំហាត់៖
                </div>

                {/* Sub: Grammar Exercises */}
                <button
                  onClick={() => handleSelectCorePart('exercises', 'grammar')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                    activeTab === 'exercises' && activeExerciseMode === 'grammar'
                      ? 'bg-sky-500 text-white font-black shadow-xs'
                      : 'hover:bg-amber-100/60 text-slate-700 font-semibold'
                  }`}
                  id="sidebar-sub-grammar-exercises"
                >
                  <span className="flex items-center gap-2">
                    <span>📚</span>
                    <span>Grammar Exercises</span>
                  </span>
                  <span className="text-[10px] opacity-80">145 Units</span>
                </button>

                {/* Sub: Writing Exercises */}
                <button
                  onClick={() => handleSelectCorePart('exercises', 'writing')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                    activeTab === 'exercises' && activeExerciseMode === 'writing'
                      ? 'bg-indigo-600 text-white font-black shadow-xs'
                      : 'hover:bg-amber-100/60 text-slate-700 font-semibold'
                  }`}
                  id="sidebar-sub-writing-exercises"
                >
                  <span className="flex items-center gap-2">
                    <span>📝</span>
                    <span>Writing Exercises</span>
                  </span>
                  <span className="text-[10px] opacity-80">Springer</span>
                </button>

                {/* Sub: Reading Exercises */}
                <button
                  onClick={() => handleSelectCorePart('exercises', 'reading')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                    activeTab === 'exercises' && activeExerciseMode === 'reading'
                      ? 'bg-emerald-600 text-white font-black shadow-xs'
                      : 'hover:bg-amber-100/60 text-slate-700 font-semibold'
                  }`}
                  id="sidebar-sub-reading-exercises"
                >
                  <span className="flex items-center gap-2">
                    <span>📖</span>
                    <span>Reading Exercises</span>
                  </span>
                  <span className="text-[10px] opacity-80">Stories</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Secondary Study Tools */}
        <div className="pt-2 border-t border-sky-100/80 space-y-2">
          <div className="px-3 text-[11px] font-black uppercase tracking-wider text-slate-400 font-khmer flex items-center justify-between">
            <span>ឧបករណ៍ជំនួយ / STUDY TOOLS</span>
          </div>

          <div className="space-y-1">
            {toolItems.map((tool) => {
              const isActive = activeTab === tool.id;
              return (
                <button
                  key={tool.id}
                  onClick={() => handleSelectCorePart(tool.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-center justify-between gap-3 cursor-pointer group ${
                    isActive
                      ? 'bg-slate-800 text-white shadow-xs font-bold'
                      : 'hover:bg-sky-50 text-slate-700'
                  }`}
                  id={`sidebar-tool-${tool.id}`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-sm shrink-0">{tool.emoji}</span>
                    <div className="min-w-0 flex flex-col">
                      <span className={`text-xs font-bold truncate leading-tight ${isActive ? 'text-white' : 'text-slate-800'}`}>
                        {tool.labelEn}
                      </span>
                      <span className={`text-[10px] font-khmer truncate ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                        {tool.labelKh}
                      </span>
                    </div>
                  </div>

                  {tool.badge && (
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-black ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {tool.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Level Filter */}
        <div className="pt-2 border-t border-sky-100/80 space-y-2">
          <div className="px-3 text-[11px] font-black uppercase tracking-wider text-slate-400 font-khmer flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-sky-500" />
            <span>កម្រិតវេយ្យាករណ៍ / Level</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 px-1">
            {(['all', 'elementary', 'intermediate', 'advanced'] as LevelType[]).map((lvl) => {
              const isSelected = selectedLevel === lvl;
              return (
                <button
                  key={lvl}
                  onClick={() => onSelectLevel(lvl)}
                  className={`py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                    isSelected
                      ? 'bg-sky-100 text-sky-900 border border-sky-300 shadow-xs font-black'
                      : 'bg-sky-50/50 hover:bg-sky-50 text-slate-600 border border-sky-100'
                  }`}
                  id={`sidebar-level-${lvl}`}
                >
                  {lvl === 'all' ? '🌟 All' : 
                   lvl === 'elementary' ? '🌱 Basic' : 
                   lvl === 'intermediate' ? '⚡ Inter' : '🚀 Adv'}
                </button>
              );
            })}
          </div>
        </div>

        {/* Learning Streak & Progress Summary Box */}
        <div className="p-4 bg-gradient-to-br from-sky-50 via-indigo-50/40 to-purple-50/30 rounded-3xl border border-sky-100 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-orange-600 font-bold text-xs">
              <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
              <span className="font-khmer">១២ ថ្ងៃ Streak</span>
            </div>
            <span className="text-[11px] font-black text-sky-700">{progressPercent}%</span>
          </div>

          <div>
            <div className="w-full bg-sky-200/60 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-sky-500 h-full rounded-full transition-all duration-500 shadow-xs"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-600">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{completedUnits.length} មេរៀនរៀនរួច</span>
            </span>
            <span className="text-slate-400">សរុប {units.length}</span>
          </div>
        </div>

      </div>

      {/* Sidebar Footer Controls: Audio Toggle */}
      <div className="p-4 border-t border-sky-100 bg-sky-50/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-slate-600">Interactive Audio</span>
        </div>

        {onToggleAudio && (
          <button
            onClick={onToggleAudio}
            title={isAudioEnabled ? 'បិទសំឡេង (Mute Sound)' : 'បើកសំឡេង (Enable Sound)'}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              isAudioEnabled 
                ? 'bg-white border-sky-200 text-sky-700 hover:bg-sky-50 shadow-xs'
                : 'bg-slate-100 border-slate-200 text-slate-400 hover:bg-slate-200'
            }`}
            id="sidebar-sound-toggle-btn"
          >
            {isAudioEnabled ? <Volume2 className="w-3.5 h-3.5 text-sky-600" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400" />}
            <span>{isAudioEnabled ? 'Sound ON' : 'Muted'}</span>
          </button>
        )}
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Persistent Left Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0 sticky top-0 h-screen z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Backdrop & Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            onClick={onCloseMobile}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" 
          />
          <div className="fixed inset-y-0 left-0 w-80 max-w-[85vw] z-50 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
