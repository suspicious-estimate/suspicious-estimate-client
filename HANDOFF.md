# 프론트엔드 UI 구현 작업 가이드

> 이 문서만 읽으면 바로 작업 가능합니다.

---

## 1. 현재 상태 (이미 되어있는 것)

- Next.js 프로젝트 세팅 완료
- 모든 페이지 라우트 연결됨 (12개 페이지)
- 데이터 훅 완성 (목데이터 자동 표시)
- 레이아웃 (모바일 프레임 + 하단탭 + 헤더) 완성
- 타입 정의 100%
- 유틸 함수 (날짜포맷, 금액포맷 등) 완성

**당신이 할 것**: `src/components/` 폴더 안의 컴포넌트 **내부 UI를 목업 보고 꾸미기**

---

## 2. 환경 설정 (최초 1회)

### 필요한 것
- Node.js 20 이상 (`node -v`로 확인, 없으면 https://nodejs.org)
- VS Code (추천)
- Chrome 브라우저

### 실행 (Mac 터미널)

```bash
# 1. 받은 폴더로 이동
cd 수상한견적서/frontend

# 2. 패키지 설치 (최초 1회, 2~3분 소요)
npm install

# 3. 개발 서버 시작
npm run dev
```

브라우저에서 `http://localhost:3000` 열면 프로젝트 목록 화면이 나옵니다.

> Node.js가 없으면: `brew install node` (Homebrew) 또는 https://nodejs.org 에서 다운로드

### VS Code 추천 확장

- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets

---

## 3. 목업 참고 방법

**`frontend-mockup.html`** 파일을 브라우저에서 열면 완성된 디자인 13화면이 보입니다.

사용법:
1. 브라우저에서 `frontend-mockup.html` 열기
2. 상단 탭으로 화면 전환 (1~13번)
3. Chrome DevTools(F12) > Elements 탭에서 HTML/CSS 직접 복사 가능
4. 해당 화면의 색상, 간격, 폰트 크기를 그대로 옮기면 됨

**화면 번호 ↔ 컴포넌트 매핑:**

| 목업 화면 | 관련 컴포넌트 파일 |
|----------|-------------------|
| 2번 온보딩 | `common/OnboardingGuide.tsx` |
| 3번 프로젝트 목록 | `project/ProjectCard.tsx` |
| 4번 새 프로젝트 | `project/ProjectForm.tsx` (이미 거의 완성) |
| 5번 업로드 | `upload/FileUploader.tsx`, `upload/QuotaBar.tsx` |
| 5-2번 처리중 | `upload/UploadProgress.tsx` |
| 6번 타임라인 | `timeline/TimelineView.tsx`, `TimelineItem.tsx`, `CategoryFilter.tsx`, `SearchBar.tsx` |
| 7번 대시보드 | 페이지(`app/projects/[id]/page.tsx`)에 이미 구현됨 |
| 8번 AI상담 | `assistant/ChatView.tsx`, `ChatBubble.tsx`, `ChatInput.tsx`, `SuggestionChips.tsx` |
| 9번 견적분석 | `estimate/EstimateScore.tsx`, `RiskItem.tsx`, `MissingItem.tsx` |
| 11번 내보내기 | `export/ExportOptions.tsx`, `export/StorageUsage.tsx` |
| 12번 설정 | 페이지(`app/settings/page.tsx`)에 이미 구현됨 |

---

## 4. 작업 방법

### 기본 흐름

1. 컴포넌트 파일을 연다 (예: `src/components/timeline/TimelineItem.tsx`)
2. 파일 안에 TODO 주석이 있다 → 어떤 목업을 참고할지 적혀있음
3. 목업 HTML을 보면서 Tailwind 클래스로 UI를 채운다
4. `localhost:3000`에서 실시간 확인 (저장하면 자동 반영)

### 예시: ProjectCard.tsx 수정 전

```tsx
export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <button onClick={onClick} className="w-full text-left ...">
      {/* TODO: 목업 화면 3번 참고하여 구현 */}
      <p className="text-gray-400 text-sm">ProjectCard — 목업 참고하여 구현</p>
      <p className="font-medium">{project.title}</p>
    </button>
  )
}
```

### 예시: 수정 후 (목업 보고 채운 것)

```tsx
export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <button onClick={onClick} className="w-full text-left bg-white rounded-xl border border-gray-200 p-4 hover:border-blue-200 hover:shadow-sm transition-all">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-gray-900">{project.title}</h3>
        <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
          {project.status === 'active' ? '진행중' : '완료'}
        </span>
      </div>
      {project.address && <p className="text-sm text-gray-500">{project.address}</p>}
      <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
        {project.contractor_name && <span>🏗️ {project.contractor_name}</span>}
        {project.contract_amount && <span>💰 {formatCurrency(project.contract_amount)}</span>}
      </div>
    </button>
  )
}
```

---

## 5. 프로젝트 구조 (수정할 곳만)

```
src/components/          ★ 여기만 수정
├── assistant/           AI 상담 채팅 UI
│   ├── ChatView.tsx     채팅 전체 레이아웃
│   ├── ChatBubble.tsx   말풍선 (user/assistant)
│   ├── ChatInput.tsx    입력창 + 전송버튼
│   └── SuggestionChips.tsx  추천 질문 칩
├── common/              공통
│   ├── EmptyState.tsx   빈 화면 (아이콘+텍스트+버튼)
│   └── OnboardingGuide.tsx  3단계 가이드
├── estimate/            견적 분석
│   ├── EstimateScore.tsx  원형 점수 (이미 기본 구현됨)
│   ├── RiskItem.tsx     리스크 카드
│   └── MissingItem.tsx  빠진 항목 카드
├── export/              내보내기
│   ├── ExportOptions.tsx  3개 옵션 카드
│   └── StorageUsage.tsx   용량 바
├── project/             프로젝트
│   ├── ProjectCard.tsx  프로젝트 카드
│   └── ProjectForm.tsx  생성 폼 (이미 거의 완성됨)
├── timeline/            타임라인
│   ├── TimelineView.tsx  날짜별 그룹 + 리스트
│   ├── TimelineItem.tsx  개별 항목
│   ├── CategoryBadge.tsx 카테고리 뱃지 (이미 완성됨)
│   ├── CategoryFilter.tsx 가로 필터 탭
│   └── SearchBar.tsx    검색바 (이미 거의 완성됨)
└── upload/              업로드
    ├── FileUploader.tsx  드래그앤드롭 영역
    ├── UploadProgress.tsx 처리 단계 표시
    └── QuotaBar.tsx     용량 프로그레스바
```

**수정하면 안 되는 폴더**: `app/`, `hooks/`, `lib/`, `types/`, `components/layout/`

---

## 6. 작업 순서 (추천)

| 순서 | 파일 | 난이도 | 소요시간 |
|------|------|--------|---------|
| 1 | `project/ProjectCard.tsx` | 쉬움 | 20분 |
| 2 | `timeline/TimelineItem.tsx` | 보통 | 30분 |
| 3 | `timeline/TimelineView.tsx` | 보통 | 40분 |
| 4 | `assistant/ChatBubble.tsx` | 쉬움 | 15분 |
| 5 | `assistant/ChatInput.tsx` | 쉬움 | 15분 |
| 6 | `assistant/ChatView.tsx` | 보통 | 30분 |
| 7 | `assistant/SuggestionChips.tsx` | 쉬움 | 10분 |
| 8 | `upload/FileUploader.tsx` | 보통 | 30분 |
| 9 | `upload/UploadProgress.tsx` | 보통 | 25분 |
| 10 | `upload/QuotaBar.tsx` | 쉬움 | 15분 |
| 11 | `estimate/RiskItem.tsx` | 쉬움 | 10분 |
| 12 | `estimate/MissingItem.tsx` | 쉬움 | 10분 |
| 13 | `estimate/EstimateScore.tsx` | 이미 됨 | 확인만 |
| 14 | `common/OnboardingGuide.tsx` | 보통 | 25분 |
| 15 | `common/EmptyState.tsx` | 쉬움 | 10분 |
| 16 | `export/ExportOptions.tsx` | 쉬움 | 15분 |
| 17 | `export/StorageUsage.tsx` | 쉬움 | 10분 |
| 18 | `timeline/CategoryFilter.tsx` | 이미 됨 | 확인만 |
| 19 | `timeline/SearchBar.tsx` | 이미 됨 | 확인만 |
| 20 | `project/ProjectForm.tsx` | 이미 됨 | 확인만 |

**예상 총 소요: 5~7시간** (하루이틀 작업)

---

## 7. 규칙 (중요!)

1. **props 인터페이스 수정 금지** — 이미 정의된 props를 그대로 사용
2. **hooks 폴더 수정 금지** — 데이터는 자동으로 나옴
3. **Tailwind 클래스만 사용** — 별도 CSS 파일 만들지 말 것
4. **모바일 375px에서 항상 확인** — Chrome DevTools > Ctrl+Shift+M
5. **목업 HTML 디자인을 최대한 똑같이** — 창의성보다 정확한 재현
6. **가로 스크롤 영역**에는 className에 `scrollbar-hide` 추가
7. **색상**: 파랑 `bg-blue-600`, 초록 `bg-green-600`, 주황 `bg-amber-500`, 빨강 `bg-red-500`

---

## 8. 자주 쓰는 유틸 함수

```tsx
import { formatCurrency } from '@/lib/utils'
// formatCurrency(28000000) → "2,800만원"

import { formatDate } from '@/lib/utils'
// formatDate('2024-03-15T09:00:00Z') → "3월 15일 금요일"

import { formatTime } from '@/lib/utils'
// formatTime('2024-03-15T13:30:00Z') → "오후 1:30"

import { formatFileSize } from '@/lib/utils'
// formatFileSize(1288490188) → "1.2GB"

import { getCategoryInfo } from '@/lib/utils'
// getCategoryInfo('tiling') → { id: 'tiling', name: '타일', color: '#0891b2', bgColor: '#cffafe' }

import { cn } from '@/lib/utils'
// cn('text-sm', isActive && 'text-blue-600', !isActive && 'text-gray-400')
```

---

## 9. 확인하는 법

### 타입 에러 확인
```bash
npm run build
```
에러 없이 끝나야 정상.

### 화면 확인 (이 페이지들이 다 보여야 함)

| URL | 화면 |
|-----|------|
| `/projects` | 프로젝트 카드 2개 |
| `/projects/proj-001` | 대시보드 + 퀵액션 4개 |
| `/projects/proj-001/timeline` | 타임라인 10개 항목 + 필터 |
| `/projects/proj-001/upload` | QuotaBar + 드래그 영역 |
| `/projects/proj-001/estimate` | 점수 72 + 리스크 3 + 빠진 2 |
| `/projects/proj-001/assistant` | 채팅 UI + 추천 질문 |
| `/projects/proj-001/export` | 내보내기 옵션 3개 |
| `/settings` | 프로필 + 요금제 + 로그아웃 |

### 모바일 확인
Chrome > F12 > 상단 디바이스 아이콘 클릭 > iPhone SE (375px) 선택

---

## 10. 막힐 때

1. 컴포넌트 파일의 `TODO` 주석 읽기
2. `frontend-mockup.html` 에서 해당 화면 찾아서 HTML 구조 복사
3. `src/types/` 에서 데이터 구조 확인 (어떤 필드가 있는지)
4. 이미 완성된 비슷한 컴포넌트 참고:
   - `CategoryBadge.tsx` → 뱃지 스타일
   - `SearchBar.tsx` → 입력 필드 스타일
   - `Header.tsx` → 상단 바 구조
