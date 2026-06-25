import { ChatRequest, ChatResponse } from './types';
import { MOCK_FOLLOW_SUGGESTIONS } from './mock';
// import { apiPost } from '@/shared/api/client';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const assistantApi = {
  async chat(request: ChatRequest): Promise<ChatResponse> {
    // return apiPost<ChatResponse>('/api/assistant/chat', request);
    await delay(1200);
    return {
      response: `"${request.message}"에 대한 답변입니다.\n\n이 프로젝트의 공사 현황을 바탕으로 분석한 결과:\n\n**1. 현황 분석:** 해당 사안은 일반적인 인테리어 공사에서 자주 발생하는 이슈입니다.\n\n**2. 권장 조치:** 업자에게 서면으로 확인을 요청하시고, 추가 비용 발생 시 변경요청으로 기록해두세요.\n\n**3. 참고:** 계약서와 견적서를 대조하여 해당 항목이 포함되어 있는지 확인해보세요.`,
      suggestions: MOCK_FOLLOW_SUGGESTIONS,
      model_used: 'mock',
      tokens_used: 0,
    };
  },
};
