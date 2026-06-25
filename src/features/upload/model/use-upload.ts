'use client';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UploadStep } from './types';
import { MOCK_UPLOAD_STEPS } from './mock';
import { uploadApi } from './api';
import { timelineQueries } from '@/entities/timeline/model/queries';
import { quotaQueries } from '@/entities/quota/model/queries';

type UploadStatus = 'idle' | 'uploading' | 'processing' | 'done' | 'error';

export function useUpload(projectId: string) {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [steps, setSteps] = useState<UploadStep[]>([]);

  const {
    mutate,
    error,
    reset: resetMutation,
  } = useMutation({
    mutationFn: async (files: File[]) => {
      // 1) 업로드
      setStatus('uploading');
      setProgress(30);
      const result = await uploadApi.upload(projectId, files);

      // 2) 서버 후처리 단계 진행 (목 시뮬레이션)
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
      return result;
    },
    onSuccess: () => {
      setStatus('done');
      // 업로드 결과가 타임라인·저장 용량에 반영되므로 무효화한다.
      // 카테고리와 무관하게 해당 프로젝트의 모든 타임라인 쿼리를 대상으로 한다.
      queryClient.invalidateQueries({ queryKey: [...timelineQueries.lists(), projectId] });
      queryClient.invalidateQueries({ queryKey: quotaQueries.all() });
    },
    onError: () => {
      setStatus('error');
    },
  });

  const reset = () => {
    setStatus('idle');
    setProgress(0);
    setSteps([]);
    resetMutation();
  };

  return {
    upload: mutate,
    progress,
    status,
    steps,
    error: error ? '업로드 중 오류가 발생했습니다' : null,
    reset,
  };
}
