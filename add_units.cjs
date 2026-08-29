const fs = require('fs');

const unitsText = fs.readFileSync('src/data/unitsData.ts', 'utf8');

// We will insert after unit 7 ends, which is before:
//   {
//     "id": 15,
//     "unitNumber": 15,

const insertionPoint = unitsText.indexOf('  {\n    "id": 15,\n    "unitNumber": 15,');

if (insertionPoint === -1) {
  console.log("Could not find insertion point.");
  process.exit(1);
}

const newUnits = [
  {
    id: 8,
    unitNumber: 8,
    title: "Present perfect 2 (I have done)",
    khmerTitle: "បច្ចុប្បន្នកាលបរិបូណ៌ ២ (I have done)",
    category: "present-perfect",
    categoryName: "Present Perfect",
    khmerCategoryName: "បច្ចុប្បន្នកាលបរិបូណ៌",
    level: "elementary",
    summary: "More uses of the present perfect with just, already, and yet.",
    khmerSummary: "ការប្រើប្រាស់ Present Perfect បន្ថែមទៀតជាមួយ just, already, និង yet។",
    sections: [
      {
        title: "Just",
        khmerTitle: "Just (ទើបតែ)",
        formula: "have/has + just + V3",
        explanation: "Just = a short time ago.",
        khmerExplanation: "Just = ទើបតែ (ពេលខ្លីមុននេះ)។",
        examples: [
          {
            en: "Are Diane and Paul here? Yes, they have just arrived.",
            kh: "តើ Diane និង Paul នៅទីនេះទេ? បាទ/ចាស ពួកគេទើបតែមកដល់។",
            note: "just arrived"
          }
        ]
      },
      {
        title: "Already",
        khmerTitle: "Already (រួចហើយ)",
        formula: "have/has + already + V3",
        explanation: "We use already to say that something happened sooner than expected.",
        khmerExplanation: "យើងប្រើ already សម្រាប់អ្វីដែលបានកើតឡើងមុនការរំពឹងទុក។",
        examples: [
          {
            en: "Don't forget to pay the bill. I've already paid it.",
            kh: "កុំភ្លេចបង់វិក្កយបត្រ។ ខ្ញុំបានបង់វារួចហើយ។",
            note: "already paid"
          }
        ]
      },
      {
        title: "Yet",
        khmerTitle: "Yet (នៅឡើយ)",
        formula: "have/has + not + V3 + yet",
        explanation: "Yet = until now. We use yet in negative sentences and questions. Yet is usually at the end.",
        khmerExplanation: "Yet = រហូតមកដល់ពេលនេះ។ ប្រើក្នុងប្រយោគបដិសេធ និងសំណួរ ហើយច្រើននៅចុងប្រយោគ។",
        examples: [
          {
            en: "Has it stopped raining yet?",
            kh: "តើមេឃរាំងភ្លៀងហើយឬនៅ?",
            note: "question"
          }
        ]
      }
    ],
    exercises: [
      {
        id: "ex_8_1",
        type: "multiple-choice",
        instruction: "Select the correct sentence:",
        khmerInstruction: "ជ្រើសរើសប្រយោគដែលត្រឹមត្រូវ៖",
        options: [
          "They have just arrived.",
          "They just have arrived."
        ],
        correctAnswers: ["They have just arrived."],
        explanation: "just comes between have and the past participle.",
        khmerExplanation: "just ត្រូវដាក់នៅចន្លោះ have និង កិរិយាសព្ទ V3។"
      },
      {
        id: "ex_8_2",
        type: "fill-blank",
        instruction: "Complete the sentence with 'already': I ________ (pay) the bill.",
        khmerInstruction: "បំពេញប្រយោគជាមួយ already៖ I ________ (pay) the bill.",
        prompt: "I ________ the bill.",
        correctAnswers: ["have already paid", "'ve already paid"],
        explanation: "have + already + past participle.",
        khmerExplanation: "have + already + កិរិយាសព្ទខ្ទង់ទី៣។"
      }
    ]
  },
  {
    id: 9,
    unitNumber: 9,
    title: "Present perfect continuous (I have been doing)",
    khmerTitle: "បច្ចុប្បន្នកាលបរិបូណ៌កំពុងបន្ត (I have been doing)",
    category: "present-perfect",
    categoryName: "Present Perfect",
    khmerCategoryName: "បច្ចុប្បន្នកាលបរិបូណ៌",
    level: "intermediate",
    summary: "Used for an activity that has recently stopped or just stopped.",
    khmerSummary: "ប្រើសម្រាប់សកម្មភាពដែលទើបតែបញ្ឈប់។",
    sections: [
      {
        title: "Form and Meaning",
        khmerTitle: "ទម្រង់ និង អត្ថន័យ",
        formula: "have/has + been + V-ing",
        explanation: "We use the present perfect continuous for an activity that has recently stopped or just stopped. There is a connection with now.",
        khmerExplanation: "ប្រើសម្រាប់សកម្មភាពដែលទើបតែឈប់ តែមានទំនាក់ទំនងមកបច្ចុប្បន្ន។",
        examples: [
          {
            en: "You're out of breath. Have you been running?",
            kh: "អ្នកហត់ណាស់។ តើអ្នកទើបតែរត់មែនទេ?",
            note: "have been running"
          },
          {
            en: "Paul is very tired. He's been working very hard.",
            kh: "Paul ហត់ណាស់។ គាត់បានខិតខំធ្វើការខ្លាំងណាស់។",
            note: "has been working"
          }
        ]
      }
    ],
    exercises: [
      {
        id: "ex_9_1",
        type: "multiple-choice",
        instruction: "Select the correct form:",
        khmerInstruction: "ជ្រើសរើសទម្រង់ដែលត្រឹមត្រូវ៖",
        options: [
          "You're out of breath. Have you been running?",
          "You're out of breath. Have you run?"
        ],
        correctAnswers: ["You're out of breath. Have you been running?"],
        explanation: "Use present perfect continuous for recent continuous activity causing a present result.",
        khmerExplanation: "ប្រើ Present Perfect Continuous សម្រាប់សកម្មភាពដែលបណ្តាលឱ្យមានលទ្ធផលនៅបច្ចុប្បន្ន។"
      }
    ]
  },
  {
    id: 10,
    unitNumber: 10,
    title: "Present perfect continuous and simple",
    khmerTitle: "ការប្រៀបធៀប Present Perfect Continuous និង Simple",
    category: "present-perfect",
    categoryName: "Present Perfect",
    khmerCategoryName: "បច្ចុប្បន្នកាលបរិបូណ៌",
    level: "intermediate",
    summary: "Comparing I have been doing and I have done.",
    khmerSummary: "ការប្រៀបធៀបរវាង I have been doing និង I have done។",
    sections: [
      {
        title: "I have been doing vs I have done",
        khmerTitle: "I have been doing ធៀបនឹង I have done",
        formula: "have been V-ing vs have V3",
        explanation: "I have been doing means the activity is still happening or just stopped. I have done means the action is completed.",
        khmerExplanation: "I have been doing ប្រើសម្រាប់សកម្មភាពនៅបន្ត។ I have done ប្រើសម្រាប់សកម្មភាពដែលចប់។",
        examples: [
          {
            en: "My hands are very dirty. I've been repairing my bike.",
            kh: "ដៃរបស់ខ្ញុំកខ្វក់ណាស់។ ខ្ញុំទើបតែជួសជុលកង់។",
            note: "Activity"
          },
          {
            en: "My bike is OK again now. I've repaired it.",
            kh: "កង់របស់ខ្ញុំល្អវិញហើយ។ ខ្ញុំបានជួសជុលវា។",
            note: "Completed action"
          }
        ]
      }
    ],
    exercises: [
      {
        id: "ex_10_1",
        type: "multiple-choice",
        instruction: "Choose the correct sentence:",
        khmerInstruction: "ជ្រើសរើសប្រយោគដែលត្រឹមត្រូវ៖",
        options: [
          "I've been reading the book you lent me, but I haven't finished it yet.",
          "I've read the book you lent me, but I haven't finished it yet."
        ],
        correctAnswers: ["I've been reading the book you lent me, but I haven't finished it yet."],
        explanation: "If it's not finished, use the continuous form.",
        khmerExplanation: "បើមិនទាន់ចប់ ត្រូវប្រើទម្រង់ Continuous។"
      }
    ]
  },
  {
    id: 11,
    unitNumber: 11,
    title: "How long have you (been) ... ?",
    khmerTitle: "How long have you (been) ... ?",
    category: "present-perfect",
    categoryName: "Present Perfect",
    khmerCategoryName: "បច្ចុប្បន្នកាលបរិបូណ៌",
    level: "intermediate",
    summary: "Using How long with present perfect continuous and simple.",
    khmerSummary: "ការប្រើប្រាស់ How long ជាមួយ Present Perfect។",
    sections: [
      {
        title: "How long...?",
        khmerTitle: "តើមានរយៈពេលប៉ុន្មាន...?",
        formula: "How long + have/has + been + V-ing?",
        explanation: "We use How long with present perfect continuous for continuous verbs, and present perfect simple for non-continuous verbs (know, like, believe).",
        khmerExplanation: "ប្រើ How long ជាមួយ Present Perfect Continuous សម្រាប់កិរិយាសព្ទធម្មតា និង Simple សម្រាប់កិរិយាសព្ទបង្ហាញស្ថានភាព (ឧ. know)។",
        examples: [
          {
            en: "How long have you been learning English?",
            kh: "តើអ្នករៀនភាសាអង់គ្លេសរយៈពេលប៉ុន្មានហើយ?",
            note: "Action"
          },
          {
            en: "How long have you known Jane?",
            kh: "តើអ្នកស្គាល់ Jane រយៈពេលប៉ុន្មានហើយ?",
            note: "Not 'have you been knowing'"
          }
        ]
      }
    ],
    exercises: [
      {
        id: "ex_11_1",
        type: "fill-blank",
        instruction: "Complete: How long ________ (you / know) him?",
        khmerInstruction: "បំពេញ៖ How long ________ (you / know) him?",
        prompt: "How long ________ him?",
        correctAnswers: ["have you known"],
        explanation: "Know is a non-continuous verb.",
        khmerExplanation: "Know ជាកិរិយាសព្ទមិនប្រើក្នុងទម្រង់កំពុងបន្ត។"
      }
    ]
  },
  {
    id: 12,
    unitNumber: 12,
    title: "For and since / When ... ? and How long ... ?",
    khmerTitle: "ការប្រើប្រាស់ For និង Since",
    category: "present-perfect",
    categoryName: "Present Perfect",
    khmerCategoryName: "បច្ចុប្បន្នកាលបរិបូណ៌",
    level: "intermediate",
    summary: "Using for (a period of time) and since (the start of a period).",
    khmerSummary: "ការប្រើ for (រយៈពេល) និង since (ចំណុចចាប់ផ្តើមនៃពេលវេលា)។",
    sections: [
      {
        title: "For vs Since",
        khmerTitle: "For ធៀបនឹង Since",
        formula: "for + period / since + point in time",
        explanation: "We use 'for' when we measure the duration. We use 'since' when we give the starting point.",
        khmerExplanation: "ប្រើ for សម្រាប់រយៈពេលវាស់វែង និង since សម្រាប់ចំណុចចាប់ផ្តើម។",
        examples: [
          {
            en: "I've been waiting for two hours.",
            kh: "ខ្ញុំបានរង់ចាំរយៈពេលពីរម៉ោងហើយ។",
            note: "Duration"
          },
          {
            en: "I've been waiting since 8 o'clock.",
            kh: "ខ្ញុំបានរង់ចាំតាំងពីម៉ោង ៨ មកម៉្លេះ។",
            note: "Start point"
          }
        ]
      }
    ],
    exercises: [
      {
        id: "ex_12_1",
        type: "multiple-choice",
        instruction: "Select the correct word:",
        khmerInstruction: "ជ្រើសរើសពាក្យដែលត្រឹមត្រូវ៖",
        options: [
          "I've been working here for 2010.",
          "I've been working here since 2010."
        ],
        correctAnswers: ["I've been working here since 2010."],
        explanation: "2010 is a starting point, so use since.",
        khmerExplanation: "2010 គឺជាចំណុចចាប់ផ្តើម ដូច្នេះត្រូវប្រើ since។"
      }
    ]
  },
  {
    id: 13,
    unitNumber: 13,
    title: "Present perfect and past 1 (I have done and I did)",
    khmerTitle: "Present Perfect និង Past Simple (ភាគ ១)",
    category: "present-past",
    categoryName: "Present and Past",
    khmerCategoryName: "បច្ចុប្បន្នកាល និង អតីតកាល",
    level: "intermediate",
    summary: "Difference between present perfect (unfinished time) and past simple (finished time).",
    khmerSummary: "ភាពខុសគ្នារវាងពេលវេលាមិនទាន់ចប់ និងពេលវេលាដែលចប់រួចរាល់។",
    sections: [
      {
        title: "Finished vs Unfinished Time",
        khmerTitle: "ពេលវេលាបញ្ចប់ និង មិនទាន់បញ្ចប់",
        formula: "Past Simple (finished) vs Present Perfect (unfinished)",
        explanation: "Use past simple for finished time (yesterday, last week). Use present perfect for unfinished time (today, this week).",
        khmerExplanation: "ប្រើ Past Simple សម្រាប់ពេលដែលកន្លងផុត (ម្សិលមិញ)។ ប្រើ Present Perfect សម្រាប់ពេលដែលមិនទាន់ផុត (ថ្ងៃនេះ)។",
        examples: [
          {
            en: "I didn't shave yesterday.",
            kh: "ខ្ញុំមិនបានកោរពុកមាត់ទេកាលពីម្សិលមិញ។",
            note: "Finished time"
          },
          {
            en: "I haven't shaved today.",
            kh: "ខ្ញុំមិនទាន់កោរពុកមាត់ទេថ្ងៃនេះ។",
            note: "Unfinished time"
          }
        ]
      }
    ],
    exercises: [
      {
        id: "ex_13_1",
        type: "multiple-choice",
        instruction: "Select the correct tense:",
        khmerInstruction: "ជ្រើសរើសកាលដែលត្រឹមត្រូវ៖",
        options: [
          "It didn't rain this week.",
          "It hasn't rained this week."
        ],
        correctAnswers: ["It hasn't rained this week."],
        explanation: "This week is an unfinished time period.",
        khmerExplanation: "សប្តាហ៍នេះគឺជាពេលដែលមិនទាន់កន្លងផុត ដូច្នេះប្រើ Present Perfect។"
      }
    ]
  },
  {
    id: 14,
    unitNumber: 14,
    title: "Present perfect and past 2 (I have done and I did)",
    khmerTitle: "Present Perfect និង Past Simple (ភាគ ២)",
    category: "present-past",
    categoryName: "Present and Past",
    khmerCategoryName: "បច្ចុប្បន្នកាល និង អតីតកាល",
    level: "intermediate",
    summary: "More comparison: new information vs older details.",
    khmerSummary: "ការប្រៀបធៀបបន្ថែម៖ ព័ត៌មានថ្មី ធៀបនឹងព័ត៌មានលម្អិតចាស់។",
    sections: [
      {
        title: "New Information vs Details",
        khmerTitle: "ព័ត៌មានថ្មី ធៀបនឹងព័ត៌មានលម្អិត",
        formula: "Present Perfect (News) -> Past Simple (Details)",
        explanation: "We often use the present perfect to give new information or announce a recent happening. Then we use the past simple for the details.",
        khmerExplanation: "យើងច្រើនប្រើ Present Perfect ដើម្បីប្រកាសព័ត៌មានថ្មី ហើយបន្ទាប់មកប្រើ Past Simple សម្រាប់ប្រាប់ព័ត៌មានលម្អិត។",
        examples: [
          {
            en: "Ow! I've burnt myself. (new) How did you do that? (detail)",
            kh: "អូយ! ខ្ញុំរលាកដៃហើយ។ (ថ្មី) តើអ្នកធ្វើយ៉ាងម៉េចហ្នឹង? (លម្អិត)",
            note: "News -> Detail"
          }
        ]
      }
    ],
    exercises: [
      {
        id: "ex_14_1",
        type: "fill-blank",
        instruction: "Complete the dialogue: A: Look! Somebody ________ (spill) coffee on the carpet.",
        khmerInstruction: "បំពេញការសន្ទនា៖ A: Look! Somebody ________ (spill) coffee on the carpet.",
        prompt: "Somebody ________ coffee on the carpet.",
        correctAnswers: ["has spilled", "has spilt", "'s spilled"],
        explanation: "This is a new event with a present result.",
        khmerExplanation: "នេះគឺជាព័ត៌មានថ្មី ដែលមានភស្តុតាងនៅបច្ចុប្បន្ន ដូច្នេះប្រើ Present Perfect។"
      }
    ]
  }
];

const newContent = newUnits.map(u => JSON.stringify(u, null, 4)).join(',\n  ') + ',\n';

const modifiedText = unitsText.substring(0, insertionPoint) + newContent + unitsText.substring(insertionPoint);

fs.writeFileSync('src/data/unitsData.ts', modifiedText, 'utf8');

console.log("Successfully inserted units 8 to 14.");
