'use client'
import { ChatMessage } from '@/types/assistant'

interface ChatBubbleProps {
  message: ChatMessage
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      {/* TODO: 목업 화면 8번(AI상담) 참고하여 구현
          - user: 오른쪽 정렬, 파란 배경, 흰색 텍스트
          - assistant: 왼쪽 정렬, 회색 배경, 검정 텍스트
          - assistant 마크다운 렌더링: **bold**, 줄바꿈, 리스트
          - 최대 너비 80%
      */}
      <div
        className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? 'bg-blue-600 text-white rounded-br-md'
            : 'bg-gray-100 text-gray-900 rounded-bl-md'
        }`}
      >
        <div className="whitespace-pre-wrap break-words">
          {message.content.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={i}>{part.slice(2, -2)}</strong>
            }
            return <span key={i}>{part}</span>
          })}
        </div>
      </div>
    </div>
  )
}
