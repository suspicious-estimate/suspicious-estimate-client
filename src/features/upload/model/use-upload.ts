'use client';
import { useState } from 'react';
import { UploadStep } from './types';
import { MOCK_UPLOAD_STEPS } from './mock';

type UploadStatus = 'idle' | 'uploading' | 'processing' | 'done' | 'error';

export function useUpload(projectId: string) {
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [steps, setSteps] = useState<UploadStep[]>([]);
  const [error, setError] = useState<string | null>(null);

  const upload = async (files: File[]) => {
    setStatus('uploading');
    setProgress(0);
    setError(null);

    // TODO: 실제 구현 시 apiUpload(`/api/projects/${projectId}/upload`, formData)
    // 아래는 시뮬레이션 (2초 간격으로 단계 진행)
    try {
      // 업로드 단계
      setProgress(30);
      await new Promise((r) => setTimeout(r, 800));

      setStatus('processing');
      setProgress(50);
      setSteps([
        { ...MOCK_UPLOAD_STEPS[0], status: 'completed' },
        { ...MOCK_UPLOAD_STEPS[1], status: 'processing' },
        { ...MOCK_UPLOAD_STEPS[2], status: 'pending' },
        { ...MOCK_UPLOAD_STEPS[3], status: 'pending' },
      ]);
      await new Promise((r) => setTimeout(r, 1500));

      setProgress(75);
      setSteps([
        { ...MOCK_UPLOAD_STEPS[0], status: 'completed' },
        { ...MOCK_UPLOAD_STEPS[1], status: 'completed' },
        { ...MOCK_UPLOAD_STEPS[2], status: 'processing', progress: 65 },
        { ...MOCK_UPLOAD_STEPS[3], status: 'pending' },
      ]);
      await new Promise((r) => setTimeout(r, 2000));

      setProgress(100);
      setSteps(MOCK_UPLOAD_STEPS.map((s) => ({ ...s, status: 'completed' as const })));
      setStatus('done');
    } catch {
      setError('업로드 중 오류가 발생했습니다');
      setStatus('error');
    }
  };

  const reset = () => {
    setStatus('idle');
    setProgress(0);
    setSteps([]);
    setError(null);
  };

  return { upload, progress, status, steps, error, reset };
}
