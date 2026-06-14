'use client';
import type { Icon } from '@phosphor-icons/react/lib';
import { FileTextIcon, PackageIcon, ArchiveIcon, CaretRightIcon } from '@phosphor-icons/react/ssr';

interface ExportOptionsProps {
  onPdf: () => void;
  onZip: () => void;
  onArchive: () => void;
}

export function ExportOptions({ onPdf, onZip, onArchive }: ExportOptionsProps) {
  const options: { icon: Icon; title: string; description: string; onClick: () => void }[] = [
    {
      icon: FileTextIcon,
      title: 'PDF 보고서',
      description: '타임라인 + 자재 + 변경요청을 한 파일로',
      onClick: onPdf,
    },
    {
      icon: PackageIcon,
      title: 'ZIP 다운로드',
      description: '모든 사진 + 서류 원본 파일',
      onClick: onZip,
    },
    {
      icon: ArchiveIcon,
      title: '장기 보관',
      description: '프로젝트 아카이브 (읽기 전용)',
      onClick: onArchive,
    },
  ];

  return (
    <div className="p-4 space-y-3">
      {/* TODO: 목업 화면 11번(내보내기) 참고하여 구현
          - 3개 옵션 카드
          - 각 카드: 아이콘 + 제목 + 설명 + 우측 화살표
          - 카드 클릭 시 해당 액션
      */}
      {options.map((opt) => (
        <button
          key={opt.title}
          onClick={opt.onClick}
          className="w-full flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-blue-200 hover:bg-blue-50/30 transition-all text-left cursor-pointer"
        >
          <opt.icon size={28} weight="duotone" className="flex-shrink-0 text-blue-600" />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{opt.title}</p>
            <p className="text-xs text-gray-500 mt-0.5">{opt.description}</p>
          </div>
          <CaretRightIcon size={18} weight="bold" className="text-gray-400" />
        </button>
      ))}
    </div>
  );
}
