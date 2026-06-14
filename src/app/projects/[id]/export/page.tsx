'use client';
import { use } from 'react';
import { StorageUsage } from '@/entities/quota/ui/storage-usage';
import { ExportOptions } from '@/features/export/ui/export-options';
import { useQuota } from '@/entities/quota/model/use-quota';
import { LightbulbIcon } from '@phosphor-icons/react/ssr';

export default function ExportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { used, limit, plan } = useQuota();

  const handlePdf = () => {
    // TODO: apiPost(`/api/projects/${id}/export/pdf`)
    alert('PDF 보고서 생성 중... (목 동작)');
  };

  const handleZip = () => {
    // TODO: apiGet(`/api/projects/${id}/export/zip`)로 다운로드
    alert('ZIP 파일 준비 중... (목 동작)');
  };

  const handleArchive = () => {
    // TODO: apiPost(`/api/projects/${id}/archive`)
    alert('장기 보관 전환 중... (목 동작)');
  };

  return (
    <div className="pb-24">
      <h2 className="px-4 pt-4 pb-1 text-base font-semibold text-gray-900">내보내기</h2>
      <StorageUsage used={used} limit={limit} plan={plan} />
      <ExportOptions onPdf={handlePdf} onZip={handleZip} onArchive={handleArchive} />

      <div className="px-4 mt-4">
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <p className="flex items-center gap-1.5 text-sm font-medium text-amber-800">
            <LightbulbIcon size={18} weight="duotone" className="text-amber-600" />
            장기 보관 안내
          </p>
          <p className="text-xs text-amber-700 mt-1">
            완료된 프로젝트는 아카이브하면 용량을 절약할 수 있어요. 아카이브 후에도 열람은
            가능합니다.
          </p>
        </div>
      </div>
    </div>
  );
}
