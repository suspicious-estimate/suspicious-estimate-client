import { queryOptions } from '@tanstack/react-query';
import { projectApi } from './api';

/**
 * 프로젝트 쿼리 팩토리.
 * 키 계층: all → lists → list, all → details → detail(id)
 * 무효화 시 상위 키로 한 번에 처리할 수 있도록 계층 구조를 유지한다.
 */
export const projectQueries = {
  all: () => ['projects'] as const,

  lists: () => [...projectQueries.all(), 'list'] as const,
  list: () =>
    queryOptions({
      queryKey: projectQueries.lists(),
      queryFn: () => projectApi.list(),
    }),

  details: () => [...projectQueries.all(), 'detail'] as const,
  detail: (id: string) =>
    queryOptions({
      queryKey: [...projectQueries.details(), id],
      queryFn: () => projectApi.detail(id),
    }),
};
