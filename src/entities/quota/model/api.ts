import { StorageUsage } from './types';
import { MOCK_STORAGE } from './mock';
// import { apiGet } from '@/shared/api/client';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const quotaApi = {
  async storageUsage(): Promise<StorageUsage> {
    // return apiGet<StorageUsage>('/api/projects/storage-usage');
    await delay(200);
    return MOCK_STORAGE;
  },
};
