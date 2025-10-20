'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, FileSpreadsheet, Upload, CheckCircle } from 'lucide-react';
import { cleanCsvAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { type CleanedCsvData } from '@/app/csv-cleaner/page';
import { Input } from '../ui/input';

type CsvCleanerFormProps = {
  setCleanedData: (data: CleanedCsvData) => void;
  setIsLoading: (isLoading: boolean) => void;
  setHasGenerated: (hasGenerated: boolean) => void;
};

export function CsvCleanerForm({ setCleanedData, setIsLoading, setHasGenerated }: CsvCleanerFormProps) {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      if (selectedFile.type === 'text/csv') {
        setFile(selectedFile);
      } else {
        toast({
          variant: 'destructive',
          title: 'Invalid file type',
          description: 'Please upload a .csv file.',
        });
        setFile(null);
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  async function handleSubmit() {
    if (!file) {
      toast({
        variant: 'destructive',
        title: 'No file selected',
        description: 'Please upload a CSV file to clean.',
      });
      return;
    }

    setIsLoading(true);
    setIsSubmitting(true);
    setHasGenerated(true);
    setCleanedData(null);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const csvContent = e.target?.result as string;
      try {
        const result = await cleanCsvAction({ csvContent });

        if (result.error) {
          toast({
            variant: 'destructive',
            title: 'An error occurred',
            description: result.error,
          });
          setCleanedData(null);
        } else {
          setCleanedData(result.data);
        }
      } catch (err) {
        toast({
          variant: 'destructive',
          title: 'An unexpected error occurred',
          description: 'Please check the file and try again.',
        });
        setCleanedData(null);
      } finally {
        setIsLoading(false);
        setIsSubmitting(false);
      }
    };
    reader.readAsText(file);
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">Clean Your CSV</CardTitle>
        <CardDescription>
          Upload a CSV of leads to standardize formatting (names, phones, etc.).
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div
          className="border-2 border-dashed border-muted-foreground/50 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
          onClick={handleUploadClick}
        >
          <Input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".csv"
          />
          {file ? (
            <div className="flex flex-col items-center gap-2 text-green-500">
              <CheckCircle className="h-10 w-10" />
              <p className="font-semibold">{file.name}</p>
              <p className="text-xs text-muted-foreground">Ready to clean!</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Upload className="h-10 w-10" />
              <p className="font-semibold">Click to upload a .CSV file</p>
              <p className="text-xs">or drag and drop</p>
            </div>
          )}
        </div>
        <Button onClick={handleSubmit} disabled={isSubmitting || !file} className="w-full text-lg py-6">
          {isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <FileSpreadsheet className="mr-2 h-5 w-5" />
              Clean CSV
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
