export type ItemType = 'message' | 'photo' | 'document' | 'memo' | 'change_request'
export type Source = 'kakao_chat' | 'photo_upload' | 'pdf_upload' | 'manual'
export type ProcessCategory =
  | 'demolition' | 'structural' | 'plumbing' | 'electrical'
  | 'window_door' | 'carpentry' | 'tiling' | 'painting'
  | 'flooring' | 'furniture' | 'cleaning' | 'other'

export type ChangeRequestStatus = 'pending' | 'confirmed' | 'disputed'

export interface TimelineItem {
  id: string
  project_id: string
  item_type: ItemType
  source?: Source
  occurred_at: string
  sender_name?: string
  message_content?: string
  file_url?: string
  file_thumbnail_url?: string
  original_filename?: string
  process_category?: ProcessCategory
  ai_confidence?: number
  category_confirmed: boolean
  metadata?: Record<string, unknown>
  created_at: string
}

export interface ChangeRequest {
  id: string
  project_id: string
  timeline_item_id?: string
  description: string
  reason?: string
  cost_impact: number
  status: ChangeRequestStatus
  requested_by: 'consumer' | 'contractor'
  requested_at: string
  confirmed_at?: string
}

export interface Material {
  id: string
  project_id: string
  timeline_item_id?: string
  name: string
  category?: string
  specification?: string
  unit_price?: number
  quantity?: number
  unit?: string
  photo_url?: string
  memo?: string
  created_at: string
}

export interface ProcessCategoryInfo {
  id: ProcessCategory
  name: string
  color: string
  bgColor: string
}

export interface TimelineFilters {
  category?: string
  search?: string
  dateFrom?: string
  dateTo?: string
}

export const PROCESS_CATEGORIES: ProcessCategoryInfo[] = [
  { id: 'demolition', name: '철거', color: '#dc2626', bgColor: '#fee2e2' },
  { id: 'structural', name: '구조/보강', color: '#ea580c', bgColor: '#ffedd5' },
  { id: 'plumbing', name: '배관/설비', color: '#2563eb', bgColor: '#dbeafe' },
  { id: 'electrical', name: '전기', color: '#ca8a04', bgColor: '#fef9c3' },
  { id: 'window_door', name: '창호', color: '#0284c7', bgColor: '#e0f2fe' },
  { id: 'carpentry', name: '목공', color: '#c2410c', bgColor: '#fed7aa' },
  { id: 'tiling', name: '타일', color: '#0d9488', bgColor: '#ccfbf1' },
  { id: 'painting', name: '도배/페인트', color: '#7c3aed', bgColor: '#e9d5ff' },
  { id: 'flooring', name: '바닥재', color: '#16a34a', bgColor: '#dcfce7' },
  { id: 'furniture', name: '가구/붙박이', color: '#db2777', bgColor: '#fce7f3' },
  { id: 'cleaning', name: '입주청소', color: '#65a30d', bgColor: '#ecfccb' },
  { id: 'other', name: '기타', color: '#6b7280', bgColor: '#f3f4f6' },
]
