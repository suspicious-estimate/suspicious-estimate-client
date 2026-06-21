'use client';
import { useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { makeQueryClient } from './query-client';

/**
 * 클라이언트 트리에 QueryClient 를 주입하는 프로바이더.
 * useState 초기화로 리렌더 시에도 동일 인스턴스를 유지한다.
 */
export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(makeQueryClient);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
