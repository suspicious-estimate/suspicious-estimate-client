'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface OnboardingGuideProps {
  onSkip: () => void;
  onStart: () => void;
}

const STEPS = [
  {
    icon: '📋',
    title: '프로젝트 만들기',
    description: '인테리어 공사 프로젝트를 생성하고 기본 정보를 입력하세요.',
  },
  {
    icon: '📤',
    title: '자료 올리기',
    description: '카톡 대화, 사진, 견적서를 업로드하면 AI가 자동으로 정리합니다.',
  },
  {
    icon: '🛡️',
    title: '분쟁 대비',
    description: '타임라인과 AI 상담으로 공사 과정을 체계적으로 관리하세요.',
  },
];

export function OnboardingGuide({ onSkip, onStart }: OnboardingGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const isLast = currentStep === STEPS.length - 1;

  return (
    <div className="flex flex-col items-center px-6 py-8">
      <div className="flex-1 flex flex-col items-center justify-center text-center mb-8">
        <span className="text-6xl mb-6">{STEPS[currentStep].icon}</span>
        <h2 className="text-xl font-bold text-foreground mb-2">{STEPS[currentStep].title}</h2>
        <p className="text-sm text-muted-foreground max-w-[280px]">
          {STEPS[currentStep].description}
        </p>
      </div>

      <div className="flex gap-1.5 mb-8">
        {STEPS.map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`${idx + 1}단계로 이동`}
            onClick={() => setCurrentStep(idx)}
            className={cn(
              'h-2 rounded-full transition-all',
              idx === currentStep ? 'w-5 bg-foreground' : 'w-2 bg-border',
            )}
          />
        ))}
      </div>

      <div className="w-full space-y-3">
        <Button
          size="lg"
          className="w-full"
          onClick={() => (isLast ? onStart() : setCurrentStep((prev) => prev + 1))}
        >
          {isLast ? '시작하기' : '다음'}
        </Button>
        <Button variant="ghost" className="w-full text-muted-foreground" onClick={onSkip}>
          건너뛰기
        </Button>
      </div>
    </div>
  );
}
