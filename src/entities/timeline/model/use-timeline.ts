'use client';
import { useState, useEffect } from 'react';
import { TimelineItem, TimelineFilters } from './types';
import { MOCK_TIMELINE_ITEMS } from './mock';

export function useTimeline(projectId: string, filters?: TimelineFilters) {
  const [items, setItems] = useState<TimelineItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    // TODO: apiGet(`/api/projects/${projectId}/timeline?...`) 로 교체
    setTimeout(() => {
      setItems(
        MOCK_TIMELINE_ITEMS.filter((i) => i.project_id === projectId || projectId === 'proj-001'),
      );
      setIsLoading(false);
      setHasMore(false);
    }, 300);
  }, [projectId]);

  let filteredItems = items;

  if (filters?.category && filters.category !== 'all') {
    filteredItems = filteredItems.filter((item) => item.process_category === filters.category);
  }

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    filteredItems = filteredItems.filter(
      (item) =>
        item.message_content?.toLowerCase().includes(q) ||
        item.sender_name?.toLowerCase().includes(q) ||
        item.original_filename?.toLowerCase().includes(q),
    );
  }

  const loadMore = () => {
    // TODO: 커서 기반 페이징 구현
  };

  return { items: filteredItems, isLoading, hasMore, loadMore };
}
