'use client';
import { Project } from '@/entities/project/model/types';
import { formatCurrency } from '@/shared/lib/format';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white rounded-xl border border-gray-200 p-4 hover:border-blue-200 hover:shadow-sm transition-all"
    >
      {/* TODO: 목업 화면 3번(프로젝트 목록) 참고하여 구현
          - 제목 (bold)
          - 주소 · 업체명
          - 계약금액 (formatCurrency 사용) · 기간
          - 상태 뱃지 (active=파랑, completed=초록, dispute=빨강)
          - 우측 하단: 사진 N장 · 메시지 N건
      */}
      <p className="text-gray-400 text-sm">ProjectCard — 목업 참고하여 구현</p>
      <p className="font-medium text-gray-900">{project.title}</p>
      {project.contractor_name && (
        <p className="text-sm text-gray-500">{project.contractor_name}</p>
      )}
      {project.contract_amount && (
        <p className="text-sm text-gray-600">{formatCurrency(project.contract_amount)}</p>
      )}
    </button>
  );
}
