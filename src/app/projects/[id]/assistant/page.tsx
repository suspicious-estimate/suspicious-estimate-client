'use client';
import { use } from 'react';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { ChatView } from '@/components/assistant/ChatView';
import { useAssistant } from '@/hooks/useAssistant';
import { useProject } from '@/hooks/useProject';

export default function AssistantPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { messages, send, suggestions, isLoading } = useAssistant(id);
  const { project } = useProject(id);

  return (
    <MobileLayout>
      <Header title="AI 상담" backHref={`/projects/${id}`} rightText={project?.title} />
      <ChatView
        messages={messages}
        suggestions={suggestions}
        onSend={send}
        onSuggestionClick={send}
        isLoading={isLoading}
      />
      <BottomNav projectId={id} />
    </MobileLayout>
  );
}
