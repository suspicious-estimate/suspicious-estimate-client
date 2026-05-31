'use client';
import { useRouter } from 'next/navigation';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Header } from '@/components/layout/Header';
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
    <MobileLayout>
      <Header title="새 프로젝트" backHref="/projects" />
      <ProjectForm onSubmit={handleSubmit} isLoading={isLoading} />
    </MobileLayout>
  );
}
