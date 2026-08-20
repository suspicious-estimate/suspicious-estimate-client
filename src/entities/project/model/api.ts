import { Project, ProjectCreate } from './types';
import { apiGet, apiPost } from '@/shared/api/client';

export const projectApi = {
  async list(): Promise<Project[]> {
    return apiGet<Project[]>('/api/projects');
  },

  async detail(id: string): Promise<Project> {
    return apiGet<Project>(`/api/projects/${id}`);
  },

  async create(data: ProjectCreate): Promise<Project> {
    return apiPost<Project>('/api/projects', data);
  },
};
