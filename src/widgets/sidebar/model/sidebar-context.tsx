'use client';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

// 사이드바 아코디언 펼침 상태를 Context로 전역 공유한다.
// Provider를 root layout(영구 레이아웃) 안에 두므로 라우트 이동/리마운트와
// 무관하게 상태가 유지되며, 한 항목을 열어도 다른 항목은 닫히지 않는다(독립 토글).
interface SidebarContextValue {
  projectsOpen: boolean;
  toggleProjectsOpen: () => void;
  expandedProjects: Record<string, boolean>;
  toggleProjectExpanded: (id: string) => void;
  setProjectExpanded: (id: string, open: boolean) => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [projectsOpen, setProjectsOpen] = useState(true);
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({});

  const toggleProjectsOpen = useCallback(() => setProjectsOpen((o) => !o), []);

  const setProjectExpanded = useCallback((id: string, open: boolean) => {
    // 이미 같은 값이면 새 객체를 만들지 않아 자동 펼침 effect의 불필요한 갱신/루프를 막는다.
    setExpandedProjects((prev) => (!!prev[id] === open ? prev : { ...prev, [id]: open }));
  }, []);

  const toggleProjectExpanded = useCallback((id: string) => {
    setExpandedProjects((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const value = useMemo<SidebarContextValue>(
    () => ({
      projectsOpen,
      toggleProjectsOpen,
      expandedProjects,
      toggleProjectExpanded,
      setProjectExpanded,
    }),
    [projectsOpen, toggleProjectsOpen, expandedProjects, toggleProjectExpanded, setProjectExpanded],
  );

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

export function useSidebarNav(): SidebarContextValue {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    throw new Error('useSidebarNav must be used within <SidebarProvider>');
  }
  return ctx;
}
