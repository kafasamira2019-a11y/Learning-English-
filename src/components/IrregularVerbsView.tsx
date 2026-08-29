import React, { useState } from 'react';
import { 
  Search, 
  Volume2, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  RotateCcw,
  Check
} from 'lucide-react';
import { irregularVerbsList } from '../data/irregularVerbs';
import { IrregularVerb } from '../types';
import { soundManager } from '../utils/sound';

export const IrregularVerbsView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('ALL');
  const [isTestMode, setIsTestMode] = useState(false);

  // Test Mode state
  const [testVerbIndex, setTestVerbIndex] = useState(0);
  const [inputPast, setInputPast] = useState('');
  const [inputParticiple, setInputParticiple] = useState('');
  const [testResult, setTestResult] = useState<{ checked: boolean; isPastOk: boolean; isPartOk: boolean } | null>(null);
  const [testScore, setTestScore] = useState(0);

  const alphabet = ['ALL', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

  const filteredVerbs = irregularVerbsList.filter(v => {
    const matchesSearch = 
      v.infinitive.toLowerCase().includes(search.toLowerCase()) ||
      v.pastSimple.toLowerCase().includes(search.toLowerCase()) ||
      v.pastParticiple.toLowerCase().includes(search.toLowerCase()) ||
      v.meaningKh.includes(search);

    const matchesLetter = selectedLetter === 'ALL' || v.infinitive.toUpperCase().startsWith(selectedLetter);
    return matchesSearch && matchesLetter;
  });

  const currentTestVerb = irregularVerbsList[testVerbIndex % irregularVerbsList.length];

  const handleCheckTest = () => {
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

  const handleNextTest = () => {
    setTestVerbIndex(i => i + 1);
    setInputPast('');
    setInputParticiple('');
    setTestResult(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-sky-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-sky-100 text-sky-900 font-black text-xs rounded-xl">
              Appendix 1.4
            </span>
            <span className="text-xs text-slate-500 font-bold">{irregularVerbsList.length} Common Verbs</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
            Irregular Verbs Dictionary & Trainer
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-khmer">
            តារាងកិរិយាសព្ទមិនប្រក្រតី (Infinitive, Past Simple, Past Participle) ជាមួយការបញ្ចេញសំឡេង និងការបកប្រែ
          </p>
        </div>

        <button
          onClick={() => {
            setIsTestMode(!isTestMode);
            setTestResult(null);
            setInputPast('');
            setInputParticiple('');
          }}
          className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md ${
            isTestMode 
              ? 'bg-slate-800 text-white hover:bg-slate-900' 
              : 'bg-sky-500 text-white hover:bg-sky-600 shadow-sky-100'
          }`}
          id="toggle-verb-trainer-btn"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isTestMode ? 'ត្រឡប់ទៅតារាង (View Table)' : 'លេងតេស្តអនុវត្ត (Verb Trainer)'}</span>
        </button>
      </div>

      {/* Interactive Verb Trainer Quiz Mode */}
      {isTestMode && currentTestVerb && (
        <div className="bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50 rounded-3xl p-6 sm:p-8 border border-sky-200 shadow-md space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-sky-900 tracking-wider">
              Irregular Verb Speed Test
            </span>
            <span className="px-3.5 py-1.5 bg-white text-sky-900 font-black rounded-xl border border-sky-200 text-xs shadow-xs">
              Score: {testScore}
            </span>
          </div>

          {/* Verb Prompt */}
          <div className="bg-white p-7 rounded-3xl border border-sky-100 text-center space-y-2 shadow-xs">
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
                className={`w-full px-4 py-3 rounded-2xl border text-sm focus:outline-hidden font-semibold ${
                  testResult?.checked 
                    ? testResult.isPastOk 
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-950' 
                      : 'bg-rose-50 border-rose-400 text-rose-950'
                    : 'bg-white border-slate-300 focus:ring-2 focus:ring-sky-400'
                }`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !testResult?.checked) handleCheckTest();
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
                className={`w-full px-4 py-3 rounded-2xl border text-sm focus:outline-hidden font-semibold ${
                  testResult?.checked 
                    ? testResult.isPartOk 
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-950' 
                      : 'bg-rose-50 border-rose-400 text-rose-950'
                    : 'bg-white border-slate-300 focus:ring-2 focus:ring-sky-400'
                }`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !testResult?.checked) handleCheckTest();
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
                onClick={handleCheckTest}
                disabled={!inputPast && !inputParticiple}
                className="px-6 py-3 bg-sky-500 hover:bg-sky-600 disabled:opacity-40 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-md shadow-sky-100 transition-colors cursor-pointer"
              >
                ផ្ទៀងផ្ទាត់ (Check Answers)
              </button>
            ) : (
              <button
                onClick={handleNextTest}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-md transition-colors cursor-pointer"
              >
                ពាក្យបន្ទាប់ (Next Verb &rarr;)
              </button>
            )}
          </div>
        </div>
      )}

      {/* Search & Alphabet Filter */}
      {!isTestMode && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-sky-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ស្វែងរកកិរិយាសព្ទ / Search verb, past form, meaning..."
                className="w-full pl-11 pr-4 py-3 text-sm bg-white border border-sky-100 rounded-2xl focus:ring-2 focus:ring-sky-500 focus:outline-hidden shadow-xs"
              />
            </div>
          </div>

          {/* Letter filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {alphabet.map((letter) => (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                className={`min-w-[32px] h-8 px-2 rounded-xl text-xs font-black shrink-0 transition-all cursor-pointer ${
                  selectedLetter === letter
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-100'
                    : 'bg-white border border-sky-100 text-slate-700 hover:bg-sky-50'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-3xl border border-sky-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-sky-50/70 text-slate-700 text-xs uppercase font-black border-b border-sky-100">
                  <tr>
                    <th className="py-4 px-5">Infinitive (Base)</th>
                    <th className="py-4 px-5">Past Simple (V2)</th>
                    <th className="py-4 px-5">Past Participle (V3)</th>
                    <th className="py-4 px-5">Khmer Meaning / ន័យ</th>
                    <th className="py-4 px-4 text-center">Audio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sky-50">
                  {filteredVerbs.map((v, idx) => (
                    <tr key={idx} className="hover:bg-sky-50/50 transition-colors">
                      <td className="py-3.5 px-5 font-black text-slate-900">{v.infinitive}</td>
                      <td className="py-3.5 px-5 font-mono text-sky-700 font-bold">{v.pastSimple}</td>
                      <td className="py-3.5 px-5 font-mono text-indigo-700 font-bold">{v.pastParticiple}</td>
                      <td className="py-3.5 px-5 text-slate-600 font-khmer text-xs sm:text-sm font-medium">{v.meaningKh}</td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => soundManager.speak(`${v.infinitive}, ${v.pastSimple}, ${v.pastParticiple}`)}
                          title={`Listen to ${v.infinitive}`}
                          className="p-2 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-xl transition-colors inline-flex items-center justify-center cursor-pointer"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredVerbs.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-400 text-sm">
                        រកមិនឃើញកិរិយាសព្ទដែលត្រូវគ្នានឹង "{search}" ឡើយ
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
