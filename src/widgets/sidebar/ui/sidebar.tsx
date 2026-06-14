'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HouseIcon, PlusIcon, GearSixIcon, CaretRightIcon } from '@phosphor-icons/react/ssr';
import { useProjects } from '@/entities/project/model/use-project';
import { getProjectTabItems } from '@/widgets/project-nav/ui/project-tabs';
import { useSidebarNav } from '@/widgets/sidebar/model/sidebar-context';

// 데스크톱(md+) 전용 전역 네비게이션. lilys처럼 카테고리를 펼쳐 보는 트리 구조.
// 프로젝트 '사이' 이동(목록)과 프로젝트 '안' 이동(탭)을 한 곳에서 탐색한다.
export function Sidebar() {
  const pathname = usePathname();
  const { projects } = useProjects();

  // 현재 보고 있는 프로젝트 id ('new'는 프로젝트가 아님)
  const match = pathname.match(/^\/projects\/([^/]+)/);
  const currentId = match && match[1] !== 'new' ? match[1] : null;

  const {
    projectsOpen,
    expandedProjects,
    toggleProjectsOpen,
    toggleProjectExpanded,
    setProjectExpanded,
  } = useSidebarNav();
  const isProjectExpanded = (id: string) => !!expandedProjects[id];

  // 현재 프로젝트로 이동하면 펼쳐주되, 다른 펼친 항목은 닫지 않는다.
  useEffect(() => {
    if (currentId) setProjectExpanded(currentId, true);
  }, [currentId, setProjectExpanded]);

  const isTabActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 md:shrink-0 md:sticky md:top-0 md:h-screen md:overflow-y-auto border-r border-gray-200 bg-white px-3 py-5">
      <Link href="/projects" className="flex items-center gap-2 px-3 mb-6">
        <Image
          src="/apple-touch-icon.png"
          alt="수상한견적서 로고"
          width={28}
          height={28}
          className="rounded-lg shrink-0"
          priority
        />
        <span className="text-lg font-bold text-gray-900">수상한견적서</span>
      </Link>

      {/* 새 프로젝트 */}
      <Link
        href="/projects/new"
        className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
          pathname === '/projects/new'
            ? 'bg-blue-50 text-blue-700'
            : 'text-gray-600 hover:bg-gray-50'
        }`}
      >
        <PlusIcon size={20} weight={pathname === '/projects/new' ? 'fill' : 'duotone'} />새 프로젝트
      </Link>

      <nav className="flex flex-col gap-1">
        {/* 프로젝트 (펼치면 프로젝트 목록) */}
        <div>
          <div
            className={`flex items-center rounded-lg ${
              pathname === '/projects'
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Link
              href="/projects"
              className="flex flex-1 items-center gap-2.5 px-3 py-2 text-sm font-medium"
            >
              <HouseIcon size={20} weight={pathname === '/projects' ? 'fill' : 'duotone'} />
              프로젝트
            </Link>
            <button
              type="button"
              onClick={toggleProjectsOpen}
              aria-label="프로젝트 목록 펼치기/접기"
              className="flex items-center justify-center w-7 h-9 shrink-0 mr-1 text-gray-400 hover:text-gray-600"
            >
              <CaretRightIcon
                size={14}
                weight="bold"
                className={`transition-transform ${projectsOpen ? 'rotate-90' : ''}`}
              />
            </button>
          </div>

          {projectsOpen && (
            <div className="ml-3.5 mt-0.5 pl-2 border-l border-gray-200">
              {projects.length === 0 && (
                <p className="px-3 py-2 text-xs text-gray-400">프로젝트가 없습니다</p>
              )}
              {projects.map((project) => {
                const active = project.id === currentId;
                const open = isProjectExpanded(project.id);
                return (
                  <div key={project.id}>
                    <div
                      className={`flex items-center rounded-lg ${
                        active ? 'text-gray-900' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Link
                        href={`/projects/${project.id}`}
                        className={`flex-1 min-w-0 truncate px-3 py-1.5 text-sm ${
                          active ? 'font-semibold' : 'font-medium'
                        }`}
                      >
                        {project.title}
                      </Link>
                      <button
                        type="button"
                        onClick={() => toggleProjectExpanded(project.id)}
                        aria-label="프로젝트 탭 펼치기/접기"
                        className="flex items-center justify-center w-6 h-8 shrink-0 mr-1 text-gray-400 hover:text-gray-600"
                      >
                        <CaretRightIcon
                          size={12}
                          weight="bold"
                          className={`transition-transform ${open ? 'rotate-90' : ''}`}
                        />
                      </button>
                    </div>

                    {open && (
                      <div className="ml-3 pl-2 border-l border-gray-200">
                        {getProjectTabItems(project.id).map((tab) => {
                          const tabActive = isTabActive(tab.href);
                          return (
                            <Link
                              key={tab.href}
                              href={tab.href}
                              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                                tabActive
                                  ? 'bg-blue-50 text-blue-700 font-medium'
                                  : 'text-gray-500 hover:bg-gray-50'
                              }`}
                            >
                              <tab.icon size={16} weight={tabActive ? 'fill' : 'duotone'} />
                              {tab.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 설정 */}
        <Link
          href="/settings"
          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            pathname.startsWith('/settings')
              ? 'bg-blue-50 text-blue-700'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <GearSixIcon size={20} weight={pathname.startsWith('/settings') ? 'fill' : 'duotone'} />
          설정
        </Link>
      </nav>
    </aside>
  );
}
