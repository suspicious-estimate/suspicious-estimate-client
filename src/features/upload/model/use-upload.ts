'use client';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UploadStep } from './types';
import { uploadApi, UploadResult } from './api';
import { timelineQueries } from '@/entities/timeline/model/queries';
import { quotaQueries } from '@/entities/quota/model/queries';

type UploadStatus = 'idle' | 'uploading' | 'processing' | 'done' | 'error';

/** 서버 백그라운드 처리가 타임라인에 반영될 때까지 기다리는 시간(ms).
 *  카톡 파싱·EXIF 추출은 서버에서 비동기로 돌기 때문에 짧게 대기 후 타임라인을 새로고침한다. */
const PROCESS_SETTLE_MS = 1500;

/** 업로드 응답에서 실제 접수된 파일 종류를 세어 진행 단계를 구성한다.
 *  서버가 백그라운드에서 처리하므로 "접수 완료" 기준으로만 표시한다(가짜 진행률 없음). */
function buildSteps(result: UploadResult): UploadStep[] {
  const countByType = (t: string) =>
    result.results.filter((r) => r.status === 'processing' && r.type === t).length;
  const rejected = result.results.filter((r) => r.status === 'error').length;

  const steps: UploadStep[] = [];
  const kakao = countByType('kakao_chat');
  const images = countByType('image') + countByType('video');
  const pdfs = countByType('pdf');

  if (kakao > 0) steps.push({ label: '카카오톡 대화 처리', status: 'completed', detail: `${kakao}개 파일 접수` });
  if (images > 0) steps.push({ label: '사진·영상 정리', status: 'completed', detail: `${images}개 접수` });
  if (pdfs > 0) steps.push({ label: '견적서 등록', status: 'completed', detail: `${pdfs}개 접수` });
  steps.push({ label: '타임라인 반영', status: 'processing', detail: '서버에서 정리 중' });
  if (rejected > 0) {
    steps.push({ label: '접수 실패', status: 'failed', detail: `${rejected}개 파일 (용량/형식 확인)` });
  }
  return steps;
}

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
      // 1) 실제 업로드 (서버는 파일을 접수하고 백그라운드에서 처리)
      setStatus('uploading');
      setProgress(30);
      const result = await uploadApi.upload(projectId, files);

      // 2) 접수 결과를 단계로 표시하고, 백그라운드 처리가 반영될 시간을 준다
      setStatus('processing');
      setProgress(70);
      setSteps(buildSteps(result));
      await new Promise((r) => setTimeout(r, PROCESS_SETTLE_MS));

      setProgress(100);
      setSteps((prev) =>
        prev.map((s) => (s.status === 'processing' ? { ...s, status: 'completed' as const } : s)),
      );
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
