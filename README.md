# 수상한견적서 — Frontend

인테리어 공사 소비자 보호 플랫폼 프론트엔드

## 기술 스택

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **PWA** (모바일 우선)

## 작업 순서

| #   | 작업               | 설명                            | 우선순위 |
| --- | ------------------ | ------------------------------- | -------- |
| 1   | shadcn/ui 설정     | init + 컴포넌트 추가            | 즉시     |
| 2   | 모바일 레이아웃    | MobileLayout + BottomNav (6탭)  | 즉시     |
| 3   | 로그인 페이지      | 카카오 로그인 버튼 (UI만 먼저)  | 즉시     |
| 4   | 프로젝트 목록/생성 | ProjectCard + ProjectForm       | 즉시     |
| 5   | 파일 업로드        | 드래그앤드롭 + QuotaBar         | 다음     |
| 6   | 타임라인 뷰        | 시간순 스크롤 + 공정태그 + 필터 | 다음     |
| 7   | AI 상담 채팅 ★     | ChatView + SuggestionChips      | 다음     |
| 8   | 내보내기           | PDF/ZIP 다운로드 + 아카이브     | 후순위   |
| 9   | 설정 (요금제/용량) | StorageUsage + 업그레이드       | 후순위   |

## 백엔드 API

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

## 브랜치 규칙

- `main` — 직접 push 금지
- 작업 시 `feature/기능명` 브랜치 생성 후 PR
- 예: `feature/mobile-layout`, `feature/assistant-chat`
