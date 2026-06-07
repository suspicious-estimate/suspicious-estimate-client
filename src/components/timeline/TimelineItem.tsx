'use client';
import { TimelineItem as TimelineItemType } from '@/types/timeline';
import { CategoryBadge } from './CategoryBadge';
import { formatTime } from '@/lib/utils';

interface TimelineItemProps {
  item: TimelineItemType;
  onCategoryClick?: (item: TimelineItemType) => void;
}

export function TimelineItem({ item, onCategoryClick }: TimelineItemProps) {
  const typeIcons: Record<string, string> = {
    message: '💬',
    photo: '📷',
    document: '📄',
    memo: '📝',
    change_request: '⚠️',
  };

  return (
    <div className="flex gap-3 py-3 border-b border-border/60 last:border-0">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm">
        {typeIcons[item.item_type] || '📋'}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          {item.sender_name && (
            <span className="text-sm font-medium text-foreground">{item.sender_name}</span>
          )}
          <span className="text-xs text-muted-foreground">{formatTime(item.created_at)}</span>
        </div>

        {item.message_content && (
          <p className="text-sm text-foreground/80 mt-0.5 line-clamp-2">{item.message_content}</p>
        )}
        {item.original_filename && (
          <p className="text-sm text-muted-foreground mt-0.5">{item.original_filename}</p>
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
