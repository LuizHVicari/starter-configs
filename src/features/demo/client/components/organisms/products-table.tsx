'use client';

import { ColumnDef } from '@tanstack/react-table';

import { DataTable } from '@/components/organisms';
import { Product } from '@/features/demo/shared/types/product-types';

interface Properties
  extends Omit<
    React.ComponentProps<typeof DataTable>,
    'columns' | 'data' | 'loading' | 'error' | 'onRefetch'
  > {
  products: Product[];
  isLoading?: boolean;
  isError?: boolean;
  refetch?: () => void;
}

export function ProductsTable({
  products,
  isError,
  isLoading,
  refetch,
  ...properties
}: Properties): React.JSX.Element {
  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: 'id',
      header: 'Id',
      cell: ({ row }) => <span>{row.getValue('id')}</span>,
    },
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }) => <span>{row.getValue('title')}</span>,
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => <span>{row.getValue('description')}</span>,
    },
  ];

  return (
    <DataTable
      {...properties}
      columns={columns}
      data={products}
      error={isError ? 'Failed to load data. Please try again.' : null}
      loading={isLoading}
      totalItems={properties.totalItems || products.length}
      onRefetch={refetch}
    />
  );
}
