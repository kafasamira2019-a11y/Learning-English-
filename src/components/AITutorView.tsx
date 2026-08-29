import React, { useState, useRef, useEffect } from 'react';
import { Search, Send, Bot, User, Loader2, Sparkles, AlertCircle, BookOpen, PenTool, BookMarked, Zap } from 'lucide-react';
import { grammarUnits } from '../data/unitsData';
import { vocabularyList } from '../data/vocabularyData';
import { academicWritingSections } from '../data/academicWritingData';
import { readingWarmUps } from '../data/readingData';
import { UnitData } from '../types';

interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
}

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  type: 'grammar' | 'vocabulary' | 'writing' | 'reading';
  icon: any;
  iconBg: string;
}

interface AITutorViewProps {
  onSelectUnit?: (unit: UnitData) => void;
  onNavigateToTab?: (tab: string) => void;
}

export const AITutorView: React.FC<AITutorViewProps> = ({ onSelectUnit, onNavigateToTab }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'ai',
      text: 'សួស្តី! ខ្ញុំគឺជាគ្រូបង្រៀន AI របស់ KAFA។ តើអ្នកមានសំណួរអ្វីទាក់ទងនឹងការរៀនភាសាអង់គ្លេសដែលខ្ញុំអាចជួយបានទេ?'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      const results: SearchResult[] = [];
      
      // 1. Search Grammar
      grammarUnits.forEach(u => {
        const matchTitle = u.title && u.title.toLowerCase().includes(q);
        const matchKhmer = u.khmerTitle && u.khmerTitle.toLowerCase().includes(q);
        if (matchTitle || matchKhmer) {
          results.push({ id: u.id.toString(), title: u.title, subtitle: u.khmerTitle || 'Grammar', type: 'grammar', icon: BookOpen, iconBg: 'bg-[#58CC02]/10 text-[#58CC02]' });
        }
      });

      // 2. Search Vocabulary
      vocabularyList.forEach(v => {
        const matchWord = v.word && v.word.toLowerCase().includes(q);
        const matchKhmer = v.meaningKh && v.meaningKh.toLowerCase().includes(q);
        if (matchWord || matchKhmer) {
          results.push({ id: v.id, title: v.word, subtitle: v.meaningKh, type: 'vocabulary', icon: Zap, iconBg: 'bg-[#1CB0F6]/10 text-[#1CB0F6]' });
        }
      });

      // 3. Search Writing
      academicWritingSections.forEach(w => {
        const matchTitle = w.title && w.title.toLowerCase().includes(q);
        const matchKhmer = w.khmerTitle && w.khmerTitle.toLowerCase().includes(q);
        if (matchTitle || matchKhmer) {
          results.push({ id: w.id, title: w.title, subtitle: w.khmerTitle, type: 'writing', icon: PenTool, iconBg: 'bg-[#CE82FF]/10 text-[#CE82FF]' });
        }
      });

      // 4. Search Reading
      readingWarmUps.forEach(r => {
        const matchTitle = r.title && r.title.toLowerCase().includes(q);
        const matchKhmer = r.khmerTitle && r.khmerTitle.toLowerCase().includes(q);
        if (matchTitle || matchKhmer) {
          results.push({ id: r.id, title: r.title, subtitle: r.khmerTitle, type: 'reading', icon: BookMarked, iconBg: 'bg-[#00CD9C]/10 text-[#00CD9C]' });
        }
      });

      // Show top 8 results
      setSearchResults(results.slice(0, 8));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputMessage.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: inputMessage.trim()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.text })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        text: data.text
      };
      
      setMessages(prev => [...prev, aiMsg]);
    } catch (error: any) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        text: 'សុំទោស មានបញ្ហាក្នុងការភ្ជាប់ទៅកាន់ AI។ សូមប្រាកដថា API Key ត្រូវបានកំណត់ត្រឹមត្រូវ។ (' + error.message + ')'
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleResultClick = (res: SearchResult) => {
    setSearchQuery('');
    
    if (res.type === 'grammar') {
      if (onSelectUnit) {
        const unit = grammarUnits.find(u => u.id.toString() === res.id);
        if (unit) onSelectUnit(unit);
      }
      onNavigateToTab?.('lessons');
    } else if (res.type === 'vocabulary') {
      onNavigateToTab?.('vocabulary');
    } else if (res.type === 'writing') {
      onNavigateToTab?.('academic-writing');
    } else if (res.type === 'reading') {
      onNavigateToTab?.('reading');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 h-full flex flex-col">
      {/* Top Section: Search */}
      <div className="bg-white rounded-3xl p-6 border-2 border-[#E5E5E5] shadow-xs">
        <h2 className="text-xl font-extrabold text-slate-800 mb-4 font-khmer flex items-center gap-2">
          <Search className="w-6 h-6 text-[#1CB0F6]" />
          ស្វែងរកមេរៀន (Search Lessons)
        </h2>
        
        <div className="relative relative z-20">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl text-slate-700 font-bold focus:bg-white focus:border-[#1CB0F6] focus:ring-4 focus:ring-[#1CB0F6]/20 transition-all outline-hidden font-khmer text-sm"
            placeholder="ស្វែងរក វេយ្យាករណ៍, ពាក្យ, លំហាត់..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          {/* Search Dropdown Results */}
          {searchQuery.trim().length > 1 && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white border-2 border-slate-200 rounded-2xl shadow-xl overflow-hidden z-50">
              {searchResults.length > 0 ? (
                <ul className="max-h-64 overflow-y-auto">
                  {searchResults.map((res, idx) => {
                    const IconComp = res.icon;
                    return (
                      <li 
                        key={res.id + '-' + idx}
                        onClick={() => handleResultClick(res)}
                        className="px-4 py-3 border-b border-slate-100 hover:bg-sky-50 cursor-pointer flex items-center gap-3 transition-colors"
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${res.iconBg}`}>
                          <IconComp className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-extrabold text-sm text-slate-800">{res.title}</div>
                          <div className="text-xs text-slate-500 font-khmer mt-0.5">{res.subtitle}</div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="px-4 py-6 text-center text-slate-500 font-khmer flex flex-col items-center">
                  <AlertCircle className="w-8 h-8 text-slate-300 mb-2" />
                  <p>រកមិនឃើញមេរៀនដែលត្រូវនឹងសំណួររបស់អ្នកទេ</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section: AI Tutor Chat */}
      <div className="bg-white flex-1 rounded-3xl border-2 border-[#E5E5E5] shadow-xs flex flex-col overflow-hidden min-h-[500px]">
        {/* Chat Header */}
        <div className="px-6 py-4 border-b-2 border-slate-100 bg-sky-50/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-sky-400 to-indigo-500 flex items-center justify-center shadow-md">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 text-lg flex items-center gap-2">
                KAFA AI Tutor
                <Sparkles className="w-4 h-4 text-amber-500" />
              </h3>
              <p className="text-xs font-bold text-slate-500 font-khmer">សួរខ្ញុំពីភាសាអង់គ្លេស! (Ask me anything about English)</p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${
                msg.role === 'user' ? 'bg-[#1CB0F6] text-white' : 'bg-white border-2 border-indigo-100 text-indigo-500'
              }`}>
                {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>

              {/* Message Bubble */}
              <div className={`max-w-[80%] rounded-2xl px-5 py-3.5 shadow-sm text-sm sm:text-base font-medium whitespace-pre-wrap ${
                msg.role === 'user' 
                  ? 'bg-[#1CB0F6] text-white rounded-tr-sm' 
                  : 'bg-white border-2 border-slate-100 text-slate-700 rounded-tl-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white border-2 border-indigo-100 text-indigo-500 flex items-center justify-center shrink-0 shadow-xs">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-white border-2 border-slate-100 rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm flex gap-1">
                <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t-2 border-slate-100">
          <form 
            onSubmit={handleSendMessage}
            className="relative flex items-end gap-2 max-w-4xl mx-auto"
          >
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="សរសេរសំណួររបស់អ្នកនៅទីនេះ... (ចុច Enter ដើម្បីបញ្ជូន)"
              className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl pl-4 pr-12 py-3.5 focus:bg-white focus:border-[#1CB0F6] focus:ring-4 focus:ring-[#1CB0F6]/20 transition-all outline-hidden text-sm sm:text-base resize-none min-h-[56px] max-h-32"
              rows={1}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isTyping}
              className="absolute right-2 bottom-2 p-2.5 bg-[#1CB0F6] text-white rounded-xl hover:bg-sky-500 disabled:opacity-50 disabled:bg-slate-300 transition-colors shadow-sm cursor-pointer"
            >
              {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </form>
          <div className="text-center mt-2 text-[10px] text-slate-400 font-khmer">
            AI អាចមានកំហុស។ សូមត្រួតពិនិត្យចម្លើយឡើងវិញ។ វាឆ្លើយតបតែលើមេរៀនភាសាអង់គ្លេសប៉ុណ្ណោះ។
          </div>
        </div>
      </div>
    </div>
  );
};
