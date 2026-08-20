import { ChatRequest, ChatResponse } from './types';
import { apiPost } from '@/shared/api/client';

export const assistantApi = {
  async chat(request: ChatRequest): Promise<ChatResponse> {
    return apiPost<ChatResponse>('/api/assistant/chat', request);
  },
};
