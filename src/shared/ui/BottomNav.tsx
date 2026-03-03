'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FolderKanban, Map, MessageSquare, Settings } from 'lucide-react';
import { clsx } from 'clsx';

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/projects', icon: FolderKanban, label: 'Projekty' },
    { href: '/work', icon: Map, label: 'Práce' },
    { href: '/chat', icon: MessageSquare, label: 'Chat' },
    { href: '/settings', icon: Settings, label: 'Nastavení' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 pb-safe pt-2 px-4 z-50">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={clsx(
                "flex flex-col items-center justify-center w-16 h-12 gap-1 transition-colors",
                isActive ? "text-black" : "text-gray-400 hover:text-gray-600"
              )}
            >
              <Icon className={clsx("w-6 h-6", isActive && "fill-black/10")} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
