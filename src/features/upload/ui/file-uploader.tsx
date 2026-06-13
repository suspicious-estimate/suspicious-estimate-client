'use client';
import { useCallback, useRef, useState } from 'react';

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  disabled?: boolean;
}

export function FileUploader({ onFilesSelected, disabled }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (disabled) return;
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) onFilesSelected(files);
    },
    [onFilesSelected, disabled],
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) onFilesSelected(files);
    e.target.value = '';
  };

  return (
    <div className="p-4 space-y-4">
      {/* TODO: 목업 화면 5번(업로드) 참고하여 구현
          - 드래그앤드롭 점선 박스 (드래그 시 파랑 테두리)
          - 중앙 아이콘 + "파일을 여기에 끌어놓거나" 텍스트
          - 파일 선택 버튼
          - 지원 파일 형식: 카톡 txt, 사진(jpg/png/heic), PDF
          - 하단: 파일타입별 버튼 3개 (카톡대화/사진/서류)
          - "여러 파일을 동시에 업로드할 수 있어요" 안내
      */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={() => setIsDragging(false)}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <div className="text-4xl mb-3">📁</div>
        <p className="text-sm text-gray-600 mb-2">파일을 여기에 끌어놓거나</p>
        <p className="text-sm font-medium text-blue-600">클릭하여 선택</p>
        <p className="text-xs text-gray-400 mt-3">카톡 txt · 사진(jpg/png/heic) · PDF</p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".txt,.jpg,.jpeg,.png,.heic,.pdf"
        onChange={handleFileInput}
        className="hidden"
      />

      <div className="grid grid-cols-3 gap-2">
        <button
          disabled={disabled}
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center gap-1 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 transition-colors"
        >
          <span className="text-xl">💬</span>
          <span className="text-xs text-gray-600">카톡 대화</span>
        </button>
        <button
          disabled={disabled}
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center gap-1 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 transition-colors"
        >
          <span className="text-xl">📷</span>
          <span className="text-xs text-gray-600">사진</span>
        </button>
        <button
          disabled={disabled}
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center gap-1 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 transition-colors"
        >
          <span className="text-xl">📄</span>
          <span className="text-xs text-gray-600">서류</span>
        </button>
      </div>

      <p className="text-xs text-center text-gray-400">여러 파일을 동시에 업로드할 수 있어요</p>
    </div>
  );
}
