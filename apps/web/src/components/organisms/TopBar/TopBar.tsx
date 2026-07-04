import { Link, useNavigate } from 'react-router-dom';
import { Bell, ChevronDown, LogOut, Menu, PanelLeft, Settings, User } from 'lucide-react';
import { Combobox } from '@/components/molecules/Combobox';
import { GlobalSearch } from '@/components/organisms/GlobalSearch/GlobalSearch';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getContextLabel } from '@/lib/navigation';
import { useAuthStore } from '@/stores/authStore';
import { useLayoutStore } from '@/stores/layoutStore';
import { logoutRequest } from '@/features/auth/api';

interface TopBarProps {
  alertCount?: number;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function TopBar({ alertCount = 0 }: TopBarProps) {
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const toggleSidebar = useLayoutStore((state) => state.toggleSidebar);
  const toggleSidebarCollapsed = useLayoutStore((state) => state.toggleSidebarCollapsed);
  const navigate = useNavigate();

  if (!user) return null;

  const contextLabel = getContextLabel(user);

  const handleLogout = async () => {
    try {
      await logoutRequest();
    } finally {
      clearAuth();
      navigate('/auth/login', { replace: true });
    }
  };

  return (
    <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex h-topbar items-center gap-3 px-4 sm:gap-4 sm:px-6">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={toggleSidebar}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="hidden shrink-0 lg:inline-flex"
          onClick={toggleSidebarCollapsed}
          aria-label="Toggle sidebar"
        >
          <PanelLeft className="h-5 w-5" />
        </Button>

        <div className="hidden min-w-0 sm:block max-w-[240px] w-full">
          <Combobox
            options={[{ value: user.facilityId ?? '', label: contextLabel }]}
            value={user.facilityId ?? ''}
            onChange={() => {}}
            className="h-9"
          />
        </div>

        <div className="hidden min-w-0 flex-1 md:block max-w-md ml-4">
          <GlobalSearch />
        </div>

        <div className="ml-auto flex items-center gap-1">
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link
              to="/alerts"
              aria-label={alertCount > 0 ? `${alertCount} unread alerts` : 'Alerts'}
            >
              <Bell className="h-[18px] w-[18px]" />
              {alertCount > 0 && (
                <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-medium text-destructive-foreground">
                  {alertCount > 9 ? '9+' : alertCount}
                </span>
              )}
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 px-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">{getInitials(user.fullName)}</AvatarFallback>
                </Avatar>
                <ChevronDown className="hidden h-4 w-4 opacity-50 md:block" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.fullName}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/settings">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-destructive focus:text-destructive"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
