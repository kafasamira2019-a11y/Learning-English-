import React from 'react';
import { 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  RotateCcw, 
  Flame, 
  ArrowRight,
  BarChart3
} from 'lucide-react';
import { UnitData } from '../types';

interface ProgressDashboardProps {
  units: UnitData[];
  completedUnits: number[];
  quizResults: { [unitId: number]: { score: number; total: number; timestamp: number } };
  exerciseAttempts: { [key: string]: boolean };
  onNavigateToUnit: (unit: UnitData) => void;
  onResetProgress: () => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  units,
  completedUnits,
  quizResults,
  exerciseAttempts,
  onNavigateToUnit,
  onResetProgress
}) => {
  const totalUnits = units.length;
  const completedCount = completedUnits.length;
  const unitProgressPercent = Math.round((completedCount / totalUnits) * 100);

  const totalExercises = units.reduce((acc, u) => acc + u.exercises.length, 0);
  const attemptedExerciseKeys = Object.keys(exerciseAttempts);
  const totalCorrectExercises = Object.values(exerciseAttempts).filter(Boolean).length;
  const exerciseAccuracy = attemptedExerciseKeys.length > 0 
    ? Math.round((totalCorrectExercises / attemptedExerciseKeys.length) * 100) 
    : 0;

  const quizKeys = Object.keys(quizResults);
  const quizList = Object.values(quizResults) as { score: number; total: number; timestamp: number }[];
  const totalQuizScore = quizList.reduce((acc, q) => acc + q.score, 0);
  const totalQuizQuestions = quizList.reduce((acc, q) => acc + q.total, 0);
  const quizAccuracy = totalQuizQuestions > 0 
    ? Math.round((totalQuizScore / totalQuizQuestions) * 100) 
    : 0;

  // Level breakdowns
  const levels = [
    { id: 'elementary', label: 'Basic / Elementary', kh: 'កម្រិតមូលដ្ឋាន', color: 'emerald' },
    { id: 'intermediate', label: 'Intermediate', kh: 'កម្រិតមធ្យម', color: 'blue' },
    { id: 'advanced', label: 'Advanced', kh: 'កម្រិតខ្ពស់', color: 'purple' },
  ] as const;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 text-white rounded-3xl p-6 sm:p-8 shadow-md shadow-sky-100 relative overflow-hidden space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-white/20 rounded-2xl backdrop-blur-xs">
                <Flame className="w-5 h-5 text-amber-300 fill-amber-300" />
              </span>
              <span className="text-xs font-black uppercase tracking-wider text-sky-100">
                Learning Journey / ដំណើរការសិក្សា
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              វឌ្ឍនភាពវេយ្យាករណ៍របស់អ្នក (Your Progress)
            </h1>
            <p className="text-sm text-sky-100 font-khmer font-medium">
              តាមដានការរៀនមេរៀន លំហាត់ដែលបានធ្វើ និងលទ្ធផលតេស្ត Quiz ភ្លាមៗ
            </p>
          </div>

          <button
            onClick={() => {
              if (window.confirm('តើអ្នកពិតជាចង់កំណត់វឌ្ឍនភាពឡើងវិញមែនទេ? (Reset Progress)')) {
                onResetProgress();
              }
            }}
            className="px-4 py-2.5 bg-white/20 hover:bg-white/30 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto border border-white/20 shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Data</span>
          </button>
        </div>

        {/* Global Progress Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-slate-900">
          <div className="bg-white/95 backdrop-blur-md p-4 rounded-3xl border border-white/40 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-bold">មេរៀនរៀនចប់</span>
              <BookOpen className="w-4 h-4 text-sky-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1">
              {completedCount} <span className="text-xs font-normal text-slate-400">/ {totalUnits}</span>
            </div>
            <div className="text-[11px] text-sky-600 font-black mt-1">
              {unitProgressPercent}% បានបញ្ចប់
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-md p-4 rounded-3xl border border-white/40 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-bold">លំហាត់អនុវត្ត</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1">
              {attemptedExerciseKeys.length} <span className="text-xs font-normal text-slate-400">/ {totalExercises}</span>
            </div>
            <div className="text-[11px] text-emerald-600 font-black mt-1">
              {exerciseAccuracy}% ភាពត្រឹមត្រូវ
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-md p-4 rounded-3xl border border-white/40 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-bold">តេស្ត Quiz</span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1">
              {quizKeys.length} <span className="text-xs font-normal text-slate-400">ដង</span>
            </div>
            <div className="text-[11px] text-amber-600 font-black mt-1">
              {quizAccuracy}% មធ្យមភាគ
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-md p-4 rounded-3xl border border-white/40 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-bold">កម្រិតជំនាញ</span>
              <Award className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1">
              {completedCount >= 15 ? 'Expert' : completedCount >= 6 ? 'Scholar' : 'Learner'}
            </div>
            <div className="text-[11px] text-purple-600 font-black mt-1">
              Murphy 5th Ed.
            </div>
          </div>
        </div>
      </div>

      {/* Progress Breakdown by English Levels */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-sky-100 shadow-sm space-y-4">
        <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-sky-600" />
          <span>វឌ្ឍនភាពតាមកម្រិត (Progress by Level)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {levels.map((lvl) => {
            const levelUnits = units.filter(u => u.level === lvl.id);
            const levelCompleted = levelUnits.filter(u => completedUnits.includes(u.id)).length;
            const pct = levelUnits.length > 0 ? Math.round((levelCompleted / levelUnits.length) * 100) : 0;

            return (
              <div key={lvl.id} className="p-5 bg-sky-50/60 rounded-2xl border border-sky-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-black text-sm text-slate-800">{lvl.label}</span>
                  <span className="text-xs font-bold text-slate-600">{levelCompleted} / {levelUnits.length}</span>
                </div>
                <p className="text-xs text-slate-500 font-khmer">{lvl.kh}</p>
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      lvl.id === 'elementary' ? 'bg-emerald-500' :
                      lvl.id === 'intermediate' ? 'bg-sky-500' : 'bg-purple-600'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="text-[11px] font-black text-slate-700 text-right">
                  {pct}% Completed
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Units Progress Grid Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-sky-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-black text-slate-900">
            ស្ថានភាពមេរៀននីមួយៗ (Units Status)
          </h2>
          <span className="text-xs text-slate-500 font-bold">ចុចលើមេរៀនដើម្បីចូលរៀន ឬធ្វើលំហាត់</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {units.map((unit) => {
            const isDone = completedUnits.includes(unit.id);
            const quizData = quizResults[unit.id];

            return (
              <div
                key={unit.id}
                onClick={() => onNavigateToUnit(unit)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-2 shadow-xs ${
                  isDone 
                    ? 'bg-emerald-50/60 border-emerald-200 hover:bg-emerald-50' 
                    : 'bg-white border-sky-100 hover:border-sky-300 hover:bg-sky-50/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 bg-sky-100 text-sky-800 text-[11px] font-black rounded-lg">
                      Unit {unit.unitNumber}
                    </span>
                    {isDone ? (
                      <span className="text-[11px] font-black text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>រៀនរួច</span>
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-bold">មិនទាន់រៀន</span>
                    )}
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 mt-1.5 line-clamp-1">
                    {unit.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-khmer line-clamp-1 mt-0.5">
                    {unit.khmerTitle}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span>{unit.exercises.length} លំហាត់</span>
                  {quizData && (
                    <span className="font-bold text-orange-600">Quiz: {quizData.score}/{quizData.total}</span>
                  )}
                  <span className="text-sky-600 font-black flex items-center gap-0.5">
                    <span>រៀន</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
