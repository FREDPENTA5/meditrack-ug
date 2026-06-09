import type { LucideIcon } from 'lucide-react';
import {
  Activity,
  AlertTriangle,
  Building2,
  ClipboardList,
  LayoutDashboard,
  Settings,
  Users,
  FileBarChart,
} from 'lucide-react';
import type { AuthUser, Role } from '@meditrack/shared';

export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
  roles: Role[];
  badge?: number;
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
    roles: ['FACILITY_WORKER', 'DISTRICT_OFFICER', 'NMS_ADMIN', 'SUPER_ADMIN'],
  },
  {
    label: 'Facilities',
    path: '/facilities',
    icon: Building2,
    roles: ['DISTRICT_OFFICER', 'NMS_ADMIN', 'SUPER_ADMIN'],
  },
  {
    label: 'Stock Entry',
    path: '/stock-entry',
    icon: ClipboardList,
    roles: ['FACILITY_WORKER'],
  },
  {
    label: 'Alerts',
    path: '/alerts',
    icon: AlertTriangle,
    roles: ['FACILITY_WORKER', 'DISTRICT_OFFICER', 'NMS_ADMIN', 'SUPER_ADMIN'],
  },
  {
    label: 'Reports',
    path: '/reports',
    icon: FileBarChart,
    roles: ['DISTRICT_OFFICER', 'NMS_ADMIN', 'SUPER_ADMIN'],
  },
  {
    label: 'Users',
    path: '/users',
    icon: Users,
    roles: ['NMS_ADMIN', 'SUPER_ADMIN'],
  },
  {
    label: 'Settings',
    path: '/settings',
    icon: Settings,
    roles: ['FACILITY_WORKER', 'DISTRICT_OFFICER', 'NMS_ADMIN', 'SUPER_ADMIN'],
  },
];

export function getNavItemsForRole(role: Role): NavItem[] {
  return NAV_ITEMS.filter((item) => item.roles.includes(role));
}

export function formatRole(role: Role): string {
  return role
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function getContextLabel(user: AuthUser): string {
  if (user.role === 'FACILITY_WORKER') {
    return 'Gayaza Hospital';
  }
  if (user.role === 'DISTRICT_OFFICER') {
    return 'Wakiso District';
  }
  return 'National Overview';
}

export const BRAND = {
  name: 'MediTrack UG',
  icon: Activity,
};
