"use client";

import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Copy, Download, Eraser, Delete, Type } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type KeyDef = {
  label: string;
  value: string;
  className?: string;
};

const VOWELS: KeyDef[] = [
  { label: 'अ', value: 'अ' },
  { label: 'आ', value: 'आ' },
  { label: 'इ', value: 'इ' },
  { label: 'ई', value: 'ई' },
  { label: 'उ', value: 'उ' },
  { label: 'ऊ', value: 'ऊ' },
  { label: 'ए', value: 'ए' },
  { label: 'ऐ', value: 'ऐ' },
  { label: 'ओ', value: 'ओ' },
  { label: 'औ', value: 'औ' },
  { label: 'ऋ', value: 'ऋ' },
  { label: 'अं', value: 'अं' },
  { label: 'अः', value: 'अः' },
  { label: 'अँ', value: 'अँ' },
];

const CONSONANTS_ROWS: KeyDef[][] = [
  [
    { label: 'क', value: 'क' }, { label: 'ख', value: 'ख' }, { label: 'ग', value: 'ग' }, { label: 'घ', value: 'घ' }, { label: 'ङ', value: 'ङ' },
  ],
  [
    { label: 'च', value: 'च' }, { label: 'छ', value: 'छ' }, { label: 'ज', value: 'ज' }, { label: 'झ', value: 'झ' }, { label: 'ञ', value: 'ञ' },
  ],
  [
    { label: 'ट', value: 'ट' }, { label: 'ठ', value: 'ठ' }, { label: 'ड', value: 'ड' }, { label: 'ढ', value: 'ढ' }, { label: 'ण', value: 'ण' },
  ],
  [
    { label: 'त', value: 'त' }, { label: 'थ', value: 'थ' }, { label: 'द', value: 'द' }, { label: 'ध', value: 'ध' }, { label: 'न', value: 'न' },
  ],
  [
    { label: 'प', value: 'प' }, { label: 'फ', value: 'फ' }, { label: 'ब', value: 'ब' }, { label: 'भ', value: 'भ' }, { label: 'म', value: 'म' },
  ],
  [
    { label: 'य', value: 'य' }, { label: 'र', value: 'र' }, { label: 'ल', value: 'ल' }, { label: 'व', value: 'व' },
  ],
  [
    { label: 'श', value: 'श' }, { label: 'ष', value: 'ष' }, { label: 'स', value: 'स' }, { label: 'ह', value: 'ह' },
  ],
  [
    { label: 'क्ष', value: 'क्ष' }, { label: 'त्र', value: 'त्र' }, { label: 'ज्ञ', value: 'ज्ञ' },
  ],
];

const MATRAS: KeyDef[] = [
  { label: 'ा', value: 'ा' },
  { label: 'ि', value: 'ि' },
  { label: 'ी', value: 'ी' },
  { label: 'ु', value: 'ु' },
  { label: 'ू', value: 'ू' },
  { label: 'े', value: 'े' },
  { label: 'ै', value: 'ै' },
  { label: 'ो', value: 'ो' },
  { label: 'ौ', value: 'ौ' },
  { label: '्', value: '्' },
  { label: 'ं', value: 'ं' },
  { label: 'ः', value: 'ः' },
  { label: 'ँ', value: 'ँ' },
];

export function HindiTypingTool() {
  const { toast } = useToast();
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(22);
  const [rows, setRows] = useState(8);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Maintain cursor position on insert
  const insertAtCursor = (str: string) => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart ?? text.length;
    const end = el.selectionEnd ?? text.length;
    const newValue = text.slice(0, start) + str + text.slice(end);
    setText(newValue);
    // After state update, restore caret after inserted string
    requestAnimationFrame(() => {
      if (!el) return;
      const pos = start + str.length;
      el.selectionStart = el.selectionEnd = pos;
      el.focus();
    });
  };

  const handleBackspace = () => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart ?? text.length;
    const end = el.selectionEnd ?? text.length;
    if (start === end && start > 0) {
      const newValue = text.slice(0, start - 1) + text.slice(end);
      setText(newValue);
      requestAnimationFrame(() => {
        if (!el) return;
        const pos = start - 1;
        el.selectionStart = el.selectionEnd = pos;
        el.focus();
      });
    } else {
      const newValue = text.slice(0, start) + text.slice(end);
      setText(newValue);
      requestAnimationFrame(() => {
        if (!el) return;
        el.selectionStart = el.selectionEnd = start;
        el.focus();
      });
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: 'कॉपी हो गया', description: 'टेक्स्ट क्लिपबोर्ड पर कॉपी कर दिया गया है।' });
    } catch {
      toast({ title: 'कॉपी असफल', description: 'कृपया पुनः प्रयास करें।' });
    }
  };

  const handleDownload = () => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hindi-text.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const stats = {
    chars: text.length,
    words: (text.trim().match(/\S+/g) || []).length,
  };

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
          <Type className="h-5 w-5 text-primary" /> Hindi Typing Tool
        </CardTitle>
        <CardDescription>
          Type in Hindi using the on‑screen Devanagari keyboard. Copy or download your text.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <Textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ fontSize }}
              rows={rows}
              className="w-full leading-relaxed"
              placeholder="यहाँ हिंदी में टाइप करें..."
            />
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span>Characters: {stats.chars}</span>
              <span>•</span>
              <span>Words: {stats.words}</span>
              <span>•</span>
              <label className="flex items-center gap-2">
                Font size
                <input
                  type="range"
                  min={16}
                  max={36}
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                />
              </label>
              <label className="flex items-center gap-2">
                Rows
                <input
                  type="range"
                  min={4}
                  max={16}
                  value={rows}
                  onChange={(e) => setRows(parseInt(e.target.value))}
                />
              </label>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-3">
            <div>
              <div className="text-sm font-semibold mb-2">स्वर (Vowels)</div>
              <div className="grid grid-cols-7 gap-2">
                {VOWELS.map((k) => (
                  <Button key={k.label} variant="secondary" className="h-9" onClick={() => insertAtCursor(k.value)}>
                    {k.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-semibold">व्यंजन (Consonants)</div>
              {CONSONANTS_ROWS.map((row, idx) => (
                <div key={idx} className="grid grid-cols-5 gap-2">
                  {row.map((k) => (
                    <Button key={k.label} variant="outline" className="h-9" onClick={() => insertAtCursor(k.value)}>
                      {k.label}
                    </Button>
                  ))}
                </div>
              ))}
            </div>

            <div>
              <div className="text-sm font-semibold mb-2"> मात्रा / चिन्ह (Matras & Signs)</div>
              <div className="grid grid-cols-10 gap-2">
                {MATRAS.map((k) => (
                  <Button key={k.label} variant="secondary" className="h-9" onClick={() => insertAtCursor(k.value)}>
                    {k.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <Button variant="destructive" onClick={handleBackspace} title="Backspace">
                <Delete className="h-4 w-4 mr-2" /> बैकस्पेस
              </Button>
              <Button variant="outline" onClick={() => insertAtCursor(' ')}>Space</Button>
              <Button variant="outline" onClick={() => insertAtCursor('\n')}>Enter</Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        <Button onClick={handleCopy}>
          <Copy className="h-4 w-4 mr-2" /> कॉपी करें
        </Button>
        <Button variant="outline" onClick={() => setText('')}>
          <Eraser className="h-4 w-4 mr-2" /> साफ करें
        </Button>
        <Button variant="secondary" onClick={handleDownload}>
          <Download className="h-4 w-4 mr-2" /> डाउनलोड (.txt)
        </Button>
      </CardFooter>
    </Card>
  );
}
