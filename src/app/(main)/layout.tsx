import { Sidebar } from '@/widgets/sidebar/ui/sidebar';
import { SidebarProvider } from '@/widgets/sidebar/model/sidebar-context';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="md:flex md:min-h-screen">
        <Sidebar />
        <div className="mx-auto w-full max-w-[430px] min-h-screen bg-surface relative md:mx-0 md:max-w-none md:flex-1">
          <div className="md:mx-auto md:max-w-[720px]">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
}
