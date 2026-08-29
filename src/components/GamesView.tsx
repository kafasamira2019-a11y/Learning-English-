import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Trophy, 
  Flame, 
  Heart, 
  Clock, 
  RotateCcw, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  XCircle, 
  Award, 
  Zap, 
  BookOpen, 
  PenTool, 
  BookMarked, 
  Lightbulb, 
  Layers, 
  ChevronRight, 
  Play, 
  ArrowRight,
  Shield,
  Star,
  RefreshCw,
  Gift,
  Loader2
} from 'lucide-react';
import { 
  ALL_GAME_QUESTIONS, 
  getWeeklyGamePackage, 
  shuffleArray,
  GameCategory, 
  GameQuestion, 
  DayMission 
} from '../utils/gameData';
import { LevelType } from '../types';
import { soundManager } from '../utils/sound';
import { userStore } from '../utils/userStore';

interface GamesViewProps {
  userXp?: number;
  userGems?: number;
  onEarnRewards?: (xp: number, gems: number) => void;
  onGoToGrammar?: () => void;
  onGoToWriting?: () => void;
  onGoToReading?: () => void;
  onGoToVocabulary?: () => void;
}

type GameState = 'lobby' | 'playing' | 'feedback' | 'gameover' | 'victory';

const STORAGE_KEY_7DAY_PROGRESS = 'kafa_7day_game_missions';
const STORAGE_KEY_GAME_HIGHSCORE = 'kafa_game_high_score';

export const GamesView: React.FC<GamesViewProps> = ({
  onEarnRewards,
  onGoToGrammar,
  onGoToWriting,
  onGoToReading,
  onGoToVocabulary
}) => {
  const [now, setNow] = useState<Date>(new Date());
  const [selectedCategory, setSelectedCategory] = useState<GameCategory>('all-round');
  const [selectedLevel, setSelectedLevel] = useState<LevelType>('all');
  const [gameState, setGameState] = useState<GameState>('lobby');
  
  // Game session states
  const [gameQuestions, setGameQuestions] = useState<GameQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [maxCombo, setMaxCombo] = useState<number>(0);
  const [hearts, setHearts] = useState<number>(3);
  const [questionTimer, setQuestionTimer] = useState<number>(30);
  const [isTimerPaused, setIsTimerPaused] = useState<boolean>(false);
  const [scrambledSelectedWords, setScrambledSelectedWords] = useState<string[]>([]);
  
  // Image Description State
  const [userWrittenText, setUserWrittenText] = useState<string>('');
  const [isEvaluatingWriting, setIsEvaluatingWriting] = useState<boolean>(false);
  const [aiEvaluationResult, setAiEvaluationResult] = useState<{score: number, feedbackKh: string, correctedText: string} | null>(null);
  
  // Active 7-Day mission status
  const [completedDays, setCompletedDays] = useState<{ [dayNumber: number]: boolean }>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_7DAY_PROGRESS);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed && typeof parsed === 'object' ? parsed : {};
      }
      return {};
    } catch {
      return {};
    }
  });

  const [highScore, setHighScore] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_GAME_HIGHSCORE);
      return saved ? parseInt(saved, 10) : 1250;
    } catch {
      return 1250;
    }
  });

  const [activeTab, setActiveTab] = useState<'arena' | 'missions' | 'leaderboard'>('arena');

  // Real-time weekly package calculation
  const weeklyPackage = useMemo(() => {
    return getWeeklyGamePackage(now);
  }, [now]);

  // Live timer interval to update 7-day countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // In-game question countdown timer
  useEffect(() => {
    if (gameState !== 'playing' || isTimerPaused) return;

    if (questionTimer <= 0) {
      handleTimeOut();
      return;
    }

    const timer = setInterval(() => {
      setQuestionTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, questionTimer, isTimerPaused]);

  // Filter questions based on category and level
  const filteredQuestions = useMemo(() => {
    let pool = [...weeklyPackage.weeklyQuestions];
    
    if (selectedCategory !== 'all-round') {
      pool = pool.filter(q => q.category === selectedCategory);
    }
    
    if (selectedLevel !== 'all') {
      pool = pool.filter(q => q.level === selectedLevel);
    }
    
    return pool;
  }, [weeklyPackage.weeklyQuestions, selectedCategory, selectedLevel]);

  // Start a new game session
  const startGame = useCallback((category = selectedCategory, level = selectedLevel) => {
    let pool = [...weeklyPackage.weeklyQuestions];
    if (category !== 'all-round') {
      pool = pool.filter(q => q.category === category);
    }
    if (level !== 'all') {
      pool = pool.filter(q => q.level === level);
    }

    // If pool is small, supplement with ALL_GAME_QUESTIONS
    if (pool.length < 5) {
      pool = ALL_GAME_QUESTIONS.filter(q => 
        (category === 'all-round' || q.category === category) &&
        (level === 'all' || q.level === level)
      );
    }

    // Shuffle questions and randomize their options so the correct answer is uniformly distributed across A, B, C, D
    const shuffledPool = shuffleArray(pool).slice(0, 6);
    const session = shuffledPool.map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }));
    setGameQuestions(session);
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setHearts(3);
    setQuestionTimer(session[0]?.format === 'image-description' ? 300 : 30);
    setIsTimerPaused(false);
    setScrambledSelectedWords([]);
    setUserWrittenText('');
    setAiEvaluationResult(null);
    setGameState('playing');
  }, [weeklyPackage.weeklyQuestions, selectedCategory, selectedLevel]);

  const currentQ = gameQuestions[currentQuestionIndex];

  // Handle timeout on a question
  const handleTimeOut = () => {
    setIsTimerPaused(true);
    setIsAnswerSubmitted(true);
    setIsCorrect(false);
    setCombo(0);
    setHearts(prev => {
      const newHearts = Math.max(0, prev - 1);
      if (newHearts <= 0) {
        soundManager.playIncorrect();
        setGameState('gameover');
      } else {
        soundManager.playIncorrect();
      }
      return newHearts;
    });
  };

  // Select an option without immediate grading
  const handleSelectOption = (optionId: string) => {
    if (isAnswerSubmitted || gameState !== 'playing') return;
    setSelectedOptionId(optionId);
  };

  // Submit the selected option answer
  const handleSubmitAnswer = async () => {
    if (isAnswerSubmitted || gameState !== 'playing') return;
    
    if (currentQ.format === 'image-description') {
      if (!userWrittenText.trim()) return;
      setIsTimerPaused(true);
      setIsEvaluatingWriting(true);
      try {
        const response = await fetch('/api/evaluate-writing', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageContext: currentQ.promptEn,
            userText: userWrittenText
          })
        });
        if (response.ok) {
          const result = await response.json();
          setAiEvaluationResult(result);
          setIsAnswerSubmitted(true);
          
          const pass = result.score >= 5;
          setIsCorrect(pass);
          
          if (pass) {
             soundManager.playCorrect();
             const comboMultiplier = combo >= 3 ? 1.5 : combo >= 1 ? 1.2 : 1.0;
             const earned = Math.round((currentQ.points * (result.score / 10)) * comboMultiplier);
             setScore(prev => prev + earned);
             setCombo(prev => {
                const next = prev + 1;
                if (next > maxCombo) setMaxCombo(next);
                return next;
             });
          } else {
             soundManager.playIncorrect();
             setCombo(0);
             setHearts(prev => {
               const remaining = prev - 1;
               if (remaining <= 0) {
                 setTimeout(() => setGameState('gameover'), 1200);
               }
               return Math.max(0, remaining);
             });
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsEvaluatingWriting(false);
      }
      return;
    }

    if (!selectedOptionId) return;
    
    setIsTimerPaused(true);
    setIsAnswerSubmitted(true);

    const selected = currentQ.options.find(o => o.id === selectedOptionId);
    const correct = !!selected?.isCorrect;
    setIsCorrect(correct);

    if (correct) {
      soundManager.playCorrect();
      const comboMultiplier = combo >= 3 ? 1.5 : combo >= 1 ? 1.2 : 1.0;
      const speedBonus = Math.floor(questionTimer * 3);
      const earned = Math.round((currentQ.points + speedBonus) * comboMultiplier);
      
      setScore(prev => prev + earned);
      setCombo(prev => {
        const next = prev + 1;
        if (next > maxCombo) setMaxCombo(next);
        return next;
      });
    } else {
      soundManager.playIncorrect();
      setCombo(0);
      setHearts(prev => {
        const remaining = prev - 1;
        if (remaining <= 0) {
          setTimeout(() => setGameState('gameover'), 1200);
        }
        return Math.max(0, remaining);
      });
    }
  };

  // Proceed to next question or victory
  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < gameQuestions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerSubmitted(false);
      setIsCorrect(false);
      setQuestionTimer(gameQuestions[currentQuestionIndex + 1]?.format === 'image-description' ? 300 : 30);
      setIsTimerPaused(false);
      setScrambledSelectedWords([]);
      setUserWrittenText('');
      setAiEvaluationResult(null);
    } else {
      // Victory
      soundManager.playComplete();
      setGameState('victory');
      
      // Update high score
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem(STORAGE_KEY_GAME_HIGHSCORE, score.toString());
      }

      // Mark current day mission as complete
      const currentDay = weeklyPackage.dayInCycle;
      const updatedDays = { ...completedDays, [currentDay]: true };
      setCompletedDays(updatedDays);
      localStorage.setItem(STORAGE_KEY_7DAY_PROGRESS, JSON.stringify(updatedDays));

      // Award XP and Gems to user
      const mission = weeklyPackage.currentDayMission;
      const totalEarnedXp = mission.rewardXp + Math.floor(score / 10);
      const totalEarnedGems = mission.rewardGems + 10;
      
      userStore.recordGameCompletion(
        `7-Day Arena - ${weeklyPackage.currentDayNameKh}`,
        selectedCategory === 'all' ? 'គ្រប់វិញ្ញាសា (All)' : selectedCategory,
        score,
        maxCombo,
        totalEarnedXp,
        totalEarnedGems,
        currentDay
      );

      if (onEarnRewards) {
        onEarnRewards(totalEarnedXp, totalEarnedGems);
      }
    }
  };

  // Read prompt or context with TTS
  const handleSpeak = (text: string) => {
    soundManager.speak(text);
  };

  return (
    <div className="w-full min-h-screen bg-[#F7F9FC] text-slate-800 pb-16 font-sans select-none">
      
      {/* 1. TOP 7-DAY AUTO-UPDATE HERO BANNER */}
      <div className="bg-linear-to-r from-[#1899D6] via-[#1CB0F6] to-[#58CC02] text-white py-6 px-4 sm:px-6 lg:px-8 border-b border-sky-200/50 shadow-md">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner border border-white/30 shrink-0">
              🎮
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-white/25 text-white text-[11px] font-black uppercase tracking-wider">
                  7-DAY AUTO REFRESH
                </span>
                <span className="text-xs font-bold text-sky-100 font-khmer">
                  {weeklyPackage.seasonNameKh}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-sans mt-0.5">
                KAFA 7-Day All-Level Game Arena
              </h1>
              <p className="text-xs sm:text-sm text-sky-50 font-khmer mt-0.5">
                ល្បែងសិក្សា ៤ មុខវិជ្ជា៖ វេយ្យាករណ៍ &bull; តែងនិពន្ធ &bull; អានយល់ន័យ &bull; វាក្យសព្ទ (បង្វិលស្វ័យប្រវត្តរៀងរាល់ ៧ ថ្ងៃ)
              </p>
            </div>
          </div>

          {/* 7-Day Countdown Widget */}
          <div className="bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl p-3 sm:px-4 flex items-center gap-3 shrink-0 shadow-xs">
            <Clock className="w-5 h-5 text-yellow-300 animate-pulse shrink-0" />
            <div className="text-right">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-sky-100 font-khmer">
                បង្វិលមេរៀនថ្មីក្នុងពេល
              </div>
              <div className="text-sm sm:text-base font-black font-mono tracking-tight text-white flex items-center gap-1">
                <span>{weeklyPackage.daysRemaining}d</span> :
                <span>{String(weeklyPackage.hoursRemaining).padStart(2, '0')}h</span> :
                <span>{String(weeklyPackage.minutesRemaining).padStart(2, '0')}m</span> :
                <span className="text-yellow-300">{String(weeklyPackage.secondsRemaining).padStart(2, '0')}s</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">

        {/* 2. SUB-NAVIGATION TABS */}
        <div className="flex items-center justify-between border-b-2 border-slate-200 mb-6 gap-2 overflow-x-auto pb-1 no-scrollbar">
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setActiveTab('arena'); setGameState('lobby'); }}
              className={`px-4 py-2.5 rounded-t-xl font-black text-sm uppercase tracking-wider flex items-center gap-2 transition-colors border-b-2 -mb-[2px] ${
                activeTab === 'arena' 
                  ? 'border-[#1CB0F6] text-[#1CB0F6] bg-white' 
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
              id="game-tab-arena"
            >
              <Zap className="w-4 h-4" />
              <span>Game Arena (សង្វៀនល្បែង)</span>
            </button>
            <button
              onClick={() => { setActiveTab('missions'); setGameState('lobby'); }}
              className={`px-4 py-2.5 rounded-t-xl font-black text-sm uppercase tracking-wider flex items-center gap-2 transition-colors border-b-2 -mb-[2px] ${
                activeTab === 'missions' 
                  ? 'border-[#58CC02] text-[#58CC02] bg-white' 
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
              id="game-tab-missions"
            >
              <Award className="w-4 h-4" />
              <span>7-Day Quest Roadmap (បេសកកម្ម ៧ ថ្ងៃ)</span>
            </button>
            <button
              onClick={() => { setActiveTab('leaderboard'); setGameState('lobby'); }}
              className={`px-4 py-2.5 rounded-t-xl font-black text-sm uppercase tracking-wider flex items-center gap-2 transition-colors border-b-2 -mb-[2px] ${
                activeTab === 'leaderboard' 
                  ? 'border-[#FF9600] text-[#FF9600] bg-white' 
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
              id="game-tab-leaderboard"
            >
              <Trophy className="w-4 h-4" />
              <span>Tournament League (តារាងពិន្ទុ)</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs font-black">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>High Score: {highScore}</span>
            </div>
          </div>
        </div>

        {/* 3. ARENA VIEW: LOBBY & GAMEPLAY */}
        {activeTab === 'arena' && (
          <div>
            {gameState === 'lobby' && (
              <div className="space-y-6">
                
                {/* 7-Day Spotlight Card */}
                <div className="bg-linear-to-r from-emerald-50 via-teal-50 to-sky-50 border-2 border-emerald-200 rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-3xl shadow-md border-2 border-emerald-400 shrink-0">
                      {weeklyPackage.currentDayMission.badgeEmoji}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider">
                          TODAY'S 7-DAY MISSION &bull; DAY {weeklyPackage.dayInCycle} OF 7
                        </span>
                        {completedDays[weeklyPackage.dayInCycle] && (
                          <span className="px-2 py-0.5 rounded-md bg-green-100 text-green-700 border border-green-300 text-[10px] font-black flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> រួចរាល់
                          </span>
                        )}
                      </div>
                      <h2 className="text-xl font-black text-slate-800 mt-1 font-sans">
                        {weeklyPackage.currentDayMission.titleEn}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 font-khmer mt-0.5">
                        {weeklyPackage.currentDayMission.titleKh} &mdash; {weeklyPackage.currentDayMission.descriptionKh}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs font-black text-slate-600">
                        <span className="flex items-center gap-1 text-emerald-600">
                          <Zap className="w-3.5 h-3.5" /> +{weeklyPackage.currentDayMission.rewardXp} XP
                        </span>
                        <span className="flex items-center gap-1 text-sky-600">
                          <Gift className="w-3.5 h-3.5" /> +{weeklyPackage.currentDayMission.rewardGems} Gems
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => startGame(weeklyPackage.currentDayMission.focusCategory, 'all')}
                    className="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-[#58CC02] hover:bg-[#46A302] active:translate-y-0.5 text-white font-black text-sm uppercase tracking-wider shadow-[0_4px_0_0_#58A700] flex items-center justify-center gap-2 cursor-pointer transition-transform"
                    id="start-today-mission-btn"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>លេងបេសកកម្មថ្ងៃនេះ (Day {weeklyPackage.dayInCycle})</span>
                  </button>
                </div>

                {/* Subject Category Selectors (Grammar, Writing, Reading, Vocabulary, 4-in-1) */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#1CB0F6]" />
                      <span>ជ្រើសរើសផ្នែកល្បែងសិក្សា (Select Subject)</span>
                    </h3>
                    <span className="text-xs text-slate-500 font-khmer">
                      សំណួរត្រូវបានបង្វិលថ្មីរៀងរាល់ ៧ ថ្ងៃ
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                    
                    {/* 1. All-Round 4-in-1 */}
                    <div 
                      onClick={() => setSelectedCategory('all-round')}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        selectedCategory === 'all-round'
                          ? 'border-[#FF9600] bg-amber-50/70 shadow-[0_4px_0_0_#E08500]'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                      id="select-cat-all-round"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">🏆</span>
                        <span className="px-2 py-0.5 rounded-md bg-amber-200 text-amber-900 text-[10px] font-black uppercase">
                          4-in-1 COMBO
                        </span>
                      </div>
                      <div>
                        <h4 className="font-black text-sm text-slate-800 uppercase">Grand 4-in-1</h4>
                        <p className="text-xs text-slate-600 font-khmer mt-0.5">ប្រកួតចម្រុះ ៤ មុខវិជ្ជា</p>
                      </div>
                    </div>

                    {/* 2. Grammar Hero */}
                    <div 
                      onClick={() => setSelectedCategory('grammar')}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        selectedCategory === 'grammar'
                          ? 'border-[#58CC02] bg-green-50/70 shadow-[0_4px_0_0_#58A700]'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                      id="select-cat-grammar"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">📚</span>
                        <span className="px-2 py-0.5 rounded-md bg-green-200 text-green-900 text-[10px] font-black uppercase">
                          GRAMMAR
                        </span>
                      </div>
                      <div>
                        <h4 className="font-black text-sm text-slate-800 uppercase">Grammar Hero</h4>
                        <p className="text-xs text-slate-600 font-khmer mt-0.5">វេយ្យាករណ៍ & កាល</p>
                      </div>
                    </div>

                    {/* 3. Writing Master */}
                    <div 
                      onClick={() => setSelectedCategory('writing')}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        selectedCategory === 'writing'
                          ? 'border-[#CE82FF] bg-purple-50/70 shadow-[0_4px_0_0_#A855F7]'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                      id="select-cat-writing"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">📝</span>
                        <span className="px-2 py-0.5 rounded-md bg-purple-200 text-purple-900 text-[10px] font-black uppercase">
                          WRITING
                        </span>
                      </div>
                      <div>
                        <h4 className="font-black text-sm text-slate-800 uppercase">Writing Builder</h4>
                        <p className="text-xs text-slate-600 font-khmer mt-0.5">តែងនិពន្ធ & រៀបប្រយោគ</p>
                      </div>
                    </div>

                    {/* 4. Reading Sprint */}
                    <div 
                      onClick={() => setSelectedCategory('reading')}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        selectedCategory === 'reading'
                          ? 'border-[#00CD9C] bg-emerald-50/70 shadow-[0_4px_0_0_#059669]'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                      id="select-cat-reading"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">📖</span>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-200 text-emerald-900 text-[10px] font-black uppercase">
                          READING
                        </span>
                      </div>
                      <div>
                        <h4 className="font-black text-sm text-slate-800 uppercase">Reading Sprint</h4>
                        <p className="text-xs text-slate-600 font-khmer mt-0.5">អានយល់ន័យរហ័ស</p>
                      </div>
                    </div>

                    {/* 5. Vocabulary Blitz */}
                    <div 
                      onClick={() => setSelectedCategory('vocabulary')}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        selectedCategory === 'vocabulary'
                          ? 'border-[#1CB0F6] bg-sky-50/70 shadow-[0_4px_0_0_#1899D6]'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                      id="select-cat-vocabulary"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">💡</span>
                        <span className="px-2 py-0.5 rounded-md bg-sky-200 text-sky-900 text-[10px] font-black uppercase">
                          VOCABULARY
                        </span>
                      </div>
                      <div>
                        <h4 className="font-black text-sm text-slate-800 uppercase">Vocab Blitz</h4>
                        <p className="text-xs text-slate-600 font-khmer mt-0.5">វាក្យសព្ទ & សុភាសិត</p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Level Selection Pills (Applied to ALL Levels) */}
                <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-xs">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                        <Shield className="w-4 h-4 text-emerald-500" />
                        <span>កម្រិតសមត្ថភាព (Applied to All Levels)</span>
                      </h3>
                      <p className="text-xs text-slate-500 font-khmer mt-0.5">
                        ជ្រើសរើសកម្រិតដែលលោកអ្នកចង់ប្រកួតប្រជែង ឬលេងចម្រុះគ្រប់កម្រិត
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap">
                      <button
                        onClick={() => setSelectedLevel('all')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                          selectedLevel === 'all'
                            ? 'bg-slate-800 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        ⚡ គ្រប់កម្រិត (All Levels)
                      </button>
                      <button
                        onClick={() => setSelectedLevel('elementary')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                          selectedLevel === 'elementary'
                            ? 'bg-[#58CC02] text-white shadow-xs'
                            : 'bg-green-50 text-green-700 hover:bg-green-100'
                        }`}
                      >
                        🟢 A1-A2 Elementary
                      </button>
                      <button
                        onClick={() => setSelectedLevel('intermediate')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                          selectedLevel === 'intermediate'
                            ? 'bg-[#1CB0F6] text-white shadow-xs'
                            : 'bg-sky-50 text-sky-700 hover:bg-sky-100'
                        }`}
                      >
                        🔵 B1-B2 Intermediate
                      </button>
                      <button
                        onClick={() => setSelectedLevel('advanced')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                          selectedLevel === 'advanced'
                            ? 'bg-[#CE82FF] text-white shadow-xs'
                            : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                        }`}
                      >
                        🟣 C1-C2 Advanced
                      </button>
                    </div>
                  </div>

                  {/* Ready Action Section */}
                  <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-slate-100 gap-4">
                    <div className="flex items-center gap-3 text-xs text-slate-600 font-khmer">
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4 text-red-500 fill-red-500" /> ៣ បេះដូងក្នុងមួយជុំ
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-amber-500" /> ៣០ វិនាទីក្នុងមួយសំណួរ
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-4 h-4 text-orange-500" /> Combo Multipliers
                      </span>
                    </div>

                    <button
                      onClick={() => startGame()}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#1CB0F6] hover:bg-[#1899D6] active:translate-y-0.5 text-white font-black text-sm uppercase tracking-wider shadow-[0_4px_0_0_#1482B8] flex items-center justify-center gap-2 cursor-pointer transition-transform"
                      id="start-custom-game-btn"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>ចាប់ផ្តើមលេងឥឡូវនេះ (Start Game)</span>
                    </button>
                  </div>

                </div>

              </div>
            )}

            {/* 4. ACTIVE GAMEPLAY SCREEN */}
            {gameState === 'playing' && currentQ && (
              <div className="max-w-3xl mx-auto space-y-4">
                
                {/* HUD Header: Hearts, Progress, Timer, Combo */}
                <div className="bg-white rounded-2xl p-4 border-2 border-slate-200 shadow-xs flex items-center justify-between gap-4">
                  
                  {/* Hearts */}
                  <div className="flex items-center gap-1">
                    {[1, 2, 3].map((heartIndex) => (
                      <Heart 
                        key={heartIndex} 
                        className={`w-6 h-6 transition-all ${
                          heartIndex <= hearts 
                            ? 'text-red-500 fill-red-500 animate-pulse' 
                            : 'text-slate-300'
                        }`} 
                      />
                    ))}
                  </div>

                  {/* Progress Bar */}
                  <div className="flex-1 max-w-xs">
                    <div className="flex items-center justify-between text-[11px] font-black text-slate-500 mb-1">
                      <span>សំណួរ {currentQuestionIndex + 1} / {gameQuestions.length}</span>
                      <span className="uppercase text-[#1CB0F6]">{currentQ.category}</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                      <div 
                        className="h-full bg-[#58CC02] transition-all duration-300 rounded-full"
                        style={{ width: `${((currentQuestionIndex + 1) / gameQuestions.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Combo & Timer */}
                  <div className="flex items-center gap-3">
                    {combo > 1 && (
                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-orange-100 text-orange-700 font-black text-xs border border-orange-200 animate-bounce">
                        <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
                        <span>{combo}x Combo!</span>
                      </div>
                    )}

                    <div className={`flex items-center gap-1 px-3 py-1 rounded-xl font-mono font-black text-xs border ${
                      questionTimer <= 5 
                        ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' 
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                      <Clock className="w-3.5 h-3.5" />
                      <span>{questionTimer}s</span>
                    </div>
                  </div>

                </div>

                {/* Question Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm space-y-6">
                  
                  {/* Category & Level Badges */}
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-sky-100 text-sky-800 text-xs font-black uppercase tracking-wider">
                        {currentQ.titleEn}
                      </span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${
                        currentQ.level === 'elementary' ? 'bg-green-100 text-green-800' :
                        currentQ.level === 'intermediate' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {currentQ.level}
                      </span>
                    </div>

                    <button
                      onClick={() => handleSpeak(currentQ.contextPassageEn || currentQ.promptEn)}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                      title="Listen Audio"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Context Passage (if reading or academic paragraph) */}
                  {currentQ.contextPassageEn && (
                    <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                      <p className="text-sm font-medium text-slate-800 leading-relaxed italic">
                        "{currentQ.contextPassageEn}"
                      </p>
                      {currentQ.contextPassageKh && (
                        <p className="text-xs text-amber-900/80 font-khmer border-t border-amber-200/60 pt-2 leading-relaxed">
                          {currentQ.contextPassageKh}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Error Hunt Display (if error-hunt format) */}
                  {currentQ.errorSentence && (
                    <div className="p-4 rounded-2xl bg-red-50 border border-red-200">
                      <div className="text-xs font-black text-red-600 uppercase mb-1">Sentence with mistake:</div>
                      <p className="text-base font-bold text-red-900 font-mono">
                        "{currentQ.errorSentence}"
                      </p>
                    </div>
                  )}

                  {/* Prompt Text */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-800 leading-snug">
                      {currentQ.promptEn}
                    </h3>
                    <p className="text-sm text-slate-600 font-khmer mt-1">
                      {currentQ.promptKh}
                    </p>
                  </div>

                  {/* Options Grid or Image Description */}
                  {currentQ.format === 'image-description' ? (
                    <div className="space-y-4">
                      {currentQ.imageUrl && (
                        <div className="rounded-2xl overflow-hidden border-2 border-slate-200">
                          <img 
                            src={currentQ.imageUrl} 
                            alt="Description Challenge" 
                            className="w-full max-h-64 object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}
                      <textarea
                        value={userWrittenText}
                        onChange={(e) => setUserWrittenText(e.target.value)}
                        disabled={isAnswerSubmitted || isEvaluatingWriting}
                        placeholder="Type your description here in English... (វាយបញ្ចូលការពិពណ៌នារបស់អ្នកនៅទីនេះជាភាសាអង់គ្លេស...)"
                        className="w-full h-32 p-4 rounded-xl border-2 border-slate-200 focus:border-[#1CB0F6] focus:ring-4 focus:ring-[#1CB0F6]/20 transition-all resize-none text-slate-700 bg-white"
                      />
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-3">
                      {currentQ.options.map((option, idx) => {
                        const isSelected = selectedOptionId === option.id;
                        let optionStyle = "border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-800";

                        if (isAnswerSubmitted) {
                          if (option.isCorrect) {
                            optionStyle = "border-green-500 bg-green-50 text-green-900 font-bold shadow-[0_2px_0_0_#22C55E]";
                          } else if (isSelected && !option.isCorrect) {
                            optionStyle = "border-red-500 bg-red-50 text-red-900 font-bold shadow-[0_2px_0_0_#EF4444]";
                          } else {
                            optionStyle = "border-slate-200 bg-slate-50 text-slate-400 opacity-60";
                          }
                        } else if (isSelected) {
                          optionStyle = "border-[#1CB0F6] bg-[#DDF4FF] text-[#1CB0F6] font-bold";
                        }

                        return (
                          <button
                            key={option.id}
                            disabled={isAnswerSubmitted}
                            onClick={() => handleSelectOption(option.id)}
                            className={`w-full p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${optionStyle}`}
                            id={`game-option-${idx}`}
                          >
                            <div className="flex items-center gap-3">
                              <span className={`w-7 h-7 rounded-xl border flex items-center justify-center text-xs font-black shrink-0 ${
                                isSelected ? 'bg-[#1CB0F6] text-white border-[#1899D6]' : 'bg-slate-100 text-slate-600 border-slate-200'
                              }`}>
                                {String.fromCharCode(65 + idx)}
                              </span>
                              <span className="text-sm sm:text-base font-semibold leading-snug">
                                {option.text}
                              </span>
                            </div>

                            {isAnswerSubmitted && option.isCorrect && (
                              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                            )}
                            {isAnswerSubmitted && isSelected && !option.isCorrect && (
                              <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* AI Feedback for Image Description */}
                  {isAnswerSubmitted && currentQ.format === 'image-description' && aiEvaluationResult && (
                    <div className={`p-5 rounded-2xl border-2 space-y-3 animate-fadeIn ${
                      aiEvaluationResult.score >= 5 ? 'bg-green-50/80 border-green-300' : 'bg-red-50/80 border-red-300'
                    }`}>
                      <div className="flex items-center justify-between border-b border-black/5 pb-3">
                        <span className={`text-base font-black flex items-center gap-2 ${
                          aiEvaluationResult.score >= 5 ? 'text-green-700' : 'text-red-700'
                        }`}>
                          {aiEvaluationResult.score >= 5 ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                          Score: {aiEvaluationResult.score}/10
                        </span>
                      </div>

                      <div className="space-y-4 pt-1">
                        <div>
                          <div className="text-xs font-black uppercase text-slate-500 mb-1">AI Feedback (មតិយោបល់)</div>
                          <p className="text-sm text-slate-700 font-khmer leading-relaxed">
                            {aiEvaluationResult.feedbackKh}
                          </p>
                        </div>
                        
                        {aiEvaluationResult.correctedText && (
                          <div className="bg-white p-3 rounded-xl border border-slate-200">
                            <div className="text-xs font-black uppercase text-slate-500 mb-1">Corrected Text (អត្ថបទដែលកែរួច)</div>
                            <p className="text-sm text-slate-800 font-medium leading-relaxed">
                              {aiEvaluationResult.correctedText}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Feedback Explanation (When submitted, non image-description) */}
                  {isAnswerSubmitted && currentQ.format !== 'image-description' && (
                    <div className={`p-4 rounded-2xl border-2 space-y-2 animate-fadeIn ${
                      isCorrect ? 'bg-green-50/80 border-green-300' : 'bg-red-50/80 border-red-300'
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-black flex items-center gap-1.5 ${
                          isCorrect ? 'text-green-700' : 'text-red-700'
                        }`}>
                          {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                          {isCorrect ? 'ត្រឹមត្រូវ! (Correct + Points Awarded)' : 'មិនទាន់ត្រឹមត្រូវទេ! (Incorrect)'}
                        </span>
                        <button
                          onClick={() => handleSpeak(currentQ.explanationEn)}
                          className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1 font-bold cursor-pointer"
                        >
                          <Volume2 className="w-3.5 h-3.5" /> Listen Explanation
                        </button>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-700 font-medium">
                        {currentQ.explanationEn}
                      </p>
                      <p className="text-xs text-slate-600 font-khmer border-t border-slate-200/60 pt-1.5 leading-relaxed">
                        💡 <strong>ពន្យល់៖</strong> {currentQ.explanationKh}
                      </p>
                    </div>
                  )}

                  {/* Bottom Action Bar: Submit or Next */}
                  <div className="pt-2 flex justify-end">
                    {!isAnswerSubmitted ? (
                      <button
                        onClick={handleSubmitAnswer}
                        disabled={currentQ.format === 'image-description' ? !userWrittenText.trim() || isEvaluatingWriting : !selectedOptionId}
                        className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                          (currentQ.format === 'image-description' ? userWrittenText.trim() && !isEvaluatingWriting : selectedOptionId)
                            ? 'bg-[#58CC02] hover:bg-[#46A302] text-white shadow-[0_4px_0_0_#58A700] active:translate-y-0.5 cursor-pointer'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                        id="game-submit-btn"
                      >
                        {isEvaluatingWriting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>កំពុងវាយតម្លៃ... (Evaluating...)</span>
                          </>
                        ) : (
                          <>
                            <span>ដាក់បញ្ជូន (Submit / ដាក់បញ្ជូន)</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        onClick={handleNextQuestion}
                        className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#1CB0F6] hover:bg-[#1899D6] active:translate-y-0.5 text-white font-black text-sm uppercase tracking-wider shadow-[0_4px_0_0_#1482B8] flex items-center justify-center gap-2 cursor-pointer transition-transform"
                        id="game-next-btn"
                      >
                        <span>{currentQuestionIndex + 1 === gameQuestions.length ? 'បញ្ចប់ការប្រកួត (Finish Game)' : 'សំណួរបន្ទាប់ (Next) →'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                </div>

              </div>
            )}

            {/* 5. VICTORY SCREEN */}
            {gameState === 'victory' && (
              <div className="max-w-md mx-auto bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-lg text-center space-y-6 animate-scaleUp">
                <div className="w-20 h-20 rounded-3xl bg-yellow-100 border-2 border-yellow-300 flex items-center justify-center text-4xl mx-auto shadow-inner animate-bounce">
                  🏆
                </div>

                <div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider">
                    7-DAY STAGE CLEARED!
                  </span>
                  <h2 className="text-2xl font-black text-slate-800 mt-2 font-sans">
                    ជ័យជម្នះអស្ចារ្យ! (Victory!)
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 font-khmer mt-1">
                    អ្នកបានបញ្ចប់ជោគជ័យនូវការប្រកួតប្រចាំថ្ងៃ {weeklyPackage.dayInCycle} នៃវដ្ត ៧ ថ្ងៃ!
                  </p>
                </div>

                {/* Score Stats Card */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-[10px] font-extrabold uppercase text-slate-400">Total Score</div>
                    <div className="text-lg font-black text-slate-800 font-mono">{score}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-extrabold uppercase text-slate-400">Max Combo</div>
                    <div className="text-lg font-black text-orange-500 font-mono">{maxCombo}x 🔥</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-extrabold uppercase text-slate-400">XP Earned</div>
                    <div className="text-lg font-black text-emerald-600 font-mono">+{weeklyPackage.currentDayMission.rewardXp + 30}</div>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5">
                  <button
                    onClick={() => startGame()}
                    className="w-full py-3.5 rounded-2xl bg-[#58CC02] hover:bg-[#46A302] active:translate-y-0.5 text-white font-black text-sm uppercase tracking-wider shadow-[0_4px_0_0_#58A700] flex items-center justify-center gap-2 cursor-pointer transition-transform"
                    id="play-again-btn"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>លេងម្តងទៀត (Play Again)</span>
                  </button>
                  <button
                    onClick={() => setGameState('lobby')}
                    className="w-full py-3 rounded-2xl border-2 border-slate-200 hover:bg-slate-50 text-slate-700 font-black text-sm uppercase tracking-wider cursor-pointer"
                  >
                    ត្រឡប់ទៅសង្វៀនដើម (Back to Arena)
                  </button>
                </div>
              </div>
            )}

            {/* 6. GAME OVER SCREEN */}
            {gameState === 'gameover' && (
              <div className="max-w-md mx-auto bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-lg text-center space-y-6">
                <div className="w-20 h-20 rounded-3xl bg-red-100 border-2 border-red-300 flex items-center justify-center text-4xl mx-auto shadow-inner">
                  💔
                </div>

                <div>
                  <h2 className="text-2xl font-black text-slate-800 font-sans">
                    អស់បេះដូងហើយ! (Out of Hearts)
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 font-khmer mt-1">
                    កុំបាក់ទឹកចិត្ត! រៀនបន្ថែមពីកំហុស រួចចាប់ផ្តើមសាកល្បងម្តងទៀត។
                  </p>
                </div>

                <div className="flex flex-col gap-2.5">
                  <button
                    onClick={() => startGame()}
                    className="w-full py-3.5 rounded-2xl bg-[#1CB0F6] hover:bg-[#1899D6] active:translate-y-0.5 text-white font-black text-sm uppercase tracking-wider shadow-[0_4px_0_0_#1482B8] flex items-center justify-center gap-2 cursor-pointer transition-transform"
                    id="try-again-btn"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>ព្យាយាមម្តងទៀត (Try Again)</span>
                  </button>
                  <button
                    onClick={() => setGameState('lobby')}
                    className="w-full py-3 rounded-2xl border-2 border-slate-200 hover:bg-slate-50 text-slate-700 font-black text-sm uppercase tracking-wider cursor-pointer"
                  >
                    ត្រឡប់ទៅសង្វៀនដើម (Lobby)
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* 4. 7-DAY MISSIONS ROADMAP TAB */}
        {activeTab === 'missions' && (
          <div className="space-y-6">
            
            {/* Header info */}
            <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xs">
              <div className="flex items-center justify-between flex-wrap gap-3 mb-2">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black uppercase tracking-wider">
                    7-DAY ROTATING CALENDAR
                  </span>
                  <h2 className="text-xl font-black text-slate-800 mt-1 font-sans">
                    ផែនទីបេសកកម្ម ៧ ថ្ងៃ (7-Day Quest Roadmap)
                  </h2>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-500 font-khmer">វដ្តបច្ចុប្បន្ន</div>
                  <div className="text-sm font-black text-emerald-600">
                    ថ្ងៃទី {weeklyPackage.dayInCycle} ក្នុងចំណោម ៧ ថ្ងៃ
                  </div>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-khmer">
                បំពេញបេសកកម្មប្រចាំថ្ងៃនីមួយៗដើម្បីប្រមូល Star Badges, XP, និង Gems។ រាល់ ៧ ថ្ងៃម្តង ផែនទី និងសំណួរនឹងបង្វិលជាស្វ័យប្រវត្តទៅកាន់សប្តាហ៍បន្ទាប់!
              </p>
            </div>

            {/* 7 Days Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {weeklyPackage.dailyMissions.map((mission) => {
                const isCurrent = mission.dayNumber === weeklyPackage.dayInCycle;
                const isDone = !!completedDays[mission.dayNumber];
                const isLocked = mission.dayNumber > weeklyPackage.dayInCycle;

                return (
                  <div
                    key={mission.dayNumber}
                    className={`p-5 rounded-3xl border-2 transition-all flex flex-col justify-between ${
                      isCurrent
                        ? 'border-[#58CC02] bg-green-50/60 shadow-[0_4px_0_0_#58A700]'
                        : isDone
                        ? 'border-emerald-300 bg-emerald-50/40'
                        : isLocked
                        ? 'border-slate-200 bg-slate-50 opacity-80'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-2xl shadow-xs">
                          {mission.badgeEmoji}
                        </div>
                        {isDone ? (
                          <span className="px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-black flex items-center gap-1 border border-green-200">
                            <CheckCircle2 className="w-3.5 h-3.5" /> រួចរាល់
                          </span>
                        ) : isCurrent ? (
                          <span className="px-2.5 py-1 rounded-full bg-[#58CC02] text-white text-xs font-black animate-pulse">
                            🌟 ថ្ងៃនេះ (Active)
                          </span>
                        ) : isLocked ? (
                          <span className="px-2.5 py-1 rounded-full bg-slate-200 text-slate-500 text-xs font-black">
                            🔒 មកដល់ឆាប់ៗ
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-black">
                            ⏳ មិនទាន់បញ្ចប់
                          </span>
                        )}
                      </div>

                      <div className="text-[11px] font-black uppercase text-slate-400">Day {mission.dayNumber} of 7</div>
                      <h3 className="font-black text-base text-slate-800 font-sans mt-0.5">{mission.titleEn}</h3>
                      <p className="text-xs text-slate-600 font-khmer mt-1 leading-relaxed">{mission.titleKh}</p>
                      <p className="text-xs text-slate-500 font-khmer mt-1">{mission.descriptionKh}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                      <div className="text-xs font-black text-emerald-600 flex items-center gap-2">
                        <span>+{mission.rewardXp} XP</span>
                        <span>+{mission.rewardGems} 💎</span>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedCategory(mission.focusCategory);
                          setActiveTab('arena');
                          startGame(mission.focusCategory, 'all');
                        }}
                        className={`px-3.5 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-[#58CC02] text-white shadow-xs hover:bg-[#46A302]'
                            : 'bg-slate-800 text-white hover:bg-slate-700'
                        }`}
                      >
                        {isDone ? 'លេងឡើងវិញ' : 'លេងបេសកកម្ម'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* 5. 7-DAY LEAGUE LEADERBOARD TAB */}
        {activeTab === 'leaderboard' && (
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-black uppercase tracking-wider">
                    WEEKLY TOURNAMENT
                  </span>
                  <h2 className="text-xl font-black text-slate-800 mt-1 font-sans">
                    តារាងពិន្ទុសប្តាហ៍ទី {weeklyPackage.weekNumber}
                  </h2>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500 font-khmer">បញ្ចប់ក្នុងពេល</div>
                  <div className="text-sm font-black text-amber-600 font-mono">
                    {weeklyPackage.daysRemaining} ថ្ងៃ {weeklyPackage.hoursRemaining} ម៉ោង
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 font-khmer">
                លេងហ្គេម និងប្រមូលពិន្ទុជារៀងរាល់ថ្ងៃដើម្បីឈ្នះពានរង្វាន់ League Champion ប្រចាំសប្តាហ៍!
              </p>
            </div>

            <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-xs overflow-hidden divide-y divide-slate-100">
              {weeklyPackage.leaderboardSeed.map((player) => (
                <div
                  key={player.rank}
                  className={`p-4 flex items-center justify-between gap-3 transition-colors ${
                    player.isUser ? 'bg-amber-50/80 font-bold' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black ${
                      player.rank === 1 ? 'bg-yellow-400 text-yellow-950 shadow-xs' :
                      player.rank === 2 ? 'bg-slate-300 text-slate-800' :
                      player.rank === 3 ? 'bg-amber-600 text-white' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {player.rank}
                    </span>
                    <span className="text-2xl">{player.avatar}</span>
                    <div>
                      <div className="text-sm font-black text-slate-800 flex items-center gap-2">
                        <span>{player.name}</span>
                        {player.isUser && (
                          <span className="px-1.5 py-0.2 rounded bg-amber-300 text-amber-950 text-[9px] font-black uppercase">
                            YOU
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 uppercase">{player.level}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-base font-black text-slate-800 font-mono">{player.score} pts</div>
                    <div className="text-[10px] font-extrabold text-emerald-600 uppercase">Season {weeklyPackage.weekNumber}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
