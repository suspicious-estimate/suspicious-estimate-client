'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Icon } from '@phosphor-icons/react/lib';
import { HouseIcon, PlusIcon, GearSixIcon } from '@phosphor-icons/react/ssr';

interface NavItem {
  label: string;
  icon: Icon;
  href: string;
}

// 모바일 전용 전역 하단 네비게이션(프로젝트 '밖'에서만 사용).
// 프로젝트 '안'에서는 셸 layout이 ProjectTabs를 렌더한다. 데스크톱은 Sidebar가 대체한다.
const GLOBAL_NAV_ITEMS: NavItem[] = [
  { label: '홈', icon: HouseIcon, href: '/projects' },
  { label: '새 프로젝트', icon: PlusIcon, href: '/projects/new' },
  { label: '더보기', icon: GearSixIcon, href: '/settings' },
];

function isActive(pathname: string, href: string): boolean {
  if (href === '/projects') {
    return pathname === '/projects';
  }
  return pathname === href || pathname.startsWith(href + '/');
}

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16 px-2 pb-[env(safe-area-inset-bottom)]">
        {GLOBAL_NAV_ITEMS.map((item) => {
          const active = isActive(pathname, item.href);

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
