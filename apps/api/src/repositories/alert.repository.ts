import type { AlertStatus, Severity } from '@prisma/client';
import { prisma } from '../lib/prisma';

export const alertRepository = {
  findMany(
    scope: { facilityId?: string; districtId?: string },
    options: {
      status?: AlertStatus;
      severity?: Severity;
      skip: number;
      take: number;
    },
  ) {
    return prisma.alert.findMany({
      where: {
        ...(options.status ? { status: options.status } : {}),
        ...(options.severity ? { severity: options.severity } : {}),
        facility: {
          isActive: true,
          ...(scope.facilityId ? { id: scope.facilityId } : {}),
          ...(scope.districtId ? { districtId: scope.districtId } : {}),
        },
      },
      orderBy: { createdAt: 'desc' },
      skip: options.skip,
      take: options.take,
      include: { facility: { select: { name: true, code: true } } },
    });
  },

  count(
    scope: { facilityId?: string; districtId?: string },
    filters: { status?: AlertStatus; severity?: Severity } = {},
  ) {
    return prisma.alert.count({
      where: {
        ...(filters.status ? { status: filters.status } : {}),
        ...(filters.severity ? { severity: filters.severity } : {}),
        facility: {
          isActive: true,
          ...(scope.facilityId ? { id: scope.facilityId } : {}),
          ...(scope.districtId ? { districtId: scope.districtId } : {}),
        },
      },
    });
  },

  findById(id: string) {
    return prisma.alert.findUnique({
      where: { id },
      include: {
        facility: { select: { id: true, name: true, code: true, districtId: true } },
      },
    });
  },

  updateStatus(id: string, status: AlertStatus, resolvedById?: string) {
    return prisma.alert.update({
      where: { id },
      data: {
        status,
        ...(status === 'RESOLVED' || status === 'DISMISSED'
          ? { resolvedAt: new Date(), resolvedById }
          : {}),
      },
      include: { facility: { select: { name: true, code: true } } },
    });
  },

  markSmsDelivered(id: string) {
    return prisma.alert.update({
      where: { id },
      data: { smsDelivered: true },
    });
  },

  countBySeverity(scope: { facilityId?: string; districtId?: string }) {
    return prisma.alert.groupBy({
      by: ['severity'],
      where: {
        status: { in: ['ACTIVE', 'ACKNOWLEDGED'] },
        facility: {
          isActive: true,
          ...(scope.facilityId ? { id: scope.facilityId } : {}),
          ...(scope.districtId ? { districtId: scope.districtId } : {}),
        },
      },
      _count: true,
    });
  },

  countResolved(scope: { facilityId?: string; districtId?: string }) {
    return prisma.alert.count({
      where: {
        status: { in: ['RESOLVED', 'DISMISSED'] },
        facility: {
          isActive: true,
          ...(scope.facilityId ? { id: scope.facilityId } : {}),
          ...(scope.districtId ? { districtId: scope.districtId } : {}),
        },
      },
    });
  },
};
