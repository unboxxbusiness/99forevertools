

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
      <Card className="relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-border/60 bg-card/95 p-4 xs:p-5 md:p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-primary/60 hover:shadow-xl hover:shadow-primary/15">
        <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-br from-primary/0 via-primary/5 to-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="relative flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/20">
            {icon}
          </div>
          <div className="flex flex-col min-w-0">
            <CardTitle className="text-sm xs:text-base sm:text-base md:text-lg font-semibold leading-tight text-foreground">
              {title}
            </CardTitle>
            <CardDescription className="mt-1 text-[11px] xs:text-xs sm:text-xs md:text-sm text-muted-foreground line-clamp-2">
              {description}
            </CardDescription>
          </div>
        </div>
      </Card>
    </Link>
  );
}
