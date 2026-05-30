'use client'
import { formatFileSize } from '@/lib/utils'

interface StorageUsageProps {
  used: number
  limit: number
  plan: string
}

export function StorageUsage({ used, limit, plan }: StorageUsageProps) {
  const percentage = Math.min((used / limit) * 100, 100)

  return (
    <div className="p-4">
      {/* TODO: 목업 화면 11번(내보내기) 상단 용량 섹션 참고하여 구현
          - 원형 또는 바 그래프
          - 사용량 / 전체용량 텍스트
          - 요금제 뱃지
      */}
      <div className="bg-gray-50 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">저장 공간</span>
          <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-medium">
            {plan}
          </span>
        </div>

        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <p className="text-sm text-gray-600 mt-2">
          {formatFileSize(used)} / {formatFileSize(limit)} 사용 중
        </p>
      </div>
    </div>
  )
}
