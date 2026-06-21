'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

function KakaoButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
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
  );
}

function TermsNotice() {
  return (
    <p className="mt-4 text-center text-xs text-gray-400">
      가입 시 서비스 이용약관 및 개인정보 처리방침에 동의합니다
    </p>
  );
}

export default function LoginPage() {
  const router = useRouter();

  const handleKakaoLogin = () => {
    // TODO: 실제 카카오 OAuth 연동
    // window.location.href = `${API_BASE}/auth/kakao/login`
    router.push('/projects');
  };

  return (
    <>
      {/* 모바일 (< lg): 히어로 + 바텀시트 */}
      <section className="relative flex min-h-screen flex-col overflow-hidden bg-[#f3eef3] lg:hidden">
        {/* Layer 2: 오가닉 셰이프 — 화면 가장자리에 걸치는 비정형 블롭. */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-[46%_54%_57%_43%/52%_46%_54%_48%] bg-blue-200/70" />
          <div className="absolute -right-20 top-8 h-56 w-56 rounded-[58%_42%_45%_55%/48%_56%_44%_52%] bg-green-200/55" />
          <div className="absolute -left-12 top-[38%] h-40 w-40 rounded-[50%_50%_42%_58%/55%_45%_55%_45%] bg-amber-200/55" />
          <div className="absolute -right-10 top-[30%] h-32 w-32 rounded-[55%_45%_50%_50%/50%_55%_45%_50%] bg-rose-200/45" />
        </div>

        {/* Layer 3: 콘텐츠 — 상단 히어로 */}
        <div className="relative flex flex-1 flex-col items-center justify-center px-8 text-center">
          <div className="relative mb-5 bg-white rounded-4xl drop-shadow-xl">
            <Image
              src="/android-chrome-512x512.png"
              alt="수상한견적서 로고"
              width={128}
              height={128}
              priority
            />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900">수상한견적서</h1>
          <p className="text-sm leading-relaxed text-gray-500">
            인테리어 공사의 모든 과정을
            <br />
            안전하게 기록하고 관리하세요
          </p>
        </div>

        {/* 로그인 액션 — 바텀시트 */}
        <div className="relative mt-8">
          <div className="rounded-t-4xl bg-white/95 px-8 pb-10 pt-5 shadow-[0_-12px_40px_-20px_rgba(125,92,189,0.35)] backdrop-blur-sm">
            {/* 그래버 핸들 */}
            <div className="mx-auto mb-7 h-1.5 w-10 rounded-full bg-gray-200" />
            <KakaoButton onClick={handleKakaoLogin} />
            <TermsNotice />
          </div>
        </div>
      </section>

      {/* 데스크톱 (lg 이상): 중앙 분할 카드 */}
      <section className="hidden min-h-screen items-center justify-center bg-white p-8 lg:flex">
        <div className="grid w-full max-w-5xl grid-cols-2 overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_80px_-32px_rgba(125,92,189,0.45)]">
          {/* 좌측: 장식 패널 (블롭 + 그레인) */}
          <div className="relative overflow-hidden bg-[#f3eef3]">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute -left-16 -top-16 h-72 w-72 rounded-[46%_54%_57%_43%/52%_46%_54%_48%] bg-white/20" />
              <div className="absolute -right-12 top-1/4 h-56 w-56 rounded-[58%_42%_45%_55%/48%_56%_44%_52%] bg-amber-200/30" />
              <div className="absolute -left-8 bottom-0 h-48 w-48 rounded-[50%_50%_42%_58%/55%_45%_55%_45%] bg-green-200/25" />
            </div>
            <div className="relative flex h-full flex-col justify-end p-12 text-gray-800">
              <h2 className="text-3xl font-bold leading-snug">
                인테리어 공사의
                <br />
                모든 과정을 안전하게
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600/80">
                기록하고 관리하는 가장 든든한 방법
              </p>
            </div>
          </div>

          {/* 우측: 폼 패널 */}
          <div className="flex flex-col justify-center px-14 py-16">
            <div className="mx-auto mb-6 w-fit rounded-3xl bg-white drop-shadow-xl">
              <Image
                src="/android-chrome-512x512.png"
                alt="수상한견적서 로고"
                width={88}
                height={88}
                priority
              />
            </div>
            <h1 className="mb-2 text-center text-2xl font-bold text-gray-900">수상한견적서</h1>
            <p className="mb-8 text-center text-sm leading-relaxed text-gray-500">
              인테리어 공사의 모든 과정을 안전하게 기록하고 관리하세요
            </p>
            <KakaoButton onClick={handleKakaoLogin} />
            <TermsNotice />
          </div>
        </div>
      </section>
    </>
  );
}
