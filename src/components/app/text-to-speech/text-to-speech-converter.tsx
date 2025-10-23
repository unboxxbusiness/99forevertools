
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { Play, Pause, Square, Download, Mic } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

// Simple WAV encoder
const encodeWAV = (samples: Float32Array, sampleRate: number): Blob => {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);

  const writeString = (view: DataView, offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  const floatTo16BitPCM = (output: DataView, offset: number, input: Float32Array) => {
    for (let i = 0; i < input.length; i++, offset += 2) {
      const s = Math.max(-1, Math.min(1, input[i]));
      output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }
  };

  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + samples.length * 2, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true); // Mono channel
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(view, 36, 'data');
  view.setUint32(40, samples.length * 2, true);
  floatTo16BitPCM(view, 44, samples);

  return new Blob([view], { type: 'audio/wav' });
};


export function TextToSpeechConverter() {
  const [text, setText] = useState('Hello, world! This is a test of the text-to-speech converter.');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string | undefined>(undefined);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const wasStoppedManually = useRef(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const scriptProcessorNodeRef = useRef<ScriptProcessorNode | null>(null);
  const audioDataRef = useRef<Float32Array[]>([]);

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

    const initialVoices = window.speechSynthesis.getVoices();
    if (initialVoices.length > 0) {
      handleVoicesChanged();
    } else {
      window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
    }
    
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
      audioContextRef.current?.close();
    };
  }, []);

  const stopRecording = () => {
    setIsRecording(false);
    
    if (audioContextRef.current && audioDataRef.current.length > 0) {
      const sampleRate = audioContextRef.current.sampleRate;
      const mergedSamples = new Float32Array(audioDataRef.current.reduce((acc, val) => acc + val.length, 0));
      let offset = 0;
      for (const chunk of audioDataRef.current) {
        mergedSamples.set(chunk, offset);
        offset += chunk.length;
      }

      const wavBlob = encodeWAV(mergedSamples, sampleRate);
      setAudioUrl(URL.createObjectURL(wavBlob));
    }
    
    scriptProcessorNodeRef.current?.disconnect();
    audioContextRef.current?.close();
  };
  
  const startRecording = () => {
    if (!window.AudioContext) {
      toast({ variant: 'destructive', title: 'Audio API not supported', description: 'Your browser does not support the necessary Web Audio API for recording.' });
      return;
    }

    setAudioUrl(null);
    audioDataRef.current = [];
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const utterance = new SpeechSynthesisUtterance(text);
    const destination = audioContextRef.current.createMediaStreamDestination();
    scriptProcessorNodeRef.current = audioContextRef.current.createScriptProcessor(4096, 1, 1);

    scriptProcessorNodeRef.current.onaudioprocess = (e) => {
      if (isSpeaking) {
        audioDataRef.current.push(new Float32Array(e.inputBuffer.getChannelData(0)));
      }
    };

    const source = audioContextRef.current.createMediaStreamSource(destination.stream);
    source.connect(scriptProcessorNodeRef.current);
    scriptProcessorNodeRef.current.connect(audioContextRef.current.destination);

    speak(utterance, destination);
    setIsRecording(true);
  };
  
  const speak = (customUtterance?: SpeechSynthesisUtterance, destination?: MediaStreamAudioDestinationNode) => {
    if (isSpeaking && !isPaused) return;
    if (!text.trim()) {
      toast({ variant: 'destructive', title: 'No text provided' });
      return;
    }
    
    window.speechSynthesis.cancel(); // Clear any previous utterances

    const utterance = customUtterance || new SpeechSynthesisUtterance(text);
    if (!customUtterance) {
        const voice = voices.find(v => v.name === selectedVoice);
        if (voice) utterance.voice = voice;
        utterance.rate = rate;
        utterance.pitch = pitch;
    }

    utterance.onstart = () => { wasStoppedManually.current = false; setIsSpeaking(true); setIsPaused(false); };
    utterance.onpause = () => { setIsSpeaking(true); setIsPaused(true); };
    utterance.onresume = () => { setIsSpeaking(true); setIsPaused(false); };
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      if (isRecording) {
        stopRecording();
      }
    };
    utterance.onerror = (event) => {
        if (wasStoppedManually.current) {
            wasStoppedManually.current = false;
            return;
        }
        console.error('SpeechSynthesisUtterance.onerror', event);
        toast({ variant: 'destructive', title: 'Speech Error', description: 'Could not play the audio. Please try again.' });
        setIsSpeaking(false);
        setIsPaused(false);
        if (isRecording) {
            stopRecording();
        }
    };

    if (isPaused) {
      window.speechSynthesis.resume();
    } else {
      window.speechSynthesis.speak(utterance);
    }
  };

  const pause = () => {
    if (isSpeaking && !isPaused) window.speechSynthesis.pause();
  };

  const stop = () => {
    wasStoppedManually.current = true;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    if(isRecording) {
      stopRecording();
    }
  };


  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">Text to Speech Converter</CardTitle>
        <CardDescription>
          Convert text into spoken audio and download it as a WAV file.
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
                    <SelectTrigger id="voice"><SelectValue placeholder="Select a voice..." /></SelectTrigger>
                    <SelectContent>{voices.map(voice => <SelectItem key={voice.name} value={voice.name}>{voice.name} ({voice.lang})</SelectItem>)}</SelectContent>
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
            <Button onClick={() => speak()} disabled={isSpeaking && !isPaused || isRecording} size="lg">
                <Play className="mr-2" />
                {isPaused ? 'Resume' : 'Play'}
            </Button>
            <Button onClick={pause} disabled={!isSpeaking || isPaused || isRecording} variant="secondary" size="lg">
                <Pause className="mr-2" />
                Pause
            </Button>
             <Button onClick={stop} disabled={!isSpeaking && !isRecording} variant="destructive" size="lg">
                <Square className="mr-2" />
                Stop
            </Button>
        </div>

        <div className="border-t pt-6 flex flex-col items-center gap-4">
            <Button onClick={startRecording} disabled={isRecording || isSpeaking} size="lg" className="bg-red-600 hover:bg-red-700">
                <Mic className="mr-2" />
                {isRecording ? 'Recording...' : 'Record and Download'}
            </Button>

            {audioUrl && (
                <div className="text-center space-y-2 animate-fade-in">
                    <p className="text-sm text-muted-foreground">Your recording is ready.</p>
                    <audio controls src={audioUrl} className="w-full"></audio>
                    <Button asChild variant="outline">
                        <a href={audioUrl} download="speech.wav">
                            <Download className="mr-2"/>
                            Download .wav
                        </a>
                    </Button>
                </div>
            )}
        </div>

        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Browser-Based Tool</AlertTitle>
          <AlertDescription>
            This tool uses your browser's built-in text-to-speech engine. The available voices and audio quality depend on your browser and operating system.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
