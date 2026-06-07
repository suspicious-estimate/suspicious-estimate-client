'use client';
import { cn } from '@/lib/utils';

interface EstimateScoreProps {
  score: number;
}

export function EstimateScore({ score }: EstimateScoreProps) {
  const getScoreStyle = (s: number) => {
    if (s >= 80) return { ring: 'text-success', bg: 'bg-success/10', label: '양호' };
    if (s >= 60) return { ring: 'text-warning', bg: 'bg-warning/10', label: '주의' };
    return { ring: 'text-danger', bg: 'bg-danger/10', label: '위험' };
  };

  const { ring, bg, label } = getScoreStyle(score);

  return (
    <div className={cn('flex flex-col items-center py-8 rounded-xl', bg)}>
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" className="stroke-border" strokeWidth="8" />
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            className={ring}
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${score * 2.64} 264`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-foreground">{score}</span>
          <span className="text-xs text-muted-foreground">/ 100</span>
        </div>
      </div>
      <span className={cn('mt-3 text-sm font-medium', ring)}>{label}</span>
    </div>
  );
}
