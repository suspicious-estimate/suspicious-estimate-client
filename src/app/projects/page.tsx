'use client'
import { useRouter } from 'next/navigation'
import { MobileLayout } from '@/components/layout/MobileLayout'
import { BottomNav } from '@/components/layout/BottomNav'
import { ProjectCard } from '@/components/project/ProjectCard'
import { OnboardingGuide } from '@/components/common/OnboardingGuide'
import { useProjects } from '@/hooks/useProject'

export default function ProjectsPage() {
  const router = useRouter()
  const { projects, isLoading } = useProjects()

  if (isLoading) {
    return (
      <MobileLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </MobileLayout>
    )
  }

  if (projects.length === 0) {
    return (
      <MobileLayout>
        <div className="pt-8">
          <OnboardingGuide
            onSkip={() => router.push('/projects/new')}
            onStart={() => router.push('/projects/new')}
          />
        </div>
        <BottomNav />
      </MobileLayout>
    )
  }

  return (
    <MobileLayout>
      <div className="px-4 pt-6 pb-24">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-gray-900">내 프로젝트</h1>
          <button
            onClick={() => router.push('/projects/new')}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            + 새 프로젝트
          </button>
        </div>

        <div className="space-y-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => router.push(`/projects/${project.id}`)}
            />
          ))}
        </div>
      </div>
      <BottomNav />
    </MobileLayout>
  )
}
