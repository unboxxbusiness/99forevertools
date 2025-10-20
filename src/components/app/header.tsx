import { Mail } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-border/50 sticky top-0 bg-background/95 backdrop-blur-sm z-10">
      <div className="container mx-auto px-4 py-4 flex items-center gap-3">
        <Mail className="h-7 w-7 text-primary" />
        <h1 className="text-2xl font-bold tracking-tighter text-foreground">
          Email Permutator
        </h1>
      </div>
    </header>
  );
}
