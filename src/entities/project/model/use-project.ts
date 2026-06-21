'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ProjectCreate } from './types';
import { projectApi } from './api';
import { projectQueries } from './queries';

export function useProjects() {
  const { data, isLoading } = useQuery(projectQueries.list());
  return { projects: data ?? [], isLoading };
}

export function useProject(id: string) {
  const { data, isLoading } = useQuery(projectQueries.detail(id));
  return { project: data ?? null, isLoading };
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: ProjectCreate) => projectApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectQueries.lists() });
    },
  });

  return { create: mutateAsync, isLoading: isPending };
}
