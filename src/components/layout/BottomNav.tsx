'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  icon: string;
  href: string;
}

// 프로젝트 밖(목록·설정 등)에서 보이는 전역 탭
const GLOBAL_NAV_ITEMS: NavItem[] = [
  { label: '홈', icon: '🏠', href: '/projects' },
  { label: '새 프로젝트', icon: '➕', href: '/projects/new' },
  { label: '더보기', icon: '⚙️', href: '/settings' },
];

// 특정 프로젝트에 진입했을 때 보이는 프로젝트 탭
function getProjectNavItems(projectId: string): NavItem[] {
  return [
    { label: '홈', icon: '🏠', href: `/projects/${projectId}` },
    { label: '업로드', icon: '📤', href: `/projects/${projectId}/upload` },
    { label: '타임라인', icon: '📋', href: `/projects/${projectId}/timeline` },
    { label: 'AI상담', icon: '💬', href: `/projects/${projectId}/assistant` },
    { label: '견적', icon: '📊', href: `/projects/${projectId}/estimate` },
    { label: '더보기', icon: '⚙️', href: '/settings' },
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
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] border-t border-border bg-background z-50">
      <div className="flex justify-around items-center h-16 px-2 pb-[env(safe-area-inset-bottom)]">
        {items.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={href}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 min-w-[48px] px-2 py-1 rounded-xl transition-colors',
                isActive
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted',
              )}
            >
              <span className="text-xl leading-none">{item.icon}</span>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
