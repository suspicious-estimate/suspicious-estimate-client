import { QueryClient } from '@tanstack/react-query';

/**
 * 앱 전역에서 공유하는 QueryClient 를 생성한다.
 * 서버 컴포넌트에서 매 요청마다 새 인스턴스를 만들고,
 * 클라이언트에서는 싱글턴으로 재사용하기 위해 팩토리로 분리한다.
 */
export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // 데이터를 1분간 fresh 로 간주해 불필요한 재요청을 막는다.
        staleTime: 60 * 1000,
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });
}
