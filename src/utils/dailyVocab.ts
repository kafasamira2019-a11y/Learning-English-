import { vocabularyList, regularVerbsList, VocabItem, RegularVerbItem } from '../data/vocabularyData';
import { irregularVerbsList } from '../data/irregularVerbs';
import { IrregularVerb } from '../types';

export interface DailyVocabPackage {
  date: Date;
  dateKey: string; // YYYY-MM-DD
  khmerDateString: string;
  englishDateString: string;
  dayIndex: number;
  wordOfTheDay: VocabItem;
  dailySet: VocabItem[];
  dailyRegularVerb: RegularVerbItem;
  dailyIrregularVerb: IrregularVerb;
  dailyPhrasalVerb: VocabItem;
  dailyIdiom: VocabItem;
  timeUntilNextUpdate: {
    hours: number;
    minutes: number;
    seconds: number;
  };
}

const KHMER_DAYS = ['ថ្ងៃអាទិត្យ', 'ថ្ងៃច័ន្ទ', 'ថ្ងៃអង្គារ', 'ថ្ងៃពុធ', 'ថ្ងៃព្រហស្បតិ៍', 'ថ្ងៃសុក្រ', 'ថ្ងៃសៅរ៍'];
const KHMER_MONTHS = ['មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា', 'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'];

export function toKhmerNumber(num: number | string): string {
  const khmerDigits = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
  return num.toString().replace(/\d/g, (d) => khmerDigits[parseInt(d, 10)]);
}

export function formatKhmerDate(date: Date): string {
  const dayName = KHMER_DAYS[date.getDay()];
  const dayNum = toKhmerNumber(date.getDate());
  const monthName = KHMER_MONTHS[date.getMonth()];
  const yearNum = toKhmerNumber(date.getFullYear());
  return `${dayName} ទី${dayNum} ខែ${monthName} ឆ្នាំ${yearNum}`;
}

export function formatEnglishDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Calculates a deterministic daily index from any given Date
 */
export function getDayIndex(date: Date): number {
  const utcDate = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const baseEpoch = Date.UTC(2026, 0, 1);
  const diffDays = Math.floor((utcDate - baseEpoch) / (1000 * 60 * 60 * 24));
  return Math.abs(diffDays);
}

/**
 * Calculates time remaining until next 00:00:00 midnight
 */
export function getTimeUntilMidnight(date: Date = new Date()): { hours: number; minutes: number; seconds: number } {
  const nextMidnight = new Date(date);
  nextMidnight.setHours(24, 0, 0, 0);
  const diffMs = Math.max(0, nextMidnight.getTime() - date.getTime());
  
  const totalSeconds = Math.floor(diffMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  return { hours, minutes, seconds };
}

/**
 * Builds the comprehensive Daily Vocabulary package for any target Date
 */
export function getDailyVocabPackage(targetDate: Date = new Date()): DailyVocabPackage {
  const dayIdx = getDayIndex(targetDate);
  const year = targetDate.getFullYear();
  const month = String(targetDate.getMonth() + 1).padStart(2, '0');
  const day = String(targetDate.getDate()).padStart(2, '0');
  const dateKey = `${year}-${month}-${day}`;

  // 1. Pick Word of the Day (guaranteed unique selection daily)
  const totalVocab = vocabularyList.length;
  const wotdIndex = (dayIdx * 7 + 3) % totalVocab;
  const wordOfTheDay = vocabularyList[wotdIndex] || vocabularyList[0];

  // 2. Filter categorized subsets for guaranteed diversity
  const essentials = vocabularyList.filter(v => v.category === 'daily-essential');
  const academics = vocabularyList.filter(v => v.category === 'academic');
  const phrasals = vocabularyList.filter(v => v.category === 'phrasal-verbs');
  const business = vocabularyList.filter(v => v.category === 'business');
  const idioms = vocabularyList.filter(v => v.category === 'idioms');

  const dailyEssential1 = essentials[(dayIdx * 3) % essentials.length] || vocabularyList[1];
  const dailyEssential2 = essentials[(dayIdx * 3 + 1) % essentials.length] || vocabularyList[2];
  const dailyAcademic = academics[(dayIdx * 2 + 1) % academics.length] || vocabularyList[3];
  const dailyPhrasal = phrasals[(dayIdx * 2) % phrasals.length] || vocabularyList[4];
  const dailyBusiness = business[(dayIdx * 2) % business.length] || vocabularyList[5];
  const dailyIdiom = idioms[(dayIdx) % idioms.length] || vocabularyList[6];

  // 3. Assemble Daily Set of 6 structured words for today
  const rawSet = [
    wordOfTheDay,
    dailyEssential1,
    dailyEssential2,
    dailyPhrasal,
    dailyAcademic,
    dailyBusiness,
    dailyIdiom
  ];

  // De-duplicate in case of any overlaps
  const seenIds = new Set<string>();
  const dailySet: VocabItem[] = [];
  for (const item of rawSet) {
    if (item && !seenIds.has(item.id)) {
      seenIds.add(item.id);
      dailySet.push(item);
    }
  }

  // 4. Daily Regular Verb
  const regVerbIdx = (dayIdx * 5 + 1) % regularVerbsList.length;
  const dailyRegularVerb = regularVerbsList[regVerbIdx] || regularVerbsList[0];

  // 5. Daily Irregular Verb
  const irregVerbIdx = (dayIdx * 3 + 2) % irregularVerbsList.length;
  const dailyIrregularVerb = irregularVerbsList[irregVerbIdx] || irregularVerbsList[0];

  return {
    date: targetDate,
    dateKey,
    khmerDateString: formatKhmerDate(targetDate),
    englishDateString: formatEnglishDate(targetDate),
    dayIndex: dayIdx,
    wordOfTheDay,
    dailySet,
    dailyRegularVerb,
    dailyIrregularVerb,
    dailyPhrasalVerb: dailyPhrasal,
    dailyIdiom,
    timeUntilNextUpdate: getTimeUntilMidnight(new Date())
  };
}
