import { Filter } from 'bad-words'

// Create filter instance with default English bad words
const filter = new Filter()

// Add German bad words and variations
const germanBadWords = [
  // German profanity
  'scheiße', 'scheisse', 'scheiß', 'scheiss', 'arsch', 'arschloch', 
  'fick', 'ficken', 'gefickt', 'ficker', 'hurensohn', 'hure', 'nutte',
  'wichser', 'wichsen', 'schwanz', 'fotze', 'möse', 'titten',
  'bastard', 'missgeburt', 'spast', 'spasti', 'behindert', 'mongo',
  'schwuchtel', 'lesbe', 'schwul', 'gay', // used as insults
  'nazi', 'hitler', 'heil', 'sieg',
  'kanake', 'neger', 'nigger', 'nigga',
  
  // Common leetspeak/obfuscation patterns
  'f1ck', 'f!ck', 'fvck', 'phuck', 'fuk', 'fck',
  'sh1t', 'sh!t', 'sht', 'schit',
  'a55', 'a$$', '@ss', '@$$',
  'b1tch', 'b!tch', 'biatch',
  'd1ck', 'd!ck', 'dik', 'dikk',
  'c0ck', 'c0k', 'kok',
  'pr0n', 'p0rn',
  'cum', 'c0m', 'kum',
  'fag', 'f@g', 'phag',
  'slut', 'sl0t', 'wh0re', 'whore',
  
  // Hate symbols (text representations)
  '卐', '卍', '☭', 
  
  // Additional offensive terms
  'retard', 'retarded', 'rape', 'raping', 'rapist',
  'kys', 'kill yourself', 'suicide',
  'pedo', 'pedophile', 'pädophil',
  
  // Drug references (optional, can be removed if too strict)
  'cocaine', 'heroin', 'meth', 'crack',
]

// Add custom words to filter
filter.addWords(...germanBadWords)

// Blocked Unicode ranges and symbols
const blockedSymbols = [
  '\u534D', // 卍 Swastika
  '\u5350', // 卐 Swastika variant
  '\u262D', // ☭ Hammer and sickle
  '\u0FD5', // ࿕ Right-facing svastika
  '\u0FD6', // ࿖ Left-facing svastika  
  '\u0FD7', // ࿗ Right-facing svastika with dots
  '\u0FD8', // ࿘ Left-facing svastika with dots
]

// Normalize text for better detection
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    // Replace common substitutions
    .replace(/0/g, 'o')
    .replace(/1/g, 'i')
    .replace(/3/g, 'e')
    .replace(/4/g, 'a')
    .replace(/5/g, 's')
    .replace(/7/g, 't')
    .replace(/8/g, 'b')
    .replace(/@/g, 'a')
    .replace(/\$/g, 's')
    .replace(/!/g, 'i')
    .replace(/\|/g, 'i')
    .replace(/\+/g, 't')
    // Remove spaces between letters (s p a c e d out words)
    .replace(/(.)\s+(?=.)/g, '$1')
    // Remove repeated characters (fuuuck -> fuck)
    .replace(/(.)\1{2,}/g, '$1$1')
}

// Check for blocked symbols
function containsBlockedSymbols(text: string): boolean {
  return blockedSymbols.some(symbol => text.includes(symbol))
}

// Check for patterns that look like hate symbols made with text
function containsHatePatterns(text: string): boolean {
  const hatePatterns = [
    /h+\s*e+\s*i+\s*l+/i,  // h e i l
    /s+\s*i+\s*e+\s*g+/i,  // s i e g
    /1+\s*4+\s*8+\s*8+/,   // 1488
    /8+\s*8+/,             // 88 (hate symbol)
    /1+\s*4+\s*w+/i,       // 14 words
  ]
  
  return hatePatterns.some(pattern => pattern.test(text))
}

export interface FilterResult {
  isClean: boolean
  cleanedText: string
  wasFiltered: boolean
}

export function filterContent(text: string): FilterResult {
  // Empty text is always clean
  if (!text || text.trim() === '') {
    return { isClean: true, cleanedText: '', wasFiltered: false }
  }
  
  // Check for blocked symbols
  if (containsBlockedSymbols(text)) {
    return { isClean: false, cleanedText: '', wasFiltered: true }
  }
  
  // Check for hate patterns
  if (containsHatePatterns(text)) {
    return { isClean: false, cleanedText: '', wasFiltered: true }
  }
  
  // Normalize and check with bad-words filter
  const normalized = normalizeText(text)
  
  try {
    if (filter.isProfane(text) || filter.isProfane(normalized)) {
      return { isClean: false, cleanedText: '', wasFiltered: true }
    }
  } catch {
    // If filter fails, allow the text but log
    console.warn('Content filter check failed for:', text)
  }
  
  return { isClean: true, cleanedText: text, wasFiltered: false }
}

// Quick check function
export function isContentClean(text: string): boolean {
  return filterContent(text).isClean
}

export default { filterContent, isContentClean }
