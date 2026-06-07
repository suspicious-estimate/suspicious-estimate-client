'use client';
import { Card } from '@/components/ui/card';

interface ExportOptionsProps {
  onPdf: () => void;
  onZip: () => void;
  onArchive: () => void;
}

export function ExportOptions({ onPdf, onZip, onArchive }: ExportOptionsProps) {
  const options = [
    {
      icon: '📄',
      title: 'PDF 보고서',
      description: '타임라인 + 자재 + 변경요청을 한 파일로',
      onClick: onPdf,
    },
    {
      icon: '📦',
      title: 'ZIP 다운로드',
      description: '모든 사진 + 서류 원본 파일',
      onClick: onZip,
    },
    {
      icon: '🗄️',
      title: '장기 보관',
      description: '프로젝트 아카이브 (읽기 전용)',
      onClick: onArchive,
    },
  ];

  return (
    <div className="p-4 space-y-3">
      {options.map((opt) => (
        <Card
          key={opt.title}
          role="button"
          tabIndex={0}
          onClick={opt.onClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              opt.onClick();
            }
          }}
          className="flex-row items-center gap-4 px-4 cursor-pointer transition-colors hover:bg-accent/20 hover:ring-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="text-2xl flex-shrink-0">{opt.icon}</span>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">{opt.title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{opt.description}</p>
          </div>
          <span className="text-muted-foreground">→</span>
        </Card>
      ))}
    </div>
  );
}
