'use client';
import { useState, useEffect } from 'react';
import { Project, ProjectCreate } from '@/types/project';
import { MOCK_PROJECTS } from '@/lib/mock-data';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: apiGet('/api/projects') 로 교체
    setTimeout(() => {
      setProjects(MOCK_PROJECTS);
      setIsLoading(false);
    }, 300);
  }, []);

  return { projects, isLoading };
}

export function useProject(id: string) {
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: apiGet(`/api/projects/${id}`) 로 교체
    setTimeout(() => {
      const found = MOCK_PROJECTS.find((p) => p.id === id) || MOCK_PROJECTS[0];
      setProject(found);
      setIsLoading(false);
    }, 200);
  }, [id]);

  return { project, isLoading };
}

export function useCreateProject() {
  const [isLoading, setIsLoading] = useState(false);

  const create = async (data: ProjectCreate): Promise<Project> => {
    setIsLoading(true);
    // TODO: apiPost('/api/projects', data) 로 교체
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      user_id: 'mock-user-001',
      ...data,
      status: 'active',
      storage_size_bytes: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      timeline_count: 0,
      photo_count: 0,
    };
    setIsLoading(false);
    return newProject;
  };

  return { create, isLoading };
}
