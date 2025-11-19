'use client';

import { useCallback, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { allTools } from '@/lib/tools';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';

const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');

export function CategoryNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [currentScroll, setCurrentScroll] = useState(0);

  // Track active category on scroll
  useEffect(() => {
    const handleScroll = () => {
      setCurrentScroll(window.scrollY);
      
      // Find which category section is currently in view
      const sections = allTools.map(cat => ({
        slug: slugify(cat.category),
        category: cat.category,
      }));

      for (const section of sections) {
        const element = document.getElementById(section.slug);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveCategory(section.slug);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCategory = useCallback((slug: string) => {
    setIsOpen(false);
    
    const target = document.getElementById(slug);
    if (!target) {
      console.warn('Category section not found:', slug);
      return;
    }

    const headerHeight = document.querySelector('header')?.clientHeight || 160;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: 'smooth',
    });

    // Update hash
    window.history.replaceState(null, '', `/#${slug}`);
    setActiveCategory(slug);
  }, []);

  const handleCategoryClick = useCallback((slug: string) => {
    if (pathname !== '/') {
      router.push(`/#${slug}`);
      setTimeout(() => scrollToCategory(slug), 300);
      return;
    }
    scrollToCategory(slug);
  }, [pathname, router, scrollToCategory]);

  return (
    <nav className="relative w-full border-b border-border/40 bg-background/98 backdrop-blur-md sticky top-[var(--header-height)] z-40 print-hidden">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="flex items-center justify-between gap-2 py-3 xs:py-3.5 sm:py-4">
          {/* Desktop Category Links */}
          <div className="hidden sm:flex items-center gap-0.5 md:gap-1 overflow-x-auto scrollbar-hide">
            {allTools.map((category) => {
              const slug = slugify(category.category);
              const isActive = activeCategory === slug;
              
              return (
                <button
                  key={category.category}
                  onClick={() => handleCategoryClick(slug)}
                  className={`relative px-3 md:px-4 py-2 text-xs md:text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                    isActive
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span className="relative">
                    {category.category}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mobile Category Sheet */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="sm:hidden flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Open categories menu"
            >
              <Menu className="h-5 w-5 text-foreground flex-shrink-0" />
              <span className="text-sm font-medium text-foreground">Categories</span>
            </button>
            
            <SheetContent side="left" className="w-3/4 max-w-sm">
              <SheetHeader>
                <SheetTitle>Categories</SheetTitle>
              </SheetHeader>
              
              <div className="space-y-1 mt-6">
                {allTools.map((category) => {
                  const slug = slugify(category.category);
                  const isActive = activeCategory === slug;

                  return (
                    <SheetClose asChild key={category.category}>
                      <button
                        onClick={() => handleCategoryClick(slug)}
                        className={`w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                          isActive
                            ? 'bg-primary/10 text-primary'
                            : 'text-foreground hover:bg-muted'
                        }`}
                      >
                        {category.category}
                      </button>
                    </SheetClose>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
