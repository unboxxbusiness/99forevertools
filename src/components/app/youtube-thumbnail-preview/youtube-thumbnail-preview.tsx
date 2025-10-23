
'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Upload, UserCircle2, Lightbulb, Briefcase } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const YouTubeVideoCard = ({
  thumbnail,
  title,
  channel,
  views,
  time,
}: {
  thumbnail: string | null;
  title: string;
  channel: string;
  views: string;
  time: string;
}) => {
  return (
    <div className="w-full max-w-sm rounded-xl overflow-hidden bg-background/50">
      <div className="aspect-video bg-muted/80 flex items-center justify-center">
        {thumbnail ? (
          <img src={thumbnail} alt="YouTube Thumbnail" className="w-full h-full object-cover" />
        ) : (
          <div className="text-muted-foreground text-sm">Your Thumbnail</div>
        )}
      </div>
      <div className="p-3 flex gap-3">
        <div className="w-9 h-9 mt-1">
            <UserCircle2 className="w-9 h-9 text-muted-foreground/60"/>
        </div>
        <div className="flex-1">
          <h3 className="text-base font-medium leading-tight text-foreground line-clamp-2">
            {title || 'Your Awesome Video Title Goes Here'}
          </h3>
          <div className="text-sm text-muted-foreground mt-1.5">
            <p>{channel || 'Your Channel Name'}</p>
            <p>{views || '1.2M views'} &bull; {time || '1 day ago'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export function YouTubeThumbnailPreview() {
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [channel, setChannel] = useState('');
  const [views, setViews] = useState('');
  const [time, setTime] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
        if(thumbnail) URL.revokeObjectURL(thumbnail);
        setThumbnail(URL.createObjectURL(file));
    } else if (file) {
      toast({
        variant: 'destructive',
        title: 'Invalid file type',
        description: 'Please upload an image file.',
      });
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-fade-in">
      <Card className="w-full max-w-6xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">
            YouTube Thumbnail Preview Tool
          </CardTitle>
          <CardDescription>
            See how your thumbnail and title will look on the YouTube homepage.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Controls */}
              <div className="space-y-6">
                  <div className="space-y-2">
                      <Label htmlFor="thumbnail" className="text-lg">Thumbnail Image</Label>
                      <Button variant="outline" className="w-full h-24 border-dashed" onClick={() => fileInputRef.current?.click()}>
                          <Upload className="mr-2"/>
                          {thumbnail ? 'Change Thumbnail' : 'Upload Thumbnail (1280x720)'}
                      </Button>
                      <Input id="thumbnail" type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="title" className="text-lg">Video Title</Label>
                      <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="My Awesome New Video" />
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="channel" className="text-lg">Channel Name</Label>
                      <Input id="channel" value={channel} onChange={(e) => setChannel(e.target.value)} placeholder="My YouTube Channel" />
                  </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                          <Label htmlFor="views">Views</Label>
                          <Input id="views" value={views} onChange={(e) => setViews(e.target.value)} placeholder="e.g., 1.2M views" />
                      </div>
                      <div className="space-y-2">
                          <Label htmlFor="time">Time</Label>
                          <Input id="time" value={time} onChange={(e) => setTime(e.target.value)} placeholder="e.g., 1 day ago" />
                      </div>
                  </div>
              </div>
              
              {/* Preview */}
              <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-center mb-4">Live Preview</h3>
                  <div className="bg-muted/20 p-8 rounded-xl flex items-center justify-center">
                      <div className="scale-110">
                          <YouTubeVideoCard 
                              thumbnail={thumbnail}
                              title={title}
                              channel={channel}
                              views={views}
                              time={time}
                          />
                      </div>
                  </div>
              </div>
          </div>
        </CardContent>
      </Card>
      <div className="mt-8">
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="how-it-works">
                <AccordionTrigger>
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Lightbulb className="w-5 h-5 text-primary"/> How It Works</h3>
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-muted-foreground">
                    <ol className="list-decimal list-inside space-y-2">
                        <li>Upload your designed thumbnail image (recommended size: 1280x720 pixels).</li>
                        <li>Enter your video title, channel name, and other details.</li>
                        <li>The tool instantly shows a realistic preview of how your video will appear on the YouTube homepage.</li>
                        <li>Adjust your thumbnail design or title to maximize click-through rate before you upload to YouTube.</li>
                    </ol>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="use-cases">
                <AccordionTrigger>
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary"/> Use Cases for Small Business</h3>
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-muted-foreground">
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Increase Clicks:</strong> Design thumbnails that are eye-catching and stand out from the competition.</li>
                        <li><strong>Test Titles:</strong> See how different titles look with your thumbnail to find the most compelling combination.</li>
                        <li><strong>Improve Branding:</strong> Ensure your thumbnails and titles are consistent with your brand identity.</li>
                        <li><strong>Content Creators:</strong> A must-have tool for any business that uses YouTube for marketing or content creation.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
