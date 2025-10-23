'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check, Network, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function WhatIsMyIp() {
  const [ipAddress, setIpAddress] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchIp = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        if (!response.ok) {
          throw new Error('Failed to fetch IP address.');
        }
        const data = await response.json();
        setIpAddress(data.ip);
      } catch (error) {
        console.error(error);
        setIpAddress('Could not fetch IP');
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to fetch your IP address. Please try again later.',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchIp();
  }, [toast]);

  const handleCopy = () => {
    if (!ipAddress || ipAddress === 'Could not fetch IP') return;
    navigator.clipboard.writeText(ipAddress);
    setCopied(true);
    toast({ title: 'IP Address copied to clipboard!' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">What Is My IP?</CardTitle>
        <CardDescription>
          This tool shows your current public IP address.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-muted/50 p-8 rounded-lg flex flex-col items-center justify-center text-center space-y-4 h-48">
          {isLoading ? (
            <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span>Fetching your IP address...</span>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">Your Public IP Address is:</p>
              <h2 className="text-4xl font-bold font-mono text-primary break-all">{ipAddress}</h2>
            </>
          )}
        </div>
        <Button onClick={handleCopy} disabled={isLoading || !ipAddress || ipAddress === 'Could not fetch IP'} className="w-full text-lg py-6">
          {copied ? <Check className="mr-2 h-5 w-5" /> : <Copy className="mr-2 h-5 w-5" />}
          {copied ? 'Copied!' : 'Copy IP Address'}
        </Button>
      </CardContent>
    </Card>
  );
}