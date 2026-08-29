import { LevelType } from '../types';

export type GameCategory = 'grammar' | 'writing' | 'reading' | 'vocabulary' | 'all-round';
export type GameFormat = 'multiple-choice' | 'error-hunt' | 'sentence-scramble' | 'reading-sprint' | 'vocab-match' | 'cloze-fill' | 'image-description';

export interface GameOption {
  id: string;
  text: string;
  khText?: string;
  isCorrect: boolean;
}

export interface GameQuestion {
  id: string;
  category: 'grammar' | 'writing' | 'reading' | 'vocabulary' | 'image-description';
  level: 'elementary' | 'intermediate' | 'advanced';
  format: GameFormat;
  titleEn: string;
  titleKh: string;
  promptEn: string;
  promptKh: string;
  imageUrl?: string; // For image-description games
  contextPassageEn?: string;
  contextPassageKh?: string;
  scrambleWords?: string[]; // for sentence re-order games
  errorSentence?: string; // for error hunt games
  options: GameOption[];
  correctAnswer: string;
  explanationEn: string;
  explanationKh: string;
  points: number;
}

export interface DayMission {
  dayNumber: number; // 1 to 7
  titleEn: string;
  titleKh: string;
  focusCategory: GameCategory;
  descriptionEn: string;
  descriptionKh: string;
  targetScore: number;
  rewardXp: number;
  rewardGems: number;
  badgeEmoji: string;
  isCompleted?: boolean;
}

export interface WeeklyGamePackage {
  weekNumber: number;
  seasonNameEn: string;
  seasonNameKh: string;
  startDate: Date;
  endDate: Date;
  dayInCycle: number; // 1 to 7
  daysRemaining: number;
  hoursRemaining: number;
  minutesRemaining: number;
  secondsRemaining: number;
  dailyMissions: DayMission[];
  currentDayMission: DayMission;
  weeklyQuestions: GameQuestion[];
  leaderboardSeed: Array<{ rank: number; name: string; avatar: string; score: number; level: string; isUser?: boolean }>;
}

export const ALL_GAME_QUESTIONS: GameQuestion[] = [
  // =========================================================================
  // 1. GRAMMAR GAMES (ELEMENTARY A1-A2, INTERMEDIATE B1-B2, ADVANCED C1-C2)
  // =========================================================================
  {
    id: 'g-elem-1',
    category: 'grammar',
    level: 'elementary',
    format: 'cloze-fill',
    titleEn: 'Present Simple vs Present Continuous',
    titleKh: 'បច្ចុប្បន្នកាលធម្មតា ទល់នឹង បច្ចុប្បន្នកំពុងបន្ត',
    promptEn: 'Look! The baby _____ right now.',
    promptKh: 'មើលន៎! ទារកកំពុងតែ _____ ឥឡូវនេះ។',
    options: [
      { id: '1', text: 'is sleeping', isCorrect: true },
      { id: '2', text: 'sleeps', isCorrect: false },
      { id: '3', text: 'slept', isCorrect: false },
      { id: '4', text: 'sleeping', isCorrect: false }
    ],
    correctAnswer: 'is sleeping',
    explanationEn: 'We use the Present Continuous (is sleeping) for actions happening right at the moment of speaking (indicated by "Look!" and "right now").',
    explanationKh: 'យើងប្រើ Present Continuous (is + V-ing) សម្រាប់សកម្មភាពដែលកំពុងកើតឡើងជាក់ស្ដែងនៅពេលនិយាយ (មានពាក្យ "Look!" និង "right now")។',
    points: 100
  },
  {
    id: 'g-elem-2',
    category: 'grammar',
    level: 'elementary',
    format: 'error-hunt',
    titleEn: 'Past Simple Auxiliary Verb',
    titleKh: 'កិរិយាសព្ទជំនួយ Did ក្នុងអតីតកាល',
    promptEn: 'Find the grammar mistake in this sentence:',
    promptKh: 'រកកំហុសវេយ្យាករណ៍នៅក្នុងប្រយោគនេះ៖',
    errorSentence: 'She did not went to school yesterday because of rain.',
    options: [
      { id: '1', text: 'Change "went" to "go"', isCorrect: true },
      { id: '2', text: 'Change "did not" to "does not"', isCorrect: false },
      { id: '3', text: 'Change "rain" to "rains"', isCorrect: false },
      { id: '4', text: 'Change "because of" to "although"', isCorrect: false }
    ],
    correctAnswer: 'Change "went" to "go"',
    explanationEn: 'After the past auxiliary "did not", the main verb must always be in the base infinitive form (go), not past tense (went).',
    explanationKh: 'នៅក្រោយកិរិយាសព្ទជំនួយ "did not" កិរិយាសព្ទមេត្រូវតែស្ថិតក្នុងទម្រង់ដើម (Base Form: go) មិនអាចប្រើ went នោះទេ។',
    points: 120
  },
  {
    id: 'g-elem-3',
    category: 'grammar',
    level: 'elementary',
    format: 'multiple-choice',
    titleEn: 'Countable vs Uncountable Quantifiers',
    titleKh: 'បរិមាណសព្ទ Much និង Many',
    promptEn: 'How _____ water do we need for the soup?',
    promptKh: 'តើយើងត្រូវការទឹក _____ សម្រាប់ស៊ុបនេះ?',
    options: [
      { id: '1', text: 'much', isCorrect: true },
      { id: '2', text: 'many', isCorrect: false },
      { id: '3', text: 'few', isCorrect: false },
      { id: '4', text: 'a few', isCorrect: false }
    ],
    correctAnswer: 'much',
    explanationEn: '"Water" is an uncountable noun, so we must use "How much". "Many" and "few" are used with countable nouns.',
    explanationKh: '"Water" ជានាមរាប់មិនបាន (Uncountable Noun) ដូច្នេះត្រូវប្រើ "How much"។ ចំណែក "Many/Few" ប្រើជាមួយនាមរាប់បាន។',
    points: 100
  },
  {
    id: 'g-inter-1',
    category: 'grammar',
    level: 'intermediate',
    format: 'multiple-choice',
    titleEn: 'Conditionals (Type 2 - Hypothetical)',
    titleKh: 'ប្រយោគលក្ខខណ្ឌប្រភេទទី ២ (មិនពិតក្នុងបច្ចុប្បន្ន)',
    promptEn: 'If I _____ a million dollars, I would travel around the world.',
    promptKh: 'ប្រសិនបើខ្ញុំ _____ ប្រាក់មួយលានដុល្លារ ខ្ញុំនឹងធ្វើដំណើរជុំវិញពិភពលោក។',
    options: [
      { id: '1', text: 'had', isCorrect: true },
      { id: '2', text: 'have', isCorrect: false },
      { id: '3', text: 'will have', isCorrect: false },
      { id: '4', text: 'would have', isCorrect: false }
    ],
    correctAnswer: 'had',
    explanationEn: 'In Second Conditional (hypothetical situations), the IF-clause uses the Past Simple (had) while the main clause uses would + base verb.',
    explanationKh: 'ក្នុងប្រយោគលក្ខខណ្ឌប្រភេទទី ២ (សន្មតមិនពិត) ឃ្លា IF ប្រើ Past Simple (had) ហើយឃ្លាមេប្រើ would + v1។',
    points: 150
  },
  {
    id: 'g-inter-2',
    category: 'grammar',
    level: 'intermediate',
    format: 'cloze-fill',
    titleEn: 'Passive Voice in Present Perfect',
    titleKh: 'អំពើទទួល (Passive Voice) ក្នុងកាល Present Perfect',
    promptEn: 'The new bridge across the river _____ by the engineers recently.',
    promptKh: 'ស្ពានថ្មីឆ្លងកាត់ទន្លេ _____ ដោយវិស្វករកាលពីពេលថ្មីៗនេះ។',
    options: [
      { id: '1', text: 'has been built', isCorrect: true },
      { id: '2', text: 'has built', isCorrect: false },
      { id: '3', text: 'was building', isCorrect: false },
      { id: '4', text: 'is build', isCorrect: false }
    ],
    correctAnswer: 'has been built',
    explanationEn: 'The bridge is the receiver of the action (Passive Voice) and "recently" signals Present Perfect: has/have + been + V3.',
    explanationKh: 'ស្ពានជាអ្នកទទួលរងអំពើ (Passive) ហើយ "recently" បញ្ជាក់កាល Present Perfect ដូច្នេះត្រូវប្រើ has been built។',
    points: 150
  },
  {
    id: 'g-inter-3',
    category: 'grammar',
    level: 'intermediate',
    format: 'error-hunt',
    titleEn: 'Used to vs Be used to',
    titleKh: 'ទម្លាប់ពីមុន vs ភាពស៊ាំនឹងសកម្មភាព',
    promptEn: 'Identify the error in this habit statement:',
    promptKh: 'រកកំហុសក្នុងប្រយោគបញ្ជាក់ទម្លាប់នេះ៖',
    errorSentence: 'I am used to wake up early every morning now.',
    options: [
      { id: '1', text: 'Change "wake" to "waking"', isCorrect: true },
      { id: '2', text: 'Change "am used to" to "used to"', isCorrect: false },
      { id: '3', text: 'Change "every" to "all"', isCorrect: false },
      { id: '4', text: 'Change "now" to "then"', isCorrect: false }
    ],
    correctAnswer: 'Change "wake" to "waking"',
    explanationEn: '"Be used to" (to be accustomed to) is followed by a gerund (V-ing) or noun: "am used to waking up".',
    explanationKh: 'ទម្រង់ "Be used to" (ធ្លាប់/ស៊ាំនឹងអ្វីមួយ) ត្រូវបន្តដោយកិរិយាសព្ទបន្ថែម V-ing: "am used to waking up"។',
    points: 160
  },
  {
    id: 'g-adv-1',
    category: 'grammar',
    level: 'advanced',
    format: 'multiple-choice',
    titleEn: 'Negative Inversion for Academic Emphasis',
    titleKh: 'ការត្រឡប់ប្រយោគ (Inversion) ជាមួយពាក្យបដិសេធ',
    promptEn: 'Seldom _____ such an extraordinary level of dedication among undergraduate researchers.',
    promptKh: 'កម្រណាស់ដែល _____ កម្រិតនៃការប្តេជ្ញាចិត្តដ៏អស្ចារ្យបែបនេះក្នុងចំណោមនិស្សិតស្រាវជ្រាវថ្នាក់បរិញ្ញាបត្រ។',
    options: [
      { id: '1', text: 'have we witnessed', isCorrect: true },
      { id: '2', text: 'we have witnessed', isCorrect: false },
      { id: '3', text: 'did we witnessed', isCorrect: false },
      { id: '4', text: 'we witnessed', isCorrect: false }
    ],
    correctAnswer: 'have we witnessed',
    explanationEn: 'When negative or restrictive adverbs like "Seldom", "Rarely", or "Hardly" start a sentence, inverted auxiliary-subject order is required: Seldom + have + we + witnessed.',
    explanationKh: 'នៅពេលពាក្យបដិសេធដូចជា "Seldom/Rarely" ឈរនៅដើមប្រយោគ ត្រូវត្រឡប់កិរិយាសព្ទជំនួយមកមុខ Subject (Auxiliary + Subject + Main Verb)។',
    points: 200
  },
  {
    id: 'g-adv-2',
    category: 'grammar',
    level: 'advanced',
    format: 'multiple-choice',
    titleEn: 'Subjunctive Mood in Formal Demands',
    titleKh: 'ទម្រង់ Subjunctive ក្នុងការស្នើសុំផ្លូវការ',
    promptEn: 'The ethics committee insisted that the researcher _____ all trial participants before publication.',
    promptKh: 'គណៈកម្មាធិការសីលធម៌បានទទូចថា អ្នកស្រាវជ្រាវ _____ ឈ្មោះអ្នកចូលរួមការសាកល្បងទាំងអស់មុនការបោះពុម្ព។',
    options: [
      { id: '1', text: 'anonymize', isCorrect: true },
      { id: '2', text: 'anonymizes', isCorrect: false },
      { id: '3', text: 'anonymized', isCorrect: false },
      { id: '4', text: 'will anonymize', isCorrect: false }
    ],
    correctAnswer: 'anonymize',
    explanationEn: 'After verbs of demand/recommendation (insist, demand, recommend that...), formal English uses the subjunctive base form (anonymize) for all subjects.',
    explanationKh: 'នៅក្រោយកិរិយាសព្ទទាមទារ ឬណែនាំផ្លូវការ (insist that, recommend that) ភាសាអង់គ្លេសប្រើ Subjunctive (Base Form: anonymize) ទោះបី Subject ជាឯកវចនៈក៏ដោយ។',
    points: 200
  },

  // =========================================================================
  // 2. WRITING GAMES (ELEMENTARY A1-A2, INTERMEDIATE B1-B2, ADVANCED C1-C2)
  // =========================================================================
  {
    id: 'w-image-1',
    category: 'writing',
    level: 'intermediate',
    format: 'image-description',
    titleEn: 'Image Description (5-Minute Challenge)',
    titleKh: 'ការពិពណ៌នារូបភាព (ការប្រកួត ៥នាទី)',
    promptEn: 'Describe what you see in this picture in at least 3-4 sentences. Focus on actions, colors, and setting.',
    promptKh: 'សូមពិពណ៌នាពីអ្វីដែលអ្នកឃើញក្នុងរូបភាពនេះយ៉ាងហោចណាស់ ៣ ទៅ ៤ ប្រយោគ។ ផ្តោតលើសកម្មភាព ពណ៌ និងបរិយាកាស។',
    imageUrl: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80&w=800',
    options: [],
    correctAnswer: 'Subjective writing evaluation via AI',
    explanationEn: 'The AI will evaluate your grammar, vocabulary, and relevance to the image.',
    explanationKh: 'ប្រព័ន្ធ AI នឹងវាយតម្លៃវេយ្យាករណ៍ វាក្យសព្ទ និងភាពពាក់ព័ន្ធទៅនឹងរូបភាពរបស់អ្នក។',
    points: 300
  },
  {
    id: 'w-image-2',
    category: 'writing',
    level: 'advanced',
    format: 'image-description',
    titleEn: 'Image Description (5-Minute Challenge)',
    titleKh: 'ការពិពណ៌នារូបភាពកម្រិតខ្ពស់ (ការប្រកួត ៥នាទី)',
    promptEn: 'Write a detailed descriptive paragraph about this image. Speculate about the context and the emotions conveyed.',
    promptKh: 'សរសេរកថាខណ្ឌពិពណ៌នាលម្អិតពីរូបភាពនេះ។ ព្យាករណ៍ពីបរិបទ និងអារម្មណ៍ដែលបានបញ្ជាក់។',
    imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800',
    options: [],
    correctAnswer: 'Subjective writing evaluation via AI',
    explanationEn: 'The AI will evaluate your grammar, vocabulary, and relevance to the image.',
    explanationKh: 'ប្រព័ន្ធ AI នឹងវាយតម្លៃវេយ្យាករណ៍ វាក្យសព្ទ និងភាពពាក់ព័ន្ធទៅនឹងរូបភាពរបស់អ្នក។',
    points: 300
  },
  {
    id: 'w-elem-1',
    category: 'writing',
    level: 'elementary',
    format: 'sentence-scramble',
    titleEn: 'Basic Sentence Ordering (S-V-O-Time)',
    titleKh: 'ការរៀបចំលំដាប់ប្រយោគ (ប្រធាន + កិរិយា + កម្មបទ + ពេល)',
    promptEn: 'Arrange the scrambled words into a grammatically correct sentence:',
    promptKh: 'រៀបចំផ្គុំពាក្យរាយប៉ាយទាំងនេះឱ្យទៅជាប្រយោគត្រឹមត្រូវ៖',
    scrambleWords: ['English', 'every', 'She', 'practices', 'evening.'],
    options: [
      { id: '1', text: 'She practices English every evening.', isCorrect: true },
      { id: '2', text: 'Every evening English practices she.', isCorrect: false },
      { id: '3', text: 'She English practices every evening.', isCorrect: false },
      { id: '4', text: 'Practices she English every evening.', isCorrect: false }
    ],
    correctAnswer: 'She practices English every evening.',
    explanationEn: 'Standard English word order follows Subject (She) + Verb (practices) + Object (English) + Time Expression (every evening).',
    explanationKh: 'រចនាសម្ព័ន្ធប្រយោគភាសាអង់គ្លេសទូទៅគឺ៖ ប្រធាន (She) + កិរិយាសព្ទ (practices) + កម្មបទ (English) + ពេលវេលា (every evening)។',
    points: 100
  },
  {
    id: 'w-elem-2',
    category: 'writing',
    level: 'elementary',
    format: 'multiple-choice',
    titleEn: 'Connecting Clauses with Conjunctions',
    titleKh: 'ការភ្ជាប់ប្រយោគជាមួយឈ្នាប់ And / But / Because',
    promptEn: 'He studied very hard for the test, _____ he passed with an A grade.',
    promptKh: 'គាត់បានខិតខំរៀនយ៉ាងខ្លាំងសម្រាប់ប្រឡង _____ គាត់បានជាប់ដោយទទួលបាននិទ្ទេស A។',
    options: [
      { id: '1', text: 'so', isCorrect: true },
      { id: '2', text: 'but', isCorrect: false },
      { id: '3', text: 'although', isCorrect: false },
      { id: '4', text: 'or', isCorrect: false }
    ],
    correctAnswer: 'so',
    explanationEn: '"So" shows cause and effect (result): Studying hard resulted in getting an A.',
    explanationKh: '"So" បញ្ជាក់ពីលទ្ធផល (Result)៖ ការខិតខំរៀនបាននាំឱ្យទទួលបាននិទ្ទេស A។',
    points: 100
  },
  {
    id: 'w-inter-1',
    category: 'writing',
    level: 'intermediate',
    format: 'multiple-choice',
    titleEn: 'Academic Transition Linking Words',
    titleKh: 'ការប្រើប្រាស់ឈ្នាប់ភ្ជាប់គំនិតកម្រិតមធ្យម (Transitions)',
    promptEn: 'Electric vehicles produce zero tailpipe emissions. _____, their battery production still carries an environmental footprint.',
    promptKh: 'រថយន្តអគ្គិសនីមិនបញ្ចេញផ្សែងពុលតាមបំពង់បង្ហុយឡើយ។ _____ ការផលិតអាគុយរបស់វានៅតែជះឥទ្ធិពលដល់បរិស្ថាន។',
    options: [
      { id: '1', text: 'However', isCorrect: true },
      { id: '2', text: 'Furthermore', isCorrect: false },
      { id: '3', text: 'Consequently', isCorrect: false },
      { id: '4', text: 'Similarly', isCorrect: false }
    ],
    correctAnswer: 'However',
    explanationEn: '"However" is used to introduce a contrasting or balancing perspective between two formal statements.',
    explanationKh: '"However" (ទោះជាយ៉ាងណាក៏ដោយ) ប្រើដើម្បីបង្ហាញពីគំនិតផ្ទុយគ្នា ឬទស្សនៈប្រៀបធៀបក្នុងសំណេរផ្លូវការ។',
    points: 150
  },
  {
    id: 'w-inter-2',
    category: 'writing',
    level: 'intermediate',
    format: 'sentence-scramble',
    titleEn: 'Topic Sentence Formation',
    titleKh: 'ការកសាងប្រយោគគន្លឹះ (Topic Sentence)',
    promptEn: 'Construct a coherent academic topic sentence:',
    promptKh: 'រៀបចំប្រយោគគន្លឹះនៃការតែងនិពន្ធឱ្យមានន័យស៊ីសង្វាក់គ្នា៖',
    scrambleWords: ['offers', 'Regular', 'mental', 'physical', 'exercise', 'both', 'and', 'health', 'benefits.'],
    options: [
      { id: '1', text: 'Regular exercise offers both physical and mental health benefits.', isCorrect: true },
      { id: '2', text: 'Physical and mental offers regular exercise both health benefits.', isCorrect: false },
      { id: '3', text: 'Both health benefits offers regular exercise physical and mental.', isCorrect: false },
      { id: '4', text: 'Regular physical mental exercise offers both and health benefits.', isCorrect: false }
    ],
    correctAnswer: 'Regular exercise offers both physical and mental health benefits.',
    explanationEn: 'A clear topic sentence clearly identifies the subject (Regular exercise), verb (offers), and the dual focus (both physical and mental health benefits).',
    explanationKh: 'ប្រយោគ Topic Sentence ដ៏ល្អត្រូវបញ្ជាក់ច្បាស់ពីប្រធាន (Regular exercise) និងទិដ្ឋភាពសំខាន់ៗដែលត្រូវបកស្រាយ។',
    points: 160
  },
  {
    id: 'w-adv-1',
    category: 'writing',
    level: 'advanced',
    format: 'multiple-choice',
    titleEn: 'Academic Hedging and Cautious Language',
    titleKh: 'ការប្រើភាសាបែបប្រុងប្រយ័ត្ន (Hedging) ក្នុង مقាលស្រាវជ្រាវ',
    promptEn: 'Which sentence demonstrates the most appropriate academic tone avoiding excessive overgeneralization?',
    promptKh: 'តើប្រយោគមួយណាដែលប្រើប្រាស់សម្លេងសរសេរបែបស្រាវជ្រាវ (Academic Hedging) ត្រឹមត្រូវបំផុត?',
    options: [
      { id: '1', text: 'The preliminary findings suggest that sleep deprivation may negatively affect memory retention.', isCorrect: true },
      { id: '2', text: 'This proof 100% guarantees that without sleep humans completely destroy their brains.', isCorrect: false },
      { id: '3', text: 'Nobody can ever remember anything if they are slightly tired.', isCorrect: false },
      { id: '4', text: 'Obviously sleep deprivation ruins all human capabilities immediately.', isCorrect: false }
    ],
    correctAnswer: 'The preliminary findings suggest that sleep deprivation may negatively affect memory retention.',
    explanationEn: 'Scholarly writing requires hedging terms such as "preliminary findings suggest" and "may affect" instead of absolute dogmatic assertions.',
    explanationKh: 'ការសរសេរ مقាលស្រាវជ្រាវទាមទារការប្រើពាក្យប្រុងប្រយ័ត្ន (Hedging: "suggest that", "may affect") ជាជាងការអះអាងដាច់ខាត ១០០%។',
    points: 200
  },
  {
    id: 'w-adv-2',
    category: 'writing',
    level: 'advanced',
    format: 'error-hunt',
    titleEn: 'Dangling Participle Correction',
    titleKh: 'ការកែសម្រួលកំហុស Dangling Modifier ក្នុងសំណេរកម្រិតខ្ពស់',
    promptEn: 'Identify the structural flaw in this research methodology sentence:',
    promptKh: 'រកចំណុចខ្វះខាតនៃរចនាសម្ព័ន្ធប្រយោគក្នុងវិធីសាស្ត្រស្រាវជ្រាវនេះ៖',
    errorSentence: 'Having analyzed the raw data, the software generated three distinct statistical graphs.',
    options: [
      { id: '1', text: 'Dangling participle: The software did not analyze the data; the researchers did.', isCorrect: true },
      { id: '2', text: 'Spelling error in "distinct".', isCorrect: false },
      { id: '3', text: 'Incorrect tense in "generated".', isCorrect: false },
      { id: '4', text: 'Comma after raw data is illegal.', isCorrect: false }
    ],
    correctAnswer: 'Dangling participle: The software did not analyze the data; the researchers did.',
    explanationEn: 'The introductory participle "Having analyzed the raw data" incorrectly modifies "the software" instead of the human researchers who performed the analysis.',
    explanationKh: 'នេះជាកំហុស Dangling Modifier ដោយសារឃ្លាដើម "Having analyzed..." បញ្ជាក់ឱ្យមនុស្សអ្នកស្រាវជ្រាវ មិនមែនបញ្ជាក់ឱ្យកម្មវិធីកុំព្យូទ័រ "the software" នោះទេ។',
    points: 220
  },

  // =========================================================================
  // 3. READING GAMES (ELEMENTARY A1-A2, INTERMEDIATE B1-B2, ADVANCED C1-C2)
  // =========================================================================
  {
    id: 'r-elem-1',
    category: 'reading',
    level: 'elementary',
    format: 'reading-sprint',
    titleEn: 'The Honeybee Colony',
    titleKh: 'សហគមន៍សត្វឃ្មុំ (Honeybee Colony)',
    promptEn: 'Based on the passage, what is the main job of worker bees?',
    promptKh: 'ផ្អែកលើអត្ថបទ តើភារកិច្ចចម្បងរបស់សត្វឃ្មុំកម្មករ (Worker bees) គឺជាអ្វី?',
    contextPassageEn: 'Honeybees live in large hives with thousands of members. The queen bee lays all the eggs. Worker bees are all female and do the hard work: they collect nectar from flowers, make honey, protect the hive, and feed baby bees.',
    contextPassageKh: 'សត្វឃ្មុំរស់នៅក្នុងសំបុកធំៗដែលមានសមាជិករាប់ពាន់ក្បាល។ មេឃ្មុំ (Queen) ពងកូនទាំងអស់។ ចំណែកឃ្មុំកម្មករជាញីទាំងអស់ ហើយធ្វើការងារធ្ងន់ៗដូចជា៖ ប្រមូលលម្អងផ្កា ធ្វើទឹកឃ្មុំ ការពារសំបុក និងបញ្ចុកចំណីកូនឃ្មុំ។',
    options: [
      { id: '1', text: 'Collect nectar, make honey, and feed young bees', isCorrect: true },
      { id: '2', text: 'Lay thousands of eggs every day', isCorrect: false },
      { id: '3', text: 'Hibernate during spring', isCorrect: false },
      { id: '4', text: 'Lead the hive as king', isCorrect: false }
    ],
    correctAnswer: 'Collect nectar, make honey, and feed young bees',
    explanationEn: 'The text states that worker bees collect nectar, make honey, and feed baby bees, while the queen lays the eggs.',
    explanationKh: 'អត្ថបទបញ្ជាក់ច្បាស់ថា ឃ្មុំកម្មករប្រមូលលម្អងផ្កា ធ្វើទឹកឃ្មុំ និងបញ្ចុកកូនឃ្មុំ រីឯមេឃ្មុំជាអ្នកពង។',
    points: 110
  },
  {
    id: 'r-inter-1',
    category: 'reading',
    level: 'intermediate',
    format: 'reading-sprint',
    titleEn: 'Renewable Energy Innovation',
    titleKh: 'នវានុវត្តន៍ថាមពលកកើតឡើងវិញ',
    promptEn: 'What inference can be made about solar panel efficiency in overcast weather?',
    promptKh: 'តើការសន្និដ្ឋានអ្វីដែលអាចទាញចេញពីប្រសិទ្ធភាពផ្ទាំងសូឡានៅពេលមេឃស្រទុំ?',
    contextPassageEn: 'Modern photovoltaic cells have advanced dramatically over the last decade. While bright direct sunlight delivers peak energy yield, new bifacial panels can capture diffuse ambient light reflected from clouds and the ground, maintaining up to 70% generation capacity even on cloudy afternoons.',
    contextPassageKh: 'ផ្ទាំងកោសិកាពន្លឺព្រះអាទិត្យសម័យថ្មីមានការរីកចម្រើនយ៉ាងខ្លាំងក្នុងទសវត្សរ៍ចុងក្រោយនេះ។ ទោះបីពន្លឺព្រះអាទិត្យចាំងចំផ្ដល់ថាមពលខ្ពស់បំផុតក៏ដោយ ប៉ុន្តែផ្ទាំងសូឡាស៊េរីថ្មីអាចស្រូបយកពន្លឺចាំងផ្លាតពីពពក និងដី ដោយរក្សាបានសមត្ថភាពផលិតរហូតដល់ ៧០% ទោះបីជាពេលមេឃស្រទុំក៏ដោយ។',
    options: [
      { id: '1', text: 'They can still generate substantial electricity using diffuse reflected light.', isCorrect: true },
      { id: '2', text: 'They completely shut down when direct sun is blocked.', isCorrect: false },
      { id: '3', text: 'They produce more energy on cloudy days than on sunny days.', isCorrect: false },
      { id: '4', text: 'They require gasoline generators to assist during cloud cover.', isCorrect: false }
    ],
    correctAnswer: 'They can still generate substantial electricity using diffuse reflected light.',
    explanationEn: 'The passage highlights that bifacial panels maintain up to 70% capacity on cloudy afternoons by absorbing diffuse light.',
    explanationKh: 'អត្ថបទបានបញ្ជាក់ថា ផ្ទាំងសូឡាស៊េរីថ្មីនៅតែអាចផលិតថាមពលបានរហូតដល់ ៧០% ដោយការស្រូបពន្លឺចាំងផ្លាតពីពពក។',
    points: 150
  },
  {
    id: 'r-adv-1',
    category: 'reading',
    level: 'advanced',
    format: 'reading-sprint',
    titleEn: 'Cognitive Biases in Algorithmic Decision-Making',
    titleKh: 'ភាពលម្អៀងនៃការយល់ដឹងក្នុងការសម្រេចចិត្តតាមក្បួនដោះស្រាយ (AI)',
    promptEn: 'According to the author, what is the primary pitfall when training predictive models on historical societal data?',
    promptKh: 'យោងតាមអ្នកនិពន្ធ តើអ្វីជាហានិភ័យចម្បងនៅពេលបង្ហាត់ម៉ូដែលទស្សន៍ទាយលើទិន្នន័យប្រវត្តិសាស្ត្រសង្គម?',
    contextPassageEn: 'Machine learning algorithms do not operate in a moral vacuum. When models are trained on historical datasets without rigorous debiasing protocols, they invariably codify and amplify the systemic disparities embedded in legacy human decisions, presenting inherited prejudices as objective mathematical truth.',
    contextPassageKh: 'ក្បួនដោះស្រាយម៉ាស៊ីន (Algorithms) មិនដំណើរការដោយគ្មានទំនាក់ទំនងនឹងសង្គមឡើយ។ នៅពេលម៉ូដែលត្រូវបានបង្ហាត់លើទិន្នន័យប្រវត្តិសាស្ត្រដោយគ្មានវិធីសាស្ត្រលុបបំបាត់ភាពលម្អៀង ពួកវានឹងចម្លង និងពង្រីកវិសមភាពសង្គមពីអតីតកាល ដោយបង្ហាញភាពលម្អៀងទាំងនោះជារូបរាងនៃការពិតតាមគណិតវិទ្យា។',
    options: [
      { id: '1', text: 'The algorithms institutionalize and magnify historical human prejudices as objective output.', isCorrect: true },
      { id: '2', text: 'The models run too slowly on older computer hardware.', isCorrect: false },
      { id: '3', text: 'Mathematical equations are inherently incapable of calculating percentages.', isCorrect: false },
      { id: '4', text: 'Historical data is always factually inaccurate and corrupt.', isCorrect: false }
    ],
    correctAnswer: 'The algorithms institutionalize and magnify historical human prejudices as objective output.',
    explanationEn: 'The author directly emphasizes that algorithms "invariably codify and amplify systemic disparities" when trained on uncorrected legacy data.',
    explanationKh: 'អ្នកនិពន្ធសង្កត់ធ្ងន់ថា ក្បួនដោះស្រាយនឹងចម្លង និងពង្រីកវិសមភាពសង្គមដែលមានពីមុន ប្រសិនបើទិន្នន័យមិនត្រូវបានកែតម្រូវភាពលម្អៀង។',
    points: 210
  },

  // =========================================================================
  // 4. VOCABULARY & IDIOMS GAMES (ELEMENTARY A1-A2, INTERMEDIATE B1-B2, ADVANCED C1-C2)
  // =========================================================================
  {
    id: 'v-elem-1',
    category: 'vocabulary',
    level: 'elementary',
    format: 'multiple-choice',
    titleEn: 'Everyday Phrasal Verbs',
    titleKh: 'កិរិយាសព្ទផ្សំប្រចាំថ្ងៃ (Phrasal Verbs)',
    promptEn: 'Please _____ your shoes before entering the temple or house.',
    promptKh: 'សូមមេត្តា _____ ស្បែកជើងរបស់អ្នក មុនពេលចូលក្នុងព្រះវិហារ ឬផ្ទះ។',
    options: [
      { id: '1', text: 'take off', isCorrect: true },
      { id: '2', text: 'turn on', isCorrect: false },
      { id: '3', text: 'look for', isCorrect: false },
      { id: '4', text: 'give up', isCorrect: false }
    ],
    correctAnswer: 'take off',
    explanationEn: '"Take off" means to remove an item of clothing or footwear.',
    explanationKh: '"Take off" មានន័យថា ដោះ (សម្លៀកបំពាក់ ឬស្បែកជើង)។',
    points: 100
  },
  {
    id: 'v-elem-2',
    category: 'vocabulary',
    level: 'elementary',
    format: 'multiple-choice',
    titleEn: 'Irregular Verb Forms (V1-V2-V3)',
    titleKh: 'ទម្រង់កិរិយាសព្ទមិនប្រក្រតីទាំង ៣',
    promptEn: 'What is the Past Simple (V2) and Past Participle (V3) of the verb "Begin"?',
    promptKh: 'តើទម្រង់ V2 និង V3 នៃកិរិយាសព្ទ "Begin" គឺជាអ្វី?',
    options: [
      { id: '1', text: 'began / begun', isCorrect: true },
      { id: '2', text: 'beginned / beginned', isCorrect: false },
      { id: '3', text: 'begun / began', isCorrect: false },
      { id: '4', text: 'began / began', isCorrect: false }
    ],
    correctAnswer: 'began / begun',
    explanationEn: 'The irregular verb sequence is: Begin (V1) &rarr; Began (V2) &rarr; Begun (V3).',
    explanationKh: 'លំដាប់កិរិយាសព្ទមិនប្រក្រតីគឺ៖ Begin (V1) &rarr; Began (V2) &rarr; Begun (V3) (ចាប់ផ្តើម)។',
    points: 100
  },
  {
    id: 'v-inter-1',
    category: 'vocabulary',
    level: 'intermediate',
    format: 'multiple-choice',
    titleEn: 'Common Idiomatic Expressions',
    titleKh: 'ឃ្លា និងសុភាសិតទូទៅ (Idioms)',
    promptEn: 'When someone says "Let\'s call it a day", what do they mean?',
    promptKh: 'នៅពេលគេនិយាយថា "Let\'s call it a day" តើគេមានន័យដូចម្តេច?',
    options: [
      { id: '1', text: 'Stop working for the rest of the day', isCorrect: true },
      { id: '2', text: 'Name the day of the week', isCorrect: false },
      { id: '3', text: 'Start a new project immediately', isCorrect: false },
      { id: '4', text: 'Call someone on the phone at noon', isCorrect: false }
    ],
    correctAnswer: 'Stop working for the rest of the day',
    explanationEn: '"Call it a day" is an idiom meaning to stop working or doing an activity for the remaining day.',
    explanationKh: '"Call it a day" ជា idiom មានន័យថា សម្រាក ឬឈប់ធ្វើការងារសម្រាប់ថ្ងៃនេះហើយ។',
    points: 150
  },
  {
    id: 'v-inter-2',
    category: 'vocabulary',
    level: 'intermediate',
    format: 'multiple-choice',
    titleEn: 'Regular Verb -ed Pronunciation Rules',
    titleKh: 'ច្បាប់នៃការបញ្ចេញសំឡេង -ed លើកិរិយាសព្ទប្រក្រតី',
    promptEn: 'Which of the following past verbs has its "-ed" ending pronounced as /ɪd/?',
    promptKh: 'តើកិរិយាសព្ទអតីតកាលមួយណាខាងក្រោម ដែលបញ្ចេញសំឡេងកន្ទុយ "-ed" ជាសូរ /ɪd/?',
    options: [
      { id: '1', text: 'Decided (/dɪˈsaɪ.dɪd/)', isCorrect: true },
      { id: '2', text: 'Watched (/wɒtʃt/)', isCorrect: false },
      { id: '3', text: 'Played (/pleɪd/)', isCorrect: false },
      { id: '4', text: 'Cooked (/kʊkt/)', isCorrect: false }
    ],
    correctAnswer: 'Decided (/dɪˈsaɪ.dɪd/)',
    explanationEn: 'Verbs ending in /t/ or /d/ sounds take the /ɪd/ pronunciation when adding "-ed" (e.g. Decided, Wanted, Needed).',
    explanationKh: 'កិរិយាសព្ទទាំងឡាយណាដែលបញ្ចប់ដោយសូរ /t/ ឬ /d/ ត្រូវបញ្ចេញសំឡេង -ed ជា /ɪd/ (ឧទាហរណ៍៖ Decided, Wanted, Needed)។',
    points: 150
  },
  {
    id: 'v-adv-1',
    category: 'vocabulary',
    level: 'advanced',
    format: 'multiple-choice',
    titleEn: 'High-Level Academic Synonyms',
    titleKh: 'ពាក្យមានន័យដូចកម្រិតស្រាវជ្រាវ (Academic Synonyms)',
    promptEn: 'Select the most precise synonym for "ubiquitous" in academic contexts:',
    promptKh: 'ជ្រើសរើសពាក្យដែលមានន័យដូចនឹងពាក្យ "ubiquitous" ក្នុងបរិបទសិក្សាស្រាវជ្រាវ៖',
    options: [
      { id: '1', text: 'Omnipresent / Pervasive (ដែលមាននៅគ្រប់ទីកន្លែង)', isCorrect: true },
      { id: '2', text: 'Ephemeral / Short-lived (ដែលកើតឡើងមួយភ្លែត)', isCorrect: false },
      { id: '3', text: 'Ambiguous / Unclear (ដែលស្រពិចស្រពិល)', isCorrect: false },
      { id: '4', text: 'Superficial / Shallow (ដែលរាក់កំភែល)', isCorrect: false }
    ],
    correctAnswer: 'Omnipresent / Pervasive (ដែលមាននៅគ្រប់ទីកន្លែង)',
    explanationEn: '"Ubiquitous" means present, appearing, or found everywhere (synonyms: omnipresent, pervasive, universal).',
    explanationKh: '"Ubiquitous" មានន័យថា ដែលមានវត្តមាន ឬជួបប្រទះនៅគ្រប់ទីកន្លែង (ដូចគ្នានឹង omnipresent / pervasive)។',
    points: 200
  },
  {
    id: 'v-adv-2',
    category: 'vocabulary',
    level: 'advanced',
    format: 'multiple-choice',
    titleEn: 'Nuanced Word Choice (Collocations)',
    titleKh: 'ការប្រើប្រាស់ពាក្យគួបផ្សំត្រឹមត្រូវ (Academic Collocations)',
    promptEn: 'The statistical analysis failed to _____ any statistically significant correlation between the two variables.',
    promptKh: 'ការវិភាគស្ថិតិមិនអាច _____ ទំនាក់ទំនងដែលមានសារៈសំខាន់ជាស្ថិតិរវាងអថេរទាំងពីរឡើយ។',
    options: [
      { id: '1', text: 'establish', isCorrect: true },
      { id: '2', text: 'invent', isCorrect: false },
      { id: '3', text: 'manufacture', isCorrect: false },
      { id: '4', text: 'fabricate', isCorrect: false }
    ],
    correctAnswer: 'establish',
    explanationEn: 'In academic research, we "establish a correlation / link" rather than "invent" or "manufacture".',
    explanationKh: 'ក្នុងការស្រាវជ្រាវបែបវិទ្យាសាស្ត្រ យើងប្រើកិរិយាសព្ទ "establish a correlation/link" (បង្កើត ឬបញ្ជាក់ទំនាក់ទំនង) មិនប្រើ invent ឬ manufacture ឡើយ។',
    points: 210
  }
];

// Helper to deterministically or pseudo-randomly shuffle array
export function shuffleArray<T>(items: T[], seed: number = 0): T[] {
  const result = [...items];
  let currentSeed = seed || 42;
  for (let i = result.length - 1; i > 0; i--) {
    // Pseudo-random pseudo-generator if seed provided, else Math.random
    currentSeed = (currentSeed * 9301 + 49297) % 233280;
    const rnd = seed ? currentSeed / 233280 : Math.random();
    const j = Math.floor(rnd * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * 7-Day Deterministic Auto-Update Logic
 */
export function getWeeklyGamePackage(targetDate: Date = new Date()): WeeklyGamePackage {
  // Epoch benchmark: Jan 1, 2026
  const utcDate = Date.UTC(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), targetDate.getHours(), targetDate.getMinutes(), targetDate.getSeconds());
  const baseEpoch = Date.UTC(2026, 0, 1, 0, 0, 0);
  
  const msInDay = 24 * 60 * 60 * 1000;
  const msInWeek = 7 * msInDay;

  const diffMs = Math.max(0, utcDate - baseEpoch);
  const weekNumber = Math.floor(diffMs / msInWeek) + 1;
  const currentWeekElapsedMs = diffMs % msInWeek;
  
  // Day in cycle: 1 to 7
  const dayInCycle = Math.min(7, Math.floor(currentWeekElapsedMs / msInDay) + 1);

  // Remaining time in the current 7-day cycle
  const msRemainingInWeek = msInWeek - currentWeekElapsedMs;
  const daysRemaining = Math.floor(msRemainingInWeek / msInDay);
  const hoursRemaining = Math.floor((msRemainingInWeek % msInDay) / (60 * 60 * 1000));
  const minutesRemaining = Math.floor((msRemainingInWeek % (60 * 60 * 1000)) / (60 * 1000));
  const secondsRemaining = Math.floor((msRemainingInWeek % (60 * 1000)) / 1000);

  const startOfWeekMs = baseEpoch + (weekNumber - 1) * msInWeek;
  const endOfWeekMs = startOfWeekMs + msInWeek;
  const startDate = new Date(startOfWeekMs);
  const endDate = new Date(endOfWeekMs);

  // 7 Daily Quest Missions
  const dailyMissions: DayMission[] = [
    {
      dayNumber: 1,
      titleEn: 'Day 1: Grammar Gladiator',
      titleKh: 'ថ្ងៃទី ១៖ ប្រកួតវេយ្យាករណ៍ (Grammar Mastery)',
      focusCategory: 'grammar',
      descriptionEn: 'Conquer 5 grammar questions on tenses and auxiliaries.',
      descriptionKh: 'ដោះស្រាយ ៥ សំណួរវេយ្យាករណ៍លើកាល និងកិរិយាសព្ទជំនួយ។',
      targetScore: 500,
      rewardXp: 80,
      rewardGems: 25,
      badgeEmoji: '📚'
    },
    {
      dayNumber: 2,
      titleEn: 'Day 2: Writing Architect',
      titleKh: 'ថ្ងៃទី ២៖ ស្ថាបត្យករតែងនិពន្ធ (Writing & Links)',
      focusCategory: 'writing',
      descriptionEn: 'Master sentence ordering and academic transitions.',
      descriptionKh: 'រៀបចំលំដាប់ប្រយោគ និងឈ្នាប់ភ្ជាប់គំនិតឱ្យត្រឹមត្រូវ។',
      targetScore: 500,
      rewardXp: 80,
      rewardGems: 25,
      badgeEmoji: '📝'
    },
    {
      dayNumber: 3,
      titleEn: 'Day 3: Speed Reading Scout',
      titleKh: 'ថ្ងៃទី ៣៖ អានយល់ន័យរហ័ស (Reading Sprint)',
      focusCategory: 'reading',
      descriptionEn: 'Analyze passages quickly and extract key inferences.',
      descriptionKh: 'អានអត្ថបទខ្លីៗ និងទាញការសន្និដ្ឋានឱ្យបានត្រឹមត្រូវក្រោមនាឡិកាកំណត់។',
      targetScore: 500,
      rewardXp: 80,
      rewardGems: 25,
      badgeEmoji: '📖'
    },
    {
      dayNumber: 4,
      titleEn: 'Day 4: Vocabulary Blitz',
      titleKh: 'ថ្ងៃទី ៤៖ ប្រកួតវាក្យសព្ទ (Vocab & Idioms)',
      focusCategory: 'vocabulary',
      descriptionEn: 'Blast through phrasal verbs, idioms, and irregular verbs.',
      descriptionKh: 'ដោះស្រាយកិរិយាសព្ទផ្សំ សុភាសិត និងកិរិយាសព្ទមិនប្រក្រតី។',
      targetScore: 500,
      rewardXp: 80,
      rewardGems: 25,
      badgeEmoji: '💡'
    },
    {
      dayNumber: 5,
      titleEn: 'Day 5: 4-in-1 Combo Sprint',
      titleKh: 'ថ្ងៃទី ៥៖ ប្រកួតល្បឿនចម្រុះ ៤ មុខវិជ្ជា',
      focusCategory: 'all-round',
      descriptionEn: 'Score a combo across Grammar, Writing, Reading, and Vocab.',
      descriptionKh: 'ធ្វើតេស្តចម្រុះគ្រប់មុខវិជ្ជាដើម្បីបង្កើនពិន្ទុ Combo Multiplier។',
      targetScore: 650,
      rewardXp: 100,
      rewardGems: 30,
      badgeEmoji: '⚡'
    },
    {
      dayNumber: 6,
      titleEn: 'Day 6: Advanced Boss Challenge',
      titleKh: 'ថ្ងៃទី ៦៖ ប្រយុទ្ធជាមួយ Boss កម្រិតខ្ពស់',
      focusCategory: 'all-round',
      descriptionEn: 'Overcome complex inversion, subjunctive, and academic hedging.',
      descriptionKh: 'យកឈ្នះសំណួរកម្រិតខ្ពស់ (Inversion, Subjunctive & Academic Research)។',
      targetScore: 800,
      rewardXp: 120,
      rewardGems: 40,
      badgeEmoji: '🐲'
    },
    {
      dayNumber: 7,
      titleEn: 'Day 7: Weekly Grand Championship',
      titleKh: 'ថ្ងៃទី ៧៖ ពានរង្វាន់ប្រចាំសប្តាហ៍ (Grand Champion)',
      focusCategory: 'all-round',
      descriptionEn: 'Complete the 7-day tournament and claim the Weekly Champion Trophy!',
      descriptionKh: 'បញ្ចប់ការប្រកួត ៧ ថ្ងៃពេញលេញ និងទទួលពានរង្វាន់ជើងឯកប្រចាំសប្តាហ៍!',
      targetScore: 1000,
      rewardXp: 200,
      rewardGems: 100,
      badgeEmoji: '🏆'
    }
  ];

  const currentDayMission = dailyMissions[dayInCycle - 1] || dailyMissions[0];

  // Deterministically shuffle/rotate questions and options for this week so correct answers are distributed evenly across A, B, C, D
  const seed = weekNumber * 101;
  const weeklyQuestions = [...ALL_GAME_QUESTIONS]
    .sort((a, b) => {
      const hashA = (a.id.charCodeAt(0) * 17 + seed) % 97;
      const hashB = (b.id.charCodeAt(0) * 17 + seed) % 97;
      return hashA - hashB;
    })
    .map((q, idx) => {
      // Deterministically shuffle options based on question ID and index
      const qSeed = (seed + q.id.charCodeAt(0) * 13 + idx * 29) % 10000 + 1;
      return {
        ...q,
        options: shuffleArray(q.options, qSeed)
      };
    });

  // Simulated Weekly Global Tournament Leaderboard
  const leaderboardSeed = [
    { rank: 1, name: 'Sophea_PhnomPenh', avatar: '🦁', score: 3450 + (weekNumber % 10) * 120, level: 'Advanced' },
    { rank: 2, name: 'Vireak_Battambang', avatar: '🦅', score: 3120 + (weekNumber % 10) * 90, level: 'Advanced' },
    { rank: 3, name: 'Chanthy_SiemReap', avatar: '🐯', score: 2890 + (weekNumber % 10) * 80, level: 'Intermediate' },
    { rank: 4, name: 'Dara_KPS', avatar: '🦊', score: 2640 + (weekNumber % 10) * 50, level: 'Intermediate' },
    { rank: 5, name: 'You (អ្នក)', avatar: '⭐', score: 2450, level: 'All-Level', isUser: true },
    { rank: 6, name: 'Bopha_Kampot', avatar: '🌸', score: 2210, level: 'Elementary' },
    { rank: 7, name: 'Rithy_Kandal', avatar: '🚀', score: 1980, level: 'Intermediate' }
  ];

  return {
    weekNumber,
    seasonNameEn: `Season 2026 &bull; Week ${weekNumber}`,
    seasonNameKh: `រដូវកាលឆ្នាំ ២០២៦ &bull; សប្តាហ៍ទី ${weekNumber}`,
    startDate,
    endDate,
    dayInCycle,
    daysRemaining,
    hoursRemaining,
    minutesRemaining,
    secondsRemaining,
    dailyMissions,
    currentDayMission,
    weeklyQuestions,
    leaderboardSeed
  };
}
