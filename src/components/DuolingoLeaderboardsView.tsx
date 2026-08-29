import React from 'react';
import { Shield, Trophy, Flame, Sparkles, ChevronUp, ChevronDown, Award } from 'lucide-react';
import { DuoMascot } from './DuoMascot';

interface DuolingoLeaderboardsViewProps {
  userXp: number;
  userName?: string;
}

export const DuolingoLeaderboardsView: React.FC<DuolingoLeaderboardsViewProps> = ({
  userXp = 120,
  userName = 'You (អ្នក)'
}) => {
  const leagueName = 'Bronze League';
  const leagueKhmer = 'លីគសំរឹទ្ធ';

  const rankings = [
    { rank: 1, name: 'Sophea Kim', avatar: '👩‍🏫', xp: 480, isUser: false },
    { rank: 2, name: 'David Miller', avatar: '👨‍💼', xp: 410, isUser: false },
    { rank: 3, name: 'Vireak Meas', avatar: '👨‍🎓', xp: 350, isUser: false },
    { rank: 4, name: 'Elena Rostova', avatar: '👩‍🎨', xp: 290, isUser: false },
    { rank: 5, name: userName, avatar: '👑', xp: Math.max(userXp, 260), isUser: true },
    { rank: 6, name: 'Bopha Chan', avatar: '👩‍🔬', xp: 210, isUser: false },
    { rank: 7, name: 'Lucas Silva', avatar: '🧑‍💻', xp: 180, isUser: false },
    { rank: 8, name: 'Socheata Pich', avatar: '👩‍⚕️', xp: 150, isUser: false },
    { rank: 9, name: 'Kenji Sato', avatar: '👨‍🍳', xp: 110, isUser: false },
    { rank: 10, name: 'Rithy Seng', avatar: '👨‍✈️', xp: 90, isUser: false },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 select-none space-y-6">
      
      {/* Top League Shield Banner */}
      <div className="bg-gradient-to-r from-[#D97706] to-[#F59E0B] rounded-3xl p-6 text-white shadow-sm border-b-4 border-[#B45309] flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-200">
            <Trophy className="w-4 h-4" />
            <span>WEEKLY COMPETITION</span>
          </div>
          <h1 className="text-2xl font-extrabold">
            {leagueName}
          </h1>
          <p className="text-sm font-khmer text-amber-100">
            {leagueKhmer} • កំពូល ៧ នាក់នឹងឡើងទៅកាន់ Silver League (Top 7 advance)
          </p>
        </div>

        <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl shadow-inner shrink-0">
          🛡️
        </div>
      </div>

      {/* Promotion Status Box */}
      <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-4 flex items-center gap-3 text-emerald-800">
        <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-sm font-black shrink-0">
          <ChevronUp className="w-5 h-5 stroke-[3]" />
        </div>
        <div className="text-xs">
          <span className="font-extrabold block">PROMOTION ZONE (តំបន់ឡើងលីគ)</span>
          <span className="text-slate-600 font-khmer">អ្នកស្ថិតក្នុងចំណាត់ថ្នាក់លេខ ៥! រក្សាពិន្ទុនេះដើម្បីឡើងលីគបន្ទាប់។</span>
        </div>
      </div>

      {/* Leaderboard Table List */}
      <div className="bg-white rounded-3xl border-2 border-[#E5E5E5] overflow-hidden shadow-xs divide-y divide-slate-100">
        {rankings.map((item) => {
          const isTop3 = item.rank <= 3;
          const isUser = item.isUser;

          return (
            <div 
              key={item.rank}
              className={`flex items-center justify-between p-4 transition-colors ${
                isUser 
                  ? 'bg-[#DDF4FF] font-extrabold border-l-4 border-l-[#1CB0F6]' 
                  : 'hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Rank Number */}
                <div className="w-7 text-center">
                  {item.rank === 1 ? (
                    <span className="text-lg">🥇</span>
                  ) : item.rank === 2 ? (
                    <span className="text-lg">🥈</span>
                  ) : item.rank === 3 ? (
                    <span className="text-lg">🥉</span>
                  ) : (
                    <span className="text-sm font-extrabold text-slate-400">
                      {item.rank}
                    </span>
                  )}
                </div>

                {/* Avatar & Name */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-xl shrink-0">
                    {item.avatar}
                  </div>
                  <div>
                    <span className={`text-sm ${isUser ? 'text-[#1899D6] font-black' : 'font-extrabold text-slate-800'}`}>
                      {item.name}
                    </span>
                    {isUser && (
                      <span className="block text-[10px] text-[#1CB0F6] uppercase tracking-wider font-bold">
                        Your Current Rank
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* XP Count */}
              <div className="text-right">
                <span className="text-sm font-extrabold text-slate-700">
                  {item.xp} XP
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
