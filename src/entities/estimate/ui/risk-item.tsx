'use client';
import type { Icon } from '@phosphor-icons/react/lib';
import { WarningCircleIcon, WarningIcon, ClipboardTextIcon } from '@phosphor-icons/react/ssr';

interface RiskItemProps {
  level: 'high' | 'medium' | 'low';
  title: string;
  description: string;
}

export function RiskItem({ level, title, description }: RiskItemProps) {
  const levelStyles: Record<
    RiskItemProps['level'],
    { icon: Icon; iconColor: string; bg: string; border: string; text: string }
  > = {
    high: {
      icon: WarningCircleIcon,
      iconColor: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
    },
    medium: {
      icon: WarningIcon,
      iconColor: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-800',
    },
    low: {
      icon: ClipboardTextIcon,
      iconColor: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
    },
  };

  const style = levelStyles[level];
  const LevelIcon = style.icon;

  return (
    <div className={`p-3 rounded-lg border ${style.bg} ${style.border}`}>
      {/* TODO: 목업 화면 9번(견적분석) 리스크 항목 참고하여 구현
          - 좌측 아이콘 (레벨별)
          - 제목 (bold)
          - 설명 (회색)
      */}
      <div className="flex items-start gap-2.5">
        <LevelIcon size={18} weight="fill" className={`flex-shrink-0 mt-0.5 ${style.iconColor}`} />
        <div>
          <p className={`text-sm font-medium ${style.text}`}>{title}</p>
          <p className="text-xs text-gray-600 mt-0.5">{description}</p>
        </div>
      </div>
    </div>
  );
}
