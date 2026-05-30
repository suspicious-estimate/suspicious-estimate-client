'use client'
import { useRouter } from 'next/navigation'
import { MobileLayout } from '@/components/layout/MobileLayout'

export default function LoginPage() {
  const router = useRouter()

  const handleKakaoLogin = () => {
    // TODO: 실제 카카오 OAuth 연동
    // window.location.href = `${API_BASE}/auth/kakao/login`
    router.push('/projects')
  }

  return (
    <MobileLayout>
      <div className="flex flex-col items-center justify-center min-h-screen px-8">
        <div className="mb-12 text-center">
          <div className="text-6xl mb-4">🏠</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">수상한견적서</h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            인테리어 공사의 모든 과정을<br />
            안전하게 기록하고 관리하세요
          </p>
        </div>

        <div className="w-full space-y-3">
          <button
            onClick={handleKakaoLogin}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#FEE500] text-[#191919] font-medium rounded-xl hover:bg-[#FDD835] transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 1C4.58 1 1 3.79 1 7.21c0 2.17 1.44 4.08 3.62 5.17l-.93 3.44c-.08.3.26.54.52.37l4.1-2.72c.22.02.44.03.67.03 4.42 0 8-2.79 8-6.23S13.42 1 9 1z" fill="#191919"/>
            </svg>
            카카오로 시작하기
          </button>

          <p className="text-xs text-center text-gray-400 mt-4">
            가입 시 서비스 이용약관 및 개인정보 처리방침에 동의합니다
          </p>
        </div>
      </div>
    </MobileLayout>
  )
}
