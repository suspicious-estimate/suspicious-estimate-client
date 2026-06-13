'use client';
import { use } from 'react';
import { Header } from '@/widgets/header/ui/header';
import { BottomNav } from '@/widgets/bottom-nav/ui/bottom-nav';
import { ChatView } from '@/features/assistant-chat/ui/chat-view';
import { useAssistant } from '@/entities/assistant/model/use-assistant';
import { useProject } from '@/entities/project/model/use-project';

export default function AssistantPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { messages, send, suggestions, isLoading } = useAssistant(id);
  const { project } = useProject(id);

  return (
    <>
      <Header title="AI 상담" backHref={`/projects/${id}`} rightText={project?.title} />
      <ChatView
        messages={messages}
        suggestions={suggestions}
        onSend={send}
        onSuggestionClick={send}
        isLoading={isLoading}
      />
      <BottomNav projectId={id} />
    </>
  );
}
