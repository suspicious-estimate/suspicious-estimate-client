'use client'
import { useState, useEffect } from 'react'
import { isLoggedIn, clearTokens, setTokens } from '@/lib/auth'

interface User {
  id: string
  name: string
  email?: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Mock: 항상 로그인 상태로 처리 (개발 편의)
    // TODO: 실제 구현 시 토큰 검증 + 사용자 정보 fetch
    if (isLoggedIn()) {
      setUser({ id: 'mock-user-001', name: '홍길동' })
    } else {
      // 개발 중에는 자동 로그인 처리
      setTokens('mock-access-token', 'mock-refresh-token')
      setUser({ id: 'mock-user-001', name: '홍길동' })
    }
    setIsLoading(false)
  }, [])

  const login = () => {
    // TODO: 카카오 OAuth 리다이렉트
    setTokens('mock-access-token', 'mock-refresh-token')
    setUser({ id: 'mock-user-001', name: '홍길동' })
  }

  const logout = () => {
    clearTokens()
    setUser(null)
  }

  return { user, isLoading, login, logout }
}
