
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { Play, Pause, Square, Volume2 } from 'lucide-react';

export function TextToSpeechConverter() {
  const [text, setText] = useState('Hello, world! This is a test of the text-to-speech converter.');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string | undefined>(undefined);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleVoicesChanged = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      const defaultVoice = availableVoices.find(voice => voice.default) || availableVoices[0];
      if (defaultVoice) {
        setSelectedVoice(defaultVoice.name);
      }
    };

    // The 'voiceschanged' event is not consistently fired on all browsers.
    // So we check for voices immediately and then set up the event listener.
    const initialVoices = window.speechSynthesis.getVoices();
    if (initialVoices.length > 0) {
      handleVoicesChanged();
    } else {
      window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
    }
    
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
      window.speechSynthesis.cancel();
    };
  }, []);

  const speak = () => {
    if (isSpeaking && !isPaused) return;

    if (!text.trim()) {
      toast({ variant: 'destructive', title: 'No text provided', description: 'Please enter some text to speak.' });
      return;
    }
    
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find(v => v.name === selectedVoice);
    if (voice) {
      utterance.voice = voice;
    }
    utterance.rate = rate;
    utterance.pitch = pitch;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onpause = () => {
      setIsSpeaking(true);
      setIsPaused(true);
    };
    
    utterance.onresume = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    if (isPaused) {
      window.speechSynthesis.resume();
    } else {
      window.speechSynthesis.speak(utterance);
    }
  };

  const pause = () => {
    if (isSpeaking && !isPaused) {
      window.speechSynthesis.pause();
    }
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">Text to Speech Converter</CardTitle>
        <CardDescription>
          Convert text into spoken audio. Best for short passages due to browser limitations.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
            <Label htmlFor="text" className="text-lg">Text to Speak</Label>
            <Textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here..."
            className="h-40 text-base"
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
                <Label htmlFor="voice">Voice</Label>
                <Select value={selectedVoice} onValueChange={setSelectedVoice} disabled={voices.length === 0}>
                    <SelectTrigger id="voice">
                        <SelectValue placeholder="Select a voice..." />
                    </SelectTrigger>
                    <SelectContent>
                        {voices.map(voice => (
                            <SelectItem key={voice.name} value={voice.name}>
                                {voice.name} ({voice.lang})
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label>Rate: <span className="font-bold text-primary">{rate.toFixed(1)}x</span></Label>
                <Slider value={[rate]} onValueChange={(v) => setRate(v[0])} min={0.5} max={2} step={0.1} />
            </div>
            <div className="space-y-2">
                <Label>Pitch: <span className="font-bold text-primary">{pitch.toFixed(1)}</span></Label>
                <Slider value={[pitch]} onValueChange={(v) => setPitch(v[0])} min={0} max={2} step={0.1} />
            </div>
        </div>
        
        <div className="border-t pt-6 flex justify-center gap-4">
            <Button onClick={speak} disabled={isSpeaking && !isPaused} size="lg">
                <Play className="mr-2" />
                {isPaused ? 'Resume' : 'Play'}
            </Button>
            <Button onClick={pause} disabled={!isSpeaking || isPaused} variant="secondary" size="lg">
                <Pause className="mr-2" />
                Pause
            </Button>
             <Button onClick={stop} disabled={!isSpeaking} variant="destructive" size="lg">
                <Square className="mr-2" />
                Stop
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
