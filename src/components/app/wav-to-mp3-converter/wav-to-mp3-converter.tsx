
'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Upload, CheckCircle, Download, Loader2, AudioLines } from 'lucide-react';
import * as lamejs from 'lamejs';

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export function WavToMp3Converter() {
  const [wavFile, setWavFile] = useState<File | null>(null);
  const [mp3Url, setMp3Url] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'audio/wav' || file.type === 'audio/x-wav')) {
      setWavFile(file);
      setMp3Url(null);
    } else if (file) {
      toast({
        variant: 'destructive',
        title: 'Invalid file type',
        description: 'Please upload a .wav file.',
      });
      setWavFile(null);
    }
  };

  const convertToMp3 = async () => {
    if (!wavFile) {
      toast({ variant: 'destructive', title: 'No file selected', description: 'Please upload a WAV file.' });
      return;
    }
    setIsLoading(true);
    setMp3Url(null);

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const wav = lamejs.WavHeader.readHeader(new DataView(arrayBuffer));
        const samples = new Int16Array(arrayBuffer, wav.dataOffset, wav.dataLen / 2);
        
        const mp3encoder = new lamejs.Mp3Encoder(wav.channels, wav.sampleRate, 128); // 128 kbps
        const mp3Data = [];
        
        const sampleBlockSize = 1152;
        for (let i = 0; i < samples.length; i += sampleBlockSize) {
            const sampleChunk = samples.subarray(i, i + sampleBlockSize);
            const mp3buf = mp3encoder.encodeBuffer(sampleChunk);
            if (mp3buf.length > 0) {
                mp3Data.push(mp3buf);
            }
        }
        
        const mp3buf = mp3encoder.flush();
        if (mp3buf.length > 0) {
            mp3Data.push(mp3buf);
        }

        const mp3Blob = new Blob(mp3Data.map(d => new Uint8Array(d)), { type: 'audio/mp3' });
        setMp3Url(URL.createObjectURL(mp3Blob));
        toast({ title: 'Conversion successful!', description: 'Your MP3 file is ready for download.' });
      } catch (error) {
        console.error(error);
        toast({ variant: 'destructive', title: 'Conversion failed', description: 'The WAV file may be corrupted or in an unsupported format.' });
      } finally {
        setIsLoading(false);
      }
    };

    reader.readAsArrayBuffer(wavFile);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">WAV to MP3 Converter</CardTitle>
        <CardDescription>
          Convert your .wav audio files to .mp3 format, right in your browser.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div
          className="border-2 border-dashed border-muted-foreground/50 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors flex flex-col justify-center items-center h-48"
          onClick={() => fileInputRef.current?.click()}
        >
          <Input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="audio/wav,audio/x-wav"
          />
          {wavFile ? (
            <div className="flex flex-col items-center gap-2 text-green-500">
              <CheckCircle className="h-10 w-10" />
              <p className="font-semibold">{wavFile.name}</p>
              <p className="text-xs text-muted-foreground">Size: {formatBytes(wavFile.size)}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Upload className="h-10 w-10" />
              <p className="font-semibold">Click to upload a .WAV file</p>
              <p className="text-xs">or drag and drop</p>
            </div>
          )}
        </div>

        <Button onClick={convertToMp3} disabled={!wavFile || isLoading} className="w-full text-lg py-6">
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <AudioLines className="mr-2 h-5 w-5" />
              Convert to MP3
            </>
          )}
        </Button>
        
        {mp3Url && (
          <div className="border-t pt-6 space-y-4 animate-fade-in text-center">
             <h3 className="text-xl font-semibold">Your MP3 is Ready!</h3>
            <div className='flex justify-center'>
                 <audio controls src={mp3Url} />
            </div>
            <a href={mp3Url} download={wavFile?.name.replace(/\.[^/.]+$/, "") + ".mp3"}>
              <Button>
                <Download className="mr-2 h-5 w-5" />
                Download MP3
              </Button>
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
