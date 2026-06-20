import { TimelineItem } from './types';
import { MOCK_TIMELINE_ITEMS } from './mock';
// import { apiGet } from '@/shared/api/client';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** 한 페이지 크기 (README: ?size=) */
const PAGE_SIZE = 20;

export interface TimelineListParams {
  projectId: string;
  category?: string;
  /** 커서 페이징 기준 (README: ?after=). 직전 페이지 마지막 항목 id */
  after?: string;
}

/** 커서 기반 페이지 응답 */
export interface TimelinePage {
  items: TimelineItem[];
  next_cursor: string | null;
}

export const timelineApi = {
  async list({ projectId, category, after }: TimelineListParams): Promise<TimelinePage> {
    // const query = new URLSearchParams();
    // if (category && category !== 'all') query.set('category', category);
    // if (after) query.set('after', after);
    // query.set('size', String(PAGE_SIZE));
    // return apiGet<TimelinePage>(`/api/projects/${projectId}/timeline?${query}`);
    await delay(300);

    let items = MOCK_TIMELINE_ITEMS.filter(
      (i) => i.project_id === projectId || projectId === 'proj-001',
    );

    // 카테고리 필터는 서버 측 처리 (README ?category=)
    if (category && category !== 'all') {
      items = items.filter((i) => i.process_category === category);
    }

    const start = after ? items.findIndex((i) => i.id === after) + 1 : 0;
    const page = items.slice(start, start + PAGE_SIZE);
    const hasMore = start + PAGE_SIZE < items.length;

    return {
      items: page,
      next_cursor: hasMore && page.length > 0 ? page[page.length - 1].id : null,
    };
  },
};
