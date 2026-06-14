'use client';
import { ClipboardTextIcon } from '@phosphor-icons/react/ssr';

interface MissingItemProps {
  title: string;
  description: string;
}

export function MissingItem({ title, description }: MissingItemProps) {
  return (
    <div className="p-3 rounded-lg border border-green-200 bg-green-50">
      {/* TODO: 목업 화면 9번(견적분석) 빠진 항목 참고하여 구현
          - 📋 아이콘
          - 연두 배경
          - 제목 + 설명
      */}
      <div className="flex items-start gap-2.5">
        <ClipboardTextIcon
          size={18}
          weight="duotone"
          className="flex-shrink-0 mt-0.5 text-green-600"
        />
        <div>
          <p className="text-sm font-medium text-green-800">{title}</p>
          <p className="text-xs text-gray-600 mt-0.5">{description}</p>
        </div>
      </div>
    </div>
  );
}
