
import { Rocket } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b border-border/50 sticky top-0 bg-background/90 backdrop-blur-sm z-10 print-hidden">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <Rocket className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold tracking-tighter text-foreground">
            99forevertools
          </h1>
        </Link>
      </div>
    </header>
  );
}
