import React from 'react';
import { X, Volume2, BookOpen, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { UnitData } from '../types';
import { soundManager } from '../utils/sound';

interface DuolingoGuidebookModalProps {
  unit: UnitData;
  isOpen: boolean;
  onClose: () => void;
  onStartLesson?: () => void;
}

export const DuolingoGuidebookModal: React.FC<DuolingoGuidebookModalProps> = ({
  unit,
  isOpen,
  onClose,
  onStartLesson
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl border-2 border-[#E5E5E5] shadow-2xl flex flex-col overflow-hidden"
        id="duo-guidebook-modal"
      >
        {/* Header with Green Duolingo Banner */}
        <div className="bg-[#58CC02] px-6 py-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-xl shadow-xs">
              📖
            </div>
            <div>
              <div className="text-[11px] font-black uppercase tracking-wider text-white/80">
                UNIT {unit.unitNumber} GUIDEBOOK
              </div>
              <h2 className="text-xl font-extrabold leading-tight">
                {unit.title}
              </h2>
              <div className="text-sm font-khmer text-white/90">
                {unit.khmerTitle}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-black/10 hover:bg-black/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            id="close-guidebook-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Key Grammar Summary */}
          <div className="bg-[#F7F7F7] p-4 rounded-2xl border-2 border-[#E5E5E5] space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FF9600]" />
              <span>Core Concept (គំនិតសំខាន់)</span>
            </h4>
            <p className="text-sm font-bold text-slate-800 leading-relaxed">
              {unit.summary}
            </p>
            <p className="text-xs font-khmer text-slate-600 leading-relaxed">
              {unit.khmerSummary}
            </p>
          </div>

          {/* Grammar Sections & Key Phrases */}
          <div className="space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <span>Key Phrases &amp; Rules</span>
              <span className="text-xs font-khmer font-normal text-slate-500">
                (ក្បួនវេយ្យាករណ៍ និងឃ្លាគំរូ)
              </span>
            </h3>

            {unit.sections && unit.sections.map((sec, idx) => (
              <div 
                key={idx}
                className="border-2 border-[#E5E5E5] rounded-2xl p-4 space-y-3 hover:border-[#1CB0F6]/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h5 className="font-extrabold text-base text-slate-800">
                      {sec.title}
                    </h5>
                    {sec.khmerTitle && (
                      <p className="text-sm font-khmer text-slate-500 mt-0.5">
                        {sec.khmerTitle}
                      </p>
                    )}
                  </div>
                </div>

                {sec.formula && (
                  <div className="px-3.5 py-2.5 bg-[#EAF7FF] border border-[#BDE8FF] rounded-xl text-sm font-mono font-bold text-[#0F75A8]">
                    {sec.formula}
                  </div>
                )}

                <div className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                  {sec.explanation}
                </div>
                <div className="text-sm sm:text-base font-khmer text-slate-600 leading-relaxed">
                  {sec.khmerExplanation}
                </div>

                {/* Example Sentences with Audio Button */}
                {sec.examples && sec.examples.length > 0 && (
                  <div className="pt-2 space-y-2">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                      Examples:
                    </span>
                    <div className="grid gap-2">
                      {sec.examples && sec.examples.map((ex, exIdx) => (
                        <div 
                          key={exIdx}
                          className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 hover:bg-slate-100 transition-colors"
                        >
                          <div className="space-y-0.5">
                            <p className="text-sm font-bold text-slate-900">
                              {ex.en}
                            </p>
                            <p className="text-xs sm:text-sm font-khmer text-slate-500">
                              {ex.kh}
                            </p>
                          </div>

                          <button
                            onClick={() => soundManager.speak(ex.en)}
                            className="w-8 h-8 rounded-lg bg-white border border-slate-200 hover:bg-[#DDF4FF] hover:border-[#1CB0F6] flex items-center justify-center text-[#1CB0F6] transition-colors cursor-pointer shrink-0"
                            title="Listen to audio pronunciation"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>

        {/* Footer Action */}
        <div className="p-4 bg-slate-50 border-t-2 border-[#E5E5E5] flex items-center justify-between shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            CLOSE
          </button>

          {onStartLesson && (
            <button
              onClick={() => {
                onClose();
                onStartLesson();
              }}
              className="px-6 py-3 bg-[#58CC02] hover:bg-[#46A302] active:translate-y-0.5 text-white text-xs font-black uppercase tracking-wider rounded-2xl border-b-4 border-[#58A700] active:border-b-0 shadow-sm transition-all cursor-pointer flex items-center gap-2"
              id="guidebook-start-practice-btn"
            >
              <span>PRACTICE THIS UNIT (+10 XP)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
