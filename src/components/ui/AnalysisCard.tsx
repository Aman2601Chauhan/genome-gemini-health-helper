
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dna, Fingerprint, Sparkles, ChevronRight, Clock } from 'lucide-react';

interface AnalysisCardProps {
  title: string;
  description: string;
  type: 'risk' | 'trait' | 'ancestry' | 'medication';
  status: 'complete' | 'in-progress' | 'pending';
  timestamp?: string;
  confidence?: number;
  onClick?: () => void;
  className?: string;
}

const AnalysisCard: React.FC<AnalysisCardProps> = ({
  title,
  description,
  type,
  status,
  timestamp,
  confidence = 0,
  onClick,
  className,
}) => {
  const typeIcon = {
    'risk': <Dna className="h-5 w-5" />,
    'trait': <Fingerprint className="h-5 w-5" />,
    'ancestry': <Sparkles className="h-5 w-5" />,
    'medication': <Clock className="h-5 w-5" />,
  };

  const typeColors = {
    'risk': 'bg-red-50 text-red-700 border-red-200',
    'trait': 'bg-purple-50 text-purple-700 border-purple-200',
    'ancestry': 'bg-amber-50 text-amber-700 border-amber-200',
    'medication': 'bg-blue-50 text-blue-700 border-blue-200',
  };

  const statusBadgeVariant = {
    'complete': 'bg-green-50 text-green-700 border-green-200',
    'in-progress': 'bg-amber-50 text-amber-700 border-amber-200',
    'pending': 'bg-gray-50 text-gray-600 border-gray-200',
  };

  const statusText = {
    'complete': 'Complete',
    'in-progress': 'Processing',
    'pending': 'Pending',
  };

  const confidenceColors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-amber-500',
    'bg-yellow-500',
    'bg-lime-500',
    'bg-green-500',
  ];

  const getConfidenceColor = (conf: number) => {
    const index = Math.min(Math.floor(conf * 5), 5);
    return confidenceColors[index];
  };

  return (
    <Card 
      className={cn(
        "hover-card-effect overflow-hidden",
        status === 'in-progress' ? 'border-amber-200' : '',
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex flex-col space-y-1">
            <CardTitle className="text-lg">{title}</CardTitle>
            {timestamp && (
              <p className="text-xs text-muted-foreground flex items-center">
                <Clock className="h-3 w-3 mr-1" /> 
                {timestamp}
              </p>
            )}
          </div>
          <div className="flex space-x-2">
            <Badge
              variant="outline"
              className={cn(
                "rounded-full text-xs font-normal border",
                typeColors[type]
              )}
            >
              <span className="flex items-center">
                {typeIcon[type]}
                <span className="ml-1">{type}</span>
              </span>
            </Badge>
            <Badge
              variant="outline"
              className={cn(
                "rounded-full text-xs font-normal border",
                statusBadgeVariant[status]
              )}
            >
              {statusText[status]}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
        
        {status === 'complete' && confidence > 0 && (
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span>Confidence</span>
              <span className="font-medium">{Math.round(confidence * 100)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5">
              <div 
                className={`h-1.5 rounded-full ${getConfidenceColor(confidence)}`} 
                style={{ width: `${confidence * 100}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-1">
        <Button
          variant="ghost"
          size="sm"
          className="ml-auto text-xs"
          disabled={status !== 'complete'}
        >
          View details <ChevronRight className="ml-1 h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AnalysisCard;
