'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

type ToolCardProps = {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

export function ToolCard({ href, title, description, icon }: ToolCardProps) {
  return (
    <Link href={href} className="group block">
      <Card className="h-full bg-card hover:border-primary/50 transition-colors duration-300 ease-in-out hover:shadow-2xl hover:shadow-primary/10">
        <CardHeader className="flex flex-col h-full">
          <div className="mb-4 text-primary">{icon}</div>
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          <CardDescription className="flex-grow mt-2 text-muted-foreground">{description}</CardDescription>
          <div className="flex items-center mt-6 font-semibold text-primary">
            <span>Use Tool</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
