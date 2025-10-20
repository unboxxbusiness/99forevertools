'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Bot, Frown, PartyPopper } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { downloadAsCSV } from '@/lib/utils';
import { type CleanedCsvData } from '@/app/csv-cleaner/page';

type CsvCleanerResultsProps = {
  cleanedData: CleanedCsvData;
  isLoading: boolean;
  hasGenerated: boolean;
};

export function CsvCleanerResults({ cleanedData, isLoading, hasGenerated }: CsvCleanerResultsProps) {
  const { toast } = useToast();

  const handleExport = () => {
    if (cleanedData) {
      downloadAsCSV(cleanedData.rows, 'cleaned_leads');
      toast({
        title: 'Exported!',
        description: 'The cleaned leads have been downloaded as a CSV file.',
      });
    }
  };

  const renderSkeleton = () => (
    <div className="space-y-2">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex gap-2">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-8 w-1/3" />
        </div>
      ))}
    </div>
  );

  const renderInitialState = () => (
    <div className="text-center py-16 border-2 border-dashed rounded-lg border-muted">
      <Bot className="mx-auto h-12 w-12 text-muted-foreground" />
      <h3 className="mt-4 text-lg font-medium">Ready to clean your data?</h3>
      <p className="mt-1 text-sm text-muted-foreground">Upload a CSV file to get started.</p>
    </div>
  );

  const renderNoResultsState = () => (
    <div className="text-center py-16 border-2 border-dashed rounded-lg border-muted">
      <Frown className="mx-auto h-12 w-12 text-muted-foreground" />
      <h3 className="mt-4 text-lg font-medium">No data processed</h3>
      <p className="mt-1 text-sm text-muted-foreground">Please check your file and try again.</p>
    </div>
  );

  const renderResults = () => (
    cleanedData && (
      <>
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                {cleanedData.headers.map(header => (
                  <TableHead key={header} className="capitalize">{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {cleanedData.rows.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {cleanedData.headers.map(header => (
                    <TableCell key={`${rowIndex}-${header}`}>{row[header]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {cleanedData.rows.length > 0 && (
          <div className="mt-6 flex items-center justify-center gap-2 text-center p-4 bg-primary/10 rounded-lg animate-fade-in">
            <PartyPopper className="h-5 w-5 text-primary" />
            <p className="text-sm font-medium">Successfully cleaned {cleanedData.rows.length} rows!</p>
          </div>
        )}
      </>
    )
  );
  
  const resultsCount = hasGenerated && !isLoading && cleanedData ? cleanedData.rows.length : null;

  return (
    <div className="animate-fade-in" style={{ animationDelay: '150ms' }}>
      <Card className="shadow-lg bg-card border-border/50">
        <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-3xl font-bold tracking-tight">Cleaned Data</CardTitle>
            <CardDescription>
              {isLoading
                ? 'Processing your file...'
                : resultsCount !== null
                ? `${resultsCount} rows cleaned.`
                : 'Your cleaned data will appear here.'}
            </CardDescription>
          </div>
          {cleanedData && cleanedData.rows.length > 0 && !isLoading && (
            <Button onClick={handleExport} variant="secondary">
              <Download className="mr-2 h-4 w-4" />
              Export Cleaned CSV
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {isLoading
            ? renderSkeleton()
            : hasGenerated && !cleanedData
            ? renderNoResultsState()
            : !hasGenerated || !cleanedData
            ? renderInitialState()
            : renderResults()}
        </CardContent>
      </Card>
    </div>
  );
}
