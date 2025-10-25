'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Download, Globe, Heart } from 'lucide-react';
import { transliterate, LANGUAGES, type BhaShaLang } from '@/lib/bhasha-ime';
import { useToast } from '@/hooks/use-toast';

const SCRIPT_FAMILIES = [
  {
    name: 'Devanagari Script',
    langs: LANGUAGES.filter(l => l.script === 'Devanagari')
  },
  {
    name: 'Regional Scripts',
    langs: LANGUAGES.filter(l => !['Devanagari','Perso-Arabic'].includes(l.script))
  },
  {
    name: 'Perso-Arabic Script',
    langs: LANGUAGES.filter(l => l.script === 'Perso-Arabic')
  },
];

export function BhaShaIME() {
  const [inputText, setInputText] = useState('');
  const [selectedLang, setSelectedLang] = useState<BhaShaLang>('hi');
  const { toast } = useToast();

  const outputText = useMemo(() => {
    if (!inputText.trim()) return '';
    return transliterate(inputText, selectedLang, {
      autoConjuncts: true,
      transliterateDigits: true
    });
  }, [inputText, selectedLang]);

  const selectedLangInfo = LANGUAGES.find(l => l.code === selectedLang);

  const handleCopy = async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      toast({ title: 'Copied!', description: 'Text copied to clipboard' });
    } catch {
      toast({ title: 'Failed', description: 'Could not copy text', variant: 'destructive' });
    }
  };

  const handleDownload = () => {
    if (!outputText) return;
    const blob = new Blob([outputText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bhasha-ime-${selectedLang}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-2 border-blue-200 dark:border-blue-800">
        <div className="p-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Globe className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              BhaSha IME
            </h1>
          </div>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Free & Open Source Indian Language Typing Software
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Real-time phonetic transliteration for <span className="font-semibold text-blue-600 dark:text-blue-400">23+ Indian languages</span>. 
            Lightweight, powerful, and completely free for everyone.
          </p>
          <div className="flex items-center justify-center gap-2 pt-2">
            <Heart className="w-5 h-5 text-red-500 fill-current" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Made with love for India&apos;s linguistic diversity
            </span>
          </div>
        </div>
      </Card>

      {/* Language Selector */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Choose Your Language
        </h2>
        <div className="space-y-6">
          {SCRIPT_FAMILIES.map(family => (
            <div key={family.name} className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                {family.name}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                {family.langs.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => setSelectedLang(lang.code)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 text-left hover:shadow-md ${
                      selectedLang === lang.code
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 shadow-md'
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                    }`}
                  >
                    <div className="text-2xl font-bold mb-1">{lang.nativeName}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{lang.name}</div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input/Output Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Input */}
        <Card>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Type in English
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Roman script
              </span>
            </div>
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Start typing... (e.g., 'namaste' for Hindi, 'vanakkam' for Tamil)"
              className="min-h-[300px] text-lg font-mono"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              💡 Tip: Type phonetically. Example: &quot;namaste&quot; → &quot;नमस्ते&quot; (Hindi)
            </p>
          </div>
        </Card>

        {/* Output */}
        <Card>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {selectedLangInfo?.name} Output
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {selectedLangInfo?.script}
              </span>
            </div>
            <div className="min-h-[300px] p-4 bg-gray-50 dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-700">
              <div className="text-2xl leading-relaxed whitespace-pre-wrap" dir={selectedLang === 'ur' || selectedLang === 'ks' || selectedLang === 'sd' ? 'rtl' : 'ltr'}>
                {outputText || (
                  <span className="text-gray-400 dark:text-gray-600 text-base">
                    Your {selectedLangInfo?.name} text will appear here...
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleCopy}
                disabled={!outputText}
                variant="outline"
                className="flex-1"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
              <Button
                onClick={handleDownload}
                disabled={!outputText}
                variant="outline"
                className="flex-1"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Features Section */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 border-green-200 dark:border-green-800">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
            Why BhaSha IME?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="text-3xl">🚀</div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Lightning Fast</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Real-time transliteration with zero lag. Pure algorithmic approach, no AI overhead.
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl">🔓</div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">100% Free & Open Source</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                No subscriptions, no paywalls, no tracking. Use freely in your projects.
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl">🌏</div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">23+ Languages</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                From Hindi to Tamil, Bengali to Malayalam. All major Indian languages supported.
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl">💪</div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Smart Conjuncts</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Automatically handles complex consonant clusters and half-letters.
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl">🪶</div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Lightweight</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Pure JavaScript/React. No heavy dependencies. Works offline.
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl">📱</div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Universal</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Works on desktop, mobile, tablets. Copy-paste anywhere.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Examples Section */}
      <Card>
        <div className="p-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Quick Examples
          </h2>
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Hindi</div>
                <div className="space-y-1">
                  <div className="text-sm"><code className="text-blue-600">namaste</code> → <span className="font-semibold">नमस्ते</span></div>
                  <div className="text-sm"><code className="text-blue-600">shukriya</code> → <span className="font-semibold">शुक्रिया</span></div>
                </div>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Tamil</div>
                <div className="space-y-1">
                  <div className="text-sm"><code className="text-green-600">vanakkam</code> → <span className="font-semibold">வணக்கம்</span></div>
                  <div className="text-sm"><code className="text-green-600">nandri</code> → <span className="font-semibold">நன்றி</span></div>
                </div>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Bengali</div>
                <div className="space-y-1">
                  <div className="text-sm"><code className="text-purple-600">nomoshkar</code> → <span className="font-semibold">নমস্কর</span></div>
                  <div className="text-sm"><code className="text-purple-600">dhonnobad</code> → <span className="font-semibold">ধন্নবদ</span></div>
                </div>
              </div>
              <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Telugu</div>
                <div className="space-y-1">
                  <div className="text-sm"><code className="text-orange-600">namaskaram</code> → <span className="font-semibold">నమస్కరం</span></div>
                  <div className="text-sm"><code className="text-orange-600">dhanyavadamulu</code> → <span className="font-semibold">ధన్యవదములు</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Supported Languages Footer */}
      <Card className="bg-gray-50 dark:bg-gray-900">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            All Supported Languages ({LANGUAGES.length}+)
          </h3>
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map(lang => (
              <span
                key={lang.code}
                className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-sm border border-gray-200 dark:border-gray-700"
              >
                {lang.name} ({lang.nativeName})
              </span>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
