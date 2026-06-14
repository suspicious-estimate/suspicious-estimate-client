'use client';
import { TimelineItem as TimelineItemType } from '@/entities/timeline/model/types';
import { TimelineItem } from './timeline-item';
import { groupTimelineByDate } from '@/entities/timeline/lib/group';
import { Button } from '@/shared/ui/button';

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
        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <p className="text-gray-400 text-sm">타임라인 항목이 없습니다</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-4">
      {/* TODO: 목업 화면 6번(타임라인) 참고하여 구현
          - 날짜별 그룹 헤더 (3월 15일 금요일)
          - 각 아이템 사이 연결선 (왼쪽 세로선)
          - 무한스크롤 (hasMore일 때 하단 로딩)
      */}
      {grouped.map(({ date, items: dayItems }) => (
        <div key={date}>
          <div className="sticky top-14 z-10 bg-gray-50 px-4 py-2">
            <span className="text-sm font-medium text-gray-600">{date}</span>
          </div>
          <div className="space-y-1 px-4">
            {dayItems.map((item) => (
              <TimelineItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      ))}

      {hasMore && (
        <Button variant="ghost" size="lg" fullWidth onClick={onLoadMore}>
          더 보기
        </Button>
      )}
    </div>
  );
}
