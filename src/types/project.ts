export type ProjectStatus = 'active' | 'completed' | 'dispute' | 'archived'

export interface Project {
  id: string
  user_id: string
  title: string
  address?: string
  contractor_name?: string
  contract_amount?: number
  start_date?: string
  end_date?: string
  status: ProjectStatus
  archived_at?: string
  storage_size_bytes: number
  created_at: string
  updated_at: string
  timeline_count?: number
  photo_count?: number
}

export interface ProjectCreate {
  title: string
  address?: string
  contractor_name?: string
  contract_amount?: number
  start_date?: string
  end_date?: string
}

export interface ProjectUpdate {
  title?: string
  address?: string
  contractor_name?: string
  contract_amount?: number
  start_date?: string
  end_date?: string
  status?: ProjectStatus
}
