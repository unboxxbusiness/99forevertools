'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check, PartyPopper } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const festivalWishes = {
  diwali: [
    "May the divine light of Diwali spread into your life and bring peace, prosperity, happiness, and good health. Happy Diwali!",
    "Wishing you and your family a sparkling Diwali! May you be blessed with joy and success.",
    "May the festival of lights fill your home with bright sparkles of peace, amusement, and contentment. Happy Diwali!",
    "Let each diya you light bring a glow of happiness on your face and enlighten your soul. Happy Diwali!",
    "On this auspicious festival, may the millions of lamps of Diwali illuminate your life with happiness, joy, peace and health. Happy Diwali."
  ],
  holi: [
    "Wishing you a vibrant and colorful Holi! May your life be filled with the colors of joy and happiness.",
    "May the spirit of Holi bring you and your family happiness, warmth and love. Happy Holi!",
    "Let the colors of Holi spread the message of peace and happiness. Have a wonderful Holi!",
    "Let's throw away the worries and enjoy the festival of colors. Happy Holi!",
    "Wishing you a Holi filled with sweet moments and colorful memories to cherish forever."
  ],
  eid: [
    "Eid Mubarak! May Allah's blessings be with you today, tomorrow, and always.",
    "May this Eid bring joy, happiness, peace, and prosperity to you and your family. Eid Mubarak!",
    "On this holy occasion of Eid, I wish you and your family a day filled with laughter and happy moments. Eid Mubarak!",
    "May the magic of this Eid bring lots of happiness in your life. Eid Mubarak!",
    "Let this special occasion of Eid adorn your life with the colors of heaven. I wish a wonderful Eid day for you and your family."
  ],
  christmas: [
    "Merry Christmas! Wishing you all the happiness your holiday can hold.",
    "May your Christmas sparkle with moments of love, laughter, and goodwill. Merry Christmas!",
    "Wishing you a season that’s merry and bright with the light of God’s love. Merry Christmas!",
    "May the Christmas season fill your home with joy, your heart with love, and your life with laughter.",
    "Merry Christmas and a Happy New Year! Wishing you the best this holiday season."
  ],
  new_year: [
    "Wishing you a Happy New Year with the hope that you will have many blessings in the year to come.",
    "May the new year bring you warmth, love, and light to guide your path to a positive destination. Happy New Year!",
    "Cheers to a new year and another chance for us to get it right. Happy New Year!",
    "As the new year dawns, I hope it is filled with the promises of a brighter tomorrow. Happy New Year!",
    "Wishing you a year of new beginnings, new opportunities, and new heights. Happy New Year!"
  ]
};

type Festival = keyof typeof festivalWishes;

export function FestivalWishGenerator() {
  const [selectedFestival, setSelectedFestival] = useState<Festival>('diwali');
  const [copiedMessage, setCopiedMessage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCopy = (message: string) => {
    navigator.clipboard.writeText(message);
    setCopiedMessage(message);
    toast({ title: 'Message copied to clipboard!' });
    setTimeout(() => setCopiedMessage(null), 2000);
  };
  
  const messages = festivalWishes[selectedFestival] || [];

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">Festival Wish Message Generator</CardTitle>
        <CardDescription>
          Create pre-written messages for Diwali, Holi, Eid, etc., to send to customers.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <div className="w-full sm:w-64 space-y-2">
            <label className="text-lg font-medium">Select a Festival</label>
            <Select onValueChange={(value: Festival) => setSelectedFestival(value)} value={selectedFestival}>
                <SelectTrigger className="h-12 text-lg">
                    <SelectValue placeholder="Select festival" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="diwali">Diwali</SelectItem>
                    <SelectItem value="holi">Holi</SelectItem>
                    <SelectItem value="eid">Eid</SelectItem>
                    <SelectItem value="christmas">Christmas</SelectItem>
                    <SelectItem value="new_year">New Year</SelectItem>
                </SelectContent>
            </Select>
          </div>
        </div>

        {messages.length > 0 && (
          <div className="border-t pt-6 space-y-4">
            <h3 className="text-xl font-semibold">Generated Messages for {selectedFestival.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</h3>
            <div className="space-y-3">
              {messages.map((message, index) => (
                <div key={index} className="bg-muted/50 p-3 rounded-lg flex items-center justify-between gap-2 animate-fade-in" style={{ animationDelay: `${index * 50}ms`}}>
                  <p className="text-sm font-medium">{message}</p>
                  <Button variant="ghost" size="icon" onClick={() => handleCopy(message)}>
                    {copiedMessage === message ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
