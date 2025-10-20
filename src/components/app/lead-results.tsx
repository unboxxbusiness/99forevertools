'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Bot, Frown, PartyPopper } from 'lucide-react';
import type { QualifiedLead } from '@/ai/flows/qualify-leads';
import { downloadAsCSV } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';

type LeadResultsProps = {
  leads: QualifiedLead[];
  isLoading: boolean;
  hasSearched: boolean;
};

const QualificationBadge = ({ status }: { status: string }) => {
  if (status === 'qualified') {
    return <Badge variant="default" className="bg-green-600 text-white hover:bg-green-700">Qualified</Badge>;
  }
  return <Badge variant="secondary">Unqualified</Badge>;
};

export function LeadResults({ leads, isLoading, hasSearched }: LeadResultsProps) {
  const handleExport = () => {
    downloadAsCSV(leads, 'qualified_leads');
  };

  const renderSkeleton = () => (
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
         <Skeleton key={i} className="h-16 w-full" />
      ))}
    </div>
  );

  const renderInitialState = () => (
     <div className="text-center py-16 border-2 border-dashed rounded-lg">
        <Bot className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">Ready to find leads?</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Fill out the form above to get started.
        </p>
      </div>
  );

  const renderNoResultsState = () => (
    <div className="text-center py-16 border-2 border-dashed rounded-lg">
        <Frown className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No leads found</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          We couldn't find any matching businesses. Try a different city.
        </p>
      </div>
  );
  
  const renderResults = () => (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Business Name</TableHead>
            <TableHead>Website Status</TableHead>
            <TableHead>AI Qualification</TableHead>
            <TableHead className="w-[40%]">Reason</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead, index) => (
            <TableRow key={index} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards', opacity: 0 }}>
              <TableCell className="font-medium">{lead.businessName}</TableCell>
              <TableCell>
                <Badge variant={lead.websiteStatus === 'exists' ? 'outline' : 'destructive'}>
                  {lead.websiteStatus}
                </Badge>
              </TableCell>
              <TableCell>
                <QualificationBadge status={lead.qualification} />
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">{lead.reason}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
       {leads.filter(l => l.qualification === 'qualified').length > 0 && 
        <div className="mt-6 flex items-center justify-center gap-2 text-center p-4 bg-primary/10 rounded-lg animate-fade-in">
            <PartyPopper className="h-5 w-5 text-green-500" />
            <p className="text-sm font-medium">You've got {leads.filter(l => l.qualification === 'qualified').length} qualified leads!</p>
        </div>
       }
    </>
  );
  
  const qualifiedCount = hasSearched && !isLoading ? leads.length : null;

  return (
    <div className="animate-fade-in">
      <Card className="shadow-lg bg-card/80 backdrop-blur-sm">
        <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-3xl font-bold tracking-tight">Lead Results</CardTitle>
            <CardDescription>
              {
                isLoading ? "Qualifying leads with AI..." :
                qualifiedCount !== null ? `${qualifiedCount} leads found.` :
                "Leads you generate will appear here."
              }
            </CardDescription>
          </div>
          {leads.length > 0 && !isLoading && (
            <Button onClick={handleExport} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {isLoading
            ? renderSkeleton()
            : hasSearched && leads.length === 0
            ? renderNoResultsState()
            : !hasSearched && leads.length === 0
            ? renderInitialState()
            : renderResults()
          }
        </CardContent>
      </Card>
    </div>
  );
}
