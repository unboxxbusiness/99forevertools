'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Rocket, Share2, Facebook, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { FooterOffer } from './footer-offer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Footer() {
  const { toast } = useToast();
  const [pageUrl, setPageUrl] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setPageUrl(window.location.href);
    setMounted(true);
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
      {/* Footer Offer Section */}
      <FooterOffer />
      
      {/* Main Footer Content */}
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-4 items-start">
          {/* Brand Section */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 col-span-1 md:col-span-1 justify-center md:justify-start">
            <Rocket className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-primary flex-shrink-0" />
            <span className="text-base sm:text-lg md:text-xl font-bold tracking-tighter text-foreground">
              99forevertools
            </span>
          </Link>

          {/* Copyright */}
          <p className="text-xs sm:text-xs md:text-sm text-muted-foreground col-span-1 md:col-span-1 text-center">
            &copy; {new Date().getFullYear()} 99forevertools.<br className="tiny:hidden sm:inline" /> All rights reserved.
          </p>

          {/* Share Button */}
          <div className="flex justify-center md:justify-end col-span-1 md:col-span-1">
            {mounted ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full sm:w-auto md:w-auto text-xs sm:text-xs md:text-sm h-9 sm:h-10">
                    <Share2 className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    Share
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <a href={socialShareLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-xs sm:text-xs md:text-sm">
                      <Facebook className="mr-2 h-4 w-4" />
                      Facebook
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href={socialShareLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-xs sm:text-xs md:text-sm">
                      <Twitter className="mr-2 h-4 w-4" />
                      Twitter
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href={socialShareLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs sm:text-xs md:text-sm">
                      <Linkedin className="mr-2 h-4 w-4" />
                      LinkedIn
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleCopyLink} className="text-xs sm:text-xs md:text-sm">
                    <LinkIcon className="mr-2 h-4 w-4" />
                    Copy Link
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" size="sm" className="w-full sm:w-auto md:w-auto text-xs sm:text-xs md:text-sm h-9 sm:h-10" disabled>
                <Share2 className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Share
              </Button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
