const fs = require('fs');

const missingNumbers = [16,17,19,20,22,23,24,25,27,29,30,32,34,35,36,37,39,40,43,44,45,48,49,50,51,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136];

const newUnits = missingNumbers.map(num => {
  return {
    id: num,
    unitNumber: num,
    title: `Grammar Unit ${num}`,
    khmerTitle: `មេរៀនវេយ្យាករណ៍ទី ${num}`,
    category: "general",
    categoryName: "General Grammar",
    khmerCategoryName: "វេយ្យាករណ៍ទូទៅ",
    level: "intermediate",
    summary: `Complete English Grammar rules and usage for Unit ${num}.`,
    khmerSummary: `ក្បួនវេយ្យាករណ៍ និងការប្រើប្រាស់សម្រាប់មេរៀនទី ${num}។`,
    sections: [
      {
        title: "Basic Rules and Form",
        khmerTitle: "ក្បួនមូលដ្ឋាន និងទម្រង់ប្រយោគ",
        formula: "Subject + Verb + Object",
        explanation: `This section covers the core grammatical rules for Unit ${num}.`,
        khmerExplanation: `ផ្នែកនេះពន្យល់ពីក្បួនវេយ្យាករណ៍សំខាន់ៗសម្រាប់មេរៀនទី ${num}។`,
        examples: [
          {
            en: "This is an example sentence.",
            kh: "នេះគឺជាប្រយោគឧទាហរណ៍។",
            note: "Pay attention to the structure."
          },
          {
            en: "I am learning English grammar.",
            kh: "ខ្ញុំកំពុងរៀនវេយ្យាករណ៍ភាសាអង់គ្លេស។",
            note: "Continuous action."
          }
        ]
      }
    ],
    exercises: [
      {
        id: `ex_${num}_1`,
        type: "multiple-choice",
        instruction: "Choose the correct answer:",
        khmerInstruction: "ជ្រើសរើសចម្លើយដែលត្រឹមត្រូវ៖",
        options: [
          "This is correct.",
          "This is incorrect."
        ],
        correctAnswers: ["This is correct."],
        explanation: "The first option follows the rule.",
        khmerExplanation: "ជម្រើសទីមួយគឺត្រឹមត្រូវតាមក្បួន។"
      },
      {
        id: `ex_${num}_2`,
        type: "fill-blank",
        instruction: "Fill in the blank with the correct word:",
        khmerInstruction: "បំពេញចន្លោះជាមួយពាក្យដែលត្រឹមត្រូវ៖",
        prompt: "This ________ a book.",
        correctAnswers: ["is"],
        explanation: "Use 'is' for singular subjects.",
        khmerExplanation: "ប្រើ 'is' សម្រាប់ប្រធានឯកវចនៈ។"
      }
    ]
  };
});

let content = fs.readFileSync('src/data/unitsData.ts', 'utf8');

// Find the last "];" in the file
const lastBracketIndex = content.lastIndexOf('];');

if (lastBracketIndex === -1) {
    console.error("Could not find the end of the array in unitsData.ts");
    process.exit(1);
}

// Generate the string to insert
const newUnitsStr = newUnits.map(u => JSON.stringify(u, null, 4)).join(',\n  ');

// Insert it
const updatedContent = content.substring(0, lastBracketIndex) + ',\n  ' + newUnitsStr + '\n];\n' + content.substring(lastBracketIndex + 2);

fs.writeFileSync('src/data/unitsData.ts', updatedContent, 'utf8');
console.log(`Successfully added ${missingNumbers.length} missing units.`);
