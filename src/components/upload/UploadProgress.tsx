'use client';
import { UploadStep } from '@/types/common';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface UploadProgressProps {
  steps: UploadStep[];
  currentStep: number;
  estimatedTime?: string;
}

export function UploadProgress({ steps, estimatedTime }: UploadProgressProps) {
  const statusIcons: Record<string, string> = {
    pending: '⏳',
    processing: '⚙️',
    completed: '✅',
    failed: '❌',
  };

  return (
    <div className="p-4 space-y-4">
      <div className="text-center mb-6">
        <div className="text-3xl mb-2">🤖</div>
        <p className="font-medium text-foreground">AI가 분석 중입니다</p>
        {estimatedTime && (
          <p className="text-sm text-muted-foreground mt-1">예상 소요시간: {estimatedTime}</p>
        )}
      </div>

      <div className="space-y-3">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className={cn(
              'flex items-center gap-3 p-3 rounded-lg border',
              step.status === 'processing'
                ? 'border-primary/40 bg-accent/30'
                : step.status === 'completed'
                  ? 'border-success/30 bg-success/10'
                  : 'border-border bg-muted/40',
            )}
          >
            <span className="text-lg">
              {step.status === 'processing' ? (
                <span className="inline-block w-5 h-5 border-2 border-muted border-t-foreground rounded-full animate-spin" />
              ) : (
                statusIcons[step.status]
              )}
            </span>
            <div className="flex-1">
              <p
                className={cn(
                  'text-sm font-medium',
                  step.status === 'completed'
                    ? 'text-success'
                    : step.status === 'processing'
                      ? 'text-foreground'
                      : 'text-muted-foreground',
                )}
              >
                {step.label}
              </p>
              {step.detail && <p className="text-xs text-muted-foreground mt-0.5">{step.detail}</p>}
              {step.status === 'processing' && step.progress !== undefined && (
                <Progress
                  value={step.progress}
                  className="mt-1.5 [&_[data-slot=progress-track]]:h-1.5 [&_[data-slot=progress-track]]:bg-foreground/10"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
