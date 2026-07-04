import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/cn';
import { BRAND, formatRole, getNavItemsForRole } from '@/lib/navigation';
import { useAuthStore } from '@/stores/authStore';
import { useLayoutStore } from '@/stores/layoutStore';

interface SidebarProps {
  alertCount?: number;
  variant?: 'desktop' | 'mobile';
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function SidebarNav({
  collapsed,
  alertCount,
  onNavigate,
  onClose,
}: {
  collapsed: boolean;
  alertCount: number;
  onNavigate?: () => void;
  onClose?: () => void;
}) {
  const user = useAuthStore((state) => state.user);
  if (!user) return null;

  const navItems = getNavItemsForRole(user.role).map((item) =>
    item.path === '/alerts' && alertCount > 0 ? { ...item, badge: alertCount } : item,
  );

  const BrandIcon = BRAND.icon;

  return (
    <div className="flex h-full flex-col bg-white text-neutral-900 border-r border-neutral-100">
      <div
        className={cn(
          'flex h-topbar shrink-0 items-center px-4',
          collapsed ? 'justify-center' : 'justify-between gap-2',
        )}
      >
        <div className={cn('flex items-center gap-3', collapsed && 'justify-center')}>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-primary-700 text-white shadow-sm">
            <BrandIcon className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-[15px] font-heading font-bold text-neutral-900">
                {BRAND.name}
              </p>
              <p className="truncate text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
                Uganda
              </p>
            </div>
          )}
        </div>
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            className="text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 lg:hidden"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      <div className="px-4 py-2">
        <Separator className="bg-neutral-100" />
      </div>

      <nav className="flex-1 space-y-1.5 overflow-y-auto px-3" aria-label="Main navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onNavigate}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) =>
                cn(
                  'relative flex items-center gap-3 rounded-[12px] px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-primary-50 text-primary-700 font-semibold'
                    : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900',
                  collapsed && 'justify-center px-2',
                )
              }
            >
              <Icon className={cn('h-5 w-5 shrink-0', collapsed && 'h-6 w-6')} />
              {!collapsed && (
                <>
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-danger-500 px-1.5 text-[10px] font-bold text-white shadow-sm">
                      {item.badge > 9 ? '9+' : item.badge}
                    </span>
                  )}
                </>
              )}
              {collapsed && item.badge !== undefined && item.badge > 0 && (
                <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-danger-500 shadow-sm border-2 border-white" />
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="px-4 py-2">
        <Separator className="bg-neutral-100" />
      </div>

      <div className={cn('p-3', collapsed && 'flex justify-center')}>
        <NavLink
          to="/settings"
          className={cn(
            'flex items-center gap-3 rounded-[12px] p-2 transition-all hover:bg-neutral-100',
            collapsed && 'p-1.5',
          )}
        >
          <Avatar className="h-9 w-9 shadow-sm border border-neutral-100">
            <AvatarFallback className="bg-neutral-100 text-xs font-semibold text-neutral-600">
              {getInitials(user.fullName)}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-bold text-neutral-900">{user.fullName}</p>
              <p className="truncate text-[11px] font-medium text-neutral-500">
                {formatRole(user.role)}
              </p>
            </div>
          )}
        </NavLink>
      </div>
    </div>
  );
}

export function Sidebar({ alertCount = 0, variant = 'desktop' }: SidebarProps) {
  const { sidebarOpen, sidebarCollapsed, setSidebarOpen } = useLayoutStore();

  if (variant === 'mobile') {
    return (
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close navigation"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
              className="fixed inset-y-0 left-0 z-50 w-sidebar shadow-xl lg:hidden"
            >
              <SidebarNav
                collapsed={false}
                alertCount={alertCount}
                onNavigate={() => setSidebarOpen(false)}
                onClose={() => setSidebarOpen(false)}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    );
  }

  return (
    <aside
      className={cn(
        'sticky top-0 hidden h-screen shrink-0 flex-col border-r transition-[width] duration-200 ease-out lg:flex',
        sidebarCollapsed ? 'w-sidebar-collapsed' : 'w-sidebar',
      )}
    >
      <SidebarNav collapsed={sidebarCollapsed} alertCount={alertCount} />
    </aside>
  );
}
