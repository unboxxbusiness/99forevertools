
'use client';

import Link from 'next/link';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';

type ToolCardProps = {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

export function ToolCard({ href, title, description, icon }: ToolCardProps) {
  return (
    <Link href={href} className="group block h-full">
      <Card className="h-full bg-card hover:border-primary/50 transition-colors duration-300 ease-in-out hover:shadow-2xl hover:shadow-primary/10 p-3 xs:p-4 sm:p-4 md:p-6 flex flex-col items-start gap-2 xs:gap-3 sm:gap-3 md:gap-4">
          <div className="p-1.5 xs:p-2 sm:p-2 md:p-3 rounded-lg bg-primary/10 text-primary flex-shrink-0">
            {icon}
          </div>
          <div className='flex flex-col min-w-0 w-full'>
            <CardTitle className="text-sm xs:text-base sm:text-base md:text-lg font-bold truncate leading-tight">
              {title}
            </CardTitle>
            <CardDescription className="mt-0.5 xs:mt-1 sm:mt-1 text-muted-foreground text-[11px] xs:text-xs sm:text-xs md:text-sm line-clamp-2 leading-snug">
              {description}
            </CardDescription>
          </div>
      </Card>
    </Link>
  );
}
