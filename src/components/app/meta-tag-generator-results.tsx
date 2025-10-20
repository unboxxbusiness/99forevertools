'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

type MetaTagGeneratorResultsProps = {
  title: string;
  description: string;
};

export function MetaTagGeneratorResults({ title, description }: MetaTagGeneratorResultsProps) {
  const siteUrl = 'www.example.com';

  return (
    <div className="animate-fade-in" style={{ animationDelay: '150ms' }}>
      <Card className="shadow-lg bg-card border-border/50 h-full">
        <CardHeader>
            <CardTitle className="text-3xl font-bold tracking-tight">SERP Preview</CardTitle>
            <CardDescription>
              This is how your page might appear on a Google search results page.
            </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-[#121212] p-6 rounded-lg font-sans">
              <div className="flex items-center">
                  <div className="w-7 h-7 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                      <div className="text-sm text-gray-300">Your Company</div>
                      <div className="text-xs text-gray-500">{siteUrl}</div>
                  </div>
              </div>
              <h3 className="text-xl text-[#8ab4f8] mt-2 truncate">
                  {title || 'Your Meta Title Will Appear Here'}
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                  {description || 'Your meta description will appear here. Keep it concise and compelling to attract clicks from potential customers.'}
              </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
