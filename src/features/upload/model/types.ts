export interface UploadStep {
  label: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  detail?: string;
  progress?: number;
}
