'use client'

interface SuggestionChipsProps {
  suggestions: string[]
  onSelect: (suggestion: string) => void
}

export function SuggestionChips({ suggestions, onSelect }: SuggestionChipsProps) {
  if (suggestions.length === 0) return null

  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide py-1">
      {/* TODO: 목업 화면 8번(AI상담) 추천 질문 참고하여 구현
          - 가로 스크롤 칩 리스트
          - 파란 테두리 라운드 배경
          - 클릭 시 해당 텍스트로 메시지 전송
      */}
      {suggestions.map((suggestion) => (
        <button
          key={suggestion}
          onClick={() => onSelect(suggestion)}
          className="flex-shrink-0 px-3 py-1.5 text-xs font-medium text-blue-600 border border-blue-200 rounded-full hover:bg-blue-50 transition-colors whitespace-nowrap"
        >
          {suggestion}
        </button>
      ))}
    </div>
  )
}
