import { DiagnosticQuestion } from '../types';

export const studyGuideQuestions: DiagnosticQuestion[] = [
  // Section 1: Present and past
  {
    id: 'sg-1.1',
    category: 'Present and past',
    khmerCategory: 'បច្ចុប្បន្នកាល និង អតីតកាល',
    questionNumber: '1.1',
    sentence: 'At first I didn’t like my job, but ________ to enjoy it now.',
    options: [
      { label: 'A', text: 'I’m starting' },
      { label: 'B', text: 'I start' }
    ],
    correctAnswers: ['A'],
    targetUnits: [1, 3],
    explanation: 'We use the present continuous (I’m starting) when we talk about a change that has started to happen.',
    khmerExplanation: 'យើងប្រើ Present Continuous (I’m starting) នៅពេលនិយាយពីការផ្លាស់ប្តូរដែលកំពុងចាប់ផ្ដើមកើតឡើង។'
  },
  {
    id: 'sg-1.2',
    category: 'Present and past',
    khmerCategory: 'បច្ចុប្បន្នកាល និង អតីតកាល',
    questionNumber: '1.2',
    sentence: 'I don’t understand this sentence. What ________ ?',
    options: [
      { label: 'A', text: 'does mean this word' },
      { label: 'B', text: 'does this word mean' },
      { label: 'C', text: 'means this word' }
    ],
    correctAnswers: ['B'],
    targetUnits: [2, 49],
    explanation: 'In present simple questions we use do/does + subject + infinitive: What does this word mean?',
    khmerExplanation: 'ក្នុងទម្រង់សំណួរ Present Simple យើងប្រើ does + subject + កិរិយាសព្ទដើម: What does this word mean?'
  },
  {
    id: 'sg-1.3',
    category: 'Present and past',
    khmerCategory: 'បច្ចុប្បន្នកាល និង អតីតកាល',
    questionNumber: '1.3',
    sentence: 'Robert ________ away two or three times a year.',
    options: [
      { label: 'A', text: 'is going usually' },
      { label: 'B', text: 'is usually going' },
      { label: 'C', text: 'usually goes' },
      { label: 'D', text: 'goes usually' }
    ],
    correctAnswers: ['C'],
    targetUnits: [2, 3, 110],
    explanation: 'We use the present simple for routines, and frequency adverbs (usually) go before the main verb.',
    khmerExplanation: 'យើងប្រើ Present Simple សម្រាប់ទម្លាប់ ហើយ adverb of frequency (usually) ត្រូវនៅពីមុខកិរិយាសព្ទធំ។'
  },
  {
    id: 'sg-1.4',
    category: 'Present and past',
    khmerCategory: 'បច្ចុប្បន្នកាល និង អតីតកាល',
    questionNumber: '1.4',
    sentence: 'How ________ now? Better than before?',
    options: [
      { label: 'A', text: 'you are feeling' },
      { label: 'B', text: 'do you feel' },
      { label: 'C', text: 'are you feeling' }
    ],
    correctAnswers: ['B', 'C'],
    targetUnits: [4],
    explanation: 'You can use either the present simple (do you feel) or continuous (are you feeling) to say how somebody feels now.',
    khmerExplanation: 'អ្នកអាចប្រើបានទាំង Present Simple (do you feel) ឬ Continuous (are you feeling) ដើម្បីសួរពីអារម្មណ៍នៅពេលនេះ។'
  },
  {
    id: 'sg-1.5',
    category: 'Present and past',
    khmerCategory: 'បច្ចុប្បន្នកាល និង អតីតកាល',
    questionNumber: '1.5',
    sentence: 'It was a boring weekend. ________ anything.',
    options: [
      { label: 'A', text: 'I didn’t' },
      { label: 'B', text: 'I don’t do' },
      { label: 'C', text: 'I didn’t do' }
    ],
    correctAnswers: ['C'],
    targetUnits: [5],
    explanation: 'In past simple negative sentences with "do" as main verb, we need "didn’t do": I didn’t do anything.',
    khmerExplanation: 'ក្នុងទម្រង់អតីតកាលបដិសេធ យើងត្រូវការ didn’t + do (កិរិយាសព្ទដើម)៖ I didn’t do anything។'
  },
  {
    id: 'sg-1.6',
    category: 'Present and past',
    khmerCategory: 'បច្ចុប្បន្នកាល និង អតីតកាល',
    questionNumber: '1.6',
    sentence: 'Matt ________ while we were having dinner.',
    options: [
      { label: 'A', text: 'phoned' },
      { label: 'B', text: 'was phoning' },
      { label: 'C', text: 'has phoned' }
    ],
    correctAnswers: ['A'],
    targetUnits: [6, 14],
    explanation: 'Use past simple (phoned) for an action that happened in the middle of something else (while we were having dinner).',
    khmerExplanation: 'ប្រើ Past Simple (phoned) សម្រាប់សកម្មភាពខ្លីដែលបានកើតឡើងកាត់ចំកណ្តាលពេលកំពុងបាយ។'
  },

  // Section 2: Present perfect and past
  {
    id: 'sg-2.1',
    category: 'Present perfect and past',
    khmerCategory: 'បច្ចុប្បន្នភាពកាល និង អតីតកាល',
    questionNumber: '2.1',
    sentence: 'James is on holiday. He ________ to Italy.',
    options: [
      { label: 'A', text: 'is gone' },
      { label: 'B', text: 'has gone' },
      { label: 'C', text: 'has been' }
    ],
    correctAnswers: ['B'],
    targetUnits: [7],
    explanation: 'He is away in Italy right now, so we use "has gone". ("has been" means he has returned).',
    khmerExplanation: 'គាត់កំពុងនៅប្រទេសអ៊ីតាលីនៅឡើយ ដូច្នេះប្រើ "has gone" (បើ has been មានន័យថាត្រឡប់មកវិញហើយ)។'
  },
  {
    id: 'sg-2.2',
    category: 'Present perfect and past',
    khmerCategory: 'បច្ចុប្បន្នភាពកាល និង អតីតកាល',
    questionNumber: '2.2',
    sentence: 'Everything is going well. There ________ any problems so far.',
    options: [
      { label: 'A', text: 'weren’t' },
      { label: 'B', text: 'have been' },
      { label: 'C', text: 'haven’t been' }
    ],
    correctAnswers: ['C'],
    targetUnits: [8],
    explanation: 'With "so far" (a period continuing until now), we use the present perfect: haven’t been.',
    khmerExplanation: 'ជាមួយពាក្យ "so far" (រហូតមកទល់ពេលនេះ) ត្រូវប្រើ Present Perfect បដិសេធ៖ haven’t been។'
  },
  {
    id: 'sg-2.3',
    category: 'Present perfect and past',
    khmerCategory: 'បច្ចុប្បន្នភាពកាល និង អតីតកាល',
    questionNumber: '2.3',
    sentence: 'Sarah has lost her passport again. This is the second time this ________ .',
    options: [
      { label: 'A', text: 'has happened' },
      { label: 'B', text: 'happens' },
      { label: 'C', text: 'happened' },
      { label: 'D', text: 'is happening' }
    ],
    correctAnswers: ['A'],
    targetUnits: [8],
    explanation: 'We say "It is the second time something has happened" (present perfect).',
    khmerExplanation: 'យើងប្រើ Present Perfect ជាមួយកន្សោម "This is the second time this has happened"។'
  },
  {
    id: 'sg-2.4',
    category: 'Present perfect and past',
    khmerCategory: 'បច្ចុប្បន្នភាពកាល និង អតីតកាល',
    questionNumber: '2.4',
    sentence: 'Why are you out of breath? ________ ?',
    options: [
      { label: 'A', text: 'Are you running' },
      { label: 'B', text: 'Have you run' },
      { label: 'C', text: 'Have you been running' }
    ],
    correctAnswers: ['C'],
    targetUnits: [9],
    explanation: 'Use present perfect continuous for an activity that has recently stopped with visible result (out of breath).',
    khmerExplanation: 'ប្រើ Present Perfect Continuous សម្រាប់សកម្មភាពដែលទើបឈប់ ហើយមានភស្តុតាងឃើញច្បាស់ (ហត់ដង្ហក់)។'
  },
  {
    id: 'sg-2.5',
    category: 'Present perfect and past',
    khmerCategory: 'បច្ចុប្បន្នភាពកាល និង អតីតកាល',
    questionNumber: '2.5',
    sentence: 'Where’s the book I gave you? What ________ with it?',
    options: [
      { label: 'A', text: 'have you done' },
      { label: 'B', text: 'have you been doing' },
      { label: 'C', text: 'are you doing' }
    ],
    correctAnswers: ['A'],
    targetUnits: [10],
    explanation: 'We ask "What have you done with it?" (present perfect simple) focusing on the completed result.',
    khmerExplanation: 'ផ្ដោតលើលទ្ធផលបញ្ចប់នៃសកម្មភាព ត្រូវប្រើ Present Perfect Simple: "What have you done with it?"'
  },
  {
    id: 'sg-2.6',
    category: 'Present perfect and past',
    khmerCategory: 'បច្ចុប្បន្នភាពកាល និង អតីតកាល',
    questionNumber: '2.6',
    sentence: '‘How long ________ Jane?’ ‘A long time. Since we were at school.’',
    options: [
      { label: 'A', text: 'do you know' },
      { label: 'B', text: 'have you known' },
      { label: 'C', text: 'have you been knowing' }
    ],
    correctAnswers: ['B'],
    targetUnits: [11, 10],
    explanation: 'Know is a state verb and is not used in the continuous form; use "have you known".',
    khmerExplanation: 'Know មិនប្រើក្នុងទម្រង់ continuous ទេ ដូច្នេះត្រូវប្រើ "have you known"។'
  },
  {
    id: 'sg-2.7',
    category: 'Present perfect and past',
    khmerCategory: 'បច្ចុប្បន្នភាពកាល និង អតីតកាល',
    questionNumber: '2.7',
    sentence: 'Sally has been working here ________ .',
    options: [
      { label: 'A', text: 'for six months' },
      { label: 'B', text: 'since six months' },
      { label: 'C', text: 'six months ago' },
      { label: 'D', text: 'six months' }
    ],
    correctAnswers: ['A', 'D'],
    targetUnits: [12],
    explanation: 'We use "for + a period of time" (for six months). In informal English "for" can sometimes be omitted.',
    khmerExplanation: 'យើងប្រើ for + រយៈពេល (for six months)។ ក្នុងភាសានិយាយ គេអាចលុប for បាន។'
  },
  {
    id: 'sg-2.16',
    category: 'Present and past',
    khmerCategory: 'បច្ចុប្បន្នកាល និង អតីតកាល',
    questionNumber: '2.16',
    sentence: 'I ________ tennis a lot, but I don’t play very much now.',
    options: [
      { label: 'A', text: 'was playing' },
      { label: 'B', text: 'was used to play' },
      { label: 'C', text: 'used to play' }
    ],
    correctAnswers: ['C'],
    targetUnits: [18],
    explanation: 'We use "used to play" for past habits that are no longer true.',
    khmerExplanation: 'ប្រើ "used to play" សម្រាប់ទម្លាប់ក្នុងអតីតកាលដែលឈប់ធ្វើហើយ។'
  },

  // Section 3: Future
  {
    id: 'sg-3.1',
    category: 'Future',
    khmerCategory: 'អនាគតកាល',
    questionNumber: '3.1',
    sentence: 'I’m tired. ________ to bed now. Goodnight.',
    options: [
      { label: 'A', text: 'I go' },
      { label: 'B', text: 'I’m going' }
    ],
    correctAnswers: ['B'],
    targetUnits: [19],
    explanation: 'Use present continuous for an action just before you start to do it, especially verbs of movement.',
    khmerExplanation: 'ប្រើ Present Continuous (I’m going) សម្រាប់សកម្មភាពដែលរៀបនឹងធ្វើភ្លាមៗ។'
  },
  {
    id: 'sg-3.3',
    category: 'Future',
    khmerCategory: 'អនាគតកាល',
    questionNumber: '3.3',
    sentence: 'That bag looks heavy. ________ you with it.',
    options: [
      { label: 'A', text: 'I’m helping' },
      { label: 'B', text: 'I help' },
      { label: 'C', text: 'I’ll help' }
    ],
    correctAnswers: ['C'],
    targetUnits: [21],
    explanation: 'We use "I’ll help" to make an offer at the moment of speaking.',
    khmerExplanation: 'ប្រើ "I’ll help" សម្រាប់ការផ្ដល់ជំនួយភ្លាមៗនៅពេលកំពុងនិយាយ។'
  },
  {
    id: 'sg-3.7',
    category: 'Future',
    khmerCategory: 'អនាគតកាល',
    questionNumber: '3.7',
    sentence: 'Don’t worry ________ late tonight.',
    options: [
      { label: 'A', text: 'if I’m' },
      { label: 'B', text: 'when I’m' },
      { label: 'C', text: 'when I’ll be' },
      { label: 'D', text: 'if I’ll be' }
    ],
    correctAnswers: ['A'],
    targetUnits: [25],
    explanation: 'After if/when for future time, use the present tense: if I’m late.',
    khmerExplanation: 'បន្ទាប់ពី if/when សម្រាប់អនាគត ត្រូវប្រើ Present Tense (if I’m late)។'
  },

  // Section 4: Modals
  {
    id: 'sg-4.1',
    category: 'Modals',
    khmerCategory: 'កិរិយាសព្ទជំនួយ Modals',
    questionNumber: '4.1',
    sentence: 'The fire spread quickly, but everybody ________ from the building.',
    options: [
      { label: 'A', text: 'was able to escape' },
      { label: 'B', text: 'managed to escape' },
      { label: 'C', text: 'could escape' }
    ],
    correctAnswers: ['A', 'B'],
    targetUnits: [26],
    explanation: 'For a specific past achievement/situation, use "was able to" or "managed to", not "could".',
    khmerExplanation: 'សម្រាប់ជោគជ័យក្នុងស្ថានភាពជាក់លាក់មួយក្នុងអតីតកាល ត្រូវប្រើ was able to ឬ managed to មិនប្រើ could ទេ។'
  },
  {
    id: 'sg-4.5',
    category: 'Modals',
    khmerCategory: 'កិរិយាសព្ទជំនួយ Modals',
    questionNumber: '4.5',
    sentence: 'I lost one of my gloves. I ________ it somewhere.',
    options: [
      { label: 'A', text: 'must drop' },
      { label: 'B', text: 'must have dropped' },
      { label: 'C', text: 'must be dropping' },
      { label: 'D', text: 'must have been dropping' }
    ],
    correctAnswers: ['B'],
    targetUnits: [28],
    explanation: 'For a certain deduction in the past: must have + past participle (must have dropped).',
    khmerExplanation: 'ការសន្និដ្ឋានប្រាកដក្នុងអតីតកាល៖ must have dropped។'
  },

  // Section 5: Conditionals & Wish
  {
    id: 'sg-5.1',
    category: 'If and Wish',
    khmerCategory: 'លក្ខខណ្ឌ If និង Wish',
    questionNumber: '5.1',
    sentence: 'I’m not tired enough to go to bed. If I ________ to bed now, I wouldn’t sleep.',
    options: [
      { label: 'A', text: 'go' },
      { label: 'B', text: 'went' },
      { label: 'C', text: 'had gone' },
      { label: 'D', text: 'would go' }
    ],
    correctAnswers: ['B'],
    targetUnits: [38, 39],
    explanation: 'In the if-clause of an unreal present/future situation, use past simple: If I went.',
    khmerExplanation: 'ក្នុងឃ្លា if នៃលក្ខខណ្ឌសម្មតិកម្មបច្ចុប្បន្ន ត្រូវប្រើ Past Simple: If I went។'
  },
  {
    id: 'sg-5.3',
    category: 'If and Wish',
    khmerCategory: 'លក្ខខណ្ឌ If និង Wish',
    questionNumber: '5.3',
    sentence: 'I wish I ________ have to work tomorrow, but unfortunately I do.',
    options: [
      { label: 'A', text: 'don’t' },
      { label: 'B', text: 'didn’t' },
      { label: 'C', text: 'wouldn’t' },
      { label: 'D', text: 'won’t' }
    ],
    correctAnswers: ['B'],
    targetUnits: [39, 41],
    explanation: 'After wish for present regret, we use the past tense: I wish I didn’t have to work.',
    khmerExplanation: 'បន្ទាប់ពី wish សម្ដែងការសោកស្តាយក្នុងបច្ចុប្បន្ន ត្រូវប្រើទម្រង់អតីតកាល៖ I wish I didn’t...។'
  },

  // Section 6: Passive
  {
    id: 'sg-6.1',
    category: 'Passive',
    khmerCategory: 'អកម្មវាច្យ Passive',
    questionNumber: '6.1',
    sentence: 'We ________ by a loud noise during the night.',
    options: [
      { label: 'A', text: 'woke up' },
      { label: 'B', text: 'are woken up' },
      { label: 'C', text: 'were woken up' },
      { label: 'D', text: 'were waking up' }
    ],
    correctAnswers: ['C'],
    targetUnits: [42],
    explanation: 'Past simple passive: were + past participle (woken up).',
    khmerExplanation: 'អតីតកាលអកម្មវាច្យ៖ were + past participle (woken up)។'
  },

  // Section 7: Verb + -ing and to...
  {
    id: 'sg-9.1',
    category: '-ing and to ...',
    khmerCategory: 'កិរិយាសព្ទជាមួយ -ing និង to...',
    questionNumber: '9.1',
    sentence: 'You can’t stop people ________ what they want.',
    options: [
      { label: 'A', text: 'doing' },
      { label: 'B', text: 'do' },
      { label: 'C', text: 'to do' },
      { label: 'D', text: 'from doing' }
    ],
    correctAnswers: ['A', 'D'],
    targetUnits: [53, 62],
    explanation: 'We can say "stop somebody doing" or "stop somebody from doing".',
    khmerExplanation: 'យើងអាចនិយាយថា "stop somebody doing" ឬ "stop somebody from doing" បានទាំងពីរ។'
  },
  {
    id: 'sg-9.4',
    category: '-ing and to ...',
    khmerCategory: 'កិរិយាសព្ទជាមួយ -ing និង to...',
    questionNumber: '9.4',
    sentence: 'I know I locked the door. I clearly remember ________ it.',
    options: [
      { label: 'A', text: 'locking' },
      { label: 'B', text: 'to lock' },
      { label: 'C', text: 'to have locked' }
    ],
    correctAnswers: ['A'],
    targetUnits: [56],
    explanation: 'Remember doing something = I did it and now remember doing it.',
    khmerExplanation: 'Remember + verb-ing មានន័យថាបានធ្វើរួចហើយ ហើយឥឡូវចងចាំទង្វើនោះ។'
  },

  // Section 8: Articles and Nouns
  {
    id: 'sg-10.1',
    category: 'Articles and nouns',
    khmerCategory: 'អត្ថបទកំណត់ និង នាម',
    questionNumber: '10.1',
    sentence: 'It wasn’t your fault. It was ________ .',
    options: [
      { label: 'A', text: 'accident' },
      { label: 'B', text: 'an accident' },
      { label: 'C', text: 'some accident' }
    ],
    correctAnswers: ['B'],
    targetUnits: [69],
    explanation: 'Accident is a countable singular noun and requires "an accident".',
    khmerExplanation: 'Accident ជានាមរាប់បានឯកវចនៈ ត្រូវប្រើ "an accident"។'
  },
  {
    id: 'sg-10.2',
    category: 'Articles and nouns',
    khmerCategory: 'អត្ថបទកំណត់ និង នាម',
    questionNumber: '10.2',
    sentence: 'Where are you going to put all your ________ ?',
    options: [
      { label: 'A', text: 'furniture' },
      { label: 'B', text: 'furnitures' }
    ],
    correctAnswers: ['A'],
    targetUnits: [70],
    explanation: 'Furniture is an uncountable noun with no plural "furnitures".',
    khmerExplanation: 'Furniture ជានាមរាប់មិនបាន មិនមានទម្រង់ពហុវចនៈ "furnitures" ទេ។'
  },

  // Section 9: Prepositions
  {
    id: 'sg-15.1',
    category: 'Prepositions',
    khmerCategory: 'ធ្នាក់ Prepositions',
    questionNumber: '15.1',
    sentence: 'Bye! I’ll see you ________ .',
    options: [
      { label: 'A', text: 'at Friday morning' },
      { label: 'B', text: 'on Friday morning' },
      { label: 'C', text: 'in Friday morning' },
      { label: 'D', text: 'Friday morning' }
    ],
    correctAnswers: ['B', 'D'],
    targetUnits: [121],
    explanation: 'Use "on Friday morning". In spoken English "on" can also be omitted: "see you Friday morning".',
    khmerExplanation: 'ប្រើ "on Friday morning" ឬ "Friday morning" (លុប on បានក្នុងភាសានិយាយ)។'
  },
  {
    id: 'sg-15.17',
    category: 'Prepositions',
    khmerCategory: 'ធ្នាក់ Prepositions',
    questionNumber: '15.17',
    sentence: 'I prefer tea ________ coffee.',
    options: [
      { label: 'A', text: 'to' },
      { label: 'B', text: 'than' },
      { label: 'C', text: 'against' },
      { label: 'D', text: 'over' }
    ],
    correctAnswers: ['A'],
    targetUnits: [136, 59],
    explanation: 'We say "prefer something TO something else" (not than).',
    khmerExplanation: 'យើងនិយាយថា "prefer something TO something else" (ប្រើ to មិនប្រើ than ទេ)។'
  },

  // Section 10: Phrasal verbs
  {
    id: 'sg-16.1',
    category: 'Phrasal verbs',
    khmerCategory: 'កន្សោមកិរិយាសព្ទ Phrasal Verbs',
    questionNumber: '16.1',
    sentence: 'These shoes are uncomfortable. I’m going to ________ .',
    options: [
      { label: 'A', text: 'take off' },
      { label: 'B', text: 'take them off' },
      { label: 'C', text: 'take off them' }
    ],
    correctAnswers: ['B'],
    targetUnits: [137],
    explanation: 'When the object is a pronoun (them), it must go before the particle: take them off.',
    khmerExplanation: 'ពេលកម្មវត្ថុជាសព្វនាម (them) ត្រូវតែដាក់នៅចន្លោះកណ្តាល៖ take them off។'
  }
];
