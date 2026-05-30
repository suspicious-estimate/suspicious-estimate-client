'use client'
import { UploadStep } from '@/types/common'

interface UploadProgressProps {
  steps: UploadStep[]
  currentStep: number
  estimatedTime?: string
}

export function UploadProgress({ steps, currentStep, estimatedTime }: UploadProgressProps) {
  const statusIcons: Record<string, string> = {
    pending: '⏳',
    processing: '⚙️',
    completed: '✅',
    failed: '❌',
  }

  return (
    <div className="p-4 space-y-4">
      {/* TODO: 목업 화면 5-2번(업로드 처리중) 참고하여 구현
          - 상단: "AI가 분석 중입니다" + 예상시간
          - 각 단계 카드: 아이콘 + 라벨 + 상태(완료/처리중 스피너/대기)
          - 처리중 단계: progress bar (있으면)
          - 하단: "잠시만 기다려주세요" 안내
      */}
      <div className="text-center mb-6">
        <div className="text-3xl mb-2">🤖</div>
        <p className="font-medium text-gray-900">AI가 분석 중입니다</p>
        {estimatedTime && (
          <p className="text-sm text-gray-500 mt-1">예상 소요시간: {estimatedTime}</p>
        )}
      </div>

      <div className="space-y-3">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-3 p-3 rounded-lg border ${
              step.status === 'processing'
                ? 'border-blue-200 bg-blue-50'
                : step.status === 'completed'
                ? 'border-green-200 bg-green-50'
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <span className="text-lg">
              {step.status === 'processing' ? (
                <span className="inline-block w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              ) : (
                statusIcons[step.status]
              )}
            </span>
            <div className="flex-1">
              <p className={`text-sm font-medium ${
                step.status === 'completed' ? 'text-green-700' :
                step.status === 'processing' ? 'text-blue-700' :
                'text-gray-500'
              }`}>
                {step.label}
              </p>
              {step.detail && (
                <p className="text-xs text-gray-500 mt-0.5">{step.detail}</p>
              )}
              {step.status === 'processing' && step.progress !== undefined && (
                <div className="w-full h-1.5 bg-blue-200 rounded-full mt-1.5">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-300"
                    style={{ width: `${step.progress}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
