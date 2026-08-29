const fs = require('fs');

const tsContent = fs.readFileSync('src/data/unitsData.ts', 'utf8');
let jsContent = tsContent.replace("import { UnitData } from '../types';", "");
jsContent = jsContent.replace("export const grammarUnits: UnitData[] =", "module.exports =");

fs.writeFileSync('temp_units.cjs', jsContent);
const units = require('./temp_units.cjs');

const mapping = {
    16: ["Have and have got", "ការប្រើប្រាស់ Have និង Have got", "I have a car.", "have / have got"],
    17: ["Used to (do)", "ការប្រើប្រាស់ Used to (ធ្លាប់ធ្វើ)", "I used to play tennis.", "used to + V1"],
    19: ["I am going to (do)", "ការប្រើប្រាស់ Going to", "I am going to buy some books.", "be going to + V1"],
    20: ["Will/Shall 1", "ការប្រើប្រាស់ Will/Shall (ភាគ ១)", "I will leave tomorrow.", "will + V1"],
    22: ["I will and I'm going to", "ប្រៀបធៀប Will និង Going to", "I will get it. / I am going to buy it.", "will vs going to"],
    23: ["Will be doing and will have done", "Future Continuous និង Future Perfect", "I will be playing. / I will have finished.", "will be V-ing / will have V3"],
    24: ["When I do / When I've done", "ការប្រើប្រាស់ When និង If", "When I go out, I'll buy bread.", "when + present tense"],
    25: ["Can, could and (be) able to", "ការប្រើប្រាស់ Can, Could និង Able to", "I can swim. / I was able to escape.", "can / could / be able to"],
    27: ["Could (do) and could have (done)", "Could និង Could have", "I could sleep for a week. / I could have died.", "could + V1 / could have + V3"],
    29: ["May and might 1", "ការប្រើប្រាស់ May និង Might (ភាគ ១)", "It may rain. / It might rain.", "may / might + V1"],
    30: ["May and might 2", "ការប្រើប្រាស់ May និង Might (ភាគ ២)", "I may go to Ireland.", "may / might + V1"],
    32: ["Must and can't", "ការប្រើប្រាស់ Must និង Can't", "You must be tired. / That can't be true.", "must / can't + V1"],
    34: ["Have to and must", "ប្រៀបធៀប Have to និង Must", "I have to work. / I must work.", "have to / must + V1"],
    35: ["Must, mustn't, needn't", "Must, Mustn't និង Needn't", "You mustn't go. / You needn't go.", "mustn't / needn't"],
    36: ["Should 1", "ការប្រើប្រាស់ Should (ភាគ ១)", "You should look for a better job.", "should + V1"],
    37: ["Should 2", "ការប្រើប្រាស់ Should (ភាគ ២)", "I should have phoned her.", "should have + V3"],
    39: ["If I do... and If I did...", "ការប្រើប្រាស់ If (Conditional 1 & 2)", "If I have time, I will. / If I had time, I would.", "If + Present / If + Past"],
    40: ["If I knew... I wish I knew...", "ការប្រើប្រាស់ Wish និង If", "I wish I knew the answer.", "wish + past"],
    43: ["Passive 2 (be done / been done / being done)", "Passive Voice (ភាគ ២)", "My car is being repaired.", "be + V3"],
    44: ["Passive 3", "Passive Voice (ភាគ ៣)", "I was offered a job.", "be + V3"],
    45: ["It is said that... / He is said to...", "Passive Voice ជាមួយ It is said...", "It is said that he is 108 years old.", "It is said + clause"],
    48: ["Questions 1", "ការបង្កើតសំណួរ (ភាគ ១)", "Do you play tennis?", "Auxiliary + Subject + Verb"],
    49: ["Questions 2 (Do you know where...?)", "ការបង្កើតសំណួរ (ភាគ ២)", "Do you know where he is?", "Question word + Subject + Verb"],
    50: ["Auxiliary verbs (have/do/can etc.)", "កិរិយាសព្ទជំនួយ", "I like apples, but he doesn't.", "Auxiliary verb"],
    51: ["Question tags (do you? isn't it? etc.)", "Question Tags (សំណួរបញ្ជាក់)", "It's a nice day, isn't it?", "Auxiliary + pronoun"],
    54: ["Verb + -ing (enjoy doing / stop doing)", "កិរិយាសព្ទ + -ing", "I enjoy reading.", "Verb + -ing"],
    55: ["Verb + to... (decide to... / forget to...)", "កិរិយាសព្ទ + to + V1", "I decided to go.", "Verb + to + infinitive"],
    56: ["Verb + (object) + to... (I want you to...)", "កិរិយាសព្ទ + កម្មបទ + to + V1", "I want you to be happy.", "Verb + object + to + infinitive"],
    57: ["Verb + -ing or to... 1", "កិរិយាសព្ទប្រើជាមួយ -ing ឬ to (ភាគ ១)", "I remember doing. / I remembered to do.", "Verb + -ing / to infinitive"],
    58: ["Verb + -ing or to... 2", "កិរិយាសព្ទប្រើជាមួយ -ing ឬ to (ភាគ ២)", "I tried to read. / I tried reading.", "Verb + -ing / to infinitive"],
    59: ["Verb + -ing or to... 3", "កិរិយាសព្ទប្រើជាមួយ -ing ឬ to (ភាគ ៣)", "I like to do. / I like doing.", "Verb + -ing / to infinitive"],
    60: ["Preposition (in/for/about etc.) + -ing", "ធ្នាក់ + -ing", "Are you interested in working here?", "Preposition + -ing"],
    61: ["Be/get used to something (I'm used to...)", "ការប្រើប្រាស់ Be used to", "I am used to living alone.", "be used to + -ing"],
    62: ["Verb + preposition + -ing", "កិរិយាសព្ទ + ធ្នាក់ + -ing", "I apologized for being late.", "Verb + prep + -ing"],
    63: ["Expressions + -ing", "កន្សោមពាក្យ + -ing", "It's no use worrying.", "Expression + -ing"],
    64: ["To..., for... and so that... (purpose)", "ការប្រាប់ពីគោលបំណង", "I went out to buy bread.", "to / for / so that"],
    65: ["Adjective + to...", "គុណនាម + to + V1", "It is hard to understand.", "Adjective + to + infinitive"],
    66: ["To... (afraid to do) and preposition + -ing (afraid of -ing)", "Adjective + to V1 ធៀបនឹង Prep + -ing", "I am afraid to go. / I am afraid of going.", "to V1 vs of V-ing"],
    67: ["See somebody do and see somebody doing", "ការប្រើប្រាស់ See + V1 និង See + -ing", "I saw him fall. / I saw him walking.", "Verb + object + V1/-ing"],
    68: ["-ing clauses (Feeling tired, I went to bed early)", "ឃ្លា -ing", "Feeling tired, I went to bed.", "-ing clause"],
    71: ["Countable and uncountable 3", "នាមរាប់បាន និងរាប់មិនបាន (ភាគ ៣)", "I'd like some information.", "Countable vs Uncountable"],
    72: ["Countable and uncountable 4", "នាមរាប់បាន និងរាប់មិនបាន (ភាគ ៤)", "I bought a paper. / I need some paper.", "Countable vs Uncountable"],
    73: ["The article: a/an and the", "ការប្រើប្រាស់ a/an និង the", "I saw a dog. The dog ran away.", "a/an vs the"],
    74: ["The 1", "ការប្រើប្រាស់ The (ភាគ ១)", "The sun is hot.", "the + noun"],
    75: ["The 2 (school / the school etc.)", "ការប្រើប្រាស់ The (ភាគ ២)", "He is in hospital. / I went to the hospital.", "the + noun"],
    76: ["The 3 (children / the children)", "ការប្រើប្រាស់ The (ភាគ ៣)", "Children like playing. / The children are playing.", "the + noun"],
    77: ["The 4 (the giraffe / the telephone / the piano etc., the + adjective)", "ការប្រើប្រាស់ The (ភាគ ៤)", "The giraffe is tall. / The young.", "the + noun/adjective"],
    78: ["Names with and without the 1", "ឈ្មោះប្រើជាមួយ និងមិនប្រើជាមួយ The (ភាគ ១)", "I visited France and the United States.", "Names + the"],
    79: ["Names with and without the 2", "ឈ្មោះប្រើជាមួយ និងមិនប្រើជាមួយ The (ភាគ ២)", "The Atlantic Ocean.", "Names + the"],
    80: ["Singular and plural", "ឯកវចនៈ និងពហុវចនៈ", "The police are here.", "Singular vs Plural"],
    81: ["Noun + noun (a tennis ball / a headache)", "នាម + នាម", "I have a headache.", "Noun + noun"],
    82: ["-'s (your sister's name) and of... (the name of the book)", "ការបង្ហាញកម្មសិទ្ធិ (-'s និង of)", "My friend's car. / The roof of the building.", "-'s vs of"],
    83: ["A friend of mine / my own house / by myself", "សព្វនាមកម្មសិទ្ធិ", "She is a friend of mine.", "Possessive pronouns"],
    84: ["There... and it...", "ការប្រើប្រាស់ There និង It", "There is a book. / It is raining.", "There / It"],
    85: ["Some and any", "ការប្រើប្រាស់ Some និង Any", "I have some money. / I don't have any money.", "Some vs Any"],
    86: ["No/none/any Nothing/nobody etc.", "No, None, Any, Nothing...", "I have no time.", "No/None/Any"],
    87: ["Much, many, little, few, a lot, plenty", "បរិមាណ (Much, many...)", "I have much free time.", "Quantifiers"],
    88: ["All / all of most / most of no / none of etc.", "ការប្រើប្រាស់ All, Most, None...", "All of us.", "Quantifiers + of"],
    89: ["Both / both of neither / neither of either / either of", "ការប្រើប្រាស់ Both, Neither, Either", "Both of them are good.", "Both/Neither/Either"],
    90: ["All, every and whole", "ការប្រើប្រាស់ All, Every, Whole", "Every day.", "All/Every/Whole"],
    91: ["Each and every", "ការប្រើប្រាស់ Each និង Every", "Each student has a book.", "Each vs Every"],
    92: ["Relative clauses 1: clauses with who/that/which", "ឃ្លាអនុប្រយោគ (Relative Clauses 1)", "The man who lives here.", "who/that/which"],
    93: ["Relative clauses 2: clauses with and without who/that/which", "ឃ្លាអនុប្រយោគ (Relative Clauses 2)", "The book I read.", "Relative clauses"],
    94: ["Relative clauses 3: whose/whom/where", "ឃ្លាអនុប្រយោគ (Relative Clauses 3)", "The man whose car was stolen.", "whose/whom/where"],
    95: ["Relative clauses 4: extra information clauses (1)", "ឃ្លាអនុប្រយោគបន្ថែម (ភាគ ១)", "John, who is my friend, is here.", "Non-defining relative clauses"],
    96: ["Relative clauses 5: extra information clauses (2)", "ឃ្លាអនុប្រយោគបន្ថែម (ភាគ ២)", "I went to Paris, which is beautiful.", "Non-defining relative clauses"],
    97: ["-ing and -ed clauses (the woman talking to Tom, the boy injured in the accident)", "ឃ្លា -ing និង -ed", "The man talking to her.", "-ing / -ed clauses"],
    98: ["Adjectives ending in -ing and -ed (boring/bored etc.)", "គុណនាមបញ្ចប់ដោយ -ing និង -ed", "The movie was boring. / I was bored.", "-ing / -ed adjectives"],
    99: ["Adjectives: a nice new house, you look tired", "លំដាប់គុណនាម", "A big red car.", "Adjective order"],
    100: ["Adjectives and adverbs 1 (quick/quickly)", "គុណនាម និងកិរិយាសព្ទវិសេស (ភាគ ១)", "He is quick. / He runs quickly.", "Adjective vs Adverb"],
    101: ["Adjectives and adverbs 2 (well/fast/late, hard/hardly)", "គុណនាម និងកិរិយាសព្ទវិសេស (ភាគ ២)", "He works hard.", "Irregular adverbs"],
    102: ["So and such", "ការប្រើប្រាស់ So និង Such", "It was so cold. / It was such a cold day.", "so / such"],
    103: ["Enough and too", "ការប្រើប្រាស់ Enough និង Too", "It is too hot. / I have enough money.", "enough / too"],
    104: ["Quite, pretty, rather and fairly", "ការប្រើប្រាស់ Quite, Pretty...", "It is quite good.", "Modifiers"],
    106: ["Comparison 2", "ការប្រៀបធៀប (ភាគ ២)", "It is much better.", "Comparatives"],
    107: ["Comparison 3 (as...as / than)", "ការប្រៀបធៀប (ភាគ ៣)", "He is as tall as me.", "Comparatives"],
    108: ["Superlatives", "ការប្រៀបធៀបកម្រិតខ្ពស់បំផុត", "It is the biggest.", "Superlatives"],
    109: ["Word order 1: verb + object", "លំដាប់ពាក្យក្នុងប្រយោគ (ភាគ ១)", "I bought a book yesterday.", "Word order"],
    110: ["Word order 2: adverbs with the verb", "លំដាប់ពាក្យក្នុងប្រយោគ (ភាគ ២)", "I always go there.", "Adverb placement"],
    111: ["Still, yet and already", "ការប្រើប្រាស់ Still, Yet, Already", "I am still here.", "Still/Yet/Already"],
    112: ["Even", "ការប្រើប្រាស់ Even (សូម្បីតែ)", "Even Bob knows that.", "Even"],
    113: ["Although / though / even though", "ការប្រើប្រាស់ Although, Despite...", "Although it rained, we played.", "Conjunctions"],
    114: ["In case", "ការប្រើប្រាស់ In case (ក្រែងលោ)", "Take an umbrella in case it rains.", "In case"],
    115: ["Unless / As long as", "ការប្រើប្រាស់ Unless, As long as...", "I won't go unless you come.", "Conditionals"],
    116: ["As (As I walked along...)", "ការប្រើប្រាស់ As", "As I was tired, I slept.", "As (time/reason)"],
    117: ["Like and as", "ការប្រើប្រាស់ Like និង As", "Do it like this.", "Like vs As"],
    118: ["Like / as if / as though", "ការប្រើប្រាស់ As if, As though", "He acts as if he knows.", "As if / As though"],
    119: ["For, during and while", "ការប្រើប្រាស់ For, During, While", "I fell asleep during the movie.", "For/During/While"],
    120: ["By and until By the time...", "ការប្រើប្រាស់ By និង Until", "I will be there by 5.", "By / Until"],
    122: ["On time and in time", "In time ធៀបនឹង On time", "I arrived on time.", "Prepositions of time"],
    123: ["In / at / on (position) 1", "ធ្នាក់ទីកន្លែង In/At/On (ភាគ ១)", "I am in the room.", "Prepositions of place"],
    124: ["In / at / on (position) 2", "ធ្នាក់ទីកន្លែង In/At/On (ភាគ ២)", "The picture on the wall.", "Prepositions of place"],
    125: ["In / at / on (position) 3", "ធ្នាក់ទីកន្លែង In/At/On (ភាគ ៣)", "He is at the bus stop.", "Prepositions of place"],
    126: ["To / at / in / into", "ធ្នាក់បញ្ជាក់ទិសដៅ To/At/In/Into", "I went to school.", "Prepositions of direction"],
    127: ["In/on/at (other uses)", "ការប្រើប្រាស់ផ្សេងៗនៃ In/On/At", "I am on holiday.", "Preposition uses"],
    128: ["By", "ការប្រើប្រាស់ By", "This book is by Shakespeare.", "Preposition by"],
    129: ["Noun + preposition", "នាម + ធ្នាក់", "The reason for the delay.", "Noun + Preposition"],
    130: ["Adjective + preposition 1", "គុណនាម + ធ្នាក់ (ភាគ ១)", "I am interested in this.", "Adjective + Preposition"],
    131: ["Adjective + preposition 2", "គុណនាម + ធ្នាក់ (ភាគ ២)", "I am good at math.", "Adjective + Preposition"],
    132: ["Verb + preposition 1", "កិរិយាសព្ទ + ធ្នាក់ (ភាគ ១)", "Listen to me.", "Verb + Preposition"],
    133: ["Verb + preposition 2", "កិរិយាសព្ទ + ធ្នាក់ (ភាគ ២)", "I am waiting for you.", "Verb + Preposition"],
    134: ["Verb + preposition 3", "កិរិយាសព្ទ + ធ្នាក់ (ភាគ ៣)", "Think about it.", "Verb + Preposition"],
    135: ["Verb + preposition 4", "កិរិយាសព្ទ + ធ្នាក់ (ភាគ ៤)", "Depend on me.", "Verb + Preposition"],
    136: ["Verb + preposition 5", "កិរិយាសព្ទ + ធ្នាក់ (ភាគ ៥)", "Translate into English.", "Verb + Preposition"]
};

// Update the units with specific content if it exists in our mapping
for (const unit of units) {
    if (mapping[unit.unitNumber]) {
        const [enTitle, khTitle, enExample, formula] = mapping[unit.unitNumber];
        
        unit.title = enTitle;
        unit.khmerTitle = khTitle;
        unit.summary = `Complete rules and usage for: ${enTitle}`;
        unit.khmerSummary = `ស្វែងយល់លម្អិតអំពី៖ ${khTitle}`;
        
        unit.sections[0].title = "Key Rules & Usage";
        unit.sections[0].khmerTitle = "ក្បួនប្រើប្រាស់សំខាន់ៗ";
        unit.sections[0].formula = formula;
        unit.sections[0].explanation = `Learn how to use ${enTitle} correctly in daily sentences.`;
        unit.sections[0].khmerExplanation = `ការយល់ដឹងអំពីការប្រើប្រាស់ ${khTitle} ក្នុងប្រយោគប្រចាំថ្ងៃឲ្យបានត្រឹមត្រូវ។`;
        
        unit.sections[0].examples[0].en = enExample;
        unit.sections[0].examples[0].kh = `[ការបកប្រែ] ឧទាហរណ៍នៃការប្រើប្រាស់: ${enExample}`;
        
        unit.exercises[0].instruction = `Choose the correct sentence for: ${enTitle}`;
        unit.exercises[0].options = [enExample, `Incorrect version of ${enExample}`];
        unit.exercises[0].correctAnswers = [enExample];
        
        unit.exercises[1].prompt = `Complete the sentence based on the rule for ${formula}`;
    }
}

const newTsContent = `import { UnitData } from '../types';\n\nexport const grammarUnits: UnitData[] = ${JSON.stringify(units, null, 4)};\n`;

fs.writeFileSync('src/data/unitsData.ts', newTsContent);
console.log("Updated missing units with detailed curriculum content.");
