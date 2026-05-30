'use client'
import { use, useState } from 'react'
import { MobileLayout } from '@/components/layout/MobileLayout'
import { Header } from '@/components/layout/Header'
import { BottomNav } from '@/components/layout/BottomNav'
import { SearchBar } from '@/components/timeline/SearchBar'
import { CategoryFilter } from '@/components/timeline/CategoryFilter'
import { TimelineView } from '@/components/timeline/TimelineView'
import { useTimeline } from '@/hooks/useTimeline'

export default function TimelinePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  const { items, isLoading, hasMore, loadMore } = useTimeline(id, { search, category })

  return (
    <MobileLayout>
      <Header title="타임라인" backHref={`/projects/${id}`} />
      <SearchBar value={search} onChange={setSearch} placeholder="메시지, 파일명 검색..." />
      <CategoryFilter selected={category} onChange={setCategory} />
      <div className="pb-20">
        <TimelineView
          items={items}
          isLoading={isLoading}
          hasMore={hasMore}
          onLoadMore={loadMore}
        />
      </div>
      <BottomNav projectId={id} />
    </MobileLayout>
  )
}
