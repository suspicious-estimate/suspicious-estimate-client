'use client';
import { PROCESS_CATEGORIES } from '@/types/timeline';
import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
  selected: string;
  onChange: (category: string) => void;
}

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  const allCategories = [
    { id: 'all', name: '전체', color: '#6b7280', bgColor: '#f3f4f6' },
    ...PROCESS_CATEGORIES,
  ];

  return (
    <div className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-hide">
      {allCategories.map((cat) => {
        const isActive = selected === cat.id;
        return (
          <Button
            key={cat.id}
            variant={isActive ? 'default' : 'secondary'}
            size="sm"
            onClick={() => onChange(cat.id)}
            className="shrink-0 rounded-full"
            // 활성 탭은 카테고리 고유색(데이터 기반)으로 채운다
            style={isActive ? { backgroundColor: cat.color, color: '#fff' } : undefined}
          >
            {cat.name}
          </Button>
        );
      })}
    </div>
  );
}
