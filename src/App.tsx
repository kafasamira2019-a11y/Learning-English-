/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { DuolingoLeftSidebar } from './components/DuolingoLeftSidebar';
import { DuolingoPathView } from './components/DuolingoPathView';
import { DuolingoLeaderboardsView } from './components/DuolingoLeaderboardsView';
import { DuolingoQuestsView } from './components/DuolingoQuestsView';
import { DuolingoShopView } from './components/DuolingoShopView';
import { DuolingoProfileView } from './components/DuolingoProfileView';
import { LessonView } from './components/LessonView';
import { AcademicWritingView } from './components/AcademicWritingView';
import { ReadingView } from './components/ReadingView';
import { ExerciseView } from './components/ExerciseView';
import { QuizView } from './components/QuizView';
import { StudyGuideView } from './components/StudyGuideView';
import { IrregularVerbsView } from './components/IrregularVerbsView';
import { VocabularyView } from './components/VocabularyView';
import { GamesView } from './components/GamesView';
import { ProgressDashboard } from './components/ProgressDashboard';
import { AITutorView } from './components/AITutorView';
import { grammarUnits } from './data/unitsData';
import { LevelType, TabType, UnitData, ExerciseSectionMode } from './types';
import { soundManager } from './utils/sound';
import { userStore } from './utils/userStore';
import { DesktopHeader } from "./components/DesktopHeader";
import { Menu, Flame, Heart } from 'lucide-react';

const STORAGE_KEY_COMPLETED = 'murphy_grammar_completed_units';
const STORAGE_KEY_QUIZ = 'murphy_grammar_quiz_results';
const STORAGE_KEY_EXERCISES = 'murphy_grammar_exercise_attempts';
const STORAGE_KEY_XP = 'duo_user_xp';
const STORAGE_KEY_GEMS = 'duo_user_gems';
const STORAGE_KEY_HEARTS = 'duo_user_hearts';
const STORAGE_KEY_STREAK = 'duo_user_streak';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('learn');
  const [exerciseMode, setExerciseMode] = useState<ExerciseSectionMode>('grammar');
  const [selectedLevel, setSelectedLevel] = useState<LevelType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedUnit, setSelectedUnit] = useState<UnitData>(grammarUnits[0]);
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Duolingo Gamification State
  const [userXp, setUserXp] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_XP);
      return saved ? parseInt(saved, 10) : 140;
    } catch {
      return 140;
    }
  });

  const [userGems, setUserGems] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_GEMS);
      return saved ? parseInt(saved, 10) : 500;
    } catch {
      return 500;
    }
  });

  const [userHearts, setUserHearts] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_HEARTS);
      return saved ? parseInt(saved, 10) : 5;
    } catch {
      return 5;
    }
  });

  const [isMascotFlipping, setIsMascotFlipping] = useState<boolean>(false);
  const [streakDays, setStreakDays] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STREAK);
      return saved ? parseInt(saved, 10) : 12;
    } catch {
      return 12;
    }
  });

  // Persistence State
  const [completedUnits, setCompletedUnits] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_COMPLETED);
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [];
      }
      return [];
    } catch {
      return [];
    }
  });

  const [quizResults, setQuizResults] = useState<{ [unitId: number]: { score: number; total: number; timestamp: number } }>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_QUIZ);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed && typeof parsed === 'object' ? parsed : {};
      }
      return {};
    } catch {
      return {};
    }
  });

  const [exerciseAttempts, setExerciseAttempts] = useState<{ [key: string]: boolean }>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_EXERCISES);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed && typeof parsed === 'object' ? parsed : {};
      }
      return {};
    } catch {
      return {};
    }
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_COMPLETED, JSON.stringify(completedUnits));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [completedUnits]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_XP, userXp.toString());
      localStorage.setItem(STORAGE_KEY_GEMS, userGems.toString());
      localStorage.setItem(STORAGE_KEY_HEARTS, userHearts.toString());
      localStorage.setItem(STORAGE_KEY_STREAK, streakDays.toString());
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [userXp, userGems, userHearts, streakDays]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_QUIZ, JSON.stringify(quizResults));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [quizResults]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_EXERCISES, JSON.stringify(exerciseAttempts));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [exerciseAttempts]);

  // Sync sound manager muted state
  const handleToggleAudio = () => {
    const next = !isAudioEnabled;
    setIsAudioEnabled(next);
    soundManager.setMuted(!next);
  };

  // Unit completion handler from Path or Lessons
  const handleUnitCompleted = (unitId: number, earnedXp: number, earnedGems: number) => {
    setUserXp(prev => prev + earnedXp);
    setUserGems(prev => prev + earnedGems);
    setCompletedUnits(prev => {
      if (!prev.includes(unitId)) {
        setIsMascotFlipping(true);
        setTimeout(() => setIsMascotFlipping(false), 4500);
        return [...prev, unitId];
      }
      return prev;
    });
  };

  // Completion toggler for manual checkbox
  const handleToggleComplete = (unitId: number) => {
    const isCurrentlyCompleted = completedUnits.includes(unitId);
    if (isCurrentlyCompleted) {
      setCompletedUnits(prev => prev.filter(id => id !== unitId));
    } else {
      soundManager.playComplete();
      setUserXp(x => x + 15);
      setUserGems(g => g + 10);
      setIsMascotFlipping(true);
      setTimeout(() => setIsMascotFlipping(false), 4500);
      setCompletedUnits(prev => [...prev, unitId]);
    }
  };

  const handleHeartLost = () => {
    setUserHearts(h => Math.max(0, h - 1));
  };

  const handleClaimReward = (earnedXp: number, earnedGems: number) => {
    setUserXp(prev => prev + earnedXp);
    setUserGems(prev => prev + earnedGems);
  };

  const handleBuyShopItem = (cost: number, itemType: string) => {
    setUserGems(prev => Math.max(0, prev - cost));
    if (itemType === 'heart-refill') {
      setUserHearts(5);
    } else if (itemType === 'streak-freeze') {
      // protected
    }
  };

  // Record an exercise answer
  const handleRecordAnswer = (unitId: number, exerciseId: string, isCorrect: boolean) => {
    setExerciseAttempts(prev => ({
      ...prev,
      [`${unitId}-${exerciseId}`]: isCorrect
    }));
    if (isCorrect) {
      setUserXp(prev => prev + 5);
    }
  };

  // Record a quiz result
  const handleRecordQuizResult = (unitId: number, score: number, total: number) => {
    setQuizResults(prev => ({
      ...prev,
      [unitId]: {
        score,
        total,
        timestamp: Date.now()
      }
    }));
    setUserXp(prev => prev + (score * 5));
    setUserGems(prev => prev + 10);
  };

  // Reset all user progress
  const handleResetProgress = () => {
    setCompletedUnits([]);
    setQuizResults({});
    setExerciseAttempts({});
    setUserXp(0);
    setUserGems(500);
    setUserHearts(5);
    localStorage.removeItem(STORAGE_KEY_COMPLETED);
    localStorage.removeItem(STORAGE_KEY_QUIZ);
    localStorage.removeItem(STORAGE_KEY_EXERCISES);
    localStorage.removeItem(STORAGE_KEY_XP);
  };

  // Navigation handlers
  const handleSelectUnit = (unit: UnitData) => {
    setSelectedUnit(unit);
  };

  const handleSelectTab = (tab: TabType, mode?: ExerciseSectionMode) => {
    setActiveTab(tab);
    if (mode) {
      setExerciseMode(mode);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToExercises = (unit: UnitData) => {
    setSelectedUnit(unit);
    setExerciseMode('grammar');
    setActiveTab('exercises');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToQuiz = (unit: UnitData) => {
    setSelectedUnit(unit);
    setActiveTab('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEarnGameRewards = (xp: number, gems: number) => {
    setUserXp(prev => {
      const next = prev + xp;
      localStorage.setItem(STORAGE_KEY_XP, next.toString());
      return next;
    });
    setUserGems(prev => {
      const next = prev + gems;
      localStorage.setItem(STORAGE_KEY_GEMS, next.toString());
      return next;
    });
  };

  const handleNavigateToUnitFromDiagnostic = (unit: UnitData) => {
    setSelectedUnit(unit);
    setActiveTab('learn');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-800 flex flex-col font-sans selection:bg-[#D7FFB8]">
      
      {/* Top App Header (Visible only on mobile/tablet) */}
      <header className="lg:hidden sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b-2 border-[#E5E5E5] px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-xs">
        
        {/* Left: Mobile Toggle & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            id="mobile-duo-menu-btn"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* KAFA Wordmark */}
          <div 
            onClick={() => handleSelectTab('learn')}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <span className="font-black text-xl sm:text-2xl tracking-tight text-[#58CC02] uppercase leading-none">
              KAFA
            </span>
            <span className="px-1.5 py-0.5 bg-[#58CC02] text-white text-[9px] font-black uppercase rounded-md tracking-wider">
              FREE
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-bold text-slate-400 pl-3 border-l-2 border-slate-200">
            <span className="text-slate-700 font-extrabold uppercase tracking-wide">English Learning System</span>
            <span className="text-[10px] font-khmer text-slate-400">ប្រព័ន្ធរៀនភាសាអង់គ្លេសឥតគិតថ្លៃ</span>
          </div>
        </div>

        {/* Right: Quick Stats Row (Flag, Streak, Gems, Hearts) */}
        <div className="flex items-center gap-1.5 sm:gap-3 text-xs font-black">
          {/* Bilingual Support is active permanently by default */}

          {/* Streak */}
          <div 
            onClick={() => handleSelectTab('profile')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[#FF9600] hover:bg-[#FFF4E5] transition-colors cursor-pointer border border-transparent hover:border-[#FFD299]"
            title="Current Streak"
          >
            <Flame className="w-4 h-4 fill-current" />
            <span>{streakDays}</span>
          </div>

          {/* Gems */}
          <div 
            onClick={() => handleSelectTab('shop')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[#1CB0F6] hover:bg-[#E5F7FF] transition-colors cursor-pointer border border-transparent hover:border-[#BDE8FF]"
            title="Gems Store"
          >
            <span className="text-sm leading-none">💎</span>
            <span>{userGems}</span>
          </div>

          {/* Hearts */}
          <div 
            onClick={() => handleSelectTab('shop')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[#FF4B4B] hover:bg-[#FFE5E5] transition-colors cursor-pointer border border-transparent hover:border-[#FFB3B3]"
            title="Hearts (Practice Health)"
          >
            <Heart className="w-4 h-4 fill-current" />
            <span>{userHearts}</span>
          </div>

        </div>
      </header>

      {/* Main Full-Screen Layout (Left Sidebar + Expansive Big-Screen Center) */}
      <div className="flex-1 flex w-full">
        
        {/* Column 1: Left Persistent Sidebar */}
        <DuolingoLeftSidebar
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
          isAudioEnabled={isAudioEnabled}
          onToggleAudio={handleToggleAudio}
          completedUnitsCount={completedUnits.length}
          totalUnitsCount={grammarUnits.length}
        />

        {/* Column 2: Center Main Content View (Big Screen Wide Layout) */}
        <main className="flex-1 min-w-0 min-h-screen py-6 px-3 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto">
          {/* Global Desktop Header & Blue Monkey Mascot */}
          <DesktopHeader
            streakDays={streakDays}
            userGems={userGems}
            userHearts={userHearts}
            activeTab={activeTab}
            onSelectTab={handleSelectTab}
            isFlipping={isMascotFlipping}
          />
          
          {/* 1. Duolingo Stepping Path Learning View */}
          {activeTab === 'learn' && (
            <DuolingoPathView
              currentUnit={selectedUnit}
              allUnits={grammarUnits}
              onSelectUnit={handleSelectUnit}
              completedUnits={completedUnits}
              onUnitCompleted={handleUnitCompleted}
              onSelectTab={handleSelectTab}
              userHearts={userHearts}
              onHeartLost={handleHeartLost}
            />
          )}

          {/* 2. Full Grammar Lessons Directory (145 Units) */}
          {activeTab === 'lessons' && (
            <div className="w-full">
              <LessonView
                units={grammarUnits}
                selectedUnit={selectedUnit}
                onSelectUnit={handleSelectUnit}
                completedUnits={completedUnits}
                onToggleComplete={handleToggleComplete}
                onGoToExercises={handleGoToExercises}
                onGoToQuiz={handleGoToQuiz}
                searchQuery={searchQuery}
                selectedLevel={selectedLevel}
              />
            </div>
          )}

          {/* 3. Academic Writing Masterclass */}
          {activeTab === 'academic-writing' && (
            <div className="w-full">
              <AcademicWritingView 
                onGoToGrammarLessons={() => setActiveTab('lessons')}
              />
            </div>
          )}

          {/* 4. Reading Comprehension Stories */}
          {activeTab === 'reading' && (
            <div className="w-full">
              <ReadingView 
                onGoToExercises={() => handleSelectTab('exercises', 'reading')}
              />
            </div>
          )}

          {/* 5. Practice Exercises Hub */}
          {activeTab === 'exercises' && (
            <div className="w-full">
              <ExerciseView
                key={exerciseMode}
                initialMode={exerciseMode}
                units={grammarUnits}
                selectedUnit={selectedUnit}
                onSelectUnit={handleSelectUnit}
                onRecordAnswer={handleRecordAnswer}
                onGoToQuiz={handleGoToQuiz}
              />
            </div>
          )}

          {/* 6. Duolingo Leagues / Leaderboards */}
          {activeTab === 'leaderboards' && (
            <div className="max-w-4xl mx-auto">
              <DuolingoLeaderboardsView
                userXp={userXp}
              />
            </div>
          )}

          {/* 7. Daily Quests & Badge Challenges */}
          {activeTab === 'quests' && (
            <div className="max-w-4xl mx-auto">
              <DuolingoQuestsView
                userXp={userXp}
                onClaimReward={handleClaimReward}
              />
            </div>
          )}

          {/* 8. Duolingo Shop & Power-ups */}
          {activeTab === 'shop' && (
            <div className="max-w-4xl mx-auto">
              <DuolingoShopView
                gems={userGems}
                hearts={userHearts}
                streakDays={streakDays}
                onBuyItem={handleBuyShopItem}
              />
            </div>
          )}

          {/* 9. Duolingo Profile & Achievements */}
          {activeTab === 'profile' && (
            <div className="max-w-4xl mx-auto">
              <DuolingoProfileView
                totalXp={userXp}
                streakDays={streakDays}
                completedUnitsCount={completedUnits.length}
                gems={userGems}
                onUserChanged={() => {
                  const current = userStore.getCurrentUser();
                  setUserXp(current.totalXp);
                  setUserGems(current.gems);
                  setUserHearts(current.hearts);
                  setStreakDays(current.streakDays);
                }}
              />
            </div>
          )}

          {/* 10. Secondary Tools: Quiz */}
          {activeTab === 'quiz' && (
            <div className="w-full">
              <QuizView
                units={grammarUnits}
                initialUnit={selectedUnit}
                onNavigateToUnit={handleNavigateToUnitFromDiagnostic}
                onRecordQuizResult={handleRecordQuizResult}
              />
            </div>
          )}

          {/* 11. Study Guide Diagnostic */}
          {activeTab === 'study-guide' && (
            <div className="w-full">
              <StudyGuideView
                units={grammarUnits}
                onNavigateToUnit={handleNavigateToUnitFromDiagnostic}
              />
            </div>
          )}

          {/* 12. Vocabulary & Irregular Verbs Hub */}
          {(activeTab === 'vocabulary' || activeTab === 'irregular-verbs') && (
            <div className="w-full">
              <VocabularyView />
            </div>
          )}

          {/* 13. 7-Day All-Level Game Arena */}
          {activeTab === 'games' && (
            <div className="w-full">
              <GamesView 
                userXp={userXp}
                userGems={userGems}
                onEarnRewards={handleEarnGameRewards}
                onGoToGrammar={() => setActiveTab('lessons')}
                onGoToWriting={() => setActiveTab('academic-writing')}
                onGoToReading={() => setActiveTab('reading')}
                onGoToVocabulary={() => setActiveTab('vocabulary')}
              />
            </div>
          )}

          {/* 14. Statistics Dashboard */}
          {activeTab === 'progress' && (
            <div className="w-full">
              <ProgressDashboard
                units={grammarUnits}
                completedUnits={completedUnits}
                quizResults={quizResults}
                exerciseAttempts={exerciseAttempts}
                onNavigateToUnit={handleNavigateToUnitFromDiagnostic}
                onResetProgress={handleResetProgress}
              />
            </div>
          )}

          {/* 15. AI Tutor & Search */}
          {activeTab === 'ai-tutor' && (
            <div className="w-full h-full">
              <AITutorView 
                onSelectUnit={handleSelectUnit}
                onNavigateToTab={handleSelectTab}
              />
            </div>
          )}

        </main>

      </div>

    </div>
  );
}
