'use client';
import { use } from 'react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { QuotaBar } from '@/components/upload/QuotaBar';
import { FileUploader } from '@/components/upload/FileUploader';
import { UploadProgress } from '@/components/upload/UploadProgress';
import { useUpload } from '@/hooks/useUpload';
import { useQuota } from '@/hooks/useQuota';

export default function UploadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { upload, status, progress, steps, error, reset } = useUpload(id);
  const { used, limit, plan, fileCount, fileLimit } = useQuota();

  const isProcessing = status === 'uploading' || status === 'processing';

  return (
    <MobileLayout>
      <Header title="자료 올리기" backHref={`/projects/${id}`} />

      <QuotaBar used={used} limit={limit} plan={plan} fileCount={fileCount} fileLimit={fileLimit} />

      {status === 'idle' || status === 'error' ? (
        <>
          <FileUploader onFilesSelected={upload} disabled={isProcessing} />
          {error && (
            <div className="mx-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
        </>
      ) : status === 'done' ? (
        <div className="flex flex-col items-center py-12 px-4">
          <span className="text-5xl mb-4">✅</span>
          <p className="text-lg font-medium text-gray-900 mb-2">업로드 완료!</p>
          <p className="text-sm text-gray-500 mb-6">타임라인에서 결과를 확인하세요</p>
          <button
            onClick={reset}
            className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            추가 업로드
          </button>
        </div>
      ) : (
        <UploadProgress
          steps={steps}
          currentStep={steps.findIndex((s) => s.status === 'processing')}
          estimatedTime="약 30초~1분"
        />
      )}

      <BottomNav projectId={id} />
    </MobileLayout>
  );
}
