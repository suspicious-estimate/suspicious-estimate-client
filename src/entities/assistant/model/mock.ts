import { ChatMessage } from '@/entities/assistant/model/types';

export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  {
    role: 'assistant',
    content:
      '안녕하세요! 공사 관련 뭐든 물어보세요.\n하자 진단, 비용 적정성, 업자에게 보낼 문구까지 도와드려요.',
  },
  {
    role: 'user',
    content: '타일 갈라졌는데 이거 하자보수 받을 수 있어?',
  },
  {
    role: 'assistant',
    content:
      '**타일 크랙 — 하자보수 가능합니다**\n\n**1. 하자 여부:** 시공 2개월 내 발생한 줄눈 크랙은 시공 하자에 해당합니다.\n\n**2. 법적 근거:** 건설산업기본법 시행령 별표4에 따라 타일 하자보수기간은 1년입니다.\n\n**3. 업자에게 보낼 카톡:**\n> "사장님, 욕실 타일 줄눈에 크랙이 발생했습니다. 시공 2개월 미만이라 하자보수 범위에 해당하는 것으로 보이는데, 확인 후 보수 일정 잡아주시면 감사하겠습니다."',
  },
];

export const INITIAL_SUGGESTIONS: string[] = [
  '이 견적 적정한가요?',
  '공사 중 확인할 것',
  '추가금 요구 대응법',
];

export const MOCK_FOLLOW_SUGGESTIONS: string[] = [
  '하자보수 요청서 작성해줘',
  '안 고쳐주면 어떡해?',
  '소비자원 신고 방법',
];
