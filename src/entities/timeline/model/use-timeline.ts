'use client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { TimelineFilters } from './types';
import { timelineQueries } from './queries';

export function useTimeline(projectId: string, filters?: TimelineFilters) {
  // 카테고리는 서버 측 필터(쿼리 키에 포함)로 처리한다.
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    timelineQueries.list(projectId, filters?.category),
  );

  let items = data?.pages.flatMap((page) => page.items) ?? [];

  // 검색은 README 스펙에 없는 프런트 전용 필터 (현재 로드된 페이지 대상)
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    items = items.filter(
      (item) =>
        item.message_content?.toLowerCase().includes(q) ||
        item.sender_name?.toLowerCase().includes(q) ||
        item.original_filename?.toLowerCase().includes(q),
    );
  }

  return {
    items,
    isLoading,
    hasMore: hasNextPage,
    loadMore: fetchNextPage,
    isFetchingNextPage,
  };
}
