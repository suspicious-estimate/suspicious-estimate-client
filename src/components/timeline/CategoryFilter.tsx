'use client';
import { PROCESS_CATEGORIES } from '@/types/timeline';

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
      {/* TODO: 목업 화면 6번(타임라인) 참고하여 구현
          - 가로 스크롤 가능한 필터 탭
          - 선택된 항목: 배경색 + 흰색 텍스트
          - 미선택: 회색 배경
          - 스크롤바 숨기기 (scrollbar-hide)
      */}
      {allCategories.map((cat) => {
        const isActive = selected === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              isActive ? 'text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            style={isActive ? { backgroundColor: cat.color } : undefined}
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
