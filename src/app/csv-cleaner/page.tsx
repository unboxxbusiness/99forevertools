import { Header } from '@/components/app/header';
import { CsvCleanerForm } from '@/components/app/csv-cleaner-form';
import { CsvCleanerResults } from '@/components/app/csv-cleaner-results';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free CSV Cleaner Tool | 99forevertools',
  description: 'Clean and standardize data in your CSV files. Upload a CSV of leads to standardize formatting for names, phone numbers, and more.',
};

export type CleanedCsvData = {
  headers: string[];
  rows: { [key: string]: string }[];
} | null;

export default function CsvCleanerPage() {
  // The state and logic are handled within the client components
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="mb-6">
          <Button asChild variant="ghost" className="pl-0">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tools
            </Link>
          </Button>
        </div>
        {/* We pass state management down to the client components */}
        <CsvCleanerFormWrapper />
      </main>
    </div>
  );
}

// Create a wrapper component to contain the client-side logic
function CsvCleanerFormWrapper() {
  'use client';

  const [cleanedData, setCleanedData] = useState<CleanedCsvData>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  return (
    <div className="space-y-12">
      <CsvCleanerForm
        setCleanedData={setCleanedData}
        setIsLoading={setIsLoading}
        setHasGenerated={setHasGenerated}
      />
      <CsvCleanerResults
        cleanedData={cleanedData}
        isLoading={isLoading}
        hasGenerated={hasGenerated}
      />
    </div>
  );
}
