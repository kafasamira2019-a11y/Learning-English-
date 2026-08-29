export type LevelType = 'all' | 'elementary' | 'intermediate' | 'advanced';

export type TabType = 
  | 'learn'
  | 'lessons' 
  | 'academic-writing' 
  | 'reading' 
  | 'vocabulary'
  | 'games'
  | 'exercises' 
  | 'quiz' 
  | 'study-guide' 
  | 'irregular-verbs' 
  | 'leaderboards'
  | 'quests'
  | 'shop'
  | 'profile'
  | 'progress'
  | 'ai-tutor';

export interface PathNode {
  id: string;
  type: 'lesson' | 'practice' | 'chest' | 'audio' | 'trophy' | 'writing' | 'reading';
  unitId?: number;
  sectionId?: string;
  readingId?: string;
  titleEn: string;
  titleKh: string;
  xp: number;
  status: 'completed' | 'active' | 'locked';
  icon: 'star' | 'chest' | 'headphones' | 'dumbbell' | 'trophy' | 'book';
  stepIndex: number;
  alignment: 'center' | 'left' | 'right' | 'far-left' | 'far-right';
}

export interface DuolingoQuest {
  id: string;
  titleEn: string;
  titleKh: string;
  current: number;
  target: number;
  rewardXp: number;
  rewardGems: number;
  completed: boolean;
  claimed: boolean;
  icon: string;
}

export interface ShopItem {
  id: string;
  titleEn: string;
  titleKh: string;
  descriptionEn: string;
  descriptionKh: string;
  gemCost: number;
  icon: string;
  purchased: boolean;
  category: 'boosts' | 'hearts' | 'cosmetics' | 'pro';
}

export type ExerciseSectionMode = 'grammar' | 'writing' | 'reading';

export interface ReadingQuestionOption {
  label: 'a' | 'b' | 'c' | 'd';
  text: string;
  isCorrect: boolean;
}

export interface ReadingQuestion {
  id: string;
  questionNumber: number;
  promptEn: string;
  promptKh: string;
  options: ReadingQuestionOption[];
  correctAnswer: 'a' | 'b' | 'c' | 'd';
  explanationEn: string;
  explanationKh: string;
}

export interface ReadingWarmUp {
  id: string;
  warmUpNumber: number;
  pageNumber: number;
  title: string;
  khmerTitle: string;
  category: string;
  khmerCategory: string;
  genre: 'nonfiction' | 'fiction';
  passage: string;
  passageKhmer: string;
  paragraphs: {
    en: string;
    kh: string;
  }[];
  vocabulary: {
    word: string;
    pos: string;
    meaningKh: string;
    phonetic?: string;
  }[];
  questions: ReadingQuestion[];
}

export interface AcademicWritingSection {
  id: string;
  sectionNumber: number;
  title: string;
  khmerTitle: string;
  badge: string;
  category: string;
  overviewEn: string;
  overviewKh: string;
  rules: {
    ruleTitle: string;
    ruleKhmerTitle: string;
    explanationEn: string;
    explanationKh: string;
    keyTips: string[];
    beforeAfterExamples: {
      original: string;
      revised: string;
      explanation: string;
      khmerExplanation: string;
    }[];
  }[];
  subsections: {
    id: string;
    code: string; // e.g. "1.1", "2.3", "5.8"
    title: string;
    khmerTitle: string;
    guide: string;
    khmerGuide: string;
    exercises: {
      id: string;
      type: 'multiple-choice' | 'rewrite' | 'selection' | 'fill-blank';
      promptEn: string;
      promptKh: string;
      originalSentence?: string;
      options?: { label: string; text: string; isCorrect: boolean }[];
      correctAnswer: string;
      alternativeAnswers?: string[];
      explanationEn: string;
      explanationKh: string;
    }[];
  }[];
  paperTemplates?: {
    sectionName: string;
    khmerSectionName: string;
    structureSteps: {
      stepNumber: number;
      title: string;
      sentencesCount: string;
      descriptionEn: string;
      descriptionKh: string;
      exampleSnippet: string;
    }[];
  }[];
}

export type CategoryType = 
  | 'present-past'
  | 'present-perfect'
  | 'future'
  | 'modals'
  | 'if-wish'
  | 'passive'
  | 'reported-speech'
  | 'questions-aux'
  | 'ing-to'
  | 'articles-nouns'
  | 'pronouns'
  | 'adjectives-adverbs'
  | 'prepositions'
  | 'phrasal-verbs'
  | 'general';

export interface GrammarRuleSection {
  title: string;
  khmerTitle?: string;
  explanation: string;
  khmerExplanation: string;
  formula?: string;
  examples: {
    en: string;
    kh: string;
    note?: string;
  }[];
  comparisons?: {
    leftTitle: string;
    leftExamples: string[];
    rightTitle: string;
    rightExamples: string[];
  };
  keyNotes?: string[];
}

export type ExerciseType = 'fill-blank' | 'multiple-choice' | 'correction' | 'matching' | 'reorder';

export interface ExerciseItem {
  id: string;
  type: ExerciseType;
  instruction: string;
  khmerInstruction?: string;
  prompt?: string;
  context?: string;
  options?: string[];
  correctAnswers: string[]; // can support multiple variations
  explanation: string;
  khmerExplanation: string;
}

export interface UnitData {
  id: number;
  unitNumber: number;
  title: string;
  khmerTitle: string;
  category: CategoryType;
  categoryName: string;
  khmerCategoryName: string;
  level: LevelType;
  summary: string;
  khmerSummary: string;
  sections: GrammarRuleSection[];
  exercises: ExerciseItem[];
}

export interface DiagnosticQuestion {
  id: string;
  category: string;
  khmerCategory: string;
  questionNumber: string;
  sentence: string;
  options: {
    label: string;
    text: string;
    isCorrect?: boolean;
  }[];
  correctAnswers: string[]; // e.g. ['A'] or ['A', 'C']
  targetUnits: number[];
  explanation: string;
  khmerExplanation: string;
}

export interface IrregularVerb {
  infinitive: string;
  pastSimple: string;
  pastParticiple: string;
  meaningKh: string;
  exampleSentence?: string;
}

export interface UserAnswerRecord {
  exerciseId: string;
  userAnswer: string;
  isCorrect: boolean;
  timestamp: number;
}

export interface UnitProgress {
  unitId: number;
  completedSections: boolean;
  exercisesScore?: number;
  exercisesTotal?: number;
  quizScore?: number;
  quizTotal?: number;
  lastStudiedAt: number;
}
