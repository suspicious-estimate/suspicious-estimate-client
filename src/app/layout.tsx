import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Geist } from 'next/font/google';
import { cn } from '@/shared/lib/cn';
import { Sidebar } from '@/widgets/sidebar/ui/sidebar';
import { SidebarProvider } from '@/widgets/sidebar/model/sidebar-context';
import { QueryProvider } from '@/shared/api/query-provider';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: '수상한견적서',
  description: '인테리어 공사의 모든 과정을 안전하게 기록하고 관리하세요',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#7d5cbd',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={cn('h-full antialiased', 'font-sans', geist.variable)}>
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-full bg-background">
        <QueryProvider>
          <SidebarProvider>
            <div className="md:flex md:min-h-screen">
              <Sidebar />
              <div className="mx-auto w-full max-w-[430px] min-h-screen bg-surface relative md:mx-0 md:max-w-none md:flex-1">
                <div className="md:mx-auto md:max-w-[720px]">{children}</div>
              </div>
            </div>
          </SidebarProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
