
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check, Lightbulb, Briefcase } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const hashtagData = {
  'cafe': {
    name: 'Café / Coffee Shop',
    popular: ['#coffee', '#cafe', '#coffeetime', '#coffeelover', '#espresso', '#latteart', '#cafelife', '#coffeebreak', '#instacoffee'],
    niche: ['#specialtycoffee', '#baristalife', '#pourover', '#coffeegram', '#coffeeaddict', '#manmakecoffee', '#coffeeprops', '#alternativebrewing'],
  },
  'fashion': {
    name: 'Fashion / Apparel',
    popular: ['#fashion', '#style', '#ootd', '#instafashion', '#fashionblogger', '#streetstyle', '#styleinspiration', '#lookbook'],
    niche: ['#slowfashion', '#ethicalfashion', '#sustainablefashion', '#fashionista', '#outfitinspo', '#whatiwore', '#fashionstyle', '#minimalstyle'],
  },
  'fitness': {
    name: 'Fitness / Gym',
    popular: ['#fitness', '#gym', '#workout', '#fitnessmotivation', '#fitfam', '#training', '#health', '#motivation', '#gymlife'],
    niche: ['#bodybuilding', '#crosstraining', '#powerlifting', '#fitnessjourney', '#noexcuses', '#getfit', '#trainhard', '#fitlife'],
  },
  'restaurant': {
    name: 'Restaurant / Food',
    popular: ['#food', '#foodie', '#instafood', '#foodphotography', '#yummy', '#delicious', '#restaurant', '#foodlover', '#eatlocal'],
    niche: ['#foodstagram', '#chefslife', '#farmtotable', '#finedining', '#gastronomy', '#foodgasm', '#seriouseats', '#dailyfoodfeed'],
  },
  'travel': {
    name: 'Travel / Tourism',
    popular: ['#travel', '#instatravel', '#travelgram', '#wanderlust', '#vacation', '#explore', '#adventure', '#tourism', '#travelblogger'],
    niche: ['#digitalnomad', '#solotravel', '#traveldeeper', '#passionpassport', '#beautifuldestinations', '#welltraveled', '#roamtheplanet', '#discoverearth'],
  }
};

type Category = keyof typeof hashtagData;

export function HashtagGenerator() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('cafe');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const currentHashtags = useMemo(() => {
    return hashtagData[selectedCategory];
  }, [selectedCategory]);

  const allHashtags = useMemo(() => {
    return [...currentHashtags.popular, ...currentHashtags.niche].join(' ');
  }, [currentHashtags]);

  const handleCopy = () => {
    navigator.clipboard.writeText(allHashtags);
    setCopied(true);
    toast({ title: 'All hashtags copied to clipboard!' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
      <Card className="w-full max-w-4xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">Instagram Hashtag Generator</CardTitle>
          <CardDescription>
            Suggest relevant hashtags based on your business category.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-end">
            <div className="w-full sm:w-80 space-y-2">
              <label className="text-lg font-medium">Select Business Category</label>
              <Select onValueChange={(value: Category) => setSelectedCategory(value)} value={selectedCategory}>
                  <SelectTrigger className="h-12 text-lg">
                      <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                      {Object.entries(hashtagData).map(([key, value]) => (
                        <SelectItem key={key} value={key}>{value.name}</SelectItem>
                      ))}
                  </SelectContent>
              </Select>
            </div>
          </div>

          {currentHashtags && (
            <div className="border-t pt-6 space-y-6">
              <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Generated Hashtags</h3>
                  <Button onClick={handleCopy}>
                      {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                      Copy All
                  </Button>
              </div>
              
              <div className="space-y-4">
                  <div>
                      <h4 className="font-semibold mb-2">Popular Hashtags</h4>
                      <div className="flex flex-wrap gap-2">
                          {currentHashtags.popular.map(tag => (
                              <Badge key={tag} variant="secondary" className="text-sm">{tag}</Badge>
                          ))}
                      </div>
                  </div>
                   <div>
                      <h4 className="font-semibold mb-2">Niche Hashtags</h4>
                      <div className="flex flex-wrap gap-2">
                          {currentHashtags.niche.map(tag => (
                              <Badge key={tag} variant="outline">{tag}</Badge>
                          ))}
                      </div>
                  </div>
              </div>

            </div>
          )}
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
                        <li>Select your business category from the dropdown menu.</li>
                        <li>The tool instantly generates a curated list of relevant hashtags.</li>
                        <li>The list is divided into "Popular" hashtags for broad reach and "Niche" hashtags for a targeted audience.</li>
                        <li>Click "Copy All" to copy the entire list to your clipboard, ready to paste into your social media posts.</li>
                    </ol>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="use-cases">
                <AccordionTrigger>
                    <h3 className="text-lg font-semibold flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary"/> Use Cases for Small Business</h3>
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-muted-foreground">
                    <ul className="list-disc list-inside space-y-2">
                        <li><strong>Increase Instagram Reach:</strong> Use a mix of popular and niche hashtags to get your posts seen by more people.</li>
                        <li><strong>Save Time on Marketing:</strong> Quickly find the right hashtags without hours of research.</li>
                        <li><strong>Target Specific Audiences:</strong> Use niche hashtags to connect with a more engaged and relevant audience.</li>
                        <li><strong>Content Planning:</strong> Use the generated hashtags to brainstorm new content ideas for your social media.</li>
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
