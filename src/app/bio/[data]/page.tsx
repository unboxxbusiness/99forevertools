
'use client';

import { useState, useEffect } from 'react';
import { User, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { notFound } from 'next/navigation';

type BioData = {
  name: string;
  bio: string;
  image: string;
  links: { title: string; url: string }[];
};

// This function decodes a URL-safe Base64 string
const urlSafeBase64Decode = (str: string) => {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) {
        str += '=';
    }
    return atob(str);
};

export default function BioPage({ params: { data: encodedData } }: { params: { data: string } }) {
  const [data, setData] = useState<BioData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      // Decode the URL-safe base64 string
      const decodedData = decodeURIComponent(urlSafeBase64Decode(encodedData));
      const parsedData = JSON.parse(decodedData);
      setData(parsedData);
    } catch (error) {
      console.error("Failed to parse bio data", error);
      setError(true);
    }
  }, [encodedData]);

  if (error) {
    notFound();
  }

  if (!data) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-background text-foreground p-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
      </div>
    );
  }
  
  const { name, bio, image, links } = data;

  return (
    <div className="flex flex-col min-h-screen items-center bg-background text-foreground p-4 pt-12 font-sans">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
            <div className="w-28 h-28 mx-auto rounded-full bg-muted flex items-center justify-center overflow-hidden border-4 border-primary/50 shadow-lg">
                {image ? (
                <img src={image} alt={name} className="w-full h-full object-cover" />
                ) : (
                <User className="w-16 h-16 text-muted-foreground" />
                )}
            </div>
            <h1 className="text-3xl font-bold mt-4">{name}</h1>
            <p className="text-md text-muted-foreground mt-2 max-w-xs mx-auto">{bio}</p>
        </div>
        <div className="space-y-4">
            {links.map((link, index) => (
              <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="block animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
                  <Button variant="secondary" className="w-full h-16 text-lg shadow-md hover:scale-105 transition-transform">
                      {link.title || 'Your Link Title'}
                  </Button>
              </a>
            ))}
        </div>
      </div>
       <footer className="text-center p-6 mt-auto text-sm text-muted-foreground">
        Created with Marketing ToolKit
      </footer>
    </div>
  );
}
