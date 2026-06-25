'use client';
import { useState, useEffect } from 'react';
import { isLoggedIn, clearTokens, setTokens } from '@/shared/lib/auth-token';

interface User {
  id: string;
  name: string;
  email?: string;
}

// Mock: 항상 로그인 상태로 처리 (개발 편의)
// TODO: 실제 구현 시 토큰 검증 + 사용자 정보 fetch
const MOCK_USER: User = { id: 'mock-user-001', name: '홍길동' };

export function useAuth() {
  const [user, setUser] = useState<User | null>(MOCK_USER);
  const [isLoading] = useState(false);

  useEffect(() => {
    // 개발 중 토큰이 없으면 자동으로 mock 토큰 발급
    if (!isLoggedIn()) {
      setTokens('mock-access-token', 'mock-refresh-token');
    }
  }, []);

  const login = () => {
    // TODO: 카카오 OAuth 리다이렉트
    setTokens('mock-access-token', 'mock-refresh-token');
    setUser(MOCK_USER);
  };

  const logout = () => {
    clearTokens();
    setUser(null);
  };

  return { user, isLoading, login, logout };
}
