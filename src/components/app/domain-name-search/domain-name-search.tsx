
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Search, Loader2, CheckCircle, XCircle, Globe, ServerCrash } from 'lucide-react';
import { checkDomainAvailabilityAction } from '@/app/actions';

type DomainStatus = 'idle' | 'loading' | 'available' | 'unavailable' | 'error';
type SearchResult = {
    status: DomainStatus;
    message: string;
    domain: string;
};

export function DomainNameSearch() {
  const [domain, setDomain] = useState('');
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!domain) {
      toast({ variant: 'destructive', title: 'Domain is required' });
      return;
    }
    setSearchResult({ status: 'loading', message: '', domain });

    const result = await checkDomainAvailabilityAction({ domain });

    if (result.error) {
        setSearchResult({ status: 'error', message: result.error, domain });
    } else if (result.data) {
        setSearchResult({ 
            status: result.data.isAvailable ? 'available' : 'unavailable',
            message: result.data.message,
            domain: result.data.domain,
        });
    }
  };
  
  const ResultIcon = () => {
    if (!searchResult) return null;
    switch (searchResult.status) {
        case 'available':
            return <CheckCircle className="h-16 w-16 text-green-500" />;
        case 'unavailable':
            return <XCircle className="h-16 w-16 text-red-500" />;
        case 'error':
             return <ServerCrash className="h-16 w-16 text-yellow-500" />;
        case 'loading':
            return <Loader2 className="h-16 w-16 animate-spin text-primary" />;
        default:
            return null;
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold tracking-tight">Domain Name Search</CardTitle>
        <CardDescription>
          Check if a domain name is available.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="e.g., example.com"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10 h-12 text-lg"
            />
          </div>
          <Button onClick={handleSearch} disabled={searchResult?.status === 'loading'} className="h-12">
            <Search className="mr-2 h-5 w-5" />
            Search
          </Button>
        </div>

        {searchResult && (
            <div className="border-t pt-6 text-center space-y-4 animate-fade-in">
                <div className="flex justify-center">
                    <ResultIcon />
                </div>
                <p className="text-xl font-medium">{searchResult.message}</p>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
