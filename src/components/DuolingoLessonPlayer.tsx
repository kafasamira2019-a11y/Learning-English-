import React, { useState, useEffect } from 'react';
import { X, Heart, Volume2, Sparkles, Check, AlertCircle, RefreshCw, Trophy, Flame } from 'lucide-react';
import { UnitData, ExerciseItem } from '../types';
import { soundManager } from '../utils/sound';
import { DuoMascot } from './DuoMascot';

interface DuolingoLessonPlayerProps {
  unit: UnitData;
  customExercises?: ExerciseItem[];
  stepTitle?: string;
  stepNumber?: number;
  onComplete: (score: number, total: number, earnedXp: number, earnedGems: number) => void;
  onClose: () => void;
  initialHearts?: number;
  onHeartLost?: () => void;
}

export const DuolingoLessonPlayer: React.FC<DuolingoLessonPlayerProps> = ({
  unit,
  customExercises,
  stepTitle,
  stepNumber,
  onComplete,
  onClose,
  initialHearts = 5,
  onHeartLost
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedWordBank, setSelectedWordBank] = useState<string[]>([]);
  const [availableWordBank, setAvailableWordBank] = useState<string[]>([]);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect' | 'completed'>('idle');
  const [hearts, setHearts] = useState(initialHearts);
  const [score, setScore] = useState(0);
  const [earnedXp, setEarnedXp] = useState(0);
  const [showExitModal, setShowExitModal] = useState(false);

  const exercises = customExercises && customExercises.length > 0 
    ? customExercises 
    : unit.exercises && unit.exercises.length > 0 
      ? unit.exercises 
      : [
    {
      id: `${unit.id}-default-1`,
      type: 'multiple-choice' as const,
      instruction: 'Select the correct English sentence for ongoing action:',
      khmerInstruction: 'ជ្រើសរើសប្រយោគដែលត្រឹមត្រូវសម្រាប់សកម្មភាពកំពុងកើតឡើង:',
      options: [
        'She is writing a research paper right now.',
        'She writes a research paper right now.',
        'She written a research paper right now.'
      ],
      correctAnswers: ['She is writing a research paper right now.'],
      explanation: 'Use present continuous (is/am/are + V-ing) for actions happening now.',
      khmerExplanation: 'ប្រើ Present Continuous សម្រាប់សកម្មភាពដែលកំពុងកើតឡើងនៅពេលបច្ចុប្បន្ន។'
    }
  ];

  const currentExercise = exercises[currentIdx];

  // Initialize word bank if applicable
  useEffect(() => {
    if (!currentExercise) return;
    setStatus('idle');
    setSelectedOption(null);
    setTypedAnswer('');
    setSelectedWordBank([]);

    // Build word tiles from correct answer + distractors
    const correctWords = currentExercise.correctAnswers[0].split(/\s+/);
    const extraDistractors = ['is', 'are', 'was', 'have', 'been', 'doing', 'to', 'at', 'with', 'very', 'well'];
    const distractors = extraDistractors.filter(w => !correctWords.includes(w)).slice(0, 3);
    const combined = [...correctWords, ...distractors].sort(() => Math.random() - 0.5);
    setAvailableWordBank(combined);
  }, [currentIdx, currentExercise]);

  const progressPercent = Math.round((currentIdx / exercises.length) * 100);

  const handleWordTileClick = (word: string, fromSelected: boolean, index: number) => {
    if (status !== 'idle') return;
    if (fromSelected) {
      setSelectedWordBank(prev => prev.filter((_, i) => i !== index));
      setAvailableWordBank(prev => [...prev, word]);
    } else {
      setAvailableWordBank(prev => prev.filter((_, i) => i !== index));
      setSelectedWordBank(prev => [...prev, word]);
    }
  };

  const handleCheckAnswer = () => {
    if (!currentExercise) return;

    let userResponse = '';
    if (currentExercise.options && currentExercise.options.length > 0) {
      userResponse = selectedOption || '';
    } else if (selectedWordBank.length > 0) {
      userResponse = selectedWordBank.join(' ').trim();
    } else {
      userResponse = typedAnswer.trim();
    }

    const normalizeStr = (s: string) => {
      return s
        .trim()
        .toLowerCase()
        .replace(/[’‘`]/g, "'")
        .replace(/[.,!?;:]+$/g, '')
        .replace(/\s+/g, ' ');
    };

    const cleanU = normalizeStr(userResponse);
    const isMatch = currentExercise.correctAnswers.some(ans => {
      const cleanA = normalizeStr(ans);
      if (cleanA === cleanU) return true;
      if (cleanA.replace(/'/g, '') === cleanU.replace(/'/g, '')) return true;
      return false;
    });

    if (isMatch) {
      setStatus('correct');
      setScore(s => s + 1);
      setEarnedXp(x => x + 5);
      soundManager.playCorrect();
    } else {
      setStatus('incorrect');
      setHearts(h => Math.max(0, h - 1));
      if (onHeartLost) {
        onHeartLost();
      }
      soundManager.playIncorrect();
    }
  };

  const handleContinue = () => {
    if (currentIdx + 1 < exercises.length) {
      setCurrentIdx(i => i + 1);
      setStatus('idle');
    } else {
      setStatus('completed');
      soundManager.playComplete();
    }
  };

  const handleFinish = () => {
    onComplete(score, exercises.length, earnedXp + 10, 15);
  };

  // Lesson Completed Victory Screen
  if (status === 'completed') {
    return (
      <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-between p-6 sm:p-10 select-none animate-in fade-in duration-300">
        <div className="w-full max-w-xl mx-auto flex items-center justify-between">
          <span className="text-sm font-black text-slate-400 uppercase tracking-wider">
            LESSON COMPLETE!
          </span>
          <span className="text-xl">🎉</span>
        </div>

        <div className="w-full max-w-md mx-auto text-center space-y-6">
          <div className="flex justify-center">
            <DuoMascot pose="celebrating" size={130} />
          </div>

          <div className="space-y-1">
            <h2 className="text-3xl font-extrabold text-[#FFC800] tracking-tight">
              Lesson Completed!
            </h2>
            <p className="text-sm font-khmer text-slate-500">
              អបអរសាទរ! អ្នកបានបញ្ចប់មេរៀននេះដោយជោគជ័យ
            </p>
          </div>

          {/* Stats Badges Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 bg-[#FFF4D9] border-2 border-[#FFC800] rounded-2xl text-center space-y-1">
              <span className="text-xs font-black uppercase text-[#FF9600]">TOTAL XP</span>
              <div className="text-2xl font-extrabold text-[#FF9600]">
                +{earnedXp + 10}
              </div>
            </div>

            <div className="p-4 bg-[#DDF4FF] border-2 border-[#1CB0F6] rounded-2xl text-center space-y-1">
              <span className="text-xs font-black uppercase text-[#1CB0F6]">GEMS</span>
              <div className="text-2xl font-extrabold text-[#1CB0F6]">
                +15 💎
              </div>
            </div>

            <div className="p-4 bg-[#D7FFB8] border-2 border-[#58CC02] rounded-2xl text-center space-y-1">
              <span className="text-xs font-black uppercase text-[#58CC02]">ACCURACY</span>
              <div className="text-2xl font-extrabold text-[#58CC02]">
                {Math.round((score / exercises.length) * 100)}%
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Continue Button */}
        <div className="w-full max-w-xl mx-auto">
          <button
            onClick={handleFinish}
            className="w-full py-4 bg-[#58CC02] hover:bg-[#46A302] active:translate-y-1 text-white text-base font-black uppercase tracking-wider rounded-2xl border-b-4 border-[#58A700] active:border-b-0 shadow-md transition-all cursor-pointer text-center"
            id="lesson-complete-continue-btn"
          >
            CONTINUE
          </button>
        </div>
      </div>
    );
  }

  const isCheckDisabled = () => {
    if (status !== 'idle') return false;
    if (currentExercise.options && currentExercise.options.length > 0) {
      return !selectedOption;
    }
    if (availableWordBank.length > 0) {
      return selectedWordBank.length === 0 && !typedAnswer.trim();
    }
    return !typedAnswer.trim();
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col justify-between select-none">
      
      {/* Top Navigation Bar */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        
        {/* Close Button */}
        <button
          onClick={() => setShowExitModal(true)}
          className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          id="close-lesson-player-btn"
        >
          <X className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* Duolingo Rounded Progress Bar & Step Badge */}
        <div className="flex-1 max-w-xl flex flex-col gap-1">
          <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-slate-400">
            <span>{stepTitle || unit.title}</span>
            <span>{stepNumber ? `Step ${stepNumber}/6` : `${Math.min(currentIdx + 1, exercises.length)}/${exercises.length}`}</span>
          </div>
          <div className="w-full bg-[#E5E5E5] h-3.5 rounded-full overflow-hidden relative">
            <div 
              className="bg-[#58CC02] h-full rounded-full transition-all duration-500 relative"
              style={{ width: `${Math.max(5, progressPercent)}%` }}
            >
              <div className="absolute top-0.5 right-2 w-2 h-1 bg-white/40 rounded-full" />
            </div>
          </div>
        </div>

        {/* Hearts Indicator */}
        <div className="flex items-center gap-1.5">
          <span className="text-xl">❤️</span>
          <span className="text-base font-extrabold text-[#FF4B4B]">
            {hearts}
          </span>
        </div>

      </div>

      {/* Main Exercise Area */}
      <div className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col justify-center overflow-y-auto">
        
        {/* Header Prompt */}
        <div className="space-y-2 mb-6">
          <h2 className="text-2xl font-extrabold text-slate-800 leading-tight">
            {currentExercise.instruction}
          </h2>
          {currentExercise.khmerInstruction && (
            <p className="text-sm font-khmer text-slate-500">
              {currentExercise.khmerInstruction}
            </p>
          )}
        </div>

        {/* Prompt Speech / Context if present */}
        {(currentExercise.prompt || currentExercise.context) && (
          <div className="p-4 bg-[#F7F7F7] rounded-2xl border-2 border-[#E5E5E5] mb-6 space-y-3">
            {currentExercise.context && (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => soundManager.speak(currentExercise.context || '')}
                  className="w-9 h-9 rounded-xl bg-[#1CB0F6] text-white flex items-center justify-center hover:bg-[#1899D6] transition-colors shrink-0 shadow-xs cursor-pointer"
                  title="Listen to context"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <p className="text-sm font-semibold text-slate-700">
                  {currentExercise.context}
                </p>
              </div>
            )}
            {currentExercise.prompt && (
              <div className="flex items-center gap-3">
                {!currentExercise.context && (
                  <button
                    type="button"
                    onClick={() => soundManager.speak(currentExercise.prompt || '')}
                    className="w-10 h-10 rounded-xl bg-[#1CB0F6] text-white flex items-center justify-center hover:bg-[#1899D6] transition-colors shrink-0 shadow-xs cursor-pointer"
                    title="Listen to prompt"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                )}
                <p className="text-base font-bold text-slate-900">
                  {currentExercise.prompt}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Type 1: Multiple Choice Options */}
        {currentExercise.options && currentExercise.options.length > 0 ? (
          <div className="space-y-3">
            {currentExercise.options.map((option, optIdx) => {
              const isSelected = selectedOption === option;
              return (
                <div
                  key={optIdx}
                  role="button"
                  tabIndex={status === 'idle' ? 0 : -1}
                  onClick={() => status === 'idle' && setSelectedOption(option)}
                  onKeyDown={(e) => {
                    if (status === 'idle' && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      setSelectedOption(option);
                    }
                  }}
                  className={`w-full p-4 rounded-2xl border-2 text-left font-bold text-sm sm:text-base flex items-center justify-between transition-all select-none ${
                    status === 'idle' ? 'cursor-pointer' : 'cursor-default opacity-90'
                  } ${
                    isSelected
                      ? 'bg-[#DDF4FF] border-[#1CB0F6] text-[#1899D6] shadow-[0_3px_0_0_#1899D6]'
                      : 'bg-white border-[#E5E5E5] text-slate-700 hover:bg-[#F7F7F7] shadow-[0_2px_0_0_#E5E5E5]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg border border-slate-300 bg-white text-xs font-black text-slate-500 flex items-center justify-center">
                      {optIdx + 1}
                    </span>
                    <span>{option}</span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      soundManager.speak(option);
                    }}
                    className="p-1.5 text-slate-400 hover:text-[#1CB0F6] transition-colors rounded-lg hover:bg-slate-100/60 cursor-pointer"
                    title="Pronounce option"
                    aria-label={`Pronounce ${option}`}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          /* Type 2: Word Tile Sentence Builder */
          <div className="space-y-6">
            {/* Selected Word Sentence Slot */}
            <div className="min-h-[70px] p-3 border-b-2 border-[#E5E5E5] flex flex-wrap gap-2 items-center">
              {selectedWordBank.map((w, idx) => (
                <button
                  key={idx}
                  onClick={() => handleWordTileClick(w, true, idx)}
                  className="px-3.5 py-2 bg-white border-2 border-[#E5E5E5] rounded-xl text-sm font-extrabold text-slate-800 shadow-[0_2px_0_0_#E5E5E5] active:translate-y-0.5 hover:bg-slate-50 transition-all cursor-pointer"
                >
                  {w}
                </button>
              ))}
              {selectedWordBank.length === 0 && (
                <span className="text-xs text-slate-400 italic">
                  Click the words below to build your sentence (ចុចពាក្យខាងក្រោម)
                </span>
              )}
            </div>

            {/* Available Word Tiles */}
            <div className="flex flex-wrap gap-2.5 justify-center py-4">
              {availableWordBank.map((w, idx) => (
                <button
                  key={idx}
                  onClick={() => handleWordTileClick(w, false, idx)}
                  className="px-4 py-2.5 bg-white border-2 border-[#E5E5E5] rounded-xl text-sm font-extrabold text-slate-800 shadow-[0_3px_0_0_#E5E5E5] active:translate-y-0.5 hover:bg-slate-50 transition-all cursor-pointer"
                >
                  {w}
                </button>
              ))}
            </div>

            {/* Fallback Text Input if needed */}
            <div className="pt-2">
              <input
                type="text"
                value={typedAnswer}
                onChange={e => setTypedAnswer(e.target.value)}
                placeholder="Or type sentence directly here..."
                disabled={status !== 'idle'}
                className="w-full px-4 py-3 bg-[#F7F7F7] border-2 border-[#E5E5E5] rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:border-[#1CB0F6] outline-hidden transition-all"
              />
            </div>
          </div>
        )}

      </div>

      {/* Bottom Sheet Feedback & Action Bar (Authentic Duolingo Style) */}
      <div className={`w-full border-t-2 transition-all p-4 sm:p-6 ${
        status === 'correct' 
          ? 'bg-[#D7FFB8] border-[#A5ED6E]' 
          : status === 'incorrect' 
            ? 'bg-[#FFDFE0] border-[#FFB8B8]' 
            : 'bg-white border-[#E5E5E5]'
      }`}>
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Status Message */}
          <div className="flex-1 w-full flex items-center gap-3">
            {status === 'correct' && (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#58CC02] shadow-xs shrink-0">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <div>
                  <h4 className="text-xl font-extrabold text-[#58CC02] leading-tight">
                    Nicely done!
                  </h4>
                  <p className="text-xs font-khmer text-[#46A302]">
                    ចម្លើយត្រឹមត្រូវ! +5 XP
                  </p>
                </div>
              </div>
            )}

            {status === 'incorrect' && (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#FF4B4B] shadow-xs shrink-0">
                  <AlertCircle className="w-6 h-6 stroke-[3]" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-lg font-extrabold text-[#EA2B2B] leading-tight">
                    Correct solution:
                  </h4>
                  <p className="text-sm font-bold text-slate-800">
                    {currentExercise.correctAnswers[0]}
                  </p>
                  <p className="text-xs font-khmer text-slate-600">
                    {currentExercise.khmerExplanation}
                  </p>
                </div>
              </div>
            )}

            {status === 'idle' && (
              <div className="hidden sm:block text-xs font-bold text-slate-400 uppercase tracking-wider">
                Question {currentIdx + 1} of {exercises.length}
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="w-full sm:w-auto shrink-0">
            {status === 'idle' ? (
              <button
                onClick={handleCheckAnswer}
                disabled={isCheckDisabled()}
                className={`w-full sm:w-44 py-3.5 px-6 rounded-2xl text-sm font-black uppercase tracking-wider transition-all text-center cursor-pointer ${
                  isCheckDisabled()
                    ? 'bg-[#E5E5E5] text-[#AFAFAF] cursor-not-allowed border-b-4 border-[#CECECE]'
                    : 'bg-[#58CC02] hover:bg-[#46A302] text-white border-b-4 border-[#58A700] active:translate-y-1 active:border-b-0 shadow-sm'
                }`}
                id="duo-check-answer-btn"
              >
                CHECK
              </button>
            ) : (
              <button
                onClick={handleContinue}
                className={`w-full sm:w-44 py-3.5 px-6 rounded-2xl text-sm font-black uppercase tracking-wider transition-all text-center cursor-pointer text-white border-b-4 active:translate-y-1 active:border-b-0 shadow-sm ${
                  status === 'correct'
                    ? 'bg-[#58CC02] hover:bg-[#46A302] border-[#58A700]'
                    : 'bg-[#FF4B4B] hover:bg-[#E03A3A] border-[#D62828]'
                }`}
                id="duo-continue-btn"
              >
                CONTINUE
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Exit Confirmation Modal */}
      {showExitModal && (
        <div className="fixed inset-0 z-60 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border-2 border-[#E5E5E5] shadow-2xl text-center space-y-4">
            <h3 className="text-xl font-extrabold text-slate-800">
              Quit lesson?
            </h3>
            <p className="text-xs text-slate-500 font-medium font-khmer">
              ប្រសិនបើអ្នកចាកចេញឥឡូវនេះ អ្នកនឹងបាត់បង់ការរីកចម្រើនក្នុងមេរៀននេះ។
            </p>
            <div className="space-y-2 pt-2">
              <button
                onClick={() => setShowExitModal(false)}
                className="w-full py-3 bg-[#1899D6] text-white font-extrabold rounded-2xl border-b-4 border-[#0F75A8] active:translate-y-0.5 cursor-pointer"
              >
                KEEP LEARNING (បន្តរៀន)
              </button>
              <button
                onClick={onClose}
                className="w-full py-2.5 text-slate-400 font-bold hover:text-slate-600 text-xs uppercase tracking-wider cursor-pointer"
              >
                END LESSON (ចាកចេញ)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
