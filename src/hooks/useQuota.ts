'use client';
import { useState, useEffect } from 'react';
import { UserPlan } from '@/types/common';
import { MOCK_STORAGE } from '@/lib/mock-data';
import { getQuotaPercentage, getQuotaLevel } from '@/lib/utils';

export function useQuota() {
  const [used, setUsed] = useState(0);
  const [limit, setLimit] = useState(0);
  const [fileCount, setFileCount] = useState(0);
  const [fileLimit, setFileLimit] = useState(0);
  const [plan, setPlan] = useState<UserPlan>('free');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: apiGet('/api/projects/storage-usage') 로 교체
    setTimeout(() => {
      setUsed(MOCK_STORAGE.used_bytes);
      setLimit(MOCK_STORAGE.limit_bytes);
      setFileCount(MOCK_STORAGE.file_count);
      setFileLimit(MOCK_STORAGE.file_limit);
      setPlan(MOCK_STORAGE.plan);
      setIsLoading(false);
    }, 200);
  }, []);

  const percentage = getQuotaPercentage(used, limit);
  const level = getQuotaLevel(percentage);

  return { used, limit, fileCount, fileLimit, percentage, plan, level, isLoading };
}
