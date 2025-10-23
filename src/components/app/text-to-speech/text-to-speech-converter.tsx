
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Volume2, Play, Pause, RotateCcw } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function TextToSpeechConverter() {
  const [text, setText] = useState('Hello, world! This is a test of the text to speech converter.');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string | undefined>(undefined);
  const [isPaused, setIsPaused] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
        const defaultVoice = availableVoices.find(v => v.lang.startsWith('en')) || availableVoices[0];
        setSelectedVoice(defaultVoice?.name);
      }
    };
    
    // Voices are loaded asynchronously
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices(); // Initial call
  }, []);

  // Effect to check if speech synthesis is paused
  useEffect(() => {
    const checkPaused = () => {
        setIsPaused(window.speechSynthesis.paused && isSpeaking);
    };

    const interval = setInterval(checkPaused, 500);

    return () => clearInterval(interval);
  }, [isSpeaking]);

  const handlePlayPause = () => {
    if (isSpeaking) {
      window.speechSynthesis.pause();
      setIsSpeaking(false);
      setIsPaused(true);
    } else {
      if (isPaused) {
        window.speechSynthesis.resume();
        setIsSpeaking(true);
        setIsPaused(false);
      } else {
        startSpeech();
      }
    }
  };
  
  const handleStop = () => {
     window.speechSynthesis.cancel();
     setIsSpeaking(false);
     setIsPaused(false);
  }

  const startSpeech = () => {
    if (!text.trim()) {
      toast({ variant: 'destructive', title: 'No text provided' });
      return;
    }
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find(v => v.name === selectedVoice);
    if (voice) {
      utterance.voice = voice;
    }
    
    utterance.onstart = () => {
        setIsLoading(false);
        setIsSpeaking(true);
        setIsPaused(false);
    };
    
    utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
    };

    utterance.onpause = () => {
      setIsSpeaking(false);
      setIsPaused(true);
    };

    utterance.onresume = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event.error);
        toast({ variant: 'destructive', title: 'Speech Error', description: 'Could not play audio.' });
        setIsLoading(false);
        setIsSpeaking(false);
        setIsPaused(false);
    };

    setIsLoading(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">Text to Speech Converter</CardTitle>
        <CardDescription>
          Convert passages of text into spoken audio.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="text" className="text-lg">Text to Convert</Label>
          <Textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here..."
            className="h-48 text-base"
            disabled={isSpeaking || isLoading}
          />
        </div>

         <div className="space-y-2">
            <Label htmlFor="voice">Voice</Label>
            <Select onValueChange={setSelectedVoice} value={selectedVoice} disabled={voices.length === 0 || isSpeaking || isLoading}>
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
        
        <div className='flex gap-2'>
            <Button onClick={handlePlayPause} disabled={isLoading || !text.trim()} className="flex-1 text-lg py-6">
                {isSpeaking ? (
                    <>
                    <Pause className="mr-2 h-5 w-5" />
                    Pause
                    </>
                ) : (
                    <>
                    <Play className="mr-2 h-5 w-5" />
                    {isPaused ? 'Resume' : 'Play'}
                    </>
                )}
            </Button>
             <Button onClick={handleStop} disabled={!isSpeaking && !isPaused} variant="destructive" className="text-lg py-6">
                <RotateCcw className="mr-2 h-5 w-5" />
                Stop
             </Button>
        </div>
      </CardContent>
    </Card>
  );
}
