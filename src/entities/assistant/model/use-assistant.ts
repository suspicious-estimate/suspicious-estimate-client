'use client';
import { useState } from 'react';
import { ChatMessage } from './types';
import { MOCK_CHAT_MESSAGES, INITIAL_SUGGESTIONS, MOCK_FOLLOW_SUGGESTIONS } from './mock';

export function useAssistant(projectId?: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([MOCK_CHAT_MESSAGES[0]]);
  const [suggestions, setSuggestions] = useState<string[]>(INITIAL_SUGGESTIONS);
  const [isLoading, setIsLoading] = useState(false);

  const send = async (message: string) => {
    const userMsg: ChatMessage = { role: 'user', content: message };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    setSuggestions([]);

    // TODO: apiPost('/api/assistant/chat', { message, project_id: projectId, conversation_history: messages })
    // 아래는 목 응답 (1초 딜레이)
    await new Promise((r) => setTimeout(r, 1200));

    const mockResponse: ChatMessage = {
      role: 'assistant',
      content: `"${message}"에 대한 답변입니다.\n\n이 프로젝트의 공사 현황을 바탕으로 분석한 결과:\n\n**1. 현황 분석:** 해당 사안은 일반적인 인테리어 공사에서 자주 발생하는 이슈입니다.\n\n**2. 권장 조치:** 업자에게 서면으로 확인을 요청하시고, 추가 비용 발생 시 변경요청으로 기록해두세요.\n\n**3. 참고:** 계약서와 견적서를 대조하여 해당 항목이 포함되어 있는지 확인해보세요.`,
    };
    setMessages((prev) => [...prev, mockResponse]);
    setSuggestions(MOCK_FOLLOW_SUGGESTIONS);
    setIsLoading(false);
  };

  return { messages, send, suggestions, isLoading };
}
