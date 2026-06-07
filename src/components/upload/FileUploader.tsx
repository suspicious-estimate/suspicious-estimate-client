'use client';
import { useCallback, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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

  const typeButtons = [
    { icon: '💬', label: '카톡 대화' },
    { icon: '📷', label: '사진' },
    { icon: '📄', label: '서류' },
  ];

  return (
    <div className="p-4 space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={() => setIsDragging(false)}
        className={cn(
          'border-2 border-dashed rounded-xl p-8 text-center transition-colors',
          isDragging ? 'border-ring bg-accent/30' : 'border-input',
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        )}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <div className="text-4xl mb-3">📁</div>
        <p className="text-sm text-muted-foreground mb-2">파일을 여기에 끌어놓거나</p>
        <p className="text-sm font-medium text-foreground">클릭하여 선택</p>
        <p className="text-xs text-muted-foreground mt-3">카톡 txt · 사진(jpg/png/heic) · PDF</p>
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
        {typeButtons.map((btn) => (
          <Button
            key={btn.label}
            variant="outline"
            disabled={disabled}
            onClick={() => fileInputRef.current?.click()}
            className="h-auto flex-col gap-1 py-3"
          >
            <span className="text-xl">{btn.icon}</span>
            <span className="text-xs text-muted-foreground">{btn.label}</span>
          </Button>
        ))}
      </div>

      <p className="text-xs text-center text-muted-foreground">
        여러 파일을 동시에 업로드할 수 있어요
      </p>
    </div>
  );
}
