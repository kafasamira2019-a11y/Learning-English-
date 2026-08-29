const fs = require('fs');

const tsContent = fs.readFileSync('src/data/unitsData.ts', 'utf8');

let jsContent = tsContent.replace("import { UnitData } from '../types';", "");
jsContent = jsContent.replace("export const grammarUnits: UnitData[] =", "module.exports =");

fs.writeFileSync('temp_units.cjs', jsContent);

const units = require('./temp_units.cjs');

units.sort((a, b) => a.unitNumber - b.unitNumber);

const newTsContent = `import { UnitData } from '../types';

export const grammarUnits: UnitData[] = ${JSON.stringify(units, null, 2)};
`;

fs.writeFileSync('src/data/unitsData.ts', newTsContent);
console.log("Units sorted successfully.");
