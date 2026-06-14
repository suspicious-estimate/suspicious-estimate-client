'use client';
import { use } from 'react';
import { QuotaBar } from '@/entities/quota/ui/quota-bar';
import { FileUploader } from '@/features/upload/ui/file-uploader';
import { UploadProgress } from '@/features/upload/ui/upload-progress';
import { useUpload } from '@/features/upload/model/use-upload';
import { useQuota } from '@/entities/quota/model/use-quota';
import { CheckCircleIcon } from '@phosphor-icons/react/ssr';
import { Button } from '@/shared/ui/button';

export default function UploadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { upload, status, progress, steps, error, reset } = useUpload(id);
  const { used, limit, plan, fileCount, fileLimit } = useQuota();

  const isProcessing = status === 'uploading' || status === 'processing';

  return (
    <div className="pb-24">
      <h2 className="px-4 pt-4 pb-1 text-base font-semibold text-gray-900">자료 올리기</h2>

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
          <CheckCircleIcon size={56} weight="duotone" className="text-green-500 mb-4" />
          <p className="text-lg font-medium text-gray-900 mb-2">업로드 완료!</p>
          <p className="text-sm text-gray-500 mb-6">타임라인에서 결과를 확인하세요</p>
          <Button onClick={reset}>추가 업로드</Button>
        </div>
      ) : (
        <UploadProgress
          steps={steps}
          currentStep={steps.findIndex((s) => s.status === 'processing')}
          estimatedTime="약 30초~1분"
        />
      )}
    </div>
  );
}
