'use client';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeaderProps {
  title: string;
  backHref?: string;
  rightAction?: { label: string; onClick: () => void };
  rightText?: string;
}

export function Header({ title, backHref, rightAction, rightText }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-2 min-w-0">
          {backHref && (
            <Link
              href={backHref}
              aria-label="뒤로 가기"
              className={cn(buttonVariants({ variant: 'ghost', size: 'icon-sm' }), '-ml-1')}
            >
              <span className="text-lg">←</span>
            </Link>
          )}
          <h1 className="text-lg font-semibold text-foreground truncate">{title}</h1>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {rightText && (
            <span className="text-sm text-muted-foreground truncate max-w-[120px]">
              {rightText}
            </span>
          )}
          {rightAction && (
            <Button variant="ghost" size="sm" onClick={rightAction.onClick}>
              {rightAction.label}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
