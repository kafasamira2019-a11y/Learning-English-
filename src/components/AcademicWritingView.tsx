import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  Volume2, 
  HelpCircle, 
  ArrowRight, 
  Layers, 
  PenTool, 
  FileText, 
  Search, 
  Eye, 
  EyeOff, 
  ChevronRight, 
  Award, 
  Check, 
  X, 
  Copy, 
  Bookmark,
  Zap,
  Info
} from 'lucide-react';
import { AcademicWritingSection } from '../types';
import { academicWritingSections } from '../data/academicWritingData';
import { soundManager } from '../utils/sound';

interface AcademicWritingViewProps {
  onGoToGrammarLessons?: () => void;
}

export const AcademicWritingView: React.FC<AcademicWritingViewProps> = ({
  onGoToGrammarLessons
}) => {
  const [selectedSectionId, setSelectedSectionId] = useState<string>(academicWritingSections[0].id);
  const [activeSubTab, setActiveSubTab] = useState<'guide' | 'lab' | 'exercises' | 'templates' | 'phrasebank'>('guide');
  const [showKhmer, setShowKhmer] = useState<boolean>(true);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  
  // Exercise states
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const [checkedExercises, setCheckedExercises] = useState<{ [key: string]: boolean }>({});
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [phraseSearch, setPhraseSearch] = useState<string>('');

  const currentSection = academicWritingSections.find(s => s.id === selectedSectionId) || academicWritingSections[0];

  const handleSpeak = (text: string) => {
    soundManager.speak(text);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleSelectOption = (exerciseId: string, optionLabel: string) => {
    setUserAnswers(prev => ({ ...prev, [exerciseId]: optionLabel }));
  };

  const handleCheckAnswer = (exerciseId: string, isCorrect: boolean) => {
    setCheckedExercises(prev => ({ ...prev, [exerciseId]: true }));
    if (isCorrect) {
      soundManager.playCorrect();
    } else {
      soundManager.playIncorrect();
    }
  };

  const toggleSectionComplete = (id: string) => {
    setCompletedSections(prev => 
      prev.includes(id) ? prev.filter(sId => sId !== id) : [...prev, id]
    );
    soundManager.playCorrect();
  };

  const isSectionDone = completedSections.includes(currentSection.id);

  // Quick Academic Phrasebank Data for Research
  const ACADEMIC_PHRASES = [
    { category: 'Stating Objectives', phrase: 'The aim of this study is to investigate...', khmer: 'គោលបំណងនៃការសិក្សានេះគឺដើម្បីស៊ើបអង្កេត...' },
    { category: 'Stating Objectives', phrase: 'This paper presents a novel approach to...', khmer: ' مقាល នេះបង្ហាញពីវិធីសាស្ត្រថ្មីចំពោះ...' },
    { category: 'Describing Findings', phrase: 'Our experimental findings demonstrate that...', khmer: 'លទ្ធផលពិសោធន៍របស់យើងបង្ហាញយ៉ាងច្បាស់ថា...' },
    { category: 'Describing Findings', phrase: 'These results corroborate previous research by [Author]...', khmer: 'លទ្ធផលទាំងនេះគាំទ្រការស្រាវជ្រាវពីមុនរបស់ [Author]...' },
    { category: 'Hedging & Cautious Claims', phrase: 'These observations would seem to suggest that...', khmer: 'ការសង្កេតទាំងនេះហាក់ដូចជាចង្អុលបង្ហាញថា...' },
    { category: 'Hedging & Cautious Claims', phrase: 'To the best of our knowledge, this is the first time that...', khmer: 'តាមដែលយើងដឹង នេះជាលើកទីមួយហើយដែល...' },
    { category: 'Acknowledging Limitations', phrase: 'Although limited to a small sample size, the results indicate...', khmer: 'ទោះបីជាមានកម្រិតលើចំនួនសំណាកតិចក៏ដោយ លទ្ធផលបង្ហាញថា...' },
    { category: 'Acknowledging Limitations', phrase: 'Further research is required to fully elucidate the mechanism...', khmer: 'ការស្រាវជ្រាវបន្ថែមគឺចាំបាច់ដើម្បីបំភ្លឺយន្តការនេះឱ្យកាន់តែច្បាស់...' },
    { category: 'De-nominalization', phrase: 'to compare (instead of "to make a comparison")', khmer: 'ប្រើ "compare" ជំនួស "make a comparison"' },
    { category: 'De-nominalization', phrase: 'to improve (instead of "to achieve an improvement")', khmer: 'ប្រើ "improve" ជំនួស "achieve an improvement"' },
  ];

  const filteredPhrases = ACADEMIC_PHRASES.filter(p => 
    p.phrase.toLowerCase().includes(phraseSearch.toLowerCase()) || 
    p.category.toLowerCase().includes(phraseSearch.toLowerCase()) ||
    p.khmer.includes(phraseSearch)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Banner: Adrian Wallwork Academic Writing Course */}
      <div className="bg-gradient-to-r from-sky-600 via-indigo-600 to-sky-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg shadow-sky-200/50 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-xl text-xs font-black uppercase tracking-wider">
              Springer Academic Research
            </span>
            <span className="px-3 py-1 bg-amber-400 text-slate-900 rounded-xl text-xs font-black">
              Adrian Wallwork Curriculum
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
            English for Academic Research: Writing Masterclass
          </h1>
          <p className="text-sm sm:text-base text-sky-100 font-khmer leading-relaxed">
            កម្មវិធីសិក្សា និងលំហាត់អនុវត្តការតែងនិពន្ធ مقាល ស្រាវជ្រាវកម្រិតអន្តរជាតិ (Writing, Editing, Paraphrasing & IMRaD Publishing)
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-sky-100">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl">
              <BookOpen className="w-4 h-4 text-sky-300" />
              <span>10 Core Sections</span>
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl">
              <PenTool className="w-4 h-4 text-amber-300" />
              <span>Real Publishing Exercises</span>
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl">
              <Award className="w-4 h-4 text-emerald-300" />
              <span>{completedSections.length}/10 Sections Mastered</span>
            </span>
          </div>
        </div>
      </div>

      {/* Section Quick Selector Ribbon */}
      <div className="bg-white rounded-3xl p-3 sm:p-4 border border-sky-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {academicWritingSections.map((sec) => {
            const isSelected = sec.id === selectedSectionId;
            const isDone = completedSections.includes(sec.id);
            return (
              <button
                key={sec.id}
                onClick={() => {
                  setSelectedSectionId(sec.id);
                  setUserAnswers({});
                  setCheckedExercises({});
                }}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold shrink-0 transition-all flex items-center gap-2.5 cursor-pointer ${
                  isSelected
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-200 font-black'
                    : 'bg-sky-50/60 hover:bg-sky-100/70 text-slate-700 border border-sky-100'
                }`}
                id={`writing-sec-tab-${sec.sectionNumber}`}
              >
                <span className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-black ${
                  isSelected ? 'bg-white/20 text-white' : isDone ? 'bg-emerald-100 text-emerald-700' : 'bg-sky-100 text-sky-800'
                }`}>
                  {isDone ? <Check className="w-3 h-3" /> : sec.sectionNumber}
                </span>
                <span>{sec.badge}: {sec.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Table of Sections & Progress */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-sky-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-black text-slate-900 text-sm">Course Curriculum</h3>
                <p className="text-[11px] text-slate-400 font-khmer">មាតិការមេរៀនទាំង ១០ ផ្នែក</p>
              </div>
              <span className="text-xs font-black text-sky-600 bg-sky-50 px-2.5 py-1 rounded-xl">
                10 Sections
              </span>
            </div>

            <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
              {academicWritingSections.map((sec) => {
                const isSelected = sec.id === selectedSectionId;
                const isDone = completedSections.includes(sec.id);
                return (
                  <button
                    key={sec.id}
                    onClick={() => {
                      setSelectedSectionId(sec.id);
                      setUserAnswers({});
                      setCheckedExercises({});
                    }}
                    className={`w-full text-left p-3.5 rounded-2xl transition-all flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-sky-50 border-2 border-sky-300 text-sky-950 shadow-xs'
                        : 'hover:bg-sky-50/50 border border-slate-100/80 text-slate-700'
                    }`}
                    id={`writing-nav-btn-${sec.sectionNumber}`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 mt-0.5 shadow-xs ${
                      isSelected
                        ? 'bg-sky-500 text-white shadow-sky-200'
                        : isDone 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-sky-100/70 text-sky-800'
                    }`}>
                      {isDone ? <Check className="w-4 h-4" /> : sec.sectionNumber}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-black text-sm text-slate-900 truncate">
                          {sec.title}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-khmer truncate mt-0.5">
                        {sec.khmerTitle}
                      </p>
                    </div>

                    {isSelected && <ChevronRight className="w-4 h-4 text-sky-600 shrink-0 self-center" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Section Details, Rules, Exercises & Templates */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Header Card of Active Section */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-sky-100 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-sky-500 text-white font-black text-xs rounded-xl shadow-xs">
                  {currentSection.badge}
                </span>
                <span className="text-xs font-bold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                  {currentSection.category}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowKhmer(prev => !prev)}
                  title="បិទ/បើកការពន្យល់ភាសាខ្មែរ (Toggle Khmer)"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-sky-50 hover:bg-sky-100 text-slate-700 border border-sky-200 cursor-pointer"
                  id="toggle-writing-khmer-btn"
                >
                  {showKhmer ? <Eye className="w-3.5 h-3.5 text-sky-600" /> : <EyeOff className="w-3.5 h-3.5 text-slate-400" />}
                  <span className="font-khmer">{showKhmer ? 'ខ្មែរ (On)' : 'English Only'}</span>
                </button>

                <button
                  onClick={() => toggleSectionComplete(currentSection.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSectionDone
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-xs'
                      : 'bg-sky-50 text-slate-600 hover:bg-sky-100 border border-sky-200'
                  }`}
                  id="mark-writing-complete-btn"
                >
                  <CheckCircle2 className={`w-4 h-4 ${isSectionDone ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span className="font-khmer">{isSectionDone ? 'បានរៀនចេះ (Mastered)' : 'សម្គាល់ថាបានរៀនចេះ'}</span>
                </button>
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {currentSection.title}
              </h2>
              {showKhmer && (
                <p className="text-base font-bold text-sky-700 font-khmer mt-1">
                  {currentSection.khmerTitle}
                </p>
              )}
            </div>

            {/* Overview Box */}
            <div className="p-4 bg-sky-50/70 rounded-2xl border border-sky-100 space-y-1.5">
              <p className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
                {currentSection.overviewEn}
              </p>
              {showKhmer && (
                <p className="text-xs text-slate-600 font-khmer leading-relaxed">
                  {currentSection.overviewKh}
                </p>
              )}
            </div>

            {/* Sub-Tabs within the Section */}
            <div className="flex items-center gap-2 pt-2 border-t border-sky-100 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveSubTab('guide')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  activeSubTab === 'guide'
                    ? 'bg-sky-500 text-white shadow-xs'
                    : 'bg-sky-50 text-slate-700 hover:bg-sky-100'
                }`}
                id="subtab-guide-btn"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Guide & Rules ({currentSection.rules ? currentSection.rules.length : 0})</span>
              </button>

              <button
                onClick={() => setActiveSubTab('lab')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  activeSubTab === 'lab'
                    ? 'bg-sky-500 text-white shadow-xs'
                    : 'bg-sky-50 text-slate-700 hover:bg-sky-100'
                }`}
                id="subtab-lab-btn"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Before/After Lab</span>
              </button>

              <button
                onClick={() => setActiveSubTab('exercises')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  activeSubTab === 'exercises'
                    ? 'bg-sky-500 text-white shadow-xs'
                    : 'bg-sky-50 text-slate-700 hover:bg-sky-100'
                }`}
                id="subtab-exercises-btn"
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>Practice Exercises ({currentSection.subsections ? currentSection.subsections.reduce((acc, sub) => acc + (sub.exercises ? sub.exercises.length : 0), 0) : 0})</span>
              </button>

              {currentSection.paperTemplates && currentSection.paperTemplates.length > 0 && (
                <button
                  onClick={() => setActiveSubTab('templates')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                    activeSubTab === 'templates'
                      ? 'bg-sky-500 text-white shadow-xs'
                      : 'bg-sky-50 text-slate-700 hover:bg-sky-100'
                  }`}
                  id="subtab-templates-btn"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>IMRaD Blueprints</span>
                </button>
              )}

              <button
                onClick={() => setActiveSubTab('phrasebank')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  activeSubTab === 'phrasebank'
                    ? 'bg-sky-500 text-white shadow-xs'
                    : 'bg-sky-50 text-slate-700 hover:bg-sky-100'
                }`}
                id="subtab-phrasebank-btn"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Academic Phrasebank</span>
              </button>
            </div>
          </div>

          {/* Sub-Tab 1: Comprehensive Guide & Rules */}
          {activeSubTab === 'guide' && (
            <div className="space-y-6">
              {currentSection.rules && currentSection.rules.map((rule, rIdx) => (
                <div 
                  key={rIdx}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-sky-100 shadow-sm space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center font-black text-xs">
                      {rIdx + 1}
                    </div>
                    <div>
                      <h3 className="font-black text-slate-900 text-base sm:text-lg">
                        {rule.ruleTitle}
                      </h3>
                      {showKhmer && (
                        <p className="text-xs font-bold text-sky-700 font-khmer">
                          {rule.ruleKhmerTitle}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <p className="font-medium text-slate-800">{rule.explanationEn}</p>
                    {showKhmer && (
                      <p className="text-slate-600 bg-sky-50/50 p-3.5 rounded-2xl border border-sky-100 font-khmer">
                        {rule.explanationKh}
                      </p>
                    )}
                  </div>

                  {/* Key Tips Checklist */}
                  {rule.keyTips && rule.keyTips.length > 0 && (
                    <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl space-y-2">
                      <span className="text-xs font-black text-amber-900 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-amber-600" />
                        <span>Adrian Wallwork\'s Key Recommendations:</span>
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {rule.keyTips.map((tip, tIdx) => (
                          <li key={tIdx} className="flex items-start gap-2">
                            <span className="text-amber-500 font-bold">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Inline Examples */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                      Sample Case Transformation:
                    </h4>
                    {rule.beforeAfterExamples.map((ex, eIdx) => (
                      <div 
                        key={eIdx}
                        className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-start gap-2 text-xs text-rose-700">
                            <span className="px-2 py-0.5 bg-rose-100 rounded-md font-bold text-[10px] shrink-0 mt-0.5">
                              ORIGINAL (Weak/Verbose)
                            </span>
                            <span className="font-medium">{ex.original}</span>
                          </div>

                          <div className="flex items-start gap-2 text-xs text-emerald-800">
                            <span className="px-2 py-0.5 bg-emerald-100 rounded-md font-bold text-[10px] shrink-0 mt-0.5">
                              SPRINGER STANDARD (Revised)
                            </span>
                            <span className="font-bold">{ex.revised}</span>
                          </div>
                        </div>

                        <div className="text-[11px] text-slate-600 border-t border-slate-200/60 pt-2 flex items-center justify-between gap-2">
                          <div>
                            <span>💡 {ex.explanation}</span>
                            {showKhmer && <span className="font-khmer block text-sky-800 mt-0.5">{ex.khmerExplanation}</span>}
                          </div>
                          <button
                            onClick={() => handleSpeak(ex.revised)}
                            title="ស្តាប់ការបញ្ចេញសំឡេង"
                            className="p-1.5 bg-white border border-sky-100 rounded-lg text-sky-600 hover:bg-sky-50 shrink-0 cursor-pointer"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              ))}
            </div>
          )}

          {/* Sub-Tab 2: Interactive Before/After Lab */}
          {activeSubTab === 'lab' && (
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-sky-100 shadow-sm space-y-6">
              <div>
                <h3 className="font-black text-slate-900 text-lg">
                  Before / After Sentence Transformer Lab
                </h3>
                <p className="text-xs text-slate-500 font-khmer mt-0.5">
                  ប្រៀបធៀបប្រយោគដើម (មិនទាន់ច្បាស់) ជាមួយប្រយោគដែលបានកែសម្រួលតាមស្តង់ដារអន្តរជាតិ
                </p>
              </div>

              <div className="space-y-4">
                {(currentSection.rules || []).flatMap(r => r.beforeAfterExamples).map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-5 bg-gradient-to-br from-sky-50/60 to-white rounded-3xl border border-sky-100 space-y-3"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Left: Original */}
                      <div className="p-4 bg-rose-50/60 rounded-2xl border border-rose-200/60 space-y-1.5">
                        <div className="flex items-center justify-between text-rose-800 text-xs font-black">
                          <span>❌ Common Pitfall (ដើម)</span>
                          <span className="text-[10px] bg-rose-100 px-2 py-0.5 rounded-full">Too wordy</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-800 font-medium">{item.original}</p>
                      </div>

                      {/* Right: Revised */}
                      <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200/70 space-y-1.5 relative">
                        <div className="flex items-center justify-between text-emerald-900 text-xs font-black">
                          <span>✅ Concise & Precise (កែសម្រួល)</span>
                          <button
                            onClick={() => handleCopy(item.revised)}
                            className="text-[10px] bg-emerald-100 hover:bg-emerald-200 px-2 py-0.5 rounded-full text-emerald-800 flex items-center gap-1 cursor-pointer"
                          >
                            <Copy className="w-2.5 h-2.5" />
                            <span>{copiedText === item.revised ? 'Copied!' : 'Copy'}</span>
                          </button>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-900 font-bold">{item.revised}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 text-xs text-slate-600">
                      <div className="font-khmer text-sky-800">
                        <span>🔍 ហេតុផល៖ {item.khmerExplanation || item.explanation}</span>
                      </div>
                      <button
                        onClick={() => handleSpeak(item.revised)}
                        className="p-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 flex items-center gap-1.5 font-bold text-xs cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Listen</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sub-Tab 3: Practice Exercises with Instant Feedback */}
          {activeSubTab === 'exercises' && (
            <div className="space-y-6">
              {currentSection.subsections && currentSection.subsections.map((sub, sIdx) => (
                <div 
                  key={sIdx}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-sky-100 shadow-sm space-y-5"
                >
                  <div className="flex items-center justify-between border-b border-sky-100 pb-3">
                    <div>
                      <span className="text-xs font-black text-sky-600 bg-sky-50 px-2.5 py-1 rounded-xl">
                        Subsection {sub.code}
                      </span>
                      <h3 className="text-base sm:text-lg font-black text-slate-900 mt-1">
                        {sub.title}
                      </h3>
                      {showKhmer && (
                        <p className="text-xs font-bold text-sky-700 font-khmer mt-0.5">
                          {sub.khmerTitle}
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 font-medium">
                    {sub.guide}
                  </p>

                  <div className="space-y-5">
                    {(sub.exercises || []).map((ex, exIdx) => {
                      const isChecked = checkedExercises[ex.id];
                      const selectedOpt = userAnswers[ex.id];
                      const correctOpt = ex.correctAnswer;
                      const isCorrect = selectedOpt === correctOpt;

                      return (
                        <div 
                          key={ex.id}
                          className="p-5 bg-sky-50/40 rounded-2xl border border-sky-100/90 space-y-4"
                        >
                          <div className="flex items-start gap-2.5">
                            <span className="w-6 h-6 rounded-lg bg-sky-500 text-white flex items-center justify-center text-xs font-black shrink-0">
                              {exIdx + 1}
                            </span>
                            <div className="space-y-1">
                              <p className="text-xs sm:text-sm font-bold text-slate-900">
                                {ex.promptEn}
                              </p>
                              {showKhmer && (
                                <p className="text-xs text-sky-800 font-khmer font-medium">
                                  {ex.promptKh}
                                </p>
                              )}
                            </div>
                          </div>

                          {ex.originalSentence && (
                            <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 italic">
                              "{ex.originalSentence}"
                            </div>
                          )}

                          {/* Options */}
                          {ex.options && (
                            <div className="space-y-2">
                              {ex.options.map((opt) => {
                                const isOptionSelected = selectedOpt === opt.label;
                                let btnStyle = "bg-white hover:bg-sky-50 text-slate-800 border-slate-200";
                                
                                if (isChecked) {
                                  if (opt.isCorrect) {
                                    btnStyle = "bg-emerald-100 text-emerald-900 border-emerald-400 font-bold";
                                  } else if (isOptionSelected && !opt.isCorrect) {
                                    btnStyle = "bg-rose-100 text-rose-900 border-rose-300 font-medium";
                                  }
                                } else if (isOptionSelected) {
                                  btnStyle = "bg-sky-100 text-sky-900 border-sky-400 font-bold shadow-xs";
                                }

                                return (
                                  <button
                                    key={opt.label}
                                    onClick={() => handleSelectOption(ex.id, opt.label)}
                                    disabled={isChecked}
                                    className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                                  >
                                    <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black shrink-0">
                                      {opt.label}
                                    </span>
                                    <span className="leading-snug">{opt.text}</span>
                                  </button>
                                );
                              })}
                            </div>
                          )}

                          {/* Exercise Action & Solution */}
                          <div className="flex items-center justify-between pt-1">
                            {!isChecked ? (
                              <button
                                disabled={!selectedOpt}
                                onClick={() => handleCheckAnswer(ex.id, isCorrect)}
                                className="px-4 py-2 bg-sky-500 disabled:opacity-40 hover:bg-sky-600 text-white rounded-xl text-xs font-black shadow-xs cursor-pointer font-khmer"
                              >
                                ពិនិត្យចម្លើយ (Check Answer)
                              </button>
                            ) : (
                              <div className={`w-full p-4 rounded-xl text-xs space-y-1.5 ${
                                isCorrect ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-rose-50 text-rose-900 border border-rose-200'
                              }`}>
                                <div className="font-bold flex items-center gap-1.5 font-khmer">
                                  {isCorrect ? '✅ ត្រឹមត្រូវ! (Correct Solution)' : '❌ មិនទាន់ត្រឹមត្រូវទេ (Reviewer Note)'}
                                </div>
                                <p className="text-slate-800 font-medium">
                                  {ex.explanationEn}
                                </p>
                                {showKhmer && (
                                  <p className="text-slate-600 font-khmer mt-1">
                                    💡 {ex.explanationKh}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>

                        </div>
                      );
                    })}
                  </div>

                </div>
              ))}
            </div>
          )}

          {/* Sub-Tab 4: IMRaD Manuscript Blueprints */}
          {activeSubTab === 'templates' && currentSection.paperTemplates && (
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-sky-100 shadow-sm space-y-6">
              <div>
                <h3 className="font-black text-slate-900 text-lg">
                  IMRaD Section Architectural Blueprints
                </h3>
                <p className="text-xs text-slate-500 font-khmer mt-0.5">
                  រូបមន្តរៀបចំ Abstract, Introduction និង Results តាមស្តង់ដារអន្តរជាតិ
                </p>
              </div>

              <div className="space-y-6">
                {currentSection.paperTemplates && currentSection.paperTemplates.map((tpl, tIdx) => (
                  <div 
                    key={tIdx}
                    className="p-5 bg-gradient-to-br from-sky-50/40 via-white to-indigo-50/30 rounded-3xl border border-sky-200/80 space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-sky-100 pb-3">
                      <div>
                        <h4 className="font-black text-slate-900 text-base">{tpl.sectionName}</h4>
                        <p className="text-xs font-bold text-sky-700 font-khmer">{tpl.khmerSectionName}</p>
                      </div>
                      <span className="text-[11px] font-black px-3 py-1 bg-sky-500 text-white rounded-xl">
                        Step-by-Step Blueprint
                      </span>
                    </div>

                    <div className="space-y-3">
                      {tpl.structureSteps.map((st) => (
                        <div 
                          key={st.stepNumber}
                          className="p-4 bg-white rounded-2xl border border-sky-100 space-y-2 shadow-xs"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center text-xs font-black">
                                {st.stepNumber}
                              </span>
                              <span className="font-black text-xs sm:text-sm text-slate-900">{st.title}</span>
                            </div>
                            <span className="text-[10px] px-2 py-0.5 bg-amber-100 text-amber-800 font-bold rounded-md">
                              {st.sentencesCount}
                            </span>
                          </div>

                          <p className="text-xs text-slate-600">{st.descriptionEn}</p>
                          {showKhmer && <p className="text-xs text-sky-800 font-khmer">{st.descriptionKh}</p>}

                          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs font-medium text-slate-800 flex items-center justify-between gap-2">
                            <span className="italic">"{st.exampleSnippet}"</span>
                            <button
                              onClick={() => handleCopy(st.exampleSnippet)}
                              title="Copy phrase template"
                              className="p-1 text-slate-400 hover:text-sky-600 cursor-pointer"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sub-Tab 5: Academic Phrasebank */}
          {activeSubTab === 'phrasebank' && (
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-sky-100 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-black text-slate-900 text-lg">
                    Academic Research Phrasebank & Quick Synonyms
                  </h3>
                  <p className="text-xs text-slate-500 font-khmer mt-0.5">
                    វចនានុក្រមឃ្លាស្រាវជ្រាវ និងកិរិយាសព្ទវិទ្យាសាស្ត្រសម្រាប់យកទៅប្រើភ្លាមៗ
                  </p>
                </div>

                <div className="relative min-w-[200px]">
                  <Search className="w-3.5 h-3.5 text-sky-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={phraseSearch}
                    onChange={(e) => setPhraseSearch(e.target.value)}
                    placeholder="Search phrase..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-sky-50 border border-sky-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredPhrases.map((item, pIdx) => (
                  <div 
                    key={pIdx}
                    className="p-4 bg-sky-50/50 hover:bg-sky-50 rounded-2xl border border-sky-100 space-y-2 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black px-2 py-0.5 bg-sky-100 text-sky-800 rounded-md">
                        {item.category}
                      </span>
                      <button
                        onClick={() => handleCopy(item.phrase)}
                        className="text-slate-400 hover:text-sky-600 p-1 cursor-pointer"
                        title="Copy phrase"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs sm:text-sm font-bold text-slate-900 font-sans">
                      "{item.phrase}"
                    </p>
                    <p className="text-xs text-slate-600 font-khmer">
                      {item.khmer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
