
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { cn } from '@/lib/utils';

interface PredictionData {
  time: string;
  value: number;
  prediction: number;
}

interface PredictionChartProps {
  title: string;
  description?: string;
  data: PredictionData[];
  dataKey?: string;
  predictionKey?: string;
  yAxisLabel?: string;
  xAxisLabel?: string;
  strokeColor?: string;
  fillColor?: string;
  predictionStrokeColor?: string;
  predictionFillColor?: string;
  className?: string;
}

const PredictionChart: React.FC<PredictionChartProps> = ({
  title,
  description,
  data,
  dataKey = 'value',
  predictionKey = 'prediction',
  yAxisLabel,
  xAxisLabel,
  strokeColor = "#0072FF",
  fillColor = "#0072FF33",
  predictionStrokeColor = "#4AD7D1",
  predictionFillColor = "#4AD7D133",
  className,
}) => {
  // Find where actual data ends and prediction begins
  const predictionStartIndex = data.findIndex(item => item[predictionKey as keyof typeof item] !== undefined);
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const isPrediction = payload.some(p => p.dataKey === predictionKey);
      
      return (
        <div className="glassmorphism p-2 border border-border rounded-md text-xs">
          <p className="font-medium">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center mt-1">
              <div 
                className="w-2 h-2 rounded-full mr-1" 
                style={{ background: entry.color }}
              />
              <span className="mr-1">
                {entry.dataKey === predictionKey ? 'Predicted:' : 'Actual:'}
              </span>
              <span className="font-medium">{entry.value}</span>
            </div>
          ))}
          {isPrediction && (
            <div className="mt-1 text-[10px] text-muted-foreground">
              Prediction based on AI analysis
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={cn("w-full h-[300px]", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 10, bottom: 15 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={strokeColor} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPrediction" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={predictionStrokeColor} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={predictionStrokeColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 10 }} 
                tickLine={false}
                axisLine={{ stroke: '#e0e0e0' }}
                label={xAxisLabel ? { value: xAxisLabel, position: 'insideBottom', offset: -5, fontSize: 10 } : undefined}
              />
              <YAxis 
                tick={{ fontSize: 10 }} 
                tickLine={false}
                axisLine={{ stroke: '#e0e0e0' }}
                label={yAxisLabel ? { 
                  value: yAxisLabel, 
                  angle: -90, 
                  position: 'insideLeft', 
                  style: { textAnchor: 'middle', fontSize: 10 } 
                } : undefined}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey={dataKey} 
                stroke={strokeColor} 
                fillOpacity={1}
                fill="url(#colorValue)"
                strokeWidth={2}
                activeDot={{ r: 4 }}
                isAnimationActive={true}
              />
              <Area
                type="monotone"
                dataKey={predictionKey}
                stroke={predictionStrokeColor}
                fillOpacity={1}
                fill="url(#colorPrediction)"
                strokeWidth={2}
                strokeDasharray="5 5"
                activeDot={{ r: 4 }}
                isAnimationActive={true}
              />
              {predictionStartIndex > 0 && (
                <CartesianGrid 
                  x={predictionStartIndex * (100 / data.length) + '%'} 
                  width={1}
                  stroke="#999"
                  strokeDasharray="5 5"
                  vertical={true}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionChart;
