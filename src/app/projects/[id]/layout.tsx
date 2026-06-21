'use client';
import { use } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { UploadSimpleIcon } from '@phosphor-icons/react/ssr';
import { Header } from '@/widgets/header/ui/header';
import { ProjectTabs } from '@/widgets/project-nav/ui/project-tabs';
import { useProject } from '@/entities/project/model/use-project';
import { formatCurrency } from '@/shared/lib/format';

// 프로젝트 셸: 헤더·요약·탭을 layout으로 영구화해 탭 전환 시 깜빡임/리마운트를 없앤다.
// (Next.js layout은 네비게이션 간 리렌더되지 않고 캐시됨)
export default function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const pathname = usePathname();
  const { project } = useProject(id);

  // 업로드는 탭으로도 제공하되, 빠른 추가를 위한 FAB도 함께 둔다.
  // 채팅 입력창이 있는 AI상담, 이미 업로드/내보내기 화면에서는 겹침/중복을 피해 숨긴다.
  const showUploadFab = !/\/(assistant|upload|export)(\/|$)/.test(pathname);

  const statusLabel =
    project?.status === 'active'
      ? '진행중'
      : project?.status === 'completed'
        ? '완료'
        : project?.status;

  const summary = project
    ? [project.contractor_name, project.contract_amount && formatCurrency(project.contract_amount)]
        .filter(Boolean)
        .join(' · ')
    : '';

  return (
    <div className="min-h-screen">
      <Header
        title={project?.title ?? '프로젝트'}
        backHref="/projects"
        rightAction={{ label: '내보내기', onClick: () => router.push(`/projects/${id}/export`) }}
      />

      {/* 요약 스트립: 기존 대시보드 요약 카드를 셸로 흡수 (제목은 헤더에 표시) */}
      {project && (
        <div className="flex items-center justify-between gap-2 px-4 py-2 bg-white border-b border-gray-100">
          <p className="min-w-0 truncate text-xs text-gray-500">{summary}</p>
          {statusLabel && (
            <span className="shrink-0 px-2 py-0.5 text-[10px] font-medium bg-blue-100 text-blue-700 rounded-full">
              {statusLabel}
            </span>
          )}
        </div>
      )}

      {/* 데스크톱: 상단 탭바 */}
      <ProjectTabs projectId={id} variant="top" className="hidden md:block" />

      <main>{children}</main>

      {/* 업로드 빠른 추가 FAB (탭과 별개로 제공) */}
      {showUploadFab && (
        <Link
          href={`/projects/${id}/upload`}
          className="fixed right-4 bottom-20 md:bottom-6 z-50 flex items-center gap-1.5 px-4 py-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors"
        >
          <UploadSimpleIcon size={20} weight="bold" />
          <span className="text-sm font-medium">자료 추가</span>
        </Link>
      )}

      {/* 모바일: 하단 탭바 */}
      <ProjectTabs projectId={id} variant="bottom" className="md:hidden" />
    </div>
  );
}
