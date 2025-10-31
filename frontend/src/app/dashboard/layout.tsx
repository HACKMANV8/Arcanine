'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar, MobileNav } from '@/components/layout/Navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('plantcare_authenticated');
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-neutral-light">
      <Sidebar />
      <div className="md:pl-64 pb-20 md:pb-0">
        <main className="min-h-screen">
          {children}
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
