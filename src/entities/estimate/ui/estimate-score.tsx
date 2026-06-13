'use client';

interface EstimateScoreProps {
  score: number;
}

export function EstimateScore({ score }: EstimateScoreProps) {
  const getScoreColor = (s: number) => {
    if (s >= 80) return { ring: 'text-green-500', bg: 'bg-green-50', label: '양호' };
    if (s >= 60) return { ring: 'text-amber-500', bg: 'bg-amber-50', label: '주의' };
    return { ring: 'text-red-500', bg: 'bg-red-50', label: '위험' };
  };

  const { ring, bg, label } = getScoreColor(score);

  return (
    <div className={`flex flex-col items-center py-8 rounded-xl ${bg}`}>
      {/* TODO: 목업 화면 9번(견적분석) 참고하여 구현
          - 원형 점수 표시 (SVG circle 또는 CSS)
          - 점수 숫자 (크게, 중앙)
          - 하단 라벨: "양호" / "주의" / "위험"
          - 색상 변환: 80+ 초록, 60~79 주황, 60미만 빨강
      */}
      <div className={`relative w-32 h-32 flex items-center justify-center`}>
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke="#e5e7eb" strokeWidth="8" />
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            className={ring}
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${score * 2.64} 264`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-gray-900">{score}</span>
          <span className="text-xs text-gray-500">/ 100</span>
        </div>
      </div>
      <span className={`mt-3 text-sm font-medium ${ring}`}>{label}</span>
    </div>
  );
}
