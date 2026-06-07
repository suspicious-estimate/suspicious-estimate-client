'use client';
import { formatFileSize, cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface QuotaBarProps {
  used: number;
  limit: number;
  plan: string;
  fileCount?: number;
  fileLimit?: number;
}

export function QuotaBar({ used, limit, plan, fileCount, fileLimit }: QuotaBarProps) {
  const percentage = Math.min((used / limit) * 100, 100);
  const level = percentage >= 90 ? 'danger' : percentage >= 70 ? 'warn' : 'safe';

  const indicatorClass = {
    safe: '[&_[data-slot=progress-indicator]]:bg-primary',
    warn: '[&_[data-slot=progress-indicator]]:bg-warning',
    danger: '[&_[data-slot=progress-indicator]]:bg-danger',
  }[level];

  const textColor = {
    safe: 'text-foreground',
    warn: 'text-warning',
    danger: 'text-danger',
  }[level];

  return (
    <div className="px-4 py-3">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-medium text-muted-foreground uppercase">{plan} 플랜</span>
        <span className={cn('text-xs font-medium', textColor)}>
          {formatFileSize(used)} / {formatFileSize(limit)}
        </span>
      </div>

      <Progress
        value={percentage}
        className={cn(
          '[&_[data-slot=progress-track]]:h-2 [&_[data-slot=progress-track]]:bg-foreground/10',
          indicatorClass,
        )}
      />

      {fileCount !== undefined && fileLimit !== undefined && (
        <p className="text-xs text-muted-foreground mt-1 text-right">
          파일 {fileCount} / {fileLimit}개
        </p>
      )}
    </div>
  );
}
