'use client';

import { type OnChangeFn, type PaginationState } from '@tanstack/react-table';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Show, VStack } from '@/components/atoms';
import { LimitedPage } from '@/components/atoms/layout/limited-page';
import { DebouncedInput } from '@/components/molecules';
import { LoadingCard } from '@/components/organisms/data/loading-card';

import { useDemoScreenViewModel } from '../../view-models';
import { ProductCard, ProductsTable } from '../organisms';

export function DemoScreen(): React.JSX.Element {
  const viewModel = useDemoScreenViewModel();
  const t = useTranslations();

  const pagination: PaginationState = {
    pageIndex: viewModel.productsPage - 1,
    pageSize: viewModel.productsPageSize,
  };

  const handlePaginationChange: OnChangeFn<PaginationState> = (updaterOrValue) => {
    const newPagination =
      typeof updaterOrValue === 'function' ? updaterOrValue(pagination) : updaterOrValue;

    viewModel.setProductsPage(newPagination.pageIndex + 1);
    viewModel.setProductsPageSize(newPagination.pageSize);
  };

  return (
    <LimitedPage>
      <VStack className="gap-8 pt-8">
        <Show when={viewModel.products.length > 0 && !viewModel.isLoading}>
          <ProductCard product={viewModel.products[0]} />
        </Show>
        <Show when={viewModel.isLoading}>
          <LoadingCard />
        </Show>
        <DebouncedInput
          placeholder={t('demo.search')}
          startIcon={<Search size={14} />}
          onChange={viewModel.setProductsQuery}
        />
        <ProductsTable
          isError={viewModel.isError}
          isLoading={viewModel.isLoading}
          pagination={pagination}
          products={viewModel.products}
          refetch={viewModel.refetch}
          totalItems={viewModel.totalItems}
          onPaginationChange={handlePaginationChange}
        />
      </VStack>
    </LimitedPage>
  );
}
