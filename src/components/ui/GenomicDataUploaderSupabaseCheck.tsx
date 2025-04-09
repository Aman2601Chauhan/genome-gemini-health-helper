
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { 
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface SupabaseCheckProps {
  isConfigured: boolean;
}

const GenomicDataUploaderSupabaseCheck: React.FC<SupabaseCheckProps> = ({ isConfigured }) => {
  if (isConfigured) return null;

  return (
    <Alert variant="destructive" className="mb-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Supabase Configuration Required</AlertTitle>
      <AlertDescription>
        <p className="mb-2">
          Your Supabase connection is not properly configured. The application cannot function correctly without it.
        </p>
        <p className="mb-2">
          Please refresh your browser after connecting your Supabase project.
        </p>
      </AlertDescription>
    </Alert>
  );
};

export default GenomicDataUploaderSupabaseCheck;
