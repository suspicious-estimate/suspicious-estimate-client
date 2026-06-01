export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface ApiError {
  detail: string;
  status: number;
}

export interface UploadStep {
  label: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  detail?: string;
  progress?: number;
}

export interface StorageUsage {
  used_bytes: number;
  limit_bytes: number;
  file_count: number;
  file_limit: number;
  plan: UserPlan;
}

export type UserPlan = 'free' | 'basic' | 'premium';
