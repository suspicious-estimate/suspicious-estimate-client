'use client';
import { Card } from '@/components/ui/card';

interface MissingItemProps {
  title: string;
  description: string;
}

export function MissingItem({ title, description }: MissingItemProps) {
  return (
    <Card size="sm" className="border-success/30 bg-success/10 ring-success/20">
      <div className="flex items-start gap-2.5 px-3">
        <span className="text-base flex-shrink-0 mt-0.5">📋</span>
        <div>
          <p className="text-sm font-medium text-success">{title}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        </div>
      </div>
    </Card>
  );
}
