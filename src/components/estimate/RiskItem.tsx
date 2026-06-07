'use client';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface RiskItemProps {
  level: 'high' | 'medium' | 'low';
  title: string;
  description: string;
}

export function RiskItem({ level, title, description }: RiskItemProps) {
  const levelStyles = {
    high: { icon: '🔴', card: 'border-danger/30 bg-danger/10 ring-danger/20', text: 'text-danger' },
    medium: {
      icon: '🟡',
      card: 'border-warning/30 bg-warning/10 ring-warning/20',
      text: 'text-warning',
    },
    low: {
      icon: '📋',
      card: 'border-accent bg-accent/30 ring-accent',
      text: 'text-accent-foreground',
    },
  };

  const style = levelStyles[level];

  return (
    <Card size="sm" className={cn('border', style.card)}>
      <div className="flex items-start gap-2.5 px-3">
        <span className="text-base flex-shrink-0 mt-0.5">{style.icon}</span>
        <div>
          <p className={cn('text-sm font-medium', style.text)}>{title}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        </div>
      </div>
    </Card>
  );
}
