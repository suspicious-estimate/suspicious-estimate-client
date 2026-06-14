'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Icon } from '@phosphor-icons/react/lib';
import {
  HouseIcon,
  UploadSimpleIcon,
  ListChecksIcon,
  ChatCircleIcon,
  ChartBarIcon,
  PlusIcon,
  GearSixIcon,
} from '@phosphor-icons/react/ssr';

interface NavItem {
  label: string;
  icon: Icon;
  href: string;
}

// 프로젝트 밖(목록·설정 등)에서 보이는 전역 탭
const GLOBAL_NAV_ITEMS: NavItem[] = [
  { label: '홈', icon: HouseIcon, href: '/projects' },
  { label: '새 프로젝트', icon: PlusIcon, href: '/projects/new' },
  { label: '더보기', icon: GearSixIcon, href: '/settings' },
];

// 특정 프로젝트에 진입했을 때 보이는 프로젝트 탭
function getProjectNavItems(projectId: string): NavItem[] {
  return [
    { label: '홈', icon: HouseIcon, href: `/projects/${projectId}` },
    { label: '업로드', icon: UploadSimpleIcon, href: `/projects/${projectId}/upload` },
    { label: '타임라인', icon: ListChecksIcon, href: `/projects/${projectId}/timeline` },
    { label: 'AI상담', icon: ChatCircleIcon, href: `/projects/${projectId}/assistant` },
    { label: '견적', icon: ChartBarIcon, href: `/projects/${projectId}/estimate` },
    { label: '더보기', icon: GearSixIcon, href: '/settings' },
  ];
}

interface BottomNavProps {
  /** 전달되면 프로젝트 탭, 없으면 전역 탭을 표시한다. */
  projectId?: string;
}

export function BottomNav({ projectId }: BottomNavProps) {
  const pathname = usePathname();
  const items = projectId ? getProjectNavItems(projectId) : GLOBAL_NAV_ITEMS;

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16 px-2 pb-[env(safe-area-inset-bottom)]">
        {items.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 min-w-[48px] py-1 rounded-lg transition-colors ${
                isActive ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <item.icon size={22} weight={isActive ? 'fill' : 'duotone'} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
