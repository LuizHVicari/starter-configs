'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { PaginatedResponse } from '@/features/common/shared/types/paginated-response';

import { Product } from '../../shared/types/product-types';
import { listProducts } from '../services';
import { listProductsQueryKey } from './demo-query-keys';

type UseListProducts = UseQueryResult<PaginatedResponse<Product>>;

interface Properties {
  page?: number;
  pageSize?: number;
  query?: string;
}
export function useListProducts({
  page = 1,
  pageSize = 10,
  query = '',
}: Properties): UseListProducts {
  const queryFunction = (): Promise<PaginatedResponse<Product>> =>
    listProducts({ page, pageSize, query });

  return useQuery({
    queryFn: queryFunction,
    queryKey: listProductsQueryKey({ page, pageSize, query }),
  });
}
