'use client'
import { formatFileSize } from '@/lib/utils'

interface QuotaBarProps {
  used: number
  limit: number
  plan: string
  fileCount?: number
  fileLimit?: number
}

export function QuotaBar({ used, limit, plan, fileCount, fileLimit }: QuotaBarProps) {
  const percentage = Math.min((used / limit) * 100, 100)
  const level = percentage >= 90 ? 'danger' : percentage >= 70 ? 'warn' : 'safe'

  const barColors = {
    safe: 'bg-blue-500',
    warn: 'bg-amber-500',
    danger: 'bg-red-500',
  }

  const textColors = {
    safe: 'text-blue-700',
    warn: 'text-amber-700',
    danger: 'text-red-700',
  }

  return (
    <div className="px-4 py-3">
      {/* TODO: 목업 화면 5번(업로드) QuotaBar 참고하여 구현
          - 요금제 뱃지 (free/basic/premium)
          - 프로그레스바 (색상: safe=파랑, warn=주황, danger=빨강)
          - 수치: "1.2GB / 5GB 사용 중"
          - 파일 수: "78 / 500개"
      */}
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-medium text-gray-500 uppercase">{plan} 플랜</span>
        <span className={`text-xs font-medium ${textColors[level]}`}>
          {formatFileSize(used)} / {formatFileSize(limit)}
        </span>
      </div>

      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColors[level]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {fileCount !== undefined && fileLimit !== undefined && (
        <p className="text-xs text-gray-400 mt-1 text-right">
          파일 {fileCount} / {fileLimit}개
        </p>
      )}
    </div>
  )
}
