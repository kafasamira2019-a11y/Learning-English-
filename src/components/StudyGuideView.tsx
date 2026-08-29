import React, { useState } from 'react';
import { 
  Target, 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight,
  Filter,
  Layers,
  Sparkles
} from 'lucide-react';
import { studyGuideQuestions } from '../data/studyGuideQuiz';
import { DiagnosticQuestion, UnitData } from '../types';
import { soundManager } from '../utils/sound';

interface StudyGuideViewProps {
  units: UnitData[];
  onNavigateToUnit: (unit: UnitData) => void;
}

export const StudyGuideView: React.FC<StudyGuideViewProps> = ({
  units,
  onNavigateToUnit
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: string]: string[] }>({});
  const [checkedStatus, setCheckedStatus] = useState<{ [qId: string]: boolean }>({});

  const categories = ['All', ...Array.from(new Set(studyGuideQuestions.map(q => q.category)))];

  const filteredQuestions = selectedCategory === 'All' 
    ? studyGuideQuestions 
    : studyGuideQuestions.filter(q => q.category === selectedCategory);

  const toggleOption = (q: DiagnosticQuestion, optLabel: string) => {
    if (checkedStatus[q.id]) return;

    setSelectedAnswers(prev => {
      const current = prev[q.id] || [];
      if (current.includes(optLabel)) {
        return { ...prev, [q.id]: current.filter(l => l !== optLabel) };
      } else {
        return { ...prev, [q.id]: [...current, optLabel] };
      }
    });
  };

  const handleCheckQuestion = (q: DiagnosticQuestion) => {
    const userSelected = selectedAnswers[q.id] || [];
    if (userSelected.length === 0) return;

    // Check if userSelected matches correctAnswers
    const isExactMatch = 
      userSelected.length === q.correctAnswers.length &&
      userSelected.every(ans => q.correctAnswers.includes(ans));

    setCheckedStatus(prev => ({ ...prev, [q.id]: true }));

    if (isExactMatch) {
      soundManager.playCorrect();
    } else {
      soundManager.playIncorrect();
    }
  };

  const resetAll = () => {
    setSelectedAnswers({});
    setCheckedStatus({});
  };

  const totalAnswered = Object.keys(checkedStatus).length;
  const totalCorrect = studyGuideQuestions.filter(q => {
    if (!checkedStatus[q.id]) return false;
    const userSelected = selectedAnswers[q.id] || [];
    return userSelected.length === q.correctAnswers.length &&
      userSelected.every(ans => q.correctAnswers.includes(ans));
  }).length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Intro Banner */}
      <div className="bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 text-white rounded-3xl p-6 sm:p-8 shadow-md shadow-sky-100 relative overflow-hidden space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-2.5 bg-white/20 rounded-2xl backdrop-blur-xs">
            <Target className="w-6 h-6 text-amber-300" />
          </div>
          <span className="text-xs font-black uppercase tracking-wider text-sky-100">
            Official Study Guide (ការធ្វើតេស្តស្ទង់កម្រិត & រកចំណុចខ្វះខាត)
          </span>
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Study Guide Diagnostic Test
          </h1>
          <p className="text-sm sm:text-base text-sky-100 font-khmer font-medium">
            ធ្វើតេស្តស្វែងរកមេរៀនដែលអ្នកត្រូវរៀនបន្ថែម។ ប្រព័ន្ធនឹងប្រាប់ភ្លាមៗថាតើអ្នកត្រូវសិក្សា Unit ណាខ្លះ!<br/>
            <span className="font-sans text-xs opacity-80">(Take the test to find out your weak spots. The system will recommend specific units to study!)</span>
          </p>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
          <div className="px-3.5 py-1.5 bg-white/20 rounded-xl backdrop-blur-xs font-medium">
            សំណួរដែលបានធ្វើ៖ <span className="font-black text-amber-300">{totalAnswered} / {studyGuideQuestions.length}</span>
          </div>
          <div className="px-3.5 py-1.5 bg-white/20 rounded-xl backdrop-blur-xs font-medium">
            ឆ្លើយត្រូវ៖ <span className="font-black text-emerald-300">{totalCorrect}</span>
          </div>
          {totalAnswered > 0 && (
            <button
              onClick={resetAll}
              className="px-3.5 py-1.5 bg-white/20 hover:bg-white/30 rounded-xl font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>កំណត់ឡើងវិញ (Reset)</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        <Filter className="w-4 h-4 text-sky-500 shrink-0 ml-1" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-sky-500 text-white shadow-md shadow-sky-100'
                : 'bg-white border border-sky-200 text-slate-700 hover:bg-sky-50/70'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Questions Grid */}
      <div className="space-y-4">
        {filteredQuestions.map((q) => {
          const isChecked = checkedStatus[q.id];
          const userSelected = selectedAnswers[q.id] || [];
          const isCorrect = isChecked && 
            userSelected.length === q.correctAnswers.length &&
            userSelected.every(ans => q.correctAnswers.includes(ans));

          return (
            <div 
              key={q.id}
              className={`bg-white rounded-3xl p-6 border transition-all shadow-sm space-y-4 ${
                isChecked
                  ? isCorrect 
                    ? 'border-emerald-300 ring-2 ring-emerald-100' 
                    : 'border-rose-300 ring-2 ring-rose-100'
                  : 'border-sky-100 hover:border-sky-300'
              }`}
              id={`guide-q-${q.id}`}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-1 bg-sky-100 text-sky-900 font-black text-xs rounded-xl">
                    #{q.questionNumber}
                  </span>
                  <span className="text-xs text-slate-500 font-bold">
                    {q.category} ({q.khmerCategory})
                  </span>
                </div>

                {isChecked && (
                  <span className={`px-3 py-1 rounded-full text-xs font-black flex items-center gap-1 ${
                    isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    <span>{isCorrect ? 'ត្រឹមត្រូវ' : 'ខុស'}</span>
                  </span>
                )}
              </div>

              {/* Question Sentence */}
              <div className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {q.sentence}
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {q.options.map((opt) => {
                  const isSelected = userSelected.includes(opt.label);
                  const isCorrectAnswer = q.correctAnswers.includes(opt.label);

                  let btnClass = 'bg-white hover:bg-sky-50/50 border-slate-200 text-slate-800';

                  if (isChecked) {
                    if (isCorrectAnswer) {
                      btnClass = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                    } else if (isSelected) {
                      btnClass = 'bg-rose-50 border-rose-400 text-rose-950 line-through';
                    } else {
                      btnClass = 'bg-slate-50 text-slate-400 border-slate-200';
                    }
                  } else if (isSelected) {
                    btnClass = 'bg-sky-100 border-sky-500 text-sky-950 font-bold ring-2 ring-sky-200';
                  }

                  return (
                    <button
                      key={opt.label}
                      onClick={() => toggleOption(q, opt.label)}
                      disabled={isChecked}
                      className={`p-3.5 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 cursor-pointer ${btnClass}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-6 h-6 rounded-lg font-black text-xs flex items-center justify-center ${
                          isSelected ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {opt.label}
                        </span>
                        <span className="font-semibold">{opt.text}</span>
                      </div>
                      {isChecked && isCorrectAnswer && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                      {isChecked && isSelected && !isCorrectAnswer && <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Check Button */}
              {!isChecked ? (
                <div className="pt-2">
                  <button
                    onClick={() => handleCheckQuestion(q)}
                    disabled={userSelected.length === 0}
                    className="px-5 py-2.5 bg-sky-500 hover:bg-sky-600 disabled:opacity-40 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-md shadow-sky-100 transition-colors cursor-pointer"
                  >
                    ពិនិត្យមើលលទ្ធផល (Check Result)
                  </button>
                </div>
              ) : (
                /* Diagnostic Recommendation Box */
                <div className="p-5 rounded-2xl bg-sky-50/70 border border-sky-200 text-xs sm:text-sm space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-slate-800">
                      <span className="font-bold text-slate-900">ចម្លើយត្រឹមត្រូវ៖ </span>
                      <span className="font-bold text-sky-900 font-mono bg-white px-2.5 py-1 rounded-xl border border-sky-100">
                        {q.correctAnswers.map(ans => `${ans} (${q.options.find(o => o.label === ans)?.text})`).join(' ឬ ')}
                      </span>
                    </div>

                    {/* Target Units To Study Recommendation */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-slate-500 font-bold">មេរៀនដែលត្រូវរៀន (Study Unit):</span>
                      {q.targetUnits.map(unitNum => {
                        const targetUnit = units.find(u => u.unitNumber === unitNum);
                        return (
                          <button
                            key={unitNum}
                            onClick={() => {
                              if (targetUnit) onNavigateToUnit(targetUnit);
                            }}
                            className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-xl text-xs flex items-center gap-1 cursor-pointer transition-colors shadow-md shadow-orange-100"
                            title={`Go to Unit ${unitNum}`}
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>Unit {unitNum}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 space-y-1">
                    <p className="text-slate-700 text-xs font-medium">{q.explanation}</p>
                    <p className="text-slate-600 text-xs font-khmer">{q.khmerExplanation}</p>
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};
