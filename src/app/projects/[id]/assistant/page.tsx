'use client';
import { use } from 'react';
import { ChatView } from '@/features/assistant-chat/ui/chat-view';
import { useAssistant } from '@/entities/assistant/model/use-assistant';

export default function AssistantPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { messages, send, suggestions, isLoading } = useAssistant(id);

  return (
    <ChatView
      messages={messages}
      suggestions={suggestions}
      onSend={send}
      onSuggestionClick={send}
      isLoading={isLoading}
    />
  );
}
