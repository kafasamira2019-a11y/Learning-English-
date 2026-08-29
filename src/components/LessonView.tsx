import React, { useState } from 'react';
import { 
  Volume2, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  BookOpen, 
  Check, 
  Sparkles, 
  Award, 
  ChevronRight,
  Flame,
  Zap,
  Layers,
  Eye,
  EyeOff,
  Gauge
} from 'lucide-react';
import { UnitData, LevelType, CategoryType } from '../types';
import { soundManager } from '../utils/sound';

interface LessonViewProps {
  units: UnitData[];
  selectedUnit: UnitData;
  onSelectUnit: (unit: UnitData) => void;
  onGoToExercises?: (unit: UnitData) => void;
  onGoToQuiz?: (unit: UnitData) => void;
  onStartExercises?: (unit: UnitData) => void;
  onStartQuiz?: (unit: UnitData) => void;
  completedUnits: number[];
  onToggleComplete: (unitId: number) => void;
  searchQuery?: string;
  selectedLevel?: LevelType;
}

const CATEGORIES: { id: CategoryType | 'all'; labelEn: string; labelKh: string; emoji: string }[] = [
  { id: 'all', labelEn: 'All Units', labelKh: 'គ្រប់មេរៀន', emoji: '🌟' },
  { id: 'present-past', labelEn: 'Present & Past', labelKh: 'បច្ចុប្បន្ន & អតីត', emoji: '🕒' },
  { id: 'present-perfect', labelEn: 'Present Perfect', labelKh: 'កាលបរិបូណ៌', emoji: '⏱️' },
  { id: 'future', labelEn: 'Future Tenses', labelKh: 'អនាគតកាល', emoji: '🚀' },
  { id: 'modals', labelEn: 'Modals (Can/Must/Should)', labelKh: 'កិរិយាសព្ទជំនួយ', emoji: '🎯' },
  { id: 'if-wish', labelEn: 'If & Wish (Conditionals)', labelKh: 'ប្រយោគលក្ខខណ្ឌ', emoji: '🔮' },
  { id: 'passive', labelEn: 'Passive Voice', labelKh: 'កម្មបទកិរិយា', emoji: '🔄' },
  { id: 'reported-speech', labelEn: 'Reported Speech', labelKh: 'សម្ដីបន្ត', emoji: '💬' },
  { id: 'questions-aux', labelEn: 'Questions & Tags', labelKh: 'សំណួរ & Tags', emoji: '❓' },
  { id: 'ing-to', labelEn: '-ing & to-infinitive', labelKh: 'Gerund & Infinitive', emoji: '🔤' },
  { id: 'articles-nouns', labelEn: 'Articles & Nouns', labelKh: 'នាមសព្ទ & ឧបសគ្គ', emoji: '🏷️' },
  { id: 'pronouns', labelEn: 'Pronouns & Determiners', labelKh: 'សព្វនាម & កំណត់នាម', emoji: '👥' },
  { id: 'adjectives-adverbs', labelEn: 'Adjectives & Adverbs', labelKh: 'គុណនាម & គុណកិរិយា', emoji: '🎨' },
  { id: 'prepositions', labelEn: 'Prepositions', labelKh: 'ធ្នាក់ (in/on/at)', emoji: '📍' },
  { id: 'phrasal-verbs', labelEn: 'Phrasal Verbs', labelKh: 'កន្សោមកិរិយាសព្ទ', emoji: '⚡' },
];

export const LessonView: React.FC<LessonViewProps> = ({
  units,
  selectedUnit,
  onSelectUnit,
  onGoToExercises,
  onGoToQuiz,
  onStartExercises,
  onStartQuiz,
  completedUnits,
  onToggleComplete,
  searchQuery = '',
  selectedLevel = 'all'
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'all'>('all');
  const [showKhmer, setShowKhmer] = useState<boolean>(true);
  const [audioSpeed, setAudioSpeed] = useState<'normal' | 'slow'>('normal');
  const [quickAnswers, setQuickAnswers] = useState<{ [key: string]: string }>({});
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const [showExplanations, setShowExplanations] = useState<{ [key: string]: boolean }>({});

  const handleStartEx = (u: UnitData) => {
    if (onGoToExercises) onGoToExercises(u);
    else if (onStartExercises) onStartExercises(u);
  };

  const handleStartQz = (u: UnitData) => {
    if (onGoToQuiz) onGoToQuiz(u);
    else if (onStartQuiz) onStartQuiz(u);
  };

  // Filter units for sidebar if search/level/category active
  const filteredUnits = units.filter(u => {
    const matchesLevel = selectedLevel === 'all' || u.level === selectedLevel;
    const matchesCategory = selectedCategory === 'all' || u.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      u.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.khmerTitle.includes(searchQuery) ||
      u.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.unitNumber.toString() === searchQuery.trim();
    return matchesLevel && matchesCategory && matchesSearch;
  });

  const currentIndex = units.findIndex(u => u.id === selectedUnit.id);
  const prevUnit = currentIndex > 0 ? units[currentIndex - 1] : null;
  const nextUnit = currentIndex < units.length - 1 ? units[currentIndex + 1] : null;

  const isCompleted = completedUnits.includes(selectedUnit.id);

  const handleSpeak = (text: string) => {
    soundManager.speak(text, 'en-US', audioSpeed === 'slow' ? 0.72 : 0.92);
  };

  const handleCheckQuickAnswer = (exerciseId: string, correctAnswers: string[]) => {
    const userVal = (quickAnswers[exerciseId] || '').trim().toLowerCase();
    const isRight = correctAnswers.some(ans => ans.toLowerCase().trim() === userVal);
    
    setCheckedItems(prev => ({ ...prev, [exerciseId]: true }));
    setShowExplanations(prev => ({ ...prev, [exerciseId]: true }));

    if (isRight) {
      soundManager.playCorrect();
    } else {
      soundManager.playIncorrect();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

      {/* Category Quick Filter Carousel */}
      <div className="bg-white rounded-3xl p-3 sm:p-4 border border-sky-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map((cat) => {
            const count = cat.id === 'all' 
              ? units.length 
              : units.filter(u => u.category === cat.id).length;
            const isCatActive = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold shrink-0 transition-all flex items-center gap-2 cursor-pointer ${
                  isCatActive
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-200'
                    : 'bg-sky-50/60 hover:bg-sky-100/70 text-slate-700 border border-sky-100'
                }`}
                id={`cat-filter-${cat.id}`}
              >
                <span>{cat.emoji}</span>
                <span className="font-sans">{cat.labelEn}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-black ${
                  isCatActive ? 'bg-white/20 text-white' : 'bg-white text-sky-800'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Sidebar: Units Navigation List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-sky-100 shadow-sm">
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-sky-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600 font-bold">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-bold text-slate-900 text-sm">Units / មាតិការមេរៀន</h2>
                  <p className="text-[11px] text-slate-400 font-khmer">ជ្រើសរើសមេរៀនដើម្បីសិក្សា</p>
                </div>
              </div>
              <span className="text-xs px-2.5 py-0.5 bg-sky-50 text-sky-700 rounded-full font-bold border border-sky-100">
                {filteredUnits.length} Units
              </span>
            </div>

            <div className="space-y-2 max-h-[calc(100vh-270px)] overflow-y-auto pr-1">
              {filteredUnits.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs">
                  <p>គ្មានមេរៀនត្រូវតាមការស្វែងរកទេ</p>
                </div>
              ) : (
                filteredUnits.map((unit) => {
                  const isSelected = unit.id === selectedUnit.id;
                  const unitDone = completedUnits.includes(unit.id);
                  return (
                    <button
                      key={unit.id}
                      onClick={() => {
                        onSelectUnit(unit);
                        setQuickAnswers({});
                        setCheckedItems({});
                        setShowExplanations({});
                      }}
                      className={`w-full text-left p-3 rounded-2xl transition-all flex items-start gap-3 cursor-pointer ${
                        isSelected
                          ? 'bg-sky-50 border-2 border-sky-300 text-sky-950 shadow-sm'
                          : 'hover:bg-sky-50/50 border border-slate-100/80 text-slate-700'
                      }`}
                      id={`unit-nav-${unit.id}`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 mt-0.5 shadow-xs ${
                        isSelected
                          ? 'bg-sky-500 text-white shadow-sky-200'
                          : unitDone 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-sky-100/70 text-sky-800'
                      }`}>
                        {unitDone ? <Check className="w-4 h-4" /> : unit.unitNumber}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-bold text-sm truncate text-slate-900">{unit.title}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider shrink-0 ${
                            unit.level === 'elementary' ? 'bg-[#D7FFB8] text-[#58A700] border border-[#58CC02]' :
                            unit.level === 'intermediate' ? 'bg-[#FFF0D4] text-[#D97706] border border-[#FF9600]' : 
                            'bg-[#FFE5E5] text-[#E53935] border border-[#FF4B4B]'
                          }`}>
                            {unit.level === 'elementary' ? 'EASY' : unit.level === 'intermediate' ? 'MEDIUM' : 'HARD'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 font-khmer truncate mt-0.5">{unit.khmerTitle}</p>
                      </div>
                      {isSelected && <ChevronRight className="w-4 h-4 text-sky-600 shrink-0 self-center" />}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right Main Content: Lesson Details */}
        <div className="lg:col-span-8 space-y-6" id="lesson-main-content">
          
          {/* Header Card with Vibrant Palette styling */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-sky-100 shadow-sm relative overflow-hidden">
            
            {/* Top Controls & Meta Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-sky-500 text-white font-black text-xs rounded-xl shadow-xs shadow-sky-100">
                  Unit {selectedUnit.unitNumber}
                </span>
                <span className="text-xs font-bold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                  {selectedUnit.categoryName}
                </span>
                <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider ${
                  selectedUnit.level === 'elementary' ? 'bg-[#D7FFB8] text-[#58A700] border border-[#58CC02]' :
                  selectedUnit.level === 'intermediate' ? 'bg-[#FFF0D4] text-[#D97706] border border-[#FF9600]' : 
                  'bg-[#FFE5E5] text-[#E53935] border border-[#FF4B4B]'
                }`}>
                  {selectedUnit.level === 'elementary' ? 'EASY' : selectedUnit.level === 'intermediate' ? 'MEDIUM' : 'HARD'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Audio Speed Toggle */}
                <button
                  onClick={() => setAudioSpeed(prev => prev === 'normal' ? 'slow' : 'normal')}
                  title="ប្តូរល្បឿនបញ្ចេញសំឡេង (Audio Speed)"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 cursor-pointer"
                  id="toggle-audio-speed-btn"
                >
                  <Gauge className="w-3.5 h-3.5 text-sky-600" />
                  <span>{audioSpeed === 'slow' ? '🐢 0.75x Slow' : '⚡ 1.0x Normal'}</span>
                </button>

                {/* Khmer Toggle */}
                <button
                  onClick={() => setShowKhmer(prev => !prev)}
                  title="បិទ/បើកការពន្យល់ភាសាខ្មែរ (Toggle Khmer translation)"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-sky-50 hover:bg-sky-100 text-slate-700 border border-sky-200 cursor-pointer"
                  id="toggle-khmer-btn"
                >
                  {showKhmer ? <Eye className="w-3.5 h-3.5 text-sky-600" /> : <EyeOff className="w-3.5 h-3.5 text-slate-400" />}
                  <span className="font-khmer">{showKhmer ? 'ខ្មែរ (On)' : 'English Only'}</span>
                </button>

                {/* Complete Button */}
                <button
                  onClick={() => onToggleComplete(selectedUnit.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isCompleted
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-xs'
                      : 'bg-sky-50 text-slate-600 hover:bg-sky-100 border border-sky-200'
                  }`}
                  id="toggle-complete-btn"
                >
                  <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span className="font-khmer">{isCompleted ? 'បានរៀនរួចហើយ' : 'សម្គាល់ថាបានរៀនរួច'}</span>
                </button>
              </div>
            </div>

            {/* Lesson Title */}
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
              {selectedUnit.title}
            </h1>
            {showKhmer && (
              <p className="text-base sm:text-lg text-sky-700 font-bold font-khmer mt-1">
                {selectedUnit.khmerTitle}
              </p>
            )}

            {/* Lesson Summary Highlight Box */}
            <div className="mt-4 p-5 bg-sky-50/70 rounded-2xl border border-sky-100">
              <div className="flex items-center gap-2 text-xs font-bold text-sky-800 uppercase tracking-wider mb-1.5">
                <span className="p-1 bg-yellow-100 rounded-lg text-xs">📖</span>
                <span>Summary / សេចក្ដីសង្ខេប</span>
              </div>
              <p className="text-slate-800 text-base font-semibold">{selectedUnit.summary}</p>
              {showKhmer && (
                <p className="text-slate-600 text-sm sm:text-base font-khmer mt-1.5">{selectedUnit.khmerSummary}</p>
              )}
            </div>

            {/* Action Bar */}
            <div className="mt-5 flex flex-wrap items-center gap-3 pt-4 border-t border-sky-100">
              {(selectedUnit.exercises && selectedUnit.exercises.length > 0) && (
                <button
                  onClick={() => handleStartEx(selectedUnit)}
                  className="flex items-center gap-2 px-6 py-2.5 bg-sky-500 hover:bg-sky-600 text-white rounded-xl text-sm font-bold shadow-md shadow-sky-100 transition-all cursor-pointer font-khmer"
                  id="start-unit-exercises-btn"
                >
                  <span>ធ្វើលំហាត់អនុវត្ត ({selectedUnit.exercises.length} សំណួរ)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={() => handleStartQz(selectedUnit)}
                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-md shadow-indigo-100 transition-all cursor-pointer font-khmer"
                id="start-unit-quiz-btn"
              >
                <Sparkles className="w-4 h-4" />
                <span>តេស្ត Quiz ភ្លាមៗ</span>
              </button>
            </div>
          </div>

          {/* Lesson Sections (Rules & Explanations) */}
          <div className="space-y-6">
            {selectedUnit.sections && selectedUnit.sections.map((section, sIdx) => (
              <div 
                key={sIdx}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-sky-100 shadow-sm space-y-4"
                id={`lesson-section-${sIdx}`}
              >
                {/* Section Title */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-sky-500 text-white font-black flex items-center justify-center text-sm shrink-0 shadow-sm shadow-sky-200">
                    {String.fromCharCode(65 + sIdx)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">{section.title}</h3>
                    {showKhmer && section.khmerTitle && (
                      <p className="text-sm font-bold text-sky-700 font-khmer mt-0.5">{section.khmerTitle}</p>
                    )}
                  </div>
                </div>

                {/* Formula Highlight */}
                {section.formula && (
                  <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200">
                    <span className="text-[11px] uppercase font-bold text-sky-800 tracking-wider block mb-1">
                      Grammar Formula / រូបមន្តវេយ្យាករណ៍
                    </span>
                    <code className="text-sm sm:text-base font-black text-sky-950 font-mono">
                      {section.formula}
                    </code>
                  </div>
                )}

                {/* Explanations (EN + KH) */}
                <div className="space-y-2.5 text-base text-slate-800 leading-relaxed">
                  <p className="font-medium">{section.explanation}</p>
                  {showKhmer && (
                    <p className="text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-100 font-khmer text-base">
                      {section.khmerExplanation}
                    </p>
                  )}
                </div>

                {/* Comparisons if available */}
                {section.comparisons && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div className="p-4 bg-orange-50/70 border border-orange-200 rounded-2xl">
                      <h4 className="font-bold text-orange-900 text-sm uppercase mb-2 flex items-center gap-1.5">
                        <span>🔥</span>
                        <span>{section.comparisons.leftTitle}</span>
                      </h4>
                      <ul className="space-y-1.5 text-sm text-slate-800">
                        {section.comparisons.leftExamples && section.comparisons.leftExamples.map((ex, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-orange-500 font-bold">•</span>
                            <span>{ex}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl">
                      <h4 className="font-bold text-emerald-900 text-sm uppercase mb-2 flex items-center gap-1.5">
                        <span>✅</span>
                        <span>{section.comparisons.rightTitle}</span>
                      </h4>
                      <ul className="space-y-1.5 text-sm text-slate-800">
                        {section.comparisons.rightExamples && section.comparisons.rightExamples.map((ex, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-500 font-bold">•</span>
                            <span>{ex}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Key Notes list */}
                {section.keyNotes && section.keyNotes.length > 0 && (
                  <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl">
                    <span className="text-sm font-bold text-indigo-900 block mb-2 font-khmer">
                      Key Expressions & Verbs / កិរិយាសព្ទសំខាន់ៗ៖
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {section.keyNotes && section.keyNotes.map((note, idx) => (
                        <span key={idx} className="px-3 py-1.5 bg-white text-indigo-800 border border-indigo-200 rounded-xl text-sm font-bold shadow-xs">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Examples with TTS Sound */}
                {section.examples && section.examples.length > 0 && (
                  <div className="space-y-2.5 pt-2">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 font-khmer">
                      Examples in context / ឧទាហរណ៍ជាក់ស្តែង
                    </h4>
                    <div className="grid grid-cols-1 gap-2.5">
                      {section.examples && section.examples.map((ex, exIdx) => (
                        <div 
                          key={exIdx} 
                          className="flex items-start justify-between gap-3 p-4 bg-slate-50/80 hover:bg-sky-50/70 rounded-2xl border border-slate-100 transition-colors group"
                        >
                          <div className="space-y-1 flex-1">
                            <p className="text-base font-bold text-slate-900 flex items-center gap-2">
                              <span>{ex.en}</span>
                            </p>
                            {showKhmer && (
                              <p className="text-sm sm:text-base text-slate-600 font-khmer">{ex.kh}</p>
                            )}
                            {ex.note && (
                              <p className="text-xs sm:text-sm text-amber-700 italic font-semibold">💡 {ex.note}</p>
                            )}
                          </div>
                          <button
                            onClick={() => handleSpeak(ex.en)}
                            title="ស្តាប់ការបញ្ចេញសំឡេង (Pronounce)"
                            className="p-2 rounded-xl bg-white border border-sky-100 text-sky-600 hover:text-sky-700 hover:bg-sky-50 transition-colors shrink-0 shadow-xs cursor-pointer"
                            id={`speak-btn-${sIdx}-${exIdx}`}
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            ))}
          </div>

          {/* Quick Check Practice Box */}
          {selectedUnit.exercises && selectedUnit.exercises.length > 0 && (
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-sky-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="p-2 bg-green-100 rounded-xl text-green-700 text-base">📝</span>
                  <h3 className="font-bold text-slate-900 text-lg font-khmer">Quick Practice / សាកល្បងអនុវត្តរហ័ស</h3>
                </div>
                <span className="text-xs font-bold text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
                  Instant Feedback
                </span>
              </div>
              <p className="text-xs text-slate-500 font-khmer">សាកល្បងធ្វើសំណួរខាងក្រោម ដើម្បីដឹងថាតើអ្នកយល់មេរៀននេះច្បាស់កម្រិតណា៖</p>

              <div className="space-y-4">
                {selectedUnit.exercises.slice(0, 2).map((ex) => {
                  const isChecked = checkedItems[ex.id];
                  const userVal = (quickAnswers[ex.id] || '').trim().toLowerCase();
                  const isCorrect = ex.correctAnswers.some(ans => ans.toLowerCase().trim() === userVal);

                  return (
                    <div key={ex.id} className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200/80 space-y-3">
                      <p className="text-sm font-bold text-slate-900">
                        {ex.instruction} <span className="text-xs text-slate-500 font-khmer font-normal">({ex.khmerInstruction})</span>
                      </p>
                      
                      {ex.context && (
                        <p className="text-sm font-semibold text-slate-900 bg-white p-3 rounded-xl border border-slate-100">
                          {ex.context}
                        </p>
                      )}
                      {ex.prompt && (
                        <p className="text-sm font-semibold text-slate-900 bg-white p-3 rounded-xl border border-slate-100">
                          {ex.prompt}
                        </p>
                      )}

                      {/* Options or Input */}
                      {ex.type === 'multiple-choice' && ex.options && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {ex.options.map((opt, oIdx) => {
                            const isSelected = quickAnswers[ex.id] === opt;
                            let btnStyle = 'bg-white hover:bg-sky-50 border-slate-200 text-slate-800';
                            if (isChecked) {
                              if (ex.correctAnswers.includes(opt)) {
                                btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold';
                              } else if (isSelected) {
                                btnStyle = 'bg-rose-100 border-rose-400 text-rose-900';
                              }
                            } else if (isSelected) {
                              btnStyle = 'bg-sky-100 border-sky-400 text-sky-900 font-bold';
                            }

                            return (
                              <button
                                key={oIdx}
                                onClick={() => {
                                  if (!isChecked) {
                                    setQuickAnswers(prev => ({ ...prev, [ex.id]: opt }));
                                  }
                                }}
                                className={`p-3 rounded-xl border text-left text-xs sm:text-sm transition-all cursor-pointer ${btnStyle}`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {ex.type === 'fill-blank' && (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="Type your answer..."
                            value={quickAnswers[ex.id] || ''}
                            onChange={(e) => setQuickAnswers(prev => ({ ...prev, [ex.id]: e.target.value }))}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && quickAnswers[ex.id]) {
                                handleCheckQuickAnswer(ex.id, ex.correctAnswers);
                              }
                            }}
                            className="flex-1 px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                          />
                        </div>
                      )}

                      {/* Check Button */}
                      {!isChecked ? (
                        <button
                          disabled={!quickAnswers[ex.id]}
                          onClick={() => handleCheckQuickAnswer(ex.id, ex.correctAnswers)}
                          className="px-4 py-2 bg-sky-500 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition-all hover:bg-sky-600 cursor-pointer shadow-xs shadow-sky-100 font-khmer"
                        >
                          ពិនិត្យចម្លើយ (Check Answer)
                        </button>
                      ) : (
                        <div className={`p-4 rounded-xl text-xs space-y-1.5 ${
                          isCorrect ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-rose-50 text-rose-900 border border-rose-200'
                        }`}>
                          <div className="font-bold flex items-center gap-1.5 font-khmer">
                            {isCorrect ? '✅ ត្រឹមត្រូវ! (Correct)' : '❌ មិនទាន់ត្រឹមត្រូវទេ (Incorrect)'}
                          </div>
                          <p className="text-slate-700 font-khmer"><strong>ចម្លើយត្រូវ៖</strong> {ex.correctAnswers.join(' ឬ ')}</p>
                          {showKhmer && (
                            <p className="text-slate-600 font-khmer mt-1">{ex.khmerExplanation}</p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => handleStartEx(selectedUnit)}
                  className="text-xs sm:text-sm text-sky-600 hover:text-sky-800 font-bold flex items-center gap-1.5 cursor-pointer font-khmer"
                >
                  <span>ចូលទៅធ្វើលំហាត់ពេញលេញទាំងអស់ &rarr;</span>
                </button>
              </div>
            </div>
          )}

          {/* Footer Navigation (Prev / Next Unit) */}
          <div className="flex items-center justify-between pt-6 border-t border-sky-100">
            {prevUnit ? (
              <button
                onClick={() => {
                  onSelectUnit(prevUnit);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-sky-50 border border-sky-200 rounded-2xl text-xs sm:text-sm font-bold text-slate-700 transition-all shadow-xs cursor-pointer"
                id="prev-unit-btn"
              >
                <ArrowLeft className="w-4 h-4 text-sky-600" />
                <span>Unit {prevUnit.unitNumber}: {prevUnit.title}</span>
              </button>
            ) : <div />}

            {nextUnit ? (
              <button
                onClick={() => {
                  onSelectUnit(nextUnit);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-md shadow-sky-100 cursor-pointer"
                id="next-unit-btn"
              >
                <span>Unit {nextUnit.unitNumber}: {nextUnit.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : <div />}
          </div>

        </div>

      </div>
    </div>
  );
};
