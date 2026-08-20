import { apiUpload } from '@/shared/api/client';

/** 백엔드가 파일별 접수 결과로 돌려주는 항목.
 *  실제 파싱/분류는 서버 백그라운드에서 처리되므로 여기서는 "접수" 상태만 온다. */
export interface UploadFileResult {
  filename: string;
  /** processing = 백그라운드 처리 큐에 등록됨, error = 접수 거부(용량/미지원 등) */
  status: 'processing' | 'error';
  /** image | video | pdf | kakao_chat (status=processing일 때) */
  type?: string;
  /** 거부 사유 (status=error일 때) */
  detail?: string;
}

export interface UploadResult {
  uploaded: number;
  results: UploadFileResult[];
}

export const uploadApi = {
  async upload(projectId: string, files: File[]): Promise<UploadResult> {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    return apiUpload<UploadResult>(`/api/projects/${projectId}/upload`, formData);
  },
};
