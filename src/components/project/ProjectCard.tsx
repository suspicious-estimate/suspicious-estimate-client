'use client';
import { Project } from '@/types/project';
import { formatCurrency } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    // TODO: 목업 화면 3번(프로젝트 목록) 참고하여 상태 뱃지 / 사진·메시지 카운트 등 보강
    <Card
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className="cursor-pointer text-left transition-colors hover:bg-accent/20 hover:ring-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        {project.contractor_name && <CardDescription>{project.contractor_name}</CardDescription>}
      </CardHeader>
      {project.contract_amount && (
        <CardContent>
          <p className="font-medium text-foreground">{formatCurrency(project.contract_amount)}</p>
        </CardContent>
      )}
    </Card>
  );
}
