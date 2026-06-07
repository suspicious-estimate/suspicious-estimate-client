'use client';
import { formatFileSize } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface StorageUsageProps {
  used: number;
  limit: number;
  plan: string;
}

export function StorageUsage({ used, limit, plan }: StorageUsageProps) {
  const percentage = Math.min((used / limit) * 100, 100);

  return (
    <div className="p-4">
      <Card className="gap-3 px-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">저장 공간</span>
          <Badge variant="secondary">{plan}</Badge>
        </div>

        <Progress
          value={percentage}
          className="[&_[data-slot=progress-track]]:h-3 [&_[data-slot=progress-track]]:bg-foreground/10"
        />

        <p className="text-sm text-muted-foreground">
          {formatFileSize(used)} / {formatFileSize(limit)} 사용 중
        </p>
      </Card>
    </div>
  );
}
