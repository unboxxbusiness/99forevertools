
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
      <Card className="h-full bg-card hover:border-primary/50 transition-colors duration-300 ease-in-out hover:shadow-2xl hover:shadow-primary/10 p-6 flex flex-col items-start gap-4">
          <div className="p-3 rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
          <div className='flex flex-col'>
            <CardTitle className="text-lg font-bold">{title}</CardTitle>
            <CardDescription className="mt-1 text-muted-foreground text-sm">
              {description}
            </CardDescription>
          </div>
      </Card>
    </Link>
  );
}
