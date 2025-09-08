'use client';

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type OnChangeFn,
  type PaginationState,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ChevronUpIcon,
  Loader2Icon,
} from 'lucide-react';
import * as React from 'react';

import { For } from '@/components/atoms/layout/for';
import { Show } from '@/components/atoms/layout/show';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/features/common/shared/lib/utilities';

interface DataTableProperties<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  totalItems: number;
  pagination: PaginationState;
  sorting?: SortingState;
  loading?: boolean;
  error?: string | null;
  pageSizeOptions?: number[];
  onPaginationChange: OnChangeFn<PaginationState>;
  onSortingChange?: OnChangeFn<SortingState>;
  onRefetch?: () => void;
  className?: string;
}

function createPaginationRange(currentPage: number, totalPages: number): (number | '...')[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, '...', totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
}

function DataTablePagination({
  pagination,
  totalItems,
  pageSizeOptions = [10, 20, 50, 100],
  onPaginationChange,
}: {
  pagination: PaginationState;
  totalItems: number;
  pageSizeOptions: number[];
  onPaginationChange: (pagination: PaginationState) => void;
}): React.JSX.Element {
  const totalPages = Math.ceil(totalItems / pagination.pageSize);
  const currentPage = pagination.pageIndex + 1;
  const startItem = pagination.pageIndex * pagination.pageSize + 1;
  const endItem = Math.min((pagination.pageIndex + 1) * pagination.pageSize, totalItems);

  const paginationRange = createPaginationRange(currentPage, totalPages);

  const handlePageChange = (pageIndex: number): void => {
    onPaginationChange({ ...pagination, pageIndex });
  };

  const handlePageSizeChange = (pageSize: string): void => {
    onPaginationChange({ pageIndex: 0, pageSize: Number(pageSize) });
  };

  return (
    <div className="flex items-center justify-between px-2">
      <div className="text-sm text-muted-foreground">
        {startItem} - {endItem} of {totalItems} items
      </div>

      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select value={pagination.pageSize.toString()} onValueChange={handlePageSizeChange}>
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pagination.pageSize.toString()} />
            </SelectTrigger>
            <SelectContent side="top">
              <For each={pageSizeOptions}>
                {(pageSize) => (
                  <SelectItem key={pageSize} value={pageSize.toString()}>
                    {pageSize}
                  </SelectItem>
                )}
              </For>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            className="h-8 w-8 p-0"
            disabled={currentPage === 1}
            variant="outline"
            onClick={() => handlePageChange(0)}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            className="h-8 w-8 p-0"
            disabled={currentPage === 1}
            variant="outline"
            onClick={() => handlePageChange(pagination.pageIndex - 1)}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>

          <div className="flex items-center space-x-1">
            <For each={paginationRange}>
              {(page, index) =>
                page === '...' ? (
                  <span key={`ellipsis-${index}`} className="px-2 text-sm text-muted-foreground">
                    ...
                  </span>
                ) : (
                  <Button
                    key={page}
                    className={cn(
                      'h-8 w-8 p-0',
                      currentPage === page && 'bg-primary text-primary-foreground',
                    )}
                    variant={currentPage === page ? 'default' : 'outline'}
                    onClick={() => handlePageChange((page as number) - 1)}
                  >
                    {page}
                  </Button>
                )
              }
            </For>
          </div>

          <Button
            className="h-8 w-8 p-0"
            disabled={currentPage === totalPages}
            variant="outline"
            onClick={() => handlePageChange(pagination.pageIndex + 1)}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            className="h-8 w-8 p-0"
            disabled={currentPage === totalPages}
            variant="outline"
            onClick={() => handlePageChange(totalPages - 1)}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function LoadingSpinner(): React.JSX.Element {
  return (
    <div className="flex items-center justify-center py-8">
      <Loader2Icon className="h-6 w-6 animate-spin" />
      <span className="ml-2 text-sm text-muted-foreground">Loading...</span>
    </div>
  );
}

function ErrorAlert({
  error,
  onRefetch,
}: {
  error: string;
  onRefetch?: () => void;
}): React.JSX.Element {
  return (
    <Alert className="mb-4" variant="destructive">
      <AlertDescription className="flex items-center justify-between">
        <span>{error}</span>
        <Show when={onRefetch}>
          <Button size="sm" variant="outline" onClick={onRefetch}>
            Try again
          </Button>
        </Show>
      </AlertDescription>
    </Alert>
  );
}

export function DataTable<TData>({
  columns,
  data,
  totalItems,
  pagination,
  sorting = [],
  loading = false,
  error = null,
  pageSizeOptions = [10, 20, 50, 100],
  onPaginationChange,
  onSortingChange,
  onRefetch,
  className,
}: DataTableProperties<TData>): React.JSX.Element {
  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(totalItems / pagination.pageSize),
    state: {
      pagination,
      sorting,
    },
    onPaginationChange,
    onSortingChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    manualSorting: true,
  });

  if (loading) {
    return (
      <div className={className}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className={className}>
        <ErrorAlert error={error} onRefetch={onRefetch} />
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="space-y-4">
        <div className="rounded-md border">
          <UITable>
            <TableHeader>
              <For each={table.getHeaderGroups()}>
                {(headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    <For each={headerGroup.headers}>
                      {(header) => (
                        <TableHead key={header.id}>
                          <Show when={!header.isPlaceholder}>
                            <div
                              className={cn(
                                'flex items-center space-x-2',
                                header.column.getCanSort() && 'cursor-pointer select-none',
                              )}
                              onClick={header.column.getToggleSortingHandler()}
                            >
                              <div>
                                {flexRender(header.column.columnDef.header, header.getContext())}
                              </div>
                              <Show when={header.column.getCanSort()}>
                                <Show
                                  fallback={<div className="h-4 w-4" />}
                                  when={header.column.getIsSorted()}
                                >
                                  <Show
                                    fallback={<ChevronDownIcon className="h-4 w-4" />}
                                    when={header.column.getIsSorted() === 'asc'}
                                  >
                                    <ChevronUpIcon className="h-4 w-4" />
                                  </Show>
                                </Show>
                              </Show>
                            </div>
                          </Show>
                        </TableHead>
                      )}
                    </For>
                  </TableRow>
                )}
              </For>
            </TableHeader>
            <TableBody>
              <Show
                fallback={
                  <TableRow>
                    <TableCell className="h-24 text-center" colSpan={columns.length}>
                      No results.
                    </TableCell>
                  </TableRow>
                }
                when={table.getRowModel().rows?.length}
              >
                <For each={table.getRowModel().rows}>
                  {(row) => (
                    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                      <For each={row.getVisibleCells()}>
                        {(cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        )}
                      </For>
                    </TableRow>
                  )}
                </For>
              </Show>
            </TableBody>
          </UITable>
        </div>

        <DataTablePagination
          pageSizeOptions={pageSizeOptions}
          pagination={pagination}
          totalItems={totalItems}
          onPaginationChange={onPaginationChange}
        />
      </div>
    </div>
  );
}
