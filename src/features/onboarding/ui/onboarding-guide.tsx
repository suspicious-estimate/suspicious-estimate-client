'use client';
import { useState } from 'react';
import type { Icon } from '@phosphor-icons/react/lib';
import { ClipboardTextIcon, UploadSimpleIcon, ShieldCheckIcon } from '@phosphor-icons/react/ssr';

interface OnboardingGuideProps {
  onSkip: () => void;
  onStart: () => void;
}

const STEPS: { icon: Icon; title: string; description: string }[] = [
  {
    icon: ClipboardTextIcon,
    title: '프로젝트 만들기',
    description: '인테리어 공사 프로젝트를 생성하고 기본 정보를 입력하세요.',
  },
  {
    icon: UploadSimpleIcon,
    title: '자료 올리기',
    description: '카톡 대화, 사진, 견적서를 업로드하면 AI가 자동으로 정리합니다.',
  },
  {
    icon: ShieldCheckIcon,
    title: '분쟁 대비',
    description: '타임라인과 AI 상담으로 공사 과정을 체계적으로 관리하세요.',
  },
];

export function OnboardingGuide({ onSkip, onStart }: OnboardingGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const StepIcon = STEPS[currentStep].icon;

  return (
    <div className="flex flex-col items-center px-6 py-8">
      {/* TODO: 목업 화면 2번(온보딩) 참고하여 구현
          - 3단계 슬라이드 (좌우 스와이프 또는 도트 네비게이션)
          - 각 단계: 큰 아이콘 + 제목 + 설명
          - 하단: 도트 인디케이터 + "시작하기" 버튼 + "건너뛰기" 링크
      */}
      <div className="flex-1 flex flex-col items-center justify-center text-center mb-8">
        <StepIcon size={72} weight="duotone" className="mb-6 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">{STEPS[currentStep].title}</h2>
        <p className="text-sm text-gray-500 max-w-[280px]">{STEPS[currentStep].description}</p>
      </div>

      <div className="flex gap-1.5 mb-8">
        {STEPS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentStep(idx)}
            className={`w-2 h-2 rounded-full transition-colors ${
              idx === currentStep ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      <div className="w-full space-y-3">
        {currentStep < STEPS.length - 1 ? (
          <button
            onClick={() => setCurrentStep((prev) => prev + 1)}
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            다음
          </button>
        ) : (
          <button
            onClick={onStart}
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            시작하기
          </button>
        )}
        <button
          onClick={onSkip}
          className="w-full py-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          건너뛰기
        </button>
      </div>
    </div>
  );
}
