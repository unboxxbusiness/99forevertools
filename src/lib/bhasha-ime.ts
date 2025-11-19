/**
 * BhaSha IME - Free & Open Source Indian Language Typing Engine
 * A powerful, lightweight transliteration engine for 23+ Indian languages
 * 
 * @license MIT
 * @version 2.0.0
 */

export type BhaShaLang = 
  // Indo-Aryan (Devanagari)
  | 'hi' | 'mr' | 'ne' | 'sa' | 'kok' | 'mai' | 'bho'
  // Gujarati
  | 'gu'
  // Bengali-Assamese
  | 'bn' | 'as'
  // Punjabi
  | 'pa'
  // Odia
  | 'or'
  // Dravidian
  | 'ta' | 'te' | 'kn' | 'ml'
  // Urdu
  | 'ur'
  // Kashmiri
  | 'ks'
  // Sindhi
  | 'sd'
  // Sinhala
  | 'si'
  // Manipuri
  | 'mni'
  // Santali (Ol Chiki)
  | 'sat'
  // Bodo & Dogri
  | 'brx' | 'doi';

export interface LanguageInfo {
  code: BhaShaLang;
  name: string;
  nativeName: string;
  script: string;
  family: string;
}

export const LANGUAGES: LanguageInfo[] = [
  // Indo-Aryan (Devanagari)
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', script: 'Devanagari', family: 'Indo-Aryan' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', script: 'Devanagari', family: 'Indo-Aryan' },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', script: 'Devanagari', family: 'Indo-Aryan' },
  { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्', script: 'Devanagari', family: 'Indo-Aryan' },
  { code: 'kok', name: 'Konkani', nativeName: 'कोंकणी', script: 'Devanagari', family: 'Indo-Aryan' },
  { code: 'mai', name: 'Maithili', nativeName: 'मैथिली', script: 'Devanagari', family: 'Indo-Aryan' },
  { code: 'bho', name: 'Bhojpuri', nativeName: 'भोजपुरी', script: 'Devanagari', family: 'Indo-Aryan' },
  { code: 'brx', name: 'Bodo', nativeName: 'बर\'', script: 'Devanagari', family: 'Sino-Tibetan' },
  { code: 'doi', name: 'Dogri', nativeName: 'डोगरी', script: 'Devanagari', family: 'Indo-Aryan' },
  
  // Gujarati
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', script: 'Gujarati', family: 'Indo-Aryan' },
  
  // Bengali-Assamese
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', script: 'Bengali', family: 'Indo-Aryan' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', script: 'Bengali', family: 'Indo-Aryan' },
  { code: 'mni', name: 'Manipuri', nativeName: 'মৈতৈলোন্', script: 'Bengali/Meitei Mayek', family: 'Sino-Tibetan' },
  
  // Punjabi
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', script: 'Gurmukhi', family: 'Indo-Aryan' },
  
  // Odia
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', script: 'Odia', family: 'Indo-Aryan' },
  
  // Dravidian
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', script: 'Tamil', family: 'Dravidian' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', script: 'Telugu', family: 'Dravidian' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', script: 'Kannada', family: 'Dravidian' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', script: 'Malayalam', family: 'Dravidian' },
  
  // Perso-Arabic
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', script: 'Perso-Arabic', family: 'Indo-Aryan' },
  { code: 'ks', name: 'Kashmiri', nativeName: 'کٲشُر', script: 'Perso-Arabic', family: 'Indo-Aryan' },
  { code: 'sd', name: 'Sindhi', nativeName: 'سنڌي', script: 'Perso-Arabic', family: 'Indo-Aryan' },
  
  // Sinhala
  { code: 'si', name: 'Sinhala', nativeName: 'සිංහල', script: 'Sinhala', family: 'Indo-Aryan' },
  
  // Santali (Ol Chiki)
  { code: 'sat', name: 'Santali', nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ', script: 'Ol Chiki', family: 'Austroasiatic' },
];

export type BhaShaOptions = {
  autoConjuncts?: boolean;
  transliterateDigits?: boolean;
};

type ScriptMap = {
  cons: Record<string, string>;
  vowels: Record<string, string>;
  matra: Record<string, string>;
  signs: { anusvara: string; visarga: string; virama: string };
  digits: string[];
};

const VOWEL_KEYS = ['ai','au','aa','ee','ii','oo','uu','ri','rri','lri','a','i','u','e','o'] as const;

// Script definitions
const DEVANAGARI: ScriptMap = {
  cons: {
    ksh:'क्ष', tr:'त्र', jn:'ज्ञ', shr:'श्र',
    kh:'ख', gh:'घ', ch:'छ', chh:'छ', jh:'झ', th:'थ', dh:'ध', ph:'फ', bh:'भ', sh:'श', shh:'ष',
    nj:'ञ्ज', ng:'ङ्ग',
    k:'क', g:'ग', c:'च', j:'ज', t:'त', T:'ट', d:'द', D:'ड', n:'न', N:'ण', p:'प', b:'ब', m:'म',
    y:'य', r:'र', l:'ल', v:'व', w:'व', s:'स', h:'ह',
    R:'ड़', Rh:'ढ़', q:'क़', f:'फ़', z:'ज़', x:'क्स',
  },
  vowels: { ai:'ऐ', au:'औ', aa:'आ', ee:'ई', ii:'ई', oo:'ऊ', uu:'ऊ', ri:'ऋ', rri:'ॠ', lri:'ऌ', a:'अ', i:'इ', u:'उ', e:'ए', o:'ओ' },
  matra: { a:'', aa:'ा', i:'ि', ii:'ी', ee:'ी', u:'ु', uu:'ू', oo:'ू', e:'े', ai:'ै', o:'ो', au:'ौ', ri:'ृ', rri:'ॄ', lri:'ॢ' },
  signs: { anusvara:'ं', visarga:'ः', virama:'्' },
  digits: ['०','१','२','३','४','५','६','७','८','९'],
};

const GUJARATI: ScriptMap = {
  cons: {
    ksh:'ક્ષ', tr:'ત્ર', jn:'જ્ઞ',
    kh:'ખ', gh:'ઘ', ch:'છ', chh:'છ', jh:'ઝ', th:'થ', dh:'ધ', ph:'ફ', bh:'ભ', sh:'શ', shh:'ષ',
    k:'ક', g:'ગ', c:'ચ', j:'જ', t:'ત', T:'ટ', d:'દ', D:'ડ', n:'ન', N:'ણ', p:'પ', b:'બ', m:'મ',
    y:'ય', r:'ર', l:'લ', v:'વ', w:'વ', s:'સ', h:'હ', x:'ક્સ',
  },
  vowels: { ai:'ઐ', au:'ઔ', aa:'આ', ee:'ઈ', ii:'ઈ', oo:'ઊ', uu:'ઊ', ri:'ઋ', a:'અ', i:'ઇ', u:'ઉ', e:'એ', o:'ઓ' },
  matra: { a:'', aa:'ા', i:'િ', ii:'ી', ee:'ી', u:'ુ', uu:'ૂ', oo:'ૂ', e:'ે', ai:'ૈ', o:'ો', au:'ૌ', ri:'ૃ' },
  signs: { anusvara:'ં', visarga:'ઃ', virama:'્' },
  digits: ['૦','૧','૨','૩','૪','૫','૬','૭','૮','૯'],
};

const BENGALI: ScriptMap = {
  cons: {
    ksh:'ক্ষ', tr:'ত্র', jn:'জ্ঞ',
    kh:'খ', gh:'ঘ', ch:'ছ', chh:'ছ', jh:'ঝ', th:'থ', dh:'ধ', ph:'ফ', bh:'ভ', sh:'শ', shh:'ষ',
    k:'ক', g:'গ', c:'চ', j:'জ', t:'ত', T:'ট', d:'দ', D:'ড', n:'ন', N:'ণ', p:'প', b:'ব', m:'ম',
    y:'য', r:'র', l:'ল', v:'ভ', w:'ভ', s:'স', h:'হ', R:'ড়', Rh:'ঢ়', x:'ক্স',
  },
  vowels: { ai:'ঐ', au:'ঔ', aa:'আ', ee:'ঈ', ii:'ঈ', oo:'ঊ', uu:'ঊ', ri:'ঋ', a:'অ', i:'ই', u:'উ', e:'এ', o:'ও' },
  matra: { a:'', aa:'া', i:'ি', ii:'ী', ee:'ী', u:'ু', uu:'ূ', oo:'ূ', e:'ে', ai:'ৈ', o:'ো', au:'ৌ', ri:'ৃ' },
  signs: { anusvara:'ং', visarga:'ঃ', virama:'্' },
  digits: ['০','১','২','৩','৪','৫','৬','৭','৮','৯'],
};

const GURMUKHI: ScriptMap = {
  cons: {
    kh:'ਖ', gh:'ਘ', ch:'ਛ', chh:'ਛ', jh:'ਝ', th:'ਥ', dh:'ਧ', ph:'ਫ', bh:'ਭ', sh:'ਸ਼',
    k:'ਕ', g:'ਗ', c:'ਚ', j:'ਜ', t:'ਤ', T:'ਟ', d:'ਦ', D:'ਡ', n:'ਨ', N:'ਣ', p:'ਪ', b:'ਬ', m:'ਮ',
    y:'ਯ', r:'ਰ', l:'ਲ', v:'ਵ', w:'ਵ', s:'ਸ', h:'ਹ', z:'ਜ਼', f:'ਫ਼',
  },
  vowels: { ai:'ਐ', au:'ਔ', aa:'ਆ', ee:'ਈ', ii:'ਈ', oo:'ਊ', uu:'ਊ', a:'ਅ', i:'ਇ', u:'ਉ', e:'ਏ', o:'ਓ' },
  matra: { a:'', aa:'ਾ', i:'ਿ', ii:'ੀ', ee:'ੀ', u:'ੁ', uu:'ੂ', oo:'ੂ', e:'ੇ', ai:'ੈ', o:'ੋ', au:'ੌ' },
  signs: { anusvara:'ਂ', visarga:'ਃ', virama:'੍' },
  digits: ['੦','੧','੨','੩','੪','੫','੬','੭','੮','੯'],
};

const ODIA: ScriptMap = {
  cons: {
    ksh:'କ୍ଷ', tr:'ତ୍ର', jn:'ଜ୍ଞ',
    kh:'ଖ', gh:'ଘ', ch:'ଛ', chh:'ଛ', jh:'ଝ', th:'ଥ', dh:'ଧ', ph:'ଫ', bh:'ଭ', sh:'ଶ', shh:'ଷ',
    k:'କ', g:'ଗ', c:'ଚ', j:'ଜ', t:'ତ', T:'ଟ', d:'ଦ', D:'ଡ', n:'ନ', N:'ଣ', p:'ପ', b:'ବ', m:'ମ',
    y:'ଯ', r:'ର', l:'ଲ', v:'ୱ', w:'ୱ', s:'ସ', h:'ହ', R:'ଡ଼', Rh:'ଢ଼',
  },
  vowels: { ai:'ଐ', au:'ଔ', aa:'ଆ', ee:'ଈ', ii:'ଈ', oo:'ଊ', uu:'ଊ', ri:'ଋ', a:'ଅ', i:'ଇ', u:'ଉ', e:'ଏ', o:'ଓ' },
  matra: { a:'', aa:'ା', i:'ି', ii:'ୀ', ee:'ୀ', u:'ୁ', uu:'ୂ', oo:'ୂ', e:'େ', ai:'ୈ', o:'ୋ', au:'ୌ', ri:'ୃ' },
  signs: { anusvara:'ଂ', visarga:'ଃ', virama:'୍' },
  digits: ['୦','୧','୨','୩','୪','୫','୬','୭','୮','୯'],
};

const TAMIL: ScriptMap = {
  cons: {
    ksh:'க்ஷ', tr:'த்ர', jn:'ஜ்ஞ', shr:'ஶ்ர',
    ch:'ச', chh:'ச', sh:'ஶ', shh:'ஷ',
    k:'க', g:'க', c:'ச', j:'ஜ', t:'த', T:'ட', d:'த', D:'ட', n:'ந', N:'ண', p:'ப', b:'ப', m:'ம',
    y:'ய', r:'ர', l:'ல', v:'வ', w:'வ', s:'ஸ', h:'ஹ', z:'ழ', L:'ள', R:'ற', zh:'ழ',
  },
  vowels: { ai:'ஐ', au:'ஔ', aa:'ஆ', ee:'ஈ', ii:'ஈ', oo:'ஊ', uu:'ஊ', a:'அ', i:'இ', u:'உ', e:'எ', o:'ஒ' },
  matra: { a:'', aa:'ா', i:'ி', ii:'ீ', ee:'ீ', u:'ு', uu:'ூ', oo:'ூ', e:'ெ', ai:'ை', o:'ொ', au:'ௌ' },
  signs: { anusvara:'ஂ', visarga:'ஃ', virama:'்' },
  digits: ['௦','௧','௨','௩','௪','௫','௬','௭','௮','௯'],
};

const TELUGU: ScriptMap = {
  cons: {
    ksh:'క్ష', tr:'త్ర', jn:'జ్ఞ',
    kh:'ఖ', gh:'ఘ', ch:'ఛ', chh:'ఛ', jh:'ఝ', th:'థ', dh:'ధ', ph:'ఫ', bh:'భ', sh:'శ', shh:'ష',
    k:'క', g:'గ', c:'చ', j:'జ', t:'త', T:'ట', d:'ద', D:'డ', n:'న', N:'ణ', p:'ప', b:'బ', m:'మ',
    y:'య', r:'ర', l:'ల', v:'వ', w:'వ', s:'స', h:'హ', R:'ఱ', L:'ళ',
  },
  vowels: { ai:'ఐ', au:'ఔ', aa:'ఆ', ee:'ఈ', ii:'ఈ', oo:'ఊ', uu:'ఊ', ri:'ఋ', rri:'ౠ', lri:'ఌ', a:'అ', i:'ఇ', u:'ఉ', e:'ఎ', o:'ఒ' },
  matra: { a:'', aa:'ా', i:'ి', ii:'ీ', ee:'ీ', u:'ు', uu:'ూ', oo:'ూ', e:'ె', ai:'ై', o:'ొ', au:'ౌ', ri:'ృ', rri:'ౄ', lri:'ౢ' },
  signs: { anusvara:'ం', visarga:'ః', virama:'్' },
  digits: ['౦','౧','౨','౩','౪','౫','౬','౭','౮','౯'],
};

const KANNADA: ScriptMap = {
  cons: {
    ksh:'ಕ್ಷ', tr:'ತ್ರ', jn:'ಜ್ಞ',
    kh:'ಖ', gh:'ಘ', ch:'ಛ', chh:'ಛ', jh:'ಝ', th:'ಥ', dh:'ಧ', ph:'ಫ', bh:'ಭ', sh:'ಶ', shh:'ಷ',
    k:'ಕ', g:'ಗ', c:'ಚ', j:'ಜ', t:'ತ', T:'ಟ', d:'ದ', D:'ಡ', n:'ನ', N:'ಣ', p:'ಪ', b:'ಬ', m:'ಮ',
    y:'ಯ', r:'ರ', l:'ಲ', v:'ವ', w:'ವ', s:'ಸ', h:'ಹ', L:'ಳ', R:'ಱ',
  },
  vowels: { ai:'ಐ', au:'ಔ', aa:'ಆ', ee:'ಈ', ii:'ಈ', oo:'ಊ', uu:'ಊ', ri:'ಋ', rri:'ೠ', lri:'ಌ', a:'ಅ', i:'ಇ', u:'ಉ', e:'ಎ', o:'ಒ' },
  matra: { a:'', aa:'ಾ', i:'ಿ', ii:'ೀ', ee:'ೀ', u:'ು', uu:'ೂ', oo:'ೂ', e:'ೆ', ai:'ೈ', o:'ೊ', au:'ೌ', ri:'ೃ', rri:'ೄ', lri:'ೢ' },
  signs: { anusvara:'ಂ', visarga:'ಃ', virama:'್' },
  digits: ['೦','೧','೨','೩','೪','೫','೬','೭','೮','೯'],
};

const MALAYALAM: ScriptMap = {
  cons: {
    ksh:'ക്ഷ', tr:'ത്ര', jn:'ജ്ഞ',
    kh:'ഖ', gh:'ഘ', ch:'ഛ', chh:'ഛ', jh:'ഝ', th:'ഥ', dh:'ധ', ph:'ഫ', bh:'ഭ', sh:'ശ', shh:'ഷ',
    k:'ക', g:'ഗ', c:'ച', j:'ജ', t:'ത', T:'ട', d:'ദ', D:'ഡ', n:'ന', N:'ണ', p:'പ', b:'ബ', m:'മ',
    y:'യ', r:'ര', l:'ല', v:'വ', w:'വ', s:'സ', h:'ഹ', L:'ള', R:'റ', zh:'ഴ',
  },
  vowels: { ai:'ഐ', au:'ഔ', aa:'ആ', ee:'ഈ', ii:'ഈ', oo:'ഊ', uu:'ഊ', ri:'ഋ', rri:'ൠ', lri:'ഌ', a:'അ', i:'ഇ', u:'ഉ', e:'എ', o:'ഒ' },
  matra: { a:'', aa:'ാ', i:'ി', ii:'ീ', ee:'ീ', u:'ു', uu:'ൂ', oo:'ൂ', e:'െ', ai:'ൈ', o:'ൊ', au:'ൌ', ri:'ൃ', rri:'ൄ', lri:'ൢ' },
  signs: { anusvara:'ം', visarga:'ഃ', virama:'്' },
  digits: ['൦','൧','൨','൩','൪','൫','൬','൭','൮','൯'],
};

const SINHALA: ScriptMap = {
  cons: {
    kh:'ඛ', gh:'ඝ', ch:'ඡ', chh:'ඡ', jh:'ඣ', th:'ථ', dh:'ධ', ph:'ඵ', bh:'භ', sh:'ශ', shh:'ෂ',
    k:'ක', g:'ග', c:'ච', j:'ජ', t:'ත', T:'ට', d:'ද', D:'ඩ', n:'න', N:'ණ', p:'ප', b:'බ', m:'ම',
    y:'ය', r:'ර', l:'ල', v:'ව', w:'ව', s:'ස', h:'හ', L:'ළ', ng:'ඞ',
  },
  vowels: { ai:'ඓ', au:'ඖ', aa:'ආ', ee:'ඊ', ii:'ඊ', oo:'ඌ', uu:'ඌ', ri:'ඍ', a:'අ', i:'ඉ', u:'උ', e:'එ', o:'ඔ' },
  matra: { a:'', aa:'ා', i:'ි', ii:'ී', ee:'ී', u:'ු', uu:'ූ', oo:'ූ', e:'ෙ', ai:'ෛ', o:'ො', au:'ෞ', ri:'ෘ' },
  signs: { anusvara:'ං', visarga:'ඃ', virama:'්' },
  digits: ['0','1','2','3','4','5','6','7','8','9'],
};

function getScript(lang: BhaShaLang): ScriptMap {
  const devLangs: BhaShaLang[] = ['hi','mr','ne','sa','kok','mai','bho','brx','doi'];
  if (devLangs.includes(lang)) return DEVANAGARI;
  if (lang === 'gu') return GUJARATI;
  if (lang === 'bn' || lang === 'as' || lang === 'mni') return BENGALI;
  if (lang === 'pa') return GURMUKHI;
  if (lang === 'or') return ODIA;
  if (lang === 'ta') return TAMIL;
  if (lang === 'te') return TELUGU;
  if (lang === 'kn') return KANNADA;
  if (lang === 'ml') return MALAYALAM;
  if (lang === 'si') return SINHALA;
  return DEVANAGARI; // fallback
}

export function transliterate(
  input: string,
  lang: BhaShaLang = 'hi',
  opts: BhaShaOptions = {}
): string {
  const script = getScript(lang);
  const autoConjuncts = opts.autoConjuncts ?? true;
  const transliterateDigits = opts.transliterateDigits ?? true;

  const lower = input.toLowerCase();
  let out = '';
  let i = 0;
  let lastWasConsonant = false;

  const consKeys = Object.keys(script.cons).sort((a,b)=>b.length-a.length);
  const vowelKeys = [...VOWEL_KEYS];

  while (i < lower.length) {
    const ch = lower[i];

    // Boundary chars
    if (!/[a-z0-9]/.test(ch)) {
      if (transliterateDigits && /[0-9]/.test(ch)) {
        out += script.digits[parseInt(ch,10)];
      } else {
        out += input[i];
      }
      i++; lastWasConsonant = false; continue;
    }

    // Consonant
    let matchedCons: string | null = null; let consLen = 0;
    for (const key of consKeys) {
      if (lower.startsWith(key, i)) { matchedCons = key; consLen = key.length; break; }
    }
    if (matchedCons) {
      out += script.cons[matchedCons];
      lastWasConsonant = true;
      if (autoConjuncts) {
        let nextIsCons = false;
        for (const key of consKeys) { if (lower.startsWith(key, i + consLen)) { nextIsCons = true; break; } }
        if (nextIsCons) out += script.signs.virama;
      }
      i += consLen; continue;
    }

    // Vowel
    let vkey: typeof VOWEL_KEYS[number] | null = null;
    for (const vk of vowelKeys) { if (lower.startsWith(vk, i)) { vkey = vk; break; } }
    if (vkey) {
      if (lastWasConsonant) {
        out += script.matra[vkey] ?? '';
        lastWasConsonant = false;
      } else {
        out += script.vowels[vkey] ?? '';
      }
      i += vkey.length; continue;
    }

    // Fallback
    out += input[i]; i++; lastWasConsonant = false;
  }

  return out;
}
