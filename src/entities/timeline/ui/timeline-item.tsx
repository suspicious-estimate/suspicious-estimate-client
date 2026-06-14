'use client';
import { TimelineItem as TimelineItemType } from '@/entities/timeline/model/types';
import { CategoryBadge } from './category-badge';
import { formatTime } from '@/shared/lib/format';
import type { Icon } from '@phosphor-icons/react/lib';
import {
  ChatCircleIcon,
  CameraIcon,
  FileTextIcon,
  NotePencilIcon,
  WarningIcon,
  ClipboardTextIcon,
} from '@phosphor-icons/react/ssr';

interface TimelineItemProps {
  item: TimelineItemType;
  onCategoryClick?: (item: TimelineItemType) => void;
}

export function TimelineItem({ item, onCategoryClick }: TimelineItemProps) {
  const typeIcons: Record<string, Icon> = {
    message: ChatCircleIcon,
    photo: CameraIcon,
    document: FileTextIcon,
    memo: NotePencilIcon,
    change_request: WarningIcon,
  };
  const TypeIcon = typeIcons[item.item_type] || ClipboardTextIcon;

  return (
    <div className="flex gap-3 py-3 border-b border-gray-50 last:border-0">
      {/* TODO: 목업 화면 6번(타임라인) 참고하여 구현
          - 좌측: 타입 아이콘 (원형 배경)
          - 중앙: 보낸사람 + 내용 (message_content 또는 original_filename)
          - 우측: 시간 + 카테고리 뱃지
          - 사진 타입이면 썸네일 표시
          - change_request면 금액 변동 표시
      */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
        <TypeIcon size={18} weight="duotone" className="text-gray-600" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          {item.sender_name && (
            <span className="text-sm font-medium text-gray-900">{item.sender_name}</span>
          )}
          <span className="text-xs text-gray-400">{formatTime(item.created_at)}</span>
        </div>

        {item.message_content && (
          <p className="text-sm text-gray-700 mt-0.5 line-clamp-2">{item.message_content}</p>
        )}
        {item.original_filename && (
          <p className="text-sm text-gray-500 mt-0.5">{item.original_filename}</p>
        )}

        {item.process_category && (
          <div className="mt-1.5" onClick={() => onCategoryClick?.(item)}>
            <CategoryBadge
              category={item.process_category}
              confidence={item.ai_confidence}
              size="sm"
            />
          </div>
        )}
      </div>
    </div>
  );
}
