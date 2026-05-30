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
git clone https://github.com/suspicious-estimate/frontend.git
cd frontend

# 의존성 설치
npm install

# shadcn/ui 설정 (최초 1회)
npx shadcn@latest init
npx shadcn@latest add button card input sheet dialog tabs badge avatar textarea scroll-area separator

# 개발 서버
npm run dev
```

http://localhost:3000 에서 확인

## 프로젝트 구조

```
src/
├── app/                        # 페이지 라우팅
│   ├── layout.tsx              # 루트 레이아웃 (MobileLayout 적용)
│   ├── page.tsx                # 랜딩/온보딩
│   ├── login/page.tsx          # 로그인 (카카오)
│   ├── projects/
│   │   ├── page.tsx            # 프로젝트 목록
│   │   ├── new/page.tsx        # 프로젝트 생성
│   │   └── [id]/
│   │       ├── page.tsx            # 대시보드
│   │       ├── timeline/page.tsx   # 타임라인 (핵심 화면)
│   │       ├── upload/page.tsx     # 파일 업로드
│   │       ├── estimate/page.tsx   # 견적 분석
│   │       ├── export/page.tsx     # 내보내기 (PDF/ZIP/Archive)
│   │       └── assistant/page.tsx  # AI 상담 ★신규
│   │
│   └── settings/page.tsx       # 설정 (요금제/용량 확인)
│
├── components/
│   ├── ui/                     # shadcn/ui 컴포넌트
│   ├── layout/
│   │   ├── MobileLayout.tsx    # 모바일 껍데기 (max-w-[430px])
│   │   ├── BottomNav.tsx       # 하단 네비게이션 (5탭)
│   │   └── Header.tsx          # 상단 헤더
│   │
│   ├── timeline/
│   │   ├── TimelineView.tsx    # 시간순 스크롤 리스트
│   │   ├── TimelineItem.tsx    # 개별 항목 (메시지/사진/문서)
│   │   └── CategoryBadge.tsx   # 공정 분류 태그 (색상별)
│   │
│   ├── upload/
│   │   ├── FileUploader.tsx    # 드래그앤드롭 + 파일선택
│   │   ├── UploadProgress.tsx  # 업로드 진행률
│   │   └── QuotaBar.tsx        # 저장 용량 바 ★신규
│   │
│   ├── project/
│   │   ├── ProjectCard.tsx     # 프로젝트 카드 (목록용)
│   │   └── ProjectForm.tsx     # 생성/수정 폼
│   │
│   ├── estimate/
│   │   ├── EstimateReport.tsx  # 분석 리포트 뷰
│   │   └── RiskBadge.tsx       # 위험도 배지
│   │
│   ├── assistant/              # ★신규 — AI 상담
│   │   ├── ChatView.tsx        # 채팅 화면 (말풍선 리스트)
│   │   ├── ChatBubble.tsx      # 개별 말풍선 (user/assistant)
│   │   ├── ChatInput.tsx       # 입력창 + 전송 버튼
│   │   ├── SuggestionChips.tsx # 후속 질문 버튼 (3개)
│   │   ├── DocumentPreview.tsx # AI 작성 문서 미리보기
│   │   └── TemplateSelector.tsx# 문서 템플릿 선택
│   │
│   └── export/                 # ★신규 — 내보내기
│       ├── ExportOptions.tsx   # PDF/ZIP/Archive 선택
│       ├── ArchiveCard.tsx     # 장기보관 안내 카드
│       └── StorageUsage.tsx    # 용량 사용 현황
│
├── lib/
│   ├── api.ts                  # API 클라이언트 (fetch wrapper)
│   ├── auth.ts                 # 인증 유틸
│   └── utils.ts                # 공통 유틸
│
├── hooks/
│   ├── useAuth.ts              # 로그인 상태
│   ├── useProject.ts           # 프로젝트 CRUD
│   ├── useTimeline.ts          # 타임라인 (무한스크롤)
│   ├── useUpload.ts            # 파일 업로드 + 진행률
│   ├── useAssistant.ts         # AI 상담 ★신규
│   └── useQuota.ts             # 용량 제한 확인 ★신규
│
└── types/
    ├── project.ts
    ├── timeline.ts
    ├── assistant.ts            # ★신규
    └── common.ts
```

## 작업 순서

| # | 작업 | 설명 | 우선순위 |
|---|------|------|----------|
| 1 | shadcn/ui 설정 | init + 컴포넌트 추가 | 즉시 |
| 2 | 모바일 레이아웃 | MobileLayout + BottomNav (6탭) | 즉시 |
| 3 | 로그인 페이지 | 카카오 로그인 버튼 (UI만 먼저) | 즉시 |
| 4 | 프로젝트 목록/생성 | ProjectCard + ProjectForm | 즉시 |
| 5 | 파일 업로드 | 드래그앤드롭 + QuotaBar | 다음 |
| 6 | 타임라인 뷰 | 시간순 스크롤 + 공정태그 + 필터 | 다음 |
| 7 | AI 상담 채팅 ★ | ChatView + SuggestionChips | 다음 |
| 8 | 내보내기 | PDF/ZIP 다운로드 + 아카이브 | 후순위 |
| 9 | 설정 (요금제/용량) | StorageUsage + 업그레이드 | 후순위 |

**일단 1~4단계 먼저 해줘. API 연동은 나중에, UI만 먼저 (목데이터로).**

## 하단 네비게이션 (6탭)

```
[홈] [업로드] [타임라인] [AI상담] [견적] [더보기]
 📋    📤       📅        💬      📊     ⚙️
```

## 백엔드 API (Base URL: 추후 공유)

### 기존 API
```
POST   /api/auth/kakao                     카카오 로그인
GET    /api/projects                        내 프로젝트 목록
POST   /api/projects                        프로젝트 생성
GET    /api/projects/{id}                   프로젝트 상세
POST   /api/projects/{id}/upload            파일 업로드 (multipart)
GET    /api/projects/{id}/timeline          타임라인 조회 (?category=&page=&size=&after=)
POST   /api/projects/{id}/timeline          수동 항목 추가
PATCH  /api/projects/{id}/timeline/{item}/confirm  분류 확정
GET    /api/projects/{id}/changes           변경요청 목록
POST   /api/projects/{id}/changes           변경요청 등록
GET    /api/projects/{id}/materials         자재 목록
POST   /api/projects/{id}/materials         자재 등록
GET    /api/projects/{id}/estimates         견적서 목록
POST   /api/projects/{id}/export/pdf        PDF 생성
```

### 신규 API ★
```
POST   /api/projects/{id}/export/zip        전체 ZIP 다운로드
POST   /api/projects/{id}/archive           장기보관 전환
POST   /api/projects/{id}/restore           복원
GET    /api/projects/storage-usage          용량 현황
POST   /api/assistant/chat                  AI 상담
POST   /api/assistant/analyze-photo         사진 분석
GET    /api/assistant/templates             문서 템플릿 목록
```

### AI 상담 API 상세

**POST /api/assistant/chat**
```json
// Request
{
  "message": "타일 갈라졌는데 어떡해?",
  "project_id": "uuid",           // 선택 (프로젝트 맥락 포함 시)
  "conversation_history": [       // 이전 대화
    {"role": "user", "content": "..."},
    {"role": "assistant", "content": "..."}
  ],
  "image_urls": [],               // 사진 분석 시
  "document_type": null           // 문서 작성 시: "defect_report" 등
}

// Response
{
  "response": "타일 줄눈 크랙은 하자보수 대상입니다...(상세 답변)",
  "suggestions": [                // 후속 질문 버튼 (3개)
    "하자보수 요청서 작성해줘",
    "업자한테 카톡으로 뭐라고 보내?",
    "소비자원 신고 방법은?"
  ],
  "model_used": "gemini-flash",
  "tokens_used": 1234,
  "intent_detected": "defect"     // 감지된 의도
}
```

## 디자인 가이드

- **모바일 우선** (375px 기준, 반응형)
- 터치 타겟 최소 44px
- 카드 기반 UI
- 공정 분류 색상:
  - 철거: 빨강 / 구조: 주황 / 배관: 파랑 / 전기: 노랑
  - 창호: 하늘 / 목공: 갈색 / 타일: 청록 / 도배: 보라
  - 바닥재: 초록 / 가구: 분홍 / 청소: 연두 / 기타: 회색

### AI 상담 UI 가이드

```
┌─────────────────────────────────┐
│  ← AI 상담         프로젝트: OO  │  ← 헤더
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────┐    │
│  │ 🤖 안녕하세요!           │    │  ← AI 말풍선 (왼쪽, 회색)
│  │ 공사 관련 뭐든 물어보세요 │    │
│  └─────────────────────────┘    │
│                                 │
│       ┌────────────────────┐    │
│       │ 타일 갈라졌는데     │    │  ← 사용자 말풍선 (오른쪽, 파랑)
│       │ 어떡해?            │    │
│       └────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │ 🤖 타일 줄눈 크랙은...   │    │  ← AI 답변 (마크다운 렌더링)
│  │                         │    │
│  │ 1. **하자 여부**: 해당   │    │
│  │ 2. **원인**: ...        │    │
│  │ 3. **법적 근거**: ...   │    │
│  │ 5. **카톡 문구**:       │    │
│  │    "사장님, 욕실 타일..." │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌──────┐ ┌──────┐ ┌──────┐    │  ← 후속 질문 칩 (가로 스크롤)
│  │요청서 │ │카톡문구│ │신고법 │    │
│  │작성해줘│ │보내기 │ │알려줘 │    │
│  └──────┘ └──────┘ └──────┘    │
│                                 │
├─────────────────────────────────┤
│  [메시지 입력...]        [전송]  │  ← 하단 입력창
│  📷 📄                          │  ← 사진첨부, 문서작성 버튼
└─────────────────────────────────┘
```

### 내보내기/설정 UI 가이드

```
┌─────────────────────────────────┐
│  ← 내보내기                      │
├─────────────────────────────────┤
│                                 │
│  ┌─ 저장 용량 ────────────────┐  │
│  │ ████████░░░░ 3.2GB / 5GB   │  │  ← QuotaBar
│  │ Basic 요금제 (64% 사용)     │  │
│  └────────────────────────────┘  │
│                                 │
│  ┌─ 내보내기 옵션 ────────────┐  │
│  │                            │  │
│  │  📄 PDF 공사이력서          │  │  ← 카드 버튼
│  │     요약 PDF 1장 다운로드   │  │
│  │                            │  │
│  │  📦 전체 ZIP 다운로드        │  │
│  │     사진+대화+분석결과 전부  │  │
│  │                            │  │
│  │  ☁️ 장기보관 (월 990원)     │  │
│  │     하자보수기간 안심 보관   │  │
│  │                            │  │
│  └────────────────────────────┘  │
└─────────────────────────────────┘
```

## 브랜치 규칙

- `main` — 직접 push 금지
- 작업 시 `feature/기능명` 브랜치 생성 후 PR
- 예: `feature/mobile-layout`, `feature/assistant-chat`

## 환경변수 (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SUPABASE_URL=추후공유
NEXT_PUBLIC_SUPABASE_ANON_KEY=추후공유
```
