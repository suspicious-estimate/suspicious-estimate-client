import { infiniteQueryOptions } from '@tanstack/react-query';
import { timelineApi } from './api';

/** 타임라인 쿼리 팩토리. 커서 기반 무한 스크롤. */
export const timelineQueries = {
  all: () => ['timeline'] as const,

  lists: () => [...timelineQueries.all(), 'list'] as const,
  list: (projectId: string, category?: string) =>
    infiniteQueryOptions({
      queryKey: [...timelineQueries.lists(), projectId, { category: category ?? 'all' }],
      queryFn: ({ pageParam }) => timelineApi.list({ projectId, category, after: pageParam }),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) => lastPage.next_cursor ?? undefined,
      enabled: !!projectId,
    }),
};
