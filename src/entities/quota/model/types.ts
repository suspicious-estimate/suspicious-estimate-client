export type UserPlan = 'free' | 'basic' | 'premium';

export interface StorageUsage {
  used_bytes: number;
  limit_bytes: number;
  file_count: number;
  file_limit: number;
  plan: UserPlan;
}
