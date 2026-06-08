'use client';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { ProjectForm } from '@/components/project/ProjectForm';
import { useCreateProject } from '@/hooks/useProject';

export default function NewProjectPage() {
  const router = useRouter();
  const { create, isLoading } = useCreateProject();

  const handleSubmit = async (data: Parameters<typeof create>[0]) => {
    const project = await create(data);
    router.push(`/projects/${project.id}/upload`);
  };

  return (
    <>
      <Header title="새 프로젝트" backHref="/projects" />
      <div className="pb-24">
        <ProjectForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
      <BottomNav />
    </MobileLayout>
  );
}
