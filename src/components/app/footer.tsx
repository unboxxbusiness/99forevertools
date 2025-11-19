
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Facebook,
  Instagram,
  Linkedin,
  Moon,
  Send,
  Sun,
  Twitter,
  Share2,
  Link as LinkIcon,
  Rocket,
} from 'lucide-react';
import { Logo } from '@/components/logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { FooterOffer } from './footer-offer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useTheme } from 'next-themes';

const quickLinks = [
  { title: 'Calculators', href: '/#financial-calculators' },
  { title: 'Content & SEO', href: '/#content-writing' },
  { title: 'Branding & Design', href: '/#branding-design' },
  { title: 'Image & Video', href: '/#image-video-tools' },
  { title: 'Web & Utilities', href: '/#web-utilities' },
];

const legalLinks = [
  { title: 'Terms of Use', href: '/terms-of-use' },
  { title: 'Privacy Policy', href: '/privacy-policy' },
  { title: 'Refund Policy', href: '/refund-policy' },
];

export function Footer() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const pathname = usePathname();
  const { toast } = useToast();
  const [pageUrl, setPageUrl] = React.useState('');

  React.useEffect(() => {
    setMounted(true);
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
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      pageUrl
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      pageUrl
    )}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
      pageUrl
    )}`,
  };
  
  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: 'Subscribed!',
      description: 'Thanks for joining our newsletter.',
    });
    const form = e.target as HTMLFormElement;
    form.reset();
  }

  return (
    <footer className="border-t border-border/50 print-hidden">
      {pathname !== '/offer' && <FooterOffer />}
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
             <p className="text-muted-foreground">
              A collection of free tools to supercharge your business growth.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <nav className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="block transition-colors hover:text-primary"
                >
                  {link.title}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <address className="space-y-2 text-sm not-italic text-muted-foreground">
              <p>Delhi, India</p>
              <p>Email: info@foreversite.shop</p>
            </address>
          </div>
          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold">Share & Settings</h3>
             <div className="mb-6 flex space-x-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="rounded-full">
                        <Share2 className="h-4 w-4" />
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="top">
                    <DropdownMenuItem asChild>
                        <a
                        href={socialShareLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        <Facebook className="mr-2 h-4 w-4" />
                        Facebook
                        </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <a
                        href={socialShareLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        <Twitter className="mr-2 h-4 w-4" />
                        Twitter
                        </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <a
                        href={socialShareLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        <Linkedin className="mr-2 h-4 w-4" />
                        LinkedIn
                        </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleCopyLink}>
                        <LinkIcon className="mr-2 h-4 w-4" />
                        Copy Link
                    </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
             {mounted && (
                <div className="flex items-center space-x-2">
                    <Sun className="h-4 w-4" />
                    <Switch
                        id="dark-mode"
                        checked={theme === 'dark'}
                        onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    />
                    <Moon className="h-4 w-4" />
                    <Label htmlFor="dark-mode" className="sr-only">
                        Toggle dark mode
                    </Label>
                </div>
            )}
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} 99forevertools. All rights reserved.
          </p>
          <nav className="flex flex-wrap justify-center gap-4 text-sm">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-primary"
              >
                {link.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
