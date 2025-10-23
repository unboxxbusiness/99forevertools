
'use client';

import Link from 'next/link';
import { Rocket, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export function Footer() {
  const { toast } = useToast();

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: 'Link Copied!',
        description: 'The page URL has been copied to your clipboard.',
      });
    });
  };

  return (
    <footer className="border-t border-border/50 print-hidden">
      <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <Rocket className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold tracking-tighter text-foreground">
            99forevertools
          </span>
        </Link>
        <p className="text-sm text-muted-foreground order-last sm:order-none">
          &copy; {new Date().getFullYear()} 99forevertools. All rights reserved.
        </p>
        <Button variant="outline" size="sm" onClick={handleShare}>
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </div>
    </footer>
  );
}
