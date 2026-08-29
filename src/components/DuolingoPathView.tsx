import React, { useState, useEffect, useMemo } from 'react';
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Headphones, 
  Dumbbell, 
  Trophy, 
  Sparkles, 
  Check, 
  Play,
  RotateCcw,
  Zap,
  Gift,
  CheckCircle2,
  LockOpen,
  Volume2,
  Flame,
  Search,
  Award
} from 'lucide-react';
import { UnitData, PathNode, TabType, ExerciseItem } from '../types';
import { DuoMascot } from './DuoMascot';
import { DuolingoGuidebookModal } from './DuolingoGuidebookModal';
import { DuolingoLessonPlayer } from './DuolingoLessonPlayer';
import { soundManager } from '../utils/sound';

interface DuolingoPathViewProps {
  currentUnit: UnitData;
  allUnits: UnitData[];
  onSelectUnit: (unit: UnitData) => void;
  completedUnits: number[];
  onUnitCompleted: (unitId: number, xp: number, gems: number) => void;
  onSelectTab: (tab: TabType) => void;
  userHearts: number;
  onHeartLost: () => void;
}

const STORAGE_KEY_STEP_PROGRESS = 'kafa_duo_unit_steps_progress';

export const DuolingoPathView: React.FC<DuolingoPathViewProps> = ({
  currentUnit,
  allUnits,
  onSelectUnit,
  completedUnits,
  onUnitCompleted,
  onSelectTab,
  userHearts,
  onHeartLost
}) => {
  const [showGuidebook, setShowGuidebook] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);
  const [isPlayingLesson, setIsPlayingLesson] = useState(false);
  const [currentStepExercises, setCurrentStepExercises] = useState<ExerciseItem[]>([]);
  const [currentStepTitle, setCurrentStepTitle] = useState('');
  
  // Treasure Chest Modal state
  const [showChestModal, setShowChestModal] = useState(false);
  const [isChestOpened, setIsChestOpened] = useState(false);

  // Unit Search in right sidebar
  const [unitSearchQuery, setUnitSearchQuery] = useState('');
  const [showUnitPicker, setShowUnitPicker] = useState(false);

  // Track completed steps per unit (e.g. { [unitId]: [1, 2, 3] })
  const [unitSteps, setUnitSteps] = useState<Record<number, number[]>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STEP_PROGRESS);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed && typeof parsed === 'object' ? parsed : {};
      }
      return {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_STEP_PROGRESS, JSON.stringify(unitSteps));
    } catch (e) {
      console.warn('Could not save unit steps', e);
    }
  }, [unitSteps]);

  // Derive section number based on unit id (Section 1 to 6)
  const sectionNumber = Math.ceil(currentUnit.unitNumber / 25) || 1;
  const unitCompleted = completedUnits.includes(currentUnit.id);
  const completedStepsForThisUnit = useMemo(() => {
    if (unitCompleted) {
      return [1, 2, 3, 4, 5, 6];
    }
    return unitSteps[currentUnit.id] || [1]; // Step 1 unlocked by default
  }, [unitCompleted, unitSteps, currentUnit.id]);

  // Generate 6-step path nodes for the current unit's module
  const pathNodes: PathNode[] = [
    {
      id: `${currentUnit.id}-node-1`,
      type: 'lesson',
      titleEn: 'Lesson 1: Fundamentals',
      titleKh: 'មេរៀនគ្រឹះ & ក្បួនវេយ្យាករណ៍',
      xp: 10,
      status: completedStepsForThisUnit.includes(1) 
        ? (completedStepsForThisUnit.length > 1 ? 'completed' : 'active')
        : 'active',
      icon: 'star',
      stepIndex: 1,
      alignment: 'center'
    },
    {
      id: `${currentUnit.id}-node-2`,
      type: 'practice',
      titleEn: 'Lesson 2: Sentence Builder',
      titleKh: 'លំហាត់អនុវត្តរចនាសម្ព័ន្ធ',
      xp: 10,
      status: completedStepsForThisUnit.includes(2)
        ? 'completed'
        : completedStepsForThisUnit.includes(1) ? 'active' : 'locked',
      icon: 'star',
      stepIndex: 2,
      alignment: 'left'
    },
    {
      id: `${currentUnit.id}-node-3`,
      type: 'chest',
      titleEn: 'Bonus Chest (+20 Gems)',
      titleKh: 'ហិបកំណប់រង្វាន់ Gems & XP',
      xp: 15,
      status: completedStepsForThisUnit.includes(3)
        ? 'completed'
        : completedStepsForThisUnit.includes(2) ? 'active' : 'locked',
      icon: 'chest',
      stepIndex: 3,
      alignment: 'far-left'
    },
    {
      id: `${currentUnit.id}-node-4`,
      type: 'audio',
      titleEn: 'Lesson 3: Audio & Listening',
      titleKh: 'ការស្តាប់ និងបកប្រែជាភាសាខ្មែរ',
      xp: 10,
      status: completedStepsForThisUnit.includes(4)
        ? 'completed'
        : completedStepsForThisUnit.includes(3) ? 'active' : 'locked',
      icon: 'headphones',
      stepIndex: 4,
      alignment: 'left'
    },
    {
      id: `${currentUnit.id}-node-5`,
      type: 'practice',
      titleEn: 'Lesson 4: Review & Drill',
      titleKh: 'លំហាត់រំលឹកមេរៀនទូទៅ',
      xp: 15,
      status: completedStepsForThisUnit.includes(5)
        ? 'completed'
        : completedStepsForThisUnit.includes(4) ? 'active' : 'locked',
      icon: 'dumbbell',
      stepIndex: 5,
      alignment: 'center'
    },
    {
      id: `${currentUnit.id}-node-6`,
      type: 'trophy',
      titleEn: 'Unit Mastery Challenge',
      titleKh: 'តេស្តសាកល្បងបញ្ចប់ Unit',
      xp: 25,
      status: completedStepsForThisUnit.includes(6)
        ? 'completed'
        : completedStepsForThisUnit.includes(5) ? 'active' : 'locked',
      icon: 'trophy',
      stepIndex: 6,
      alignment: 'right'
    }
  ];

  const handleNextUnit = () => {
    const currentIdx = allUnits.findIndex(u => u.id === currentUnit.id);
    if (currentIdx < allUnits.length - 1) {
      onSelectUnit(allUnits[currentIdx + 1]);
    }
  };

  const handlePrevUnit = () => {
    const currentIdx = allUnits.findIndex(u => u.id === currentUnit.id);
    if (currentIdx > 0) {
      onSelectUnit(allUnits[currentIdx - 1]);
    }
  };

  // Build tailor-made exercises for each step mode
  const generateStepExercises = (stepIdx: number): ExerciseItem[] => {
    const baseExercises = currentUnit.exercises || [];
    const baseExamples = (currentUnit.sections || []).flatMap(s => s.examples || []);

    if (stepIdx === 0) {
      // Step 1: Fundamentals (Multiple Choice & Concept check)
      if (baseExercises.length > 0) {
        return baseExercises.slice(0, Math.min(3, baseExercises.length));
      }
      return [
        {
          id: `${currentUnit.id}-s1-1`,
          type: 'multiple-choice',
          instruction: `Select the correct usage for "${currentUnit.title}":`,
          khmerInstruction: `ជ្រើសរើសចម្លើយដែលត្រឹមត្រូវសម្រាប់មេរៀន ${currentUnit.khmerTitle}៖`,
          options: baseExamples.length >= 2 
            ? [baseExamples[0].en, baseExamples[1]?.en || 'I am going to work now.', 'She was been there.']
            : ['She is reading a book right now.', 'She reads books yesterday.', 'She reading now.'],
          correctAnswers: [baseExamples[0]?.en || 'She is reading a book right now.'],
          explanation: currentUnit.summary,
          khmerExplanation: currentUnit.khmerSummary
        }
      ];
    } else if (stepIdx === 1) {
      // Step 2: Sentence Builder
      if (baseExamples.length >= 2) {
        return baseExamples.slice(0, 3).map((ex, i) => ({
          id: `${currentUnit.id}-s2-${i}`,
          type: 'fill-blank',
          instruction: 'Construct the correct English sentence:',
          khmerInstruction: `បង្កើតប្រយោគ៖ ${ex.kh}`,
          correctAnswers: [ex.en],
          explanation: `Notice the pattern in "${ex.en}"`,
          khmerExplanation: ex.kh
        }));
      }
      return baseExercises.slice(0, 2);
    } else if (stepIdx === 3) {
      // Step 4: Audio Listening & Translation
      if (baseExamples.length > 0) {
        return baseExamples.slice(0, 3).map((ex, i) => ({
          id: `${currentUnit.id}-s4-${i}`,
          type: 'multiple-choice',
          instruction: `Listen carefully and select the correct Khmer translation: "${ex.en}"`,
          khmerInstruction: `ស្តាប់សំឡេង រួចជ្រើសរើសអត្ថន័យជាភាសាខ្មែរ៖`,
          options: [
            ex.kh,
            'គាត់កំពុងទៅផ្សារនៅពេលព្រឹក។',
            'ពួកយើងបានធ្វើកិច្ចការចប់សព្វគ្រប់កាលពីម្សិលមិញ។'
          ].sort(() => Math.random() - 0.5),
          correctAnswers: [ex.kh],
          explanation: `Pronunciation: "${ex.en}"`,
          khmerExplanation: ex.kh
        }));
      }
      return baseExercises;
    } else if (stepIdx === 4) {
      // Step 5: Active Review Drill
      if (baseExercises.length >= 2) {
        return baseExercises.slice(Math.max(0, baseExercises.length - 3));
      }
      return baseExercises;
    } else {
      // Step 6: Mastery Challenge (All questions combined)
      return baseExercises.length > 0 ? baseExercises : [
        {
          id: `${currentUnit.id}-s6-1`,
          type: 'multiple-choice',
          instruction: `Unit Mastery Test: Complete the sentence for "${currentUnit.title}"`,
          khmerInstruction: `តេស្តបញ្ចប់ Unit៖ ជ្រើសរើសចម្លើយត្រឹមត្រូវបំផុត៖`,
          options: baseExamples.length >= 2 
            ? [baseExamples[0].en, 'Incorrect sentence structure', 'Do not match the tense']
            : ['I am learning English grammar now.', 'I learns English grammar.', 'I learning English.'],
          correctAnswers: [baseExamples[0]?.en || 'I am learning English grammar now.'],
          explanation: currentUnit.summary,
          khmerExplanation: currentUnit.khmerSummary
        }
      ];
    }
  };

  const handleNodeClick = (node: PathNode, index: number) => {
    if (index === 2) {
      // Treasure chest step
      setShowChestModal(true);
      setIsChestOpened(completedStepsForThisUnit.includes(3));
      return;
    }

    setActiveStepIndex(index);
    setCurrentStepTitle(node.titleEn);
    const stepEx = generateStepExercises(index);
    setCurrentStepExercises(stepEx);
    setIsPlayingLesson(true);
  };

  const handleClaimChest = () => {
    setIsChestOpened(true);
    soundManager.playComplete();
    
    // Mark step 3 as completed and give rewards
    setUnitSteps(prev => {
      const current = prev[currentUnit.id] || [1, 2];
      if (!current.includes(3)) {
        return {
          ...prev,
          [currentUnit.id]: [...current, 3, 4] // Also unlock step 4
        };
      }
      return prev;
    });

    onUnitCompleted(currentUnit.id, 15, 20); // +15 XP, +20 Gems
  };

  const handleLessonPlayerComplete = (score: number, total: number, earnedXp: number, earnedGems: number) => {
    setIsPlayingLesson(false);

    if (activeStepIndex !== null) {
      const stepNum = activeStepIndex + 1;
      const nextStepNum = stepNum + 1;

      // Update completed steps
      setUnitSteps(prev => {
        const current = prev[currentUnit.id] || [1];
        const updated = Array.from(new Set([...current, stepNum, nextStepNum]));
        return {
          ...prev,
          [currentUnit.id]: updated
        };
      });

      // If completing step 6 or last step, mark unit completely done
      if (stepNum >= 6 || stepNum >= pathNodes.length) {
        onUnitCompleted(currentUnit.id, earnedXp + 20, earnedGems + 15);
      } else {
        onUnitCompleted(currentUnit.id, earnedXp, earnedGems);
      }
    }
  };

  // Node alignment Tailwind classes
  const getAlignmentClass = (alignment: PathNode['alignment']) => {
    switch (alignment) {
      case 'far-left': return '-translate-x-14 sm:-translate-x-20';
      case 'left': return '-translate-x-8 sm:-translate-x-12';
      case 'right': return 'translate-x-8 sm:translate-x-12';
      case 'far-right': return 'translate-x-14 sm:translate-x-20';
      default: return 'translate-x-0';
    }
  };

  const filteredUnits = useMemo(() => {
    if (!unitSearchQuery.trim()) return allUnits;
    const q = unitSearchQuery.toLowerCase();
    return allUnits.filter(u => 
      u.unitNumber.toString().includes(q) ||
      u.title.toLowerCase().includes(q) ||
      u.khmerTitle.toLowerCase().includes(q)
    );
  }, [allUnits, unitSearchQuery]);

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-2 select-none">
      
      {/* Responsive Layout: Learning Path on Left/Center, Compact Green Unit Widget on Right */}
      <div className="flex flex-col sm:flex-row items-start justify-center gap-6 lg:gap-8">
        
        {/* ========================================================= */}
        {/* CENTER / LEFT COLUMN: DUOLINGO 3D STEPPING PATH */}
        {/* ========================================================= */}
        <div className="flex-1 w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto flex flex-col items-center">
          
          {/* Stepping Stones S-Curve Path */}
          <div className="relative w-full py-4 flex flex-col items-center gap-7">
            
            {/* Duo Mascot standing cheerfully on path */}
            <div className="absolute -right-2 sm:right-2 top-20 z-10 hidden sm:block">
              <div className="relative">
                <DuoMascot pose="happy" size={72} />
                <div className="absolute -top-4 -left-6 bg-white border-2 border-[#E5E5E5] px-2 py-0.5 rounded-xl text-[9px] font-black text-slate-700 shadow-xs whitespace-nowrap">
                  Keep going! 🔥
                </div>
              </div>
            </div>

            {/* Stepping Stones Path Nodes (1 to 6) */}
            {pathNodes.map((node, idx) => {
              const stepNumber = idx + 1;
              const isCompleted = completedStepsForThisUnit.includes(stepNumber) || unitCompleted;
              const isCurrentActive = !isCompleted && (
                completedStepsForThisUnit.includes(stepNumber - 1) || 
                (idx === 0)
              );
              const isLocked = !isCompleted && !isCurrentActive;
              const isStartTarget = (isCurrentActive && idx === 0) || (idx === 0 && !isCompleted);

              return (
                <div 
                  key={node.id} 
                  className={`relative flex flex-col items-center transition-transform ${getAlignmentClass(node.alignment)}`}
                >
                  {/* Floating "START" Speech Bubble Tooltip */}
                  {isStartTarget && (
                    <div className="absolute -top-11 z-20 animate-bounce">
                      <div className="relative bg-white border-2 border-[#E5E5E5] text-[#58CC02] text-xs font-black uppercase tracking-widest px-3.5 py-1.5 rounded-2xl shadow-md flex items-center gap-1.5">
                        <span>START</span>
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-6 border-x-transparent border-t-6 border-t-white" />
                      </div>
                    </div>
                  )}

                  {/* Pulsing Glow Ring for active node */}
                  {isCurrentActive && (
                    <div className="absolute -inset-2 rounded-full border-4 border-[#58CC02]/30 animate-ping pointer-events-none" />
                  )}

                  {/* 3D Circular Node Button */}
                  <button
                    onClick={() => handleNodeClick(node, idx)}
                    className={`relative w-16 h-16 sm:w-18 sm:h-18 rounded-full flex items-center justify-center transition-all cursor-pointer select-none active:translate-y-1 ${
                      isCompleted
                        ? 'bg-[#FFC800] border-b-6 border-[#E5A500] text-white shadow-md hover:brightness-105 active:border-b-0'
                        : isCurrentActive
                          ? 'bg-[#58CC02] border-b-6 border-[#58A700] text-white shadow-lg hover:brightness-105 active:border-b-0'
                          : 'bg-[#E5E5E5] border-b-6 border-[#CECECE] text-slate-500 shadow-xs hover:bg-[#DCDCDC] active:border-b-0'
                    }`}
                    id={`duo-path-node-${idx}`}
                    title={node.titleEn}
                  >
                    {/* Node Icon */}
                    {isCompleted ? (
                      <Check className="w-7 h-7 stroke-[3.5]" />
                    ) : node.icon === 'star' ? (
                      <Star className="w-7 h-7 fill-current stroke-[2.5]" />
                    ) : node.icon === 'chest' ? (
                      <span className="text-xl animate-pulse">🎁</span>
                    ) : node.icon === 'headphones' ? (
                      <Headphones className="w-7 h-7 stroke-[2.5]" />
                    ) : node.icon === 'dumbbell' ? (
                      <Dumbbell className="w-7 h-7 stroke-[2.5]" />
                    ) : (
                      <Trophy className="w-7 h-7 stroke-[2.5] fill-current" />
                    )}
                  </button>

                  {/* Node Title Label */}
                  <div className="mt-1.5 text-center max-w-[140px]">
                    <span className="text-xs font-black text-slate-700 block truncate">
                      {node.titleEn}
                    </span>
                    <span className="text-[11px] font-khmer text-slate-400 block line-clamp-1">
                      {node.titleKh}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Next Unit Unlock Milestone Card */}
            <div className="w-full mt-4 p-4 sm:p-5 bg-white border-2 border-[#E5E5E5] rounded-3xl text-center space-y-2.5 shadow-xs">
              <div className="flex justify-center">
                <div className="w-10 h-10 rounded-2xl bg-[#FFC800]/20 flex items-center justify-center text-xl">
                  🏆
                </div>
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-extrabold text-slate-800">
                  Unit {currentUnit.unitNumber} Mastery Complete?
                </h4>
                <p className="text-xs font-khmer text-slate-500">
                  បន្តទៅកាន់ Unit {currentUnit.unitNumber + 1} ឬហាត់សមឡើងវិញដើម្បីទទួលបានពិន្ទុ Legendary!
                </p>
              </div>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handleNextUnit}
                  disabled={currentUnit.unitNumber >= allUnits.length}
                  className="py-2 px-4.5 bg-[#58CC02] hover:bg-[#46A302] active:translate-y-0.5 text-white text-xs font-black uppercase tracking-wider rounded-2xl border-b-4 border-[#58A700] active:border-b-0 shadow-sm transition-all cursor-pointer"
                >
                  NEXT UNIT ({currentUnit.unitNumber + 1}) →
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT SIDEBAR: COMPACT GREEN BANNER ON THE RIGHT SIDE */}
        {/* ========================================================= */}
        <aside className="w-full sm:w-72 lg:w-80 shrink-0 sm:sticky top-20 space-y-3">
          
          {/* 1. Small Compact Green Unit Header Widget */}
          <div 
            className="bg-[#58CC02] text-white rounded-2xl p-3 sm:p-3.5 shadow-xs border-b-4 border-[#58A700] relative overflow-hidden"
            id="sidebar-duo-unit-banner"
          >
            {/* Top Row: < SECTION X, UNIT Y > & GUIDEBOOK button */}
            <div className="flex items-center justify-between gap-1 mb-1.5">
              <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-white/95">
                <button
                  onClick={handlePrevUnit}
                  disabled={currentUnit.unitNumber <= 1}
                  className="p-0.5 hover:bg-black/10 rounded-md disabled:opacity-30 cursor-pointer transition-colors"
                  title="Previous Unit"
                >
                  <ChevronLeft className="w-3.5 h-3.5 stroke-[3]" />
                </button>

                <span>SECTION {sectionNumber}, UNIT {currentUnit.unitNumber}</span>

                <button
                  onClick={handleNextUnit}
                  disabled={currentUnit.unitNumber >= allUnits.length}
                  className="p-0.5 hover:bg-black/10 rounded-md disabled:opacity-30 cursor-pointer transition-colors"
                  title="Next Unit"
                >
                  <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                </button>
              </div>

              {/* Guidebook Button */}
              <button
                onClick={() => setShowGuidebook(true)}
                className="shrink-0 flex items-center gap-1 py-1 px-2.5 bg-white/20 hover:bg-white/30 active:translate-y-0.5 text-white text-[10px] font-black uppercase tracking-wider rounded-xl border-b border-black/20 shadow-xs transition-all cursor-pointer"
                id="sidebar-open-guidebook-btn"
              >
                <BookOpen className="w-3 h-3 stroke-[2.5]" />
                <span>GUIDEBOOK</span>
              </button>
            </div>

            {/* Main Title & Khmer Translation */}
            <div className="space-y-0.5">
              <h2 className="text-xs sm:text-sm font-black leading-snug tracking-tight text-white">
                {currentUnit.title}
              </h2>
              <p className="text-[11px] sm:text-xs font-khmer text-white/90 font-medium leading-normal">
                {currentUnit.khmerTitle}
              </p>
            </div>

            {/* Quick Step Indicators inside card */}
            <div className="mt-2 pt-1.5 border-t border-white/20 flex items-center justify-between text-[10px] font-black text-white/90">
              <span>Unit Progress:</span>
              <span className="bg-white/20 px-1.5 py-0.5 rounded-md text-[9px]">
                {completedStepsForThisUnit.length}/6 Done
              </span>
            </div>
          </div>

          {/* 2. Unit Step Progress & Jump Matrix Card */}
          <div className="p-3.5 bg-white border-2 border-[#E5E5E5] rounded-2xl space-y-2.5 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-sm">🎯</span>
                <span className="text-xs font-black text-slate-800">Unit Steps (6 Nodes)</span>
              </div>
              <button
                onClick={() => setShowUnitPicker(prev => !prev)}
                className="text-[11px] font-bold text-[#1CB0F6] hover:underline cursor-pointer flex items-center gap-1"
              >
                <Search className="w-3 h-3" />
                <span>Jump Unit</span>
              </button>
            </div>

            {/* Step list with instant click launcher */}
            <div className="space-y-1">
              {pathNodes.map((node, idx) => {
                const stepNum = idx + 1;
                const isDone = completedStepsForThisUnit.includes(stepNum) || unitCompleted;
                return (
                  <button
                    key={node.id}
                    onClick={() => handleNodeClick(node, idx)}
                    className="w-full flex items-center justify-between p-1.5 px-2 rounded-xl border border-[#E5E5E5] hover:border-[#58CC02] hover:bg-[#F4FBEF] transition-all text-left cursor-pointer group"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className={`w-5.5 h-5.5 rounded-md flex items-center justify-center text-[10px] font-black shrink-0 ${
                        isDone 
                          ? 'bg-[#58CC02] text-white' 
                          : 'bg-slate-100 text-slate-500 group-hover:bg-[#58CC02] group-hover:text-white'
                      }`}>
                        {isDone ? '✓' : stepNum}
                      </div>
                      <div className="min-w-0">
                        <span className="block text-xs font-bold text-slate-800 truncate">
                          {node.titleEn}
                        </span>
                        <span className="block text-[10px] font-khmer text-slate-400 truncate">
                          {node.titleKh}
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-black text-[#FF9600] shrink-0 ml-1">
                      +{node.xp} XP
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Unit Search / Directory Dropdown */}
            {showUnitPicker && (
              <div className="pt-2 border-t border-slate-100 space-y-1.5 animate-in fade-in duration-150">
                <input
                  type="text"
                  placeholder="Search Unit # or keyword..."
                  value={unitSearchQuery}
                  onChange={(e) => setUnitSearchQuery(e.target.value)}
                  className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:bg-white focus:border-[#1CB0F6] outline-hidden"
                  autoFocus
                />
                <div className="max-h-44 overflow-y-auto space-y-1 pr-1 text-xs">
                  {filteredUnits.slice(0, 15).map(u => (
                    <button
                      key={u.id}
                      onClick={() => {
                        onSelectUnit(u);
                        setShowUnitPicker(false);
                        setUnitSearchQuery('');
                      }}
                      className={`w-full text-left px-2 py-1 rounded-md flex items-center justify-between transition-colors cursor-pointer ${
                        u.id === currentUnit.id ? 'bg-[#DDF4FF] text-[#1CB0F6] font-black' : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <span className="truncate text-xs">Unit {u.unitNumber}: {u.title}</span>
                      {completedUnits.includes(u.id) && <span className="text-[#58CC02] text-xs">✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* 3. Grammar Key Notes Preview */}
          <div className="p-3 bg-gradient-to-br from-[#FFF9E6] to-[#FFF4D9] border border-[#FFD97D] rounded-2xl space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] font-black text-amber-900 uppercase tracking-wider">
              <span>💡</span>
              <span>Quick Key Concept:</span>
            </div>
            <p className="text-[11px] sm:text-xs font-bold text-amber-950 leading-relaxed">
              {currentUnit.summary}
            </p>
            <p className="text-[11px] font-khmer text-amber-900 leading-relaxed pt-1 border-t border-amber-200/60">
              {currentUnit.khmerSummary}
            </p>
          </div>

        </aside>

      </div>

      {/* ========================================================= */}
      {/* TREASURE CHEST BONUS MODAL */}
      {/* ========================================================= */}
      {showChestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 border-2 border-[#E5E5E5] shadow-2xl text-center space-y-5 relative">
            <div className="w-20 h-20 rounded-3xl bg-[#FFF4D9] border-2 border-[#FFC800] text-4xl flex items-center justify-center mx-auto shadow-sm">
              🎁
            </div>

            <div className="space-y-1">
              <span className="text-xs font-black uppercase tracking-wider text-[#FF9600]">
                UNIT {currentUnit.unitNumber} BONUS CHEST
              </span>
              <h3 className="text-xl font-extrabold text-slate-900">
                {isChestOpened ? 'Treasure Claimed!' : 'You Unlocked a Treasure Chest!'}
              </h3>
              <p className="text-xs font-khmer text-slate-500">
                {isChestOpened 
                  ? 'អ្នកបានទទួលរង្វាន់ហិបកំណប់នេះរួចរាល់ហើយ!' 
                  : 'បើកហិបកំណប់ដើម្បីទទួលបាន Gems និង XP បន្ថែម!'}
              </p>
            </div>

            <div className="p-4 bg-[#F7F7F7] rounded-2xl border border-slate-200 flex items-center justify-around text-sm font-black">
              <span className="flex items-center gap-1.5 text-[#FF9600]">
                ⚡ +15 XP
              </span>
              <span className="flex items-center gap-1.5 text-[#1CB0F6]">
                💎 +20 Gems
              </span>
            </div>

            <div className="space-y-2">
              {!isChestOpened ? (
                <button
                  onClick={handleClaimChest}
                  className="w-full py-4 bg-[#FFC800] hover:bg-[#E5B400] active:translate-y-1 text-slate-900 text-sm font-black uppercase tracking-wider rounded-2xl border-b-4 border-[#C79C00] active:border-b-0 shadow-md transition-all cursor-pointer"
                >
                  OPEN CHEST (+20 💎)
                </button>
              ) : (
                <button
                  onClick={() => setShowChestModal(false)}
                  className="w-full py-3.5 bg-[#58CC02] hover:bg-[#46A302] text-white text-sm font-black uppercase tracking-wider rounded-2xl border-b-4 border-[#58A700] active:translate-y-0.5 cursor-pointer"
                >
                  CONTINUE LEARNING
                </button>
              )}

              <button
                onClick={() => setShowChestModal(false)}
                className="w-full py-2 text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-wider cursor-pointer"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Guidebook Modal */}
      <DuolingoGuidebookModal
        unit={currentUnit}
        isOpen={showGuidebook}
        onClose={() => setShowGuidebook(false)}
        onStartLesson={() => {
          setShowGuidebook(false);
          setActiveStepIndex(0);
          setCurrentStepTitle('Lesson 1: Fundamentals');
          setCurrentStepExercises(generateStepExercises(0));
          setIsPlayingLesson(true);
        }}
      />

      {/* Full-Screen Interactive Lesson Player */}
      {isPlayingLesson && (
        <DuolingoLessonPlayer
          unit={currentUnit}
          customExercises={currentStepExercises}
          stepTitle={currentStepTitle}
          stepNumber={(activeStepIndex !== null ? activeStepIndex + 1 : 1)}
          onComplete={handleLessonPlayerComplete}
          onClose={() => setIsPlayingLesson(false)}
          initialHearts={userHearts}
          onHeartLost={onHeartLost}
        />
      )}

    </div>
  );
};
