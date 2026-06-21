'use client';
import { useQuery } from '@tanstack/react-query';
import { quotaQueries } from './queries';
import { getQuotaPercentage, getQuotaLevel } from '@/entities/quota/lib/quota';

export function useQuota() {
  const { data, isLoading } = useQuery(quotaQueries.storageUsage());

  const used = data?.used_bytes ?? 0;
  const limit = data?.limit_bytes ?? 0;
  const fileCount = data?.file_count ?? 0;
  const fileLimit = data?.file_limit ?? 0;
  const plan = data?.plan ?? 'free';

  const percentage = getQuotaPercentage(used, limit);
  const level = getQuotaLevel(percentage);

  return { used, limit, fileCount, fileLimit, percentage, plan, level, isLoading };
}
