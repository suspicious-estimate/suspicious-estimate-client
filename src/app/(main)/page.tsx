import { redirect } from 'next/navigation';

export default function RootPage() {
  // TODO: 로그인 여부 확인 (isLoggedIn()) → 미로그인 시 /login, 로그인 시 /projects
  redirect('/projects');
}
