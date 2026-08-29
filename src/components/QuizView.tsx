import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  Award, 
  BookOpen, 
  Clock, 
  HelpCircle,
  BarChart3,
  ChevronRight
} from 'lucide-react';
import { UnitData, ExerciseItem, LevelType } from '../types';
import { soundManager } from '../utils/sound';
import { userStore } from '../utils/userStore';

interface QuizViewProps {
  units: UnitData[];
  initialUnit?: UnitData;
  onNavigateToUnit: (unit: UnitData) => void;
  onRecordQuizResult: (unitId: number, score: number, total: number) => void;
}

interface QuizQuestion {
  unitId: number;
  unitTitle: string;
  unitNumber: number;
  khmerTitle: string;
  exercise: ExerciseItem;
}

export const QuizView: React.FC<QuizViewProps> = ({
  units,
  initialUnit,
  onNavigateToUnit,
  onRecordQuizResult
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialUnit ? `unit-${initialUnit.id}` : 'all');
  const [quizMode, setQuizMode] = useState<'instant' | 'exam'>('instant');
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<{ [index: number]: string }>({});
  const [instantChecked, setInstantChecked] = useState<{ [index: number]: boolean }>({});
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Build questions when category changes
  const startQuiz = (catId: string) => {
    let pool: QuizQuestion[] = [];

    if (catId.startsWith('unit-')) {
      const uId = Number(catId.replace('unit-', ''));
      const found = units.find(u => u.id === uId);
      if (found) {
        pool = found.exercises.map(ex => ({
          unitId: found.id,
          unitTitle: found.title,
          unitNumber: found.unitNumber,
          khmerTitle: found.khmerTitle,
          exercise: ex
        }));
      }
    } else if (catId === 'elementary' || catId === 'intermediate' || catId === 'advanced') {
      const filteredUnits = units.filter(u => u.level === catId);
      filteredUnits.forEach(u => {
        u.exercises.forEach(ex => {
          pool.push({
            unitId: u.id,
            unitTitle: u.title,
            unitNumber: u.unitNumber,
            khmerTitle: u.khmerTitle,
            exercise: ex
          });
        });
      });
    } else {
      // All units
      units.forEach(u => {
        u.exercises.forEach(ex => {
          pool.push({
            unitId: u.id,
            unitTitle: u.title,
            unitNumber: u.unitNumber,
            khmerTitle: u.khmerTitle,
            exercise: ex
          });
        });
      });
    }

    // Shuffle pool
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    // Limit to max 15 questions for good pace
    const selected = shuffled.slice(0, Math.min(15, shuffled.length));

    setQuizQuestions(selected);
    setCurrentIndex(0);
    setUserAnswers({});
    setInstantChecked({});
    setIsFinished(false);
    setTimerSeconds(0);
    setIsTimerRunning(true);
  };

  useEffect(() => {
    startQuiz(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && !isFinished) {
      interval = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, isFinished]);

  const currentQ = quizQuestions[currentIndex];

  const handleSelectAnswer = (ans: string) => {
    if (instantChecked[currentIndex] && quizMode === 'instant') return;

    setUserAnswers(prev => ({ ...prev, [currentIndex]: ans }));

    if (quizMode === 'instant') {
      const isRight = currentQ.exercise.correctAnswers.some(c => c.toLowerCase().trim() === ans.toLowerCase().trim());
      setInstantChecked(prev => ({ ...prev, [currentIndex]: true }));
      if (isRight) {
        soundManager.playCorrect();
      } else {
        soundManager.playIncorrect();
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setIsFinished(true);
    setIsTimerRunning(false);

    let score = 0;
    quizQuestions.forEach((q, idx) => {
      const uAns = (userAnswers[idx] || '').toLowerCase().trim();
      const isRight = q.exercise.correctAnswers.some(c => c.toLowerCase().trim() === uAns);
      if (isRight) score++;
    });

    const percent = Math.round((score / quizQuestions.length) * 100);

    if (currentQ) {
      onRecordQuizResult(currentQ.unitId, score, quizQuestions.length);
      userStore.recordExerciseCompletion(
        'grammar',
        `Grammar Quiz: Unit ${currentQ.unitNumber} - ${currentQ.unitTitle}`,
        currentQ.khmerTitle,
        score,
        quizQuestions.length,
        score * 5
      );
    }

    if (percent >= 75) {
      soundManager.playComplete();
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // confetti safe fallback
      }
    }
  };

  const calculateScore = () => {
    let correct = 0;
    quizQuestions.forEach((q, idx) => {
      const uAns = (userAnswers[idx] || '').toLowerCase().trim();
      if (q.exercise.correctAnswers.some(c => c.toLowerCase().trim() === uAns)) {
        correct++;
      }
    });
    return correct;
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Quiz Config & Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-sky-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-amber-100 text-amber-900 font-black text-xs rounded-xl flex items-center gap-1 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Instant Result Quiz
              </span>
              <span className="text-xs text-slate-500 font-bold">ដឹងលទ្ធផលភ្លាមៗ</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
              Grammar Quiz Challenge
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-khmer">
              ធ្វើតេស្តសាកល្បងសមត្ថភាពវេយ្យាករណ៍ និងទទួលបានពិន្ទុភ្លាមៗ
            </p>
          </div>

          {/* Category Selector */}
          <div className="flex flex-col gap-1 min-w-[200px]">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              កម្រងសំណួរ (Select Scope):
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-sky-50/70 border border-sky-200 text-slate-800 text-xs sm:text-sm font-bold rounded-2xl px-3.5 py-2.5 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-hidden cursor-pointer"
              id="quiz-category-select"
            >
              <option value="all">⚡ All Units Mixed (ចម្រុះគ្រប់មេរៀន)</option>
              <option value="elementary">🟢 Basic / Elementary Level</option>
              <option value="intermediate">🔵 Intermediate Level</option>
              <option value="advanced">🟣 Advanced Level</option>
              <optgroup label="Single Unit Quiz">
                {units.map(u => (
                  <option key={u.id} value={`unit-${u.id}`}>
                    Unit {u.unitNumber}: {u.title}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>

        {/* Feedback Mode Switcher & Timer */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-sky-100 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-600">របៀបឆ្លើយ (Mode):</span>
            <button
              onClick={() => setQuizMode('instant')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                quizMode === 'instant' 
                  ? 'bg-sky-500 text-white shadow-xs font-bold' 
                  : 'bg-sky-50 text-slate-700 hover:bg-sky-100'
              }`}
            >
              ដឹងលទ្ធផលភ្លាមៗ (Instant Feedback)
            </button>
            <button
              onClick={() => setQuizMode('exam')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                quizMode === 'exam' 
                  ? 'bg-sky-500 text-white shadow-xs font-bold' 
                  : 'bg-sky-50 text-slate-700 hover:bg-sky-100'
              }`}
            >
              ប្រលងចប់ទើបបង្ហាញ (Exam Mode)
            </button>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 border border-orange-200/60 rounded-xl text-orange-700 font-mono font-bold">
            <Clock className="w-3.5 h-3.5 text-orange-500" />
            <span>{formatTime(timerSeconds)}</span>
          </div>
        </div>
      </div>

      {/* Main Quiz Flow */}
      {!isFinished && currentQ ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-sm space-y-6" id="quiz-question-container">
          
          {/* Progress Bar & Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600">
              <span>Question {currentIndex + 1} of {quizQuestions.length}</span>
              <span className="px-2.5 py-1 bg-sky-50 text-sky-700 rounded-xl font-bold border border-sky-100">
                Unit {currentQ.unitNumber}: {currentQ.unitTitle}
              </span>
            </div>
            <div className="w-full bg-sky-100 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-sky-500 h-full transition-all duration-300 rounded-full"
                style={{ width: `${((currentIndex + 1) / quizQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Instruction & Context */}
          <div className="space-y-3">
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                {currentQ.exercise.instruction}
              </h2>
              {currentQ.exercise.khmerInstruction && (
                <p className="text-xs sm:text-sm text-slate-500 font-khmer mt-0.5">
                  {currentQ.exercise.khmerInstruction}
                </p>
              )}
            </div>

            {currentQ.exercise.context && (
              <div className="p-4 bg-sky-50/70 rounded-2xl border border-sky-100 text-slate-900 text-sm sm:text-base font-semibold">
                {currentQ.exercise.context}
              </div>
            )}
            {currentQ.exercise.prompt && (
              <div className="p-4 bg-sky-50/70 rounded-2xl border border-sky-100 text-slate-900 text-sm sm:text-base font-semibold">
                {currentQ.exercise.prompt}
              </div>
            )}
          </div>

          {/* Options / Input Field */}
          {currentQ.exercise.options && currentQ.exercise.options.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQ.exercise.options.map((opt, oIdx) => {
                const isSelected = userAnswers[currentIndex] === opt;
                const isChecked = quizMode === 'instant' && instantChecked[currentIndex];
                const isCorrectOpt = currentQ.exercise.correctAnswers.includes(opt);

                let btnStyle = 'bg-white hover:bg-sky-50/50 border-slate-200 text-slate-800 hover:border-sky-300';

                if (isChecked) {
                  if (isCorrectOpt) {
                    btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold shadow-xs';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-100 border-rose-400 text-rose-950 line-through';
                  } else {
                    btnStyle = 'bg-slate-50/60 border-slate-200 text-slate-400';
                  }
                } else if (isSelected) {
                  btnStyle = 'bg-sky-100 border-sky-500 text-sky-900 font-bold ring-2 ring-sky-200';
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectAnswer(opt)}
                    className={`p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-2 cursor-pointer ${btnStyle}`}
                    id={`quiz-opt-${oIdx}`}
                  >
                    <span className="font-semibold">{opt}</span>
                    {isChecked && isCorrectOpt && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                    {isChecked && isSelected && !isCorrectOpt && <XCircle className="w-5 h-5 text-rose-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="space-y-3">
              <input
                type="text"
                value={userAnswers[currentIndex] || ''}
                disabled={quizMode === 'instant' && instantChecked[currentIndex]}
                onChange={(e) => setUserAnswers(prev => ({ ...prev, [currentIndex]: e.target.value }))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && userAnswers[currentIndex]) {
                    if (quizMode === 'instant' && !instantChecked[currentIndex]) {
                      handleSelectAnswer(userAnswers[currentIndex]);
                    } else {
                      handleNext();
                    }
                  }
                }}
                placeholder="Type your answer here..."
                className="w-full px-4 py-3 text-sm rounded-2xl border border-slate-300 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-hidden font-medium"
                id="quiz-input-field"
              />
              {quizMode === 'instant' && !instantChecked[currentIndex] && (
                <button
                  onClick={() => handleSelectAnswer(userAnswers[currentIndex] || '')}
                  disabled={!userAnswers[currentIndex]}
                  className="px-5 py-2.5 bg-sky-500 disabled:opacity-40 hover:bg-sky-600 text-white rounded-2xl text-xs font-bold shadow-md shadow-sky-100 transition-all cursor-pointer"
                >
                  ផ្ទៀងផ្ទាត់ចម្លើយ (Submit Answer)
                </button>
              )}
            </div>
          )}

          {/* Instant Explanation Box */}
          {quizMode === 'instant' && instantChecked[currentIndex] && (
            <div className="p-5 rounded-2xl bg-sky-50/70 border border-sky-200 text-xs sm:text-sm space-y-2">
              <div className="flex items-center gap-2 font-bold">
                {currentQ.exercise.correctAnswers.some(c => c.toLowerCase().trim() === (userAnswers[currentIndex] || '').toLowerCase().trim()) ? (
                  <span className="text-emerald-700 flex items-center gap-1.5 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    ត្រឹមត្រូវណាស់! (Correct)
                  </span>
                ) : (
                  <span className="text-rose-700 flex items-center gap-1.5 font-bold">
                    <XCircle className="w-4 h-4" />
                    មិនទាន់ត្រឹមត្រូវ (Incorrect)
                  </span>
                )}
              </div>
              <div className="text-slate-800">
                <strong>ចម្លើយត្រឹមត្រូវ៖</strong> <span className="font-mono text-sky-950 font-bold bg-white px-2.5 py-1 rounded-xl border border-sky-100">{currentQ.exercise.correctAnswers.join(' ឬ ')}</span>
              </div>
              <p className="text-slate-600 font-khmer">{currentQ.exercise.khmerExplanation}</p>
            </div>
          )}

          {/* Next / Finish Navigation Button */}
          <div className="flex items-center justify-between pt-4 border-t border-sky-100">
            <button
              onClick={() => {
                const u = units.find(unit => unit.id === currentQ.unitId);
                if (u) onNavigateToUnit(u);
              }}
              className="text-xs text-sky-600 hover:text-sky-800 font-bold flex items-center gap-1 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>មើលមេរៀន Unit {currentQ.unitNumber}</span>
            </button>

            <button
              onClick={handleNext}
              disabled={userAnswers[currentIndex] === undefined && quizMode === 'instant' && !instantChecked[currentIndex]}
              className="flex items-center gap-2 px-6 py-2.5 bg-sky-500 hover:bg-sky-600 disabled:opacity-40 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-md shadow-sky-100 transition-all cursor-pointer"
              id="quiz-next-btn"
            >
              <span>{currentIndex < quizQuestions.length - 1 ? 'សំណួរបន្ទាប់ (Next)' : 'បញ្ចប់តេស្ត (Finish Quiz)'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      ) : isFinished ? (
        /* Quiz Results Card */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-md space-y-6 text-center" id="quiz-results-card">
          <div className="inline-flex p-4 bg-orange-100 text-orange-600 rounded-3xl shadow-inner">
            <Award className="w-12 h-12" />
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              លទ្ធផលតេស្ត Quiz របស់អ្នក (Quiz Results)
            </h2>
            <p className="text-slate-500 text-sm mt-1 font-medium">
              បានបញ្ចប់ក្នុងរយៈពេល {formatTime(timerSeconds)} នាទី
            </p>
          </div>

          {/* Big Score Badge */}
          <div className="max-w-xs mx-auto p-6 bg-gradient-to-br from-sky-50 to-indigo-50 border border-sky-200 rounded-3xl shadow-xs">
            <div className="text-4xl sm:text-5xl font-black text-sky-600">
              {calculateScore()} <span className="text-xl text-slate-400 font-normal">/ {quizQuestions.length}</span>
            </div>
            <div className="text-sm font-black text-slate-700 mt-2">
              ពិន្ទុទទួលបាន៖ {Math.round((calculateScore() / quizQuestions.length) * 100)}%
            </div>
            <div className="mt-2 text-xs text-slate-600 font-khmer">
              {calculateScore() / quizQuestions.length >= 0.8 
                ? '🌟 ល្អឥតខ្ចោះ! អ្នកយល់ដឹងវេយ្យាករណ៍បានយ៉ាងច្បាស់លាស់។'
                : calculateScore() / quizQuestions.length >= 0.5
                ? '👍 ល្អគួរសម! សូមពិនិត្យមើលមេរៀនដែលខុសបន្ថែមទៀត។'
                : '💪 កុំបោះបង់! សូមត្រឡប់ទៅរៀនមេរៀនឡើងវិញដើម្បីពង្រឹងសមត្ថភាព។'}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => startQuiz(selectedCategory)}
              className="flex items-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl text-sm font-bold shadow-md shadow-sky-100 transition-all cursor-pointer"
              id="retry-quiz-btn"
            >
              <RotateCcw className="w-4 h-4" />
              <span>ធ្វើតេស្តម្ដងទៀត (Retry Quiz)</span>
            </button>
          </div>

          {/* Detailed Question Review */}
          <div className="text-left space-y-4 pt-6 border-t border-sky-100">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-sky-600" />
              <span>ការពិនិត្យចម្លើយលម្អិត (Detailed Review)</span>
            </h3>

            <div className="space-y-3">
              {quizQuestions.map((q, idx) => {
                const uAns = (userAnswers[idx] || '').trim();
                const isRight = q.exercise.correctAnswers.some(c => c.toLowerCase().trim() === uAns.toLowerCase());

                return (
                  <div 
                    key={idx}
                    className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-2 ${
                      isRight ? 'bg-emerald-50/60 border-emerald-200' : 'bg-rose-50/60 border-rose-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-slate-800">
                        {idx + 1}. {q.exercise.prompt || q.exercise.context || q.exercise.instruction}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-black ${
                        isRight ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {isRight ? '✓ ត្រូវ' : '✗ ខុស'}
                      </span>
                    </div>

                    <div className="text-slate-700 flex flex-wrap gap-x-4 gap-y-1">
                      <span><strong>ចម្លើយរបស់អ្នក៖</strong> {uAns || '(មិនបានឆ្លើយ)'}</span>
                      <span><strong>ចម្លើយត្រូវ៖</strong> <span className="font-bold text-emerald-800">{q.exercise.correctAnswers.join(' / ')}</span></span>
                    </div>

                    <div className="text-xs text-slate-600 font-khmer pt-2 border-t border-slate-200/50 flex items-center justify-between">
                      <span>{q.exercise.khmerExplanation}</span>
                      <button
                        onClick={() => {
                          const u = units.find(unit => unit.id === q.unitId);
                          if (u) onNavigateToUnit(u);
                        }}
                        className="text-sky-600 hover:text-sky-800 font-bold ml-2 underline shrink-0 cursor-pointer"
                      >
                        រៀន Unit {q.unitNumber} &rarr;
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      ) : null}

    </div>
  );
};
