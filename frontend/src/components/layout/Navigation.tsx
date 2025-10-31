'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Camera, Calendar, MessageCircle, MapPin, Leaf, Settings } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'My Plants', href: '/dashboard/plants', icon: Leaf },
  { name: 'Care Plans', href: '/dashboard/plans', icon: Calendar },
  { name: 'Chat', href: '/dashboard/chat', icon: MessageCircle },
  { name: 'Nurseries', href: '/dashboard/nurseries', icon: MapPin },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:w-64 bg-white border-r border-neutral">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-neutral">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
          <Leaf className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-neutral-darker">PlantCare AI</h1>
          <p className="text-xs text-neutral-muted">Care for your plants</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-primary text-white shadow-soft'
                  : 'text-neutral-dark hover:bg-neutral-light'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-neutral">
        <div className="bg-primary-50 rounded-xl p-4">
          <Camera className="w-8 h-8 text-primary mb-2" />
          <h3 className="font-semibold text-neutral-darker mb-1">Quick Scan</h3>
          <p className="text-sm text-neutral-muted mb-3">Detect plant diseases instantly</p>
          <Link
            href="/dashboard?upload=true"
            className="block text-center bg-primary text-white py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-all duration-200"
          >
            Upload Photo
          </Link>
        </div>
      </div>
    </div>
  );
}

export function MobileNav() {
  const pathname = usePathname();

  const mobileNav = [
    { name: 'Home', href: '/dashboard', icon: Home },
    { name: 'Plants', href: '/dashboard/plants', icon: Leaf },
    { name: 'Scan', href: '/dashboard?upload=true', icon: Camera },
    { name: 'Chat', href: '/dashboard/chat', icon: MessageCircle },
    { name: 'More', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral z-50">
      <div className="flex justify-around items-center py-2 px-2">
        {mobileNav.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center min-h-12 px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive ? 'text-primary' : 'text-neutral-muted'
              }`}
            >
              <Icon className={`w-6 h-6 mb-1 ${isActive ? 'scale-110' : ''}`} />
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
