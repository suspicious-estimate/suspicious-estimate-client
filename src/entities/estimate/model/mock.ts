export const MOCK_ESTIMATE = {
  id: 'est-001',
  project_id: 'proj-001',
  file_url: '/mock/estimate.pdf',
  original_filename: '행복건설_견적서.pdf',
  total_amount: 28000000,
  status: 'completed' as const,
  overall_score: 72,
  risks: [
    {
      level: 'high' as const,
      title: '철거 폐기물 처리비 별도',
      description: '보통 30~80만원 추가 발생. 견적에 포함 여부 확인 필요',
    },
    {
      level: 'high' as const,
      title: '전기 추가 배선 현장 결정',
      description: '콘센트 추가 시 개당 3~5만원. 범위 미확정',
    },
    {
      level: 'medium' as const,
      title: '도배 면적 "실측 후 확정"',
      description: '면적 차이에 따라 ±10% 변동 가능',
    },
  ],
  missing_items: [
    { title: '입주청소 항목 없음', description: '보통 25평 기준 15~25만원. 포함인지 확인하세요' },
    { title: '보양 작업 항목 없음', description: '현관/엘리베이터 보양. 관리사무소 요구 시 추가' },
  ],
};
