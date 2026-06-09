import type { DrugListQuery } from '@meditrack/shared';
import { AppError } from '../utils/AppError';
import { drugRepository } from '../repositories/drug.repository';

export const drugService = {
  async list(query: DrugListQuery) {
    const skip = (query.page - 1) * query.pageSize;
    const [items, total] = await Promise.all([
      drugRepository.findMany({
        category: query.category,
        search: query.search,
        skip,
        take: query.pageSize,
      }),
      drugRepository.count({ category: query.category, search: query.search }),
    ]);

    return {
      items,
      meta: {
        page: query.page,
        pageSize: query.pageSize,
        total,
        totalPages: Math.ceil(total / query.pageSize),
      },
    };
  },

  async getById(id: string) {
    const drug = await drugRepository.findById(id);

    if (!drug) {
      throw new AppError('Drug not found', 404, 'NOT_FOUND');
    }

    return drug;
  },
};
