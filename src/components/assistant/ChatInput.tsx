'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChatInputProps {
  onSend: (msg: string) => void;
  onPhotoAttach?: () => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, onPhotoAttach, disabled }: ChatInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || disabled) return;
    onSend(text.trim());
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      {onPhotoAttach && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="shrink-0 rounded-full"
          onClick={onPhotoAttach}
          aria-label="사진 첨부"
        >
          <span className="text-lg">📷</span>
        </Button>
      )}

      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="질문을 입력하세요"
        disabled={disabled}
        className="h-9 flex-1 rounded-full border-transparent bg-muted px-4"
      />

      <Button
        type="submit"
        size="icon"
        className="shrink-0 rounded-full"
        disabled={!text.trim() || disabled}
        aria-label="전송"
      >
        <span className="text-sm font-bold">↑</span>
      </Button>
    </form>
  );
}
