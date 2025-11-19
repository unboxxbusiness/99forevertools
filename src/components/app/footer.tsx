
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Share2, Facebook, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname } from 'next/navigation';
import { OfferCtaFooter } from './offer-cta-footer';
import { Logo } from '../logo';

const footerLinks = [
    { title: 'Terms of Use', href: '/terms-of-use' },
    { title: 'Privacy Policy', href: '/privacy-policy' },
    { title: 'Refund Policy', href: '/refund-policy' },
]

export function Footer() {
  const { toast } = useToast();
  const [pageUrl, setPageUrl] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    setPageUrl(window.location.href);
  }, [pathname]);

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
      {pathname !== '/offer' && <OfferCtaFooter />}
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
             <Link
                href="/"
                aria-label="go home"
                className="mx-auto block size-fit">
                <Logo />
            </Link>
             <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
                {footerLinks.map((link, index) => (
                    <Link
                        key={index}
                        href={link.href}
                        className="text-muted-foreground hover:text-primary block duration-150">
                        <span>{link.title}</span>
                    </Link>
                ))}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary p-0 h-auto">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="top">
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
            <span className="text-muted-foreground block text-center text-sm"> © {new Date().getFullYear()} 99forevertools, All rights reserved</span>
        </div>
    </footer>
  );
}
