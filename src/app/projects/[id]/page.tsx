import { redirect } from 'next/navigation';

// 대시보드(허브)를 제거하고, 프로젝트 진입 시 기본 탭(타임라인)으로 바로 보낸다.
// 프로젝트 요약 정보는 셸 layout의 요약 스트립으로 흡수했다.
export default async function ProjectIndexPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(`/projects/${id}/timeline`);
}
