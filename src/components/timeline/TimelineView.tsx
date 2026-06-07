'use client';
import { TimelineItem as TimelineItemType } from '@/types/timeline';
import { TimelineItem } from './TimelineItem';
import { groupTimelineByDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface TimelineViewProps {
  items: TimelineItemType[];
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
}

export function TimelineView({ items, onLoadMore, hasMore, isLoading }: TimelineViewProps) {
  const grouped = groupTimelineByDate(items);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-6 h-6 border-2 border-muted border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <p className="text-muted-foreground text-sm">타임라인 항목이 없습니다</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-4">
      {grouped.map(({ date, items: dayItems }) => (
        <div key={date}>
          <div className="sticky top-14 z-10 bg-secondary text-secondary-foreground px-4 py-2">
            <span className="text-sm font-medium">{date}</span>
          </div>
          <div className="space-y-1 px-4">
            {dayItems.map((item) => (
              <TimelineItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      ))}

      {hasMore && (
        <Button variant="ghost" className="w-full" onClick={onLoadMore}>
          더 보기
        </Button>
      )}
    </div>
  );
}
