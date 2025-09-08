import { QueryKey } from '@tanstack/react-query';

export const demoQueryKeyPrefix = 'demo';

export const productsQueryPrefix = 'products';
export const activitiesQueryPrefix = 'activities';

interface ListProductsProperties {
  page?: number;
  pageSize?: number;
  query?: string;
}

export const listProductsQueryKey = ({ page, pageSize, query }: ListProductsProperties): string[] =>
  [demoQueryKeyPrefix, productsQueryPrefix, 'list', page, pageSize, query]
    .filter((key) => !!key)
    .map((key) => `${key}`);

export const invalidateAllDemoQueries = (key: QueryKey): boolean =>
  key.includes(demoQueryKeyPrefix);

export const activitiesQueryKey = (): string[] => [demoQueryKeyPrefix, activitiesQueryPrefix];

export const invalidateAllProductsQueries = (key: QueryKey): boolean =>
  key.includes(productsQueryPrefix);

export const invalidateAllActivitiesQueries = (key: QueryKey): boolean =>
  key.includes(activitiesQueryPrefix);
