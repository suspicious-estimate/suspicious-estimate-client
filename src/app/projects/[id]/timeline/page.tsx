'use client';
import { use, useState } from 'react';
import { Header } from '@/widgets/header/ui/header';
import { BottomNav } from '@/widgets/bottom-nav/ui/bottom-nav';
import { SearchBar } from '@/shared/ui/search-bar';
import { CategoryFilter } from '@/features/timeline-filter/ui/category-filter';
import { TimelineView } from '@/entities/timeline/ui/timeline-view';
import { useTimeline } from '@/entities/timeline/model/use-timeline';

export default function TimelinePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const { items, isLoading, hasMore, loadMore } = useTimeline(id, { search, category });

  return (
    <>
      <Header title="타임라인" backHref={`/projects/${id}`} />
      <SearchBar value={search} onChange={setSearch} placeholder="메시지, 파일명 검색..." />
      <CategoryFilter selected={category} onChange={setCategory} />
      <div className="pb-20">
        <TimelineView items={items} isLoading={isLoading} hasMore={hasMore} onLoadMore={loadMore} />
      </div>
      <BottomNav projectId={id} />
    </>
  );
}
