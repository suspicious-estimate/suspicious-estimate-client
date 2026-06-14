'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();

  const handleKakaoLogin = () => {
    // TODO: 실제 카카오 OAuth 연동
    // window.location.href = `${API_BASE}/auth/kakao/login`
    router.push('/projects');
  };

  return (
    // Layer 1: 파스텔 크림 베이스 (.grain → 배경면에만 노이즈)
    <div className="grain relative flex min-h-screen flex-col overflow-hidden bg-[#f3eef3]">
      {/* Layer 2: 오가닉 셰이프 — 화면 가장자리에 걸치는 비정형 블롭.
          각 블롭에도 .grain 을 줘서 도형 표면에 그레인이 얹힌다. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-[46%_54%_57%_43%/52%_46%_54%_48%] bg-blue-200/70" />
        <div className="absolute -right-20 top-8 h-56 w-56 rounded-[58%_42%_45%_55%/48%_56%_44%_52%] bg-green-200/55" />
        <div className="absolute -left-12 top-[38%] h-40 w-40 rounded-[50%_50%_42%_58%/55%_45%_55%_45%] bg-amber-200/55" />
        <div className="absolute -right-10 top-[30%] h-32 w-32 rounded-[55%_45%_50%_50%/50%_55%_45%_50%] bg-rose-200/45" />
      </div>

      {/* Layer 3: 콘텐츠 — 상단 히어로 (전경이라 노이즈 없음) */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-8 text-center">
        <div className="relative mb-5 bg-white rounded-4xl drop-shadow-xl">
          <Image
            src="/android-chrome-512x512.png"
            alt="수상한견적서 로고"
            width={128}
            height={128}
            priority
            className=""
          />
        </div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900">수상한견적서</h1>
        <p className="text-sm leading-relaxed text-gray-500">
          인테리어 공사의 모든 과정을
          <br />
          안전하게 기록하고 관리하세요
        </p>
      </div>

      {/* 로그인 액션 — 바텀시트 (.grain → 흰 배경에만 노이즈, 버튼/핸들은 깨끗) */}
      <div className="relative mt-8">
        <div className="rounded-t-4xl bg-white/95 px-8 pb-10 pt-5 shadow-[0_-12px_40px_-20px_rgba(125,92,189,0.35)] backdrop-blur-sm">
          {/* 그래버 핸들 */}
          <div className="mx-auto mb-7 h-1.5 w-10 rounded-full bg-gray-200" />

          <button
            onClick={handleKakaoLogin}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#FEE500] py-3.5 font-medium text-[#191919] transition-colors hover:bg-[#FDD835] cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M9 1C4.58 1 1 3.79 1 7.21c0 2.17 1.44 4.08 3.62 5.17l-.93 3.44c-.08.3.26.54.52.37l4.1-2.72c.22.02.44.03.67.03 4.42 0 8-2.79 8-6.23S13.42 1 9 1z"
                fill="#191919"
              />
            </svg>
            카카오로 시작하기
          </button>

          <p className="mt-4 text-center text-xs text-gray-400">
            가입 시 서비스 이용약관 및 개인정보 처리방침에 동의합니다
          </p>
        </div>
      </div>
    </div>
  );
}
