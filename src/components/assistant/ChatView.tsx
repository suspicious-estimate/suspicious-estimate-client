'use client';
import { useRef, useEffect } from 'react';
import { ChatMessage } from '@/types/assistant';
import { ChatBubble } from './ChatBubble';
import { ChatInput } from './ChatInput';
import { SuggestionChips } from './SuggestionChips';

interface ChatViewProps {
  messages: ChatMessage[];
  suggestions: string[];
  onSend: (msg: string) => void;
  onSuggestionClick: (s: string) => void;
  isLoading?: boolean;
}

export function ChatView({
  messages,
  suggestions,
  onSend,
  onSuggestionClick,
  isLoading,
}: ChatViewProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} message={msg} />
        ))}
        {isLoading && (
          <div className="flex items-center gap-1.5 px-4 py-2">
            <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
            <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.1s]" />
            <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
          </div>
        )}
      </div>

      <div className="border-t border-border bg-background px-4 py-2 space-y-2">
        <p className="text-[10px] text-muted-foreground text-center">
          AI 상담은 참고용이며, 법적 효력이 없습니다.
        </p>

        {suggestions.length > 0 && (
          <SuggestionChips suggestions={suggestions} onSelect={onSuggestionClick} />
        )}

        <ChatInput onSend={onSend} disabled={isLoading} />
      </div>
    </div>
  );
}
