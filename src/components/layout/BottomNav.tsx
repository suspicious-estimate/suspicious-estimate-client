'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  label: string
  icon: string
  href: (projectId?: string) => string
}

const NAV_ITEMS: NavItem[] = [
  {
    label: '홈',
    icon: '🏠',
    href: (pid) => pid ? `/projects/${pid}` : '/projects',
  },
  {
    label: '업로드',
    icon: '📤',
    href: (pid) => pid ? `/projects/${pid}/upload` : '/projects',
  },
  {
    label: '타임라인',
    icon: '📋',
    href: (pid) => pid ? `/projects/${pid}/timeline` : '/projects',
  },
  {
    label: 'AI상담',
    icon: '💬',
    href: (pid) => pid ? `/projects/${pid}/assistant` : '/projects',
  },
  {
    label: '견적',
    icon: '📊',
    href: (pid) => pid ? `/projects/${pid}/estimate` : '/projects',
  },
  {
    label: '더보기',
    icon: '⚙️',
    href: () => '/settings',
  },
]

interface BottomNavProps {
  projectId?: string
}

export function BottomNav({ projectId }: BottomNavProps) {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16 px-2 pb-[env(safe-area-inset-bottom)]">
        {NAV_ITEMS.map((item) => {
          const href = item.href(projectId)
          const isActive = pathname === href || pathname.startsWith(href + '/')

          return (
            <Link
              key={item.label}
              href={href}
              className={`flex flex-col items-center justify-center gap-0.5 min-w-[48px] py-1 rounded-lg transition-colors ${
                isActive
                  ? 'text-blue-600'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <span className="text-xl leading-none">{item.icon}</span>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
