export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface ChatRequest {
  message: string
  project_id?: string
  conversation_history: ChatMessage[]
  image_urls: string[]
  document_type?: string
}

export interface ChatResponse {
  response: string
  suggestions: string[]
  model_used: string
  tokens_used: number
}

export interface DocumentTemplate {
  id: string
  name: string
  description: string
}

export const DOCUMENT_TEMPLATES: DocumentTemplate[] = [
  { id: 'defect_report', name: '하자보수 요청서', description: '업자에게 공식 하자보수 요청' },
  { id: 'change_request', name: '변경요청 확인서', description: '공사 변경 사항 서면화' },
  { id: 'complaint', name: '소비자 피해 신고서', description: '소비자원 등 신고용' },
  { id: 'checklist', name: '준공 점검 체크리스트', description: '입주 전 확인 항목' },
]
