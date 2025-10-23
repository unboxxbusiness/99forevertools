
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Volume2, Download, Loader2, Info } from 'lucide-react';
import { generateSpeech } from '@/ai/flows/tts-flow';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function TextToSpeechConverter() {
  const [text, setText] = useState('Hello, world! This is a test of the text to speech converter.');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();

  const handleGenerateAudio = async () => {
    if (!text.trim()) {
      toast({ variant: 'destructive', title: 'No text provided' });
      return;
    }

    setIsLoading(true);
    setAudioUrl(null);

    try {
      const result = await generateSpeech(text);
      if (result && result.media) {
        setAudioUrl(result.media);
        toast({ title: 'Audio generated successfully!' });
      } else {
        throw new Error('No audio data received.');
      }
    } catch (error) {
      console.error('TTS Generation Error:', error);
      toast({ variant: 'destructive', title: 'Audio Generation Failed', description: 'Could not generate the audio. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">Text to Speech</CardTitle>
        <CardDescription>
          Convert passages of text into a downloadable WAV audio file.
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
            />
        </div>
        
        <div className="border-t pt-6 flex justify-center gap-4">
            <Button onClick={handleGenerateAudio} size="lg" disabled={isLoading}>
                {isLoading ? (
                    <Loader2 className="mr-2 animate-spin"/>
                ) : (
                    <Volume2 className="mr-2" />
                )}
                {isLoading ? 'Generating...' : 'Generate Audio'}
            </Button>
        </div>

        {audioUrl && (
            <div className="border-t pt-6 space-y-4 animate-fade-in text-center">
                <h3 className="text-xl font-semibold">Your Audio is Ready!</h3>
                <div className='flex justify-center'>
                    <audio controls src={audioUrl} className="w-full max-w-md" />
                </div>
                <a href={audioUrl} download="speech.wav">
                <Button>
                    <Download className="mr-2 h-5 w-5" />
                    Download WAV
                </Button>
                </a>
          </div>
        )}

        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Service Costs</AlertTitle>
          <AlertDescription>
            This feature uses Google's AI Platform for audio generation. Depending on your usage and billing status, this may incur costs. Please review your Google Cloud project's pricing details.
          </AlertDescription>
        </Alert>

      </CardContent>
    </Card>
  );
}
