'use client'
import { useRouter } from 'next/navigation'
import { MobileLayout } from '@/components/layout/MobileLayout'
import { Header } from '@/components/layout/Header'
import { BottomNav } from '@/components/layout/BottomNav'
import { useQuota } from '@/hooks/useQuota'
import { useAuth } from '@/hooks/useAuth'
import { formatFileSize } from '@/lib/utils'

export default function SettingsPage() {
  const router = useRouter()
  const { used, limit, plan, fileCount, fileLimit } = useQuota()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <MobileLayout>
      <Header title="설정" />

      <div className="px-4 pt-4 pb-24 space-y-4">
        {/* TODO: 목업 화면 12번(설정) 참고하여 구현 */}

        {/* 프로필 */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-lg">👤</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">{user?.name || '사용자'}</p>
              <p className="text-sm text-gray-500">{user?.email || ''}</p>
            </div>
          </div>
        </div>

        {/* 요금제 */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3">요금제</h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">현재 플랜</span>
            <span className="px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full uppercase">
              {plan}
            </span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">저장 공간</span>
            <span className="text-sm text-gray-900">
              {formatFileSize(used)} / {formatFileSize(limit)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">파일 수</span>
            <span className="text-sm text-gray-900">{fileCount} / {fileLimit}개</span>
          </div>
        </div>

        {/* 앱 정보 */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3">앱 정보</h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">버전</span>
            <span className="text-sm text-gray-400">1.0.0</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">문의</span>
            <span className="text-sm text-gray-400">help@suspicious-estimate.kr</span>
          </div>
        </div>

        {/* 로그아웃 */}
        <button
          onClick={handleLogout}
          className="w-full py-3 text-sm text-red-600 font-medium border border-red-200 rounded-xl hover:bg-red-50 transition-colors"
        >
          로그아웃
        </button>
      </div>

      <BottomNav />
    </MobileLayout>
  )
}
