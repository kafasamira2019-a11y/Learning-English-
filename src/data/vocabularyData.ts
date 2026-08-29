export interface VocabItem {
  id: string;
  word: string;
  phonetic?: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'phrasal verb' | 'idiom';
  definitionEn: string;
  meaningKh: string;
  exampleEn: string;
  exampleKh: string;
  category: 'daily-essential' | 'regular-verbs' | 'academic' | 'phrasal-verbs' | 'business' | 'idioms' | 'education' | 'travel-food';
  level: 'A1-A2' | 'B1-B2' | 'C1-C2';
}

export interface RegularVerbItem {
  id: string;
  infinitive: string;
  pastSimple: string; // e.g. "played"
  pastParticiple: string; // e.g. "played"
  edPronunciation: '/t/' | '/d/' | '/ɪd/';
  pronunciationRule: string;
  meaningKh: string;
  exampleEn: string;
  exampleKh: string;
}

// 100+ Common Regular Verbs with -ed pronunciation rules
export const regularVerbsList: RegularVerbItem[] = [
  // --- Group 1: /ɪd/ pronunciation (after /t/ or /d/ sounds) ---
  {
    id: 'rv-1',
    infinitive: 'accept',
    pastSimple: 'accepted',
    pastParticiple: 'accepted',
    edPronunciation: '/ɪd/',
    pronunciationRule: 'Ends with /t/ sound -> pronounced /ɪd/ (ak-SEP-tid)',
    meaningKh: 'យល់ព្រម, ទទួលយក',
    exampleEn: 'She accepted the job offer with great enthusiasm.',
    exampleKh: 'នាងបានទទួលយកការផ្តល់ជូនការងារដោយក្តីរីករាយ។'
  },
  {
    id: 'rv-2',
    infinitive: 'add',
    pastSimple: 'added',
    pastParticiple: 'added',
    edPronunciation: '/ɪd/',
    pronunciationRule: 'Ends with /d/ sound -> pronounced /ɪd/ (AD-id)',
    meaningKh: 'បន្ថែម, បូក',
    exampleEn: 'He added some sugar to his coffee.',
    exampleKh: 'គាត់បានបន្ថែមស្ករខ្លះទៅក្នុងកាហ្វេរបស់គាត់។'
  },
  {
    id: 'rv-3',
    infinitive: 'admit',
    pastSimple: 'admitted',
    pastParticiple: 'admitted',
    edPronunciation: '/ɪd/',
    pronunciationRule: 'Double t + ed -> pronounced /ɪd/ (əd-MIT-id)',
    meaningKh: 'សារភាព, ទទួលស្គាល់',
    exampleEn: 'He admitted making a mistake in the calculation.',
    exampleKh: 'គាត់បានសារភាពថាមិនបានប្រុងប្រយ័ត្នក្នុងការគណនា។'
  },
  {
    id: 'rv-4',
    infinitive: 'afford',
    pastSimple: 'afforded',
    pastParticiple: 'afforded',
    edPronunciation: '/ɪd/',
    pronunciationRule: 'Ends with /d/ sound -> pronounced /ɪd/',
    meaningKh: 'មានលទ្ធភាពទិញ/ចំណាយ',
    exampleEn: 'They afforded to buy a new house after saving for years.',
    exampleKh: 'ពួកគេមានលទ្ធភាពទិញផ្ទះថ្មីបន្ទាប់ពីសន្សំអស់ជាច្រើនឆ្នាំ។'
  },
  {
    id: 'rv-5',
    infinitive: 'attract',
    pastSimple: 'attracted',
    pastParticiple: 'attracted',
    edPronunciation: '/ɪd/',
    pronunciationRule: 'Ends with /t/ sound -> pronounced /ɪd/',
    meaningKh: 'ទាក់ទាញ',
    exampleEn: 'The festival attracted thousands of international tourists.',
    exampleKh: 'ពិធីបុណ្យនេះបានទាក់ទាញភ្ញៀវទេសចរអន្តរជាតិរាប់ពាន់នាក់។'
  },
  {
    id: 'rv-6',
    infinitive: 'celebrate',
    pastSimple: 'celebrated',
    pastParticiple: 'celebrated',
    edPronunciation: '/ɪd/',
    pronunciationRule: 'Ends with /t/ sound -> pronounced /ɪd/',
    meaningKh: 'ប្រារព្ធពិធី, អបអរសាទរ',
    exampleEn: 'We celebrated my brother’s graduation yesterday.',
    exampleKh: 'យើងបានប្រារព្ធពិធីបញ្ចប់ការសិក្សារបស់ប្អូនប្រុសខ្ញុំកាលពីម្សិលមិញ។'
  },
  {
    id: 'rv-7',
    infinitive: 'collect',
    pastSimple: 'collected',
    pastParticiple: 'collected',
    edPronunciation: '/ɪd/',
    pronunciationRule: 'Ends with /t/ sound -> pronounced /ɪd/',
    meaningKh: 'ប្រមូល, សន្សំ',
    exampleEn: 'She collected stamps from all over the world.',
    exampleKh: 'នាងបានប្រមូលតែមមកពីជុំវិញពិភពលោក។'
  },
  {
    id: 'rv-8',
    infinitive: 'complete',
    pastSimple: 'completed',
    pastParticiple: 'completed',
    edPronunciation: '/ɪd/',
    pronunciationRule: 'Ends with /t/ sound -> pronounced /ɪd/',
    meaningKh: 'បំពេញឱ្យចប់សព្វគ្រប់',
    exampleEn: 'The students completed the exam on time.',
    exampleKh: 'សិស្សានុសិស្សបានបញ្ចប់ការប្រឡងទាន់ពេលវេលា។'
  },
  {
    id: 'rv-9',
    infinitive: 'connect',
    pastSimple: 'connected',
    pastParticiple: 'connected',
    edPronunciation: '/ɪd/',
    pronunciationRule: 'Ends with /t/ sound -> pronounced /ɪd/',
    meaningKh: 'ភ្ជាប់, ទំនាក់ទំនង',
    exampleEn: 'The computer connected to the wireless network immediately.',
    exampleKh: 'កុំព្យូទ័របានភ្ជាប់ទៅបណ្តាញឥតខ្សែភ្លាមៗ។'
  },
  {
    id: 'rv-10',
    infinitive: 'contact',
    pastSimple: 'contacted',
    pastParticiple: 'contacted',
    edPronunciation: '/ɪd/',
    pronunciationRule: 'Ends with /t/ sound -> pronounced /ɪd/',
    meaningKh: 'ទាក់ទង',
    exampleEn: 'I contacted customer support about my delivery.',
    exampleKh: 'ខ្ញុំបានទាក់ទងផ្នែកបម្រើអតិថិជនអំពីការដឹកជញ្ជូនរបស់ខ្ញុំ។'
  },
  {
    id: 'rv-11',
    infinitive: 'count',
    pastSimple: 'counted',
    pastParticiple: 'counted',
    edPronunciation: '/ɪd/',
    pronunciationRule: 'Ends with /t/ sound -> pronounced /ɪd/',
    meaningKh: 'រាប់',
    exampleEn: 'The cashier counted the money carefully.',
    exampleKh: 'បេឡាធិការបានរាប់លុយយ៉ាងយកចិត្តទុកដាក់។'
  },
  {
    id: 'rv-12',
    infinitive: 'decide',
    pastSimple: 'decided',
    pastParticiple: 'decided',
    edPronunciation: '/ɪd/',
    pronunciationRule: 'Ends with /d/ sound -> pronounced /ɪd/ (di-SY-did)',
    meaningKh: 'សម្រេចចិត្ត',
    exampleEn: 'They decided to travel to Siem Reap for the holidays.',
    exampleKh: 'ពួកគេបានសម្រេចចិត្តធ្វើដំណើរទៅសៀមរាបសម្រាប់ថ្ងៃឈប់សម្រាក។'
  },
  {
    id: 'rv-13',
    infinitive: 'demand',
    pastSimple: 'demanded',
    pastParticiple: 'demanded',
    edPronunciation: '/ɪd/',
    pronunciationRule: 'Ends with /d/ sound -> pronounced /ɪd/',
    meaningKh: 'ទាមទារ',
    exampleEn: 'The workers demanded fair working hours.',
    exampleKh: 'កម្មករបានទាមទារម៉ោងធ្វើការដោយសមរម្យ។'
  },
  {
    id: 'rv-14',
    infinitive: 'expect',
    pastSimple: 'expected',
    pastParticiple: 'expected',
    edPronunciation: '/ɪd/',
    pronunciationRule: 'Ends with /t/ sound -> pronounced /ɪd/',
    meaningKh: 'រំពឹងទុក',
    exampleEn: 'We expected him to arrive before noon.',
    exampleKh: 'យើងរំពឹងថាគាត់នឹងមកដល់មុនថ្ងៃត្រង់។'
  },
  {
    id: 'rv-15',
    infinitive: 'graduate',
    pastSimple: 'graduated',
    pastParticiple: 'graduated',
    edPronunciation: '/ɪd/',
    pronunciationRule: 'Ends with /t/ sound -> pronounced /ɪd/',
    meaningKh: 'បញ្ចប់ការសិក្សា',
    exampleEn: 'She graduated from the university with honors.',
    exampleKh: 'នាងបានបញ្ចប់ការសិក្សាពីសាកលវិទ្យាល័យដោយកិត្តិយស។'
  },
  {
    id: 'rv-16',
    infinitive: 'intend',
    pastSimple: 'intended',
    pastParticiple: 'intended',
    edPronunciation: '/ɪd/',
    pronunciationRule: 'Ends with /d/ sound -> pronounced /ɪd/',
    meaningKh: 'មានបំណង',
    exampleEn: 'I intended to call you, but I got busy.',
    exampleKh: 'ខ្ញុំមានបំណងចង់ទូរស័ព្ទទៅអ្នក ប៉ុន្តែខ្ញុំជាប់រវល់។'
  },
  {
    id: 'rv-17',
    infinitive: 'invite',
    pastSimple: 'invited',
    pastParticiple: 'invited',
    edPronunciation: '/ɪd/',
    pronunciationRule: 'Ends with /t/ sound -> pronounced /ɪd/',
    meaningKh: 'អញ្ជើញ',
    exampleEn: 'They invited all their close friends to the wedding.',
    exampleKh: 'ពួកគេបានអញ្ជើញមិត្តភក្តិជិតស្និទ្ធទាំងអស់មកចូលរួមពិធីមង្គលការ។'
  },
  {
    id: 'rv-18',
    infinitive: 'need',
    pastSimple: 'needed',
    pastParticiple: 'needed',
    edPronunciation: '/ɪd/',
    pronunciationRule: 'Ends with /d/ sound -> pronounced /ɪd/ (NEE-did)',
    meaningKh: 'ត្រូវការ',
    exampleEn: 'I needed some help with my homework yesterday.',
    exampleKh: 'ខ្ញុំត្រូវការជំនួយខ្លះជាមួយកិច្ចការផ្ទះរបស់ខ្ញុំកាលពីម្សិលមិញ។'
  },
  {
    id: 'rv-19',
    infinitive: 'protect',
    pastSimple: 'protected',
    pastParticiple: 'protected',
    edPronunciation: '/ɪd/',
    pronunciationRule: 'Ends with /t/ sound -> pronounced /ɪd/',
    meaningKh: 'ការពារ',
    exampleEn: 'The helmet protected his head during the accident.',
    exampleKh: 'មួកសុវត្ថិភាពបានការពារក្បាលរបស់គាត់ក្នុងអំឡុងពេលគ្រោះថ្នាក់។'
  },
  {
    id: 'rv-20',
    infinitive: 'remind',
    pastSimple: 'reminded',
    pastParticiple: 'reminded',
    edPronunciation: '/ɪd/',
    pronunciationRule: 'Ends with /d/ sound -> pronounced /ɪd/',
    meaningKh: 'រំលឹក',
    exampleEn: 'She reminded me to turn off the lights.',
    exampleKh: 'នាងបានរំលឹកខ្ញុំឱ្យបិទភ្លើង។'
  },
  {
    id: 'rv-21',
    infinitive: 'start',
    pastSimple: 'started',
    pastParticiple: 'started',
    edPronunciation: '/ɪd/',
    pronunciationRule: 'Ends with /t/ sound -> pronounced /ɪd/ (STAR-tid)',
    meaningKh: 'ចាប់ផ្តើម',
    exampleEn: 'The meeting started promptly at 9:00 AM.',
    exampleKh: 'ការប្រជុំបានចាប់ផ្តើមទាន់ពេលវេលានៅម៉ោង ៩:០០ ព្រឹក។'
  },
  {
    id: 'rv-22',
    infinitive: 'visit',
    pastSimple: 'visited',
    pastParticiple: 'visited',
    edPronunciation: '/ɪd/',
    pronunciationRule: 'Ends with /t/ sound -> pronounced /ɪd/',
    meaningKh: 'ទៅលេង, ទស្សនា',
    exampleEn: 'We visited the National Museum last weekend.',
    exampleKh: 'យើងបានទៅទស្សនាសារមន្ទីរជាតិកាលពីចុងសប្តាហ៍មុន។'
  },
  {
    id: 'rv-23',
    infinitive: 'wait',
    pastSimple: 'waited',
    pastParticiple: 'waited',
    edPronunciation: '/ɪd/',
    pronunciationRule: 'Ends with /t/ sound -> pronounced /ɪd/ (WAY-tid)',
    meaningKh: 'រង់ចាំ',
    exampleEn: 'They waited for the bus for thirty minutes.',
    exampleKh: 'ពួកគេបានរង់ចាំឡានក្រុងអស់រយៈពេល ៣០ នាទី។'
  },
  {
    id: 'rv-24',
    infinitive: 'want',
    pastSimple: 'wanted',
    pastParticiple: 'wanted',
    edPronunciation: '/ɪd/',
    pronunciationRule: 'Ends with /t/ sound -> pronounced /ɪd/ (WAN-tid)',
    meaningKh: 'ចង់បាន',
    exampleEn: 'She wanted to learn English to study abroad.',
    exampleKh: 'នាងចង់រៀនភាសាអង់គ្លេសដើម្បីទៅរៀននៅបរទេស។'
  },

  // --- Group 2: /t/ pronunciation (after voiceless sounds /p/, /k/, /f/, /s/, /ʃ/, /tʃ/) ---
  {
    id: 'rv-25',
    infinitive: 'ask',
    pastSimple: 'asked',
    pastParticiple: 'asked',
    edPronunciation: '/t/',
    pronunciationRule: 'Ends with /k/ sound -> pronounced /t/ (AS-kt)',
    meaningKh: 'សួរ, ស្នើសុំ',
    exampleEn: 'The teacher asked a very interesting question.',
    exampleKh: 'គ្រូបង្រៀនបានសួរសំណួរដ៏គួរឱ្យចាប់អារម្មណ៍មួយ។'
  },
  {
    id: 'rv-26',
    infinitive: 'cook',
    pastSimple: 'cooked',
    pastParticiple: 'cooked',
    edPronunciation: '/t/',
    pronunciationRule: 'Ends with /k/ sound -> pronounced /t/ (KOOK-t)',
    meaningKh: 'ចម្អិន, ស្ល',
    exampleEn: 'Mom cooked a delicious Khmer dinner for us.',
    exampleKh: 'ម្តាយបានចម្អិនអាហារពេលល្ងាចបែបខ្មែរយ៉ាងឆ្ងាញ់សម្រាប់ពួកយើង។'
  },
  {
    id: 'rv-27',
    infinitive: 'cross',
    pastSimple: 'crossed',
    pastParticiple: 'crossed',
    edPronunciation: '/t/',
    pronunciationRule: 'Ends with /s/ sound -> pronounced /t/',
    meaningKh: 'ឆ្លងកាត់',
    exampleEn: 'They crossed the street safely at the zebra crossing.',
    exampleKh: 'ពួកគេបានឆ្លងផ្លូវដោយសុវត្ថិភាពត្រង់គំនូសស។'
  },
  {
    id: 'rv-28',
    infinitive: 'dance',
    pastSimple: 'danced',
    pastParticiple: 'danced',
    edPronunciation: '/t/',
    pronunciationRule: 'Ends with /s/ sound -> pronounced /t/ (DAN-st)',
    meaningKh: 'រាំ',
    exampleEn: 'Everyone danced at the party until midnight.',
    exampleKh: 'អ្នកទាំងអស់គ្នាបានរាំនៅឯពិធីជប់លៀងរហូតដល់ពាក់កណ្តាលអធ្រាត្រ។'
  },
  {
    id: 'rv-29',
    infinitive: 'drop',
    pastSimple: 'dropped',
    pastParticiple: 'dropped',
    edPronunciation: '/t/',
    pronunciationRule: 'Ends with /p/ sound -> pronounced /t/ (DROP-t)',
    meaningKh: 'ទម្លាក់, ជ្រុះ',
    exampleEn: 'He accidentally dropped his smartphone on the floor.',
    exampleKh: 'គាត់បានជ្រុះទូរស័ព្ទដៃរបស់គាត់ដោយចៃដន្យនៅលើឥដ្ឋ។'
  },
  {
    id: 'rv-30',
    infinitive: 'finish',
    pastSimple: 'finished',
    pastParticiple: 'finished',
    edPronunciation: '/t/',
    pronunciationRule: 'Ends with /ʃ/ (sh) sound -> pronounced /t/ (FIN-isht)',
    meaningKh: 'បញ្ចប់, ចប់',
    exampleEn: 'I finished reading the whole book yesterday.',
    exampleKh: 'ខ្ញុំបានអានសៀវភៅទាំងមូលចប់កាលពីម្សិលមិញ។'
  },
  {
    id: 'rv-31',
    infinitive: 'help',
    pastSimple: 'helped',
    pastParticiple: 'helped',
    edPronunciation: '/t/',
    pronunciationRule: 'Ends with /p/ sound -> pronounced /t/ (HELP-t)',
    meaningKh: 'ជួយ',
    exampleEn: 'She helped me clean the kitchen.',
    exampleKh: 'នាងបានជួយខ្ញុំសម្អាតផ្ទះបាយ។'
  },
  {
    id: 'rv-32',
    infinitive: 'hope',
    pastSimple: 'hoped',
    pastParticiple: 'hoped',
    edPronunciation: '/t/',
    pronunciationRule: 'Ends with /p/ sound -> pronounced /t/ (HOPE-t)',
    meaningKh: 'សង្ឃឹម',
    exampleEn: 'We hoped for sunny weather during our trip.',
    exampleKh: 'យើងសង្ឃឹមថានឹងមានអាកាសធាតុល្អក្នុងអំឡុងពេលធ្វើដំណើរ។'
  },
  {
    id: 'rv-33',
    infinitive: 'laugh',
    pastSimple: 'laughed',
    pastParticiple: 'laughed',
    edPronunciation: '/t/',
    pronunciationRule: 'Ends with /f/ sound -> pronounced /t/ (LAF-t)',
    meaningKh: 'សើច',
    exampleEn: 'We all laughed at the funny joke.',
    exampleKh: 'យើងទាំងអស់គ្នាសើចនឹងរឿងកំប្លែងនោះ។'
  },
  {
    id: 'rv-34',
    infinitive: 'look',
    pastSimple: 'looked',
    pastParticiple: 'looked',
    edPronunciation: '/t/',
    pronunciationRule: 'Ends with /k/ sound -> pronounced /t/ (LOOK-t)',
    meaningKh: 'មើល',
    exampleEn: 'She looked at the beautiful sunset over the river.',
    exampleKh: 'នាងបានសម្លឹងមើលថ្ងៃលិចដ៏ស្រស់ស្អាតលើដងទន្លេ។'
  },
  {
    id: 'rv-35',
    infinitive: 'miss',
    pastSimple: 'missed',
    pastParticiple: 'missed',
    edPronunciation: '/t/',
    pronunciationRule: 'Ends with /s/ sound -> pronounced /t/ (MISS-t)',
    meaningKh: 'នឹក, ខកខាន, មិនទាន់',
    exampleEn: 'He ran fast but still missed the morning train.',
    exampleKh: 'គាត់រត់លឿនហើយ ប៉ុន្តែនៅតែខកខានរថភ្លើងពេលព្រឹក។'
  },
  {
    id: 'rv-36',
    infinitive: 'pass',
    pastSimple: 'passed',
    pastParticiple: 'passed',
    edPronunciation: '/t/',
    pronunciationRule: 'Ends with /s/ sound -> pronounced /t/ (PASS-t)',
    meaningKh: 'ប្រឡងជាប់, ហុច, ឆ្លងកាត់',
    exampleEn: 'Sophea passed her final English exam with an A grade.',
    exampleKh: 'សុភាបានប្រឡងជាប់ភាសាអង់គ្លេសចុងក្រោយដោយទទួលបាននិទ្ទេស A។'
  },
  {
    id: 'rv-37',
    infinitive: 'practice',
    pastSimple: 'practiced',
    pastParticiple: 'practiced',
    edPronunciation: '/t/',
    pronunciationRule: 'Ends with /s/ sound -> pronounced /t/',
    meaningKh: 'អនុវត្ត, ហាត់',
    exampleEn: 'They practiced speaking English every single day.',
    exampleKh: 'ពួកគេបានអនុវត្តការនិយាយភាសាអង់គ្លេសជារៀងរាល់ថ្ងៃ។'
  },
  {
    id: 'rv-38',
    infinitive: 'promise',
    pastSimple: 'promised',
    pastParticiple: 'promised',
    edPronunciation: '/t/',
    pronunciationRule: 'Ends with /s/ sound -> pronounced /t/',
    meaningKh: 'សន្យា',
    exampleEn: 'He promised to return the borrowed book tomorrow.',
    exampleKh: 'គាត់បានសន្យាថានឹងយកសៀវភៅដែលបានខ្ចីមកសងវិញនៅថ្ងៃស្អែក។'
  },
  {
    id: 'rv-39',
    infinitive: 'stop',
    pastSimple: 'stopped',
    pastParticiple: 'stopped',
    edPronunciation: '/t/',
    pronunciationRule: 'Double p + ed -> pronounced /t/ (STOP-t)',
    meaningKh: 'ឈប់, បញ្ឈប់',
    exampleEn: 'The bus stopped at the station to let passengers off.',
    exampleKh: 'ឡានក្រុងបានឈប់នៅស្ថានីយដើម្បីឱ្យអ្នកដំណើរចុះ។'
  },
  {
    id: 'rv-40',
    infinitive: 'talk',
    pastSimple: 'talked',
    pastParticiple: 'talked',
    edPronunciation: '/t/',
    pronunciationRule: 'Ends with /k/ sound -> pronounced /t/ (TAWK-t)',
    meaningKh: 'និយាយ, ជជែក',
    exampleEn: 'We talked on the phone for more than an hour.',
    exampleKh: 'យើងបាននិយាយទូរស័ព្ទអស់រយៈពេលជាងមួយម៉ោង។'
  },
  {
    id: 'rv-41',
    infinitive: 'walk',
    pastSimple: 'walked',
    pastParticiple: 'walked',
    edPronunciation: '/t/',
    pronunciationRule: 'Ends with /k/ sound -> pronounced /t/ (WAWK-t)',
    meaningKh: 'ដើរ',
    exampleEn: 'They walked along the beach in the afternoon.',
    exampleKh: 'ពួកគេបានដើរតាមឆ្នេរសមុទ្រនៅពេលរសៀល។'
  },
  {
    id: 'rv-42',
    infinitive: 'wash',
    pastSimple: 'washed',
    pastParticiple: 'washed',
    edPronunciation: '/t/',
    pronunciationRule: 'Ends with /ʃ/ sound -> pronounced /t/ (WASH-t)',
    meaningKh: 'លាង, បោកគក់',
    exampleEn: 'He washed his hands thoroughly before eating.',
    exampleKh: 'គាត់បានលាងដៃយ៉ាងស្អាតមុនពេលញ៉ាំបាយ។'
  },
  {
    id: 'rv-43',
    infinitive: 'watch',
    pastSimple: 'watched',
    pastParticiple: 'watched',
    edPronunciation: '/t/',
    pronunciationRule: 'Ends with /tʃ/ (ch) sound -> pronounced /t/ (WATCH-t)',
    meaningKh: 'មើល, ទស្សនា',
    exampleEn: 'We watched a documentary on wildlife last night.',
    exampleKh: 'យើងបានទស្សនាភាពយន្តឯកសារអំពីសត្វព្រៃកាលពីយប់មិញ។'
  },
  {
    id: 'rv-44',
    infinitive: 'work',
    pastSimple: 'worked',
    pastParticiple: 'worked',
    edPronunciation: '/t/',
    pronunciationRule: 'Ends with /k/ sound -> pronounced /t/ (WORK-t)',
    meaningKh: 'ធ្វើការ',
    exampleEn: 'She worked at an international organization for 5 years.',
    exampleKh: 'នាងបានធ្វើការនៅអង្គការអន្តរជាតិមួយអស់រយៈពេល ៥ ឆ្នាំ។'
  },

  // --- Group 3: /d/ pronunciation (all other voiced sounds: vowels, /l/, /m/, /n/, /r/, /v/, /z/, etc.) ---
  {
    id: 'rv-45',
    infinitive: 'agree',
    pastSimple: 'agreed',
    pastParticiple: 'agreed',
    edPronunciation: '/d/',
    pronunciationRule: 'Ends with vowel sound -> pronounced /d/ (uh-GREED)',
    meaningKh: 'យល់ស្រប, ឯកភាព',
    exampleEn: 'Both managers agreed on the new marketing strategy.',
    exampleKh: 'អ្នកគ្រប់គ្រងទាំងពីរបានឯកភាពគ្នាលើផែនការទីផ្សារថ្មី។'
  },
  {
    id: 'rv-46',
    infinitive: 'allow',
    pastSimple: 'allowed',
    pastParticiple: 'allowed',
    edPronunciation: '/d/',
    pronunciationRule: 'Ends with vowel sound -> pronounced /d/ (uh-LOWD)',
    meaningKh: 'អនុញ្ញាត',
    exampleEn: 'The guard allowed visitors to enter the exhibition.',
    exampleKh: 'សន្តិសុខបានអនុញ្ញាតឱ្យភ្ញៀវចូលទស្សនាពិព័រណ៍។'
  },
  {
    id: 'rv-47',
    infinitive: 'answer',
    pastSimple: 'answered',
    pastParticiple: 'answered',
    edPronunciation: '/d/',
    pronunciationRule: 'Ends with /r/ sound -> pronounced /d/ (AN-serd)',
    meaningKh: 'ឆ្លើយ, ឆ្លើយតប',
    exampleEn: 'She answered the telephone promptly.',
    exampleKh: 'នាងបានឆ្លើយទូរស័ព្ទភ្លាមៗ។'
  },
  {
    id: 'rv-48',
    infinitive: 'appear',
    pastSimple: 'appeared',
    pastParticiple: 'appeared',
    edPronunciation: '/d/',
    pronunciationRule: 'Ends with /r/ sound -> pronounced /d/',
    meaningKh: 'លេចឡើង, បង្ហាញខ្លួន',
    exampleEn: 'A rainbow appeared in the sky after the rain.',
    exampleKh: 'ឥន្ទធនូមួយបានលេចឡើងនៅលើមេឃបន្ទាប់ពីភ្លៀងធ្លាក់។'
  },
  {
    id: 'rv-49',
    infinitive: 'arrive',
    pastSimple: 'arrived',
    pastParticiple: 'arrived',
    edPronunciation: '/d/',
    pronunciationRule: 'Ends with /v/ sound -> pronounced /d/ (uh-RYVD)',
    meaningKh: 'មកដល់',
    exampleEn: 'The plane arrived at Phnom Penh Airport safely.',
    exampleKh: 'យន្តហោះបានមកដល់អាកាសយានដ្ឋានភ្នំពេញដោយសុវត្ថិភាព។'
  },
  {
    id: 'rv-50',
    infinitive: 'believe',
    pastSimple: 'believed',
    pastParticiple: 'believed',
    edPronunciation: '/d/',
    pronunciationRule: 'Ends with /v/ sound -> pronounced /d/ (bi-LEEV-d)',
    meaningKh: 'ជឿជាក់',
    exampleEn: 'He always believed in his ability to succeed.',
    exampleKh: 'គាត់តែងតែជឿជាក់លើសមត្ថភាពរបស់គាត់ក្នុងការជោគជ័យ។'
  },
  {
    id: 'rv-51',
    infinitive: 'call',
    pastSimple: 'called',
    pastParticiple: 'called',
    edPronunciation: '/d/',
    pronunciationRule: 'Ends with /l/ sound -> pronounced /d/ (CAWLD)',
    meaningKh: 'ហៅ, ទូរស័ព្ទទៅ',
    exampleEn: 'I called my parents to wish them a happy New Year.',
    exampleKh: 'ខ្ញុំបានទូរស័ព្ទទៅឪពុកម្តាយដើម្បីជូនពរឆ្នាំថ្មី។'
  },
  {
    id: 'rv-52',
    infinitive: 'change',
    pastSimple: 'changed',
    pastParticiple: 'changed',
    edPronunciation: '/d/',
    pronunciationRule: 'Ends with /dʒ/ (j) sound -> pronounced /d/ (CHAYNJD)',
    meaningKh: 'ផ្លាស់ប្តូរ',
    exampleEn: 'The weather changed rapidly from sunny to rainy.',
    exampleKh: 'អាកាសធាតុបានផ្លាស់ប្តូរយ៉ាងលឿនពីមេឃស្រឡះទៅជាភ្លៀង។'
  },
  {
    id: 'rv-53',
    infinitive: 'clean',
    pastSimple: 'cleaned',
    pastParticiple: 'cleaned',
    edPronunciation: '/d/',
    pronunciationRule: 'Ends with /n/ sound -> pronounced /d/ (KLEEND)',
    meaningKh: 'សម្អាត',
    exampleEn: 'They cleaned their bedroom thoroughly this morning.',
    exampleKh: 'ពួកគេបានសម្អាតបន្ទប់គេងយ៉ាងស្អាតនៅព្រឹកនេះ។'
  },
  {
    id: 'rv-54',
    infinitive: 'close',
    pastSimple: 'closed',
    pastParticiple: 'closed',
    edPronunciation: '/d/',
    pronunciationRule: 'Ends with /z/ sound -> pronounced /d/ (KLOHZD)',
    meaningKh: 'បិទ',
    exampleEn: 'The store closed early because of the public holiday.',
    exampleKh: 'ហាងបានបិទទ្វារមុនម៉ោងដោយសារតែថ្ងៃបុណ្យជាតិ។'
  },
  {
    id: 'rv-55',
    infinitive: 'enjoy',
    pastSimple: 'enjoyed',
    pastParticiple: 'enjoyed',
    edPronunciation: '/d/',
    pronunciationRule: 'Ends with vowel sound -> pronounced /d/ (en-JOYD)',
    meaningKh: 'រីករាយ, ពេញចិត្ត',
    exampleEn: 'We thoroughly enjoyed our weekend trip to Kampot.',
    exampleKh: 'យើងពិតជារីករាយនឹងដំណើរកម្សាន្តចុងសប្តាហ៍នៅកំពត។'
  },
  {
    id: 'rv-56',
    infinitive: 'explain',
    pastSimple: 'explained',
    pastParticiple: 'explained',
    edPronunciation: '/d/',
    pronunciationRule: 'Ends with /n/ sound -> pronounced /d/',
    meaningKh: 'ពន្យល់',
    exampleEn: 'The teacher clearly explained the grammar rule.',
    exampleKh: 'លោកគ្រូបានពន្យល់ពីក្បួនវេយ្យាករណ៍យ៉ាងច្បាស់លាស់។'
  },
  {
    id: 'rv-57',
    infinitive: 'follow',
    pastSimple: 'followed',
    pastParticiple: 'followed',
    edPronunciation: '/d/',
    pronunciationRule: 'Ends with vowel sound -> pronounced /d/',
    meaningKh: 'ដើរតាម, ធ្វើតាម',
    exampleEn: 'He followed the recipe instructions step by step.',
    exampleKh: 'គាត់បានធ្វើតាមការណែនាំនៃរូបមន្តម្ហូបមួយជំហានម្តងៗ។'
  },
  {
    id: 'rv-58',
    infinitive: 'happen',
    pastSimple: 'happened',
    pastParticiple: 'happened',
    edPronunciation: '/d/',
    pronunciationRule: 'Ends with /n/ sound -> pronounced /d/ (HAP-end)',
    meaningKh: 'កើតឡើង',
    exampleEn: 'What happened after the meeting concluded?',
    exampleKh: 'តើមានអ្វីកើតឡើងបន្ទាប់ពីការប្រជុំបានបញ្ចប់?'
  },
  {
    id: 'rv-59',
    infinitive: 'learn',
    pastSimple: 'learned',
    pastParticiple: 'learned',
    edPronunciation: '/d/',
    pronunciationRule: 'Ends with /n/ sound -> pronounced /d/ (LERND)',
    meaningKh: 'រៀន, សិក្សា',
    exampleEn: 'I learned twenty new English words today.',
    exampleKh: 'ខ្ញុំបានរៀនពាក្យអង់គ្លេសថ្មីចំនួន ២០ ពាក្យនៅថ្ងៃនេះ។'
  },
  {
    id: 'rv-60',
    infinitive: 'listen',
    pastSimple: 'listened',
    pastParticiple: 'listened',
    edPronunciation: '/d/',
    pronunciationRule: 'Ends with /n/ sound -> pronounced /d/ (LIS-end)',
    meaningKh: 'ស្តាប់',
    exampleEn: 'She listened to an English podcast on her way to work.',
    exampleKh: 'នាងបានស្តាប់ប៉ុស្តិ៍ផតខាស់ភាសាអង់គ្លេសតាមផ្លូវទៅធ្វើការ។'
  },
  {
    id: 'rv-61',
    infinitive: 'live',
    pastSimple: 'lived',
    pastParticiple: 'lived',
    edPronunciation: '/d/',
    pronunciationRule: 'Ends with /v/ sound -> pronounced /d/ (LIVD)',
    meaningKh: 'រស់នៅ',
    exampleEn: 'My grandparents lived in Battambang for fifty years.',
    exampleKh: 'ជីដូនជីតារបស់ខ្ញុំបានរស់នៅខេត្តបាត់ដំបងអស់រយៈពេល ៥០ ឆ្នាំ។'
  },
  {
    id: 'rv-62',
    infinitive: 'love',
    pastSimple: 'loved',
    pastParticiple: 'loved',
    edPronunciation: '/d/',
    pronunciationRule: 'Ends with /v/ sound -> pronounced /d/ (LUVD)',
    meaningKh: 'ស្រឡាញ់, ចូលចិត្តខ្លាំង',
    exampleEn: 'The children loved playing outdoors in the garden.',
    exampleKh: 'ក្មេងៗចូលចិត្តលេងនៅខាងក្រៅក្នុងសួនច្បារណាស់។'
  },
  {
    id: 'rv-63',
    infinitive: 'move',
    pastSimple: 'moved',
    pastParticiple: 'moved',
    edPronunciation: '/d/',
    pronunciationRule: 'Ends with /v/ sound -> pronounced /d/ (MOOVD)',
    meaningKh: 'ផ្លាស់ទី, រើផ្ទះ',
    exampleEn: 'They moved into their new apartment last month.',
    exampleKh: 'ពួកគេបានរើចូលទៅក្នុងផ្ទះល្វែងថ្មីកាលពីខែមុន។'
  },
  {
    id: 'rv-64',
    infinitive: 'open',
    pastSimple: 'opened',
    pastParticiple: 'opened',
    edPronunciation: '/d/',
    pronunciationRule: 'Ends with /n/ sound -> pronounced /d/ (OH-pend)',
    meaningKh: 'បើក',
    exampleEn: 'He opened the window to let fresh air in.',
    exampleKh: 'គាត់បានបើកបង្អួចដើម្បីឱ្យខ្យល់បរិសុទ្ធចូល។'
  },
  {
    id: 'rv-65',
    infinitive: 'order',
    pastSimple: 'ordered',
    pastParticiple: 'ordered',
    edPronunciation: '/d/',
    pronunciationRule: 'Ends with /r/ sound -> pronounced /d/',
    meaningKh: 'កុម្ម៉ង់, បញ្ជាទិញ',
    exampleEn: 'We ordered some pizza for lunch.',
    exampleKh: 'យើងបានកុម្ម៉ង់ភីហ្សាខ្លះសម្រាប់អាហារថ្ងៃត្រង់។'
  },
  {
    id: 'rv-66',
    infinitive: 'play',
    pastSimple: 'played',
    pastParticiple: 'played',
    edPronunciation: '/d/',
    pronunciationRule: 'Ends with vowel sound -> pronounced /d/ (PLAYD)',
    meaningKh: 'លេង, លេងឧបករណ៍តន្ត្រី',
    exampleEn: 'The kids played football in the park until dark.',
    exampleKh: 'ក្មេងៗបានលេងបាល់ទាត់ក្នុងសួនរហូតដល់ងងឹត។'
  },
  {
    id: 'rv-67',
    infinitive: 'prepare',
    pastSimple: 'prepared',
    pastParticiple: 'prepared',
    edPronunciation: '/d/',
    pronunciationRule: 'Ends with /r/ sound -> pronounced /d/',
    meaningKh: 'រៀបចំ, ត្រៀម',
    exampleEn: 'She carefully prepared her slides for the presentation.',
    exampleKh: 'នាងបានរៀបចំស្លាយរបស់នាងយ៉ាងយកចិត្តទុកដាក់សម្រាប់បទបង្ហាញ។'
  },
  {
    id: 'rv-68',
    infinitive: 'remember',
    pastSimple: 'remembered',
    pastParticiple: 'remembered',
    edPronunciation: '/d/',
    pronunciationRule: 'Ends with /r/ sound -> pronounced /d/',
    meaningKh: 'ចងចាំ',
    exampleEn: 'I remembered to lock the front door before leaving.',
    exampleKh: 'ខ្ញុំបានចាំចាក់សោទ្វារមុខមុនពេលចាកចេញ។'
  },
  {
    id: 'rv-69',
    infinitive: 'stay',
    pastSimple: 'stayed',
    pastParticiple: 'stayed',
    edPronunciation: '/d/',
    pronunciationRule: 'Ends with vowel sound -> pronounced /d/ (STAYD)',
    meaningKh: 'ស្នាក់នៅ',
    exampleEn: 'We stayed at a very comfortable hotel near the beach.',
    exampleKh: 'យើងបានស្នាក់នៅសណ្ឋាគារដ៏មានផាសុកភាពមួយក្បែរឆ្នេរ។'
  },
  {
    id: 'rv-70',
    infinitive: 'study',
    pastSimple: 'studied',
    pastParticiple: 'studied',
    edPronunciation: '/d/',
    pronunciationRule: 'y -> ied, ends with vowel sound -> pronounced /d/ (STUD-eed)',
    meaningKh: 'រៀន, សិក្សាស្រាវជ្រាវ',
    exampleEn: 'He studied hard and passed his IELTS exam with band 7.5.',
    exampleKh: 'គាត់បានរៀនយ៉ាងខ្លាំងហើយប្រឡងជាប់ IELTS ដោយទទួលបានពិន្ទុ 7.5។'
  },
  {
    id: 'rv-71',
    infinitive: 'travel',
    pastSimple: 'travelled / traveled',
    pastParticiple: 'travelled / traveled',
    edPronunciation: '/d/',
    pronunciationRule: 'Ends with /l/ sound -> pronounced /d/',
    meaningKh: 'ធ្វើដំណើរ, ដើរកម្សាន្ត',
    exampleEn: 'They traveled across Southeast Asia last summer.',
    exampleKh: 'ពួកគេបានធ្វើដំណើរទូទាំងអាស៊ីអាគ្នេយ៍កាលពីរដូវក្តៅមុន។'
  },
  {
    id: 'rv-72',
    infinitive: 'try',
    pastSimple: 'tried',
    pastParticiple: 'tried',
    edPronunciation: '/d/',
    pronunciationRule: 'y -> ied -> pronounced /d/ (TRYD)',
    meaningKh: 'ព្យាយាម, សាកល្បង',
    exampleEn: 'She tried her best to solve the difficult equation.',
    exampleKh: 'នាងបានព្យាយាមអស់ពីសមត្ថភាពដើម្បីដោះស្រាយសមីការដ៏ពិបាកនោះ។'
  },
  {
    id: 'rv-73',
    infinitive: 'use',
    pastSimple: 'used',
    pastParticiple: 'used',
    edPronunciation: '/d/',
    pronunciationRule: 'Ends with /z/ sound -> pronounced /d/ (YOOZD)',
    meaningKh: 'ប្រើប្រាស់',
    exampleEn: 'He used an online dictionary to check the word spelling.',
    exampleKh: 'គាត់បានប្រើវចនានុក្រមអនឡាញដើម្បីពិនិត្យមើលអក្ខរាវិរុទ្ធពាក្យ។'
  },
  {
    id: 'rv-74',
    infinitive: 'worry',
    pastSimple: 'worried',
    pastParticiple: 'worried',
    edPronunciation: '/d/',
    pronunciationRule: 'y -> ied -> pronounced /d/ (WUR-eed)',
    meaningKh: 'ព្រួយបារម្ភ',
    exampleEn: 'Parents worried when their child came home late.',
    exampleKh: 'ឪពុកម្តាយមានការព្រួយបារម្ភនៅពេលកូនមកផ្ទះយឺត។'
  }
];

// Rich Daily & Thematic Regular Vocabulary
export const vocabularyList: VocabItem[] = [
  // --- DAILY ESSENTIALS & ROUTINES ---
  {
    id: 'daily-1',
    word: 'Accomplish',
    phonetic: '/əˈkʌm.plɪʃ/',
    partOfSpeech: 'verb',
    definitionEn: 'To achieve or complete something successfully.',
    meaningKh: 'សម្រេចបាន / បំពេញបានជោគជ័យ',
    exampleEn: 'You can accomplish anything with discipline and hard work.',
    exampleKh: 'អ្នកអាចសម្រេចបានអ្វីៗទាំងអស់ដោយវិន័យនិងការខិតខំប្រឹងប្រែង។',
    category: 'daily-essential',
    level: 'B1-B2'
  },
  {
    id: 'daily-2',
    word: 'Habit',
    phonetic: '/ˈhæb.ɪt/',
    partOfSpeech: 'noun',
    definitionEn: 'A regular tendency or practice, especially one that is hard to give up.',
    meaningKh: 'ទម្លាប់ប្រចាំថ្ងៃ',
    exampleEn: 'Reading for 20 minutes each night is a wonderful habit.',
    exampleKh: 'ការអានសៀវភៅ ២០ នាទីរៀងរាល់យប់គឺជាទម្លាប់ដ៏ល្អមួយ។',
    category: 'daily-essential',
    level: 'A1-A2'
  },
  {
    id: 'daily-3',
    word: 'Convenient',
    phonetic: '/kənˈviː.ni.ənt/',
    partOfSpeech: 'adjective',
    definitionEn: 'Fitting in well with a person’s needs, activities, and plans; easy to use.',
    meaningKh: 'ងាយស្រួល / ផ្តល់ភាពងាយស្រួល',
    exampleEn: 'Online shopping is very convenient for busy professionals.',
    exampleKh: 'ការទិញទំនិញតាមអ៊ីនធឺណិតគឺងាយស្រួលណាស់សម្រាប់អ្នកធ្វើការរវល់។',
    category: 'daily-essential',
    level: 'A1-A2'
  },
  {
    id: 'daily-4',
    word: 'Resilient',
    phonetic: '/rɪˈzɪl.jənt/',
    partOfSpeech: 'adjective',
    definitionEn: 'Able to withstand or recover quickly from difficult conditions.',
    meaningKh: 'រឹងមាំ / ធន់នឹងឧបសគ្គ',
    exampleEn: 'She proved to be resilient in the face of adversity.',
    exampleKh: 'នាងបានបង្ហាញពីភាពរឹងមាំនៅចំពោះមុខការលំបាក។',
    category: 'daily-essential',
    level: 'C1-C2'
  },
  {
    id: 'daily-5',
    word: 'Opportunity',
    phonetic: '/ˌɒp.əˈtʃuː.nə.ti/',
    partOfSpeech: 'noun',
    definitionEn: 'A set of circumstances that makes it possible to do something.',
    meaningKh: 'ឱកាសល្អ',
    exampleEn: 'This scholarship is a life-changing opportunity.',
    exampleKh: 'អាហារូបករណ៍នេះគឺជាឱកាសផ្លាស់ប្តូរជីវិតដ៏សំខាន់។',
    category: 'daily-essential',
    level: 'A1-A2'
  },
  {
    id: 'daily-6',
    word: 'Efficient',
    phonetic: '/ɪˈfɪʃ.ənt/',
    partOfSpeech: 'adjective',
    definitionEn: 'Achieving maximum productivity with minimum wasted effort or expense.',
    meaningKh: 'មានប្រសិទ្ធភាពខ្ពស់',
    exampleEn: 'The new computer system is fast and efficient.',
    exampleKh: 'ប្រព័ន្ធកុំព្យូទ័រថ្មីនេះលឿននិងមានប្រសិទ្ធភាពខ្ពស់។',
    category: 'daily-essential',
    level: 'B1-B2'
  },
  {
    id: 'daily-7',
    word: 'Punctual',
    phonetic: '/ˈpʌŋk.tʃu.əl/',
    partOfSpeech: 'adjective',
    definitionEn: 'Happening or doing something at the agreed or proper time; on time.',
    meaningKh: 'ទៀងទាត់ពេលវេលា / គោរពម៉ោង',
    exampleEn: 'He is always punctual for his morning meetings.',
    exampleKh: 'គាត់តែងតែគោរពពេលវេលាទៀងទាត់សម្រាប់ការប្រជុំពេលព្រឹក។',
    category: 'daily-essential',
    level: 'B1-B2'
  },
  {
    id: 'daily-8',
    word: 'Curious',
    phonetic: '/ˈkjʊə.ri.əs/',
    partOfSpeech: 'adjective',
    definitionEn: 'Eager to know or learn something.',
    meaningKh: 'ចង់ដឹងចង់ឃើញ / ចូលចិត្តរៀនសូត្រ',
    exampleEn: 'Children are naturally curious about the world around them.',
    exampleKh: 'ក្មេងៗមានការចង់ដឹងចង់ឃើញពីធម្មជាតិអំពីពិភពលោកជុំវិញពួកគេ។',
    category: 'daily-essential',
    level: 'A1-A2'
  },

  // --- ACADEMIC & RESEARCH ---
  {
    id: 'acad-1',
    word: 'Analyze',
    phonetic: '/ˈæn.əl.aɪz/',
    partOfSpeech: 'verb',
    definitionEn: 'To examine something methodically and in detail to explain or interpret it.',
    meaningKh: 'វិភាគ / ពិនិត្យយ៉ាងលម្អិត',
    exampleEn: 'Researchers analyzed the survey data to determine the outcome.',
    exampleKh: 'អ្នកស្រាវជ្រាវបានវិភាគទិន្នន័យស្ទង់មតិដើម្បីកំណត់លទ្ធផល។',
    category: 'academic',
    level: 'B1-B2'
  },
  {
    id: 'acad-2',
    word: 'Synthesize',
    phonetic: '/ˈsɪn.θə.saɪz/',
    partOfSpeech: 'verb',
    definitionEn: 'To combine different ideas or elements to create something new or complete.',
    meaningKh: 'សំយោគ / ចងក្រងគំនិតបញ្ចូលគ្នា',
    exampleEn: 'Students must synthesize arguments from several research papers.',
    exampleKh: 'និស្សិតត្រូវតែសំយោគអំណះអំណាងពីឯកសារស្រាវជ្រាវជាច្រើន។',
    category: 'academic',
    level: 'C1-C2'
  },
  {
    id: 'acad-3',
    word: 'Evaluate',
    phonetic: '/ɪˈvæl.ju.eɪt/',
    partOfSpeech: 'verb',
    definitionEn: 'To judge the quality, importance, amount, or value of something.',
    meaningKh: 'វាយតម្លៃ / កំណត់តម្លៃ',
    exampleEn: 'The committee will evaluate the effectiveness of the new policy.',
    exampleKh: 'គណៈកម្មាធិការនឹងវាយតម្លៃប្រសិទ្ធភាពនៃគោលនយោបាយថ្មី។',
    category: 'academic',
    level: 'B1-B2'
  },
  {
    id: 'acad-4',
    word: 'Hypothesis',
    phonetic: '/haɪˈpɒθ.ə.sɪs/',
    partOfSpeech: 'noun',
    definitionEn: 'An idea or explanation tested through study and experimentation.',
    meaningKh: 'សម្មតិកម្ម / ការសន្មតតាមបែបវិទ្យាសាស្ត្រ',
    exampleEn: 'The experimental results confirmed our initial hypothesis.',
    exampleKh: 'លទ្ធផលនៃការពិសោធន៍បានបញ្ជាក់ពីសម្មតិកម្មដំបូងរបស់យើង។',
    category: 'academic',
    level: 'B1-B2'
  },
  {
    id: 'acad-5',
    word: 'Coherent',
    phonetic: '/kəʊˈhɪə.rənt/',
    partOfSpeech: 'adjective',
    definitionEn: 'Logical and well organized; easy to understand.',
    meaningKh: 'ស៊ីសង្វាក់គ្នា / សមហេតុផល / ច្បាស់លាស់',
    exampleEn: 'She presented a coherent argument that convinced everyone.',
    exampleKh: 'នាងបានបង្ហាញអំណះអំណាងដ៏ស៊ីសង្វាក់គ្នាដែលបញ្ចុះបញ្ចូលមនុស្សគ្រប់គ្នា។',
    category: 'academic',
    level: 'B1-B2'
  },
  {
    id: 'acad-6',
    word: 'Significant',
    phonetic: '/sɪɡˈnɪf.ɪ.kənt/',
    partOfSpeech: 'adjective',
    definitionEn: 'Sufficiently great or important to be worthy of attention.',
    meaningKh: 'សំខាន់ / មានអត្ថន័យគួរកត់សម្គាល់',
    exampleEn: 'There has been a significant increase in online education enrollment.',
    exampleKh: 'មានការកើនឡើងគួរឱ្យកត់សម្គាល់នៃការចុះឈ្មោះចូលរៀនតាមអ៊ីនធឺណិត។',
    category: 'academic',
    level: 'B1-B2'
  },
  {
    id: 'acad-7',
    word: 'Methodology',
    phonetic: '/ˌmeθ.əˈdɒl.ə.dʒi/',
    partOfSpeech: 'noun',
    definitionEn: 'A system of methods used in a particular area of study or activity.',
    meaningKh: 'វិធីសាស្ត្រស្រាវជ្រាវ',
    exampleEn: 'The study explains the research methodology in detail.',
    exampleKh: 'ការសិក្សានេះពន្យល់អំពីវិធីសាស្ត្រស្រាវជ្រាវយ៉ាងលម្អិត។',
    category: 'academic',
    level: 'C1-C2'
  },
  {
    id: 'acad-8',
    word: 'Perspective',
    phonetic: '/pəˈspek.tɪv/',
    partOfSpeech: 'noun',
    definitionEn: 'A particular attitude toward or way of regarding something; point of view.',
    meaningKh: 'ទស្សនវិស័យ / មុំមើល / ផ្នត់គំនិត',
    exampleEn: 'Try to see the issue from a different perspective.',
    exampleKh: 'ព្យាយាមមើលបញ្ហានេះពីទស្សនវិស័យផ្សេងទៀត។',
    category: 'academic',
    level: 'B1-B2'
  },

  // --- PHRASAL VERBS ---
  {
    id: 'pv-1',
    word: 'Figure out',
    phonetic: '/ˈfɪɡ.ər aʊt/',
    partOfSpeech: 'phrasal verb',
    definitionEn: 'To solve, discover, or understand something through thought.',
    meaningKh: 'យល់ឃើញ / រកដំណោះស្រាយឃើញ',
    exampleEn: 'I finally figured out how to solve this difficult math problem.',
    exampleKh: 'ទីបំផុតខ្ញុំបានរកឃើញវិធីដោះស្រាយលំហាត់គណិតវិទ្យាដ៏ពិបាកនេះហើយ។',
    category: 'phrasal-verbs',
    level: 'A1-A2'
  },
  {
    id: 'pv-2',
    word: 'Give up',
    phonetic: '/ɡɪv ʌp/',
    partOfSpeech: 'phrasal verb',
    definitionEn: 'To stop doing something or cease making an effort.',
    meaningKh: 'បោះបង់ចោល / ឈប់ព្យាយាម',
    exampleEn: 'Never give up on your dreams, even when times are tough.',
    exampleKh: 'កុំបោះបង់ក្តីសុបិនរបស់អ្នកឱ្យសោះ ទោះបីជាជួបការលំបាកក៏ដោយ។',
    category: 'phrasal-verbs',
    level: 'A1-A2'
  },
  {
    id: 'pv-3',
    word: 'Put off',
    phonetic: '/pʊt ɒf/',
    partOfSpeech: 'phrasal verb',
    definitionEn: 'To delay or postpone an event or task.',
    meaningKh: 'ពន្យារពេល / ផ្អាកទុកពេលក្រោយ',
    exampleEn: 'Don’t put off until tomorrow what you can do today.',
    exampleKh: 'កុំពន្យារពេលរឿងដែលអ្នកអាចធ្វើបានថ្ងៃនេះទៅថ្ងៃស្អែក។',
    category: 'phrasal-verbs',
    level: 'B1-B2'
  },
  {
    id: 'pv-4',
    word: 'Look forward to',
    phonetic: '/lʊk ˈfɔː.wəd tuː/',
    partOfSpeech: 'phrasal verb',
    definitionEn: 'To feel excited and pleased about something that is going to happen.',
    meaningKh: 'ទន្ទឹងរង់ចាំដោយក្តីរំភើប',
    exampleEn: 'I look forward to hearing from you soon.',
    exampleKh: 'ខ្ញុំទន្ទឹងរង់ចាំដំណឹងពីអ្នកក្នុងពេលឆាប់ៗនេះ។',
    category: 'phrasal-verbs',
    level: 'A1-A2'
  },
  {
    id: 'pv-5',
    word: 'Come up with',
    phonetic: '/kʌm ʌp wɪð/',
    partOfSpeech: 'phrasal verb',
    definitionEn: 'To think of or produce an idea, plan, or solution.',
    meaningKh: 'រកឃើញគំនិត / បង្កើតផែនការថ្មី',
    exampleEn: 'She came up with a brilliant idea for the project.',
    exampleKh: 'នាងបានរកឃើញគំនិតដ៏អស្ចារ្យមួយសម្រាប់គម្រោងនេះ។',
    category: 'phrasal-verbs',
    level: 'B1-B2'
  },
  {
    id: 'pv-6',
    word: 'Carry out',
    phonetic: '/ˈkær.i aʊt/',
    partOfSpeech: 'phrasal verb',
    definitionEn: 'To perform or conduct a task, instruction, or research.',
    meaningKh: 'អនុវត្ត / ដំណើរការកិច្ចការ',
    exampleEn: 'The scientists will carry out a series of laboratory experiments.',
    exampleKh: 'ក្រុមអ្នកវិទ្យាសាស្ត្រនឹងអនុវត្តការពិសោធន៍ក្នុងមន្ទីរពិសោធន៍ជាបន្តបន្ទាប់។',
    category: 'phrasal-verbs',
    level: 'B1-B2'
  },

  // --- BUSINESS & CAREER ---
  {
    id: 'biz-1',
    word: 'Collaborate',
    phonetic: '/kəˈlæb.ə.reɪt/',
    partOfSpeech: 'verb',
    definitionEn: 'To work jointly on an activity, especially to produce or create something.',
    meaningKh: 'សហការ / ធ្វើការរួមគ្នា',
    exampleEn: 'Our marketing team collaborated with the software engineers.',
    exampleKh: 'ក្រុមទីផ្សាររបស់យើងបានសហការជាមួយវិស្វករកម្មវិធី។',
    category: 'business',
    level: 'B1-B2'
  },
  {
    id: 'biz-2',
    word: 'Negotiate',
    phonetic: '/nəˈɡəʊ.ʃi.eɪt/',
    partOfSpeech: 'verb',
    definitionEn: 'To discuss something with someone in order to reach an agreement.',
    meaningKh: 'ចរចា / ពិភាក្សាព្រមព្រៀង',
    exampleEn: 'They are trying to negotiate better contract terms.',
    exampleKh: 'ពួកគេកំពុងព្យាយាមចរចាលក្ខខណ្ឌកិច្ចសន្យាឱ្យកាន់តែប្រសើរ។',
    category: 'business',
    level: 'B1-B2'
  },
  {
    id: 'biz-3',
    word: 'Prioritize',
    phonetic: '/praɪˈɒr.ɪ.taɪz/',
    partOfSpeech: 'verb',
    definitionEn: 'To treat something as more important than other things.',
    meaningKh: 'កំណត់អាទិភាព / ជ្រើសរើសរឿងសំខាន់មុន',
    exampleEn: 'You must prioritize urgent customer requests.',
    exampleKh: 'អ្នកត្រូវតែកំណត់អាទិភាពលើសំណើបន្ទាន់របស់អតិថិជន។',
    category: 'business',
    level: 'B1-B2'
  },
  {
    id: 'biz-4',
    word: 'Deadline',
    phonetic: '/ˈded.laɪn/',
    partOfSpeech: 'noun',
    definitionEn: 'The latest time or date by which something should be completed.',
    meaningKh: 'កាលបរិច្ឆេទកំណត់ / ថ្ងៃផុតកំណត់',
    exampleEn: 'We worked late into the night to meet the project deadline.',
    exampleKh: 'យើងបានធ្វើការដល់យប់ជ្រៅដើម្បីបញ្ចប់គម្រោងឱ្យទាន់កាលកំណត់។',
    category: 'business',
    level: 'A1-A2'
  },

  // --- IDIOMS & PHRASES ---
  {
    id: 'idiom-1',
    word: 'Piece of cake',
    phonetic: '/piːs əv keɪk/',
    partOfSpeech: 'idiom',
    definitionEn: 'Something that is very easy to do.',
    meaningKh: 'ងាយស្រួលដូចបកចេក / ស្រួលណាស់',
    exampleEn: 'The grammar test was a piece of cake because I studied hard.',
    exampleKh: 'ការប្រឡងវេយ្យាករណ៍គឺងាយស្រួលណាស់ ដោយសារខ្ញុំបានរៀនយ៉ាងយកចិត្តទុកដាក់។',
    category: 'idioms',
    level: 'A1-A2'
  },
  {
    id: 'idiom-2',
    word: 'Hit the nail on the head',
    phonetic: '/hɪt ðə neɪl ɒn ðə hed/',
    partOfSpeech: 'idiom',
    definitionEn: 'To describe exactly what is causing a situation or problem; completely accurate.',
    meaningKh: 'និយាយត្រូវចំចំណុចសំខាន់ / ត្រឹមត្រូវពិតប្រាកដ',
    exampleEn: 'You hit the nail on the head when you identified the key issue.',
    exampleKh: 'អ្នកបាននិយាយត្រូវចំចំណុចសំខាន់នៅពេលដែលអ្នករកឃើញបញ្ហាស្នូល។',
    category: 'idioms',
    level: 'B1-B2'
  },
  {
    id: 'idiom-3',
    word: 'Break the ice',
    phonetic: '/breɪk ðiː aɪs/',
    partOfSpeech: 'idiom',
    definitionEn: 'To make people feel more relaxed and comfortable in a social setting.',
    meaningKh: 'បើកការសន្ទនា / បំបាត់ភាពអៀនខ្មាសក្នុងចំណោមមនុស្សថ្មី',
    exampleEn: 'A short fun game helped break the ice at the start of the workshop.',
    exampleKh: 'ល្បែងកម្សាន្តខ្លីមួយបានជួយបំបាត់ភាពអៀនខ្មាសនៅពេលចាប់ផ្តើមសិក្ខាសាលា។',
    category: 'idioms',
    level: 'B1-B2'
  },
  {
    id: 'idiom-4',
    word: 'Once in a blue moon',
    phonetic: '/wʌns ɪn ə bluː muːn/',
    partOfSpeech: 'idiom',
    definitionEn: 'Happening very rarely or almost never.',
    meaningKh: 'កម្រកើតឡើងណាស់ / យូរៗម្តង',
    exampleEn: 'My uncle lives abroad, so I only see him once in a blue moon.',
    exampleKh: 'ពូរបស់ខ្ញុំរស់នៅបរទេស ដូច្នេះខ្ញុំកម្រនឹងបានជួបគាត់ណាស់។',
    category: 'idioms',
    level: 'B1-B2'
  },
  {
    id: 'idiom-5',
    word: 'Cost an arm and a leg',
    phonetic: '/kɒst ən ɑːm ænd ə leɡ/',
    partOfSpeech: 'idiom',
    definitionEn: 'To be extremely expensive.',
    meaningKh: 'ថ្លៃកប់ពពក / ថ្លៃខ្លាំងណាស់',
    exampleEn: 'That brand new smartphone costs an arm and a leg.',
    exampleKh: 'ទូរស័ព្ទស្មាតហ្វូនស៊េរីថ្មីនោះមានតម្លៃថ្លៃកប់ពពក។',
    category: 'idioms',
    level: 'A1-A2'
  },
  {
    id: 'idiom-6',
    word: 'See eye to eye',
    phonetic: '/siː aɪ tuː aɪ/',
    partOfSpeech: 'idiom',
    definitionEn: 'To agree fully with someone on a topic.',
    meaningKh: 'យល់ស្របគ្នាទាំងស្រុង / មានគំនិតដូចគ្នា',
    exampleEn: 'My colleague and I see eye to eye on the new project strategy.',
    exampleKh: 'ខ្ញុំនិងសហការីមានការយល់ស្របគ្នាទាំងស្រុងលើវិធីសាស្ត្រគម្រោងថ្មី។',
    category: 'idioms',
    level: 'B1-B2'
  },
  {
    id: 'idiom-7',
    word: 'Under the weather',
    phonetic: '/ˈʌn.dər ðə ˈweð.ər/',
    partOfSpeech: 'idiom',
    definitionEn: 'Slightly unwell, sick, or tired.',
    meaningKh: 'មិនសូវស្រួលខ្លួន / ឈឺស្រាល',
    exampleEn: 'I stayed home today because I was feeling under the weather.',
    exampleKh: 'ខ្ញុំបានសម្រាកនៅផ្ទះថ្ងៃនេះដោយសារតែមិនសូវស្រួលខ្លួន។',
    category: 'idioms',
    level: 'A1-A2'
  },
  {
    id: 'idiom-8',
    word: 'Kill two birds with one stone',
    phonetic: '/kɪl tuː bɜːdz wɪð wʌn stəʊn/',
    partOfSpeech: 'idiom',
    definitionEn: 'To accomplish two different things with a single action.',
    meaningKh: 'បាញ់សត្វមួយគ្រាប់បានពីរ / ធ្វើកិច្ចការមួយចំណេញពីរ',
    exampleEn: 'Cycling to work lets me exercise and save money, killing two birds with one stone.',
    exampleKh: 'ការជិះកង់ទៅធ្វើការជួយឱ្យខ្ញុំបានហាត់ប្រាណផង និងសន្សំលុយផង ចំណេញបានរឿងពីរក្នុងពេលតែមួយ។',
    category: 'idioms',
    level: 'B1-B2'
  },
  // --- ADDITIONAL DAILY ESSENTIALS ---
  {
    id: 'daily-7',
    word: 'Punctual',
    phonetic: '/ˈpʌŋk.tʃu.əl/',
    partOfSpeech: 'adjective',
    definitionEn: 'Arriving or doing something at the correct, agreed time; not late.',
    meaningKh: 'ទៀងទាត់ពេលវេលា / មិនយឺតយ៉ាវ',
    exampleEn: 'He is always punctual for his morning classes.',
    exampleKh: 'គាត់តែងតែទៀងទាត់ពេលវេលាសម្រាប់ថ្នាក់រៀនពេលព្រឹករបស់គាត់។',
    category: 'daily-essential',
    level: 'A1-A2'
  },
  {
    id: 'daily-8',
    word: 'Convenient',
    phonetic: '/kənˈviː.ni.ənt/',
    partOfSpeech: 'adjective',
    definitionEn: 'Fitting in well with a person’s needs, activities, and plans; easy to use.',
    meaningKh: 'ងាយស្រួល / ផ្តល់ភាពងាយស្រួល',
    exampleEn: 'Online shopping is very convenient for busy people.',
    exampleKh: 'ការទិញទំនិញតាមអ៊ីនធឺណិតគឺងាយស្រួលណាស់សម្រាប់មនុស្សរវល់។',
    category: 'daily-essential',
    level: 'A1-A2'
  },
  {
    id: 'daily-9',
    word: 'Reliable',
    phonetic: '/rɪˈlaɪ.ə.bəl/',
    partOfSpeech: 'adjective',
    definitionEn: 'Consistently good in quality or performance; able to be trusted.',
    meaningKh: 'គួរឱ្យទុកចិត្តបាន / ពឹងពាក់បាន',
    exampleEn: 'We need a reliable public transportation system in the city.',
    exampleKh: 'យើងត្រូវការប្រព័ន្ធដឹកជញ្ជូនសាធារណៈដែលគួរឱ្យទុកចិត្តបាននៅក្នុងទីក្រុង។',
    category: 'daily-essential',
    level: 'B1-B2'
  },
  {
    id: 'daily-10',
    word: 'Generous',
    phonetic: '/ˈdʒen.ər.əs/',
    partOfSpeech: 'adjective',
    definitionEn: 'Showing a readiness to give more of something, especially money or time, than is strictly necessary.',
    meaningKh: 'សប្បុរស / ចិត្តទូលាយ',
    exampleEn: 'She made a generous donation to the local school library.',
    exampleKh: 'នាងបានធ្វើការបរិច្ចាគយ៉ាងសប្បុរសដល់បណ្ណាល័យសាលាក្នុងតំបន់។',
    category: 'daily-essential',
    level: 'A1-A2'
  },
  // --- ADDITIONAL PHRASAL VERBS ---
  {
    id: 'pv-7',
    word: 'Figure out',
    phonetic: '/ˈfɪɡ.ər aʊt/',
    partOfSpeech: 'phrasal verb',
    definitionEn: 'To solve, understand, or find the answer to a problem after thinking.',
    meaningKh: 'ដោះស្រាយចេញ / យល់ច្បាស់ពីបញ្ហា',
    exampleEn: 'It took me a few hours to figure out how the software works.',
    exampleKh: 'ខ្ញុំបានចំណាយពេលពីរបីម៉ោងដើម្បីស្វែងយល់ពីរបៀបដំណើរការនៃកម្មវិធីនេះ។',
    category: 'phrasal-verbs',
    level: 'A1-A2'
  },
  {
    id: 'pv-8',
    word: 'Keep up with',
    phonetic: '/kiːp ʌp wɪð/',
    partOfSpeech: 'phrasal verb',
    definitionEn: 'To stay at the same level or pace as someone or something.',
    meaningKh: 'តាមឱ្យទាន់ / រក្សាជំហានឱ្យស្មើគ្នា',
    exampleEn: 'She reads the daily news to keep up with current technology trends.',
    exampleKh: 'នាងអានព័ត៌មានប្រចាំថ្ងៃដើម្បីតាមឱ្យទាន់និន្នាការបច្ចេកវិទ្យាបច្ចុប្បន្ន។',
    category: 'phrasal-verbs',
    level: 'B1-B2'
  },
  {
    id: 'pv-9',
    word: 'Look forward to',
    phonetic: '/lʊk ˈfɔː.wəd tuː/',
    partOfSpeech: 'phrasal verb',
    definitionEn: 'To feel excited and happy about something that is going to happen.',
    meaningKh: 'ទន្ទឹងរង់ចាំដោយក្តីរំភើប',
    exampleEn: 'I look forward to meeting you next week in Phnom Penh.',
    exampleKh: 'ខ្ញុំទន្ទឹងរង់ចាំជួបអ្នកនៅសប្តាហ៍ក្រោយនៅរាជធានីភ្នំពេញ។',
    category: 'phrasal-verbs',
    level: 'A1-A2'
  },
  // --- ADDITIONAL BUSINESS & CAREER ---
  {
    id: 'biz-5',
    word: 'Strategy',
    phonetic: '/ˈstræt.ə.dʒi/',
    partOfSpeech: 'noun',
    definitionEn: 'A plan of action designed to achieve a long-term or overall aim.',
    meaningKh: 'យុទ្ធសាស្ត្រ / ផែនការយុទ្ធសាស្ត្រ',
    exampleEn: 'Our company developed a new digital marketing strategy.',
    exampleKh: 'ក្រុមហ៊ុនរបស់យើងបានបង្កើតយុទ្ធសាស្ត្រទីផ្សារឌីជីថលថ្មីមួយ។',
    category: 'business',
    level: 'B1-B2'
  },
  {
    id: 'biz-6',
    word: 'Productivity',
    phonetic: '/ˌprɒd.ʌkˈtɪv.ə.ti/',
    partOfSpeech: 'noun',
    definitionEn: 'The effectiveness of productive effort, especially in industry.',
    meaningKh: 'ផលិតភាព / ប្រសិទ្ធភាពការងារ',
    exampleEn: 'Taking short breaks during study hours increases overall productivity.',
    exampleKh: 'ការឈប់សម្រាកខ្លីៗក្នុងអំឡុងពេលរៀនជួយបង្កើនផលិតភាពរួម។',
    category: 'business',
    level: 'B1-B2'
  },
  {
    id: 'biz-7',
    word: 'Leadership',
    phonetic: '/ˈliː.də.ʃɪp/',
    partOfSpeech: 'noun',
    definitionEn: 'The action of leading a group of people or an organization.',
    meaningKh: 'ភាពជាអ្នកដឹកនាំ / ភាពជាអ្នកគ្រប់គ្រង',
    exampleEn: 'Her strong leadership guided the team through challenging situations.',
    exampleKh: 'ភាពជាអ្នកដឹកនាំដ៏រឹងមាំរបស់នាងបានណែនាំក្រុមឱ្យឆ្លងផុតស្ថានភាពលំបាកៗ។',
    category: 'business',
    level: 'B1-B2'
  },
  // --- ADDITIONAL ACADEMIC WORDS ---
  {
    id: 'acad-7',
    word: 'Hypothesis',
    phonetic: '/haɪˈpɒθ.ə.sɪs/',
    partOfSpeech: 'noun',
    definitionEn: 'A proposed explanation made on the basis of limited evidence as a starting point for further investigation.',
    meaningKh: 'សម្មតិកម្ម / ការសន្មតបែបវិទ្យាសាស្ត្រ',
    exampleEn: 'The research experiment was designed to test the scientist’s hypothesis.',
    exampleKh: 'ការពិសោធន៍ស្រាវជ្រាវត្រូវបានរៀបចំឡើងដើម្បីផ្ទៀងផ្ទាត់សម្មតិកម្មរបស់អ្នកវិទ្យាសាស្ត្រ។',
    category: 'academic',
    level: 'C1-C2'
  },
  {
    id: 'acad-8',
    word: 'Methodology',
    phonetic: '/ˌmeθ.əˈdɒl.ə.dʒi/',
    partOfSpeech: 'noun',
    definitionEn: 'A system of methods used in a particular area of study or activity.',
    meaningKh: 'វិធីសាស្ត្រសាស្ត្រ / វិធីសាស្ត្រស្រាវជ្រាវ',
    exampleEn: 'The researcher clearly explained the methodology used in data collection.',
    exampleKh: 'អ្នកស្រាវជ្រាវបានពន្យល់យ៉ាងច្បាស់អំពីវិធីសាស្ត្រសាស្ត្រដែលបានប្រើក្នុងការប្រមូលទិន្នន័យ។',
    category: 'academic',
    level: 'C1-C2'
  }
];
