import { ProcessCategory, ProcessCategoryInfo, PROCESS_CATEGORIES } from '@/entities/timeline/model/types';

export function getCategoryInfo(id: ProcessCategory): ProcessCategoryInfo {
  return (
    PROCESS_CATEGORIES.find((c) => c.id === id) || PROCESS_CATEGORIES[PROCESS_CATEGORIES.length - 1]
  );
}
