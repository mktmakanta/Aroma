import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface StatusAlertProps {
  title?: string;
  message: string;
}

export function StatusAlert({ title = 'Error', message }: StatusAlertProps) {
  return (
    <Alert variant="destructive" className="rounded-xl shadow-sm">
      <AlertCircle className="h-5 w-5" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
