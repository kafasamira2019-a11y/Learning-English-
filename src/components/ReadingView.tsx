import React, { useState } from 'react';
import { 
  BookOpen, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  Sparkles, 
  Search, 
  Eye, 
  EyeOff, 
  ChevronRight, 
  Award, 
  Check, 
  RotateCcw,
  Languages,
  HelpCircle,
  Play,
  Pause,
  BookMarked
} from 'lucide-react';
import { ReadingWarmUp } from '../types';
import { readingWarmUps } from '../data/readingData';
import { soundManager } from '../utils/sound';

interface ReadingViewProps {
  onGoToExercises?: (warmUpId?: string) => void;
}

export const ReadingView: React.FC<ReadingViewProps> = ({ onGoToExercises }) => {
  const [selectedWarmUpId, setSelectedWarmUpId] = useState<string>(readingWarmUps[0].id);
  const [showKhmerTranslation, setShowKhmerTranslation] = useState<boolean>(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // In-lesson interactive question states
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const [checkedQuestions, setCheckedQuestions] = useState<{ [key: string]: boolean }>({});
  const [completedStories, setCompletedStories] = useState<string[]>([]);

  const currentStory = readingWarmUps.find(r => r.id === selectedWarmUpId) || readingWarmUps[0];

  const categories = ['all', ...Array.from(new Set(readingWarmUps.map(r => r.category)))];

  const filteredStories = readingWarmUps.filter(story => {
    if (selectedCategory === 'all') return true;
    return story.category === selectedCategory;
  });

  const handleSpeak = (text: string) => {
    setIsPlayingAudio(true);
    soundManager.speak(
      text,
      'en-US',
      0.85,
      () => setIsPlayingAudio(false),
      () => setIsPlayingAudio(false)
    );
  };

  const handleStopAudio = () => {
    soundManager.stopSpeaking();
    setIsPlayingAudio(false);
  };

  const handleSelectOption = (questionId: string, optionLabel: string) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: optionLabel }));
  };

  const handleCheckAnswer = (questionId: string, isCorrect: boolean) => {
    setCheckedQuestions(prev => ({ ...prev, [questionId]: true }));
    if (isCorrect) {
      soundManager.playCorrect();
    } else {
      soundManager.playIncorrect();
    }
  };

  const toggleStoryCompleted = (id: string) => {
    setCompletedStories(prev => 
      prev.includes(id) ? prev.filter(sId => sId !== id) : [...prev, id]
    );
    soundManager.playComplete();
  };

  const isCurrentStoryDone = completedStories.includes(currentStory.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg shadow-emerald-200/50 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-xl text-xs font-black uppercase tracking-wider">
              Grade 1 Daily Reading Practice
            </span>
            <span className="px-3 py-1 bg-amber-400 text-slate-900 rounded-xl text-xs font-black">
              Teacher Created Resources
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
            Daily Reading Lessons & Comprehension
          </h1>
          <p className="text-sm sm:text-base text-emerald-100 font-khmer leading-relaxed">
            អានអត្ថបទរឿង និងវិទ្យាសាស្ត្រពិត (Nonfiction & Fiction) ជាមួយសំឡេងបញ្ចេញសូត្រ ការបកប្រែជាភាសាខ្មែរ និងលំហាត់ឆ្លើយសំណួរស្វែងយល់ន័យ
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-emerald-100">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl">
              <BookOpen className="w-4 h-4 text-emerald-300" />
              <span>{readingWarmUps.length} Story Lessons</span>
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl">
              <Award className="w-4 h-4 text-amber-300" />
              <span>{completedStories.length}/{readingWarmUps.length} Read & Mastered</span>
            </span>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-white rounded-3xl p-3 sm:p-4 border border-emerald-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const label = cat === 'all' ? 'All Stories (ទាំងអស់)' : cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                    : 'bg-emerald-50/60 hover:bg-emerald-100 text-slate-700 border border-emerald-100'
                }`}
                id={`cat-filter-${cat.replace(/[^a-zA-Z0-9]/g, '-')}`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Reading Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Sidebar: Stories List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-emerald-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-black text-slate-900 text-sm">Reading Lessons</h3>
                <p className="text-[11px] text-slate-400 font-khmer">ជ្រើសរើសរឿងអាន</p>
              </div>
              <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl">
                {filteredStories.length} Stories
              </span>
            </div>

            <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1">
              {filteredStories.map((story) => {
                const isSelected = story.id === selectedWarmUpId;
                const isDone = completedStories.includes(story.id);

                return (
                  <button
                    key={story.id}
                    onClick={() => {
                      setSelectedWarmUpId(story.id);
                      setUserAnswers({});
                      setCheckedQuestions({});
                      handleStopAudio();
                    }}
                    className={`w-full text-left p-3.5 rounded-2xl transition-all flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50 border-2 border-emerald-300 text-emerald-950 shadow-xs'
                        : 'hover:bg-emerald-50/50 border border-slate-100 text-slate-700'
                    }`}
                    id={`reading-nav-item-${story.id}`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 mt-0.5 shadow-xs ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-emerald-200'
                        : isDone
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-emerald-100/60 text-emerald-800'
                    }`}>
                      {isDone ? <Check className="w-4 h-4" /> : story.warmUpNumber}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-black text-sm text-slate-900 truncate">
                          {story.title}
                        </span>
                        <span className="text-xs text-slate-400 shrink-0">
                          p.{story.pageNumber}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-khmer truncate mt-0.5">
                        {story.khmerTitle}
                      </p>
                      <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">
                        {story.category}
                      </span>
                    </div>

                    {isSelected && <ChevronRight className="w-4 h-4 text-emerald-600 shrink-0 self-center" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Active Reading Passage & Questions */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Header Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-100 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-emerald-600 text-white font-black text-xs rounded-xl shadow-xs">
                  Warm-Up {currentStory.warmUpNumber}
                </span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                  {currentStory.category}
                </span>
                <span className="text-xs text-slate-400">
                  Page {currentStory.pageNumber}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowKhmerTranslation(prev => !prev)}
                  title="បិទ/បើកការបកប្រែជាភាសាខ្មែរ"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-slate-700 border border-emerald-200 cursor-pointer"
                  id="toggle-reading-khmer-btn"
                >
                  {showKhmerTranslation ? <Eye className="w-3.5 h-3.5 text-emerald-600" /> : <EyeOff className="w-3.5 h-3.5 text-slate-400" />}
                  <span className="font-khmer">{showKhmerTranslation ? 'ខ្មែរ (On)' : 'English Only'}</span>
                </button>

                <button
                  onClick={() => toggleStoryCompleted(currentStory.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isCurrentStoryDone
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-xs'
                      : 'bg-slate-50 text-slate-600 hover:bg-emerald-50 border border-slate-200'
                  }`}
                  id="mark-reading-done-btn"
                >
                  <CheckCircle2 className={`w-4 h-4 ${isCurrentStoryDone ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span className="font-khmer">{isCurrentStoryDone ? 'បានរៀនចេះ' : 'សម្គាល់ថាបានរៀន'}</span>
                </button>
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {currentStory.title}
              </h2>
              {showKhmerTranslation && (
                <p className="text-base font-bold text-emerald-700 font-khmer mt-1">
                  {currentStory.khmerTitle}
                </p>
              )}
            </div>

            {/* Audio Reader Toolbar */}
            <div className="flex items-center justify-between p-3.5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>Listen to Story Narration:</span>
              </div>

              <div className="flex items-center gap-2">
                {!isPlayingAudio ? (
                  <button
                    onClick={() => handleSpeak(currentStory.passage)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                    id="play-story-audio-btn"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Read Aloud</span>
                  </button>
                ) : (
                  <button
                    onClick={handleStopAudio}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                    id="stop-story-audio-btn"
                  >
                    <Pause className="w-3.5 h-3.5 fill-current" />
                    <span>Stop Audio</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Reading Passage & Paragraph Translation Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-6">
            <h3 className="font-black text-slate-900 text-base flex items-center gap-2 border-b border-emerald-100 pb-3">
              <BookMarked className="w-4 h-4 text-emerald-600" />
              <span>Reading Passage</span>
            </h3>

            <div className="space-y-5">
              {currentStory.paragraphs && currentStory.paragraphs.map((para, pIdx) => (
                <div 
                  key={pIdx}
                  className="p-4 bg-emerald-50/30 rounded-2xl border border-emerald-100/70 space-y-2 hover:bg-emerald-50/60 transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-base sm:text-lg font-semibold text-slate-900 leading-relaxed font-sans">
                      {para.en}
                    </p>
                    <button
                      onClick={() => handleSpeak(para.en)}
                      title="Listen to this paragraph"
                      className="p-2 bg-white border border-emerald-200 rounded-xl text-emerald-700 hover:bg-emerald-50 shrink-0 cursor-pointer shadow-xs"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {showKhmerTranslation && (
                    <p className="text-sm sm:text-base text-emerald-950 font-khmer leading-relaxed border-t border-emerald-100/60 pt-2.5">
                      {para.kh}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Key Vocabulary & Phonetics */}
            {currentStory.vocabulary && currentStory.vocabulary.length > 0 && (
              <div className="pt-4 border-t border-emerald-100 space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Key Story Vocabulary (ពាក្យគន្លឹះក្នុងរឿង)</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {currentStory.vocabulary && currentStory.vocabulary.map((vocab, vIdx) => (
                    <div 
                      key={vIdx}
                      className="p-3 bg-slate-50 hover:bg-emerald-50/50 rounded-xl border border-slate-200/80 space-y-1 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-black text-xs text-slate-900">{vocab.word}</span>
                        <button
                          onClick={() => handleSpeak(vocab.word)}
                          className="text-emerald-600 hover:text-emerald-700 p-0.5 cursor-pointer"
                        >
                          <Volume2 className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400">
                        <span>{vocab.pos}</span>
                        {vocab.phonetic && <span>{vocab.phonetic}</span>}
                      </div>
                      <p className="text-xs font-khmer text-emerald-800 font-medium">
                        {vocab.meaningKh}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Story Questions (Comprehension & Instant Verification) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
              <div>
                <h3 className="font-black text-slate-900 text-lg">
                  Story Comprehension Questions
                </h3>
                <p className="text-xs text-slate-500 font-khmer mt-0.5">
                  លំហាត់ឆ្លើយសំណួរផ្ទៀងផ្ទាត់ការយល់ដឹងពីអត្ថបទខាងលើ
                </p>
              </div>
              <span className="text-xs font-black bg-emerald-50 text-emerald-800 px-3 py-1 rounded-xl">
                4 Questions
              </span>
            </div>

            <div className="space-y-6">
              {currentStory.questions && currentStory.questions.map((q, qIdx) => {
                const isChecked = checkedQuestions[q.id];
                const selectedOpt = userAnswers[q.id];
                const correctOpt = q.correctAnswer;
                const isCorrect = selectedOpt === correctOpt;

                return (
                  <div 
                    key={q.id}
                    className="p-5 bg-emerald-50/30 rounded-2xl border border-emerald-100/90 space-y-4"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs font-black shrink-0">
                        {q.questionNumber}
                      </span>
                      <div className="space-y-1">
                        <p className="text-xs sm:text-sm font-bold text-slate-900 font-sans">
                          {q.promptEn}
                        </p>
                        {showKhmerTranslation && (
                          <p className="text-xs text-emerald-900 font-khmer font-medium">
                            {q.promptKh}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {q.options && q.options.map((opt) => {
                        const isOptionSelected = selectedOpt === opt.label;
                        let btnStyle = "bg-white hover:bg-emerald-50 text-slate-800 border-slate-200";
                        
                        if (isChecked) {
                          if (opt.isCorrect) {
                            btnStyle = "bg-emerald-100 text-emerald-900 border-emerald-400 font-bold";
                          } else if (isOptionSelected && !opt.isCorrect) {
                            btnStyle = "bg-rose-100 text-rose-900 border-rose-300 font-medium";
                          }
                        } else if (isOptionSelected) {
                          btnStyle = "bg-emerald-100 text-emerald-900 border-emerald-400 font-bold shadow-xs";
                        }

                        return (
                          <button
                            key={opt.label}
                            onClick={() => handleSelectOption(q.id, opt.label)}
                            disabled={isChecked}
                            className={`p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-2.5 text-left cursor-pointer ${btnStyle}`}
                          >
                            <span className="w-5 h-5 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-black shrink-0">
                              {opt.label}
                            </span>
                            <span className="leading-snug">{opt.text}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Check Answer Button & Feedback */}
                    <div className="pt-1 flex items-center justify-between">
                      {!isChecked ? (
                        <button
                          disabled={!selectedOpt}
                          onClick={() => handleCheckAnswer(q.id, isCorrect)}
                          className="px-4 py-2 bg-emerald-600 disabled:opacity-40 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-xs cursor-pointer font-khmer"
                        >
                          ពិនិត្យចម្លើយ (Check Answer)
                        </button>
                      ) : (
                        <div className={`w-full p-4 rounded-xl text-xs space-y-1.5 ${
                          isCorrect ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-rose-50 text-rose-900 border border-rose-200'
                        }`}>
                          <div className="font-bold flex items-center gap-1.5 font-khmer">
                            {isCorrect ? '✅ ត្រឹមត្រូវ! (Correct Answer)' : '❌ មិនទាន់ត្រឹមត្រូវទេ (Check Solution)'}
                          </div>
                          <p className="text-slate-800 font-medium">
                            {q.explanationEn}
                          </p>
                          {showKhmerTranslation && (
                            <p className="text-slate-600 font-khmer mt-0.5">
                              💡 {q.explanationKh}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
