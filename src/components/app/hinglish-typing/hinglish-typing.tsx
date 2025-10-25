"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Copy, Download, RefreshCw, WandSparkles, Bold, Italic, FileDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { transliterate as bhashaTransliterate, type BhaShaLang, LANGUAGES } from '@/lib/bhasha-ime';

type Rule = { pat: string; out: string; type?: 'cons' | 'vowel' | 'sign' };
type Options = {
  useNukta: boolean;
  assimilateNasal: boolean;
  transliterateDigits: boolean;
  escapeBackticks: boolean;
  autoHalant: boolean;
  smartFinalA: boolean;
};

type DictEntry = { from: string; to: string };

// Built-in smart mappings for common Hindi words/particles (before transliteration)
const DEFAULT_DICT: DictEntry[] = [
  // Pronouns / particles
  { from: 'main', to: 'मैं' },
  { from: 'mein', to: 'मैं' }, // favor मैं per user expectation; change to 'में' if preferred
  { from: 'hu', to: 'हूँ' },
  { from: 'hun', to: 'हूँ' },
  { from: 'hoon', to: 'हूँ' },
  { from: 'huu', to: 'हूँ' },
  { from: 'hai', to: 'है' },
  { from: 'hain', to: 'हैं' },
  { from: 'kya', to: 'क्या' },
  { from: 'na', to: 'ना' },
  { from: 'tum', to: 'तुम' },
  // Common verbs
  { from: 'jante', to: 'जानते' },
  { from: 'jaante', to: 'जानते' },
  { from: 'jaana', to: 'जाना' },
  { from: 'jana', to: 'जाना' },
];

// Basic phonetic rules (longest first where ambiguous)
const RULES: Rule[] = [
  // Special clusters
  { pat: 'ksh', out: 'क्ष', type: 'cons' },
  { pat: 'gya', out: 'ज्ञ', type: 'cons' },
  { pat: 'jna', out: 'ज्ञ', type: 'cons' },
  { pat: 'tr', out: 'त्र', type: 'cons' },
  { pat: 'chh', out: 'छ', type: 'cons' },
  { pat: 'shh', out: 'ष', type: 'cons' },
  { pat: 'q', out: 'क', type: 'cons' },

  // Consonants (digraphs)
  { pat: 'kh', out: 'ख', type: 'cons' },
  { pat: 'gh', out: 'घ', type: 'cons' },
  { pat: 'ch', out: 'च', type: 'cons' },
  { pat: 'jh', out: 'झ', type: 'cons' },
  { pat: 'th', out: 'थ', type: 'cons' },
  { pat: 'x', out: 'क्स', type: 'cons' },
  { pat: 'dh', out: 'ध', type: 'cons' },
  { pat: 'ph', out: 'फ', type: 'cons' },
  { pat: 'bh', out: 'भ', type: 'cons' },
  { pat: 'sh', out: 'श', type: 'cons' },

  // Consonants (single)
  { pat: 'k', out: 'क', type: 'cons' },
  { pat: 'g', out: 'ग', type: 'cons' },
  { pat: 'j', out: 'ज', type: 'cons' },
  { pat: 'c', out: 'क', type: 'cons' },
  { pat: 't', out: 'त', type: 'cons' },
  { pat: 'd', out: 'द', type: 'cons' },
  { pat: 'n', out: 'न', type: 'cons' },
  { pat: 'p', out: 'प', type: 'cons' },
  { pat: 'f', out: 'फ', type: 'cons' },
  { pat: 'b', out: 'ब', type: 'cons' },
  { pat: 'm', out: 'म', type: 'cons' },
  { pat: 'y', out: 'य', type: 'cons' },
  { pat: 'r', out: 'र', type: 'cons' },
  { pat: 'l', out: 'ल', type: 'cons' },
  { pat: 'v', out: 'व', type: 'cons' },
  { pat: 'w', out: 'व', type: 'cons' },
  { pat: 's', out: 'स', type: 'cons' },
  { pat: 'h', out: 'ह', type: 'cons' },

  // Vowels (longest first)
  { pat: 'ai', out: 'ऐ', type: 'vowel' },
  { pat: 'au', out: 'औ', type: 'vowel' },
  { pat: 'aa', out: 'आ', type: 'vowel' },
  { pat: 'ee', out: 'ई', type: 'vowel' },
  { pat: 'ii', out: 'ई', type: 'vowel' },
  { pat: 'oo', out: 'ऊ', type: 'vowel' },
  { pat: 'uu', out: 'ऊ', type: 'vowel' },
  { pat: 'ri', out: 'ऋ', type: 'vowel' },
  { pat: 'a', out: 'अ', type: 'vowel' },
  { pat: 'i', out: 'इ', type: 'vowel' },
  { pat: 'u', out: 'उ', type: 'vowel' },
  { pat: 'e', out: 'ए', type: 'vowel' },
  { pat: 'o', out: 'ओ', type: 'vowel' },

  // Signs
  { pat: '~', out: 'ं', type: 'sign' },
  { pat: ':', out: 'ः', type: 'sign' },
  { pat: '^', out: 'ँ', type: 'sign' },
  { pat: '_', out: '्', type: 'sign' }, // virama
];

const MATRA: Record<string, string> = {
  'a': '', // inherent
  'aa': 'ा',
  'i': 'ि',
  'ii': 'ी',
  'ee': 'ी',
  'u': 'ु',
  'uu': 'ू',
  'oo': 'ू',
  'e': 'े',
  'ai': 'ै',
  'o': 'ो',
  'au': 'ौ',
  'ri': 'ृ',
};

const VOWEL_KEYS = ['ai', 'au', 'aa', 'ee', 'ii', 'oo', 'uu', 'ri', 'a', 'i', 'u', 'e', 'o'];

const DEVANAGARI_DIGITS = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

const LABIAL_STARTS = ['ph', 'bh', 'p', 'b'];
const VELAR_STARTS = ['kh', 'gh', 'k', 'g'];

function peekRule(lower: string, from: number): { rule: Rule | null; len: number } {
  let m: Rule | null = null; let l = 0;
  for (let len = 3; len >= 1; len--) {
    const slice = lower.slice(from, from + len);
    const r = RULES.find(rr => rr.pat === slice);
    if (r) { m = r; l = len; break; }
  }
  return { rule: m, len: l };
}

function applyDictionary(input: string, dict: DictEntry[]): string {
  const combined = [...DEFAULT_DICT, ...dict];
  if (!combined.length) return input;
  const words = combined.map(d => d.from).filter(Boolean);
  if (!words.length) return input;
  const re = new RegExp(`\\b(${words.map(w => w.replace(/[.*+?^${}()|[\\]\\]/g, '\\\\$&')).join('|')})\\b`, 'gi');
  return input.replace(re, (m) => {
    const found = combined.find(d => d.from.toLowerCase() === m.toLowerCase());
    return found ? found.to : m;
  });
}

function transliterate(input: string, opt: Options, dict: DictEntry[], mode: 'hinglish' | 'direct'): string {
  if (mode === 'direct') return input;
  input = applyDictionary(input, dict);
  let i = 0;
  let out = '';
  let lastWasConsonant = false;
  let lastMatraKey: string | null = null;

  // Backtick escape: copy-through until next backtick
  let escape = false;
  const lower = input.toLowerCase();

  while (i < lower.length) {
    const ch = lower[i];

    if (opt.escapeBackticks && ch === '`') {
      escape = !escape;
      i += 1;
      continue;
    }
    if (escape) {
      out += input[i];
      i += 1;
      continue;
    }

    // Word boundary or punctuation resets state
    if (/[^a-z0-9~:\^_]/.test(ch)) {
      // digits
      if (opt.transliterateDigits && /[0-9]/.test(ch)) {
        out += DEVANAGARI_DIGITS[parseInt(ch, 10)];
        i += 1;
        lastWasConsonant = false;
        lastMatraKey = null;
        continue;
      }
      out += input[i];
      lastWasConsonant = false;
      lastMatraKey = null;
      i += 1;
      continue;
    }

    // Nasal assimilation (n/m before specific consonant starts → anusvara)
    if (opt.assimilateNasal && (ch === 'n' || ch === 'm')) {
      // look ahead up to 2 chars for a consonant key
      const next2 = lower.slice(i + 1, i + 3);
      const next1 = lower.slice(i + 1, i + 2);
      const starts = ch === 'n' ? [...VELAR_STARTS] : [...LABIAL_STARTS];
      const boundaryAhead = (i + 1 >= lower.length) || /[^a-z0-9~:\^_]/.test(lower[i + 1] || '');
      if (starts.some(s => next2.startsWith(s) || next1.startsWith(s))) {
        out += 'ं';
        i += 1; // consume n/m only
        lastWasConsonant = false;
        lastMatraKey = null;
        continue;
      }
      // If word-end after a vowel matra, prefer anusvara (e.g., doston -> दोस्तों)
      if (boundaryAhead && lastMatraKey) {
        out += 'ं';
        i += 1;
        lastWasConsonant = false;
        lastMatraKey = null;
        continue;
      }
    }

    // Try to match longest rule up to length 3
    let matched: Rule | null = null;
    let matchedLen = 0;
    for (let len = 3; len >= 1; len--) {
      const slice = lower.slice(i, i + len);
      const rule = RULES.find(r => r.pat === slice);
      if (rule) { matched = rule; matchedLen = len; break; }
    }

    if (!matched) {
      out += input[i];
      lastWasConsonant = false;
      lastMatraKey = null;
      i += 1;
      continue;
    }

    if (matched.type === 'cons') {
      // Nukta variants
      if (opt.useNukta) {
        if (matched.pat === 'f') { out += 'फ़'; i += matchedLen; lastWasConsonant = true; continue; }
        if (matched.pat === 'z') { out += 'ज़'; i += matchedLen; lastWasConsonant = true; continue; }
        if (matched.pat === 'q') { out += 'क़'; i += matchedLen; lastWasConsonant = true; continue; }
      }
      if (matched.pat === 'x') { out += 'क्स'; i += matchedLen; lastWasConsonant = true; continue; }
      out += matched.out;
      lastWasConsonant = true;
      if (opt.autoHalant) {
        const { rule: nextRule } = peekRule(lower, i + matchedLen);
        if (nextRule && nextRule.type === 'cons') {
          out += '्';
        }
      }
      i += matchedLen;
      continue;
    }

    if (matched.type === 'vowel') {
      // find which vowel key matched (prefer multi-char keys)
      let vkey = VOWEL_KEYS.find(k => lower.startsWith(k, i))!;
      if (lastWasConsonant) {
        // Smart final 'a' → long ā (ा) at word-end
        if (vkey === 'a' && opt.smartFinalA) {
          const boundaryAhead = (i + 1 >= lower.length) || /[^a-z0-9~:\^_]/.test(lower[i + 1] || '');
          if (boundaryAhead) {
            out += 'ा';
            i += vkey.length;
            lastWasConsonant = false;
            lastMatraKey = 'aa';
            continue;
          }
        }
        const m = MATRA[vkey] ?? '';
        out += m;
        lastMatraKey = m ? vkey : null;
      } else {
        // independent vowel
        const rule = RULES.find(r => r.type === 'vowel' && r.pat === vkey);
        out += rule ? rule.out : matched.out;
        lastMatraKey = null;
      }
      i += vkey.length;
      lastWasConsonant = false;
      continue;
    }

    if (matched.type === 'sign') {
      out += matched.out;
      i += matchedLen;
      // signs don't change consonant state except virama which keeps it false
      lastWasConsonant = false;
      lastMatraKey = null;
      continue;
    }
  }

  return out;
}

export function HinglishTypingTool() {
  const { toast } = useToast();
  const demoText = `Type "namaste doston" on the left.
Choose a language to see the same line in its native script.`;
  const [latin, setLatin] = useState(demoText);
  const [mode, setMode] = useState<'hinglish' | 'direct'>('hinglish');
  const [lang, setLang] = useState<BhaShaLang>('hi');
  const [opts, setOpts] = useState<Options>({
    useNukta: false,
    assimilateNasal: true,
    transliterateDigits: true,
    escapeBackticks: true,
    autoHalant: true,
    smartFinalA: true,
  });
  const dictStorageKey = useMemo(() => `bhasha_dict_${lang}`, [lang]);
  const [dict, setDict] = useState<DictEntry[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(dictStorageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        setDict(Array.isArray(parsed) ? parsed : []);
      } else {
        setDict([]);
      }
    } catch {
      setDict([]);
    }
  }, [dictStorageKey]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(dictStorageKey, JSON.stringify(dict));
  }, [dict, dictStorageKey]);

  const activeLanguage = useMemo(() => LANGUAGES.find(info => info.code === lang), [lang]);
  const isDevanagariCore = useMemo(
    () => ['hi', 'mr', 'ne', 'sa', 'kok', 'mai', 'bho', 'brx', 'doi'].includes(lang),
    [lang],
  );

  const output = useMemo(() => {
    if (mode === 'direct') return latin;
    if (isDevanagariCore) {
      return transliterate(latin, opts, dict, 'hinglish');
    }
    const prepared = applyDictionary(latin, dict);
    return bhashaTransliterate(prepared, lang, {
      autoConjuncts: opts.autoHalant,
      transliterateDigits: opts.transliterateDigits,
    });
  }, [latin, opts, dict, mode, lang, isDevanagariCore]);

  const copy = async (str: string, label: string) => {
    await navigator.clipboard.writeText(str);
    toast({ title: 'Copied', description: `${label} copied to clipboard.` });
  };

  const download = (str: string, file: string) => {
    const blob = new Blob([str], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file;
    a.click();
    URL.revokeObjectURL(url);
  };

  const editorRef = useRef<HTMLDivElement>(null);
  const romanInputRef = useRef<HTMLInputElement>(null);
  const nativeInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!editorRef.current) return;
    if (document.activeElement !== editorRef.current) {
      editorRef.current.innerText = output;
    }
  }, [output]);

  const exec = (cmd: string) => document.execCommand(cmd, false);
  const copyFormatted = async () => {
    const value = editorRef.current?.innerText ?? output;
    await navigator.clipboard.writeText(value);
    toast({ title: 'Copied', description: 'Formatted output copied to clipboard.' });
  };
  const exportTxt = () => {
  const filename = `typing-workspace-${lang}-output.txt`;
    const content = editorRef.current?.innerText ?? output;
    download(content, filename);
  };
  const exportPdf = async () => {
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF({ unit: 'pt', format: 'a4' });
      const lines = (editorRef.current?.innerText ?? output).split('\n');
      let y = 48;
      const lineHeight = 18;
      const margin = 40;
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(12);
      for (const line of lines) {
        doc.text(line || ' ', margin, y);
        y += lineHeight;
        if (y > doc.internal.pageSize.getHeight() - margin) {
          doc.addPage();
          y = margin + lineHeight;
        }
      }
  doc.save(`typing-workspace-${lang}-output.pdf`);
    } catch (e) {
      toast({ title: 'Export failed', description: 'Install jsPDF to enable PDF export.', variant: 'destructive' });
    }
  };

  const handleAddDictionaryEntry = () => {
    const from = romanInputRef.current?.value.trim();
    const to = nativeInputRef.current?.value.trim();
    if (!from || !to) return;
    setDict((prev) => [{ from, to }, ...prev]);
    if (romanInputRef.current) romanInputRef.current.value = '';
    if (nativeInputRef.current) nativeInputRef.current.value = '';
  };

  type OptionKey = keyof Options;

  const toggleSettings: Array<{ key: OptionKey; label: string; description: string; onlyDevanagari?: boolean }> = [
    {
      key: 'assimilateNasal',
      label: 'Smart nasal assimilation',
      description: 'Convert n/m before k, g, p, or b into anusvara for natural pronunciation.',
      onlyDevanagari: true,
    },
    {
      key: 'useNukta',
      label: 'Nukta consonants',
      description: 'Enable क़, ज़, फ़ and similar consonants when typing q, z, or f.',
      onlyDevanagari: true,
    },
    {
      key: 'transliterateDigits',
      label: 'Native digits',
      description: 'Translate 0–9 into the correct digits for the selected script.',
    },
    {
      key: 'escapeBackticks',
      label: 'Backtick escape',
      description: 'Wrap English words in `backticks` to keep them unchanged.',
    },
    {
      key: 'autoHalant',
      label: 'Auto conjuncts',
      description: 'Automatically apply halant/virama for flowing half-letters.',
    },
    {
      key: 'smartFinalA',
      label: 'Smart final “a”',
      description: 'Turn word endings like “tara” into “तारा” instead of “तर”.',
      onlyDevanagari: true,
    },
  ];

  const advancedDisabled = mode === 'direct';

  return (
    <Card className="bg-card">
      <CardHeader className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-2">
            <CardTitle className="text-2xl font-semibold leading-tight md:text-3xl">
              Indian Language Typing Workspace
            </CardTitle>
            <CardDescription className="max-w-3xl">
              Type once in Latin characters and see accurate output across 23+ Indian language scripts with live phonetic transliteration.
            </CardDescription>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-xs">23+ Languages</Badge>
          <Badge variant="outline" className="text-xs">11 Scripts</Badge>
          <Badge variant="outline" className="text-xs">Real-time Transliteration</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-6">
            <div className="space-y-3 rounded-lg border bg-muted/40 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">Phonetic Input</p>
                  <p className="text-xs text-muted-foreground">Type with Latin characters and let the workspace render the target script for you in real time.</p>
                </div>
                <div className="w-full sm:w-auto">
                  <Label className="sr-only">Typing mode</Label>
                  <Select value={mode} onValueChange={(value) => setMode(value as 'hinglish' | 'direct')}>
                    <SelectTrigger className="w-full bg-background sm:w-56">
                      <SelectValue placeholder="Phonetic Transliteration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hinglish">Phonetic Transliteration</SelectItem>
                      <SelectItem value="direct">Direct Script Input</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Textarea value={latin} onChange={(e) => setLatin(e.target.value)} rows={10} className="w-full" />
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={() => setLatin('')}>Clear</Button>
                <Button variant="secondary" onClick={() => copy(latin, 'Phonetic input')}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy input
                </Button>
                <Button variant="secondary" onClick={() => download(latin, `typing-workspace-${lang}-input.txt`)}>
                  <Download className="mr-2 h-4 w-4" />
                  Download input
                </Button>
              </div>
            </div>

            <div className="space-y-3 rounded-lg border bg-background/70 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Script Output{activeLanguage ? ` · ${activeLanguage.name}` : ''}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activeLanguage
                      ? `${activeLanguage.nativeName} • ${activeLanguage.script}`
                      : 'Choose a target language to transliterate.'}
                  </p>
                </div>
                <Badge variant="secondary" className="text-xs">Live Transliteration</Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => exec('bold')} title="Bold (Ctrl/Cmd + B)">
                  <Bold className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => exec('italic')} title="Italic (Ctrl/Cmd + I)">
                  <Italic className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="sm" onClick={copyFormatted}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy output
                </Button>
                <Button variant="secondary" size="sm" onClick={exportTxt}>
                  <FileDown className="mr-2 h-4 w-4" />
                  Export TXT
                </Button>
                <Button variant="secondary" size="sm" onClick={exportPdf}>
                  <Download className="mr-2 h-4 w-4" />
                  Export PDF
                </Button>
              </div>
              <div
                ref={editorRef}
                className="w-full min-h-[240px] whitespace-pre-wrap rounded border bg-background p-3 text-lg leading-relaxed"
                contentEditable
                suppressContentEditableWarning
                aria-label="Script output"
              />
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <WandSparkles className="h-3 w-3" />
                <span>Edits inside this box stay in sync with clipboard and exports.</span>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
              <div className="space-y-2">
                <Label className="text-xs font-semibold uppercase text-muted-foreground">Target language</Label>
                <Select value={lang} onValueChange={(value) => setLang(value as BhaShaLang)}>
                  <SelectTrigger className="w-full bg-background">
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent className="max-h-64">
                    {LANGUAGES.map((info) => (
                      <SelectItem key={info.code} value={info.code}>
                        {info.name} • {info.nativeName} ({info.script})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {activeLanguage && (
                  <p className="text-xs text-muted-foreground">
                    Script: <span className="font-medium text-foreground">{activeLanguage.script}</span> · Native name:{' '}
                    <span className="font-medium text-foreground">{activeLanguage.nativeName}</span>
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-semibold uppercase text-muted-foreground">Supported languages</Label>
                <ScrollArea className="h-36 rounded-md border bg-background">
                  <div className="grid grid-cols-1 gap-2 p-3 text-xs sm:grid-cols-2">
                    {LANGUAGES.map((info) => {
                      const isActive = info.code === lang;
                      return (
                        <button
                          key={info.code}
                          type="button"
                          onClick={() => setLang(info.code as BhaShaLang)}
                          className={`flex items-center justify-between rounded-md border px-2 py-1 transition-colors ${
                            isActive
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-border/60 text-foreground hover:border-primary/60 hover:bg-primary/5'
                          }`}
                        >
                          <span className="font-medium">{info.name}</span>
                          <span className="ml-2 truncate text-muted-foreground">{info.nativeName}</span>
                        </button>
                      );
                    })}
                  </div>
                  <ScrollBar orientation="vertical" />
                </ScrollArea>
              </div>
            </div>

            <div className="space-y-3 rounded-lg border bg-muted/20 p-4">
              <p className="text-sm font-semibold text-foreground">Intelligent controls</p>
              <p className="text-xs text-muted-foreground">
                Fine-tune how the engine interprets your phonetic typing. Some options depend on Devanagari scripts.
              </p>
              <div className="space-y-3">
                {toggleSettings.map(({ key, label, description, onlyDevanagari }) => {
                  const disabled = advancedDisabled || (onlyDevanagari && !isDevanagariCore);
                  return (
                    <div
                      key={key}
                      className={`flex items-start justify-between gap-3 rounded-md border bg-background/70 p-3 ${
                        disabled ? 'opacity-70' : ''
                      }`}
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">{label}</p>
                        <p className="text-xs text-muted-foreground">{description}</p>
                      </div>
                      <Switch
                        checked={opts[key]}
                        onCheckedChange={(checked) => setOpts((prev) => ({ ...prev, [key]: checked }))}
                        disabled={disabled}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3 rounded-lg border bg-background p-4">
              <div>
                <p className="text-sm font-semibold text-foreground">Custom dictionary</p>
                <p className="text-xs text-muted-foreground">
                  Teach the transliteration engine new words for {activeLanguage?.name ?? 'your language'}. Entries are saved per language.
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  ref={romanInputRef}
                  className="flex-1 rounded border bg-background px-2 py-1 text-sm"
                  placeholder='Phonetic (e.g., "mumbai")'
                />
                <input
                  ref={nativeInputRef}
                  className="flex-1 rounded border bg-background px-2 py-1 text-sm"
                  placeholder='Script (e.g., "मुंबई")'
                />
                <Button size="sm" onClick={handleAddDictionaryEntry}>Add</Button>
              </div>
              <div className="max-h-28 space-y-2 overflow-y-auto rounded border bg-muted/20 p-2">
                {dict.length ? (
                  dict.map((entry, index) => (
                    <div
                      key={`${entry.from}-${index}`}
                      className="flex items-center justify-between rounded bg-background px-2 py-1 text-xs"
                    >
                      <span className="font-medium text-foreground">{entry.from}</span>
                      <span className="mx-2 text-muted-foreground">→</span>
                      <span className="flex-1 truncate font-medium text-foreground">{entry.to}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-2 text-xs"
                        onClick={() => setDict((prev) => prev.filter((_, idx) => idx !== index))}
                      >
                        Remove
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground">No custom words yet. Add your first mapping above.</p>
                )}
              </div>
            </div>
          </aside>
        </div>

        <div className="space-y-2 rounded-lg border bg-muted/20 p-4 text-xs text-muted-foreground">
          <p className="text-sm font-semibold text-foreground">Transliteration tips</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Long vowels: aa → आ/ஆ, ee/ii → ई/ஈ, oo/uu → ऊ/ஊ depending on script.</li>
            <li>Consonant clusters: ksh → क्ष, tr → त्र, gya/jna → ज्ञ, shr → श्र; enable auto conjuncts for smoother flow.</li>
            <li>Matras follow consonants automatically: ka → क, ki → कि, ke → के, ko → को.</li>
            <li>Use `backticks` to keep snippets in English: `GST return` stays in Latin script.</li>
            <li>Smart nasal inserts ं/ং/ஂ at vowel endings or before matching consonants.</li>
            <li>Switch to “Direct Script Input” to paste or edit native text without transliteration.</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          This tool is MIT licensed and community friendly — contribute your improvements to help every Indian language shine.
        </p>
        <Button variant="ghost" onClick={() => setLatin(demoText)}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Load demo text
        </Button>
      </CardFooter>
    </Card>
  );
}
