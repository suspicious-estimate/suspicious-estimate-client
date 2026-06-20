// import { apiUpload } from '@/shared/api/client';

export interface UploadResult {
  processed_messages: number;
  processed_photos: number;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const uploadApi = {
  async upload(projectId: string, files: File[]): Promise<UploadResult> {
    // const formData = new FormData();
    // files.forEach((file) => formData.append('files', file));
    // return apiUpload<UploadResult>(`/api/projects/${projectId}/upload`, formData);
    await delay(800);
    return { processed_messages: 458, processed_photos: files.length };
  },
};
