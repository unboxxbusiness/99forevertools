'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Copy, Bot, Shield, ShieldAlert, ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

type PasswordGeneratorResultsProps = {
  password: string;
  isLoading: boolean;
  hasGenerated: boolean;
};

const getStrength = (password: string) => {
    let score = 0;
    if (!password) return { score: 0, label: '', color: '' };
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    if (score < 3) return { score, label: 'Weak', color: 'text-red-500' };
    if (score < 5) return { score, label: 'Medium', color: 'text-yellow-500' };
    return { score, label: 'Strong', color: 'text-green-500' };
}

export function PasswordGeneratorResults({ password, isLoading, hasGenerated }: PasswordGeneratorResultsProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    toast({ title: 'Password copied to clipboard!' });
    setTimeout(() => setCopied(false), 2000);
  };

  const renderSkeleton = () => (
    <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-6 w-1/4 mx-auto" />
    </div>
  );

  const renderInitialState = () => (
     <div className="text-center py-16 border-2 border-dashed rounded-lg border-muted h-full flex flex-col justify-center">
        <Bot className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">Your new password will appear here</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Configure the options on the left to get started.
        </p>
      </div>
  );
  
  const strength = getStrength(password);
  const StrengthIcon = () => {
      if (strength.label === 'Weak') return <ShieldAlert className={`mr-2 h-5 w-5 ${strength.color}`} />;
      if (strength.label === 'Medium') return <Shield className={`mr-2 h-5 w-5 ${strength.color}`} />;
      if (strength.label === 'Strong') return <ShieldCheck className={`mr-2 h-5 w-5 ${strength.color}`} />;
      return null;
  }

  return (
    <div className="animate-fade-in h-full" style={{ animationDelay: '150ms' }}>
      <Card className="shadow-lg bg-card border-border/50 h-full">
        <CardHeader>
            <CardTitle className="text-3xl font-bold tracking-tight">Your New Password</CardTitle>
            <CardDescription>Click the password to copy it.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-full">
          {isLoading ? (
            renderSkeleton()
          ) : hasGenerated && password ? (
            <div className="w-full text-center space-y-4">
                <div 
                    className="bg-muted/50 p-4 rounded-lg break-words text-2xl font-mono cursor-pointer hover:bg-muted transition-colors"
                    onClick={handleCopy}
                >
                    {password}
                </div>
                <div className="flex items-center justify-center">
                    <StrengthIcon />
                    <span className={`font-semibold ${strength.color}`}>{strength.label}</span>
                </div>

                <Button variant="secondary" onClick={handleCopy} className="w-full">
                    {copied ? <Check className="mr-2 h-4 w-4 text-green-500" /> : <Copy className="mr-2 h-4 w-4" />}
                    {copied ? 'Copied!' : 'Copy Password'}
                </Button>
            </div>
          ) : (
            renderInitialState()
          )}
        </CardContent>
      </Card>
    </div>
  );
}
