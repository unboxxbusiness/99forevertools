'use client';
import React, { SVGProps, useState, useEffect } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

export const StickyBanner = ({
  className,
  children,
  hideOnScroll = false,
}: {
  className?: string;
  children: React.ReactNode;
  hideOnScroll?: boolean;
}) => {
  const [open, setOpen] = useState(false); // Default to closed until we check storage
  const { scrollY } = useScroll();

  useEffect(() => {
    const isBannerClosed = sessionStorage.getItem('bannerClosed');
    if (isBannerClosed !== 'true') {
      setOpen(true);
    }
  }, []);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const isBannerClosed = sessionStorage.getItem('bannerClosed');
    if (isBannerClosed === 'true') {
      setOpen(false);
      return;
    }
    if (hideOnScroll && latest > 40) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  });

  const handleClose = () => {
    setOpen(false);
    sessionStorage.setItem('bannerClosed', 'true');
  };

  return (
    <motion.div
      className={cn(
        'sticky inset-x-0 top-0 z-50 flex min-h-12 w-full items-center justify-center bg-primary px-4 py-2 text-primary-foreground print-hidden',
        className
      )}
      initial={{
        y: -100,
        opacity: 0,
      }}
      animate={{
        y: open ? 0 : -100,
        opacity: open ? 1 : 0,
      }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
    >
      {children}

      <motion.button
        initial={{
          scale: 0,
        }}
        animate={{
          scale: 1,
        }}
        className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
        onClick={handleClose}
      >
        <X className="h-5 w-5" />
      </motion.button>
    </motion.div>
  );
};
