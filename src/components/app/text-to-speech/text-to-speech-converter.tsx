
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Play, Pause, Square, Mic, Download } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

// Helper function to encode PCM data to WAV format
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

  writeString(view, 0, 'RIFF'); // RIFF identifier
  view.setUint32(4, 36 + samples.length * 2, true); // file length
  writeString(view, 8, 'WAVE'); // RIFF type
  writeString(view, 12, 'fmt '); // format chunk identifier
  view.setUint32(16, 16, true); // format chunk length
  view.setUint16(20, 1, true); // sample format (1 is PCM)
  view.setUint16(22, 1, true); // channel count
  view.setUint32(24, sampleRate, true); // sample rate
  view.setUint32(28, sampleRate * 2, true); // byte rate (sample rate * block align)
  view.setUint16(32, 2, true); // block align (channel count * bytes per sample)
  view.setUint16(34, 16, true); // bits per sample
  writeString(view, 36, 'data'); // data chunk identifier
  view.setUint32(40, samples.length * 2, true); // data chunk length

  floatTo16BitPCM(view, 44, samples);

  return new Blob([view], { type: 'audio/wav' });
};


export function TextToSpeechConverter() {
  const [text, setText] = useState('Hello, world! This is a test of the text to speech converter.');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string | undefined>(undefined);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);

  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  
  const wasStoppedManually = useRef(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const scriptProcessorNodeRef = useRef<ScriptProcessorNode | null>(null);
  const audioBuffersRef = useRef<Float32Array[]>([]);

  const { toast } = useToast();

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
        const defaultVoice = availableVoices.find(v => v.lang.includes('en') && v.localService) || availableVoices[0];
        setSelectedVoice(defaultVoice?.name);
      }
    };
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
    
    return () => {
      window.speechSynthesis.cancel();
    }
  }, []);
  
  const stopRecording = useCallback(() => {
    if (!isRecording) return;
    
    if (scriptProcessorNodeRef.current) {
        scriptProcessorNodeRef.current.disconnect();
        scriptProcessorNodeRef.current = null;
    }
    if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
    }
    
    const recordedData = new Float32Array(audioBuffersRef.current.reduce((acc, val) => acc + val.length, 0));
    let offset = 0;
    for (const buffer of audioBuffersRef.current) {
      recordedData.set(buffer, offset);
      offset += buffer.length;
    }
    
    if(recordedData.length > 0) {
        const wavBlob = encodeWAV(recordedData, 44100);
        const url = URL.createObjectURL(wavBlob);
        setRecordedAudioUrl(url);
        toast({ title: 'Recording finished!', description: 'Your audio is ready to download.' });
    }

    setIsRecording(false);
  }, [isRecording, toast]);
  

  const play = (record = false) => {
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
    setRecordedAudioUrl(null);
    
    if(record) {
      setIsRecording(true);
      audioBuffersRef.current = [];
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        const context = audioContextRef.current;
        scriptProcessorNodeRef.current = context.createScriptProcessor(4096, 1, 1);
        scriptProcessorNodeRef.current.onaudioprocess = (e) => {
          const inputData = e.inputBuffer.getChannelData(0);
          audioBuffersRef.current.push(new Float32Array(inputData));
        };
        scriptProcessorNodeRef.current.connect(context.destination);
      } catch (e) {
        toast({ variant: 'destructive', title: 'Audio Context Error', description: 'Could not start audio recorder.' });
        setIsRecording(false);
        return;
      }
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find(v => v.name === selectedVoice);
    if (voice) utterance.voice = voice;
    utterance.rate = rate;
    utterance.pitch = pitch;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      if (isRecording) {
        stopRecording();
      }
    };
    
    utterance.onerror = (event) => {
        if (wasStoppedManually.current || event.error === 'canceled' || event.error === 'interrupted') return;
        console.error('SpeechSynthesisUtterance.onerror', event);
        toast({ variant: 'destructive', title: 'Speech Error', description: 'Could not play the audio. Please try again.' });
        setIsSpeaking(false);
        setIsPaused(false);
        if (isRecording) {
            stopRecording();
        }
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
                    <Select value={selectedVoice} onValueChange={setSelectedVoice} disabled={isSpeaking}>
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
                <Button onClick={() => play()} size="lg">
                    <Play className="mr-2" /> Play
                </Button>
            ) : isPaused ? (
                 <Button onClick={() => play()} size="lg">
                    <Play className="mr-2" /> Resume
                </Button>
            ) : (
                <Button onClick={pause} size="lg" variant="secondary">
                    <Pause className="mr-2" /> Pause
                </Button>
            )}
            
            <Button onClick={() => play(true)} size="lg" disabled={isSpeaking}>
                <Mic className="mr-2" /> Record Audio
            </Button>
            
            <Button onClick={stop} disabled={!isSpeaking} size="lg" variant="destructive">
                <Square className="mr-2" /> Stop
            </Button>
        </div>
        
        {recordedAudioUrl && (
          <div className="border-t pt-6 text-center space-y-4 animate-fade-in">
            <h3 className="text-lg font-semibold">Your recording is ready!</h3>
            <audio controls src={recordedAudioUrl} className="mx-auto" />
            <a href={recordedAudioUrl} download="speech.wav">
              <Button>
                <Download className="mr-2" /> Download WAV
              </Button>
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
