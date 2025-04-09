
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
          Your environment variables for Supabase are not properly configured. The application cannot function correctly without them.
        </p>
        <ol className="list-decimal pl-5 mb-2 space-y-1">
          <li>Open the <code>.env.local</code> file in your project</li>
          <li>Update the <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> values</li>
          <li>Restart your development server or refresh the page</li>
        </ol>
        <p>
          See the <strong>SETUP_INSTRUCTIONS.md</strong> file for detailed instructions.
        </p>
      </AlertDescription>
    </Alert>
  );
};

export default GenomicDataUploaderSupabaseCheck;
