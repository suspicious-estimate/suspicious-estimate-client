'use client';
import { use } from 'react';
import Link from 'next/link';
import { BottomNav } from '@/widgets/bottom-nav/ui/bottom-nav';
import { useProject } from '@/entities/project/model/use-project';
import { formatCurrency } from '@/shared/lib/format';

export default function ProjectDashboardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { project, isLoading } = useProject(id);

  if (isLoading || !project) {
    return (
      <>
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </>
    );
  }

  const quickActions = [
    { icon: '📤', label: '자료 올리기', href: `/projects/${id}/upload` },
    { icon: '📋', label: '타임라인', href: `/projects/${id}/timeline` },
    { icon: '💬', label: 'AI 상담', href: `/projects/${id}/assistant` },
    { icon: '📊', label: '견적 분석', href: `/projects/${id}/estimate` },
  ];

  return (
    <>
      <div className="px-4 pt-6 pb-24">
        {/* TODO: 목업 화면 7번(대시보드) 참고하여 구현
            - 프로젝트 요약 카드 (제목, 업체, 금액, 기간, 상태뱃지)
            - 퀵 액션 그리드 (4개 버튼)
            - 최근 활동 미리보기
            - 내보내기 배너
        */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-lg font-bold text-gray-900">{project.title}</h1>
            <span className="px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
              {project.status === 'active'
                ? '진행중'
                : project.status === 'completed'
                  ? '완료'
                  : project.status}
            </span>
          </div>
          {project.contractor_name && (
            <p className="text-sm text-gray-600 mb-1">🏗️ {project.contractor_name}</p>
          )}
          {project.contract_amount && (
            <p className="text-sm text-gray-600 mb-1">
              💰 {formatCurrency(project.contract_amount)}
            </p>
          )}
          {project.start_date && (
            <p className="text-sm text-gray-500">
              📅 {project.start_date} ~ {project.end_date || '미정'}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-blue-200 hover:bg-blue-50/30 transition-all"
            >
              <span className="text-2xl">{action.icon}</span>
              <span className="text-sm font-medium text-gray-700">{action.label}</span>
            </Link>
          ))}
        </div>

        <Link
          href={`/projects/${id}/export`}
          className="block w-full p-4 bg-gray-50 rounded-xl border border-gray-200 text-center hover:bg-gray-100 transition-colors"
        >
          <span className="text-sm text-gray-600">📁 내보내기 · 보관</span>
        </Link>
      </div>
      <BottomNav projectId={id} />
    </>
  );
}
