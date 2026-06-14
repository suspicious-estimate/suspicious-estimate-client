'use client';
import { useState } from 'react';
import { CameraIcon, ArrowUpIcon } from '@phosphor-icons/react/ssr';

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
      {/* TODO: 목업 화면 8번(AI상담) 입력창 참고하여 구현
          - 좌측 사진 첨부 버튼 (📷)
          - 중앙 input (라운드, placeholder "질문을 입력하세요")
          - 우측 전송 버튼 (파란 원 안 ↑ 아이콘)
      */}
      {onPhotoAttach && (
        <button
          type="button"
          onClick={onPhotoAttach}
          className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <CameraIcon size={22} weight="duotone" className="text-gray-500" />
        </button>
      )}

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="질문을 입력하세요"
        disabled={disabled}
        className="flex-1 px-4 py-2.5 bg-gray-100 rounded-full text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white disabled:opacity-50 transition-colors"
      />

      <button
        type="submit"
        disabled={!text.trim() || disabled}
        className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-blue-600 text-white disabled:bg-gray-300 cursor-pointer disabled:cursor-not-allowed transition-colors"
      >
        <ArrowUpIcon size={18} weight="bold" />
      </button>
    </form>
  );
}
