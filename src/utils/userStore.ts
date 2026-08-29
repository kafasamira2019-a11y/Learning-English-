export interface CompletedExerciseRecord {
  id: string;
  category: 'grammar' | 'reading' | 'writing' | 'vocab';
  title: string;
  khmerTitle?: string;
  score: number;
  total: number;
  percentage: number;
  xpEarned: number;
  timestamp: number;
}

export interface PlayedGameRecord {
  id: string;
  gameMode: string;
  category: string;
  score: number;
  combo: number;
  xpEarned: number;
  timestamp: number;
  dayInCycle?: number;
}

export interface UserCategoryScores {
  grammar: number;
  reading: number;
  writing: number;
  vocab: number;
  games: number;
}

export interface UserProfile {
  id: string;
  name: string;
  role: 'user' | 'admin';
  avatarColor: string;
  avatarUrl?: string;
  joinedAt: number;
  lastActiveAt: number;
  streakDays: number;
  totalXp: number;
  gems: number;
  hearts: number;
  categoryScores: UserCategoryScores;
  completedExercises: CompletedExerciseRecord[];
  gameRecords: PlayedGameRecord[];
  completedUnits: number[];
  quizResults: { [unitId: number]: { score: number; total: number; timestamp: number } };
  exerciseAttempts: { [key: string]: boolean };
}

const STORAGE_KEY_CURRENT_USER_ID = 'kafa_current_user_id';
const STORAGE_KEY_ALL_USERS = 'kafa_all_users_registry';

const AVATAR_COLORS = [
  'bg-[#1CB0F6]',
  'bg-[#58CC02]',
  'bg-[#CE82FF]',
  'bg-[#FF9600]',
  'bg-[#FF4B4B]',
  'bg-[#00CD9C]'
];

// Helper to seed initial sample users if empty so Super Admin has rich data to inspect
function createDefaultUsers(): UserProfile[] {
  const now = Date.now();
  
  const defaultUser: UserProfile = {
    id: 'user_default_' + Math.random().toString(36).substring(2, 9),
    name: 'សិស្សភាសាអង់គ្លេស (Learner)',
    role: 'user',
    avatarColor: 'bg-[#1CB0F6]',
    joinedAt: now - 86400000 * 5,
    lastActiveAt: now,
    streakDays: 5,
    totalXp: 420,
    gems: 350,
    hearts: 5,
    categoryScores: {
      grammar: 180,
      reading: 90,
      writing: 60,
      vocab: 40,
      games: 50
    },
    completedExercises: [
      {
        id: 'ex_u1',
        category: 'grammar',
        title: 'Unit 1: Present continuous',
        khmerTitle: 'បច្ចុប្បន្នកាលកំពុងបន្ត',
        score: 4,
        total: 4,
        percentage: 100,
        xpEarned: 40,
        timestamp: now - 86400000 * 2
      },
      {
        id: 'ex_u2',
        category: 'grammar',
        title: 'Unit 2: Present simple',
        khmerTitle: 'បច្ចុប្បន្នកាលធម្មតា',
        score: 4,
        total: 4,
        percentage: 100,
        xpEarned: 40,
        timestamp: now - 86400000
      },
      {
        id: 'ex_rd1',
        category: 'reading',
        title: 'Reading Warm-Up 1: The Angkor Wonder',
        khmerTitle: 'អានយល់ន័យ៖ អច្ឆរិយៈអង្គរវត្ត',
        score: 5,
        total: 5,
        percentage: 100,
        xpEarned: 50,
        timestamp: now - 86400000 * 3
      },
      {
        id: 'ex_wr1',
        category: 'writing',
        title: 'Academic Writing: Introduction & Thesis',
        khmerTitle: 'ការសរសេរអារម្ភកថា និងគំនិតចម្បង',
        score: 3,
        total: 4,
        percentage: 75,
        xpEarned: 35,
        timestamp: now - 86400000 * 2
      },
      {
        id: 'ex_vb1',
        category: 'vocab',
        title: 'Daily Vocabulary: Academic Words Day 1',
        khmerTitle: 'វាក្យសព្ទប្រចាំថ្ងៃ៖ ឈុតទី ១',
        score: 5,
        total: 5,
        percentage: 100,
        xpEarned: 40,
        timestamp: now - 3600000 * 5
      }
    ],
    gameRecords: [
      {
        id: 'gm_1',
        gameMode: '7-Day Arena - Day 1',
        category: 'វេយ្យាករណ៍ (Grammar)',
        score: 320,
        combo: 5,
        xpEarned: 32,
        timestamp: now - 86400000 * 2,
        dayInCycle: 1
      },
      {
        id: 'gm_2',
        gameMode: '7-Day Arena - Day 2',
        category: 'វាក្យសព្ទ (Vocabulary)',
        score: 410,
        combo: 7,
        xpEarned: 41,
        timestamp: now - 3600000 * 10,
        dayInCycle: 2
      }
    ],
    completedUnits: [1, 2],
    quizResults: {
      1: { score: 4, total: 4, timestamp: now - 86400000 * 2 },
      2: { score: 4, total: 4, timestamp: now - 86400000 }
    },
    exerciseAttempts: {
      '1-u1-ex1': true,
      '1-u1-ex2': true,
      '2-u2-ex1': true
    }
  };

  const sampleUser2: UserProfile = {
    id: 'user_sokha_' + Math.random().toString(36).substring(2, 9),
    name: 'សុខា (Sokha Chan)',
    role: 'user',
    avatarColor: 'bg-[#58CC02]',
    joinedAt: now - 86400000 * 10,
    lastActiveAt: now - 3600000 * 3,
    streakDays: 8,
    totalXp: 680,
    gems: 520,
    hearts: 5,
    categoryScores: {
      grammar: 320,
      reading: 140,
      writing: 80,
      vocab: 60,
      games: 80
    },
    completedExercises: [
      {
        id: 'ex_s_u1',
        category: 'grammar',
        title: 'Unit 1 & 2 Master Test',
        khmerTitle: 'តេស្តវេយ្យាករណ៍ Unit 1 & 2',
        score: 8,
        total: 8,
        percentage: 100,
        xpEarned: 80,
        timestamp: now - 86400000 * 4
      },
      {
        id: 'ex_s_rd1',
        category: 'reading',
        title: 'Reading Warm-Up 2: Climate Impact',
        khmerTitle: 'អត្ថបទអាន៖ បម្រែបម្រួលអាកាសធាតុ',
        score: 5,
        total: 5,
        percentage: 100,
        xpEarned: 50,
        timestamp: now - 86400000 * 2
      }
    ],
    gameRecords: [
      {
        id: 'gm_s1',
        gameMode: '7-Day Arena - Day 3',
        category: 'តែងនិពន្ធ (Writing)',
        score: 520,
        combo: 9,
        xpEarned: 52,
        timestamp: now - 86400000,
        dayInCycle: 3
      }
    ],
    completedUnits: [1, 2, 3, 4],
    quizResults: {},
    exerciseAttempts: {}
  };

  const sampleUser3: UserProfile = {
    id: 'user_dara_' + Math.random().toString(36).substring(2, 9),
    name: 'តារា (Dara Rith)',
    role: 'user',
    avatarColor: 'bg-[#CE82FF]',
    joinedAt: now - 86400000 * 14,
    lastActiveAt: now - 3600000 * 12,
    streakDays: 14,
    totalXp: 1150,
    gems: 940,
    hearts: 5,
    categoryScores: {
      grammar: 450,
      reading: 280,
      writing: 180,
      vocab: 120,
      games: 120
    },
    completedExercises: [
      {
        id: 'ex_d_u1',
        category: 'grammar',
        title: 'Unit 5: Past Simple & Past Continuous',
        khmerTitle: 'អតីតកាលធម្មតា និងអតីតកាលកំពុងបន្ត',
        score: 8,
        total: 8,
        percentage: 100,
        xpEarned: 80,
        timestamp: now - 86400000 * 3
      }
    ],
    gameRecords: [
      {
        id: 'gm_d1',
        gameMode: '7-Day Arena - Day 4',
        category: 'វាក្យសព្ទ (Vocabulary)',
        score: 680,
        combo: 12,
        xpEarned: 68,
        timestamp: now - 86400000 * 2,
        dayInCycle: 4
      }
    ],
    completedUnits: [1, 2, 3, 4, 5, 6, 7],
    quizResults: {},
    exerciseAttempts: {}
  };

  return [defaultUser, sampleUser2, sampleUser3];
}

class UserStoreManager {
  private users: UserProfile[] = [];
  private currentUserId: string = '';

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const savedUsers = localStorage.getItem(STORAGE_KEY_ALL_USERS);
      if (savedUsers) {
        const parsed = JSON.parse(savedUsers);
        this.users = Array.isArray(parsed) ? parsed : createDefaultUsers();
      } else {
        this.users = createDefaultUsers();
        this.saveAllUsers();
      }

      const savedCurrentId = localStorage.getItem(STORAGE_KEY_CURRENT_USER_ID);
      if (savedCurrentId && this.users.some(u => u.id === savedCurrentId)) {
        this.currentUserId = savedCurrentId;
      } else {
        this.currentUserId = this.users[0].id;
        localStorage.setItem(STORAGE_KEY_CURRENT_USER_ID, this.currentUserId);
      }
    } catch (e) {
      console.warn('Failed to load user storage', e);
      this.users = createDefaultUsers();
      this.currentUserId = this.users[0].id;
    }
  }

  private saveAllUsers() {
    try {
      localStorage.setItem(STORAGE_KEY_ALL_USERS, JSON.stringify(this.users));
    } catch (e) {
      console.warn('Failed to save all users to storage', e);
    }
  }

  public getCurrentUser(): UserProfile {
    let user = this.users.find(u => u.id === this.currentUserId);
    if (!user) {
      user = this.users[0] || createDefaultUsers()[0];
      this.currentUserId = user.id;
      localStorage.setItem(STORAGE_KEY_CURRENT_USER_ID, this.currentUserId);
    }
    return user;
  }

  public getAllUsers(): UserProfile[] {
    return [...this.users];
  }

  public updateUserName(newName: string): UserProfile {
    const trimmed = newName.trim();
    if (!trimmed) return this.getCurrentUser();

    const user = this.getCurrentUser();
    user.name = trimmed;
    user.lastActiveAt = Date.now();
    this.saveAllUsers();
    return { ...user };
  }

  public updateUserAvatar(newAvatarUrl: string): UserProfile {
    const user = this.getCurrentUser();
    user.avatarUrl = newAvatarUrl.trim() || undefined;
    user.lastActiveAt = Date.now();
    this.saveAllUsers();
    return { ...user };
  }

  public switchUser(userId: string): UserProfile | null {
    const target = this.users.find(u => u.id === userId);
    if (target) {
      this.currentUserId = target.id;
      localStorage.setItem(STORAGE_KEY_CURRENT_USER_ID, target.id);
      return { ...target };
    }
    return null;
  }

  public createNewLearner(name: string): UserProfile {
    const trimmed = name.trim() || 'សិស្សថ្មី (New Learner)';
    const randomColor = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
    const newUser: UserProfile = {
      id: 'user_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 6),
      name: trimmed,
      role: 'user',
      avatarColor: randomColor,
      joinedAt: Date.now(),
      lastActiveAt: Date.now(),
      streakDays: 1,
      totalXp: 0,
      gems: 100,
      hearts: 5,
      categoryScores: {
        grammar: 0,
        reading: 0,
        writing: 0,
        vocab: 0,
        games: 0
      },
      completedExercises: [],
      gameRecords: [],
      completedUnits: [],
      quizResults: {},
      exerciseAttempts: {}
    };

    this.users.unshift(newUser);
    this.currentUserId = newUser.id;
    localStorage.setItem(STORAGE_KEY_CURRENT_USER_ID, newUser.id);
    this.saveAllUsers();
    return { ...newUser };
  }

  public loginAsAdmin(usernameInput: string, passwordInput: string): { success: boolean; message: string; user?: UserProfile } {
    const u = usernameInput.trim();
    const p = passwordInput.trim();

    if (u === 'kafa' && p === 'kafa@123') {
      let adminUser = this.users.find(usr => usr.role === 'admin' || usr.id === 'admin_kafa_master');
      if (!adminUser) {
        adminUser = {
          id: 'admin_kafa_master',
          name: 'Super Admin (អ្នកគ្រប់គ្រង)',
          role: 'admin',
          avatarColor: 'bg-[#FF9600]',
          joinedAt: Date.now() - 86400000 * 30,
          lastActiveAt: Date.now(),
          streakDays: 0,
          totalXp: 0,
          gems: 0,
          hearts: 5,
          categoryScores: {
            grammar: 0,
            reading: 0,
            writing: 0,
            vocab: 0,
            games: 0
          },
          completedExercises: [],
          gameRecords: [],
          completedUnits: [],
          quizResults: {},
          exerciseAttempts: {}
        };
        this.users.unshift(adminUser);
      } else {
        adminUser.role = 'admin';
        adminUser.totalXp = 0;
      }

      this.currentUserId = adminUser.id;
      localStorage.setItem(STORAGE_KEY_CURRENT_USER_ID, adminUser.id);
      this.saveAllUsers();
      return { success: true, message: 'បានចូលជា Super Admin ដោយជោគជ័យ!', user: adminUser };
    }

    return { success: false, message: 'ឈ្មោះអ្នកប្រើ ឬលេខសម្ងាត់មិនត្រឹមត្រូវទេ!' };
  }

  public logoutAdmin(): UserProfile {
    // Switch to first non-admin user or create one
    const regularUser = this.users.find(u => u.role !== 'admin') || this.createNewLearner('សិស្សភាសាអង់គ្លេស');
    this.currentUserId = regularUser.id;
    localStorage.setItem(STORAGE_KEY_CURRENT_USER_ID, regularUser.id);
    return { ...regularUser };
  }

  public recordExerciseCompletion(
    category: 'grammar' | 'reading' | 'writing' | 'vocab',
    title: string,
    khmerTitle: string,
    score: number,
    total: number,
    xpEarned: number
  ): UserProfile {
    const user = this.getCurrentUser();
    const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
    
    const record: CompletedExerciseRecord = {
      id: 'ex_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 5),
      category,
      title,
      khmerTitle,
      score,
      total,
      percentage,
      xpEarned,
      timestamp: Date.now()
    };

    user.completedExercises = [record, ...user.completedExercises];
    user.categoryScores[category] = (user.categoryScores[category] || 0) + xpEarned;
    user.totalXp += xpEarned;
    user.lastActiveAt = Date.now();

    this.saveAllUsers();
    return { ...user };
  }

  public recordGameCompletion(
    gameMode: string,
    categoryName: string,
    score: number,
    combo: number,
    xpEarned: number,
    gemsEarned: number,
    dayInCycle?: number
  ): UserProfile {
    const user = this.getCurrentUser();
    
    const record: PlayedGameRecord = {
      id: 'gm_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 5),
      gameMode,
      category: categoryName,
      score,
      combo,
      xpEarned,
      timestamp: Date.now(),
      dayInCycle
    };

    user.gameRecords = [record, ...user.gameRecords];
    user.categoryScores.games = (user.categoryScores.games || 0) + xpEarned;
    user.totalXp += xpEarned;
    user.gems += gemsEarned;
    user.lastActiveAt = Date.now();

    this.saveAllUsers();
    return { ...user };
  }

  public updateStats(xp: number, gems: number, hearts: number, streak: number) {
    const user = this.getCurrentUser();
    user.totalXp = xp;
    user.gems = gems;
    user.hearts = hearts;
    user.streakDays = streak;
    user.lastActiveAt = Date.now();
    this.saveAllUsers();
  }

  public deleteUser(userId: string): boolean {
    if (this.users.length <= 1) return false;
    this.users = this.users.filter(u => u.id !== userId);
    if (this.currentUserId === userId) {
      this.currentUserId = this.users[0].id;
      localStorage.setItem(STORAGE_KEY_CURRENT_USER_ID, this.currentUserId);
    }
    this.saveAllUsers();
    return true;
  }

  public resetAllUsersData(): UserProfile {
    const now = Date.now();
    const cleanUser: UserProfile = {
      id: 'user_main_' + Date.now().toString(36),
      name: 'សិស្សភាសាអង់គ្លេស (Learner)',
      role: 'user',
      avatarColor: 'bg-[#1CB0F6]',
      joinedAt: now,
      lastActiveAt: now,
      streakDays: 1,
      totalXp: 0,
      gems: 100,
      hearts: 5,
      categoryScores: {
        grammar: 0,
        reading: 0,
        writing: 0,
        vocab: 0,
        games: 0
      },
      completedExercises: [],
      gameRecords: [],
      completedUnits: [],
      quizResults: {},
      exerciseAttempts: {}
    };

    const cleanAdmin: UserProfile = {
      id: 'admin_kafa',
      name: 'Super Admin (kafa)',
      role: 'admin',
      avatarColor: 'bg-amber-500',
      joinedAt: now,
      lastActiveAt: now,
      streakDays: 1,
      totalXp: 0,
      gems: 500,
      hearts: 5,
      categoryScores: {
        grammar: 0,
        reading: 0,
        writing: 0,
        vocab: 0,
        games: 0
      },
      completedExercises: [],
      gameRecords: [],
      completedUnits: [],
      quizResults: {},
      exerciseAttempts: {}
    };

    const currentIsAdmin = this.getCurrentUser().role === 'admin';
    this.users = [cleanUser, cleanAdmin];
    this.currentUserId = currentIsAdmin ? cleanAdmin.id : cleanUser.id;

    localStorage.setItem(STORAGE_KEY_CURRENT_USER_ID, this.currentUserId);
    this.saveAllUsers();

    try {
      localStorage.removeItem('murphy_grammar_completed_units');
      localStorage.removeItem('murphy_grammar_quiz_results');
      localStorage.removeItem('murphy_grammar_exercise_attempts');
    } catch {
      // ignore
    }

    return this.getCurrentUser();
  }
}

export const userStore = new UserStoreManager();
