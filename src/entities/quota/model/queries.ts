import { queryOptions } from '@tanstack/react-query';
import { quotaApi } from './api';

/** 저장 용량(쿼터) 쿼리 팩토리. */
export const quotaQueries = {
  all: () => ['quota'] as const,

  storageUsage: () =>
    queryOptions({
      queryKey: [...quotaQueries.all(), 'storage-usage'],
      queryFn: () => quotaApi.storageUsage(),
    }),
};
