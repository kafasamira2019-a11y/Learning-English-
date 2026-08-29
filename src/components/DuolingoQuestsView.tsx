import React, { useState } from 'react';
import { Award, Zap, BookOpen, Target, Sparkles, Check, Gift } from 'lucide-react';
import { DuolingoQuest } from '../types';
import { soundManager } from '../utils/sound';
import { DuoMascot } from './DuoMascot';

interface DuolingoQuestsViewProps {
  userXp: number;
  onClaimReward: (xp: number, gems: number) => void;
}

export const DuolingoQuestsView: React.FC<DuolingoQuestsViewProps> = ({
  userXp,
  onClaimReward
}) => {
  const [quests, setQuests] = useState<DuolingoQuest[]>([
    {
      id: 'quest-1',
      titleEn: 'Earn 10 XP in Lessons',
      titleKh: 'ទទួលបាន ១០ XP ពីការរៀន',
      current: Math.min(10, userXp),
      target: 10,
      rewardXp: 10,
      rewardGems: 15,
      completed: userXp >= 10,
      claimed: false,
      icon: '⚡'
    },
    {
      id: 'quest-2',
      titleEn: 'Complete 1 Grammar Unit (Murphy)',
      titleKh: 'បញ្ចប់មេរៀនវេយ្យាករណ៍ ១ Unit',
      current: 1,
      target: 1,
      rewardXp: 15,
      rewardGems: 20,
      completed: true,
      claimed: false,
      icon: '📚'
    },
    {
      id: 'quest-3',
      titleEn: 'Score 90% or higher on a Practice Quiz',
      titleKh: 'ធ្វើតេស្ត Quiz ទទួលបានពិន្ទុ ៩០% ឡើង',
      current: 1,
      target: 1,
      rewardXp: 20,
      rewardGems: 30,
      completed: true,
      claimed: false,
      icon: '🎯'
    },
    {
      id: 'quest-4',
      titleEn: 'Practice Academic Writing Structure',
      titleKh: 'ហាត់តែងនិពន្ធស្រាវជ្រាវបែប Academic',
      current: 0,
      target: 1,
      rewardXp: 15,
      rewardGems: 20,
      completed: false,
      claimed: false,
      icon: '📝'
    }
  ]);

  const handleClaim = (questId: string) => {
    const q = quests.find(item => item.id === questId);
    if (!q || q.claimed || !q.completed) return;

    soundManager.playCorrect();
    onClaimReward(q.rewardXp, q.rewardGems);

    setQuests(prev => prev.map(item => {
      if (item.id === questId) {
        return { ...item, claimed: true };
      }
      return item;
    }));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 select-none space-y-6">
      
      {/* Top Banner: Monthly Duo Quest Challenge */}
      <div className="bg-[#FF9600] rounded-3xl p-6 text-white shadow-sm border-b-4 border-[#E58500] flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-100">
            <Award className="w-4 h-4" />
            <span>MONTHLY CHALLENGE</span>
          </div>
          <h1 className="text-2xl font-extrabold">
            August Quest Badge
          </h1>
          <p className="text-sm font-khmer text-amber-100">
            បញ្ចប់ ២០ បេសកកម្មដើម្បីទទួលបានផ្លាកសញ្ញា Duo មាស<br/>
            <span className="font-sans text-[11px] opacity-80">(Complete 20 quests to earn the Gold Duo badge)</span>
          </p>
          <div className="pt-2 flex items-center gap-3">
            <div className="w-44 bg-black/20 h-3 rounded-full overflow-hidden">
              <div className="bg-white h-full rounded-full w-[65%]" />
            </div>
            <span className="text-xs font-extrabold">13 / 20</span>
          </div>
        </div>

        <div className="w-16 h-16 shrink-0 flex items-center justify-center">
          <DuoMascot pose="happy" size={72} />
        </div>
      </div>

      {/* Daily Quests List */}
      <div className="space-y-3">
        <h3 className="text-base font-extrabold text-slate-800">
          Today&apos;s Quests (បេសកកម្មថ្ងៃនេះ)
        </h3>

        <div className="space-y-3">
          {quests.map((q) => {
            const pct = Math.min(100, Math.round((q.current / q.target) * 100));

            return (
              <div 
                key={q.id}
                className="bg-white rounded-2xl p-5 border-2 border-[#E5E5E5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-2xl shrink-0">
                    {q.icon}
                  </div>

                  <div className="space-y-1 flex-1">
                    <h4 className="text-sm font-extrabold text-slate-800">
                      {q.titleEn}
                    </h4>
                    <p className="text-xs font-khmer text-slate-500">
                      {q.titleKh}
                    </p>

                    {/* Progress Bar */}
                    <div className="flex items-center gap-3 pt-1">
                      <div className="flex-1 bg-[#E5E5E5] h-3 rounded-full overflow-hidden">
                        <div 
                          className="bg-[#58CC02] h-full rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-xs font-extrabold text-slate-400">
                        {q.current} / {q.target}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Reward / Claim Button */}
                <div className="shrink-0 w-full sm:w-auto">
                  {q.claimed ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                      <Check className="w-4 h-4" />
                      <span>CLAIMED</span>
                    </span>
                  ) : q.completed ? (
                    <button
                      onClick={() => handleClaim(q.id)}
                      className="w-full sm:w-auto px-5 py-2.5 bg-[#FFC800] hover:bg-[#E5A500] active:translate-y-0.5 text-white text-xs font-black uppercase tracking-wider rounded-xl border-b-4 border-[#E5A500] active:border-b-0 shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5 animate-bounce"
                    >
                      <Gift className="w-4 h-4" />
                      <span>CLAIM +{q.rewardGems} 💎</span>
                    </button>
                  ) : (
                    <div className="text-xs font-extrabold text-slate-400 flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded-xl">
                      <span>Reward:</span>
                      <span className="text-[#1CB0F6]">+{q.rewardGems} 💎</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
