import React, { useState, useEffect } from 'react';
import { 
  User, 
  Flame, 
  Award, 
  Shield, 
  BookOpen, 
  PenTool, 
  BookMarked, 
  Zap, 
  Star, 
  CheckCircle2, 
  Gamepad2, 
  Edit3, 
  Check, 
  Lock, 
  Unlock, 
  Search, 
  Users, 
  Sparkles, 
  Clock, 
  TrendingUp, 
  BarChart3,
  LogOut,
  UserPlus,
  RefreshCw,
  RotateCcw,
  Trash2,
  AlertTriangle,
  Table as TableIcon,
  LayoutGrid,
  Radio,
  Eye,
  Activity,
  ArrowUpDown,
  Filter,
  CheckCircle
} from 'lucide-react';
import { userStore, UserProfile, CompletedExerciseRecord, PlayedGameRecord } from '../utils/userStore';
import { soundManager } from '../utils/sound';

interface DuolingoProfileViewProps {
  totalXp: number;
  streakDays: number;
  completedUnitsCount: number;
  gems: number;
  onUserChanged?: () => void;
}

export const DuolingoProfileView: React.FC<DuolingoProfileViewProps> = ({
  totalXp,
  streakDays,
  completedUnitsCount,
  gems,
  onUserChanged
}) => {
  // Current user state
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => userStore.getCurrentUser());
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(currentUser.name);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Url = reader.result as string;
        userStore.updateUserAvatar(base64Url);
        setCurrentUser(userStore.getCurrentUser());
        if (onUserChanged) onUserChanged();
      };
      reader.readAsDataURL(file);
    }
  };

  // Admin login modal state
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');

  // Super Admin view state
  const [adminActiveTab, setAdminActiveTab] = useState<'my-profile' | 'all-users-monitor'>('my-profile');
  const [allUsers, setAllUsers] = useState<UserProfile[]>(() => userStore.getAllUsers());
  const [searchLearnerQuery, setSearchLearnerQuery] = useState('');
  const [selectedLearnerToInspect, setSelectedLearnerToInspect] = useState<UserProfile | null>(null);
  const [adminViewMode, setAdminViewMode] = useState<'table' | 'cards'>('table');
  const [adminStatusFilter, setAdminStatusFilter] = useState<'all' | 'active' | 'learners'>('all');
  const [adminSortKey, setAdminSortKey] = useState<'totalXp' | 'exercises' | 'name' | 'lastActive'>('totalXp');
  const [adminSortDirection, setAdminSortDirection] = useState<'desc' | 'asc'>('desc');

  // Helper for last active format
  const formatKhmerTimeAgo = (timestamp?: number) => {
    if (!timestamp) return 'មិនទាន់កំណត់';
    const diffMs = Date.now() - timestamp;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSec < 60) return 'ទើបតែមុននេះបន្តិច';
    if (diffMin < 60) return `${diffMin} នាទីមុន`;
    if (diffHours < 24) return `${diffHours} ម៉ោងមុន`;
    if (diffDays === 1) return 'ម្សិលមិញ';
    if (diffDays < 7) return `${diffDays} ថ្ងៃមុន`;
    return new Date(timestamp).toLocaleDateString('km-KH');
  };

  // Profile sub-tabs for learner
  const [profileViewTab, setProfileViewTab] = useState<'achievements' | 'exercise-history' | 'game-history'>('achievements');
  const [historyFilterCategory, setHistoryFilterCategory] = useState<'all' | 'grammar' | 'reading' | 'writing' | 'vocab'>('all');

  // New learner modal
  const [showNewLearnerModal, setShowNewLearnerModal] = useState(false);
  const [newLearnerName, setNewLearnerName] = useState('');

  // Reset confirmation modal state
  const [showResetConfirmModal, setShowResetConfirmModal] = useState(false);
  const [resetSuccessMessage, setResetSuccessMessage] = useState('');

  const reloadUserData = () => {
    const updated = userStore.getCurrentUser();
    setCurrentUser({ ...updated });
    setNameInput(updated.name);
    setAllUsers(userStore.getAllUsers());
    if (onUserChanged) onUserChanged();
  };

  useEffect(() => {
    reloadUserData();
  }, [totalXp, gems, streakDays]);

  // Handle Reset All Users and Data
  const handleConfirmResetAll = () => {
    const updated = userStore.resetAllUsersData();
    setCurrentUser({ ...updated });
    setNameInput(updated.name);
    setAllUsers(userStore.getAllUsers());
    setSelectedLearnerToInspect(null);
    setShowResetConfirmModal(false);
    setResetSuccessMessage('បាន Reset ព័ត៌មាន និងឈ្មោះអ្នកប្រើប្រាស់ទាំងអស់ដោយជោគជ័យ!');
    soundManager.playComplete();
    if (onUserChanged) onUserChanged();
    setTimeout(() => setResetSuccessMessage(''), 4000);
  };

  // Handle saving customized name (NO password required)
  const handleSaveName = () => {
    if (nameInput.trim()) {
      const updated = userStore.updateUserName(nameInput);
      setCurrentUser(updated);
      setIsEditingName(false);
      soundManager.playCorrect();
      setAllUsers(userStore.getAllUsers());
      if (onUserChanged) onUserChanged();
    }
  };

  // Handle Super Admin Login (kafa / kafa@123)
  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');
    const result = userStore.loginAsAdmin(adminUsername, adminPassword);
    if (result.success && result.user) {
      soundManager.playComplete();
      setCurrentUser(result.user);
      setShowAdminModal(false);
      setAdminUsername('');
      setAdminPassword('');
      setAdminActiveTab('all-users-monitor');
      reloadUserData();
    } else {
      soundManager.playIncorrect();
      setAdminError(result.message);
    }
  };

  // Handle Logout Admin
  const handleLogoutAdmin = () => {
    const regular = userStore.logoutAdmin();
    setCurrentUser(regular);
    setAdminActiveTab('my-profile');
    setSelectedLearnerToInspect(null);
    reloadUserData();
  };

  // Create new learner
  const handleCreateNewLearner = () => {
    if (newLearnerName.trim()) {
      const newUser = userStore.createNewLearner(newLearnerName);
      setCurrentUser(newUser);
      setNameInput(newUser.name);
      setShowNewLearnerModal(false);
      setNewLearnerName('');
      reloadUserData();
      soundManager.playComplete();
    }
  };

  // Switch learner in user switcher
  const handleSwitchUser = (userId: string) => {
    const target = userStore.switchUser(userId);
    if (target) {
      setCurrentUser(target);
      setNameInput(target.name);
      reloadUserData();
    }
  };

  // Calculate Category Mastery & Achievements
  const catScores = currentUser.categoryScores || {
    grammar: 0,
    reading: 0,
    writing: 0,
    vocab: 0,
    games: 0
  };

  const totalCalculatedPoints = catScores.grammar + catScores.reading + catScores.writing + catScores.vocab + catScores.games + currentUser.totalXp;

  // Filtered exercise history
  const filteredExercises = (currentUser.completedExercises || []).filter(item => {
    if (historyFilterCategory === 'all') return true;
    return item.category === historyFilterCategory;
  });

  const filteredGames = currentUser.gameRecords || [];

  // 5 Category Achievements Data Structure
  const fiveCategoryAchievements = [
    {
      id: 'cat-grammar',
      categoryName: 'វេយ្យាករណ៍ (Grammar)',
      icon: BookOpen,
      iconBg: 'bg-[#58CC02]',
      colorText: 'text-[#58CC02]',
      borderColor: 'border-[#58CC02]/30',
      bgLight: 'bg-[#F0FFF0]',
      score: catScores.grammar,
      completedCount: (currentUser.completedExercises || []).filter(e => e.category === 'grammar').length + (currentUser.completedUnits?.length || 0),
      metrics: [
        { label: 'Units បានរៀន', value: `${currentUser.completedUnits?.length || 0} Units` },
        { label: 'ពិន្ទុវេយ្យាករណ៍', value: `${catScores.grammar} XP` }
      ],
      badges: [
        { title: 'Murphy Explorer', desc: 'បានរៀនលើសពី ៣ មេរៀន', unlocked: (currentUser.completedUnits?.length || 0) >= 3 },
        { title: 'Tense Specialist', desc: 'ទទួលបាន 100+ XP វេយ្យាករណ៍', unlocked: catScores.grammar >= 100 },
        { title: 'Grammar Master', desc: 'ឆ្លើយលំហាត់ត្រូវ 100% លើសពី ៥ ដង', unlocked: (currentUser.completedExercises || []).filter(e => e.category === 'grammar' && e.percentage === 100).length >= 3 }
      ]
    },
    {
      id: 'cat-reading',
      categoryName: 'អានយល់ន័យ (Reading)',
      icon: BookMarked,
      iconBg: 'bg-[#00CD9C]',
      colorText: 'text-[#00CD9C]',
      borderColor: 'border-[#00CD9C]/30',
      bgLight: 'bg-[#E6FAF4]',
      score: catScores.reading,
      completedCount: (currentUser.completedExercises || []).filter(e => e.category === 'reading').length,
      metrics: [
        { label: 'អត្ថបទបានអាន', value: `${(currentUser.completedExercises || []).filter(e => e.category === 'reading').length} អត្ថបទ` },
        { label: 'ពិន្ទុអានយល់ន័យ', value: `${catScores.reading} XP` }
      ],
      badges: [
        { title: 'Curious Reader', desc: 'អានចប់អត្ថបទដំបូង', unlocked: (currentUser.completedExercises || []).some(e => e.category === 'reading') },
        { title: 'Passage Analyst', desc: 'ទទួលបាន 80+ XP អាន', unlocked: catScores.reading >= 80 },
        { title: 'Reading Scholar', desc: 'ឆ្លើយសំណួរអានត្រូវ 100%', unlocked: (currentUser.completedExercises || []).some(e => e.category === 'reading' && e.percentage === 100) }
      ]
    },
    {
      id: 'cat-writing',
      categoryName: 'តែងនិពន្ធស្រាវជ្រាវ (Academic Writing)',
      icon: PenTool,
      iconBg: 'bg-[#CE82FF]',
      colorText: 'text-[#CE82FF]',
      borderColor: 'border-[#CE82FF]/30',
      bgLight: 'bg-[#FAF0FF]',
      score: catScores.writing,
      completedCount: (currentUser.completedExercises || []).filter(e => e.category === 'writing').length,
      metrics: [
        { label: 'កម្រិតតែងនិពន្ធ', value: `${(currentUser.completedExercises || []).filter(e => e.category === 'writing').length} ជំពូក` },
        { label: 'ពិន្ទុតាក់តែងសេចក្តី', value: `${catScores.writing} XP` }
      ],
      badges: [
        { title: 'Thesis Crafter', desc: 'ហាត់សរសេរឃ្លាគំនិតចម្បង', unlocked: (currentUser.completedExercises || []).some(e => e.category === 'writing') },
        { title: 'Academic Stylist', desc: 'ទទួលបាន 60+ XP សរសេរ', unlocked: catScores.writing >= 60 },
        { title: 'Research Master', desc: 'ឆ្លងកាត់លំហាត់ស្រាវជ្រាវពេញលេញ', unlocked: catScores.writing >= 120 }
      ]
    },
    {
      id: 'cat-vocab',
      categoryName: 'វាក្យសព្ទ និង កិរិយាសព្ទ (Vocabulary & Verbs)',
      icon: Zap,
      iconBg: 'bg-[#1CB0F6]',
      colorText: 'text-[#1CB0F6]',
      borderColor: 'border-[#1CB0F6]/30',
      bgLight: 'bg-[#F0F9FF]',
      score: catScores.vocab,
      completedCount: (currentUser.completedExercises || []).filter(e => e.category === 'vocab').length,
      metrics: [
        { label: 'ឈុតវាក្យសព្ទ', value: `${(currentUser.completedExercises || []).filter(e => e.category === 'vocab').length + 5} ឈុត` },
        { label: 'ពិន្ទុវាក្យសព្ទ', value: `${catScores.vocab} XP` }
      ],
      badges: [
        { title: 'Daily Word Explorer', desc: 'រៀនពាក្យប្រចាំថ្ងៃ', unlocked: true },
        { title: 'Irregular Verb Tamer', desc: 'ចេះកិរិយាសព្ទមិនទៀងទាត់', unlocked: catScores.vocab >= 50 },
        { title: 'Lexicon Master', desc: 'ប្រឡងជាប់តេស្តពាក្យ 100%', unlocked: (currentUser.completedExercises || []).some(e => e.category === 'vocab' && e.percentage === 100) }
      ]
    },
    {
      id: 'cat-games',
      categoryName: 'ល្បែងសិក្សា ៧ ថ្ងៃ (Educational Games)',
      icon: Gamepad2,
      iconBg: 'bg-[#FF9600]',
      colorText: 'text-[#FF9600]',
      borderColor: 'border-[#FF9600]/30',
      bgLight: 'bg-[#FFF9F0]',
      score: catScores.games,
      completedCount: currentUser.gameRecords?.length || 0,
      metrics: [
        { label: 'ល្បែងបានលេង', value: `${currentUser.gameRecords?.length || 0} វគ្គ` },
        { label: 'ពិន្ទុល្បែងសរុប', value: `${catScores.games} XP` }
      ],
      badges: [
        { title: 'Arena Contender', desc: 'លេងល្បែង 7-Day Arena ដំបូង', unlocked: (currentUser.gameRecords?.length || 0) >= 1 },
        { title: 'Combo King', desc: 'បង្កើត Combo លើសពី 5x', unlocked: (currentUser.gameRecords || []).some(g => g.combo >= 5) },
        { title: 'Speed Champion', desc: 'ទទួលបានពិន្ទុល្បែងលើសពី 300', unlocked: (currentUser.gameRecords || []).some(g => g.score >= 300) }
      ]
    }
  ];

  const isGuestUser = currentUser.name === 'សិស្សភាសាអង់គ្លេស (Learner)' || currentUser.name.trim() === '';

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-6 select-none space-y-6">
      
      {/* 1. Super Admin Navigation Banner (Visible when logged in as Admin) */}
      {currentUser.role === 'admin' && (
        <div className="bg-linear-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-4 sm:p-5 text-white shadow-lg border-2 border-amber-300">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner border border-white/40 shrink-0">
                👑
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-white text-orange-600 text-[10px] font-black uppercase tracking-wider">
                    SUPER ADMIN ACTIVE
                  </span>
                  <span className="text-xs font-bold text-amber-100 font-khmer">
                    គណនីគ្រប់គ្រងប្រព័ន្ធទូទៅ
                  </span>
                </div>
                <h2 className="text-xl font-black tracking-tight text-white mt-0.5">
                  <span className="block text-[11px] opacity-70 uppercase tracking-widest font-sans mb-0.5">Admin Dashboard & Analytics</span>
                  <span className="font-khmer">ផ្ទាំងគ្រប់គ្រង និងពិនិត្យទិន្នន័យសិស្សទាំងអស់</span>
                </h2>
              </div>
            </div>

            <div className="flex items-center flex-wrap gap-2">
              <button
                onClick={() => setShowNewLearnerModal(true)}
                className="px-3.5 py-2 bg-white text-orange-600 hover:bg-amber-50 font-black rounded-xl text-xs uppercase shadow-sm transition-transform active:scale-95 flex items-center gap-1.5 cursor-pointer font-khmer"
              >
                <UserPlus className="w-4 h-4" />
                <span>បង្កើតសិស្សថ្មី</span>
              </button>
              <button
                onClick={() => setShowResetConfirmModal(true)}
                className="px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white font-black rounded-xl text-xs uppercase shadow-sm transition-transform active:scale-95 flex items-center gap-1.5 cursor-pointer font-khmer border border-rose-400"
                title="Reset ព័ត៌មាន ឬឈ្មោះអ្នកប្រើប្រាស់ទាំងអស់"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset ទាំងអស់</span>
              </button>
              <button
                onClick={handleLogoutAdmin}
                className="p-2 bg-black/20 hover:bg-black/30 text-white rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1 font-bold font-khmer"
                title="ចាកចេញពី Super Admin"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-[11px] sm:inline hidden">ចាកចេញ</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. SUPER ADMIN ALL-USERS MONITOR VIEW */}
      {currentUser.role === 'admin' ? (
        <div className="bg-white rounded-3xl p-6 border-2 border-[#E5E5E5] shadow-xs space-y-6">
          {resetSuccessMessage && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl text-xs font-bold flex items-center gap-2 font-khmer animate-in fade-in duration-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{resetSuccessMessage}</span>
            </div>
          )}

          {/* Top Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-sky-100 text-[#1CB0F6] flex items-center justify-center font-black">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-800 flex items-center gap-2 font-khmer">
                    <span>តារាងឈ្មោះអ្នកប្រើប្រាស់ និងពិន្ទុអនុវត្តលំហាត់</span>
                  </h3>
                  <p className="text-xs text-slate-500 font-khmer">
                    ត្រួតពិនិត្យមើលថាតើអ្នកណាកំពុងប្រើប្រាស់ និងពិន្ទុសរុបដែលសិស្សម្នាក់ៗអនុវត្តបាន
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center flex-wrap gap-2 w-full sm:w-auto">
              <button
                onClick={() => setShowNewLearnerModal(true)}
                className="px-3.5 py-2.5 bg-[#58CC02] hover:bg-[#46A302] text-white text-xs font-black rounded-xl flex items-center gap-1.5 shrink-0 cursor-pointer font-khmer shadow-sm transition-transform active:scale-95"
              >
                <UserPlus className="w-4 h-4" />
                <span>បង្កើតសិស្សថ្មី</span>
              </button>

              <button
                onClick={() => setShowResetConfirmModal(true)}
                className="px-3.5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-black rounded-xl flex items-center gap-1.5 shrink-0 cursor-pointer font-khmer transition-colors"
                title="Reset ព័ត៌មាន ឬឈ្មោះអ្នកប្រើប្រាស់ទាំងអស់"
              >
                <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
                <span>Reset ទាំងអស់</span>
              </button>
            </div>
          </div>

          {/* Top Summary Metric Cards */}
          {(() => {
            const totalCombinedXp = allUsers.reduce((acc, u) => {
              const s = u.categoryScores || { grammar: 0, reading: 0, writing: 0, vocab: 0, games: 0 };
              return acc + s.grammar + s.reading + s.writing + s.vocab + s.games + (u.totalXp || 0);
            }, 0);
            const totalExercisesDone = allUsers.reduce((acc, u) => acc + (u.completedExercises?.length || 0), 0);
            const activeUser = allUsers.find(u => u.id === currentUser.id) || currentUser;

            return (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-500 font-khmer">អ្នកប្រើប្រាស់សរុប</div>
                    <div className="text-lg font-black text-slate-800">{allUsers.length} នាក់</div>
                  </div>
                </div>

                <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-3.5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-xl bg-emerald-400 opacity-40"></span>
                    <Activity className="w-5 h-5 relative z-10" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[10px] font-extrabold text-emerald-800 uppercase flex items-center gap-1 font-khmer">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>កំពុងប្រើប្រាស់</span>
                    </div>
                    <div className="text-sm font-black text-emerald-900 truncate" title={activeUser.name}>
                      {activeUser.name}
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-3.5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-amber-800 font-khmer">ពិន្ទុអនុវត្តសរុប</div>
                    <div className="text-lg font-black text-amber-900">{totalCombinedXp.toLocaleString()} XP</div>
                  </div>
                </div>

                <div className="bg-purple-50/80 border border-purple-200 rounded-2xl p-3.5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500 text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-purple-800 font-khmer">លំហាត់ធ្វើរួចសរុប</div>
                    <div className="text-lg font-black text-purple-900">{totalExercisesDone} លំហាត់</div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Filter, Search & View Mode Controls */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchLearnerQuery}
                onChange={(e) => setSearchLearnerQuery(e.target.value)}
                placeholder="ស្វែងរកតាមឈ្មោះអ្នករៀន..."
                className="w-full pl-9 pr-3 py-2 text-xs font-bold bg-white border border-slate-200 rounded-xl focus:border-[#1CB0F6] outline-hidden font-khmer"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-extrabold text-slate-500 flex items-center gap-1 font-khmer">
                <Filter className="w-3.5 h-3.5" />
                <span>ច្រោះ៖</span>
              </span>
              <button
                onClick={() => setAdminStatusFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer font-khmer transition-colors ${
                  adminStatusFilter === 'all'
                    ? 'bg-[#1CB0F6] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                ទាំងអស់ ({allUsers.length})
              </button>
              <button
                onClick={() => setAdminStatusFilter('active')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer font-khmer transition-colors flex items-center gap-1 ${
                  adminStatusFilter === 'active'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white text-emerald-700 hover:bg-emerald-50 border border-emerald-200'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>កំពុងប្រើ</span>
              </button>
              <button
                onClick={() => setAdminStatusFilter('learners')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer font-khmer transition-colors ${
                  adminStatusFilter === 'learners'
                    ? 'bg-slate-800 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                សិស្សទូទៅ
              </button>
            </div>

            {/* View Mode Toggle: Table vs Cards */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 self-end md:self-auto">
              <button
                onClick={() => setAdminViewMode('table')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer font-khmer transition-colors ${
                  adminViewMode === 'table' ? 'bg-[#1CB0F6] text-white' : 'text-slate-500 hover:text-slate-800'
                }`}
                title="ទិដ្ឋភាពតារាងលម្អិត"
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>តារាង</span>
              </button>
              <button
                onClick={() => setAdminViewMode('cards')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer font-khmer transition-colors ${
                  adminViewMode === 'cards' ? 'bg-[#1CB0F6] text-white' : 'text-slate-500 hover:text-slate-800'
                }`}
                title="ទិដ្ឋភាពកាតសង្ខេប"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>កាត</span>
              </button>
            </div>
          </div>

          {/* Filtered and Sorted Users List */}
          {(() => {
            const filteredUsers = allUsers
              .filter(u => {
                const matchQuery = u.name.toLowerCase().includes(searchLearnerQuery.toLowerCase());
                if (!matchQuery) return false;
                if (adminStatusFilter === 'active') return u.id === currentUser.id;
                if (adminStatusFilter === 'learners') return u.role !== 'admin';
                return true;
              })
              .sort((a, b) => {
                const aScores = a.categoryScores || { grammar: 0, reading: 0, writing: 0, vocab: 0, games: 0 };
                const bScores = b.categoryScores || { grammar: 0, reading: 0, writing: 0, vocab: 0, games: 0 };
                const aTotal = aScores.grammar + aScores.reading + aScores.writing + aScores.vocab + aScores.games + (a.totalXp || 0);
                const bTotal = bScores.grammar + bScores.reading + bScores.writing + bScores.vocab + bScores.games + (b.totalXp || 0);

                if (adminSortKey === 'totalXp') return adminSortDirection === 'desc' ? bTotal - aTotal : aTotal - bTotal;
                if (adminSortKey === 'exercises') {
                  const aEx = a.completedExercises?.length || 0;
                  const bEx = b.completedExercises?.length || 0;
                  return adminSortDirection === 'desc' ? bEx - aEx : aEx - bEx;
                }
                if (adminSortKey === 'name') return adminSortDirection === 'desc' ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name);
                if (adminSortKey === 'lastActive') {
                  const aTime = a.lastActiveAt || 0;
                  const bTime = b.lastActiveAt || 0;
                  return adminSortDirection === 'desc' ? bTime - aTime : aTime - bTime;
                }
                return 0;
              });

            if (filteredUsers.length === 0) {
              return (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <Users className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm font-bold text-slate-600 font-khmer">រកមិនឃើញអ្នកប្រើប្រាស់ដែលស្វែងរកទេ</p>
                  <p className="text-xs text-slate-400 font-khmer mt-1">សូមព្យាយាមវាយឈ្មោះផ្សេង ឬប្តូរលក្ខខណ្ឌច្រោះ</p>
                </div>
              );
            }

            if (adminViewMode === 'table') {
              return (
                <div className="overflow-x-auto rounded-2xl border-2 border-slate-200 shadow-xs">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100/90 text-slate-700 font-black border-b border-slate-200 font-khmer whitespace-nowrap">
                        <th className="py-3 px-3.5 text-center w-12">#</th>
                        <th className="py-3 px-4">ឈ្មោះអ្នកប្រើប្រាស់ / សិស្ស</th>
                        <th className="py-3 px-3.5 text-center">ស្ថានភាព</th>
                        <th className="py-3 px-3.5 text-center cursor-pointer hover:bg-slate-200" onClick={() => {
                          if (adminSortKey === 'totalXp') setAdminSortDirection(d => d === 'desc' ? 'asc' : 'desc');
                          else { setAdminSortKey('totalXp'); setAdminSortDirection('desc'); }
                        }}>
                          <div className="flex items-center justify-center gap-1">
                            <span>ពិន្ទុសរុប (XP)</span>
                            <ArrowUpDown className="w-3 h-3 text-slate-400" />
                          </div>
                        </th>
                        <th className="py-3 px-3 text-center bg-emerald-50/70 text-emerald-900 border-l border-emerald-100">វេយ្យាករណ៍</th>
                        <th className="py-3 px-3 text-center bg-teal-50/70 text-teal-900">អាន</th>
                        <th className="py-3 px-3 text-center bg-purple-50/70 text-purple-900">សរសេរ</th>
                        <th className="py-3 px-3 text-center bg-sky-50/70 text-sky-900">វាក្យសព្ទ</th>
                        <th className="py-3 px-3 text-center bg-amber-50/70 text-amber-900 border-r border-amber-100">ល្បែង</th>
                        <th className="py-3 px-3 text-center">លំហាត់ធ្វើរួច</th>
                        <th className="py-3 px-3 text-center">Streak</th>
                        <th className="py-3 px-4 text-center">សកម្មភាព</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {filteredUsers.map((learner, idx) => {
                        const lScores = learner.categoryScores || { grammar: 0, reading: 0, writing: 0, vocab: 0, games: 0 };
                        const lTotal = lScores.grammar + lScores.reading + lScores.writing + lScores.vocab + lScores.games + (learner.totalXp || 0);
                        const isCurrentlyActive = learner.id === currentUser.id;
                        const isSelected = selectedLearnerToInspect?.id === learner.id;

                        return (
                          <tr
                            key={learner.id}
                            className={`transition-colors hover:bg-sky-50/50 ${
                              isCurrentlyActive ? 'bg-emerald-50/30' : idx % 2 === 1 ? 'bg-slate-50/40' : 'bg-white'
                            } ${isSelected ? 'ring-2 ring-inset ring-[#1CB0F6]' : ''}`}
                          >
                            {/* # Index */}
                            <td className="py-3.5 px-3.5 text-center font-bold text-slate-400">
                              {idx + 1}
                            </td>

                            {/* User Name & Avatar */}
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-3">
                                <div className={`w-9 h-9 rounded-xl ${learner.avatarColor || 'bg-[#1CB0F6]'} text-white font-black flex items-center justify-center text-sm shadow-xs shrink-0 overflow-hidden`}>
                                  {learner.avatarUrl ? (
                                    <img src={learner.avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                                  ) : (
                                    learner.name.charAt(0).toUpperCase()
                                  )}
                                </div>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="font-extrabold text-slate-900 text-xs truncate max-w-[150px] sm:max-w-[200px]">
                                      {learner.name}
                                    </span>
                                    {learner.role === 'admin' ? (
                                      <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[9px] font-black uppercase rounded-md border border-amber-200">
                                        ADMIN
                                      </span>
                                    ) : (
                                      <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 text-[9px] font-bold uppercase rounded-md">
                                        STUDENT
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-[10px] text-slate-400 font-medium">
                                    ចូលរួម៖ {new Date(learner.joinedAt).toLocaleDateString('km-KH')}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Status: Active Now vs Inactive */}
                            <td className="py-3.5 px-3.5 text-center whitespace-nowrap">
                              {isCurrentlyActive ? (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-[11px] font-extrabold border border-emerald-300 font-khmer shadow-xs">
                                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                  <span>កំពុងប្រើប្រាស់</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full text-[10px] font-bold font-khmer">
                                  <Clock className="w-3 h-3 text-slate-400" />
                                  <span>{formatKhmerTimeAgo(learner.lastActiveAt)}</span>
                                </span>
                              )}
                            </td>

                            {/* Total XP Score */}
                            <td className="py-3.5 px-3.5 text-center whitespace-nowrap">
                              <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-900 rounded-xl text-xs font-black border border-amber-200">
                                <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                                <span>{lTotal} XP</span>
                              </span>
                            </td>

                            {/* Grammar XP */}
                            <td className="py-3.5 px-3 text-center bg-emerald-50/40 text-emerald-700 font-extrabold border-l border-emerald-100 whitespace-nowrap">
                              {lScores.grammar} XP
                            </td>

                            {/* Reading XP */}
                            <td className="py-3.5 px-3 text-center bg-teal-50/40 text-teal-700 font-extrabold whitespace-nowrap">
                              {lScores.reading} XP
                            </td>

                            {/* Writing XP */}
                            <td className="py-3.5 px-3 text-center bg-purple-50/40 text-purple-700 font-extrabold whitespace-nowrap">
                              {lScores.writing} XP
                            </td>

                            {/* Vocab XP */}
                            <td className="py-3.5 px-3 text-center bg-sky-50/40 text-sky-700 font-extrabold whitespace-nowrap">
                              {lScores.vocab} XP
                            </td>

                            {/* Games XP */}
                            <td className="py-3.5 px-3 text-center bg-amber-50/40 text-amber-700 font-extrabold border-r border-amber-100 whitespace-nowrap">
                              {lScores.games} XP
                            </td>

                            {/* Exercises Completed Count */}
                            <td className="py-3.5 px-3 text-center whitespace-nowrap">
                              <span className="font-bold text-slate-700 font-khmer">
                                {learner.completedExercises?.length || 0} លំហាត់
                              </span>
                            </td>

                            {/* Streak */}
                            <td className="py-3.5 px-3 text-center whitespace-nowrap">
                              <span className="font-extrabold text-orange-600 font-khmer">
                                🔥 {learner.streakDays} ថ្ងៃ
                              </span>
                            </td>

                            {/* Actions */}
                            <td className="py-3.5 px-4 text-center whitespace-nowrap">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  onClick={() => setSelectedLearnerToInspect(learner)}
                                  className="px-2.5 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 text-[11px] font-extrabold rounded-xl transition-colors cursor-pointer font-khmer flex items-center gap-1"
                                  title="ពិនិត្យលម្អិតប្រវត្តិលំហាត់"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  <span>ពិនិត្យ</span>
                                </button>

                                {!isCurrentlyActive && (
                                  <button
                                    onClick={() => handleSwitchUser(learner.id)}
                                    className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold rounded-xl transition-colors cursor-pointer font-khmer"
                                    title="ប្តូរទៅប្រើប្រាស់គណនីនេះ"
                                  >
                                    ប្រើគណនីនេះ
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              );
            }

            // Cards View
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredUsers.map((learner) => {
                  const lScores = learner.categoryScores || { grammar: 0, reading: 0, writing: 0, vocab: 0, games: 0 };
                  const lTotal = lScores.grammar + lScores.reading + lScores.writing + lScores.vocab + lScores.games + (learner.totalXp || 0);
                  const isCurrentlyActive = learner.id === currentUser.id;
                  const isSelected = selectedLearnerToInspect?.id === learner.id;

                  return (
                    <div
                      key={learner.id}
                      className={`rounded-2xl p-4 border-2 transition-all ${
                        isCurrentlyActive
                          ? 'border-emerald-400 bg-emerald-50/30 shadow-md ring-2 ring-emerald-200'
                          : isSelected
                          ? 'border-[#1CB0F6] bg-sky-50/50 shadow-md'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-2xl ${learner.avatarColor || 'bg-[#1CB0F6]'} text-white font-black flex items-center justify-center text-xl shadow-xs shrink-0 overflow-hidden`}>
                            {learner.avatarUrl ? (
                              <img src={learner.avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                            ) : (
                              learner.name.charAt(0).toUpperCase()
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h4 className="font-extrabold text-slate-800 text-sm">{learner.name}</h4>
                              {learner.role === 'admin' ? (
                                <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[9px] font-black uppercase rounded-md border border-amber-200">
                                  ADMIN
                                </span>
                              ) : (
                                <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 text-[9px] font-bold uppercase rounded-md">
                                  STUDENT
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              {isCurrentlyActive ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md text-[10px] font-extrabold font-khmer">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                  <span>កំពុងប្រើប្រាស់</span>
                                </span>
                              ) : (
                                <span className="text-[10px] text-slate-400 font-khmer">
                                  ចូលចុងក្រោយ៖ {formatKhmerTimeAgo(learner.lastActiveAt)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-sm font-black text-amber-600 flex items-center gap-1 justify-end">
                            <Zap className="w-3.5 h-3.5 fill-current" />
                            <span>{lTotal} XP</span>
                          </div>
                          <div className="text-[10px] text-slate-400 font-bold mt-0.5">
                            🔥 {learner.streakDays} ថ្ងៃ &bull; 💎 {learner.gems}
                          </div>
                        </div>
                      </div>

                      {/* 5 Category Score Pills */}
                      <div className="grid grid-cols-5 gap-1.5 mt-3 pt-3 border-t border-slate-100 text-center">
                        <div className="bg-emerald-50 rounded-lg p-1.5 border border-emerald-100">
                          <div className="text-[9px] font-extrabold text-emerald-800 truncate font-khmer">វេយ្យាករណ៍</div>
                          <div className="text-xs font-black text-emerald-600">{lScores.grammar}</div>
                        </div>
                        <div className="bg-teal-50 rounded-lg p-1.5 border border-teal-100">
                          <div className="text-[9px] font-extrabold text-teal-800 truncate font-khmer">អាន</div>
                          <div className="text-xs font-black text-teal-600">{lScores.reading}</div>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-1.5 border border-purple-100">
                          <div className="text-[9px] font-extrabold text-purple-800 truncate font-khmer">សរសេរ</div>
                          <div className="text-xs font-black text-purple-600">{lScores.writing}</div>
                        </div>
                        <div className="bg-sky-50 rounded-lg p-1.5 border border-sky-100">
                          <div className="text-[9px] font-extrabold text-sky-800 truncate font-khmer">វាក្យសព្ទ</div>
                          <div className="text-xs font-black text-sky-600">{lScores.vocab}</div>
                        </div>
                        <div className="bg-amber-50 rounded-lg p-1.5 border border-amber-100">
                          <div className="text-[9px] font-extrabold text-amber-800 truncate font-khmer">ល្បែង</div>
                          <div className="text-xs font-black text-amber-600">{lScores.games}</div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center justify-between gap-2 mt-3 pt-2">
                        <span className="text-[11px] font-bold text-slate-500 font-khmer">
                          {learner.completedExercises?.length || 0} លំហាត់ &bull; {learner.gameRecords?.length || 0} ល្បែង
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setSelectedLearnerToInspect(learner)}
                            className="px-3 py-1 bg-sky-100 hover:bg-sky-200 text-sky-700 font-extrabold text-[11px] rounded-lg transition-colors cursor-pointer font-khmer flex items-center gap-1"
                          >
                            <Eye className="w-3 h-3" />
                            <span>ពិនិត្យលម្អិត</span>
                          </button>
                          {!isCurrentlyActive && (
                            <button
                              onClick={() => handleSwitchUser(learner.id)}
                              className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-[11px] rounded-lg transition-colors cursor-pointer font-khmer"
                            >
                              ប្រើគណនីនេះ
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}

          {/* Modal / Inspector Drawer for Selected Learner */}
          {selectedLearnerToInspect && (
            <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl max-w-2xl w-full p-6 border-2 border-[#1CB0F6] shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
                <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-14 h-14 rounded-2xl ${selectedLearnerToInspect.avatarColor || 'bg-[#1CB0F6]'} text-white font-black flex items-center justify-center text-2xl shadow-xs shrink-0 overflow-hidden`}>
                      {selectedLearnerToInspect.avatarUrl ? (
                        <img src={selectedLearnerToInspect.avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                      ) : (
                        selectedLearnerToInspect.name.charAt(0).toUpperCase()
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-black text-slate-800 text-lg">{selectedLearnerToInspect.name}</h3>
                        {selectedLearnerToInspect.id === currentUser.id ? (
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded-md font-khmer">
                            កំពុងប្រើប្រាស់
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-md">
                            {selectedLearnerToInspect.role.toUpperCase()}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 font-khmer mt-0.5">
                        ចូលរួម៖ {new Date(selectedLearnerToInspect.joinedAt).toLocaleDateString('km-KH')} &bull; សកម្មចុងក្រោយ៖ {formatKhmerTimeAgo(selectedLearnerToInspect.lastActiveAt)}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedLearnerToInspect(null)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs cursor-pointer font-khmer"
                  >
                    បិទ
                  </button>
                </div>

                {/* Inspection Category Score Breakdown */}
                {(() => {
                  const s = selectedLearnerToInspect.categoryScores || { grammar: 0, reading: 0, writing: 0, vocab: 0, games: 0 };
                  const total = s.grammar + s.reading + s.writing + s.vocab + s.games + (selectedLearnerToInspect.totalXp || 0);

                  return (
                    <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200 text-center">
                      <div className="bg-amber-100/80 rounded-xl p-2 border border-amber-200 col-span-2 sm:col-span-1">
                        <div className="text-[10px] font-black text-amber-800 font-khmer">ពិន្ទុសរុប</div>
                        <div className="text-sm font-black text-amber-900">{total} XP</div>
                      </div>
                      <div className="bg-emerald-50 rounded-xl p-2 border border-emerald-100">
                        <div className="text-[10px] font-bold text-emerald-800 font-khmer">វេយ្យាករណ៍</div>
                        <div className="text-xs font-black text-emerald-700">{s.grammar} XP</div>
                      </div>
                      <div className="bg-teal-50 rounded-xl p-2 border border-teal-100">
                        <div className="text-[10px] font-bold text-teal-800 font-khmer">អាន</div>
                        <div className="text-xs font-black text-teal-700">{s.reading} XP</div>
                      </div>
                      <div className="bg-purple-50 rounded-xl p-2 border border-purple-100">
                        <div className="text-[10px] font-bold text-purple-800 font-khmer">សរសេរ</div>
                        <div className="text-xs font-black text-purple-700">{s.writing} XP</div>
                      </div>
                      <div className="bg-sky-50 rounded-xl p-2 border border-sky-100">
                        <div className="text-[10px] font-bold text-sky-800 font-khmer">វាក្យសព្ទ</div>
                        <div className="text-xs font-black text-sky-700">{s.vocab} XP</div>
                      </div>
                      <div className="bg-amber-50 rounded-xl p-2 border border-amber-100">
                        <div className="text-[10px] font-bold text-amber-800 font-khmer">ល្បែង</div>
                        <div className="text-xs font-black text-amber-700">{s.games} XP</div>
                      </div>
                    </div>
                  );
                })()}

                {/* Exercises History Log */}
                <div className="space-y-2">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5 font-khmer">
                    <BookOpen className="w-4 h-4 text-[#1CB0F6]" />
                    <span>ប្រវត្តិលំហាត់ដែលបានអនុវត្ត ({selectedLearnerToInspect.completedExercises?.length || 0})</span>
                  </h4>

                  <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
                    {selectedLearnerToInspect.completedExercises?.length === 0 ? (
                      <div className="text-slate-400 italic text-center py-6 bg-slate-50 rounded-2xl font-khmer text-xs">
                        មិនទាន់មានទិន្នន័យលំហាត់នៅឡើយទេ
                      </div>
                    ) : (
                      selectedLearnerToInspect.completedExercises?.map((ex) => (
                        <div key={ex.id} className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center justify-between gap-3">
                          <div>
                            <div className="font-extrabold text-slate-800 text-xs">{ex.title}</div>
                            <div className="text-[11px] text-slate-500 font-khmer mt-0.5">
                              {ex.khmerTitle || ex.category} &bull; {new Date(ex.completedAt).toLocaleDateString('km-KH')}
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-black rounded-lg text-xs border border-emerald-200">
                              {ex.score}/{ex.total} ({ex.percentage}%)
                            </span>
                            <div className="text-[10px] font-bold text-amber-600 mt-1">
                              +{ex.xpEarned} XP
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Games Arena History Log */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5 font-khmer">
                    <Gamepad2 className="w-4 h-4 text-amber-500" />
                    <span>ប្រវត្តិកម្សាន្តល្បែង 7-Day Arena ({selectedLearnerToInspect.gameRecords?.length || 0})</span>
                  </h4>

                  <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
                    {selectedLearnerToInspect.gameRecords?.length === 0 ? (
                      <div className="text-slate-400 italic text-center py-4 bg-slate-50 rounded-2xl font-khmer text-xs">
                        មិនទាន់មានទិន្នន័យល្បែងនៅឡើយទេ
                      </div>
                    ) : (
                      selectedLearnerToInspect.gameRecords?.map((gm) => (
                        <div key={gm.id} className="bg-slate-50 p-2.5 rounded-2xl border border-slate-200 flex items-center justify-between gap-2">
                          <div>
                            <div className="font-extrabold text-slate-800 text-xs">{gm.gameMode}</div>
                            <div className="text-[10px] text-amber-600 font-bold font-khmer mt-0.5">{gm.category} &bull; {new Date(gm.playedAt).toLocaleDateString('km-KH')}</div>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="px-2.5 py-1 bg-amber-100 text-amber-900 font-black rounded-lg text-xs border border-amber-200">
                              {gm.score} ពិន្ទុ (Combo {gm.combo}x)
                            </span>
                            <div className="text-[9px] font-bold text-emerald-600 mt-0.5">
                              +{gm.xpEarned} XP &bull; +{gm.gemsEarned} 💎
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100">
                  {selectedLearnerToInspect.id !== currentUser.id && (
                    <button
                      onClick={() => {
                        handleSwitchUser(selectedLearnerToInspect.id);
                        setSelectedLearnerToInspect(null);
                      }}
                      className="px-4 py-2.5 bg-[#1CB0F6] hover:bg-[#1899D6] text-white text-xs font-black rounded-xl cursor-pointer font-khmer shadow-sm"
                    >
                      ប្តូរទៅប្រើគណនី {selectedLearnerToInspect.name}
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedLearnerToInspect(null)}
                    className="ml-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer font-khmer"
                  >
                    បិទការពិនិត្យ
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : isGuestUser ? (
        /* ========================================================================= */
        /* GUEST MODE - Show ONLY two buttons as requested                           */
        /* ========================================================================= */
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
            <UserPlus className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-700 text-center">
            <span className="block text-sm opacity-60 uppercase tracking-widest mb-1 font-sans">Welcome! Create a new learner</span>
            <span className="font-khmer">សូមស្វាគមន៍! សូមបង្កើតឈ្មោះសិស្សថ្មី</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setShowNewLearnerModal(true)}
              className="px-6 py-3 bg-[#58CC02] hover:bg-[#46A302] text-white font-black text-sm rounded-2xl flex items-center justify-center gap-2 shadow-sm cursor-pointer font-khmer transition-all active:scale-95"
            >
              <UserPlus className="w-5 h-5" />
              <span>បង្កើតអ្នកប្រើប្រាស់ថ្មី</span>
            </button>
            <button
              onClick={() => setShowAdminModal(true)}
              className="px-6 py-3 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-600 font-bold text-sm rounded-2xl flex items-center justify-center gap-2 cursor-pointer font-khmer transition-all active:scale-95"
            >
              <Lock className="w-5 h-5" />
              <span>ចូល Super Admin</span>
            </button>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* 2. REGULAR LEARNER / STUDENT PROFILE MODE                                 */
        /* ========================================================================= */
        <div className="space-y-6">
          {/* Main Learner Profile Card */}
      <div className="bg-white rounded-3xl p-6 border-2 border-[#E5E5E5] shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
        <div 
          className={`relative w-24 h-24 rounded-full ${currentUser.avatarColor || 'bg-[#1CB0F6]'} border-4 border-white shadow-md flex items-center justify-center text-white text-3xl font-black shrink-0 overflow-hidden group cursor-pointer`}
          onClick={() => fileInputRef.current?.click()}
          title="ចុចដើម្បីប្តូររូបថត Profile"
        >
          {currentUser.avatarUrl ? (
            <img src={currentUser.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <span>{currentUser.name.charAt(0).toUpperCase()}</span>
          )}
          
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-white text-xs font-bold font-khmer">ប្តូររូប</span>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleAvatarUpload} 
            accept="image/*" 
            className="hidden" 
          />
        </div>

        <div className="flex-1 space-y-3 w-full">
          <div>
            {isEditingName ? (
              <div className="flex items-center gap-2 max-w-md mx-auto sm:mx-0">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="វាយបញ្ចូលឈ្មោះរបស់អ្នក (មិនបាច់ដាក់លេខសម្ងាត់ទេ)..."
                  className="flex-1 px-3 py-2 rounded-xl border-2 border-[#1CB0F6] text-slate-800 font-bold text-sm outline-hidden font-khmer"
                  autoFocus
                />
                <button
                  onClick={handleSaveName}
                  className="px-4 py-2 bg-[#58CC02] hover:bg-[#46A302] text-white font-black text-xs rounded-xl flex items-center gap-1 shadow-sm cursor-pointer font-khmer"
                >
                  <Check className="w-4 h-4" />
                  <span>រក្សាទុក</span>
                </button>
                <button
                  onClick={() => {
                    setNameInput(currentUser.name);
                    setIsEditingName(false);
                  }}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl cursor-pointer"
                >
                  បោះបង់
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                <h1 className="text-2xl font-extrabold text-slate-900">
                  {currentUser.name}
                </h1>
                <button
                  onClick={() => setIsEditingName(true)}
                  title="កែប្រែឈ្មោះផ្ទាល់ខ្លួន (មិនបាច់ដាក់លេខសម្ងាត់ទេ)"
                  className="p-1.5 text-slate-400 hover:text-[#1CB0F6] hover:bg-sky-50 rounded-xl transition-colors cursor-pointer"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            )}

            <p className="text-xs text-slate-400 font-medium mt-0.5">
              បានចូលរួមសិក្សា • Learner ID: #{currentUser.id.substring(currentUser.id.length - 6).toUpperCase()}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center sm:justify-start items-center">
            <span className="px-3 py-1 bg-[#D7FFB8] text-[#58CC02] rounded-xl text-xs font-black uppercase flex items-center gap-1.5 font-khmer">
              <span>🇰🇭</span>
              <span>អ្នករៀនភាសាអង់គ្លេស</span>
            </span>

            {currentUser.role === 'admin' ? (
              <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-xl text-xs font-black uppercase flex items-center gap-1.5 border border-amber-300">
                <span>👑</span>
                <span>Super Admin</span>
              </span>
            ) : (
              <button
                onClick={() => setShowAdminModal(true)}
                className="px-3 py-1 bg-slate-100 hover:bg-amber-50 text-slate-600 hover:text-amber-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200 font-khmer"
              >
                <Lock className="w-3 h-3" />
                <span>ចូល Super Admin</span>
              </button>
            )}

            <button
              onClick={() => setShowNewLearnerModal(true)}
              className="px-3 py-1 bg-sky-50 hover:bg-sky-100 text-sky-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-sky-200 font-khmer"
            >
              <UserPlus className="w-3 h-3" />
              <span>ប្តូរ/បង្កើតឈ្មោះថ្មី</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Grand Total Score Summary Cards (សរុបពិន្ទុអោយគាត់លើ Profile របស់គាត់) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-slate-800 flex items-center gap-2 font-khmer">
            <BarChart3 className="w-5 h-5 text-[#58CC02]" />
            <span>សរុបពិន្ទុ និងស្ថិតិសិក្សា (Total Score Summary)</span>
          </h3>
          <span className="text-xs font-black text-[#58CC02] bg-[#D7FFB8] px-2.5 py-0.5 rounded-full">
            Total Points: {totalCalculatedPoints} XP
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white p-4 rounded-2xl border-2 border-[#E5E5E5] flex items-center gap-3">
            <div className="text-3xl">⚡</div>
            <div>
              <div className="text-xl font-black text-[#58CC02]">{totalCalculatedPoints}</div>
              <div className="text-[11px] font-bold text-slate-400 font-khmer">ពិន្ទុសរុប (Total XP)</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border-2 border-[#E5E5E5] flex items-center gap-3">
            <div className="text-3xl">🔥</div>
            <div>
              <div className="text-xl font-black text-[#FF9600]">{currentUser.streakDays}</div>
              <div className="text-[11px] font-bold text-slate-400 font-khmer">ថ្ងៃជាប់គ្នា (Streak)</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border-2 border-[#E5E5E5] flex items-center gap-3">
            <div className="text-3xl">📝</div>
            <div>
              <div className="text-xl font-black text-[#1CB0F6]">{currentUser.completedExercises?.length || 0}</div>
              <div className="text-[11px] font-bold text-slate-400 font-khmer">លំហាត់បានធ្វើរួច</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border-2 border-[#E5E5E5] flex items-center gap-3">
            <div className="text-3xl">🎮</div>
            <div>
              <div className="text-xl font-black text-[#CE82FF]">{currentUser.gameRecords?.length || 0}</div>
              <div className="text-[11px] font-bold text-slate-400 font-khmer">ល្បែងបានលេង</div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Profile Sub-Tabs Navigation */}
      <div className="flex border-b-2 border-slate-200 gap-2 sm:gap-4 overflow-x-auto">
        <button
          onClick={() => setProfileViewTab('achievements')}
          className={`pb-3 font-extrabold text-xs sm:text-sm transition-colors border-b-2 -mb-0.5 flex items-center gap-1.5 shrink-0 cursor-pointer font-khmer ${
            profileViewTab === 'achievements'
              ? 'border-[#58CC02] text-[#58CC02]'
              : 'border-transparent text-slate-400 hover:text-slate-700'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>សមិទ្ធផលទាំង ៥ ផ្នែក (5 Achievements)</span>
        </button>

        <button
          onClick={() => setProfileViewTab('exercise-history')}
          className={`pb-3 font-extrabold text-xs sm:text-sm transition-colors border-b-2 -mb-0.5 flex items-center gap-1.5 shrink-0 cursor-pointer font-khmer ${
            profileViewTab === 'exercise-history'
              ? 'border-[#1CB0F6] text-[#1CB0F6]'
              : 'border-transparent text-slate-400 hover:text-slate-700'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>លំហាត់ដែលធ្លាប់ធ្វើ ({currentUser.completedExercises?.length || 0})</span>
        </button>

        <button
          onClick={() => setProfileViewTab('game-history')}
          className={`pb-3 font-extrabold text-xs sm:text-sm transition-colors border-b-2 -mb-0.5 flex items-center gap-1.5 shrink-0 cursor-pointer font-khmer ${
            profileViewTab === 'game-history'
              ? 'border-[#FF9600] text-[#FF9600]'
              : 'border-transparent text-slate-400 hover:text-slate-700'
          }`}
        >
          <Gamepad2 className="w-4 h-4" />
          <span>ល្បែងដែលធ្លាប់លេង ({currentUser.gameRecords?.length || 0})</span>
        </button>
      </div>

      {/* 6. TAB 1: The 5 Requested Category Achievements (សមិទ្ធផល ៥ ផ្នែក) */}
      {profileViewTab === 'achievements' && (
        <div className="space-y-4">
          <div className="text-xs text-slate-500 font-khmer">
            សមិទ្ធផល និងកម្រិតចំណេះដឹងដែលត្រូវបានបែងចែកជា ៥ ផ្នែកចម្បង៖
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fiveCategoryAchievements.map((item, index) => {
              const IconComp = item.icon;
              return (
                <div 
                  key={item.id} 
                  className={`bg-white rounded-3xl p-5 border-2 ${item.borderColor} shadow-xs hover:shadow-md transition-all space-y-4`}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl ${item.iconBg} flex items-center justify-center text-white text-xl shadow-xs shrink-0`}>
                        <IconComp className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
                          ផ្នែកទី {index + 1}
                        </div>
                        <h4 className="text-sm sm:text-base font-black text-slate-800 font-khmer">
                          {item.categoryName}
                        </h4>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className={`text-base font-black ${item.colorText}`}>
                        {item.score} XP
                      </div>
                    </div>
                  </div>

                  {/* Quick Metrics Bar */}
                  <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-2xl border border-slate-100 text-center">
                    {item.metrics.map((met, mi) => (
                      <div key={mi}>
                        <div className="text-[10px] font-bold text-slate-400 font-khmer">{met.label}</div>
                        <div className="text-xs font-black text-slate-800">{met.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Badges List */}
                  <div className="space-y-2 pt-1">
                    <div className="text-[11px] font-black text-slate-500 uppercase tracking-wider font-khmer">
                      មេដាយសមិទ្ធផល (Badges)
                    </div>
                    
                    <div className="space-y-1.5">
                      {item.badges.map((b, bi) => (
                        <div 
                          key={bi}
                          className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 text-xs transition-colors ${
                            b.unlocked 
                              ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900' 
                              : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-base">{b.unlocked ? '🏅' : '🔒'}</span>
                            <div>
                              <div className="font-extrabold">{b.title}</div>
                              <div className="text-[10px] text-slate-500 font-khmer">{b.desc}</div>
                            </div>
                          </div>

                          <span className={`text-[10px] font-black px-2 py-0.5 rounded-md font-khmer ${
                            b.unlocked ? 'bg-emerald-200 text-emerald-800' : 'bg-slate-200 text-slate-500'
                          }`}>
                            {b.unlocked ? 'សម្រេច' : 'ចាក់សោ'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 7. TAB 2: Exercises Completed History (លំហាត់ដែលធ្លាប់ធ្វើ) */}
      {profileViewTab === 'exercise-history' && (
        <div className="bg-white rounded-3xl p-6 border-2 border-[#E5E5E5] shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-800 font-khmer">
                បញ្ជីលំហាត់ដែលបានធ្វើ និងពិន្ទុទទួលបាន
              </h3>
              <p className="text-xs text-slate-400 font-khmer">
                កត់ត្រារាល់ពេលអ្នកបញ្ជូនចម្លើយលំហាត់ក្នុងមេរៀននីមួយៗ
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 text-xs font-bold">
              {(['all', 'grammar', 'reading', 'writing', 'vocab'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setHistoryFilterCategory(cat)}
                  className={`px-3 py-1 rounded-xl transition-colors cursor-pointer font-khmer capitalize ${
                    historyFilterCategory === cat
                      ? 'bg-[#1CB0F6] text-white font-black'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat === 'all' ? 'ទាំងអស់' : cat === 'grammar' ? 'វេយ្យាករណ៍' : cat === 'reading' ? 'អាន' : cat === 'writing' ? 'សរសេរ' : 'វាក្យសព្ទ'}
                </button>
              ))}
            </div>
          </div>

          {filteredExercises.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="text-4xl">📚</div>
              <h4 className="text-base font-extrabold text-slate-700 font-khmer">
                មិនទាន់មានប្រវត្តិធ្វើលំហាត់ក្នុងផ្នែកនេះទេ
              </h4>
              <p className="text-xs text-slate-400 font-khmer max-w-sm mx-auto">
                សូមចូលទៅកាន់ផ្ទាំង «វេយ្យាករណ៍», «អានយល់ន័យ» ឬ «តែងនិពន្ធ» ដើម្បីហាត់ធ្វើលំហាត់ និងកត់ត្រាពិន្ទុ!
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredExercises.map((rec) => {
                const dateStr = new Date(rec.timestamp).toLocaleDateString('km-KH', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                });

                return (
                  <div key={rec.id} className="py-3.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white text-base font-black shrink-0 ${
                        rec.category === 'grammar' ? 'bg-[#58CC02]' :
                        rec.category === 'reading' ? 'bg-[#00CD9C]' :
                        rec.category === 'writing' ? 'bg-[#CE82FF]' : 'bg-[#1CB0F6]'
                      }`}>
                        {rec.category === 'grammar' ? '📚' :
                         rec.category === 'reading' ? '📖' :
                         rec.category === 'writing' ? '📝' : '💡'}
                      </div>

                      <div>
                        <div className="font-extrabold text-slate-800 text-sm">
                          {rec.title}
                        </div>
                        <div className="text-xs text-slate-400 font-khmer flex items-center gap-2">
                          <span>{rec.khmerTitle || rec.category}</span>
                          <span>&bull;</span>
                          <span>{dateStr}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className={`text-sm font-black ${
                        rec.percentage >= 80 ? 'text-[#58CC02]' :
                        rec.percentage >= 50 ? 'text-[#FF9600]' : 'text-[#FF4B4B]'
                      }`}>
                        {rec.score} / {rec.total} ({rec.percentage}%)
                      </div>
                      <div className="text-[11px] font-bold text-slate-400">
                        +{rec.xpEarned} XP
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 8. TAB 3: Games Played History (ល្បែងដែលធ្លាប់លេង) */}
      {profileViewTab === 'game-history' && (
        <div className="bg-white rounded-3xl p-6 border-2 border-[#E5E5E5] shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-base font-extrabold text-slate-800 font-khmer">
              បញ្ជីល្បែងដែលបានលេង និងពិន្ទុទទួលបាន
            </h3>
            <p className="text-xs text-slate-400 font-khmer">
              កត់ត្រារាល់ការលេងល្បែងក្នុង 7-Day All-Level Game Arena
            </p>
          </div>

          {filteredGames.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="text-4xl">🎮</div>
              <h4 className="text-base font-extrabold text-slate-700 font-khmer">
                មិនទាន់មានប្រវត្តិកម្សាន្តល្បែងនៅឡើយទេ
              </h4>
              <p className="text-xs text-slate-400 font-khmer max-w-sm mx-auto">
                សូមចូលទៅកាន់ផ្ទាំង «ល្បែងសិក្សា ៧ ថ្ងៃ (Games)» ដើម្បីប្រកួតប្រជែងចំណេះដឹង និងបង្កើនពិន្ទុ!
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredGames.map((gm) => {
                const dateStr = new Date(gm.timestamp).toLocaleDateString('km-KH', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                });

                return (
                  <div key={gm.id} className="py-3.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#FF9600] flex items-center justify-center text-white text-base font-black shrink-0">
                        🎮
                      </div>

                      <div>
                        <div className="font-extrabold text-slate-800 text-sm">
                          {gm.gameMode}
                        </div>
                        <div className="text-xs text-slate-400 font-khmer flex items-center gap-2">
                          <span className="text-[#FF9600] font-bold">{gm.category}</span>
                          <span>&bull;</span>
                          <span>{dateStr}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-sm font-black text-[#58CC02]">
                        {gm.score} ពិន្ទុ
                      </div>
                      <div className="text-[11px] font-bold text-amber-600">
                        Max Combo: {gm.combo}x &bull; +{gm.xpEarned} XP
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )}

  {/* 9. MODAL: Super Admin Login Modal (kafa / kafa@123) */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border-2 border-amber-300 shadow-2xl space-y-4 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center text-lg font-black">
                  👑
                </div>
                <div>
                  <h3 className="font-black text-slate-800 text-base font-khmer">ចូលជា Super Admin</h3>
                  <p className="text-[11px] text-slate-400 font-khmer">សម្រាប់ត្រួតពិនិត្យទិន្នន័យសិស្សទាំងអស់</p>
                </div>
              </div>
              <button 
                onClick={() => setShowAdminModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAdminLoginSubmit} className="space-y-3">
              {adminError && (
                <div className="p-2.5 rounded-xl bg-red-50 text-red-600 text-xs font-bold border border-red-200 font-khmer">
                  {adminError}
                </div>
              )}

              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">
                  USER NAME:
                </label>
                <input
                  type="text"
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  placeholder="វាយបញ្ចូល Username..."
                  className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl text-xs font-bold focus:border-amber-500 outline-hidden"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">
                  PASSWORD:
                </label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl text-xs font-bold focus:border-amber-500 outline-hidden"
                  required
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs rounded-xl shadow-md cursor-pointer font-khmer"
                >
                  ផ្ទៀងផ្ទាត់ និងចូល
                </button>
                <button
                  type="button"
                  onClick={() => setShowAdminModal(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer font-khmer"
                >
                  បិទ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 10. MODAL: Reset All Users Confirmation Modal */}
      {showResetConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border-2 border-rose-300 shadow-2xl space-y-4 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-xl shrink-0">
                <AlertTriangle className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h3 className="font-black text-slate-800 text-base font-khmer">បញ្ជាក់ការ Reset ទិន្នន័យទាំងអស់</h3>
                <p className="text-[11px] text-slate-400 font-khmer">សកម្មភាពនេះមិនអាចត្រឡប់ក្រោយបានឡើយ</p>
              </div>
            </div>

            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3.5 space-y-2">
              <p className="text-xs font-bold text-rose-900 font-khmer leading-relaxed">
                ⚠️ តើលោកអ្នកពិតជាចង់ <strong>Reset ព័ត៌មាន ឈ្មោះ និងពិន្ទុអ្នកប្រើប្រាស់ទាំងអស់</strong> ឡើងវិញមែនទេ?
              </p>
              <ul className="text-[11px] text-rose-800 space-y-1 font-khmer list-disc pl-4">
                <li>រាល់ប្រវត្តិលំហាត់ដែលធ្លាប់ធ្វើទាំងអស់ នឹងត្រូវលុបសម្អាត</li>
                <li>រាល់ប្រវត្តិល្បែង 7-Day Arena នឹងត្រូវកំណត់ឡើងវិញ</li>
                <li>ពិន្ទុ (Total XP) នៃអ្នករៀនទាំងអស់ នឹងត្រូវកំណត់មក 0 XP វិញ</li>
              </ul>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={handleConfirmResetAll}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs rounded-xl shadow-md cursor-pointer font-khmer flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>យល់ព្រម Reset ទាំងអស់</span>
              </button>
              <button
                type="button"
                onClick={() => setShowResetConfirmModal(false)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer font-khmer"
              >
                បោះបង់
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 11. MODAL: Create New Learner Profile */}
      {showNewLearnerModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border-2 border-[#1CB0F6] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-[#1CB0F6] text-white flex items-center justify-center text-lg font-black">
                  👤
                </div>
                <div>
                  <h3 className="font-black text-slate-800 text-base font-khmer">បង្កើតឈ្មោះសិស្សថ្មី</h3>
                  <p className="text-[11px] text-slate-400 font-khmer">មិនបាច់ដាក់លេខសម្ងាត់ទេ</p>
                </div>
              </div>
              <button 
                onClick={() => setShowNewLearnerModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1 font-khmer">
                  ឈ្មោះសិស្ស (Learner Name):
                </label>
                <input
                  type="text"
                  value={newLearnerName}
                  onChange={(e) => setNewLearnerName(e.target.value)}
                  placeholder="ឧទាហរណ៍៖ សុខា (Sokha), វិចិត្រ (Vicheth)..."
                  className="w-full px-3 py-2 border-2 border-slate-200 rounded-xl text-xs font-bold focus:border-[#1CB0F6] outline-hidden font-khmer"
                  autoFocus
                />
              </div>

              {/* Existing Learners List to switch directly */}
              <div className="space-y-1.5 pt-2">
                <div className="text-[11px] font-bold text-slate-400 font-khmer">
                  ឬជ្រើសរើសឈ្មោះសិស្សដែលមានស្រាប់៖
                </div>
                <div className="max-h-36 overflow-y-auto space-y-1 pr-1">
                  {allUsers.filter(u => u.role !== 'admin').map((u) => (
                    <button
                      key={u.id}
                      onClick={() => {
                        handleSwitchUser(u.id);
                        setShowNewLearnerModal(false);
                      }}
                      className={`w-full p-2 rounded-xl text-left text-xs font-bold flex items-center justify-between border transition-colors cursor-pointer ${
                        u.id === currentUser.id
                          ? 'bg-sky-50 border-sky-300 text-sky-900'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-lg ${u.avatarColor} text-white flex items-center justify-center text-xs font-black overflow-hidden`}>
                          {u.avatarUrl ? (
                            <img src={u.avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                          ) : (
                            u.name.charAt(0).toUpperCase()
                          )}
                        </div>
                        <span>{u.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {u.totalXp} XP
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleCreateNewLearner}
                  disabled={!newLearnerName.trim()}
                  className="flex-1 py-2.5 bg-[#58CC02] hover:bg-[#46A302] disabled:opacity-50 text-white font-black text-xs rounded-xl shadow-md cursor-pointer font-khmer"
                >
                  បង្កើត និងចាប់ផ្តើមរៀន
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewLearnerModal(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer font-khmer"
                >
                  បិទ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
