'use client';

interface MobileLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function MobileLayout({ children, className }: MobileLayoutProps) {
  return (
    <div className={`mx-auto max-w-[430px] min-h-screen bg-white relative ${className || ''}`}>
      {children}
    </div>
  );
}
