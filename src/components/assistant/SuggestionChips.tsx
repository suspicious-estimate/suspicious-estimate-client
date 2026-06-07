'use client';
import { Button } from '@/components/ui/button';

interface SuggestionChipsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

export function SuggestionChips({ suggestions, onSelect }: SuggestionChipsProps) {
  if (suggestions.length === 0) return null;

  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide py-1">
      {suggestions.map((suggestion) => (
        <Button
          key={suggestion}
          variant="outline"
          size="sm"
          onClick={() => onSelect(suggestion)}
          className="shrink-0 rounded-full whitespace-nowrap"
        >
          {suggestion}
        </Button>
      ))}
    </div>
  );
}
