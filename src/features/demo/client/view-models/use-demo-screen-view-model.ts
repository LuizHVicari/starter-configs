'use client';

import { useState } from 'react';

import { Product } from '../../shared/types/product-types';
import { useListProducts } from '../data-hooks';

interface UseDemoScreenViewModel {
  productsPage: number;
  setProductsPage: (page: number) => void;
  productsPageSize: number;
  setProductsPageSize: (pageSize: number) => void;
  productsQuery: string;
  setProductsQuery: (query: string) => void;
  products: Product[];
  totalItems: number;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

export function useDemoScreenViewModel(): UseDemoScreenViewModel {
  const [productsPage, setProductsPage] = useState(1);
  const [productsPageSize, setProductsPageSize] = useState(10);
  const [productsQuery, setProductsQuery] = useState('');

  const { data, isLoading, isError, refetch } = useListProducts({
    page: productsPage,
    pageSize: productsPageSize,
    query: productsQuery,
  });

  const products: Product[] = data ? data.items : [];
  const totalItems: number = data ? data.count : 0;

  return {
    productsPage,
    setProductsPage,
    productsPageSize,
    setProductsPageSize,
    productsQuery,
    setProductsQuery,
    products,
    totalItems,
    isLoading,
    isError,
    refetch,
  };
}
