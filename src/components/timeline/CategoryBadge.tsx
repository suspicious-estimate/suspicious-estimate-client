'use client';
import { ProcessCategory } from '@/types/timeline';
import { getCategoryInfo, cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface CategoryBadgeProps {
  category: ProcessCategory;
  confidence?: number;
  size?: 'sm' | 'md';
}

export function CategoryBadge({ category, confidence, size = 'md' }: CategoryBadgeProps) {
  const info = getCategoryInfo(category);

  return (
    // 카테고리별 색상은 데이터에서 오므로 인라인 style로 토큰 대신 직접 지정
    <Badge
      className={cn(
        'gap-1 border-transparent',
        size === 'sm' ? 'h-5 text-xs' : 'h-6 px-2.5 text-sm',
      )}
      style={{ backgroundColor: info.bgColor, color: info.color }}
    >
      {info.name}
      {confidence !== undefined && (
        <span className="opacity-70">{Math.round(confidence * 100)}%</span>
      )}
    </Badge>
  );
}
