'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Icon } from '@phosphor-icons/react/lib';
import {
  ListChecksIcon,
  UploadSimpleIcon,
  ChatCircleIcon,
  ChartBarIcon,
} from '@phosphor-icons/react/ssr';

interface TabItem {
  label: string;
  icon: Icon;
  href: string;
}

// 프로젝트 내부 탭(항목 내부 전환). 내보내기는 탭이 아닌 헤더 액션으로 분리한다.
export function getProjectTabItems(projectId: string): TabItem[] {
  return [
    { label: '타임라인', icon: ListChecksIcon, href: `/projects/${projectId}/timeline` },
    { label: '업로드', icon: UploadSimpleIcon, href: `/projects/${projectId}/upload` },
    { label: 'AI상담', icon: ChatCircleIcon, href: `/projects/${projectId}/assistant` },
    { label: '견적', icon: ChartBarIcon, href: `/projects/${projectId}/estimate` },
  ];
}

interface ProjectTabsProps {
  projectId: string;
  /** bottom: 모바일 하단바, top: 데스크톱 상단 탭바 */
  variant: 'bottom' | 'top';
  className?: string;
}

export function ProjectTabs({ projectId, variant, className }: ProjectTabsProps) {
  const pathname = usePathname();
  const items = getProjectTabItems(projectId);
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  if (variant === 'bottom') {
    return (
      <nav
        className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-200 z-50 ${className ?? ''}`}
      >
        <div className="flex justify-around items-center h-16 px-2 pb-[env(safe-area-inset-bottom)]">
          {items.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-0.5 min-w-[48px] py-1 rounded-lg transition-colors ${
                  active ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <item.icon size={22} weight={active ? 'fill' : 'duotone'} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    );
  }

  return (
    <nav className={`bg-white border-b border-gray-100 px-4 ${className ?? ''}`}>
      <div className="flex gap-1">
        {items.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-1.5 px-4 py-3 -mb-px text-sm font-medium border-b-2 transition-colors ${
                active
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              <item.icon size={18} weight={active ? 'fill' : 'duotone'} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
