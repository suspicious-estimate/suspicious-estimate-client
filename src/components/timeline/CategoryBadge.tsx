'use client';
import { ProcessCategory } from '@/types/timeline';
import { getCategoryInfo } from '@/lib/utils';

interface CategoryBadgeProps {
  category: ProcessCategory;
  confidence?: number;
  size?: 'sm' | 'md';
}

export function CategoryBadge({ category, confidence, size = 'md' }: CategoryBadgeProps) {
  const info = getCategoryInfo(category);

  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-2.5 py-1';

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${sizeClasses}`}
      style={{ backgroundColor: info.bgColor, color: info.color }}
    >
      {info.name}
      {confidence !== undefined && (
        <span className="opacity-70">{Math.round(confidence * 100)}%</span>
      )}
    </span>
  );
}
