'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Rocket, Share2, Facebook, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Footer() {
  const { toast } = useToast();
  const [pageUrl, setPageUrl] = useState('');

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);


  const handleCopyLink = () => {
    navigator.clipboard.writeText(pageUrl).then(() => {
      toast({
        title: 'Link Copied!',
        description: 'The page URL has been copied to your clipboard.',
      });
    });
  };
  
  const socialShareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(pageUrl)}`,
  }

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
             <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
                <a href={socialShareLinks.facebook} target="_blank" rel="noopener noreferrer">
                    <Facebook className="mr-2 h-4 w-4"/>Facebook
                </a>
            </DropdownMenuItem>
             <DropdownMenuItem asChild>
                <a href={socialShareLinks.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="mr-2 h-4 w-4"/>Twitter
                </a>
            </DropdownMenuItem>
             <DropdownMenuItem asChild>
                <a href={socialShareLinks.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-4 w-4"/>LinkedIn
                </a>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleCopyLink}>
                <LinkIcon className="mr-2 h-4 w-4"/>Copy Link
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </footer>
  );
}
