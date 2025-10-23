
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { Play, Pause, Square, Download, Mic, Dot } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

// Helper function to create a valid WAV file from raw PCM data
function encodeWAV(samples: Float32Array, sampleRate: number): Blob {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);

  /* RIFF identifier */
  writeString(view, 0, 'RIFF');
  /* file length */
  view.setUint32(4, 36 + samples.length * 2, true);
  /* RIFF type */
  writeString(view, 8, 'WAVE');
  /* format chunk identifier */
  writeString(view, 12, 'fmt ');
  /* format chunk length */
  view.setUint32(16, 16, true);
  /* sample format (raw) */
  view.setUint16(20, 1, true);
  /* channel count */
  view.setUint16(22, 1, true);
  /* sample rate */
  view.setUint32(24, sampleRate, true);
  /* byte rate (sample rate * block align) */
  view.setUint32(28, sampleRate * 2, true);
  /* block align (channel count * bytes per sample) */
  view.setUint16(32, 2, true);
  /* bits per sample */
  view.setUint16(34, 16, true);
  /* data chunk identifier */
  writeString(view, 36, 'data');
  /* data chunk length */
  view.setUint32(40, samples.length * 2, true);

  floatTo16BitPCM(view, 44, samples);

  return new Blob([view], { type: 'audio/wav' });
}

function writeString(view: DataView, offset: number, string: string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

function floatTo16BitPCM(output: DataView, offset: number, input: Float32Array) {
  for (let i = 0; i < input.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, input[i]));
    output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
  }
}


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

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

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
      window.speechSynthesis.cancel();
      streamRef.current?.getTracks().forEach(track => track.stop());
      mediaRecorderRef.current?.stop();
    };
  }, []);

  const speak = () => {
    if (isSpeaking && !isPaused) return;
    if (!text.trim()) {
      toast({ variant: 'destructive', title: 'No text provided' });
      return;
    }
    
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find(v => v.name === selectedVoice);
    if (voice) utterance.voice = voice;
    utterance.rate = rate;
    utterance.pitch = pitch;

    utterance.onstart = () => { setIsSpeaking(true); setIsPaused(false); };
    utterance.onpause = () => { setIsSpeaking(true); setIsPaused(true); };
    utterance.onresume = () => { setIsSpeaking(true); setIsPaused(false); };
    utterance.onend = () => {
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
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    if (isRecording) stopRecording();
  };

  const startRecording = async () => {
    try {
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      const audioTracks = displayStream.getAudioTracks();
      if (audioTracks.length === 0) {
        toast({
          variant: 'destructive',
          title: 'Audio Track Not Found',
          description: "Please make sure to check the 'Share tab audio' option in the screen sharing dialog.",
          duration: 8000,
        });
        displayStream.getTracks().forEach(track => track.stop());
        return;
      }

      const audioStream = new MediaStream(audioTracks);
      streamRef.current = audioStream;

      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(audioStream);
      const processor = audioContext.createScriptProcessor(4096, 1, 1);

      let recordingBuffer: Float32Array[] = [];

      processor.onaudioprocess = (e) => {
        if (isRecording) {
          const inputData = e.inputBuffer.getChannelData(0);
          recordingBuffer.push(new Float32Array(inputData));
        }
      };

      source.connect(processor);
      processor.connect(audioContext.destination);

      const stopHandler = () => {
        const recordedData = new Float32Array(recordingBuffer.reduce((acc, val) => acc + val.length, 0));
        let offset = 0;
        for (const buffer of recordingBuffer) {
          recordedData.set(buffer, offset);
          offset += buffer.length;
        }

        const audioBlob = encodeWAV(recordedData, audioContext.sampleRate);
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);

        displayStream.getTracks().forEach(track => track.stop());
        audioContext.close();
        setIsRecording(false);
        toast({ title: 'Recording finished!', description: 'You can now download the audio.' });
      };

      mediaRecorderRef.current = { stop: stopHandler } as MediaRecorder;
      setIsRecording(true);
      setAudioUrl(null);
      toast({ title: 'Recording started!', description: 'Play the text to capture the audio.' });
      
    } catch (err) {
      console.error("Error getting display media:", err);
      if ((err as Error).name === 'NotAllowedError') {
         toast({ variant: 'destructive', title: 'Permission Denied', description: 'You need to grant screen sharing permissions to record audio.' });
      } else {
         toast({ variant: 'destructive', title: 'Recording Error', description: 'Could not start screen sharing. Please try again.' });
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
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

        <div className="border-t pt-6 space-y-4">
            <h3 className="text-xl font-semibold text-center">Record and Download</h3>
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>How to Record</AlertTitle>
              <AlertDescription>
                1. Click "Start Recording" and grant permission to share your screen. **Crucially, check the box to "Share tab audio"**.
                2. Click "Play" to speak the text.
                3. The recording will stop automatically when speech finishes, or you can click "Stop Recording".
              </AlertDescription>
            </Alert>
            <div className='flex justify-center gap-4'>
                <Button onClick={startRecording} disabled={isRecording}>
                    <Mic className="mr-2"/> Start Recording
                </Button>
                <Button onClick={stopRecording} disabled={!isRecording} variant="destructive">
                    <Dot className="mr-2 animate-ping" /> Stop Recording
                </Button>
            </div>
             {audioUrl && (
                <div className="flex flex-col items-center gap-4 pt-4 animate-fade-in">
                    <audio src={audioUrl} controls />
                    <a href={audioUrl} download="speech.wav">
                        <Button><Download className="mr-2"/> Download WAV</Button>
                    </a>
                </div>
             )}
        </div>
      </CardContent>
    </Card>
  );
}
