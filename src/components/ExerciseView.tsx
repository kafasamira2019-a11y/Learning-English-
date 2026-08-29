import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  BookOpen, 
  Layers, 
  BookMarked, 
  CheckCircle, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  Volume2, 
  Award, 
  Sparkles, 
  Check, 
  ArrowRight, 
  ArrowLeft,
  ChevronDown,
  PenTool,
  CheckCircle2,
  FileText,
  Send,
  Trophy,
  ChevronRight
} from 'lucide-react';
import { UnitData, ExerciseItem, ExerciseSectionMode } from '../types';
import { academicWritingSections } from '../data/academicWritingData';
import { readingWarmUps } from '../data/readingData';
import { soundManager } from '../utils/sound';
import { userStore } from '../utils/userStore';

interface ExerciseViewProps {
  units: UnitData[];
  selectedUnit: UnitData;
  onSelectUnit: (unit: UnitData) => void;
  onRecordAnswer: (unitId: number, exerciseId: string, isCorrect: boolean) => void;
  onGoToQuiz?: (unit: UnitData) => void;
  initialMode?: ExerciseSectionMode;
}

export const ExerciseView: React.FC<ExerciseViewProps> = ({
  units,
  selectedUnit,
  onSelectUnit,
  onRecordAnswer,
  onGoToQuiz,
  initialMode = 'grammar'
}) => {
  const [exerciseMode, setExerciseMode] = useState<ExerciseSectionMode>(initialMode);

  // --- Grammar Exercise State ---
  const [currentGrammarIndex, setCurrentGrammarIndex] = useState<number>(0);
  const [grammarAnswers, setGrammarAnswers] = useState<{ [key: string]: string }>({});
  const [isGrammarSubmitted, setIsGrammarSubmitted] = useState<boolean>(false);

  // --- Writing Exercise State ---
  const [selectedWritingSecId, setSelectedWritingSecId] = useState<string>(academicWritingSections[0].id);
  const [currentWritingIndex, setCurrentWritingIndex] = useState<number>(0);
  const [writingAnswers, setWritingAnswers] = useState<{ [key: string]: string }>({});
  const [isWritingSubmitted, setIsWritingSubmitted] = useState<boolean>(false);

  // --- Reading Exercise State ---
  const [selectedReadingId, setSelectedReadingId] = useState<string>(readingWarmUps[0].id);
  const [currentReadingIndex, setCurrentReadingIndex] = useState<number>(0);
  const [readingAnswers, setReadingAnswers] = useState<{ [key: string]: string }>({});
  const [isReadingSubmitted, setIsReadingSubmitted] = useState<boolean>(false);

  const handleSpeak = (text: string) => {
    soundManager.speak(text);
  };

  const normalizeAnswer = (str: string) => {
    return str
      .trim()
      .toLowerCase()
      .replace(/[’‘`]/g, "'")
      .replace(/[.?!,;:]+$/g, '')
      .replace(/\s+/g, ' ');
  };

  const isAnswerMatching = (user: string, correctList: string[]) => {
    const cleanUser = normalizeAnswer(user);
    if (!cleanUser) return false;
    return correctList.some(correct => {
      const cleanCorrect = normalizeAnswer(correct);
      if (cleanCorrect === cleanUser) return true;
      if (cleanCorrect.replace(/'/g, '') === cleanUser.replace(/'/g, '')) return true;
      return false;
    });
  };

  // --- Grammar Logic ---
  const grammarExercises = selectedUnit.exercises || [];
  const currentGrammarEx = grammarExercises[currentGrammarIndex] || grammarExercises[0];

  const handleGrammarInputChange = (id: string, value: string) => {
    if (isGrammarSubmitted) return;
    setGrammarAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleGrammarOptionSelect = (exerciseId: string, option: string) => {
    if (isGrammarSubmitted) return;
    setGrammarAnswers(prev => ({ ...prev, [exerciseId]: option }));
  };

  const submitGrammarExercises = () => {
    if (isGrammarSubmitted || grammarExercises.length === 0) return;

    let correctCount = 0;
    grammarExercises.forEach(ex => {
      const userVal = grammarAnswers[ex.id] || '';
      const isRight = isAnswerMatching(userVal, ex.correctAnswers);
      if (isRight) correctCount++;
      onRecordAnswer(selectedUnit.id, ex.id, isRight);
    });

    setIsGrammarSubmitted(true);
    soundManager.playComplete();

    const percentage = Math.round((correctCount / grammarExercises.length) * 100);
    const earnedXp = correctCount * 10;
    userStore.recordExerciseCompletion(
      'grammar',
      `Unit ${selectedUnit.unitNumber}: ${selectedUnit.title}`,
      selectedUnit.khmerTitle,
      correctCount,
      grammarExercises.length,
      earnedXp
    );

    if (percentage >= 70) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const resetGrammarAll = () => {
    setGrammarAnswers({});
    setIsGrammarSubmitted(false);
    setCurrentGrammarIndex(0);
  };

  const handleNextUnit = () => {
    const currentIndex = units.findIndex(u => u.id === selectedUnit.id);
    if (currentIndex >= 0 && currentIndex < units.length - 1) {
      const nextUnit = units[currentIndex + 1];
      onSelectUnit(nextUnit);
      resetGrammarAll();
    }
  };

  // Grammar Stats
  const grammarAnsweredCount = grammarExercises.filter(ex => (grammarAnswers[ex.id] || '').trim().length > 0).length;
  const grammarCorrectCount = grammarExercises.filter(ex => isAnswerMatching(grammarAnswers[ex.id] || '', ex.correctAnswers)).length;
  const grammarScorePercent = grammarExercises.length > 0 ? Math.round((grammarCorrectCount / grammarExercises.length) * 100) : 0;

  // --- Writing Logic ---
  const currentWritingSec = academicWritingSections.find(s => s.id === selectedWritingSecId) || academicWritingSections[0];
  // Flatten all exercises in current section for clean navigation
  const allWritingExercises = (currentWritingSec.subsections || []).flatMap((sub) => 
    (sub.exercises || []).map(ex => ({ ...ex, subCode: sub.code, subTitle: sub.title, subKhmerTitle: sub.khmerTitle }))
  );
  const currentWritingEx = allWritingExercises[currentWritingIndex] || allWritingExercises[0];

  const submitWritingExercises = () => {
    if (isWritingSubmitted || allWritingExercises.length === 0) return;
    setIsWritingSubmitted(true);
    soundManager.playComplete();

    let correct = 0;
    allWritingExercises.forEach(ex => {
      if (writingAnswers[ex.id] === ex.correctAnswer) correct++;
    });

    const earnedXp = correct * 10;
    userStore.recordExerciseCompletion(
      'writing',
      `Academic Writing: ${currentWritingSec.title}`,
      currentWritingSec.khmerTitle,
      correct,
      allWritingExercises.length,
      earnedXp
    );

    if (correct / allWritingExercises.length >= 0.7) {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  const resetWritingAll = () => {
    setWritingAnswers({});
    setIsWritingSubmitted(false);
    setCurrentWritingIndex(0);
  };

  const writingAnsweredCount = allWritingExercises.filter(ex => !!writingAnswers[ex.id]).length;
  const writingCorrectCount = allWritingExercises.filter(ex => writingAnswers[ex.id] === ex.correctAnswer).length;
  const writingScorePercent = allWritingExercises.length > 0 ? Math.round((writingCorrectCount / allWritingExercises.length) * 100) : 0;

  // --- Reading Logic ---
  const currentReadingStory = readingWarmUps.find(r => r.id === selectedReadingId) || readingWarmUps[0];
  const readingQuestions = currentReadingStory.questions || [];
  const currentReadingQ = readingQuestions[currentReadingIndex] || readingQuestions[0];

  const submitReadingExercises = () => {
    if (isReadingSubmitted || readingQuestions.length === 0) return;
    setIsReadingSubmitted(true);
    soundManager.playComplete();

    let correct = 0;
    readingQuestions.forEach(q => {
      if (readingAnswers[q.id] === q.correctAnswer) correct++;
    });

    const earnedXp = correct * 10;
    userStore.recordExerciseCompletion(
      'reading',
      `Reading: ${currentReadingStory.title}`,
      currentReadingStory.khmerTitle,
      correct,
      readingQuestions.length,
      earnedXp
    );

    if (correct / readingQuestions.length >= 0.7) {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  const resetReadingAll = () => {
    setReadingAnswers({});
    setIsReadingSubmitted(false);
    setCurrentReadingIndex(0);
  };

  const readingAnsweredCount = readingQuestions.filter(q => !!readingAnswers[q.id]).length;
  const readingCorrectCount = readingQuestions.filter(q => readingAnswers[q.id] === q.correctAnswer).length;
  const readingScorePercent = readingQuestions.length > 0 ? Math.round((readingCorrectCount / readingQuestions.length) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top 3-Way Exercise Mode Selector */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-sky-100 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sky-100/80 pb-3">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
              <PenTool className="w-5 h-5 text-sky-500" />
              <span>Practice Exercises Hub</span>
            </h2>
            <p className="text-xs text-slate-500 font-khmer mt-0.5">
              ជ្រើសរើសប្រភេទលំហាត់អនុវត្ត៖ វេយ្យាករណ៍ (Grammar) តែងនិពន្ធ (Writing) ឬការអានយល់ន័យ (Reading)
            </p>
          </div>

          <span className="text-xs font-black px-3 py-1 bg-sky-50 text-sky-700 rounded-xl shrink-0 self-start sm:self-auto">
            Choose Subject
          </span>
        </div>

        {/* 3 Large Mode Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={() => setExerciseMode('grammar')}
            className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 cursor-pointer ${
              exerciseMode === 'grammar'
                ? 'bg-sky-500 text-white border-sky-600 shadow-md shadow-sky-200 ring-2 ring-sky-300'
                : 'bg-sky-50/50 hover:bg-sky-50 border-sky-100 text-slate-800'
            }`}
            id="select-grammar-exercises-btn"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-base shrink-0 ${
              exerciseMode === 'grammar' ? 'bg-white/20 text-white' : 'bg-sky-100 text-sky-800'
            }`}>
              📚
            </div>
            <div>
              <span className="font-black text-sm block">1. Grammar Exercises</span>
              <span className={`text-xs font-khmer block mt-0.5 ${exerciseMode === 'grammar' ? 'text-sky-100' : 'text-slate-500'}`}>
                លំហាត់វេយ្យាករណ៍ (145 Units)
              </span>
            </div>
          </button>

          <button
            onClick={() => setExerciseMode('writing')}
            className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 cursor-pointer ${
              exerciseMode === 'writing'
                ? 'bg-indigo-600 text-white border-indigo-700 shadow-md shadow-indigo-200 ring-2 ring-indigo-300'
                : 'bg-indigo-50/50 hover:bg-indigo-50 border-indigo-100 text-slate-800'
            }`}
            id="select-writing-exercises-btn"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-base shrink-0 ${
              exerciseMode === 'writing' ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-800'
            }`}>
              📝
            </div>
            <div>
              <span className="font-black text-sm block">2. Writing Exercises</span>
              <span className={`text-xs font-khmer block mt-0.5 ${exerciseMode === 'writing' ? 'text-indigo-100' : 'text-slate-500'}`}>
                លំហាត់តែងនិពន្ធស្រាវជ្រាវ (Academic Writing)
              </span>
            </div>
          </button>

          <button
            onClick={() => setExerciseMode('reading')}
            className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 cursor-pointer ${
              exerciseMode === 'reading'
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-md shadow-emerald-200 ring-2 ring-emerald-300'
                : 'bg-emerald-50/50 hover:bg-emerald-50 border-emerald-100 text-slate-800'
            }`}
            id="select-reading-exercises-btn"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-base shrink-0 ${
              exerciseMode === 'reading' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
            }`}>
              📖
            </div>
            <div>
              <span className="font-black text-sm block">3. Reading Exercises</span>
              <span className={`text-xs font-khmer block mt-0.5 ${exerciseMode === 'reading' ? 'text-emerald-100' : 'text-slate-500'}`}>
                លំហាត់អានយល់ន័យ (Daily Reading Warm-Ups)
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* MODE 1: GRAMMAR EXERCISES */}
      {/* ======================================================== */}
      {exerciseMode === 'grammar' && (
        <div className="space-y-6">
          {/* Header & Unit Selector Bar */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-sky-100 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-sky-500 text-white font-black text-xs rounded-xl shadow-xs">
                    Unit {selectedUnit.unitNumber}
                  </span>
                  <span className="text-xs text-sky-700 font-bold bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                    {selectedUnit.categoryName}
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                  Grammar Practice: {selectedUnit.title}
                </h1>
                <p className="text-sm text-sky-700 font-khmer font-bold mt-1">
                  លំហាត់វេយ្យាករណ៍៖ {selectedUnit.khmerTitle}
                </p>
              </div>

              {/* Unit Dropdown */}
              <div className="relative min-w-[240px]">
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider mb-1.5">
                  ជ្រើសរើសមេរៀន / Switch Unit:
                </label>
                <div className="relative">
                  <select
                    value={selectedUnit.id}
                    onChange={(e) => {
                      const u = units.find(unit => unit.id === Number(e.target.value));
                      if (u) {
                        onSelectUnit(u);
                        resetGrammarAll();
                      }
                    }}
                    className="w-full appearance-none bg-sky-50/70 hover:bg-sky-50 border border-sky-200 text-slate-800 text-xs sm:text-sm font-bold rounded-2xl px-4 py-2.5 pr-9 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-hidden cursor-pointer shadow-xs"
                    id="exercise-unit-select"
                  >
                    {units.map(u => (
                      <option key={u.id} value={u.id}>
                        Unit {u.unitNumber}: {u.title}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-sky-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Quick Question Navigation Pills */}
            <div className="pt-3 border-t border-sky-100 flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-black text-slate-500 uppercase tracking-wider mr-1">
                  សំណួរ៖
                </span>
                {grammarExercises.map((ex, idx) => {
                  const hasAnswer = (grammarAnswers[ex.id] || '').trim().length > 0;
                  const isCurrent = currentGrammarIndex === idx && !isGrammarSubmitted;
                  
                  let pillStyle = "bg-slate-100 text-slate-600 hover:bg-slate-200";
                  if (isGrammarSubmitted) {
                    const isRight = isAnswerMatching(grammarAnswers[ex.id] || '', ex.correctAnswers);
                    pillStyle = isRight 
                      ? "bg-emerald-500 text-white font-bold" 
                      : "bg-rose-500 text-white font-bold";
                  } else if (isCurrent) {
                    pillStyle = "bg-sky-500 text-white font-black ring-2 ring-sky-200 shadow-xs";
                  } else if (hasAnswer) {
                    pillStyle = "bg-sky-100 text-sky-800 font-bold border border-sky-300";
                  }

                  return (
                    <button
                      key={ex.id}
                      onClick={() => setCurrentGrammarIndex(idx)}
                      className={`w-8 h-8 rounded-xl text-xs flex items-center justify-center transition-all cursor-pointer ${pillStyle}`}
                      title={`Question ${idx + 1}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-600 font-khmer">
                  ឆ្លើយបាន៖ <strong className="text-sky-600 font-mono">{grammarAnsweredCount}</strong>/{grammarExercises.length}
                </span>
                {isGrammarSubmitted && (
                  <button
                    onClick={resetGrammarAll}
                    className="px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer font-khmer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>ធ្វើឡើងវិញ (Retake)</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* If NOT submitted: Show Step-by-Step Question Card with Bottom Action Bar */}
          {!isGrammarSubmitted && currentGrammarEx && (
            <div className="space-y-4">
              <div 
                className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-sm space-y-6"
                id={`exercise-card-${currentGrammarEx.id}`}
              >
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-xl bg-sky-500 text-white flex items-center justify-center text-sm font-black shrink-0 mt-0.5 shadow-xs">
                    {currentGrammarIndex + 1}
                  </span>

                  <div className="flex-1 space-y-4">
                    <div>
                      <p className="text-sm sm:text-base font-bold text-slate-900">
                        {currentGrammarEx.instruction}
                      </p>
                      {currentGrammarEx.khmerInstruction && (
                        <p className="text-xs sm:text-sm text-sky-700 font-khmer mt-0.5 font-medium">
                          {currentGrammarEx.khmerInstruction}
                        </p>
                      )}
                    </div>

                    {/* Context background if present */}
                    {currentGrammarEx.context && (
                      <div className="flex items-center justify-between gap-3 p-4 bg-sky-50/80 rounded-2xl border border-sky-100 text-xs sm:text-sm font-medium text-slate-800">
                        <span className="leading-relaxed">{currentGrammarEx.context}</span>
                        <button
                          type="button"
                          onClick={() => handleSpeak(currentGrammarEx.context || '')}
                          title="Listen"
                          className="p-2 bg-white border border-sky-200 rounded-xl text-sky-600 hover:bg-sky-50 shrink-0 cursor-pointer shadow-2xs"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* Sentence Prompt if present */}
                    {currentGrammarEx.prompt && (
                      <div className="flex items-center justify-between gap-3 p-4 sm:p-5 bg-gradient-to-r from-slate-50 to-sky-50/40 rounded-2xl border border-slate-200/80 text-sm sm:text-base font-bold text-slate-900">
                        <span className="leading-relaxed">
                          {currentGrammarEx.prompt}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleSpeak(currentGrammarEx.prompt || '')}
                          title="Listen to sentence"
                          className="p-2 bg-white border border-sky-200 rounded-xl text-sky-600 hover:bg-sky-100 hover:text-sky-700 shrink-0 cursor-pointer shadow-2xs transition-colors"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* Options or Input */}
                    {currentGrammarEx.options && currentGrammarEx.options.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {currentGrammarEx.options.map((opt, oIdx) => {
                          const userVal = (grammarAnswers[currentGrammarEx.id] || '').trim();
                          const isSelected = userVal.toLowerCase() === opt.toLowerCase();
                          return (
                            <button
                              key={oIdx}
                              onClick={() => handleGrammarOptionSelect(currentGrammarEx.id, opt)}
                              className={`p-4 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-between gap-2 ${
                                isSelected
                                  ? 'bg-sky-500 text-white border-sky-600 shadow-md shadow-sky-100 font-bold'
                                  : 'bg-slate-50/80 hover:bg-sky-50/70 border-slate-200 text-slate-800'
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black ${
                                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-200/80 text-slate-700'
                                }`}>
                                  {String.fromCharCode(65 + oIdx)}
                                </span>
                                <span>{opt}</span>
                              </div>
                              {isSelected && <Check className="w-4 h-4 text-white" />}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="pt-2">
                        <label className="block text-xs font-bold text-slate-600 mb-1.5">
                          សរសេរចម្លើយរបស់អ្នកក្នុងប្រអប់ខាងក្រោម៖
                        </label>
                        <input
                          type="text"
                          value={grammarAnswers[currentGrammarEx.id] || ''}
                          onChange={(e) => handleGrammarInputChange(currentGrammarEx.id, e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              if (currentGrammarIndex < grammarExercises.length - 1) {
                                setCurrentGrammarIndex(prev => prev + 1);
                              } else {
                                submitGrammarExercises();
                              }
                            }
                          }}
                          placeholder="Type the missing word(s) here..."
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-hidden shadow-2xs"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Navigation & Submit Bar */}
              <div className="bg-white rounded-3xl p-4 sm:p-5 border border-sky-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                
                {/* Previous Button */}
                <button
                  onClick={() => setCurrentGrammarIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentGrammarIndex === 0}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed text-slate-700 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors font-khmer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>ថយក្រោយ (Previous)</span>
                </button>

                {/* Progress status */}
                <div className="text-center">
                  <span className="text-xs font-bold text-slate-500">
                    សំណួរទី <strong className="text-slate-800">{currentGrammarIndex + 1}</strong> នៃ {grammarExercises.length}
                  </span>
                  <div className="w-36 h-2 bg-slate-100 rounded-full mt-1 overflow-hidden">
                    <div 
                      className="h-full bg-sky-500 rounded-full transition-all duration-300"
                      style={{ width: `${((currentGrammarIndex + 1) / grammarExercises.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Next or Submit Button */}
                <div className="w-full sm:w-auto flex items-center gap-2">
                  {currentGrammarIndex < grammarExercises.length - 1 ? (
                    <button
                      onClick={() => setCurrentGrammarIndex(prev => Math.min(grammarExercises.length - 1, prev + 1))}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors font-khmer"
                    >
                      <span>បន្ទាប់ (Next)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={submitGrammarExercises}
                      className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-200 transition-all font-khmer"
                      id="submit-grammar-exercises-btn"
                    >
                      <Send className="w-4 h-4" />
                      <span>ដាក់បញ្ជូន (Submit / ដាក់បញ្ជូន)</span>
                    </button>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* If SUBMITTED: Show Comprehensive Score Banner + Full Explanations List */}
          {isGrammarSubmitted && (
            <div className="space-y-6">
              
              {/* Score Results Banner */}
              <div className="bg-linear-to-r from-sky-600 via-sky-500 to-indigo-600 text-white rounded-3xl p-6 sm:p-8 shadow-md space-y-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-center sm:text-left">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner shrink-0">
                      {grammarScorePercent >= 80 ? '🏆' : grammarScorePercent >= 50 ? '🎉' : '📚'}
                    </div>
                    <div>
                      <span className="px-3 py-0.5 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider">
                        លទ្ធផលប្រឡងបញ្ចប់
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black mt-1">
                        ពិន្ទុរបស់អ្នក៖ {grammarCorrectCount} / {grammarExercises.length} ({grammarScorePercent}%)
                      </h2>
                      <p className="text-xs sm:text-sm text-sky-100 font-khmer mt-0.5">
                        {grammarScorePercent >= 80 
                          ? '🌟 ល្អប្រសើរណាស់! អ្នកបានយល់ច្បាស់ពីមេរៀននេះហើយ។' 
                          : grammarScorePercent >= 50
                            ? '👍 ធ្វើបានល្អ! សូមពិនិត្យមើលការពន្យល់លម្អិតខាងក្រោមដើម្បីពង្រឹងបន្ថែម។'
                            : '💪 កុំបោះបង់! សូមអានការពន្យល់ខាងក្រោម រួចសាកល្បងធ្វើម្តងទៀត។'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={resetGrammarAll}
                      className="px-5 py-2.5 rounded-2xl bg-white text-sky-700 hover:bg-sky-50 font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer font-khmer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>ធ្វើឡើងវិញ (Retake)</span>
                    </button>
                    <button
                      onClick={handleNextUnit}
                      className="px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer font-khmer"
                    >
                      <span>មេរៀនបន្ទាប់ (Next Unit)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* All Questions with Detailed Explanations */}
              <div className="space-y-4">
                <h3 className="text-base font-black text-slate-900 font-khmer flex items-center gap-2">
                  <span>ការពន្យល់លម្អិតគ្រប់លំហាត់ (Detailed Explanations & Review):</span>
                </h3>

                {grammarExercises.map((exercise, index) => {
                  const userVal = (grammarAnswers[exercise.id] || '').trim();
                  const isCorrect = isAnswerMatching(userVal, exercise.correctAnswers);

                  return (
                    <div 
                      key={exercise.id}
                      className={`bg-white rounded-3xl p-5 sm:p-6 border transition-all ${
                        isCorrect
                          ? 'border-emerald-300 bg-emerald-50/20 shadow-xs'
                          : 'border-rose-300 bg-rose-50/20 shadow-xs'
                      }`}
                      id={`exercise-review-${exercise.id}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 mt-0.5 ${
                          isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                        }`}>
                          {index + 1}
                        </span>

                        <div className="flex-1 space-y-3">
                          <div>
                            <p className="text-xs sm:text-sm font-bold text-slate-800">
                              {exercise.instruction}
                            </p>
                            {exercise.khmerInstruction && (
                              <p className="text-xs text-sky-700 font-khmer mt-0.5">
                                {exercise.khmerInstruction}
                              </p>
                            )}
                          </div>

                          {exercise.context && (
                            <div className="p-3.5 bg-sky-50/80 rounded-2xl border border-sky-100 text-xs font-medium text-slate-700">
                              {exercise.context}
                            </div>
                          )}

                          {exercise.prompt && (
                            <div className="flex items-center justify-between gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-sm font-bold text-slate-900">
                              <span>{exercise.prompt}</span>
                              <button
                                type="button"
                                onClick={() => handleSpeak(exercise.prompt || '')}
                                title="Listen"
                                className="p-1.5 bg-white border border-sky-200 rounded-lg text-sky-600 hover:bg-sky-50 shrink-0 cursor-pointer"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}

                          {/* User answer vs Correct answer summary */}
                          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-xs space-y-1.5">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-slate-500 font-khmer font-bold">ចម្លើយរបស់អ្នក៖</span>
                              <span className={`font-bold font-mono px-2.5 py-0.5 rounded-lg ${
                                isCorrect ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900 line-through'
                              }`}>
                                {userVal || '(មិនបានឆ្លើយ)'}
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-2 border-t border-slate-100 pt-1.5">
                              <span className="text-slate-500 font-khmer font-bold">ចម្លើយត្រឹមត្រូវ៖</span>
                              <span className="font-bold font-mono text-emerald-900 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                                {exercise.correctAnswers[0]}
                              </span>
                            </div>
                          </div>

                          {/* Full Khmer Explanation */}
                          <div className={`p-4 rounded-2xl text-xs space-y-1.5 ${
                            isCorrect ? 'bg-emerald-50/80 text-emerald-950 border border-emerald-200' : 'bg-rose-50/80 text-rose-950 border border-rose-200'
                          }`}>
                            <div className="font-bold font-khmer flex items-center gap-1.5">
                              {isCorrect ? (
                                <>
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                  <span>ត្រឹមត្រូវ! (Correct Answer)</span>
                                </>
                              ) : (
                                <>
                                  <XCircle className="w-4 h-4 text-rose-600" />
                                  <span>មិនទាន់ត្រឹមត្រូវទេ! (Incorrect)</span>
                                </>
                              )}
                            </div>
                            {exercise.explanation && (
                              <p className="text-slate-800 font-medium">{exercise.explanation}</p>
                            )}
                            {exercise.khmerExplanation && (
                              <p className="text-slate-700 font-khmer mt-0.5 leading-relaxed">
                                💡 <strong>ការពន្យល់៖</strong> {exercise.khmerExplanation}
                              </p>
                            )}
                          </div>

                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

        </div>
      )}

      {/* ======================================================== */}
      {/* MODE 2: ACADEMIC WRITING EXERCISES */}
      {/* ======================================================== */}
      {exerciseMode === 'writing' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-indigo-100 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="px-3 py-1 bg-indigo-600 text-white font-black text-xs rounded-xl shadow-xs">
                  Section {currentWritingSec.sectionNumber}: {currentWritingSec.badge}
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                  Academic Writing Practice: {currentWritingSec.title}
                </h1>
                <p className="text-sm text-indigo-700 font-khmer font-bold mt-1">
                  លំហាត់តែងនិពន្ធ៖ {currentWritingSec.khmerTitle}
                </p>
              </div>

              {/* Section Selector */}
              <div className="relative min-w-[260px]">
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider mb-1.5">
                  ជ្រើសរើសផ្នែក / Switch Section:
                </label>
                <div className="relative">
                  <select
                    value={selectedWritingSecId}
                    onChange={(e) => {
                      setSelectedWritingSecId(e.target.value);
                      resetWritingAll();
                    }}
                    className="w-full appearance-none bg-indigo-50/70 hover:bg-indigo-50 border border-indigo-200 text-slate-800 text-xs sm:text-sm font-bold rounded-2xl px-4 py-2.5 pr-9 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden cursor-pointer shadow-xs"
                    id="exercise-writing-sec-select"
                  >
                    {academicWritingSections.map(s => (
                      <option key={s.id} value={s.id}>
                        Section {s.sectionNumber}: {s.title}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-indigo-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Quick Question Navigation Pills */}
            <div className="pt-3 border-t border-indigo-100 flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-black text-slate-500 uppercase tracking-wider mr-1">
                  សំណួរ៖
                </span>
                {allWritingExercises.map((ex, idx) => {
                  const hasAnswer = !!writingAnswers[ex.id];
                  const isCurrent = currentWritingIndex === idx && !isWritingSubmitted;
                  
                  let pillStyle = "bg-slate-100 text-slate-600 hover:bg-slate-200";
                  if (isWritingSubmitted) {
                    const isRight = writingAnswers[ex.id] === ex.correctAnswer;
                    pillStyle = isRight 
                      ? "bg-emerald-500 text-white font-bold" 
                      : "bg-rose-500 text-white font-bold";
                  } else if (isCurrent) {
                    pillStyle = "bg-indigo-600 text-white font-black ring-2 ring-indigo-200 shadow-xs";
                  } else if (hasAnswer) {
                    pillStyle = "bg-indigo-100 text-indigo-800 font-bold border border-indigo-300";
                  }

                  return (
                    <button
                      key={ex.id}
                      onClick={() => setCurrentWritingIndex(idx)}
                      className={`w-8 h-8 rounded-xl text-xs flex items-center justify-center transition-all cursor-pointer ${pillStyle}`}
                      title={`Question ${idx + 1}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-600 font-khmer">
                  ឆ្លើយបាន៖ <strong className="text-indigo-600 font-mono">{writingAnsweredCount}</strong>/{allWritingExercises.length}
                </span>
                {isWritingSubmitted && (
                  <button
                    onClick={resetWritingAll}
                    className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer font-khmer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>ធ្វើឡើងវិញ (Retake)</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Active Question if NOT submitted */}
          {!isWritingSubmitted && currentWritingEx && (
            <div className="space-y-4">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-indigo-100 shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-indigo-50 pb-3">
                  <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-xl">
                    Subsection {currentWritingEx.subCode}: {currentWritingEx.subTitle}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Question {currentWritingIndex + 1} of {allWritingExercises.length}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-xs font-black shrink-0">
                      {currentWritingIndex + 1}
                    </span>
                    <div>
                      <p className="text-sm sm:text-base font-bold text-slate-900">
                        {currentWritingEx.promptEn}
                      </p>
                      <p className="text-xs sm:text-sm text-indigo-800 font-khmer mt-0.5 font-medium">
                        {currentWritingEx.promptKh}
                      </p>
                    </div>
                  </div>

                  {currentWritingEx.originalSentence && (
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 italic">
                      "{currentWritingEx.originalSentence}"
                    </div>
                  )}

                  {currentWritingEx.options && (
                    <div className="space-y-2.5 pt-1">
                      {currentWritingEx.options && currentWritingEx.options.map((opt) => {
                        const isSelected = writingAnswers[currentWritingEx.id] === opt.label;
                        return (
                          <button
                            key={opt.label}
                            onClick={() => setWritingAnswers(prev => ({ ...prev, [currentWritingEx.id]: opt.label }))}
                            className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${
                              isSelected
                                ? 'bg-indigo-600 text-white border-indigo-700 font-bold shadow-md shadow-indigo-100'
                                : 'bg-slate-50/70 hover:bg-indigo-50 border-slate-200 text-slate-800'
                            }`}
                          >
                            <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                              isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                            }`}>
                              {opt.label}
                            </span>
                            <span className="leading-snug pt-0.5">{opt.text}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Navigation & Submit Bar */}
              <div className="bg-white rounded-3xl p-4 sm:p-5 border border-indigo-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={() => setCurrentWritingIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentWritingIndex === 0}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed text-slate-700 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer font-khmer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>ថយក្រោយ (Previous)</span>
                </button>

                <div className="text-center">
                  <span className="text-xs font-bold text-slate-500">
                    សំណួរទី <strong className="text-slate-800">{currentWritingIndex + 1}</strong> នៃ {allWritingExercises.length}
                  </span>
                  <div className="w-36 h-2 bg-slate-100 rounded-full mt-1 overflow-hidden">
                    <div 
                      className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                      style={{ width: `${((currentWritingIndex + 1) / allWritingExercises.length) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="w-full sm:w-auto flex items-center gap-2">
                  {currentWritingIndex < allWritingExercises.length - 1 ? (
                    <button
                      onClick={() => setCurrentWritingIndex(prev => Math.min(allWritingExercises.length - 1, prev + 1))}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer font-khmer shadow-xs"
                    >
                      <span>បន្ទាប់ (Next)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={submitWritingExercises}
                      className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-200 font-khmer"
                      id="submit-writing-exercises-btn"
                    >
                      <Send className="w-4 h-4" />
                      <span>ដាក់បញ្ជូន (Submit / ដាក់បញ្ជូន)</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* If SUBMITTED: Review List */}
          {isWritingSubmitted && (
            <div className="space-y-6">
              <div className="bg-linear-to-r from-indigo-700 via-indigo-600 to-purple-700 text-white rounded-3xl p-6 sm:p-8 shadow-md space-y-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-center sm:text-left">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner shrink-0">
                      📝
                    </div>
                    <div>
                      <span className="px-3 py-0.5 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider">
                        លទ្ធផលតែងនិពន្ធ (Writing Result)
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black mt-1">
                        ពិន្ទុរបស់អ្នក៖ {writingCorrectCount} / {allWritingExercises.length} ({writingScorePercent}%)
                      </h2>
                      <p className="text-xs sm:text-sm text-indigo-100 font-khmer mt-0.5">
                        សូមពិនិត្យចម្លើយត្រឹមត្រូវ និងការពន្យល់លម្អិតខាងក្រោមដើម្បីស្វែងយល់បន្ថែម។
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={resetWritingAll}
                    className="px-5 py-2.5 rounded-2xl bg-white text-indigo-700 hover:bg-indigo-50 font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer font-khmer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>ធ្វើឡើងវិញ (Retake)</span>
                  </button>
                </div>
              </div>

              {/* Review Cards */}
              <div className="space-y-4">
                {allWritingExercises.map((ex, exIdx) => {
                  const selectedOpt = writingAnswers[ex.id];
                  const isCorrect = selectedOpt === ex.correctAnswer;

                  return (
                    <div 
                      key={ex.id}
                      className={`bg-white rounded-3xl p-6 border transition-all ${
                        isCorrect ? 'border-emerald-300 bg-emerald-50/20' : 'border-rose-300 bg-rose-50/20'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                          isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                        }`}>
                          {exIdx + 1}
                        </span>

                        <div className="flex-1 space-y-3">
                          <div>
                            <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                              {ex.subCode}
                            </span>
                            <p className="text-sm font-bold text-slate-900 mt-1">
                              {ex.promptEn}
                            </p>
                            <p className="text-xs text-indigo-800 font-khmer mt-0.5">
                              {ex.promptKh}
                            </p>
                          </div>

                          {ex.originalSentence && (
                            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 italic">
                              "{ex.originalSentence}"
                            </div>
                          )}

                          {/* Options status */}
                          <div className="space-y-2">
                            {ex.options?.map(opt => {
                              const isThisSelected = selectedOpt === opt.label;
                              const isThisCorrect = opt.isCorrect;
                              let style = "bg-white border-slate-200 text-slate-700 opacity-60";
                              if (isThisCorrect) style = "bg-emerald-100 border-emerald-400 text-emerald-950 font-bold opacity-100";
                              else if (isThisSelected && !isThisCorrect) style = "bg-rose-100 border-rose-400 text-rose-950 line-through opacity-100";

                              return (
                                <div key={opt.label} className={`p-3 rounded-xl border text-xs sm:text-sm flex items-start gap-2.5 ${style}`}>
                                  <span className="w-5 h-5 rounded-md bg-slate-100 flex items-center justify-center text-xs font-black shrink-0">
                                    {opt.label}
                                  </span>
                                  <span>{opt.text}</span>
                                </div>
                              );
                            })}
                          </div>

                          {/* Detailed Explanation */}
                          <div className={`p-4 rounded-2xl text-xs space-y-1.5 ${
                            isCorrect ? 'bg-emerald-50 text-emerald-950 border border-emerald-200' : 'bg-rose-50 text-rose-950 border border-rose-200'
                          }`}>
                            <div className="font-bold font-khmer">
                              {isCorrect ? '✅ ត្រឹមត្រូវ! (Correct Standard)' : `❌ មិនទាន់ត្រឹមត្រូវទេ (ចម្លើយត្រឹមត្រូវគឺ ${ex.correctAnswer})`}
                            </div>
                            <p className="text-slate-800 font-medium">{ex.explanationEn}</p>
                            <p className="text-slate-700 font-khmer">💡 <strong>ការពន្យល់៖</strong> {ex.explanationKh}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      )}

      {/* ======================================================== */}
      {/* MODE 3: READING COMPREHENSION EXERCISES */}
      {/* ======================================================== */}
      {exerciseMode === 'reading' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-100 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="px-3 py-1 bg-emerald-600 text-white font-black text-xs rounded-xl shadow-xs">
                  Warm-Up {currentReadingStory.warmUpNumber}: {currentReadingStory.category}
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                  Reading Practice: {currentReadingStory.title}
                </h1>
                <p className="text-sm text-emerald-700 font-khmer font-bold mt-1">
                  លំហាត់អានយល់ន័យ៖ {currentReadingStory.khmerTitle}
                </p>
              </div>

              {/* Story Switcher */}
              <div className="relative min-w-[260px]">
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-wider mb-1.5">
                  ជ្រើសរើសរឿង / Switch Story:
                </label>
                <div className="relative">
                  <select
                    value={selectedReadingId}
                    onChange={(e) => {
                      setSelectedReadingId(e.target.value);
                      resetReadingAll();
                    }}
                    className="w-full appearance-none bg-emerald-50/70 hover:bg-emerald-50 border border-emerald-200 text-slate-800 text-xs sm:text-sm font-bold rounded-2xl px-4 py-2.5 pr-9 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden cursor-pointer shadow-xs"
                    id="exercise-reading-story-select"
                  >
                    {readingWarmUps.map(r => (
                      <option key={r.id} value={r.id}>
                        Warm-Up {r.warmUpNumber}: {r.title} (p.{r.pageNumber})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-emerald-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Quick Passage Read Box */}
            <div className="p-4 bg-emerald-50/40 rounded-2xl border border-emerald-100 space-y-2">
              <div className="flex items-center justify-between text-xs font-black text-emerald-900">
                <span>Story Snippet (Passage):</span>
                <button
                  onClick={() => handleSpeak(currentReadingStory.passage)}
                  className="flex items-center gap-1 text-emerald-700 hover:text-emerald-800 cursor-pointer font-bold"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listen Audio</span>
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans">
                {currentReadingStory.passage}
              </p>
            </div>

            {/* Quick Question Navigation Pills */}
            <div className="pt-3 border-t border-emerald-100 flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-black text-slate-500 uppercase tracking-wider mr-1">
                  សំណួរ៖
                </span>
                {readingQuestions.map((q, idx) => {
                  const hasAnswer = !!readingAnswers[q.id];
                  const isCurrent = currentReadingIndex === idx && !isReadingSubmitted;
                  
                  let pillStyle = "bg-slate-100 text-slate-600 hover:bg-slate-200";
                  if (isReadingSubmitted) {
                    const isRight = readingAnswers[q.id] === q.correctAnswer;
                    pillStyle = isRight 
                      ? "bg-emerald-500 text-white font-bold" 
                      : "bg-rose-500 text-white font-bold";
                  } else if (isCurrent) {
                    pillStyle = "bg-emerald-600 text-white font-black ring-2 ring-emerald-200 shadow-xs";
                  } else if (hasAnswer) {
                    pillStyle = "bg-emerald-100 text-emerald-800 font-bold border border-emerald-300";
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentReadingIndex(idx)}
                      className={`w-8 h-8 rounded-xl text-xs flex items-center justify-center transition-all cursor-pointer ${pillStyle}`}
                      title={`Question ${idx + 1}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-600 font-khmer">
                  ឆ្លើយបាន៖ <strong className="text-emerald-600 font-mono">{readingAnsweredCount}</strong>/{readingQuestions.length}
                </span>
                {isReadingSubmitted && (
                  <button
                    onClick={resetReadingAll}
                    className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer font-khmer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>ធ្វើឡើងវិញ (Retake)</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Active Reading Question if NOT submitted */}
          {!isReadingSubmitted && currentReadingQ && (
            <div className="space-y-4">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-emerald-50 pb-3">
                  <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl">
                    Question {currentReadingIndex + 1} of {readingQuestions.length}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Warm-Up {currentReadingStory.warmUpNumber}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-xs font-black shrink-0">
                      {currentReadingIndex + 1}
                    </span>
                    <div>
                      <p className="text-sm sm:text-base font-bold text-slate-900">
                        {currentReadingQ.promptEn}
                      </p>
                      <p className="text-xs sm:text-sm text-emerald-900 font-khmer font-medium mt-0.5">
                        {currentReadingQ.promptKh}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {currentReadingQ.options && currentReadingQ.options.map((opt) => {
                      const isSelected = readingAnswers[currentReadingQ.id] === opt.label;
                      return (
                        <button
                          key={opt.label}
                          onClick={() => setReadingAnswers(prev => ({ ...prev, [currentReadingQ.id]: opt.label }))}
                          className={`p-4 rounded-2xl border text-xs sm:text-sm transition-all flex items-start gap-3 text-left cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-600 text-white border-emerald-700 font-bold shadow-md shadow-emerald-100'
                              : 'bg-slate-50/70 hover:bg-emerald-50 border-slate-200 text-slate-800'
                          }`}
                        >
                          <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                            isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                          }`}>
                            {opt.label}
                          </span>
                          <span className="leading-snug pt-0.5">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Navigation & Submit Bar */}
              <div className="bg-white rounded-3xl p-4 sm:p-5 border border-emerald-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={() => setCurrentReadingIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentReadingIndex === 0}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed text-slate-700 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer font-khmer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>ថយក្រោយ (Previous)</span>
                </button>

                <div className="text-center">
                  <span className="text-xs font-bold text-slate-500">
                    សំណួរទី <strong className="text-slate-800">{currentReadingIndex + 1}</strong> នៃ {readingQuestions.length}
                  </span>
                  <div className="w-36 h-2 bg-slate-100 rounded-full mt-1 overflow-hidden">
                    <div 
                      className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                      style={{ width: `${((currentReadingIndex + 1) / readingQuestions.length) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="w-full sm:w-auto flex items-center gap-2">
                  {currentReadingIndex < readingQuestions.length - 1 ? (
                    <button
                      onClick={() => setCurrentReadingIndex(prev => Math.min(readingQuestions.length - 1, prev + 1))}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer font-khmer shadow-xs"
                    >
                      <span>បន្ទាប់ (Next)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={submitReadingExercises}
                      className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-200 font-khmer"
                      id="submit-reading-exercises-btn"
                    >
                      <Send className="w-4 h-4" />
                      <span>ដាក់បញ្ជូន (Submit / ដាក់បញ្ជូន)</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* If SUBMITTED: Review List */}
          {isReadingSubmitted && (
            <div className="space-y-6">
              <div className="bg-linear-to-r from-emerald-700 via-emerald-600 to-teal-700 text-white rounded-3xl p-6 sm:p-8 shadow-md space-y-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-center sm:text-left">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner shrink-0">
                      📖
                    </div>
                    <div>
                      <span className="px-3 py-0.5 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider">
                        លទ្ធផលអានយល់ន័យ (Reading Result)
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black mt-1">
                        ពិន្ទុរបស់អ្នក៖ {readingCorrectCount} / {readingQuestions.length} ({readingScorePercent}%)
                      </h2>
                      <p className="text-xs sm:text-sm text-emerald-100 font-khmer mt-0.5">
                        សូមពិនិត្យចម្លើយត្រឹមត្រូវ និងការពន្យល់លម្អិតខាងក្រោម។
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={resetReadingAll}
                    className="px-5 py-2.5 rounded-2xl bg-white text-emerald-700 hover:bg-emerald-50 font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer font-khmer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>ធ្វើឡើងវិញ (Retake)</span>
                  </button>
                </div>
              </div>

              {/* Review Cards */}
              <div className="space-y-4">
                {readingQuestions.map((q, qIdx) => {
                  const selectedOpt = readingAnswers[q.id];
                  const isCorrect = selectedOpt === q.correctAnswer;

                  return (
                    <div 
                      key={q.id}
                      className={`bg-white rounded-3xl p-6 border transition-all ${
                        isCorrect ? 'border-emerald-300 bg-emerald-50/20' : 'border-rose-300 bg-rose-50/20'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                          isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                        }`}>
                          {qIdx + 1}
                        </span>

                        <div className="flex-1 space-y-3">
                          <div>
                            <p className="text-sm font-bold text-slate-900">
                              {q.promptEn}
                            </p>
                            <p className="text-xs text-emerald-900 font-khmer mt-0.5">
                              {q.promptKh}
                            </p>
                          </div>

                          {/* Options review */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {q.options && q.options.map(opt => {
                              const isThisSelected = selectedOpt === opt.label;
                              const isThisCorrect = opt.isCorrect;
                              let style = "bg-white border-slate-200 text-slate-700 opacity-60";
                              if (isThisCorrect) style = "bg-emerald-100 border-emerald-400 text-emerald-950 font-bold opacity-100";
                              else if (isThisSelected && !isThisCorrect) style = "bg-rose-100 border-rose-400 text-rose-950 line-through opacity-100";

                              return (
                                <div key={opt.label} className={`p-3 rounded-xl border text-xs sm:text-sm flex items-start gap-2.5 ${style}`}>
                                  <span className="w-5 h-5 rounded-md bg-slate-100 flex items-center justify-center text-xs font-black shrink-0">
                                    {opt.label}
                                  </span>
                                  <span>{opt.text}</span>
                                </div>
                              );
                            })}
                          </div>

                          {/* Detailed Explanation */}
                          <div className={`p-4 rounded-2xl text-xs space-y-1.5 ${
                            isCorrect ? 'bg-emerald-50 text-emerald-950 border border-emerald-200' : 'bg-rose-50 text-rose-950 border border-rose-200'
                          }`}>
                            <div className="font-bold font-khmer">
                              {isCorrect ? '✅ ត្រឹមត្រូវ! (Correct Answer)' : `❌ មិនទាន់ត្រឹមត្រូវទេ (ចម្លើយត្រឹមត្រូវគឺ ${q.correctAnswer})`}
                            </div>
                            <p className="text-slate-800 font-medium">{q.explanationEn}</p>
                            <p className="text-slate-700 font-khmer">💡 <strong>ការពន្យល់៖</strong> {q.explanationKh}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
