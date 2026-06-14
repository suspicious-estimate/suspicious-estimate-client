'use client';
import Link from 'next/link';
import { CaretLeftIcon } from '@phosphor-icons/react/ssr';
import { Button } from '@/shared/ui/button';

interface HeaderProps {
  title: string;
  backHref?: string;
  rightAction?: { label: string; onClick: () => void };
  rightText?: string;
}

export function Header({ title, backHref, rightAction, rightText }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100">
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-2 min-w-0">
          {backHref && (
            <Link
              href={backHref}
              className="flex items-center justify-center w-8 h-8 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <CaretLeftIcon size={20} weight="bold" className="text-gray-700" />
            </Link>
          )}
          <h1 className="text-lg font-semibold text-gray-900 truncate">{title}</h1>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {rightText && (
            <span className="text-sm text-gray-500 truncate max-w-[120px]">{rightText}</span>
          )}
          {rightAction && (
            <Button variant="ghost" size="xs" onClick={rightAction.onClick}>
              {rightAction.label}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
