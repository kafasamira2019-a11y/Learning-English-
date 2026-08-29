import { AcademicWritingSection } from '../types';

export const academicWritingSections: AcademicWritingSection[] = [
  {
    "id": "sec-1-punctuation-spelling",
    "sectionNumber": 1,
    "title": "Punctuation and Spelling",
    "khmerTitle": "សញ្ញាវណ្ណយុត្តិ និងអក្ខរាវិរុទ្ធក្នុងការស្រាវជ្រាវ",
    "badge": "Section 1",
    "category": "Mechanics & Precision",
    "overviewEn": "Accurate punctuation and spelling are fundamental to academic readability. Reviewers frequently judge paper credibility based on proper comma usage, hyphenation for compound modifiers, capitalization norms, and consistent British/American spelling.",
    "overviewKh": "សញ្ញាវណ្ណយុត្តិ និងអក្ខរាវិរុទ្ធត្រឹមត្រូវ គឺជាគ្រឹះចម្បងនៃភាពងាយយល់ក្នុងការសរសេរ مقាលស្រាវជ្រាវ (Academic Paper)។ ការប្រើសញ្ញាក្បៀស (Commas), សញ្ញាតភ្ជាប់ (Hyphens), អក្សរធំ (Capitalization) និងការប្រកាន់អក្ខរាវិរុទ្ធ US/UK ជួយបង្កើនទំនុកចិត្តពីអ្នកពិនិត្យ (Reviewers)។",
    "rules": [
      {
        "ruleTitle": "Reducing Unnecessary Commas for Smooth Reading",
        "ruleKhmerTitle": "ការកាត់បន្ថយសញ្ញាក្បៀសមិនចាំបាច់ដើម្បីបង្កើនភាពរលូន",
        "explanationEn": "Sentences overloaded with commas interrupt the reader's cognitive flow. Rephrase relative clauses into direct coordinate clauses or move parenthetical phrases.",
        "explanationKh": "ប្រយោគដែលមានសញ្ញាក្បៀសច្រើនពេកធ្វើឱ្យអ្នកអានពិបាកចាប់ន័យ។ គួររៀបចំប្រយោគឡើងវិញឱ្យខ្លី ឬបំប្លែង relative clause ទៅជាប្រយោគសាមញ្ញ។",
        "keyTips": [
          "Avoid breaking the subject and its direct verb with non-essential clauses if it can be stated directly.",
          "Start with introductory time/condition phrases without over-punctuating the main clause.",
          "Separate complex compound sentences into two clean, independent sentences."
        ],
        "beforeAfterExamples": [
          {
            "original": "The specimens, each of which was cruciform, weighed 90–100 g.",
            "revised": "The specimens were cruciform and weighed 90–100 g.",
            "explanation": "Eliminates 2 commas by using a direct compound predicate.",
            "khmerExplanation": "កាត់បន្ថយសញ្ញាក្បៀសទាំងពីរ ដោយប្រើកិរិយាសព្ទសម្របសម្រួល \"were cruciform and weighed\"។"
          },
          {
            "original": "This book, which is aimed at non native researchers, contains a series of exercises practising writing skills.",
            "revised": "This book is aimed at non native researchers. It contains a series of exercises practising writing skills.",
            "explanation": "Breaking a long punctuated sentence into two clear sentences enhances readability.",
            "khmerExplanation": "ការបំបែកជាពីរប្រយោគជួយឱ្យអ្នកអានងាយយល់ និងមិនស្មុគស្មាញ។"
          },
          {
            "original": "Let us take into consideration, using the data given in Table 1, the most important parameters.",
            "revised": "Using the data given in Table 1, the most important parameters can be considered.",
            "explanation": "Moves the dependent clause to the front so the subject and verb remain together.",
            "khmerExplanation": "លើកឃ្លាពន្យល់មកមុខប្រយោគ ដើម្បីកុំឱ្យកាត់ផ្តាច់រវាង Subject និង Verb។"
          }
        ]
      },
      {
        "ruleTitle": "Hyphenation for Compound Unit Modifiers",
        "ruleKhmerTitle": "ការប្រើសញ្ញាតភ្ជាប់ (-) លើគុណនាមផ្សំ (Compound Modifiers)",
        "explanationEn": "Use a hyphen when two or more words act as a single modifier before a noun. If the phrase comes after the noun, hyphens are generally omitted.",
        "explanationKh": "ត្រូវប្រើសញ្ញា Hyphen (-) នៅពេលពាក្យពីរ ឬច្រើនដើរតួជាគុណនាមផ្សំឈរនៅពីមុខនាម (Modifier before Noun)។ ប៉ុន្តែបើឈរនៅក្រោយនាម មិនបាច់ដាក់ hyphen ទេ។",
        "keyTips": [
          "Age/duration before noun: \"a 50-year-old man\" vs \"the man is 50 years old\".",
          "Compound adjectives: \"state-of-the-art equipment\" vs \"the equipment is state of the art\".",
          "Action/process modifiers: \"decision-making process\", \"time-dependent factors\", \"real-life situations\"."
        ],
        "beforeAfterExamples": [
          {
            "original": "We need to look at the decision making process.",
            "revised": "We need to look at the decision-making process.",
            "explanation": "\"decision-making\" acts as a single compound adjective modifying \"process\".",
            "khmerExplanation": "ពាក្យ decision-making គឺជា compound adjective បញ្ជាក់ន័យឱ្យ process។"
          },
          {
            "original": "This is a 10 year period of compiler controlled network testing.",
            "revised": "This is a 10-year period of compiler-controlled network testing.",
            "explanation": "Both \"10-year\" and \"compiler-controlled\" are compound modifiers preceding nouns.",
            "khmerExplanation": "ត្រូវភ្ជាប់ hyphen លើ \"10-year\" និង \"compiler-controlled\" ព្រោះឈរមុខនាម។"
          }
        ]
      },
      {
        "ruleTitle": "Initial Capitalization in Research Titles and Main Text",
        "ruleKhmerTitle": "ការប្រើអក្សរធំដើមពាក្យ (Capitalization) ក្នុងចំណងជើង និងអត្ថបទ",
        "explanationEn": "In title case, capitalize the first and last words, and all nouns, verbs, adjectives, and adverbs. Do NOT capitalize short prepositions (in, on, of, for, to), conjunctions (and, but, or), or articles (a, an, the) unless they start the title.",
        "explanationKh": "ក្នុងចំណងជើង مقាល (Title Case)៖ ត្រូវសរសេរអក្សរធំលើពាក្យដំបូង ពាក្យចុងក្រោយ នាម កិរិយាសព្ទ គុណនាម និងគុណកិរិយា។ កុំសរសេរអក្សរធំលើធ្នាក់ខ្លីៗ (in, on, of, for), ឈ្នាប់ (and, but), ឬ Articles (a, an, the) លើកលែងតែនៅដើមចំណងជើង។",
        "keyTips": [
          "Capitalize specific named items: \"Table 1\", \"Figure 3b\", \"Section 4\", \"University of Manchester\".",
          "Proper nouns & standard terms: \"Boolean values\", \"English\", \"Monday to Friday\".",
          "Do not capitalize common nouns mid-sentence: \"the authors acknowledge support from the university\" (lowercase if generic)."
        ],
        "beforeAfterExamples": [
          {
            "original": "the role of english in the twenty-first century.",
            "revised": "The Role of English in the Twenty-First Century.",
            "explanation": "Proper title case capitalization applied to all major content words.",
            "khmerExplanation": "សរសេរអក្សរធំលើពាក្យសំខាន់ៗ លើកលែងតែ of, in, the។"
          },
          {
            "original": "The values are shown in table 1 from monday to friday.",
            "revised": "The values are shown in Table 1 from Monday to Friday.",
            "explanation": "Specific Table references and days of the week require initial capital letters.",
            "khmerExplanation": "ពាក្យ Table 1 និងឈ្មោះថ្ងៃ Monday, Friday ត្រូវតែចាប់ផ្តើមដោយអក្សរធំ។"
          }
        ]
      }
    ],
    "subsections": [
      {
        "id": "sub-1-1",
        "code": "1.1",
        "title": "Commas: Reducing Number of Commas",
        "khmerTitle": "ការកាត់បន្ថយសញ្ញាក្បៀសដើម្បីឱ្យប្រយោគរលូន",
        "guide": "Choose the most readable rewrite that eliminates unnecessary comma pauses.",
        "khmerGuide": "ជ្រើសរើសប្រយោគដែលកែសម្រួលបានល្អបំផុតដោយកាត់បន្ថយសញ្ញាក្បៀសដែលមិនចាំបាច់។",
        "exercises": [
          {
            "id": "ex-1-1-1",
            "type": "multiple-choice",
            "promptEn": "Which rewrite best reduces unnecessary commas in: \"This device, as is well known, will separate X from Y.\"",
            "promptKh": "តើប្រយោគណាដែលកែសម្រួលបានល្អបំផុតសម្រាប់ប្រយោគខាងលើ?",
            "originalSentence": "This device, as is well known, will separate X from Y.",
            "options": [
              {
                "label": "A",
                "text": "As is well known, this device will separate X from Y.",
                "isCorrect": true
              },
              {
                "label": "B",
                "text": "This device will separate, as well known, X from Y.",
                "isCorrect": false
              },
              {
                "label": "C",
                "text": "This device, will separate X from Y as well known.",
                "isCorrect": false
              }
            ],
            "correctAnswer": "A",
            "explanationEn": "Moving \"As is well known\" to the start leaves the core subject-verb-object sequence intact with only one comma.",
            "explanationKh": "ការលើក \"As is well known\" មកដើមប្រយោគ ជួយឱ្យ Subject និង Verb នៅជាប់គ្នាដោយប្រើក្បៀសតែមួយ។"
          },
          {
            "id": "ex-1-1-2",
            "type": "multiple-choice",
            "promptEn": "Which is the most readable and concise revision of: \"The results of the survey, once they have been processed, will be used to make a full assessment of the advantages of such an approach.\"",
            "promptKh": "តើប្រយោគណាដែលសរសេរឡើងវិញបានច្បាស់ និងខ្លីជាងគេ?",
            "originalSentence": "The results of the survey, once they have been processed, will be used to make a full assessment of the advantages of such an approach.",
            "options": [
              {
                "label": "A",
                "text": "The results, of survey, once processed, will make an assessment.",
                "isCorrect": false
              },
              {
                "label": "B",
                "text": "Once the results of the survey have been processed, they will be used to make a full assessment of the advantages of such an approach.",
                "isCorrect": true
              },
              {
                "label": "C",
                "text": "Once processed, survey results of advantages of such an approach will be assessed by them.",
                "isCorrect": false
              }
            ],
            "correctAnswer": "B",
            "explanationEn": "Fronting the conditional clause \"Once the results...\" provides a smooth chronological progression.",
            "explanationKh": "ការដាក់ឃ្លាកាលវេលា \"Once the results...\" នៅដើម ធ្វើឱ្យលំហូរនៃការអានមានលំដាប់លំដោយល្អ។"
          }
        ]
      },
      {
        "id": "sub-1-5",
        "code": "1.5",
        "title": "Hyphens: Adding Hyphens to Compound Adjectives",
        "khmerTitle": "ការបន្ថែមសញ្ញា Hyphen លើគុណនាមផ្សំ",
        "guide": "Decide whether a hyphen is required in compound expressions modifying a noun.",
        "khmerGuide": "កំណត់ថាតើកន្សោមពាក្យណាខ្លះដែលត្រូវការសញ្ញា Hyphen (-) ពេលឈរពីមុខនាម។",
        "exercises": [
          {
            "id": "ex-1-5-1",
            "type": "multiple-choice",
            "promptEn": "Choose the correctly hyphenated sentence:",
            "promptKh": "ជ្រើសរើសប្រយោគដែលប្រើសញ្ញា hyphen បានត្រឹមត្រូវ៖",
            "options": [
              {
                "label": "A",
                "text": "This entails using a market based mechanism to evaluate the 10 year period.",
                "isCorrect": false
              },
              {
                "label": "B",
                "text": "This entails using a market-based-mechanism to evaluate the 10-years-period.",
                "isCorrect": false
              },
              {
                "label": "C",
                "text": "This entails using a market-based mechanism to evaluate the 10-year period.",
                "isCorrect": true
              }
            ],
            "correctAnswer": "C",
            "explanationEn": "\"market-based\" and \"10-year\" are compound adjectives modifying \"mechanism\" and \"period\". Note that \"year\" is singular in compound modifiers.",
            "explanationKh": "market-based និង 10-year គឺជា compound modifiers ដូច្នេះត្រូវមាន hyphen ហើយ year ត្រូវនៅជាឯកវចនៈ។"
          },
          {
            "id": "ex-1-5-2",
            "type": "multiple-choice",
            "promptEn": "Compare: (a) \"This is a state of the art piece of equipment.\" vs (b) \"The equipment is state of the art.\" Where are hyphens needed?",
            "promptKh": "តើប្រយោគមួយណាដែលត្រូវការសញ្ញា Hyphen?",
            "options": [
              {
                "label": "A",
                "text": "Sentence (a) needs hyphens: \"state-of-the-art piece of equipment\", while (b) does not.",
                "isCorrect": true
              },
              {
                "label": "B",
                "text": "Both sentences need hyphens.",
                "isCorrect": false
              },
              {
                "label": "C",
                "text": "Sentence (b) needs hyphens, but (a) does not.",
                "isCorrect": false
              }
            ],
            "correctAnswer": "A",
            "explanationEn": "When the phrase precedes the noun as a compound modifier, hyphens are needed (\"state-of-the-art equipment\"). When following the verb as a predicate, no hyphens are used.",
            "explanationKh": "នៅពេលឈរពីមុខនាមត្រូវដាក់ hyphen (\"state-of-the-art\") ប៉ុន្តែពេលនៅក្រោយកិរិយាសព្ទមិនបាច់ដាក់ទេ។"
          }
        ]
      },
      {
        "id": "sub-1-11",
        "code": "1.11",
        "title": "Spelling: British (GB) vs American (US) Norms",
        "khmerTitle": "អក្ខរាវិរុទ្ធ៖ ការប្រៀបធៀបស្តង់ដារ British (GB) និង American (US)",
        "guide": "Identify correct academic spellings and maintain consistency throughout your manuscript.",
        "khmerGuide": "ស្គាល់អក្ខរាវិរុទ្ធត្រឹមត្រូវ និងរក្សាភាពស៊ីសង្វាក់គ្នានៅក្នុងអត្ថបទស្រាវជ្រាវទាំងមូល។",
        "exercises": [
          {
            "id": "ex-1-11-1",
            "type": "multiple-choice",
            "promptEn": "Which sentence has consistent American English (US) spelling?",
            "promptKh": "តើប្រយោគណាដែលប្រកាន់ខ្ជាប់អក្ខរាវិរុទ្ធបែបអាមេរិក (US) យ៉ាងត្រឹមត្រូវ?",
            "options": [
              {
                "label": "A",
                "text": "We established the research centre in the neighbouring district and analyzed the behavioural patterns.",
                "isCorrect": false
              },
              {
                "label": "B",
                "text": "We established the research center in the neighboring district and analyzed the behavioral patterns.",
                "isCorrect": true
              },
              {
                "label": "C",
                "text": "We established the research center in the neighbouring district and analysed the patterns.",
                "isCorrect": false
              }
            ],
            "correctAnswer": "B",
            "explanationEn": "US spelling uses \"-er\" (center), \"-or\" (neighboring, behavior), and \"-yze\" (analyze). GB uses \"-re\" (centre), \"-our\" (neighbouring, behaviour), and \"-yse\" (analyse). Consistency is key.",
            "explanationKh": "អក្ខរាវិរុទ្ធ US ប្រើ center, neighboring, analyzed។ អក្ខរាវិរុទ្ធ UK ប្រើ centre, neighbouring, analysed។ សំខាន់គឺត្រូវប្រើបែបណាមួយឱ្យដូចគ្នាទាំងអស់។"
          }
        ]
      }
    ]
  },
  {
    "id": "sec-2-word-order",
    "sectionNumber": 2,
    "title": "Word Order and Reader Assimilation",
    "khmerTitle": "លំដាប់ពាក្យក្នុងប្រយោគ (Word Order) និងភាពងាយយល់",
    "badge": "Section 2",
    "category": "Sentence Structure",
    "overviewEn": "English is an SVO (Subject-Verb-Object) language. Keeping the subject and main verb close together, placing critical new information in prominent positions, and avoiding artificial filler starters like \"It is...\" ensures your ideas are grasped effortlessly on first reading.",
    "overviewKh": "ភាសាអង់គ្លេសមានទម្រង់ SVO (Subject + Verb + Object)។ ការដាក់ Subject និង Verb ឱ្យនៅជិតគ្នា ការដាក់ព័ត៌មានសំខាន់នៅដើមប្រយោគ និងការជៀសវាងពាក្យបំពេញឥតន័យដូចជា \"It is...\" ជួយឱ្យអ្នកអានយល់ន័យបានភ្លាមៗដោយមិនបាច់អានឡើងវិញ។",
    "rules": [
      {
        "ruleTitle": "Placing the Subject and Key Information First",
        "ruleKhmerTitle": "ការដាក់ប្រធាន (Subject) និងពាក្យគន្លឹះនៅខាងមុខប្រយោគ",
        "explanationEn": "Readers look for the subject immediately to understand what the sentence is about. Avoid burying the real subject under long introductory prepositional piles.",
        "explanationKh": "អ្នកអានតែងតែស្វែងរក Subject ភ្លាមៗដើម្បីដឹងថាប្រយោគនិយាយអំពីអ្វី។ ចូរជៀសវាងការលាក់ Subject នៅពីក្រោយឃ្លាវែងៗ។",
        "keyTips": [
          "Put the primary topic as the grammatical subject.",
          "Keep the direct object close to the verb before adding circumstantial adverbials (time, place, method).",
          "Avoid placing verbs at the very end of long 30-word sentences."
        ],
        "beforeAfterExamples": [
          {
            "original": "Among the factors which influence longevity of seeds, of particular importance are temperature and moisture content.",
            "revised": "Temperature and moisture content are particularly important factors influencing the longevity of seeds.",
            "explanation": "Putting \"Temperature and moisture content\" as the direct subject makes the statement immediate and energetic.",
            "khmerExplanation": "ការដាក់ \"Temperature and moisture content\" ជា Subject ធ្វើឱ្យប្រយោគមានថាមពល និងច្បាស់លាស់។"
          },
          {
            "original": "These findings highlighted in patients with severe disabilities a lack of motor function.",
            "revised": "These findings highlighted a lack of motor function in patients with severe disabilities.",
            "explanation": "The direct object (\"a lack of motor function\") must immediately follow the transitive verb (\"highlighted\"), not the indirect prepositional phrase.",
            "khmerExplanation": "កម្មបទផ្ទាល់ (Direct object) ត្រូវនៅជាប់នឹងកិរិយាសព្ទ \"highlighted\" មុនឃ្លា prepositional \"in patients...\"។"
          }
        ]
      },
      {
        "ruleTitle": "Avoiding Weak \"It is...\" Sentence Openers",
        "ruleKhmerTitle": "ការកាត់បន្ថយទម្រង់ខ្សោយ \"It is...\" នៅដើមប្រយោគ",
        "explanationEn": "Starting academic sentences with \"It is possible to...\", \"It is important to...\", or \"It is mandatory to...\" creates passive clutter. Convert them to active verbs or direct modal expressions.",
        "explanationKh": "ការចាប់ផ្តើមប្រយោគដោយ \"It is possible to...\", \"It is important to...\" នាំឱ្យប្រយោគវែងអូសបន្លាយ។ គួរប្តូរមកប្រើ Modal verbs (can, must, should) ឬ Active verbs វិញ។",
        "keyTips": [
          "\"It is possible to use X\" → \"X can be used\" or \"We can use X\".",
          "\"It is mandatory to follow Y\" → \"Y is mandatory\" or \"Researchers must follow Y\".",
          "\"It is anticipated that Z will increase\" → \"Z is anticipated to increase\"."
        ],
        "beforeAfterExamples": [
          {
            "original": "It is possible with this model to give the actual flow rate.",
            "revised": "This model gives the actual flow rate.",
            "explanation": "Transforms a 12-word weak impersonal phrase into a direct 7-word scientific claim.",
            "khmerExplanation": "បំប្លែងពីប្រយោគខ្សោយ ១២ ពាក្យ មកជាប្រយោគខ្លីខ្លឹម ៧ ពាក្យ \"This model gives...\"។"
          },
          {
            "original": "It is important to clean the samples before testing.",
            "revised": "The samples must be cleaned before testing.",
            "explanation": "Replaces \"It is important to\" with the clear modal \"must\".",
            "khmerExplanation": "ជំនួស \"It is important to\" ដោយពាក្យច្បាស់លាស់ \"must\"។"
          }
        ]
      }
    ],
    "subsections": [
      {
        "id": "sub-2-1",
        "code": "2.1",
        "title": "Choosing the Best Subject at the Beginning of the Phrase",
        "khmerTitle": "ការជ្រើសរើស Subject ដ៏ស័ក្តិសមបំផុតនៅដើមប្រយោគ",
        "guide": "Identify the sentence option that presents the subject clearly without awkward inversion.",
        "khmerGuide": "ជ្រើសរើសប្រយោគដែលរៀបចំ Subject និង Verb បានត្រឹមត្រូវតាមក្បួនភាសាអង់គ្លេស។",
        "exercises": [
          {
            "id": "ex-2-1-1",
            "type": "multiple-choice",
            "promptEn": "Choose the most natural academic sentence order:",
            "promptKh": "ជ្រើសរើសទម្រង់លំដាប់ពាក្យបែប Academic ដែលត្រឹមត្រូវ និងទាក់ទាញបំផុត៖",
            "options": [
              {
                "label": "A",
                "text": "Sometimes 802.16 systems are referred to as WiMAX systems in the trade press.",
                "isCorrect": false
              },
              {
                "label": "B",
                "text": "In the trade press, 802.16 systems are sometimes referred to as WiMAX systems.",
                "isCorrect": true
              }
            ],
            "correctAnswer": "B",
            "explanationEn": "Setting the domain (\"In the trade press\") first helps the reader contextualize the terminology before introducing the system.",
            "explanationKh": "ការដាក់ទីកន្លែង/បរិបទ \"In the trade press\" នៅមុខ ជួយឱ្យអ្នកអានងាយយល់បរិបទនៃពាក្យបច្ចេកទេស។"
          },
          {
            "id": "ex-2-1-2",
            "type": "multiple-choice",
            "promptEn": "Select the sentence with correct Direct Object placement after the verb:",
            "promptKh": "ជ្រើសរើសប្រយោគដែលដាក់ Direct Object នៅជាប់កិរិយាសព្ទបានត្រឹមត្រូវ៖",
            "options": [
              {
                "label": "A",
                "text": "The increase in power makes it possible to download the data with sufficient speed.",
                "isCorrect": true
              },
              {
                "label": "B",
                "text": "The increase in power makes it possible to download with sufficient speed the data.",
                "isCorrect": false
              }
            ],
            "correctAnswer": "A",
            "explanationEn": "In English, the direct object (\"the data\") directly follows the verb (\"download\") before the adverbial prepositional phrase (\"with sufficient speed\").",
            "explanationKh": "ភាសាអង់គ្លេសតម្រូវឱ្យដាក់ Direct Object \"the data\" នៅជាប់ Verb \"download\" មុននឹងឃ្លា adverb \"with sufficient speed\"។"
          }
        ]
      },
      {
        "id": "sub-2-3",
        "code": "2.3",
        "title": "Avoiding Beginning Sentences with \"It is...\"",
        "khmerTitle": "ការកែសម្រួលប្រយោគកុំឱ្យចាប់ផ្តើមដោយ \"It is...\"",
        "guide": "Rewrite sentences to eliminate redundant dummy \"It is\" subjects.",
        "khmerGuide": "ជ្រើសរើសប្រយោគដែលបានកែសម្រួលដោយលុបពាក្យ \"It is\" ចោល។",
        "exercises": [
          {
            "id": "ex-2-3-1",
            "type": "multiple-choice",
            "promptEn": "How should \"It is possible to use several strategies to achieve these goals.\" be rewritten?",
            "promptKh": "តើប្រយោគខាងលើគួរសរសេរឡើងវិញយ៉ាងដូចម្តេច?",
            "options": [
              {
                "label": "A",
                "text": "It is achievable to use several strategies for these goals.",
                "isCorrect": false
              },
              {
                "label": "B",
                "text": "Several strategies can be used to achieve these goals.",
                "isCorrect": true
              },
              {
                "label": "C",
                "text": "To achieve these goals several strategies it is possible to use.",
                "isCorrect": false
              }
            ],
            "correctAnswer": "B",
            "explanationEn": "\"Several strategies can be used...\" makes the actual tool/method the subject, creating a crisp passive construction.",
            "explanationKh": "\"Several strategies can be used...\" លើកយកវិធីសាស្ត្រមកធ្វើជាប្រធានផ្ទាល់ ធ្វើឱ្យប្រយោគមានន័យច្បាស់។"
          }
        ]
      }
    ]
  },
  {
    "id": "sec-3-short-sentences-paragraphs",
    "sectionNumber": 3,
    "title": "Writing Short Sentences and Paragraphs",
    "khmerTitle": "ការសរសេរប្រយោគ និងកថាខណ្ឌខ្លីៗប្រកបដោយប្រសិទ្ធភាព",
    "badge": "Section 3",
    "category": "Clarity & Length",
    "overviewEn": "Research shows that sentences exceeding 30 words dramatically increase reader cognitive burden and reviewer rejection rates. Mastering the art of breaking up compound-complex sentences and structuring single-topic paragraphs ensures seamless comprehension.",
    "overviewKh": "ការស្រាវជ្រាវបង្ហាញថា ប្រយោគដែលលើសពី ៣០ ពាក្យ ធ្វើឱ្យអ្នកអានពិបាកយល់ និងងាយត្រូវបាន Reviewer បដិសេធ។ ការចេះបំបែកប្រយោគស្មុគស្មាញ និងការរៀបចំកថាខណ្ឌផ្តោតលើគំនិតតែមួយ (One idea per paragraph) គឺជាគន្លឹះជោគជ័យ។",
    "rules": [
      {
        "ruleTitle": "The 30-Word Limit Rule",
        "ruleKhmerTitle": "ក្បួនកម្រិតប្រវែងប្រយោគមិនឱ្យលើសពី ៣០ ពាក្យ (30-Word Rule)",
        "explanationEn": "Scientific sentences should average 15–25 words and rarely exceed 30 words. If a sentence has multiple sub-clauses joined by \"and\", \"which\", \"because\", and \"thus\", divide it into two or three focused statements.",
        "explanationKh": "ប្រយោគបែបវិទ្យាសាស្ត្រគួរមានប្រវែងជាមធ្យមពី ១៥ ទៅ ២៥ ពាក្យ ហើយកម្រឱ្យលើសពី ៣០ ពាក្យណាស់។ បើប្រយោគមានកន្សោមតភ្ជាប់ច្រើនពេក ចូរពុះជា ២ ឬ ៣ ប្រយោគដាច់ដោយឡែក។",
        "keyTips": [
          "Simple sentence (SVO): 1 idea.",
          "Compound/Complex sentence: Maximum 2 related ideas.",
          "Full stop (.) is your best friend in academic writing; it gives the reader's brain time to process."
        ],
        "beforeAfterExamples": [
          {
            "original": "The seeds, sterilised for 3 min. in NaOCl (1% available chlorine) and rinsed with distilled water, were germinated on moist filter paper (Whatman No. 2) in Petri dishes and grown in the dark at 23 °C till 72 hours. (40 words)",
            "revised": "The seeds were sterilised for 3 min. in NaOCl (1% available chlorine), and rinsed with distilled water. They were then germinated on moist filter paper (Whatman No. 2) in Petri dishes and grown in the dark at 23 °C. (37 words across 2 sentences)",
            "explanation": "Dividing into action 1 (sterilization) and action 2 (germination) makes the experimental protocol effortless to replicate.",
            "khmerExplanation": "បំបែកជា ២ ប្រយោគ (ដំណាក់កាលសម្លាប់មេរោគ និងដំណាក់កាលបណ្តុះ) ជួយឱ្យអ្នកអានងាយស្រួលអនុវត្តតាមក្នុងបន្ទប់ពិសោធន៍។"
          }
        ]
      },
      {
        "ruleTitle": "Structuring Single-Topic Paragraphs",
        "ruleKhmerTitle": "ការរៀបចំកថាខណ្ឌឱ្យផ្តោតលើប្រធានបទតែមួយ",
        "explanationEn": "Each paragraph should contain one core idea introduced by a topic sentence, followed by supporting evidence, and concluding with a transition or takeaway.",
        "explanationKh": "កថាខណ្ឌនីមួយៗត្រូវមានគំនិតស្នូលតែមួយ ដោយចាប់ផ្តើមដោយ Topic Sentence បន្ទាប់មកជាភស្តុតាងគាំទ្រ និងបញ្ចប់ដោយការសន្និដ្ឋានខ្លី។",
        "keyTips": [
          "Keep paragraphs between 50 and 150 words.",
          "Use white space generously; dense walls of text cause reader fatigue.",
          "When shifting from existing literature to your own contribution, always start a new paragraph."
        ],
        "beforeAfterExamples": [
          {
            "original": "A continuous 300-word block mixing background literature, methods, survey results, and future speculations.",
            "revised": "Split into 4 distinct paragraphs: (1) Background state-of-the-art, (2) Identified gap, (3) Proposed methodology, (4) Key outcomes.",
            "explanation": "Modular paragraphs allow skim-reading and logical indexation by international referees.",
            "khmerExplanation": "ការបែងចែកកថាខណ្ឌតាមដំណាក់កាល (បរិបទ, ចន្លោះខ្វះខាត, វិធីសាស្ត្រ, លទ្ធផល) ជួយឱ្យ referee ងាយស្រួលវាយតម្លៃ។"
          }
        ]
      }
    ],
    "subsections": [
      {
        "id": "sub-3-1",
        "code": "3.1",
        "title": "Dividing Up Long Sentences into Manageable Units",
        "khmerTitle": "ការបំបែកប្រយោគវែងៗឱ្យខ្លី និងងាយស្រួលអាន",
        "guide": "Choose the best split that maintains scientific precision while eliminating run-on confusion.",
        "khmerGuide": "ជ្រើសរើសវិធីបំបែកប្រយោគដែលរក្សាភាពត្រឹមត្រូវនៃទិន្នន័យពិសោធន៍។",
        "exercises": [
          {
            "id": "ex-3-1-1",
            "type": "multiple-choice",
            "promptEn": "Which option best breaks up this 45-word sentence: \"Using automatic translation software (e.g. Google Translate, Babelfish, and Systran) can considerably ease the work of researchers when they need to translate documents thus saving them money and increasing the amount of time they have to spend in the laboratory rather than at the computer.\"",
            "promptKh": "តើជម្រើសណាដែលបំបែកប្រយោគខាងលើបានល្អបំផុត?",
            "options": [
              {
                "label": "A",
                "text": "Using automatic translation software (e.g. Google Translate) can considerably ease the work of researchers when translating documents. This saves money on professional translation fees. It also increases the time researchers can spend in the laboratory rather than at the PC.",
                "isCorrect": true
              },
              {
                "label": "B",
                "text": "Automatic translation software eases work, saving money, because researchers spend time in lab, not computer.",
                "isCorrect": false
              }
            ],
            "correctAnswer": "A",
            "explanationEn": "Option A creates 3 balanced sentences under 20 words each, isolating the tool, the financial saving, and the laboratory time benefit.",
            "explanationKh": "ជម្រើស A បំបែកជា ៣ ប្រយោគខ្លីៗ (ឧបករណ៍, ការសន្សំប្រាក់, និងការបង្កើនម៉ោងពិសោធន៍) យ៉ាងច្បាស់លាស់។"
          }
        ]
      }
    ]
  },
  {
    "id": "sec-4-link-words",
    "sectionNumber": 4,
    "title": "Link Words and Sentence Connectors",
    "khmerTitle": "ឈ្នាប់ និងពាក្យតភ្ជាប់ប្រយោគ (Link Words & Transitions)",
    "badge": "Section 4",
    "category": "Cohesion & Flow",
    "overviewEn": "Connectors establish logical relationships between ideas (cause, consequence, contrast, addition, concession). However, overusing link words creates artificial clunkiness. Learn when connectors are essential and when logical subject repetition creates smoother flow.",
    "overviewKh": "ពាក្យតភ្ជាប់ (Link words) បង្ហាញពីទំនាក់ទំនងតក្កវិជ្ជា (មូលហេតុ, ផលវិបាក, ភាពផ្ទុយគ្នា, ការបន្ថែម)។ ប៉ុន្តែការប្រើ link words ច្រើនហួសប្រមាណធ្វើឱ្យអត្ថបទស្ទះ។ ចូររៀនប្រើឈ្នាប់នៅពេលចាំបាច់ពិតប្រាកដ។",
    "rules": [
      {
        "ruleTitle": "Connecting Sentences by Key Word Repetition",
        "ruleKhmerTitle": "ការតភ្ជាប់ប្រយោគដោយប្រើពាក្យគន្លឹះឡើងវិញ (Lexical Chaining)",
        "explanationEn": "Instead of stuffing every sentence with \"Furthermore\", \"Moreover\", and \"In addition\", link sentences naturally by taking a key noun or concept from the end of sentence 1 and placing it at the start of sentence 2.",
        "explanationKh": "កុំប្រើពាក្យ \"Furthermore\", \"Moreover\", \"In addition\" គ្រប់ប្រយោគ។ វិធីសាស្ត្រល្អគឺយកពាក្យគន្លឹះ (Key Noun) ពីចុងប្រយោគទី១ មកធ្វើជាប្រធាននៅដើមប្រយោគទី២។",
        "keyTips": [
          "Pattern: \"...water vapor. (2) This vapor accumulates... (3) The water vapor then condenses. (4) This condensation is...\"",
          "Use demonstrative determiners: \"This discovery\", \"Such rejections\", \"These restrictions\".",
          "Only add transitional link words (However, Nevertheless, In contrast) when the logic genuinely changes direction."
        ],
        "beforeAfterExamples": [
          {
            "original": "The engine performed extremely well. In addition, the performance of the engine was much better than expected.",
            "revised": "The engine performed extremely well. In fact its performance was much better than had been expected.",
            "explanation": "Uses \"its performance\" to link back seamlessly to the verb \"performed\".",
            "khmerExplanation": "ប្រើពាក្យ \"its performance\" ដើម្បីតភ្ជាប់ត្រឡប់ទៅកិរិយាសព្ទ \"performed\" យ៉ាងរលូន។"
          }
        ]
      },
      {
        "ruleTitle": "Expressing Contrast and Hedged Concessions",
        "ruleKhmerTitle": "ការបង្ហាញភាពផ្ទុយគ្នា និងការលើកឡើងពីចំណុចសម្បទាន (Contrast & Concession)",
        "explanationEn": "Use precise contrastive markers: \"However\" (signals shift), \"In contrast / On the other hand\" (direct comparison between two entities), \"Although / Even though\" (subordinates the concession), \"Despite this\" (shows resilience against counter-evidence).",
        "explanationKh": "ប្រើប្រាស់ឈ្នាប់បង្ហាញភាពផ្ទុយគ្នាយ៉ាងច្បាស់លាស់៖ \"However\" (ប្តូរទិសដៅគំនិត), \"In contrast\" (ប្រៀបធៀបវត្ថុពីរ), \"Although\" (ទោះបីជាយ៉ាងណាក៏ដោយ), \"Despite this\" (ទោះបីជាមានឧបសគ្គនេះក៏ដោយ)។",
        "keyTips": [
          "\"Although [limitation], [positive finding]\": \"Although peer review may delay publication, it ensures high scientific rigor.\"",
          "Avoid starting consecutive sentences with \"However\" and \"On the other hand\".",
          "Position \"thus\" or \"therefore\" mid-sentence after the subject for a more native academic cadence."
        ],
        "beforeAfterExamples": [
          {
            "original": "For this reason, firms offering such goods need to make more effort in order to be aware of competitors.",
            "revised": "Firms offering such goods thus need to make more effort to remain aware of competitors.",
            "explanation": "Embedding \"thus\" after the subject produces a sophisticated academic rhythm.",
            "khmerExplanation": "ការដាក់ \"thus\" នៅកណ្តាលប្រយោគក្រោយ subject ធ្វើឱ្យលំនាំប្រយោគមានលក្ខណៈ academic កាន់តែខ្លាំង។"
          }
        ]
      }
    ],
    "subsections": [
      {
        "id": "sub-4-4",
        "code": "4.4",
        "title": "Choosing the Best Link Word in Abstracts",
        "khmerTitle": "ការជ្រើសរើស Link Word ដ៏ស័ក្តិសមបំផុតក្នុងសេចក្តីសង្ខេប (Abstract)",
        "guide": "Select the leanest, most natural connector for academic summaries.",
        "khmerGuide": "ជ្រើសរើសឈ្នាប់ដែលខ្លី និងស៊ីជម្រៅបំផុតសម្រាប់ Abstract។",
        "exercises": [
          {
            "id": "ex-4-4-1",
            "type": "multiple-choice",
            "promptEn": "Choose the best option for beginning the methodology statement in an abstract: \"______ we formulated the following learning program based on lectures and experiments.\"",
            "promptKh": "តើជម្រើសណាដែលស័ក្តិសមបំផុតសម្រាប់ប្រយោគវិធីសាស្ត្រក្នុង Abstract?",
            "options": [
              {
                "label": "A",
                "text": "We thus formulated the following learning program...",
                "isCorrect": true
              },
              {
                "label": "B",
                "text": "Bearing in mind all these aforementioned diverse objectives, we formulated...",
                "isCorrect": false
              },
              {
                "label": "C",
                "text": "In actual practical fact we formulated...",
                "isCorrect": false
              }
            ],
            "correctAnswer": "A",
            "explanationEn": "\"We thus formulated...\" is concise, direct, and avoids wordy padding like \"Bearing in mind all these aforementioned...\".",
            "explanationKh": "\"We thus formulated...\" មានលក្ខណៈខ្លី ខ្លឹម និងជៀសវាងពាក្យវែងអូសបន្លាយដែលគ្មានតម្លៃបន្ថែម។"
          }
        ]
      },
      {
        "id": "sub-4-10",
        "code": "4.10",
        "title": "Making Contrasts: However vs In contrast vs Whereas",
        "khmerTitle": "ការប្រើប្រាស់ពាក្យផ្ទុយ៖ However, In contrast, Whereas",
        "guide": "Choose the correct link word to bridge contrasting scientific facts.",
        "khmerGuide": "ជ្រើសរើសពាក្យផ្ទុយគ្នាឱ្យត្រូវនឹងបរិបទប្រយោគវិទ្យាសាស្ត្រ។",
        "exercises": [
          {
            "id": "ex-4-10-1",
            "type": "multiple-choice",
            "promptEn": "Fill in the blank: \"Centipedes are aggressive hunters, ______ millipedes are harmless herbivores.\"",
            "promptKh": "ជ្រើសរើសពាក្យបំពេញចន្លោះ៖",
            "options": [
              {
                "label": "A",
                "text": "despite",
                "isCorrect": false
              },
              {
                "label": "B",
                "text": "whereas",
                "isCorrect": true
              },
              {
                "label": "C",
                "text": "on the other hand that",
                "isCorrect": false
              }
            ],
            "correctAnswer": "B",
            "explanationEn": "\"whereas\" or \"while\" is used to directly contrast two facts or subjects within the same compound sentence.",
            "explanationKh": "\"whereas\" ប្រើសម្រាប់ប្រៀបធៀបភាពផ្ទុយគ្នារវាងប្រធានពីរក្នងប្រយោគតែមួយ។"
          }
        ]
      }
    ]
  },
  {
    "id": "sec-5-conciseness-redundancy",
    "sectionNumber": 5,
    "title": "Being Concise and Removing Redundancy",
    "khmerTitle": "ការសរសេរឱ្យខ្លីខ្លឹម និងការកាត់បន្ថយពាក្យជាន់ន័យ (Conciseness)",
    "badge": "Section 5",
    "category": "Brevity & Directness",
    "overviewEn": "Conciseness is the hallmark of modern scientific publishing. Journals impose strict word limits. Converting nominalizations (verb+noun) into single verbs, replacing multi-word prepositions with single words, and pruning filler phrases will cut 20-35% of your paper's length without losing any scientific content.",
    "overviewKh": "ភាពខ្លីខ្លឹម គឺជាស្តង់ដារកំពូលនៃទិនានុប្បវត្តិអន្តរជាតិ (International Journals)។ ការបំប្លែងនាម (Nominalizations) មកជាកិរិយាសព្ទសាមញ្ញ (ឧ. make a comparison -> compare) និងការកាត់ចោលពាក្យបំពេញឥតប្រយោជន៍ អាចកាត់បន្ថយប្រវែងអត្ថបទបាន ២០-៣៥% ដោយមិនបាត់បង់អត្ថន័យវិទ្យាសាស្ត្រឡើយ។",
    "rules": [
      {
        "ruleTitle": "Replacing Verb + Noun Constructions with a Single Verb",
        "ruleKhmerTitle": "ការប្តូរកន្សោម \"កិរិយាសព្ទ + នាម\" មកជាកិរិយាសព្ទតែមួយ (De-nominalization)",
        "explanationEn": "Authors frequently write heavy phrases like \"perform an analysis\" or \"achieve an improvement\". Native scientific style strongly prefers direct, energetic verbs.",
        "explanationKh": "អ្នកស្រាវជ្រាវច្រើនសរសេរពាក្យវែងៗដូចជា \"perform an analysis\" ឬ \"achieve an improvement\"។ ភាសាអង់គ្លេសវិទ្យាសាស្ត្រនិយមប្រើកិរិយាសព្ទចំៗតែម្តង។",
        "keyTips": [
          "to achieve an improvement → to improve",
          "to carry out a test / make an investigation → to test / investigate",
          "to make a comparison between X and Y → to compare X and Y",
          "to give an explanation of → to explain",
          "to perform an installation → to install",
          "to effect a reduction in → to reduce"
        ],
        "beforeAfterExamples": [
          {
            "original": "Table 1 shows a comparison between the standard method and our new protocol.",
            "revised": "Table 1 compares the standard method with our new protocol.",
            "explanation": "Changes \"shows a comparison between\" (4 words) to \"compares\" (1 word).",
            "khmerExplanation": "ប្តូរពី \"shows a comparison between\" មកប្រើកិរិយាសព្ទ \"compares\" តែមួយពាក្យ។"
          },
          {
            "original": "An increase in efficiency of 30% was achieved by the catalyst.",
            "revised": "The catalyst increased efficiency by 30%.",
            "explanation": "Converts passive noun construction into an active, direct subject-verb assertion.",
            "khmerExplanation": "បំប្លែងពីទម្រង់ passive វែង មកជា active ច្បាស់ \"The catalyst increased efficiency...\"។"
          }
        ]
      },
      {
        "ruleTitle": "Replacing Multi-Word Phrases with Single Prepositions or Adverbs",
        "ruleKhmerTitle": "ការជំនួសឃ្លាវែងៗដោយធ្នាក់ ឬគុណកិរិយាតែមួយពាក្យ",
        "explanationEn": "Eliminate bureaucratic boilerplate phrases that bloat manuscripts without conveying technical value.",
        "explanationKh": "លុបបំបាត់ឃ្លាស្មុគស្មាញដែលធ្វើឱ្យខាតចំនួនពាក្យក្នុង مقាល របស់អ្នក។",
        "keyTips": [
          "\"with respect to / in connection with\" → \"with / than / to\"",
          "\"for the purpose of estimating\" → \"to estimate\" or \"for estimating\"",
          "\"in the course of\" → \"during\"",
          "\"on account of the fact that / owing to the fact that\" → \"because / since\"",
          "\"in an automatic fashion / in a satisfactory way\" → \"automatically / satisfactorily\"",
          "\"it is interesting to note that\" → \"notably / interestingly\""
        ],
        "beforeAfterExamples": [
          {
            "original": "The experiments were conducted in the course of the period of time between May to July.",
            "revised": "The experiments were conducted from May to July.",
            "explanation": "Cuts 10 words down to 2 words (\"from May to July\").",
            "khmerExplanation": "កាត់បន្ថយពាក្យឥតប្រយោជន៍ពី ១០ ពាក្យ មកសល់ត្រឹម ២ ពាក្យ \"from May to July\"។"
          }
        ]
      }
    ],
    "subsections": [
      {
        "id": "sub-5-8",
        "code": "5.8",
        "title": "Replacing Verb + Noun Constructions with Single Verbs",
        "khmerTitle": "ការប្តូរ Verb + Noun មកជា Single Verb",
        "guide": "Find the one-word direct verb equivalent for the verbose noun construction.",
        "khmerGuide": "ជ្រើសរើសកិរិយាសព្ទតែមួយពាក្យដែលជំនួសកន្សោម Verb + Noun វែងៗ។",
        "exercises": [
          {
            "id": "ex-5-8-1",
            "type": "multiple-choice",
            "promptEn": "What is the concise one-word verb for \"to execute a search\"?",
            "promptKh": "តើកិរិយាសព្ទមួយម៉ាត់ណាដែលជំនួស \"to execute a search\"?",
            "options": [
              {
                "label": "A",
                "text": "searching",
                "isCorrect": false
              },
              {
                "label": "B",
                "text": "make search",
                "isCorrect": false
              },
              {
                "label": "C",
                "text": "search",
                "isCorrect": true
              }
            ],
            "correctAnswer": "C",
            "explanationEn": "\"to execute a search\" is a wordy nominalization for the single verb \"to search\".",
            "explanationKh": "ពាក្យ \"to execute a search\" អាចជំនួសដោយកិរិយាសព្ទខ្លី \"to search\"។"
          },
          {
            "id": "ex-5-8-2",
            "type": "multiple-choice",
            "promptEn": "What is the concise one-word verb for \"to effect a reduction in\"?",
            "promptKh": "តើកិរិយាសព្ទមួយម៉ាត់ណាដែលជំនួស \"to effect a reduction in\"?",
            "options": [
              {
                "label": "A",
                "text": "reduce",
                "isCorrect": true
              },
              {
                "label": "B",
                "text": "reduct",
                "isCorrect": false
              },
              {
                "label": "C",
                "text": "make low",
                "isCorrect": false
              }
            ],
            "correctAnswer": "A",
            "explanationEn": "\"to effect a reduction in costs\" simplifies cleanly to \"to reduce costs\".",
            "explanationKh": "\"to effect a reduction in\" ត្រូវប្តូរមកជា \"to reduce\"។"
          }
        ]
      },
      {
        "id": "sub-5-4",
        "code": "5.4",
        "title": "Reducing Word Count in Research Paper Titles",
        "khmerTitle": "ការកាត់បន្ថយចំនួនពាក្យក្នុងចំណងជើង مقាល (Paper Titles)",
        "guide": "Make scientific titles punchy, specific, and concise by converting nouns into active participles.",
        "khmerGuide": "កែសម្រួលចំណងជើង مقាល ឱ្យខ្លី ទាក់ទាញ និងចំគោលដៅ។",
        "exercises": [
          {
            "id": "ex-5-4-1",
            "type": "multiple-choice",
            "promptEn": "Choose the most concise, high-impact title for: \"Methods for the Comparison of Indian and British Governmental Systems in the 19th century (16 words)\"",
            "promptKh": "តើចំណងជើងណាខ្លី និងមានឥទ្ធិពលជាងគេ?",
            "options": [
              {
                "label": "A",
                "text": "A Study on Methods for Comparing Indian and British Systems in 19th Century",
                "isCorrect": false
              },
              {
                "label": "B",
                "text": "Comparing Indian and British Governance Systems in the 19th Century (10 words)",
                "isCorrect": true
              },
              {
                "label": "C",
                "text": "The Investigation and Comparison of Indian and British Governments",
                "isCorrect": false
              }
            ],
            "correctAnswer": "B",
            "explanationEn": "Starting directly with the participle \"Comparing...\" eliminates \"Methods for the Comparison of\" without any loss of scope.",
            "explanationKh": "ការចាប់ផ្តើមដោយ \"Comparing...\" កាត់បន្ថយពាក្យស្ទួន \"Methods for the Comparison of\" បានយ៉ាងល្អ។"
          }
        ]
      }
    ]
  },
  {
    "id": "sec-6-ambiguity-correctness",
    "sectionNumber": 6,
    "title": "Ambiguity and Political Correctness",
    "khmerTitle": "ការលុបបំបាត់ភាពស្រពិចស្រពិល និងភាសាសមរម្យ (Ambiguity & Neutrality)",
    "badge": "Section 6",
    "category": "Clarity & Inclusivity",
    "overviewEn": "Because English lacks grammatical noun gender and noun case inflections, pronouns like \"it\", \"they\", \"which\", and \"the former / the latter\" frequently confuse readers. Repeating specific nouns ensures unambiguous clarity. Furthermore, modern international academic standards require gender-neutral phrasing (singular \"they/their\").",
    "overviewKh": "ដោយសារភាសាអង់គ្លេសគ្មានភេទលើនាម (Noun Gender) ដូចភាសាផ្សេងៗ ការប្រើប្រាស់សព្វនាមដូចជា \"it\", \"they\", \"which\", \"the former / the latter\" អាចបង្កភាពស្រពិចស្រពិល។ ការប្រើនាមជាក់លាក់ឡើងវិញ (Noun Repetition) ជួយឱ្យអត្ថបទច្បាស់ ១០០%។ លើសពីនេះ ស្តង់ដារស្រាវជ្រាវទាមទារការប្រើពាក្យ Gender-Neutral (ដូចជា singular \"they/their\")។",
    "rules": [
      {
        "ruleTitle": "Noun Repetition vs Confusing Pronouns (\"The Former / The Latter\")",
        "ruleKhmerTitle": "ការប្រើនាមឡើងវិញ ជំនួសសព្វនាមស្រពិចស្រពិល \"The Former / The Latter\"",
        "explanationEn": "Do not hesitate to repeat the key noun. Forcing readers to look back 3 lines to remember what \"the former\" or \"which\" refers to destroys reading momentum.",
        "explanationKh": "កុំបារម្ភរឿងប្រើនាមដដែលៗ។ ការបង្ខំឱ្យអ្នកអានក្រឡេកមើលឡើងលើ ៣ បន្ទាត់ដើម្បីរកមើលថា \"the former\" ឬ \"which\" សំដៅលើអ្វី ធ្វើឱ្យស្ទះការយល់ដឹង។",
        "keyTips": [
          "Replace \"the former / the latter\" with the exact technical term (e.g. \"Gugerevic's findings\", \"the Philippines\").",
          "Replace generic \"this metal / this device\" with the specific name (\"mercury\", \"the spectrometer\").",
          "Ensure the relative pronoun \"which\" sits right next to the noun it modifies, not separated by prepositional phrases."
        ],
        "beforeAfterExamples": [
          {
            "original": "The wives were interviewed separately from the husbands as it was expected that they might feel intimidated.",
            "revised": "The wives were interviewed separately from the husbands as it was expected that the wives might feel intimidated by their partners.",
            "explanation": "\"they\" is ambiguous because it could refer to husbands or wives. Repeating \"the wives\" removes all doubt.",
            "khmerExplanation": "ពាក្យ \"they\" អាចច្រឡំសំដៅលើស្វាមី ឬភរិយា។ ការសរសេរ \"the wives\" ជួយឱ្យប្រាកដ ១០០%។"
          }
        ]
      },
      {
        "ruleTitle": "Gender-Neutral Academic Pronouns",
        "ruleKhmerTitle": "ការប្រើប្រាស់ពាក្យអព្យាក្រឹតយេនឌ័រក្នុងវិស័យអប់រំ និងវិទ្យាសាស្ត្រ",
        "explanationEn": "Never use masculine terms (\"he\", \"his\", \"mankind\", \"manpower\") to refer to generic human populations or professionals (researchers, patients, doctors, students).",
        "explanationKh": "កុំប្រើពាក្យបុរស (\"he\", \"his\", \"mankind\") ពេលនិយាយសំដៅលើមនុស្សទូទៅ ឬអ្នកវិជ្ជាជីវៈ (អ្នកស្រាវជ្រាវ, វេជ្ជបណ្ឌិត, និស្សិត)។",
        "keyTips": [
          "\"The user can drag his files\" → \"Users can drag their files\" or \"The user can drag his/her files\".",
          "\"Man's origins\" → \"Human origins / The origins of humankind\".",
          "\"Each student must bring his laptop\" → \"Each student must bring their laptop\" or \"Students must bring their own laptops\"."
        ],
        "beforeAfterExamples": [
          {
            "original": "Anyone doing a presentation must send his slides in PDF format.",
            "revised": "Anyone doing a presentation must send their slides in PDF format.",
            "explanation": "Singular \"their\" is widely accepted in international academic journals as gender-neutral.",
            "khmerExplanation": "ការប្រើ \"their\" សម្រាប់បុគ្គលទូទៅ គឺជាស្តង់ដារអន្តរជាតិក្នុង academic papers។"
          }
        ]
      }
    ],
    "subsections": [
      {
        "id": "sub-6-1",
        "code": "6.1",
        "title": "Repetition of Words to Aid Reader Understanding",
        "khmerTitle": "ការប្រើពាក្យដដែលឡើងវិញដើម្បីជំនួយការយល់របស់អ្នកអាន",
        "guide": "Choose the sentence that resolves pronoun ambiguity by using clear, concrete nouns.",
        "khmerGuide": "ជ្រើសរើសប្រយោគដែលលុបបំបាត់ភាពស្រពិចស្រពិលនៃសព្វនាម។",
        "exercises": [
          {
            "id": "ex-6-1-1",
            "type": "multiple-choice",
            "promptEn": "Which sentence is clearest and eliminates ambiguity for the reader?",
            "promptKh": "តើប្រយោគណាដែលច្បាស់លាស់ និងគ្មានភាពស្រពិចស្រពិល?",
            "options": [
              {
                "label": "A",
                "text": "Mercury is used for a variety of industrial purposes. In the past, mercury was considered safe.",
                "isCorrect": true
              },
              {
                "label": "B",
                "text": "Mercury is used for a variety of industrial purposes. In the past, this metal was considered safe.",
                "isCorrect": false
              }
            ],
            "correctAnswer": "A",
            "explanationEn": "Repeating \"mercury\" is immediate and requires zero mental processing, whereas generic terms like \"this metal\" or \"it\" force momentary verification.",
            "explanationKh": "ការប្រើពាក្យ \"mercury\" ឡើងវិញ ជួយឱ្យអ្នកអានចាប់ន័យបានភ្លាមៗដោយមិនបាច់គិតពិចារណា។"
          }
        ]
      }
    ]
  },
  {
    "id": "sec-7-paraphrasing-plagiarism",
    "sectionNumber": 7,
    "title": "Paraphrasing and Avoiding Plagiarism",
    "khmerTitle": "ការសរសេរប្តូរឃ្លា (Paraphrasing) និងការជៀសវាងការលួចចម្លង (Plagiarism)",
    "badge": "Section 7",
    "category": "Integrity & Academic Vocabulary",
    "overviewEn": "Plagiarism is a primary reason papers are desk-rejected by journal editors. Paraphrasing requires transforming the grammatical structure, shifting parts of speech (nouns to verbs, active to passive), changing word order, and substituting rich academic synonyms while attributing credit.",
    "overviewKh": "ការលួចចម្លង (Plagiarism) គឺជាមូលហេតុចម្បងដែលនាំឱ្យ Journal Editors បដិសេធ مقាល។ ការចេះកែប្តូរឃ្លា (Paraphrasing) ទាមទារការប្តូរទម្រង់វេយ្យាករណ៍ (ប្តូរនាមទៅកិរិយាសព្ទ, Active ទៅ Passive), ការប្តូរលំដាប់ពាក្យ និងការប្រើពាក្យសទិសន័យ (Academic Synonyms) ព្រមទាំងដាក់ប្រភពឯកសារយោងត្រឹមត្រូវ។",
    "rules": [
      {
        "ruleTitle": "Academic Synonym Substitution for Common Verbs and Nouns",
        "ruleKhmerTitle": "ការប្រើប្រាស់ពាក្យសទិសន័យបែបវិទ្យាសាស្ត្រ (Academic Synonyms)",
        "explanationEn": "Expand your academic repertoire by substituting basic vocabulary with precise research verbs and reporting verbs.",
        "explanationKh": "ពង្រីកវាក្យសព្ទស្រាវជ្រាវរបស់អ្នកដោយជំនួសពាក្យសាមញ្ញៗទៅជាកិរិយាសព្ទរាយការណ៍ស្រាវជ្រាវជាក់លាក់។",
        "keyTips": [
          "proves / shows → demonstrates, highlights, illustrates, reveals, corroborates",
          "carry out / do → conduct, execute, perform, implement",
          "look into / study → investigate, analyze, evaluate, examine",
          "say / claim → state, contend, argue, maintain, point out, assert",
          "find out / check → assess, determine, verify, ascertain"
        ],
        "beforeAfterExamples": [
          {
            "original": "Our experiments proved that the new drug is better than current medicine.",
            "revised": "Our experimental findings demonstrate that the novel compound significantly outperforms current therapeutics.",
            "explanation": "Elevates colloquial language (\"experiments proved\", \"better\") to precise scientific discourse (\"findings demonstrate\", \"significantly outperforms\").",
            "khmerExplanation": "ប្តូរពីភាសាសាមញ្ញ ទៅជាភាសាកម្រិតខ្ពស់បែបវិទ្យាសាស្ត្រ។"
          }
        ]
      },
      {
        "ruleTitle": "Paraphrasing by Changing Parts of Speech and Sentence Voice",
        "ruleKhmerTitle": "ការប្តូរទម្រង់វេយ្យាករណ៍ពី Active ទៅ Passive ឬពី Noun ទៅ Verb",
        "explanationEn": "Do not simply replace words with a thesaurus (patchwriting). Truly paraphrase by restructuring the sentence architecture.",
        "explanationKh": "កុំគ្រាន់តែដូរពាក្យមួយៗដោយប្រើវចនានុក្រម (Patchwriting)។ ចូររៀបចំទម្រង់ប្រយោគឡើងវិញទាំងស្រុង។",
        "keyTips": [
          "Active to Passive / Passive to Active: \"We gave the samples to 10 referees\" → \"A selection of sample articles was provided to 10 independent reviewers.\"",
          "Noun to Verb: \"There is a possibility of error occurrence\" → \"Errors may occur.\"",
          "Changing order of cause and effect."
        ],
        "beforeAfterExamples": [
          {
            "original": "Smith [2014] found that the presence of moisture accelerates the oxidation process.",
            "revised": "The oxidation rate was shown to increase significantly in humid conditions [Smith, 2014].",
            "explanation": "Completely restructures the sentence from active attribution to a focused finding, avoiding plagiarism while properly citing.",
            "khmerExplanation": "រៀបចំប្រយោគឡើងវិញទាំងស្រុងដោយផ្តោតលើលទ្ធផល oxidation ព្រមទាំងដាក់ citation [Smith, 2014] ត្រឹមត្រូវ។"
          }
        ]
      }
    ],
    "subsections": [
      {
        "id": "sub-7-7",
        "code": "7.7",
        "title": "Academic Synonyms: Verbs for Research Papers",
        "khmerTitle": "ពាក្យសទិសន័យ៖ កិរិយាសព្ទស្រាវជ្រាវ (Academic Verbs)",
        "guide": "Find the standard formal academic synonym for the underlined verb.",
        "khmerGuide": "ជ្រើសរើសពាក្យសទិសន័យបែប Academic សម្រាប់កិរិយាសព្ទក្នុងប្រយោគ។",
        "exercises": [
          {
            "id": "ex-7-7-1",
            "type": "multiple-choice",
            "promptEn": "Choose the best academic synonym for \"conducted\" in: \"Experiments with this system were conducted in 2024 by our team.\"",
            "promptKh": "តើពាក្យសទិសន័យបែបវិទ្យាសាស្ត្រណាដែលស្មើនឹង \"conducted\"?",
            "options": [
              {
                "label": "A",
                "text": "carried out / performed",
                "isCorrect": true
              },
              {
                "label": "B",
                "text": "made up",
                "isCorrect": false
              },
              {
                "label": "C",
                "text": "held on",
                "isCorrect": false
              }
            ],
            "correctAnswer": "A",
            "explanationEn": "\"conducted\" is synonymous with \"carried out\" or \"performed\" in experimental methodology.",
            "explanationKh": "\"conducted\" មានន័យស្មើនឹង \"carried out\" ឬ \"performed\" ក្នុងការអនុវត្តការពិសោធន៍។"
          },
          {
            "id": "ex-7-7-2",
            "type": "multiple-choice",
            "promptEn": "Choose the best synonym for \"confirms\" in: \"This confirms previous findings in the literature.\"",
            "promptKh": "តើពាក្យណាដែលជាសទិសន័យនៃ \"confirms\"?",
            "options": [
              {
                "label": "A",
                "text": "questions",
                "isCorrect": false
              },
              {
                "label": "B",
                "text": "corroborates / substantiates",
                "isCorrect": true
              },
              {
                "label": "C",
                "text": "creates",
                "isCorrect": false
              }
            ],
            "correctAnswer": "B",
            "explanationEn": "\"corroborates\" and \"substantiates\" are high-level academic verbs meaning to provide supporting confirmation for a finding.",
            "explanationKh": "\"corroborates\" និង \"substantiates\" មានន័យថាបញ្ជាក់ ឬគាំទ្រភស្តុតាងដែលរកឃើញពីមុន។"
          }
        ]
      }
    ]
  },
  {
    "id": "sec-8-defining-comparing-highlighting",
    "sectionNumber": 8,
    "title": "Defining, Comparing, Evaluating, and Highlighting",
    "khmerTitle": "ការកំណត់និយមន័យ ការប្រៀបធៀប ការវាយតម្លៃ និងការលើកយកចំណុចលេចធ្លោ",
    "badge": "Section 8",
    "category": "Critical Analysis",
    "overviewEn": "Academic impact depends on your ability to define technical concepts clearly (Concept + Class + Defining Clause), critically contrast your findings with existing literature, and highlight unexpected or counterintuitive results without sounding hyperbolic.",
    "overviewKh": "តម្លៃនៃ مقាល ស្រាវជ្រាវ អាស្រ័យលើសមត្ថភាពរបស់អ្នកក្នុងការផ្តល់និយមន័យបច្ចេកទេស (Concept + Class + Defining Clause), ការប្រៀបធៀបលទ្ធផលរបស់អ្នកជាមួយអ្នកនិពន្ធដទៃ និងការបង្ហាញលទ្ធផលដែលផ្ទុយពីការរំពឹងទុក (Counterintuitive findings) ប្រកបដោយភាពជឿជាក់។",
    "rules": [
      {
        "ruleTitle": "The Formula for Formal Academic Definitions",
        "ruleKhmerTitle": "រូបមន្តក្នុងការសរសេរនិយមន័យបែបវិទ្យាសាស្ត្រ (Definition Formula)",
        "explanationEn": "A formal definition follows a precise structural triad: [Term / Concept] + is a [General Category / Class] + [Relative Pronoun: which / that / where / who] + [Distinguishing Characteristic].",
        "explanationKh": "និយមន័យផ្លូវការមាន ៣ ផ្នែក៖ [ពាក្យ/គំនិត] + is a [ប្រភេទក្រុមទូទៅ] + [which / that / where / who] + [លក្ខណៈពិសេសខុសពីគេ]។",
        "keyTips": [
          "Oxygen is a gas (Class) which is essential for human respiration (Distinction).",
          "A spectrometer is an analytical instrument (Class) that measures the wavelengths of light (Distinction).",
          "Include appropriate articles (a/an/the) and avoid circular definitions (\"A teacher is someone who teaches\")."
        ],
        "beforeAfterExamples": [
          {
            "original": "Anatomy: how body is structured and components fit.",
            "revised": "Anatomy is the branch of biological science that studies the physical structure of organisms and the spatial relationships of their internal components.",
            "explanation": "Transforms note form into a rigorous academic definition following the Term + Class + Defining Clause pattern.",
            "khmerExplanation": "រៀបចំនិយមន័យពេញលេញតាមរូបមន្ត Term + Class + Defining Clause។"
          }
        ]
      },
      {
        "ruleTitle": "Highlighting Controversial or Groundbreaking Findings",
        "ruleKhmerTitle": "ការលើកឡើងពីលទ្ធផលថ្មីដែលផ្ទុយពីទ្រឹស្តីចាស់ (Highlighting Breakthroughs)",
        "explanationEn": "When your findings contradict established dogma in the literature, state the conventional belief first, present your empirical evidence, and explain the mechanistic reason for the discrepancy.",
        "explanationKh": "នៅពេលការរកឃើញរបស់អ្នកផ្ទុយពីទ្រឹស្តីចាស់ក្នុងអក្សរសិល្ប៍ស្រាវជ្រាវ ចូរលើកឡើងពីទ្រឹស្តីចាស់ជាមុន បង្ហាញទិន្នន័យជាក់ស្តែងរបស់អ្នក និងពន្យល់ពីមូលហេតុនៃភាពខុសគ្នានោះ។",
        "keyTips": [
          "State consensus: \"For decades it has been widely accepted that X equals Y [Author, Year].\"",
          "Introduce your discovery: \"However, our empirical data indicate that in fact X produces Z.\"",
          "Provide justification: \"This discrepancy can be attributed to higher resolution sampling in our protocol.\""
        ],
        "beforeAfterExamples": [
          {
            "original": "Our finding that 1+1=3 is surprising because people said 1+1=2.",
            "revised": "Although prevailing literature asserts that X remains constant [Smith, 2012], our real-time sensor data reveal a 35% fluctuation under high temperature. This variance is likely due to previous studies testing exclusively at room temperature.",
            "explanation": "Substantiates a controversial claim with empirical proof and an explanation of past limitations.",
            "khmerExplanation": "បង្ហាញពីចំណុចខ្វះខាតនៃការស្រាវជ្រាវពីមុន និងបញ្ជាក់ពីមូលហេតុដែលទិន្នន័យថ្មីរបស់យើងត្រឹមត្រូវជាង។"
          }
        ]
      }
    ],
    "subsections": [
      {
        "id": "sub-8-1",
        "code": "8.1",
        "title": "Writing Formal Definitions",
        "khmerTitle": "ការសរសេរនិយមន័យបែបវិទ្យាសាស្ត្រ (Writing Definitions)",
        "guide": "Assemble the concept, class, and relative clause into a grammatically flawless definition.",
        "khmerGuide": "ផ្គូផ្គង និងរៀបចំនិយមន័យឱ្យត្រូវតាមលំដាប់លំដោយវេយ្យាករណ៍។",
        "exercises": [
          {
            "id": "ex-8-1-1",
            "type": "multiple-choice",
            "promptEn": "Which is the correctly formulated academic definition?",
            "promptKh": "តើប្រយោគណាជានិយមន័យបែប Academic ត្រឹមត្រូវតាមក្បួន?",
            "options": [
              {
                "label": "A",
                "text": "Spectrometer is when you measure intensity of light as a function of wavelength.",
                "isCorrect": false
              },
              {
                "label": "B",
                "text": "A spectrometer is a tool where in reality measures light.",
                "isCorrect": false
              },
              {
                "label": "C",
                "text": "A spectrometer is an analytical instrument that measures the intensity of light as a function of wavelength.",
                "isCorrect": true
              }
            ],
            "correctAnswer": "C",
            "explanationEn": "Option A strictly adheres to the rule: [Concept] + [is an + Class] + [that + Distinguishing Feature]. Never define an entity using \"is when...\".",
            "explanationKh": "ជម្រើស A គោរពតាមក្បួន [Concept] + [is an + Class] + [that + Characteristic] យ៉ាងត្រឹមត្រូវ។ ហាមប្រើ \"is when...\" ក្នុងនិយមន័យ។"
          }
        ]
      }
    ]
  },
  {
    "id": "sec-9-hedging-certainty-limitations",
    "sectionNumber": 9,
    "title": "Hedging, Certainty, and Discussing Limitations",
    "khmerTitle": "ការបន្ទន់សំដី (Hedging) កម្រិតនៃភាពប្រាកដប្រជា និងការបង្ហាញពីដែនកំណត់",
    "badge": "Section 9",
    "category": "Scientific Tone & Ethics",
    "overviewEn": "International reviewers dislike arrogant or over-confident assertions. \"Hedging\" (toning down claims) protects you from criticism by accurately expressing the probability of your findings (using modals like \"may\", \"could\", \"would seem to indicate\", \"to the best of our knowledge\") and transparently acknowledging study limitations.",
    "overviewKh": "អ្នកវាយតម្លៃ مقាល (Referees/Reviewers) មិនចូលចិត្តការអួតអាង ឬការអះអាងហួសហេតុពេកទេ។ \"Hedging\" (ការបន្ទន់សំដី) ជួយការពារអ្នកពីការរិះគន់ ដោយបញ្ជាក់ពីកម្រិតនៃភាពប្រាកដប្រជា (Probability) ដូចជា \"suggests\", \"would seem to indicate\", \"to our knowledge\" និងការហ៊ានបង្ហាញពីដែនកំណត់ (Limitations) នៃការពិសោធន៍ដោយស្មោះត្រង់។",
    "rules": [
      {
        "ruleTitle": "Toning Down Overly Confident Claims (Avoiding Arrogance)",
        "ruleKhmerTitle": "ការកែសម្រួលពាក្យអះអាងកុំឱ្យស្តាប់ទៅរឹងត្អឹង ឬអួតអាង (Toning Down)",
        "explanationEn": "Absolute words like \"proves conclusively\", \"groundbreaking\", \"unforgivable mistake\", or \"100% certainty\" invite severe reviewer skepticism. Replace them with cautious, scholarly affirmations.",
        "explanationKh": "ពាក្យដាច់ខាតដូចជា \"proves conclusively\", \"groundbreaking\", \"100% certainty\" ធ្វើឱ្យ Reviewers សង្ស័យ។ ត្រូវប្តូរមកប្រើពាក្យប្រយ័ត្នប្រយែងបែបអ្នកប្រាជ្ញវិញ។",
        "keyTips": [
          "\"Our findings prove that...\" → \"Our findings suggest / indicate / would appear to demonstrate that...\"",
          "\"This is the first time...\" → \"To the best of our knowledge, this is the first time...\"",
          "\"This factor is responsible for...\" → \"This factor is likely responsible for...\""
        ],
        "beforeAfterExamples": [
          {
            "original": "Our analysis of English papers proves conclusively that previous authors made an unforgivable mistake.",
            "revised": "Our analysis of English papers suggests that previous studies may have relied on a limited dataset.",
            "explanation": "Replaces aggressive and unacademic criticism with polite, objective academic critique.",
            "khmerExplanation": "ប្តូរពីការរិះគន់បែបវាយប្រហារ មកជាការវាយតម្លៃបែបវិទ្យាសាស្ត្រប្រកបដោយសុជីវធម៌។"
          },
          {
            "original": "Our finding represents a groundbreaking discovery.",
            "revised": "We believe that our findings offer valuable insights into this mechanism.",
            "explanation": "Let the reader and peer community judge if it is groundbreaking; do not declare it yourself.",
            "khmerExplanation": "ទុកឱ្យអ្នកអាន និងសហគមន៍វិទ្យាសាស្ត្រជាអ្នកវិនិច្ឆ័យ មិនត្រូវសរសើរខ្លួនឯងថា \"groundbreaking\" ឡើយ។"
          }
        ]
      },
      {
        "ruleTitle": "Discussing Study Limitations Constructively",
        "ruleKhmerTitle": "ការសរសេរអំពីដែនកំណត់នៃការស្រាវជ្រាវ (Study Limitations)",
        "explanationEn": "Acknowledging limitations (small sample size, regional scope, specific equipment) actually strengthens your paper's credibility when paired with a constructive path for future research.",
        "explanationKh": "ការទទួលស្គាល់ដែនកំណត់ (ចំនួនសំណាកតិច, ទីតាំងជាក់លាក់) ជួយបង្កើនទំនុកចិត្តលើ مقាល នៅពេលដែលអ្នកបានភ្ជាប់វាជាមួយដំណោះស្រាយសម្រាប់ការស្រាវជ្រាវពេលអនាគត។",
        "keyTips": [
          "Formula: [Acknowledge Limitation] + [Justify why findings remain valid] + [Propose Future Work].",
          "Example: \"Although limited to a sample of 50 patients, the observed response was consistent across all demographics. Future studies with larger multi-center cohorts will further validate these findings.\""
        ],
        "beforeAfterExamples": [
          {
            "original": "The survey only had 14 women so the results might be wrong.",
            "revised": "Although the number of female participants was relatively small (n=14, 14%), the initial trends are encouraging and highlight the need for targeted future trials with balanced cohorts.",
            "explanation": "Frames a limitation professionally without undermining the value of the completed work.",
            "khmerExplanation": "សរសេរបង្ហាញពីចំនួនអ្នកចូលរួមតិចជាលក្ខណៈវិជ្ជាជីវៈ និងលើកទឹកចិត្តឱ្យមានការស្រាវជ្រាវបន្ត។"
          }
        ]
      }
    ],
    "subsections": [
      {
        "id": "sub-9-10",
        "code": "9.10",
        "title": "Toning Down the Strength of an Affirmation",
        "khmerTitle": "ការវាយតម្លៃកម្រិតសំឡេងនៃប្រយោគ (Too Strong vs OK vs Too Weak)",
        "guide": "Judge whether an academic statement sounds too arrogant, appropriate (OK), or excessively weak.",
        "khmerGuide": "វិនិច្ឆ័យថាតើប្រយោគខាងក្រោមស្តាប់ទៅអួតអាងពេក (Too Strong), សមរម្យ (OK) ឬទន់ខ្សោយពេក (Too Weak)។",
        "exercises": [
          {
            "id": "ex-9-10-1",
            "type": "multiple-choice",
            "promptEn": "How does this statement sound in an academic discussion: \"Our findings prove conclusively that all other models are completely invalid.\"",
            "promptKh": "តើប្រយោគខាងលើមានកម្រិតសម្លេងយ៉ាងដូចម្តេចក្នុង مقាល ស្រាវជ្រាវ?",
            "options": [
              {
                "label": "A",
                "text": "Too strong / arrogant (Needs hedging)",
                "isCorrect": true
              },
              {
                "label": "B",
                "text": "OK (Standard scientific tone)",
                "isCorrect": false
              },
              {
                "label": "C",
                "text": "Too weak",
                "isCorrect": false
              }
            ],
            "correctAnswer": "A",
            "explanationEn": "Words like \"prove conclusively\" and \"completely invalid\" are overly dogmatic and arrogant for peer-reviewed science.",
            "explanationKh": "ពាក្យ \"prove conclusively\" និង \"completely invalid\" ស្តាប់ទៅអួតអាងពេក មិនស័ក្តិសមសម្រាប់អត្ថបទស្រាវជ្រាវទេ។"
          },
          {
            "id": "ex-9-10-2",
            "type": "multiple-choice",
            "promptEn": "Evaluate: \"These findings would appear to suggest that under certain conditions, temperature may influence reaction rates.\"",
            "promptKh": "វាយតម្លៃប្រយោគខាងលើ៖",
            "options": [
              {
                "label": "A",
                "text": "Too strong",
                "isCorrect": false
              },
              {
                "label": "B",
                "text": "OK (Polite, well-hedged scholarly tone)",
                "isCorrect": true
              },
              {
                "label": "C",
                "text": "Too unscientific",
                "isCorrect": false
              }
            ],
            "correctAnswer": "B",
            "explanationEn": "Using \"would appear to suggest\" and \"may influence\" represents ideal academic caution.",
            "explanationKh": "ការប្រើ \"would appear to suggest\" និង \"may influence\" បង្ហាញពីការប្រុងប្រយ័ត្នបែបអ្នកប្រាជ្ញ។"
          }
        ]
      }
    ]
  },
  {
    "id": "sec-10-writing-sections-paper",
    "sectionNumber": 10,
    "title": "Writing Each Section of a Research Paper",
    "khmerTitle": "ការតែងនិពន្ធផ្នែកនីមួយៗនៃ مقាល ស្រាវជ្រាវ (IMRaD Structure)",
    "badge": "Section 10",
    "category": "Manuscript Architecture",
    "overviewEn": "A masterclass in structuring the full scientific manuscript following the international IMRaD standard (Introduction, Methods, Results, and Discussion) plus Title, Abstract, Conclusions, and Acknowledgements. Follow Adrian Wallwork's proven step-by-step checklists to write each section flawlessly.",
    "overviewKh": "មេរៀនមេក្នុងការរៀបចំរចនាសម្ព័ន្ធ مقាល ស្រាវជ្រាវទាំងមូលតាមស្តង់ដារអន្តរជាតិ IMRaD (Introduction, Methods, Results, Discussion) រួមទាំងចំណងជើង (Title), Abstract, Conclusions និង Acknowledgements ដោយផ្អែកលើរូបមន្ត និងបញ្ជីផ្ទៀងផ្ទាត់របស់លោក Adrian Wallwork។",
    "rules": [
      {
        "ruleTitle": "The 5-Step Abstract Blueprint",
        "ruleKhmerTitle": "រូបមន្ត ៥ ជំហានក្នុងការសរសេរសេចក្តីសង្ខេប (5-Step Abstract Structure)",
        "explanationEn": "An abstract must be a self-contained miniature version of your paper (150–250 words) that immediately hooks editors and indexing databases.",
        "explanationKh": "សេចក្តីសង្ខេប (Abstract) ត្រូវមានប្រវែងពី ១៥០-២៥០ ពាក្យ ដែលឆ្លុះបញ្ចាំងពី مقាល ទាំងមូល និងទាក់ទាញចិត្តអ្នកអានភ្លាមៗ។",
        "keyTips": [
          "Step 1 (1–2 sentences): Broad context & background understandable to any researcher in the field.",
          "Step 2 (1–2 sentences): Problem statement / Identified research gap.",
          "Step 3 (1 sentence): Main objective & proposed methodology.",
          "Step 4 (2–3 sentences): Key empirical findings & quantitative results.",
          "Step 5 (1–2 sentences): Significance, broad implications, and practical impact."
        ],
        "beforeAfterExamples": [
          {
            "original": "An abstract that rambles about historical background for 150 words and never gives exact numerical results.",
            "revised": "Structured 5-step Abstract: (1) Background on energy consumption, (2) Problem in server cooling, (3) Proposed algorithm, (4) Measured 28.4% energy reduction, (5) Global application for cloud datacenters.",
            "explanation": "Gives the reviewer all key data points within 45 seconds of reading.",
            "khmerExplanation": "ផ្តល់ទិន្នន័យជាក់លាក់ និងលទ្ធផលជាលេខភ្លាមៗដល់ Reviewer ក្នុងរយៈពេល ៤៥ វិនាទីដំបូង។"
          }
        ]
      },
      {
        "ruleTitle": "Abstract vs Conclusions: Knowing the Difference",
        "ruleKhmerTitle": "ភាពខុសគ្នារវាង Abstract និង Conclusions",
        "explanationEn": "Never copy and paste sentences from your Abstract into your Conclusions! While the Abstract introduces what was done to entice the reader, the Conclusions reflect on what the findings mean for the wider scientific community and outline future research directions.",
        "explanationKh": "កុំចម្លង (Copy-Paste) ឃ្លាពី Abstract ទៅដាក់ក្នុង Conclusions ឱ្យសោះ! Abstract គឺជាសេចក្តីសង្ខេបនៃអ្វីដែលបានធ្វើ រីឯ Conclusions គឺជាការបកស្រាយអត្ថន័យនៃលទ្ធផលចំពោះពិភពលោក និងការចង្អុលបង្ហាញផ្លូវស្រាវជ្រាវបន្ត។",
        "keyTips": [
          "Abstract: Emphasizes the methods and specific results (What happened).",
          "Conclusions: Emphasizes the impact, limitations, unanswered questions, and future work (What it means & What next)."
        ],
        "beforeAfterExamples": [
          {
            "original": "Conclusions section repeating the Abstract verbatim.",
            "revised": "Conclusions section outlining: (1) Summary of principal takeaway, (2) Study limitations, (3) Policy / industrial implications, (4) Proposed 5-year future roadmap.",
            "explanation": "Adds genuine reflective value to the end of the manuscript.",
            "khmerExplanation": "បង្កើតតម្លៃបន្ថែមនៅចុងបញ្ចប់នៃ مقាល ដោយផ្តោតលើផលជះ និងទស្សនវិស័យអនាគត។"
          }
        ]
      }
    ],
    "subsections": [
      {
        "id": "sub-10-1",
        "code": "10.1",
        "title": "Abstract Writing Checklist and Verification",
        "khmerTitle": "បញ្ជីផ្ទៀងផ្ទាត់ការសរសេរ Abstract ឱ្យត្រូវស្តង់ដារ",
        "guide": "Verify that an abstract contains all essential components without unnecessary filler.",
        "khmerGuide": "ពិនិត្យមើលធាតុផ្សំចាំបាច់ទាំង ៥ នៅក្នុង Abstract។",
        "exercises": [
          {
            "id": "ex-10-1-1",
            "type": "multiple-choice",
            "promptEn": "Which is the correct primary function of the final sentence in a scientific Abstract?",
            "promptKh": "តើប្រយោគចុងក្រោយនៃ Abstract មានមុខងារចម្បងអ្វី?",
            "options": [
              {
                "label": "A",
                "text": "To give citations to previous papers",
                "isCorrect": false
              },
              {
                "label": "B",
                "text": "To thank the funding agencies and lab assistants",
                "isCorrect": false
              },
              {
                "label": "C",
                "text": "To outline the broad implications, significance, or applications of the findings",
                "isCorrect": true
              }
            ],
            "correctAnswer": "C",
            "explanationEn": "The final sentence of an abstract must state the wider significance, practical application, or impact of the research findings.",
            "explanationKh": "ប្រយោគចុងក្រោយនៃ Abstract ត្រូវតែបង្ហាញពីផលប៉ះពាល់ និងសារៈសំខាន់នៃការស្រាវជ្រាវចំពោះសង្គម ឬវិទ្យាសាស្ត្រ។"
          }
        ]
      }
    ],
    "paperTemplates": [
      {
        "sectionName": "Abstract (សេចក្តីសង្ខេប)",
        "khmerSectionName": "គំរូរចនាសម្ព័ន្ធ Abstract ៥ ជំហាន",
        "structureSteps": [
          {
            "stepNumber": 1,
            "title": "Basic Background",
            "sentencesCount": "1–2 sentences",
            "descriptionEn": "Introduce the general topic in accessible terms for all scientists.",
            "descriptionKh": "ណែនាំបរិបទស្រាវជ្រាវទូទៅដែលអ្នកវិទ្យាសាស្ត្រគ្រប់ជំនាញអាចយល់បាន។",
            "exampleSnippet": "Efficient energy storage remains one of the most critical challenges in renewable power integration."
          },
          {
            "stepNumber": 2,
            "title": "Problem & Gap",
            "sentencesCount": "1–2 sentences",
            "descriptionEn": "Explain what specific limitation or unsolved problem exists in current literature.",
            "descriptionKh": "បញ្ជាក់ពីបញ្ហា ឬចន្លោះខ្វះខាតជាក់លាក់ដែលមិនទាន់មានអ្នកដោះស្រាយ។",
            "exampleSnippet": "However, conventional lithium-ion batteries degrade rapidly under extreme thermal fluctuations."
          },
          {
            "stepNumber": 3,
            "title": "Objective & Methodology",
            "sentencesCount": "1 sentence",
            "descriptionEn": "State your novel solution, experimental design, or simulation model.",
            "descriptionKh": "ប្រកាសពីដំណោះស្រាយ គំរូពិសោធន៍ ឬបច្ចេកទេសថ្មីរបស់អ្នក។",
            "exampleSnippet": "Here we develop a novel graphene-polymer composite electrolyte and evaluate its performance across 500 thermal cycles."
          },
          {
            "stepNumber": 4,
            "title": "Key Results",
            "sentencesCount": "2–3 sentences",
            "descriptionEn": "Provide concrete quantitative data, percentage improvements, and benchmark comparisons.",
            "descriptionKh": "បង្ហាញទិន្នន័យជាលេខជាក់លាក់ និងភាគរយនៃការកើនឡើងនៃប្រសិទ្ធភាព។",
            "exampleSnippet": "Our results demonstrate a 42% increase in charge retention and zero structural degradation at temperatures up to 80 °C."
          },
          {
            "stepNumber": 5,
            "title": "Broader Implications",
            "sentencesCount": "1–2 sentences",
            "descriptionEn": "Conclude with the real-world impact or future scientific value.",
            "descriptionKh": "សន្និដ្ឋានពីសារៈប្រយោជន៍ជាក់ស្តែងក្នុងឧស្សាហកម្ម ឬសង្គម។",
            "exampleSnippet": "These findings pave the way for safer, long-lasting energy storage in aerospace and electric vehicle applications."
          }
        ]
      },
      {
        "sectionName": "Introduction (សេចក្តីផ្តើម)",
        "khmerSectionName": "គំរូរចនាសម្ព័ន្ធ Introduction តាមក្បួន CARS Model",
        "structureSteps": [
          {
            "stepNumber": 1,
            "title": "Establish Research Territory",
            "sentencesCount": "2–3 sentences",
            "descriptionEn": "Define importance of the research topic and cite foundational literature.",
            "descriptionKh": "បញ្ជាក់ពីសារៈសំខាន់នៃប្រធានបទ និងលើកឡើងពីទ្រឹស្តីគ្រឹះ។",
            "exampleSnippet": "In recent years, artificial intelligence has fundamentally transformed automated medical diagnostics..."
          },
          {
            "stepNumber": 2,
            "title": "Establish the Niche (The Gap)",
            "sentencesCount": "2–4 sentences",
            "descriptionEn": "Highlight existing limitations, conflicting findings, or unanswered questions.",
            "descriptionKh": "បង្ហាញពីចំណុចខ្វះខាត ឬភាពមិនទាន់ច្បាស់លាស់នៃការស្រាវជ្រាវពីមុន។",
            "exampleSnippet": "Despite significant progress, current convolutional neural networks struggle with rare pathology detection..."
          },
          {
            "stepNumber": 3,
            "title": "Occupy the Niche (Your Contribution)",
            "sentencesCount": "2–3 sentences",
            "descriptionEn": "State your research aims, preview key findings, and outline paper structure.",
            "descriptionKh": "ប្រកាសពីគោលបំណងស្រាវជ្រាវ និងរចនាសម្ព័ន្ធនៃ مقាល របស់អ្នក។",
            "exampleSnippet": "To address this issue, we propose an attention-guided hybrid model. The remainder of this paper is structured as follows..."
          }
        ]
      }
    ]
  }
];
