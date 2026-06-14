import { UploadStep } from '@/features/upload/model/types';

export const MOCK_UPLOAD_STEPS: UploadStep[] = [
  { label: '카카오톡 대화 파싱', status: 'completed', detail: '458개 메시지 추출됨' },
  { label: '사진 날짜 추출', status: 'completed', detail: '127장 EXIF 정보 추출' },
  { label: 'AI 공정 분류', status: 'processing', detail: '298/458 메시지 분류 완료', progress: 65 },
  { label: '타임라인 구성', status: 'pending' },
];
