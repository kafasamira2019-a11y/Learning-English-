import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Volume2, 
  Sparkles, 
  BookOpen, 
  Layers, 
  Zap,
  CheckCircle2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Award,
  RefreshCw,
  Star,
  Flame,
  Check,
  RotateCcw,
  BookMarked
} from 'lucide-react';
import { vocabularyList, regularVerbsList, VocabItem, RegularVerbItem } from '../data/vocabularyData';
import { irregularVerbsList } from '../data/irregularVerbs';
import { soundManager } from '../utils/sound';
import { getDailyVocabPackage, DailyVocabPackage, getTimeUntilMidnight, formatKhmerDate, formatEnglishDate } from '../utils/dailyVocab';
import { userStore } from '../utils/userStore';

type VocabSubTab = 'daily-vocab' | 'regular-verbs' | 'irregular-verbs' | 'flashcards';
type DailyViewMode = 'daily-curated' | 'all-bank';

const STORAGE_KEY_DAILY_LEARNED = 'kafa_daily_vocab_learned_dates';

export const VocabularyView: React.FC = () => {
  const [subTab, setSubTab] = useState<VocabSubTab>('daily-vocab');
  
  // Date State for Daily Auto-Updating
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dailyPackage, setDailyPackage] = useState<DailyVocabPackage>(() => getDailyVocabPackage(new Date()));
  const [dailyMode, setDailyMode] = useState<DailyViewMode>('daily-curated');
  const [timeRemaining, setTimeRemaining] = useState(() => getTimeUntilMidnight(new Date()));
  
  // Daily Streak & Learned State
  const [learnedDates, setLearnedDates] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DAILY_LEARNED);
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [];
      }
      return [];
    } catch {
      return [];
    }
  });

  // Daily Mini-Quiz State
  const [dailyQuizIndex, setDailyQuizIndex] = useState<number>(0);
  const [selectedDailyAnswer, setSelectedDailyAnswer] = useState<string | null>(null);
  const [dailyQuizChecked, setDailyQuizChecked] = useState<boolean>(false);
  const [dailyQuizScore, setDailyQuizScore] = useState<number>(0);
  const [showDailyQuiz, setShowDailyQuiz] = useState<boolean>(false);

  // Regular Verbs State
  const [regVerbSearch, setRegVerbSearch] = useState('');
  const [selectedEdFilter, setSelectedEdFilter] = useState<string>('all');
  const [isRegVerbQuiz, setIsRegVerbQuiz] = useState(false);
  const [regQuizIndex, setRegQuizIndex] = useState(0);
  const [selectedQuizPronunciation, setSelectedQuizPronunciation] = useState<string | null>(null);
  const [quizAnswerChecked, setQuizAnswerChecked] = useState(false);
  const [regQuizScore, setRegQuizScore] = useState(0);

  // General Vocabulary State
  const [vocabSearch, setVocabSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  // Irregular Verbs State
  const [verbSearch, setVerbSearch] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('ALL');
  const [isIrregVerbTestMode, setIsIrregVerbTestMode] = useState(false);
  const [testVerbIndex, setTestVerbIndex] = useState(0);
  const [inputPast, setInputPast] = useState('');
  const [inputParticiple, setInputParticiple] = useState('');
  const [testResult, setTestResult] = useState<{ checked: boolean; isPastOk: boolean; isPartOk: boolean } | null>(null);
  const [testScore, setTestScore] = useState(0);

  // Flashcards State
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flashcardSource, setFlashcardSource] = useState<'daily-pack' | 'regular-verbs' | 'vocabulary' | 'irregular-verbs'>('daily-pack');

  const alphabet = ['ALL', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

  // Update daily package whenever selectedDate changes
  useEffect(() => {
    setDailyPackage(getDailyVocabPackage(selectedDate));
    // Reset mini-quiz when day changes
    setDailyQuizIndex(0);
    setSelectedDailyAnswer(null);
    setDailyQuizChecked(false);
    setDailyQuizScore(0);
  }, [selectedDate]);

  // Live timer tick for countdown to 00:00 midnight auto-update
  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = getTimeUntilMidnight(new Date());
      setTimeRemaining(remaining);

      // If midnight hit while viewing today's date, auto-sync to today
      const now = new Date();
      if (
        remaining.hours === 0 && 
        remaining.minutes === 0 && 
        remaining.seconds === 0 &&
        selectedDate.toDateString() === new Date(now.getTime() - 1000).toDateString()
      ) {
        setSelectedDate(new Date());
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedDate]);

  const isToday = selectedDate.toDateString() === new Date().toDateString();
  const isCurrentDateLearned = learnedDates.includes(dailyPackage.dateKey);

  const handleToggleLearnedToday = () => {
    const key = dailyPackage.dateKey;
    let nextList: string[];
    if (learnedDates.includes(key)) {
      nextList = learnedDates.filter(k => k !== key);
    } else {
      nextList = [...learnedDates, key];
      soundManager.playCorrect();
    }
    setLearnedDates(nextList);
    try {
      localStorage.setItem(STORAGE_KEY_DAILY_LEARNED, JSON.stringify(nextList));
    } catch {
      // ignore
    }
  };

  const handleShiftDay = (offsetDays: number) => {
    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + offsetDays);
    setSelectedDate(nextDate);
  };

  const handleSetToToday = () => {
    setSelectedDate(new Date());
  };

  // Filter Regular Verbs
  const filteredRegVerbs = regularVerbsList.filter(v => {
    const matchesSearch = 
      v.infinitive.toLowerCase().includes(regVerbSearch.toLowerCase()) ||
      v.pastSimple.toLowerCase().includes(regVerbSearch.toLowerCase()) ||
      v.meaningKh.includes(regVerbSearch);
    
    const matchesEd = selectedEdFilter === 'all' || v.edPronunciation === selectedEdFilter;
    return matchesSearch && matchesEd;
  });

  // Filter General Vocabulary (for All Bank mode)
  const filteredVocab = vocabularyList.filter(item => {
    const matchesSearch = 
      item.word.toLowerCase().includes(vocabSearch.toLowerCase()) ||
      item.meaningKh.includes(vocabSearch) ||
      item.definitionEn.toLowerCase().includes(vocabSearch.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || item.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  // Filter Irregular Verbs
  const filteredIrregVerbs = irregularVerbsList.filter(v => {
    const matchesSearch = 
      v.infinitive.toLowerCase().includes(verbSearch.toLowerCase()) ||
      v.pastSimple.toLowerCase().includes(verbSearch.toLowerCase()) ||
      v.pastParticiple.toLowerCase().includes(verbSearch.toLowerCase()) ||
      v.meaningKh.includes(verbSearch);

    const matchesLetter = selectedLetter === 'ALL' || v.infinitive.toUpperCase().startsWith(selectedLetter);
    return matchesSearch && matchesLetter;
  });

  // Regular Verb Quiz Current Item
  const currentRegQuizItem = regularVerbsList[regQuizIndex % regularVerbsList.length];

  const handleCheckRegQuiz = (choice: string) => {
    if (!currentRegQuizItem || quizAnswerChecked) return;
    setSelectedQuizPronunciation(choice);
    setQuizAnswerChecked(true);

    if (choice === currentRegQuizItem.edPronunciation) {
      setRegQuizScore(s => s + 1);
      soundManager.playCorrect();
    } else {
      soundManager.playIncorrect();
    }
  };

  const handleNextRegQuiz = () => {
    setRegQuizIndex(i => i + 1);
    setSelectedQuizPronunciation(null);
    setQuizAnswerChecked(false);
  };

  // Irregular Verb Test Mode Current Item
  const currentTestVerb = irregularVerbsList[testVerbIndex % irregularVerbsList.length];

  const handleCheckVerbTest = () => {
    if (!currentTestVerb) return;
    const cleanPast = currentTestVerb.pastSimple.toLowerCase();
    const cleanPart = currentTestVerb.pastParticiple.toLowerCase();

    const isPastOk = cleanPast.includes(inputPast.trim().toLowerCase()) || inputPast.trim().toLowerCase() === cleanPast;
    const isPartOk = cleanPart.includes(inputParticiple.trim().toLowerCase()) || inputParticiple.trim().toLowerCase() === cleanPart;

    setTestResult({ checked: true, isPastOk, isPartOk });

    if (isPastOk && isPartOk) {
      setTestScore(s => s + 1);
      soundManager.playCorrect();
    } else {
      soundManager.playIncorrect();
    }
  };

  const handleNextVerbTest = () => {
    setTestVerbIndex(i => i + 1);
    setInputPast('');
    setInputParticiple('');
    setTestResult(null);
  };

  // Daily Mini-Quiz Calculations (based on daily package words)
  const dailyQuizQuestions = [
    {
      question: `What is the Khmer meaning of "${dailyPackage.wordOfTheDay.word}"?`,
      correct: dailyPackage.wordOfTheDay.meaningKh,
      options: [
        dailyPackage.wordOfTheDay.meaningKh,
        dailyPackage.dailySet[1]?.meaningKh || 'ទទួលយក',
        dailyPackage.dailySet[2]?.meaningKh || 'សម្រេចចិត្ត',
        dailyPackage.dailySet[3]?.meaningKh || 'ទាក់ទាញ'
      ].sort(() => 0.5 - Math.random())
    },
    {
      question: `Which word means "${dailyPackage.dailyPhrasalVerb?.meaningKh || 'ស្វែងយល់'}"?`,
      correct: dailyPackage.dailyPhrasalVerb?.word || 'Figure out',
      options: [
        dailyPackage.dailyPhrasalVerb?.word || 'Figure out',
        dailyPackage.dailySet[0]?.word || 'Accept',
        dailyPackage.dailySet[1]?.word || 'Punctual',
        dailyPackage.dailySet[2]?.word || 'Collaborate'
      ].sort(() => 0.5 - Math.random())
    },
    {
      question: `In the regular verb "${dailyPackage.dailyRegularVerb.infinitive}" -> "${dailyPackage.dailyRegularVerb.pastSimple}", how is the "-ed" pronounced?`,
      correct: dailyPackage.dailyRegularVerb.edPronunciation,
      options: ['/ɪd/', '/t/', '/d/']
    }
  ];

  const currentDailyQuestion = dailyQuizQuestions[dailyQuizIndex % dailyQuizQuestions.length];

  const handleCheckDailyQuizAnswer = (opt: string) => {
    if (dailyQuizChecked) return;
    setSelectedDailyAnswer(opt);
    setDailyQuizChecked(true);
    if (opt === currentDailyQuestion.correct) {
      setDailyQuizScore(s => s + 1);
      soundManager.playCorrect();
    } else {
      soundManager.playIncorrect();
    }
  };

  const handleNextDailyQuizQuestion = () => {
    if (dailyQuizIndex < dailyQuizQuestions.length - 1) {
      setDailyQuizIndex(i => i + 1);
      setSelectedDailyAnswer(null);
      setDailyQuizChecked(false);
    } else {
      userStore.recordExerciseCompletion(
        'vocab',
        `Daily Vocabulary Quiz (${formatEnglishDate(selectedDate)})`,
        'តេស្តវាក្យសព្ទប្រចាំថ្ងៃ',
        dailyQuizScore,
        dailyQuizQuestions.length,
        dailyQuizScore * 10
      );
      setShowDailyQuiz(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6 select-none font-khmer">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-[#E5E5E5] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 bg-[#58CC02]/10 text-[#58CC02] font-black text-xs rounded-xl uppercase tracking-wider border border-[#58CC02]/20">
              KAFA FREE VOCABULARY SYSTEM
            </span>
            <span className="flex items-center gap-1 text-xs text-emerald-800 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-xl border border-emerald-200">
              <RefreshCw className="w-3 h-3 text-emerald-600 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Auto-Update Daily (បច្ចុប្បន្នភាពរាល់ថ្ងៃ)</span>
            </span>
            <span className="text-xs text-slate-500 font-bold">
              {vocabularyList.length} Thematic Words + {regularVerbsList.length} Regular + {irregularVerbsList.length} Irregular
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            Vocabulary &amp; Verbs Bank (កិរិយាសព្ទ &amp; វាក្យសព្ទប្រចាំថ្ងៃ)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-khmer">
            រៀនវាក្យសព្ទប្រចាំថ្ងៃ (Daily Auto-Update), កិរិយាសព្ទប្រក្រតី (Regular Verbs -ed), កិរិយាសព្ទមិនប្រក្រតី និងកាត Flashcards
          </p>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl gap-1 shrink-0 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSubTab('daily-vocab')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              subTab === 'daily-vocab'
                ? 'bg-[#CE82FF] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            id="tab-vocab-daily"
          >
            <BookOpen className="w-4 h-4" />
            <span>Daily Vocabulary (ពាក្យប្រចាំថ្ងៃ)</span>
          </button>

          <button
            onClick={() => setSubTab('regular-verbs')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              subTab === 'regular-verbs'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            id="tab-vocab-regular-verbs"
          >
            <CheckCircle2 className="w-4 h-4 text-[#58CC02]" />
            <span>Regular Verbs (+ed)</span>
          </button>

          <button
            onClick={() => setSubTab('irregular-verbs')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              subTab === 'irregular-verbs'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            id="tab-vocab-irregular-verbs"
          >
            <Layers className="w-4 h-4 text-[#1CB0F6]" />
            <span>Irregular Verbs ({irregularVerbsList.length})</span>
          </button>

          <button
            onClick={() => {
              setSubTab('flashcards');
              setIsFlipped(false);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              subTab === 'flashcards'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            id="tab-vocab-flashcards"
          >
            <Zap className="w-4 h-4 text-[#FF9600]" />
            <span>Flashcards</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. DAILY VOCABULARY (AUTO-UPDATES DAILY) */}
      {/* ========================================================================= */}
      {subTab === 'daily-vocab' && (
        <div className="space-y-6">
          
          {/* Daily Auto-Update Control Bar & Date Navigator */}
          <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-pink-50 rounded-3xl p-5 sm:p-6 border-2 border-purple-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Date Details */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-extrabold text-purple-900 uppercase tracking-wider">
                  {isToday ? '📅 ថ្ងៃនេះ (Today)' : '📅 កាលបរិច្ឆេទជ្រើសរើស (Selected Date)'}
                </span>
                {isToday && (
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[11px] font-black rounded-lg border border-emerald-200">
                    Live Auto-Updated
                  </span>
                )}
              </div>

              <h2 className="text-base sm:text-lg font-black text-slate-900 font-khmer">
                {dailyPackage.khmerDateString}
              </h2>
              <p className="text-xs text-slate-600 font-semibold">
                {dailyPackage.englishDateString} &bull; Day #{dailyPackage.dayIndex + 1}
              </p>
            </div>

            {/* Auto-Update Countdown & Date Switcher Controls */}
            <div className="flex flex-wrap items-center gap-2.5">
              
              {/* Countdown badge */}
              <div className="px-3.5 py-2 bg-white/90 backdrop-blur-xs rounded-2xl border border-purple-200 text-xs font-bold text-slate-700 flex items-center gap-2 shadow-xs">
                <Clock className="w-4 h-4 text-purple-600" />
                <div>
                  <span className="text-[10px] text-slate-400 block leading-tight">Next Update in:</span>
                  <span className="font-mono font-black text-purple-900">
                    {String(timeRemaining.hours).padStart(2, '0')}h {String(timeRemaining.minutes).padStart(2, '0')}m {String(timeRemaining.seconds).padStart(2, '0')}s
                  </span>
                </div>
              </div>

              {/* Day Navigation Buttons */}
              <div className="flex items-center bg-white rounded-2xl border border-purple-200 p-1 shadow-xs">
                <button
                  onClick={() => handleShiftDay(-1)}
                  title="Previous Day (ម្សិលមិញ)"
                  className="p-2 text-slate-600 hover:text-purple-700 hover:bg-purple-50 rounded-xl transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={handleSetToToday}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-colors cursor-pointer ${
                    isToday 
                      ? 'bg-purple-600 text-white' 
                      : 'text-purple-700 hover:bg-purple-50'
                  }`}
                >
                  Today
                </button>

                <button
                  onClick={() => handleShiftDay(1)}
                  title="Next Day (ថ្ងៃស្អែក)"
                  className="p-2 text-slate-600 hover:text-purple-700 hover:bg-purple-50 rounded-xl transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Learned Checkmark */}
              <button
                onClick={handleToggleLearnedToday}
                className={`px-3.5 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 shadow-xs ${
                  isCurrentDateLearned
                    ? 'bg-[#58CC02] text-white'
                    : 'bg-white text-slate-700 border border-purple-200 hover:bg-purple-50'
                }`}
                title="Mark this day's vocabulary as learned"
              >
                {isCurrentDateLearned ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>រៀនចប់ហើយ ✅</span>
                  </>
                ) : (
                  <>
                    <BookMarked className="w-4 h-4 text-purple-600" />
                    <span>កត់ត្រាថាបានរៀន</span>
                  </>
                )}
              </button>

            </div>

          </div>

          {/* Mode Switcher: Daily Curated Pack VS Full 150+ Bank */}
          <div className="flex items-center justify-between gap-3 bg-white p-2.5 rounded-2xl border-2 border-[#E5E5E5] shadow-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDailyMode('daily-curated')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  dailyMode === 'daily-curated'
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Star className="w-3.5 h-3.5" />
                <span>ឈុតពាក្យប្រចាំថ្ងៃនេះ (Today's Pack)</span>
              </button>

              <button
                onClick={() => setDailyMode('all-bank')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  dailyMode === 'all-bank'
                    ? 'bg-slate-800 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Search className="w-3.5 h-3.5" />
                <span>ស្វែងរកពាក្យទាំងអស់ ({vocabularyList.length} Words)</span>
              </button>
            </div>

            {dailyMode === 'daily-curated' && (
              <button
                onClick={() => setShowDailyQuiz(!showDailyQuiz)}
                className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{showDailyQuiz ? 'មើលបញ្ជីពាក្យ (View List)' : 'លំហាត់ប្រចាំថ្ងៃ (Daily Challenge)'}</span>
              </button>
            )}
          </div>

          {/* ========================================================================= */}
          {/* DAILY CURATED VIEW */}
          {/* ========================================================================= */}
          {dailyMode === 'daily-curated' && (
            <div className="space-y-6">

              {/* 1. Word of the Day Spotlight Card */}
              <div className="bg-gradient-to-br from-purple-700 via-indigo-700 to-purple-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden space-y-4">
                <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex items-center justify-between relative z-10 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-xs text-amber-300 font-black text-xs rounded-xl uppercase tracking-wider flex items-center gap-1.5 border border-white/20">
                      <Star className="w-3.5 h-3.5 fill-amber-300" />
                      <span>Word of the Day (ពាក្យប្រចាំថ្ងៃពិសេស)</span>
                    </span>
                    <span className="px-2.5 py-1 bg-white/10 text-white/90 text-xs font-bold rounded-xl uppercase">
                      {dailyPackage.wordOfTheDay.level}
                    </span>
                  </div>

                  <span className="text-xs text-purple-200 font-bold uppercase tracking-wider">
                    {dailyPackage.wordOfTheDay.category.replace('-', ' ')}
                  </span>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-2 relative z-10">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                        {dailyPackage.wordOfTheDay.word}
                      </h3>
                      {dailyPackage.wordOfTheDay.phonetic && (
                        <span className="text-sm font-mono text-purple-200 bg-white/10 px-2.5 py-1 rounded-lg">
                          {dailyPackage.wordOfTheDay.phonetic}
                        </span>
                      )}
                      <button
                        onClick={() => soundManager.speak(`${dailyPackage.wordOfTheDay.word}. ${dailyPackage.wordOfTheDay.exampleEn}`)}
                        className="p-2.5 bg-white/20 hover:bg-white/30 text-white rounded-2xl transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-xs"
                        title="Listen to pronunciation"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-purple-500/40 text-purple-100 text-[11px] font-extrabold uppercase rounded-md">
                        {dailyPackage.wordOfTheDay.partOfSpeech}
                      </span>
                      <p className="text-xs sm:text-sm text-purple-100 font-medium">
                        "{dailyPackage.wordOfTheDay.definitionEn}"
                      </p>
                    </div>

                    <div className="pt-2">
                      <p className="text-xl sm:text-2xl font-khmer font-black text-amber-300 leading-relaxed">
                        ន័យ៖ {dailyPackage.wordOfTheDay.meaningKh}
                      </p>
                    </div>
                  </div>

                  {/* Right Example Box */}
                  <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/20 text-xs sm:text-sm space-y-2 md:max-w-md w-full">
                    <span className="text-[10px] uppercase font-black tracking-wider text-purple-200 block">
                      Usage in Context (ឧទាហរណ៍ក្នុងប្រយោគ)
                    </span>
                    <p className="font-semibold text-white leading-relaxed">
                      "{dailyPackage.wordOfTheDay.exampleEn}"
                    </p>
                    <p className="font-khmer text-purple-200 text-xs leading-relaxed font-medium">
                      {dailyPackage.wordOfTheDay.exampleKh}
                    </p>
                  </div>
                </div>

              </div>

              {/* Interactive Daily Mini-Quiz (if open) */}
              {showDailyQuiz && currentDailyQuestion && (
                <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-amber-300 shadow-md space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-amber-100 text-amber-900 font-black text-xs rounded-xl uppercase">
                      Daily 3-Question Challenge ({dailyQuizIndex + 1}/3)
                    </span>
                    <span className="text-xs font-black text-slate-600">
                      Score: {dailyQuizScore}
                    </span>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                    <span className="text-xs text-slate-400 font-bold uppercase">Question #{dailyQuizIndex + 1}:</span>
                    <h3 className="text-base font-bold text-slate-900">{currentDailyQuestion.question}</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentDailyQuestion.options.map((option, idx) => {
                      const isSelected = selectedDailyAnswer === option;
                      const isCorrect = option === currentDailyQuestion.correct;
                      
                      let style = 'bg-white border-2 border-slate-200 text-slate-800 hover:border-purple-500';
                      if (dailyQuizChecked) {
                        if (isCorrect) {
                          style = 'bg-emerald-500 border-2 border-emerald-600 text-white shadow-xs font-bold';
                        } else if (isSelected && !isCorrect) {
                          style = 'bg-rose-500 border-2 border-rose-600 text-white';
                        } else {
                          style = 'bg-slate-100 border-slate-200 text-slate-400 opacity-60';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleCheckDailyQuizAnswer(option)}
                          className={`p-3.5 rounded-xl text-xs sm:text-sm font-semibold transition-all text-left cursor-pointer flex items-center justify-between ${style}`}
                        >
                          <span className="font-khmer">{option}</span>
                          {dailyQuizChecked && isCorrect && <Check className="w-4 h-4" />}
                        </button>
                      );
                    })}
                  </div>

                  {dailyQuizChecked && (
                    <div className="flex justify-end pt-2">
                      <button
                        onClick={handleNextDailyQuizQuestion}
                        className="px-5 py-2.5 bg-[#58CC02] hover:bg-[#46A302] text-white font-black text-xs sm:text-sm rounded-xl shadow-xs transition-colors cursor-pointer"
                      >
                        {dailyQuizIndex < 2 ? 'សំនួរបន្ទាប់ (Next &rarr;)' : 'បញ្ចប់លំហាត់ (Finish)'}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* 2. Today's Curated Daily Set (6 Target Words) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <span>🌟</span>
                    <span>Today's Curated Words (ឈុតពាក្យប្រចាំថ្ងៃ - ៦ ពាក្យ)</span>
                  </h3>
                  <span className="text-xs text-slate-500 font-bold">
                    Auto-rotated daily
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {dailyPackage.dailySet.map((item, idx) => (
                    <div
                      key={item.id + idx}
                      className="bg-white p-5 rounded-2xl border-2 border-[#E5E5E5] hover:border-[#CE82FF] transition-all shadow-xs space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-base font-black text-slate-900">{item.word}</h4>
                              {item.phonetic && (
                                <span className="text-xs font-mono text-slate-400 font-medium">
                                  {item.phonetic}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">
                                {item.partOfSpeech}
                              </span>
                              <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-[#1CB0F6]/10 text-[#1CB0F6] rounded-md">
                                {item.level}
                              </span>
                              <span className="text-[10px] font-bold text-slate-400 capitalize">
                                {item.category.replace('-', ' ')}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => soundManager.speak(`${item.word}. ${item.exampleEn}`)}
                            className="p-2 text-slate-400 hover:text-[#CE82FF] hover:bg-[#CE82FF]/10 rounded-xl transition-colors cursor-pointer shrink-0"
                            title="Listen pronunciation"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Meaning & Definition */}
                        <div className="space-y-1 pt-1">
                          <p className="text-xs font-bold text-slate-700 leading-snug">
                            {item.definitionEn}
                          </p>
                          <p className="text-sm font-khmer text-purple-900 font-bold leading-normal">
                            ន័យ៖ {item.meaningKh}
                          </p>
                        </div>
                      </div>

                      {/* Example sentence */}
                      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1 text-xs">
                        <p className="font-medium text-slate-800">
                          <strong className="text-slate-900 font-bold">Ex:</strong> "{item.exampleEn}"
                        </p>
                        <p className="font-khmer text-slate-500 text-[11px]">
                          {item.exampleKh}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Daily Regular Verb & Irregular Verb Spotlight Duo */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Daily Regular Verb */}
                <div className="bg-emerald-50/70 p-5 rounded-2xl border-2 border-emerald-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 bg-emerald-600 text-white text-[10px] font-black uppercase rounded-lg">
                      Daily Regular Verb (+ed)
                    </span>
                    <span className={`px-2 py-0.5 rounded-lg text-[11px] font-black ${
                      dailyPackage.dailyRegularVerb.edPronunciation === '/ɪd/' 
                        ? 'bg-rose-100 text-rose-800' 
                        : dailyPackage.dailyRegularVerb.edPronunciation === '/t/' 
                          ? 'bg-amber-100 text-amber-800' 
                          : 'bg-sky-100 text-sky-800'
                    }`}>
                      Sound {dailyPackage.dailyRegularVerb.edPronunciation}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xl font-black text-slate-900">{dailyPackage.dailyRegularVerb.infinitive}</h4>
                        <span className="text-slate-400 font-bold">&rarr;</span>
                        <span className="text-lg font-black text-emerald-800">{dailyPackage.dailyRegularVerb.pastSimple}</span>
                      </div>
                      <p className="text-xs font-khmer text-emerald-950 font-bold mt-0.5">
                        ន័យ៖ {dailyPackage.dailyRegularVerb.meaningKh}
                      </p>
                    </div>

                    <button
                      onClick={() => soundManager.speak(`${dailyPackage.dailyRegularVerb.infinitive}, ${dailyPackage.dailyRegularVerb.pastSimple}. ${dailyPackage.dailyRegularVerb.exampleEn}`)}
                      className="p-2 text-emerald-700 hover:bg-emerald-100 rounded-xl transition-colors cursor-pointer"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="p-2.5 bg-white rounded-xl border border-emerald-200 text-xs space-y-1">
                    <p className="font-semibold text-slate-800">
                      <strong>Ex:</strong> "{dailyPackage.dailyRegularVerb.exampleEn}"
                    </p>
                    <p className="font-khmer text-slate-600 text-[11px]">
                      {dailyPackage.dailyRegularVerb.exampleKh}
                    </p>
                  </div>

                  <p className="text-[10px] text-emerald-700 italic font-semibold">
                    💡 {dailyPackage.dailyRegularVerb.pronunciationRule}
                  </p>
                </div>

                {/* Daily Irregular Verb */}
                <div className="bg-sky-50/70 p-5 rounded-2xl border-2 border-sky-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 bg-sky-600 text-white text-[10px] font-black uppercase rounded-lg">
                      Daily Irregular Verb (V1-V2-V3)
                    </span>
                    <span className="text-[11px] font-bold text-sky-800">
                      3 Forms
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-sm sm:text-base font-black">
                        <span className="text-slate-900">{dailyPackage.dailyIrregularVerb.infinitive}</span>
                        <span className="text-slate-400">&rarr;</span>
                        <span className="text-sky-800">{dailyPackage.dailyIrregularVerb.pastSimple}</span>
                        <span className="text-slate-400">&rarr;</span>
                        <span className="text-indigo-800">{dailyPackage.dailyIrregularVerb.pastParticiple}</span>
                      </div>
                      <p className="text-xs font-khmer text-sky-950 font-bold mt-0.5">
                        ន័យ៖ {dailyPackage.dailyIrregularVerb.meaningKh}
                      </p>
                    </div>

                    <button
                      onClick={() => soundManager.speak(`${dailyPackage.dailyIrregularVerb.infinitive}, ${dailyPackage.dailyIrregularVerb.pastSimple}, ${dailyPackage.dailyIrregularVerb.pastParticiple}`)}
                      className="p-2 text-sky-700 hover:bg-sky-100 rounded-xl transition-colors cursor-pointer"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="p-2.5 bg-white rounded-xl border border-sky-200 text-xs space-y-1">
                    <div className="grid grid-cols-3 text-center divide-x divide-slate-100 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Base (V1)</span>
                        <span className="font-black text-slate-900">{dailyPackage.dailyIrregularVerb.infinitive}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Past (V2)</span>
                        <span className="font-black text-sky-800">{dailyPackage.dailyIrregularVerb.pastSimple}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Participle (V3)</span>
                        <span className="font-black text-indigo-800">{dailyPackage.dailyIrregularVerb.pastParticiple}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[10px] text-sky-700 italic font-semibold">
                    💡 អនុវត្តនិយាយទម្រង់ទាំងបីជារៀងរាល់ថ្ងៃដើម្បីចងចាំបានយូរ!
                  </p>
                </div>

              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* ALL VOCABULARY BANK SEARCH VIEW */}
          {/* ========================================================================= */}
          {dailyMode === 'all-bank' && (
            <div className="space-y-4">
              
              {/* Search & Categories */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-[#E5E5E5] shadow-xs space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={vocabSearch}
                      onChange={(e) => setVocabSearch(e.target.value)}
                      placeholder="ស្វែងរកពាក្យ ឬន័យជាភាសាខ្មែរ / Search word, meaning, example..."
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium focus:bg-white focus:border-[#CE82FF] outline-hidden"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                      className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:bg-white focus:border-[#CE82FF] outline-hidden cursor-pointer"
                    >
                      <option value="all">All Levels (គ្រប់កម្រិត)</option>
                      <option value="A1-A2">A1-A2 (Beginner)</option>
                      <option value="B1-B2">B1-B2 (Intermediate)</option>
                      <option value="C1-C2">C1-C2 (Advanced)</option>
                    </select>
                  </div>
                </div>

                {/* Category Filter Pills */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
                  {[
                    { id: 'all', label: 'All Words', icon: '🌟' },
                    { id: 'daily-essential', label: 'Daily Life Essentials', icon: '☕' },
                    { id: 'academic', label: 'Academic & Research', icon: '🎓' },
                    { id: 'phrasal-verbs', label: 'Phrasal Verbs', icon: '⚡' },
                    { id: 'business', label: 'Business & Career', icon: '💼' },
                    { id: 'idioms', label: 'Idioms & Expressions', icon: '💡' }
                  ].map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                        selectedCategory === cat.id
                          ? 'bg-[#CE82FF] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Word Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredVocab.map((item) => (
                  <div 
                    key={item.id}
                    className="bg-white p-5 rounded-2xl border-2 border-[#E5E5E5] hover:border-[#CE82FF] transition-all shadow-xs space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-black text-slate-900">{item.word}</h3>
                            {item.phonetic && (
                              <span className="text-xs font-mono text-slate-400 font-medium">
                                {item.phonetic}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">
                              {item.partOfSpeech}
                            </span>
                            <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-[#1CB0F6]/10 text-[#1CB0F6] rounded-md">
                              {item.level}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400 capitalize">
                              {item.category.replace('-', ' ')}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => soundManager.speak(`${item.word}. ${item.exampleEn}`)}
                          className="p-2 text-slate-400 hover:text-[#CE82FF] hover:bg-[#CE82FF]/10 rounded-xl transition-colors cursor-pointer"
                          title="Listen pronunciation"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Meaning & Definition */}
                      <div className="space-y-1 pt-1">
                        <p className="text-xs font-bold text-slate-700 leading-snug">
                          {item.definitionEn}
                        </p>
                        <p className="text-sm font-khmer text-purple-900 font-bold leading-normal">
                          ន័យ៖ {item.meaningKh}
                        </p>
                      </div>
                    </div>

                    {/* Example sentence */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                      <p className="text-xs font-medium text-slate-800">
                        <strong className="text-slate-900 font-bold">Ex:</strong> "{item.exampleEn}"
                      </p>
                      <p className="text-[11px] font-khmer text-slate-500">
                        {item.exampleKh}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {filteredVocab.length === 0 && (
                <div className="p-12 text-center bg-white rounded-2xl border-2 border-[#E5E5E5] space-y-2">
                  <span className="text-3xl">🔍</span>
                  <p className="text-sm font-bold text-slate-700">រកមិនឃើញពាក្យដែលត្រូវគ្នានឹង "{vocabSearch}" ឡើយ</p>
                  <button
                    onClick={() => { setVocabSearch(''); setSelectedCategory('all'); setSelectedLevel('all'); }}
                    className="text-xs font-bold text-[#CE82FF] hover:underline cursor-pointer"
                  >
                    សម្អាតការស្វែងរក (Reset Filters)
                  </button>
                </div>
              )}

            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. REGULAR VERBS (+ED) TAB */}
      {/* ========================================================================= */}
      {subTab === 'regular-verbs' && (
        <div className="space-y-5">
          
          {/* Rules Explanation Banner */}
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 rounded-3xl p-5 sm:p-6 border-2 border-emerald-200/70 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">💡</span>
                <h2 className="text-sm sm:text-base font-black text-emerald-950 font-khmer">
                  3 Pronunciation Rules for Regular Verbs with -ed Ending (ក្បួនអានកន្ទុយ -ed)
                </h2>
              </div>

              <button
                onClick={() => {
                  setIsRegVerbQuiz(!isRegVerbQuiz);
                  setQuizAnswerChecked(false);
                  setSelectedQuizPronunciation(null);
                }}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                id="btn-reg-quiz-toggle"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isRegVerbQuiz ? 'មើលតារាង (View Table)' : 'តេស្ត -ed Pronunciation Quiz'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <div className="bg-white/90 backdrop-blur-xs p-4 rounded-2xl border border-emerald-200 space-y-1.5 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 bg-rose-100 text-rose-800 text-xs font-black rounded-lg">
                    1. អានថា /ɪd/
                  </span>
                  <span className="text-[11px] font-bold text-slate-500">Extra Syllable</span>
                </div>
                <p className="text-xs font-bold text-slate-800">
                  នៅពីក្រោយសូរអក្សរ <strong>/t/</strong> ឬ <strong>/d/</strong>
                </p>
                <p className="text-xs text-slate-600 font-medium">
                  Ex: want &rarr; <em>wanted</em>, need &rarr; <em>needed</em>, decide &rarr; <em>decided</em>
                </p>
              </div>

              <div className="bg-white/90 backdrop-blur-xs p-4 rounded-2xl border border-emerald-200 space-y-1.5 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 text-xs font-black rounded-lg">
                    2. អានថា /t/
                  </span>
                  <span className="text-[11px] font-bold text-slate-500">Voiceless Sound</span>
                </div>
                <p className="text-xs font-bold text-slate-800">
                  នៅពីក្រោយ <strong>/p/, /k/, /f/, /s/, /ʃ/ (sh), /tʃ/ (ch)</strong>
                </p>
                <p className="text-xs text-slate-600 font-medium">
                  Ex: ask &rarr; <em>asked</em>, wash &rarr; <em>washed</em>, watch &rarr; <em>watched</em>, help &rarr; <em>helped</em>
                </p>
              </div>

              <div className="bg-white/90 backdrop-blur-xs p-4 rounded-2xl border border-emerald-200 space-y-1.5 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 bg-sky-100 text-sky-800 text-xs font-black rounded-lg">
                    3. អានថា /d/
                  </span>
                  <span className="text-[11px] font-bold text-slate-500">Voiced Sound</span>
                </div>
                <p className="text-xs font-bold text-slate-800">
                  នៅពីក្រោយស្រៈ និងសូរ <strong>/l/, /m/, /n/, /r/, /v/, /z/</strong>
                </p>
                <p className="text-xs text-slate-600 font-medium">
                  Ex: play &rarr; <em>played</em>, live &rarr; <em>lived</em>, clean &rarr; <em>cleaned</em>, call &rarr; <em>called</em>
                </p>
              </div>
            </div>
          </div>

          {/* Interactive -ed Pronunciation Quiz */}
          {isRegVerbQuiz && currentRegQuizItem && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-300 shadow-md space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-emerald-800 tracking-wider">
                  Regular Verb -ed Pronunciation Challenge
                </span>
                <span className="px-3.5 py-1 bg-emerald-50 text-emerald-800 font-black rounded-xl border border-emerald-200 text-xs">
                  Score: {regQuizScore}
                </span>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center space-y-2">
                <span className="text-xs text-slate-400 font-bold uppercase">How is the past tense pronounced?</span>
                <div className="text-3xl sm:text-4xl font-black text-slate-900 flex items-center justify-center gap-3">
                  <span>{currentRegQuizItem.infinitive}</span>
                  <span className="text-slate-400 font-medium">&rarr;</span>
                  <span className="text-emerald-700">{currentRegQuizItem.pastSimple}</span>
                  <button
                    onClick={() => soundManager.speak(`${currentRegQuizItem.infinitive}, ${currentRegQuizItem.pastSimple}`)}
                    className="p-1.5 text-emerald-600 hover:text-emerald-800 cursor-pointer"
                  >
                    <Volume2 className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-sm font-khmer text-slate-600 font-bold">
                  ន័យ៖ {currentRegQuizItem.meaningKh}
                </p>
              </div>

              {/* Pronunciation Options */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {['/ɪd/', '/t/', '/d/'].map((option) => {
                  const isSelected = selectedQuizPronunciation === option;
                  const isCorrect = option === currentRegQuizItem.edPronunciation;

                  let btnStyle = 'bg-white border-2 border-slate-200 text-slate-800 hover:border-emerald-500';
                  if (quizAnswerChecked) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-500 border-2 border-emerald-600 text-white shadow-xs';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'bg-rose-500 border-2 border-rose-600 text-white';
                    } else {
                      btnStyle = 'bg-slate-100 border-slate-200 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={option}
                      onClick={() => handleCheckRegQuiz(option)}
                      className={`p-4 rounded-2xl text-center font-black text-lg transition-all cursor-pointer ${btnStyle}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {quizAnswerChecked && (
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-950 text-xs space-y-1">
                  <p className="font-bold">
                    {selectedQuizPronunciation === currentRegQuizItem.edPronunciation
                      ? '🎉 ត្រឹមត្រូវ! (Correct)'
                      : '❌ មិនទាន់ត្រឹមត្រូវទេ (Incorrect)'}
                  </p>
                  <p>{currentRegQuizItem.pronunciationRule}</p>
                </div>
              )}

              {quizAnswerChecked && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNextRegQuiz}
                    className="px-6 py-3 bg-[#58CC02] hover:bg-[#46A302] text-white font-black rounded-2xl text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
                  >
                    ពាក្យបន្ទាប់ (Next Verb &rarr;)
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Regular Verbs Search & Filter Table */}
          {!isRegVerbQuiz && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-2xl border-2 border-[#E5E5E5] shadow-xs">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={regVerbSearch}
                    onChange={(e) => setRegVerbSearch(e.target.value)}
                    placeholder="ស្វែងរកកិរិយាសព្ទប្រក្រតី / Search regular verbs, past form, Khmer..."
                    className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 outline-hidden"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                  {[
                    { id: 'all', label: 'All Sound Rules' },
                    { id: '/ɪd/', label: 'Sound /ɪd/' },
                    { id: '/t/', label: 'Sound /t/' },
                    { id: '/d/', label: 'Sound /d/' }
                  ].map(f => (
                    <button
                      key={f.id}
                      onClick={() => setSelectedEdFilter(f.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                        selectedEdFilter === f.id
                          ? 'bg-[#58CC02] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Regular Verbs Grid Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {filteredRegVerbs.map((v) => (
                  <div
                    key={v.id}
                    className="bg-white p-4 rounded-2xl border-2 border-[#E5E5E5] hover:border-[#58CC02] transition-all shadow-xs space-y-2.5 flex flex-col justify-between"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-black text-slate-900">{v.infinitive}</h3>
                            <span className="text-xs text-slate-400 font-bold">&rarr;</span>
                            <span className="text-sm font-black text-emerald-700">{v.pastSimple}</span>
                          </div>
                          <p className="text-xs font-khmer text-slate-600 font-bold mt-0.5">
                            ន័យ៖ {v.meaningKh}
                          </p>
                        </div>

                        <div className="flex items-center gap-1">
                          <span className={`px-2 py-0.5 rounded-lg text-[11px] font-black ${
                            v.edPronunciation === '/ɪd/' 
                              ? 'bg-rose-100 text-rose-700' 
                              : v.edPronunciation === '/t/' 
                                ? 'bg-amber-100 text-amber-700' 
                                : 'bg-sky-100 text-sky-700'
                          }`}>
                            {v.edPronunciation}
                          </span>

                          <button
                            onClick={() => soundManager.speak(`${v.infinitive}, ${v.pastSimple}. ${v.exampleEn}`)}
                            className="p-1.5 text-slate-400 hover:text-[#58CC02] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            title="Listen"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="p-2 bg-slate-50 rounded-xl border border-slate-100 text-[11px] space-y-1">
                        <p className="font-semibold text-slate-800">
                          <strong className="text-slate-900 font-bold">Ex:</strong> "{v.exampleEn}"
                        </p>
                        <p className="font-khmer text-slate-500">
                          {v.exampleKh}
                        </p>
                      </div>
                    </div>

                    <p className="text-[10px] text-slate-400 italic">
                      {v.pronunciationRule}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. IRREGULAR VERBS TAB */}
      {/* ========================================================================= */}
      {subTab === 'irregular-verbs' && (
        <div className="space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border-2 border-[#E5E5E5] shadow-xs">
            <div>
              <h2 className="text-base font-black text-slate-900">
                100+ Common Irregular Verbs (កិរិយាសព្ទមិនប្រក្រតី)
              </h2>
              <p className="text-xs font-khmer text-slate-500">
                ទម្រង់ Base (V1), Past Simple (V2), Past Participle (V3)
              </p>
            </div>

            <button
              onClick={() => {
                setIsIrregVerbTestMode(!isIrregVerbTestMode);
                setTestResult(null);
                setInputPast('');
                setInputParticiple('');
              }}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
                isIrregVerbTestMode 
                  ? 'bg-slate-800 text-white hover:bg-slate-900' 
                  : 'bg-[#1CB0F6] text-white hover:bg-[#1899D6]'
              }`}
              id="toggle-verb-test-btn"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isIrregVerbTestMode ? 'ត្រឡប់ទៅតារាង (View Table)' : 'លេងតេស្តអនុវត្ត (Speed Trainer)'}</span>
            </button>
          </div>

          {/* Interactive Verb Trainer Quiz Mode */}
          {isIrregVerbTestMode && currentTestVerb && (
            <div className="bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50 rounded-3xl p-6 sm:p-8 border-2 border-[#1CB0F6]/30 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-sky-900 tracking-wider">
                  Irregular Verb Speed Test
                </span>
                <span className="px-3.5 py-1.5 bg-white text-sky-900 font-black rounded-xl border border-sky-200 text-xs shadow-xs">
                  Score: {testScore}
                </span>
              </div>

              {/* Verb Prompt */}
              <div className="bg-white p-6 rounded-2xl border-2 border-sky-100 text-center space-y-2 shadow-xs">
                <span className="text-xs text-slate-400 font-black uppercase tracking-wider">Infinitive (Base Form)</span>
                <div className="text-3xl sm:text-4xl font-black text-sky-950 flex items-center justify-center gap-2">
                  <span>{currentTestVerb.infinitive}</span>
                  <button 
                    onClick={() => soundManager.speak(currentTestVerb.infinitive)}
                    className="p-1.5 text-sky-500 hover:text-sky-700 cursor-pointer"
                  >
                    <Volume2 className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-sm font-semibold text-slate-600 font-khmer">
                  អត្ថន័យ៖ {currentTestVerb.meaningKh}
                </p>
              </div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Past Simple (V2):</label>
                  <input
                    type="text"
                    value={inputPast}
                    disabled={testResult?.checked}
                    onChange={(e) => setInputPast(e.target.value)}
                    placeholder="e.g. wrote, went, saw..."
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm font-semibold focus:outline-hidden ${
                      testResult?.checked 
                        ? testResult.isPastOk 
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-950' 
                          : 'bg-rose-50 border-rose-400 text-rose-950'
                        : 'bg-white border-slate-300 focus:ring-2 focus:ring-sky-400'
                    }`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !testResult?.checked) handleCheckVerbTest();
                    }}
                  />
                  {testResult?.checked && (
                    <p className="text-xs text-slate-600 font-mono">
                      Correct: <strong className="text-sky-900">{currentTestVerb.pastSimple}</strong>
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Past Participle (V3):</label>
                  <input
                    type="text"
                    value={inputParticiple}
                    disabled={testResult?.checked}
                    onChange={(e) => setInputParticiple(e.target.value)}
                    placeholder="e.g. written, gone, seen..."
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm font-semibold focus:outline-hidden ${
                      testResult?.checked 
                        ? testResult.isPartOk 
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-950' 
                          : 'bg-rose-50 border-rose-400 text-rose-950'
                        : 'bg-white border-slate-300 focus:ring-2 focus:ring-sky-400'
                    }`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !testResult?.checked) handleCheckVerbTest();
                    }}
                  />
                  {testResult?.checked && (
                    <p className="text-xs text-slate-600 font-mono">
                      Correct: <strong className="text-sky-900">{currentTestVerb.pastParticiple}</strong>
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                {!testResult?.checked ? (
                  <button
                    onClick={handleCheckVerbTest}
                    disabled={!inputPast && !inputParticiple}
                    className="px-5 py-2.5 bg-[#1CB0F6] hover:bg-[#1899D6] disabled:opacity-40 text-white font-bold rounded-xl text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
                  >
                    ផ្ទៀងផ្ទាត់ (Check Answers)
                  </button>
                ) : (
                  <button
                    onClick={handleNextVerbTest}
                    className="px-5 py-2.5 bg-[#58CC02] hover:bg-[#46A302] text-white font-bold rounded-xl text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
                  >
                    ពាក្យបន្ទាប់ (Next Verb &rarr;)
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Table Container */}
          {!isIrregVerbTestMode && (
            <div className="space-y-3">
              {/* Search & Letter Filter */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={verbSearch}
                    onChange={(e) => setVerbSearch(e.target.value)}
                    placeholder="ស្វែងរកកិរិយាសព្ទ / Search verb, past form, meaning..."
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:border-[#1CB0F6] focus:outline-hidden shadow-xs"
                  />
                </div>
              </div>

              {/* Letter filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                {alphabet.map((letter) => (
                  <button
                    key={letter}
                    onClick={() => setSelectedLetter(letter)}
                    className={`min-w-[30px] h-7 px-1.5 rounded-lg text-xs font-black shrink-0 transition-all cursor-pointer ${
                      selectedLetter === letter
                        ? 'bg-[#1CB0F6] text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {letter}
                  </button>
                ))}
              </div>

              <div className="bg-white rounded-2xl border-2 border-[#E5E5E5] shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-50 text-slate-700 text-[11px] uppercase font-black border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">Infinitive (Base)</th>
                        <th className="py-3 px-4">Past Simple (V2)</th>
                        <th className="py-3 px-4">Past Participle (V3)</th>
                        <th className="py-3 px-4">Khmer Meaning / ន័យ</th>
                        <th className="py-3 px-3 text-center">Audio</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredIrregVerbs.map((v, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-4 font-black text-slate-900">{v.infinitive}</td>
                          <td className="py-3 px-4 font-mono text-sky-700 font-bold">{v.pastSimple}</td>
                          <td className="py-3 px-4 font-mono text-indigo-700 font-bold">{v.pastParticiple}</td>
                          <td className="py-3 px-4 text-slate-600 font-khmer text-xs font-medium">{v.meaningKh}</td>
                          <td className="py-3 px-3 text-center">
                            <button
                              onClick={() => soundManager.speak(`${v.infinitive}, ${v.pastSimple}, ${v.pastParticiple}`)}
                              title={`Listen to ${v.infinitive}`}
                              className="p-1.5 text-slate-400 hover:text-[#58CC02] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. FLASHCARDS PRACTICE TAB */}
      {/* ========================================================================= */}
      {subTab === 'flashcards' && (
        <div className="max-w-md mx-auto space-y-5 py-4">
          
          {/* Flashcard Source Selector */}
          <div className="flex items-center justify-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl flex-wrap">
            <button
              onClick={() => { setFlashcardSource('daily-pack'); setCardIndex(0); setIsFlipped(false); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                flashcardSource === 'daily-pack' ? 'bg-purple-600 text-white shadow-xs font-black' : 'text-slate-500'
              }`}
            >
              Today's Pack ({dailyPackage.dailySet.length})
            </button>
            <button
              onClick={() => { setFlashcardSource('regular-verbs'); setCardIndex(0); setIsFlipped(false); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                flashcardSource === 'regular-verbs' ? 'bg-white text-slate-900 shadow-xs font-black' : 'text-slate-500'
              }`}
            >
              Regular Verbs ({regularVerbsList.length})
            </button>
            <button
              onClick={() => { setFlashcardSource('vocabulary'); setCardIndex(0); setIsFlipped(false); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                flashcardSource === 'vocabulary' ? 'bg-white text-slate-900 shadow-xs font-black' : 'text-slate-500'
              }`}
            >
              All Words ({vocabularyList.length})
            </button>
          </div>

          {flashcardSource === 'regular-verbs' ? (
            (() => {
              const currentCard = regularVerbsList[cardIndex % regularVerbsList.length];
              return (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-black text-slate-500">
                    <span>Flashcard {cardIndex + 1} of {regularVerbsList.length}</span>
                    <span className="bg-[#58CC02]/10 text-[#58CC02] px-2.5 py-0.5 rounded-md uppercase font-bold">
                      Sound {currentCard.edPronunciation}
                    </span>
                  </div>

                  <div 
                    onClick={() => setIsFlipped(f => !f)}
                    className="min-h-[260px] bg-white rounded-3xl p-7 border-3 border-[#E5E5E5] hover:border-[#58CC02] shadow-md flex flex-col items-center justify-center text-center space-y-4 cursor-pointer transition-all hover:scale-[1.01]"
                  >
                    {!isFlipped ? (
                      <>
                        <span className="text-[10px] font-extrabold tracking-wider uppercase text-slate-400">
                          Infinitive &bull; Tap to reveal Past Tense &amp; Khmer
                        </span>
                        <h2 className="text-3xl font-black text-slate-900">{currentCard.infinitive}</h2>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            soundManager.speak(currentCard.infinitive);
                          }}
                          className="p-3 bg-slate-100 hover:bg-[#58CC02] hover:text-white rounded-2xl text-slate-600 transition-colors"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="text-[10px] font-extrabold tracking-wider uppercase text-emerald-600">
                          Past Tense ({currentCard.edPronunciation}) &bull; អត្ថន័យភាសាខ្មែរ
                        </span>
                        <h2 className="text-2xl font-black text-emerald-800">{currentCard.pastSimple}</h2>
                        <p className="text-xl font-khmer font-bold text-slate-800">{currentCard.meaningKh}</p>
                        <div className="p-3 bg-slate-50 rounded-xl text-left text-xs text-slate-700 w-full">
                          <p className="font-bold">Ex: {currentCard.exampleEn}</p>
                          <p className="font-khmer text-[11px] text-slate-500 mt-0.5">{currentCard.exampleKh}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })()
          ) : (
            (() => {
              const activeSourceList = flashcardSource === 'daily-pack' ? dailyPackage.dailySet : vocabularyList;
              const currentCard = activeSourceList[cardIndex % activeSourceList.length];
              return (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-black text-slate-500">
                    <span>Flashcard {cardIndex + 1} of {activeSourceList.length}</span>
                    <span className="bg-[#CE82FF]/10 text-[#CE82FF] px-2.5 py-0.5 rounded-md uppercase font-bold">
                      {currentCard.category}
                    </span>
                  </div>

                  <div 
                    onClick={() => setIsFlipped(f => !f)}
                    className="min-h-[260px] bg-white rounded-3xl p-7 border-3 border-[#E5E5E5] hover:border-[#CE82FF] shadow-md flex flex-col items-center justify-center text-center space-y-4 cursor-pointer transition-all hover:scale-[1.01]"
                  >
                    {!isFlipped ? (
                      <>
                        <span className="text-[10px] font-extrabold tracking-wider uppercase text-slate-400">
                          {currentCard.partOfSpeech} &bull; Tap to reveal Meaning
                        </span>
                        <h2 className="text-3xl font-black text-slate-900">{currentCard.word}</h2>
                        {currentCard.phonetic && <p className="text-xs font-mono text-slate-400">{currentCard.phonetic}</p>}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            soundManager.speak(currentCard.word);
                          }}
                          className="p-3 bg-slate-100 hover:bg-[#CE82FF] hover:text-white rounded-2xl text-slate-600 transition-colors"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="text-[10px] font-extrabold tracking-wider uppercase text-purple-600">
                          Meaning &bull; អត្ថន័យភាសាខ្មែរ
                        </span>
                        <h2 className="text-xl font-khmer font-black text-purple-900 leading-relaxed">
                          {currentCard.meaningKh}
                        </h2>
                        <p className="text-xs text-slate-600 font-medium px-4">
                          "{currentCard.definitionEn}"
                        </p>
                        <div className="p-3 bg-slate-50 rounded-xl text-left text-xs text-slate-700 w-full">
                          <p className="font-bold">Ex: {currentCard.exampleEn}</p>
                          <p className="font-khmer text-[11px] text-slate-500 mt-0.5">{currentCard.exampleKh}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })()
          )}

          {/* Flashcard Next/Prev Controls */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => {
                const total = flashcardSource === 'daily-pack' 
                  ? dailyPackage.dailySet.length 
                  : flashcardSource === 'regular-verbs' 
                    ? regularVerbsList.length 
                    : vocabularyList.length;
                setCardIndex(i => (i > 0 ? i - 1 : total - 1));
                setIsFlipped(false);
              }}
              className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 rounded-2xl font-bold text-xs text-slate-700 cursor-pointer"
            >
              &larr; Previous
            </button>

            <button
              onClick={() => {
                setIsFlipped(f => !f);
              }}
              className="px-5 py-2.5 bg-[#FF9600] hover:bg-[#E08500] text-white rounded-2xl font-black text-xs cursor-pointer shadow-xs"
            >
              {isFlipped ? 'Show Word' : 'Flip Card'}
            </button>

            <button
              onClick={() => {
                const total = flashcardSource === 'daily-pack' 
                  ? dailyPackage.dailySet.length 
                  : flashcardSource === 'regular-verbs' 
                    ? regularVerbsList.length 
                    : vocabularyList.length;
                setCardIndex(i => (i + 1) % total);
                setIsFlipped(false);
              }}
              className="px-5 py-2.5 bg-[#58CC02] hover:bg-[#46A302] rounded-2xl font-black text-xs text-white cursor-pointer shadow-xs"
            >
              Next &rarr;
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
