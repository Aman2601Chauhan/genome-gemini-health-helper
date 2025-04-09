
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Brain, 
  Heart, 
  Activity, 
  Dna, 
  ShieldCheck, 
  AlertTriangle, 
  Info
} from 'lucide-react';

type InsightCategory = 'genetic' | 'lifestyle' | 'medical' | 'prediction';
type InsightPriority = 'high' | 'medium' | 'low' | 'info';

interface InsightItem {
  title: string;
  description: string;
  priority: InsightPriority;
}

interface HealthInsightCardProps {
  category: InsightCategory;
  title: string;
  insights: InsightItem[];
  className?: string;
}

const HealthInsightCard: React.FC<HealthInsightCardProps> = ({
  category,
  title,
  insights,
  className,
}) => {
  const categoryIcons = {
    genetic: <Dna className="h-5 w-5" />,
    lifestyle: <Activity className="h-5 w-5" />,
    medical: <Heart className="h-5 w-5" />,
    prediction: <Brain className="h-5 w-5" />,
  };

  const categoryColors = {
    genetic: 'text-genomic-blue',
    lifestyle: 'text-purple-600',
    medical: 'text-red-600',
    prediction: 'text-amber-600',
  };

  const priorityIcons = {
    high: <AlertTriangle className="h-4 w-4 text-red-500" />,
    medium: <AlertTriangle className="h-4 w-4 text-amber-500" />,
    low: <ShieldCheck className="h-4 w-4 text-green-500" />,
    info: <Info className="h-4 w-4 text-blue-500" />,
  };

  const priorityBgColors = {
    high: 'bg-red-50',
    medium: 'bg-amber-50',
    low: 'bg-green-50',
    info: 'bg-blue-50',
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden hover-card-effect",
        className
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={cn("mr-2", categoryColors[category])}>
              {categoryIcons[category]}
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {insights.map((insight, index) => (
            <li 
              key={index} 
              className={cn(
                "p-3 rounded-md",
                priorityBgColors[insight.priority]
              )}
            >
              <div className="flex">
                <div className="mr-2 mt-0.5">{priorityIcons[insight.priority]}</div>
                <div>
                  <h4 className="text-sm font-medium mb-1">{insight.title}</h4>
                  <p className="text-xs text-muted-foreground">{insight.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default HealthInsightCard;
