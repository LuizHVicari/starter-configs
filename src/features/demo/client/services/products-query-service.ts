'use client';

import { apiClient } from '@/features/common/shared/lib/api-client';
import { PaginatedResponse } from '@/features/common/shared/types/paginated-response';

import { Product } from '../../shared/types/product-types';

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ListProperties {
  page?: number;
  pageSize?: number;
  query?: string;
}

export const listProducts = async ({
  page = 1,
  pageSize = 10,
  query = '',
}: ListProperties): Promise<PaginatedResponse<Product>> => {
  const limit = pageSize;
  const skip = (page - 1) * pageSize;

  const searchUrl = `${query ? '/search?q=' + query + '&' : '?'}limit=${limit}&skip=${skip}`;

  const { data } = await apiClient.get<ProductsResponse>('/products' + searchUrl);

  return { count: data.total, items: data.products };
};

export const findProduct = async (id: number): Promise<Product> => {
  const { data } = await apiClient.get<Product>('/products/' + id);
  return data;
};
