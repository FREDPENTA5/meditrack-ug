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
    <div className="flex h-full flex-col bg-primary-950 text-primary-50">
      <div
        className={cn(
          'flex h-topbar shrink-0 items-center px-3',
          collapsed ? 'justify-center' : 'justify-between gap-2',
        )}
      >
        <div className={cn('flex items-center gap-2.5', collapsed && 'justify-center')}>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <BrandIcon className="h-4 w-4" aria-hidden="true" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{BRAND.name}</p>
              <p className="truncate text-[10px] uppercase tracking-wider text-primary-300/80">
                Uganda
              </p>
            </div>
          )}
        </div>
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-100 hover:bg-primary-900 hover:text-primary-50 lg:hidden"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      <Separator className="bg-primary-900" />

      <nav className="flex-1 space-y-1 overflow-y-auto p-2" aria-label="Main navigation">
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
                  'relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary-900 text-primary-50'
                    : 'text-primary-200 hover:bg-primary-900/60 hover:text-primary-50',
                  collapsed && 'justify-center px-2',
                )
              }
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              {!collapsed && (
                <>
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1.5 text-[10px] font-medium text-destructive-foreground">
                      {item.badge > 9 ? '9+' : item.badge}
                    </span>
                  )}
                </>
              )}
              {collapsed && item.badge !== undefined && item.badge > 0 && (
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive" />
              )}
            </NavLink>
          );
        })}
      </nav>

      <Separator className="bg-primary-900" />

      <div className={cn('p-2', collapsed && 'flex justify-center')}>
        <div className={cn('flex items-center gap-2.5 rounded-md p-2', collapsed && 'p-1.5')}>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary-800 text-xs text-primary-50">
              {getInitials(user.fullName)}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{user.fullName}</p>
              <p className="truncate text-xs text-primary-300">{formatRole(user.role)}</p>
            </div>
          )}
        </div>
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
