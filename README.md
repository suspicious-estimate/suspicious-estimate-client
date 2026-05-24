# 수상한견적서 — Frontend

인테리어 공사 소비자 보호 플랫폼 프론트엔드

## 기술 스택

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **PWA** (모바일 우선)

## 시작하기

```bash
# 클론
git clone https://github.com/[조직명]/frontend.git
cd frontend

# 의존성 설치
npm install

# shadcn/ui 설정 (최초 1회)
npx shadcn@latest init

# 개발 서버
npm run dev
```

http://localhost:3000 에서 확인

## 프로젝트 구조

```
src/
├── app/                    # 페이지 라우팅
│   ├── layout.tsx          # 루트 레이아웃
│   ├── page.tsx            # 랜딩 페이지
│   ├── login/page.tsx      # 로그인
│   └── projects/
│       ├── page.tsx        # 프로젝트 목록
│       ├── new/page.tsx    # 프로젝트 생성
│       └── [id]/
│           ├── page.tsx        # 대시보드
│           ├── timeline/page.tsx   # 타임라인
│           ├── upload/page.tsx     # 업로드
│           ├── estimate/page.tsx   # 견적 분석
│           └── export/page.tsx     # PDF 내보내기
│
├── components/
│   ├── ui/                 # shadcn/ui 컴포넌트
│   ├── layout/             # Header, BottomNav, MobileLayout
│   ├── timeline/           # TimelineView, TimelineItem, CategoryBadge
│   ├── upload/             # FileUploader, UploadProgress
│   ├── project/            # ProjectCard, ProjectForm
│   └── estimate/           # EstimateReport, RiskBadge
│
├── lib/                    # api 클라이언트, auth, supabase, utils
├── hooks/                  # useProject, useTimeline, useUpload, useAuth
└── types/                  # TypeScript 타입 정의
```

## 작업 순서

| # | 작업 | 설명 |
|---|------|------|
| 1 | shadcn/ui 설정 | `npx shadcn@latest init` + Button, Card, Input, Sheet 등 추가 |
| 2 | 모바일 레이아웃 | MobileLayout + BottomNav (5탭: 홈/업로드/타임라인/견적/더보기) |
| 3 | 로그인 페이지 | 카카오 로그인 버튼 (UI만 먼저) |
| 4 | 프로젝트 목록/생성 | ProjectCard 리스트 + 생성 폼 |
| 5 | 업로드 페이지 | 파일 드래그앤드롭 + 진행률 표시 |
| 6 | 타임라인 뷰 | 시간순 수직 스크롤 + 공정분류 태그 + 필터 |
| 7 | PDF 내보내기 | 미리보기 + 다운로드 버튼 |

## 백엔드 API (Base URL: 추후 공유)

```
POST   /api/auth/kakao                     카카오 로그인
GET    /api/projects                        내 프로젝트 목록
POST   /api/projects                        프로젝트 생성
GET    /api/projects/{id}                   프로젝트 상세
POST   /api/projects/{id}/upload            파일 업로드 (multipart)
GET    /api/projects/{id}/timeline          타임라인 조회 (?category=&page=&size=)
POST   /api/projects/{id}/timeline          수동 항목 추가
PATCH  /api/projects/{id}/timeline/{item}/confirm  분류 확정
GET    /api/projects/{id}/changes           변경요청 목록
POST   /api/projects/{id}/changes           변경요청 등록
GET    /api/projects/{id}/materials         자재 목록
POST   /api/projects/{id}/materials         자재 등록
POST   /api/projects/{id}/export/pdf        PDF 생성
```

## 디자인 가이드

- **모바일 우선** (375px 기준, 반응형)
- 터치 타겟 최소 44px
- 카드 기반 UI
- 공정 분류 색상:
  - 철거: 빨강 / 목공: 갈색 / 전기: 노랑 / 배관: 파랑
  - 타일: 청록 / 도배: 보라 / 바닥재: 초록 / 기타: 회색

## 브랜치 규칙

- `main` — 직접 push 금지
- 작업 시 `feature/기능명` 브랜치 생성 후 PR
- 예: `feature/timeline-ui`, `feature/upload-page`

## 환경변수 (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SUPABASE_URL=추후공유
NEXT_PUBLIC_SUPABASE_ANON_KEY=추후공유
```
