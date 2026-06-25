import { Project, ProjectCreate } from './types';
import { MOCK_PROJECTS } from './mock';
// import { apiGet, apiPost } from '@/shared/api/client';

/** 개발용 목 지연. 백엔드 연동 시 제거한다. */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const projectApi = {
  async list(): Promise<Project[]> {
    // return apiGet<Project[]>('/api/projects');
    await delay(300);
    return MOCK_PROJECTS;
  },

  async detail(id: string): Promise<Project> {
    // return apiGet<Project>(`/api/projects/${id}`);
    await delay(200);
    return MOCK_PROJECTS.find((p) => p.id === id) || MOCK_PROJECTS[0];
  },

  async create(data: ProjectCreate): Promise<Project> {
    // return apiPost<Project>('/api/projects', data);
    await delay(500);
    return {
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
  },
};
