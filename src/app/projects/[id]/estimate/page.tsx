'use client';
import { use } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { EstimateScore } from '@/components/estimate/EstimateScore';
import { RiskItem } from '@/components/estimate/RiskItem';
import { MissingItem } from '@/components/estimate/MissingItem';
import { EmptyState } from '@/components/common/EmptyState';
import { MOCK_ESTIMATE } from '@/lib/mock-data';

export default function EstimatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  // TODO: useEstimate(id) 훅으로 교체
  const estimate = MOCK_ESTIMATE;
  const hasEstimate = estimate !== null;

  if (!hasEstimate) {
    return (
      <>
        <Header title="견적 분석" backHref={`/projects/${id}`} />
        <EmptyState
          icon="📊"
          title="견적서를 올려주세요"
          description="견적서 PDF나 사진을 업로드하면 AI가 분석해드립니다"
          action={{ label: '업로드하기', onClick: () => {} }}
        />
        <BottomNav projectId={id} />
      </>
    );
  }

  return (
    <>
      <Header title="견적 분석" backHref={`/projects/${id}`} />

      <div className="px-4 pt-4 pb-24 space-y-6">
        {/* TODO: 목업 화면 9번(견적분석) 참고하여 구현
            - 점수 카드
            - 리스크 항목 리스트
            - 빠진 항목 리스트
            - AI 상담 CTA 배너
        */}
        <EstimateScore score={estimate.overall_score} />

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">
            ⚠️ 리스크 항목 ({estimate.risks.length}건)
          </h2>
          <div className="space-y-2">
            {estimate.risks.map((risk, idx) => (
              <RiskItem
                key={idx}
                level={risk.level}
                title={risk.title}
                description={risk.description}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-base font-semibold text-gray-900 mb-3">
            📋 빠진 항목 ({estimate.missing_items.length}건)
          </h2>
          <div className="space-y-2">
            {estimate.missing_items.map((item, idx) => (
              <MissingItem key={idx} title={item.title} description={item.description} />
            ))}
          </div>
        </section>

        <Link
          href={`/projects/${id}/assistant`}
          className="block w-full p-4 bg-blue-50 border border-blue-200 rounded-xl text-center hover:bg-blue-100 transition-colors"
        >
          <p className="text-sm font-medium text-blue-700">💬 이 견적에 대해 AI에게 질문하기</p>
          <p className="text-xs text-blue-500 mt-0.5">리스크 항목에 대한 대응 방법을 알려드려요</p>
        </Link>
      </div>

      <BottomNav projectId={id} />
    </>
  );
}
