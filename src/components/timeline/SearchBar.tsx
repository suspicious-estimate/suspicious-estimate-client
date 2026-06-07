'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = '검색...' }: SearchBarProps) {
  return (
    <div className="px-4 py-2">
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none">
          🔍
        </span>
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-9 rounded-full border-transparent bg-muted pl-9 pr-9"
        />
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => onChange('')}
            aria-label="검색어 지우기"
            className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full"
          >
            ✕
          </Button>
        )}
      </div>
    </div>
  );
}
