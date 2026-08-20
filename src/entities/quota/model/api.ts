import { StorageUsage } from './types';
import { apiGet } from '@/shared/api/client';

export const quotaApi = {
  async storageUsage(): Promise<StorageUsage> {
    return apiGet<StorageUsage>('/api/projects/storage-usage');
  },
};
