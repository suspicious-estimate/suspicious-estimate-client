'use client';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { ChatMessage } from './types';
import { MOCK_CHAT_MESSAGES, INITIAL_SUGGESTIONS } from './mock';
import { assistantApi } from './api';

export function useAssistant(projectId?: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([MOCK_CHAT_MESSAGES[0]]);
  const [suggestions, setSuggestions] = useState<string[]>(INITIAL_SUGGESTIONS);

  const { mutate, isPending } = useMutation({
    mutationFn: (message: string) =>
      assistantApi.chat({
        message,
        project_id: projectId,
        conversation_history: messages,
        image_urls: [],
      }),
    onSuccess: (res) => {
      setMessages((prev) => [...prev, { role: 'assistant', content: res.response }]);
      setSuggestions(res.suggestions);
    },
  });

  const send = (message: string) => {
    setMessages((prev) => [...prev, { role: 'user', content: message }]);
    setSuggestions([]);
    mutate(message);
  };

  return { messages, send, suggestions, isLoading: isPending };
}
