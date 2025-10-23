
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Play, Pause, Square, Mic, Volume2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

export function TextToSpeechConverter() {
  const [text, setText] = useState('Hello, world! This is a test of the text to speech converter.');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string | undefined>(undefined);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  
  const wasStoppedManually = useRef(false);
  
  const { toast } = useToast();

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
        // Set a default voice, preferring a local one
        const defaultVoice = availableVoices.find(v => v.lang.includes('en') && v.localService) || availableVoices[0];
        setSelectedVoice(defaultVoice?.name);
      }
    };
    
    // Voices are loaded asynchronously
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices(); // Initial call
    
    // Cleanup on unmount
    return () => {
        window.speechSynthesis.cancel();
    }
  }, []);

  const play = () => {
    if (isSpeaking && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      return;
    }

    if (!text.trim()) {
      toast({ variant: 'destructive', title: 'No text provided' });
      return;
    }
    
    wasStoppedManually.current = false;
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

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utterance.onerror = (event) => {
        if (wasStoppedManually.current) return;
        if (event.error === 'canceled' || event.error === 'interrupted') return;
        console.error('SpeechSynthesisUtterance.onerror', event);
        toast({ variant: 'destructive', title: 'Speech Error', description: 'Could not play the audio. Your browser might not support this voice.' });
        setIsSpeaking(false);
        setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const pause = () => {
    window.speechSynthesis.pause();
    setIsPaused(true);
  };

  const stop = () => {
    wasStoppedManually.current = true;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">Text to Speech Converter</CardTitle>
        <CardDescription>
          Convert text into spoken audio right in your browser.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <Label htmlFor="text" className="text-lg">Text to Convert</Label>
                <Textarea
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste your text here..."
                className="h-48 text-base"
                />
            </div>
             <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="voice">Voice</Label>
                    <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                        <SelectTrigger id="voice"><SelectValue placeholder="Select a voice..."/></SelectTrigger>
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
                    <Label>Rate: {rate.toFixed(1)}</Label>
                    <Slider value={[rate]} onValueChange={(v) => setRate(v[0])} min={0.5} max={2} step={0.1} />
                </div>
                <div className="space-y-2">
                    <Label>Pitch: {pitch.toFixed(1)}</Label>
                    <Slider value={[pitch]} onValueChange={(v) => setPitch(v[0])} min={0} max={2} step={0.1} />
                </div>
            </div>
        </div>
        
        <div className="border-t pt-6 flex justify-center gap-4">
            {!isSpeaking ? (
                <Button onClick={play} size="lg">
                    <Play className="mr-2" /> Play
                </Button>
            ) : isPaused ? (
                 <Button onClick={play} size="lg">
                    <Play className="mr-2" /> Resume
                </Button>
            ) : (
                <Button onClick={pause} size="lg" variant="secondary">
                    <Pause className="mr-2" /> Pause
                </Button>
            )}
            <Button onClick={stop} disabled={!isSpeaking} size="lg" variant="destructive">
                <Square className="mr-2" /> Stop
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
