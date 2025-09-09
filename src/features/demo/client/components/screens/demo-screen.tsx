'use client';

import { type OnChangeFn, type PaginationState } from '@tanstack/react-table';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { For, HStack, Show, VStack, Wrap } from '@/components/atoms';
import { LimitedPage } from '@/components/atoms/layout/limited-page';
import { DebouncedInput } from '@/components/molecules';
import { LoadingCard } from '@/components/organisms/data/loading-card';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import { useDemoScreenViewModel } from '../../view-models';
import {
  ActivityForm,
  ActivityList,
  DemoHeader,
  DemoSidebar,
  ProductCard,
  ProductsTable,
} from '../organisms';

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
    <SidebarProvider>
      <div className="min-h-screen bg-background flex w-full">
        <DemoSidebar />

        <SidebarInset className="flex-1">
          <DemoHeader />

          <main className="flex-1 overflow-auto w-full">
            <LimitedPage className="p-6">
              <VStack className="gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Comprehensive Component Showcase</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      This demo showcases all the app&apos;s features including sidebar navigation,
                      layout components, forms, data tables, theming, and internationalization.
                    </p>
                    <Wrap className="gap-2">
                      <Badge variant="outline">Sidebar Navigation</Badge>
                      <Badge variant="outline">React Hook Form</Badge>
                      <Badge variant="outline">Zod Validation</Badge>
                      <Badge variant="outline">TanStack Query</Badge>
                      <Badge variant="outline">i18n (EN/PT)</Badge>
                      <Badge variant="outline">Dark/Light Theme</Badge>
                      <Badge variant="outline">shadcn/ui</Badge>
                      <Badge variant="outline">Layout Components</Badge>
                      <Badge variant="outline">For/Show Components</Badge>
                      <Badge variant="outline">Data Tables</Badge>
                    </Wrap>
                  </CardContent>
                </Card>

                <div className="grid gap-8 lg:grid-cols-2">
                  <VStack className="gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Layout Components Demo</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">HStack (Horizontal Layout):</h4>
                          <HStack className="p-3 border rounded">
                            <div className="bg-primary/10 p-2 rounded text-sm">Item 1</div>
                            <div className="bg-primary/10 p-2 rounded text-sm">Item 2</div>
                            <div className="bg-primary/10 p-2 rounded text-sm">Item 3</div>
                          </HStack>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">VStack (Vertical Layout):</h4>
                          <VStack className="p-3 border rounded">
                            <div className="bg-primary/10 p-2 rounded w-full text-center text-sm">
                              Item 1
                            </div>
                            <div className="bg-primary/10 p-2 rounded w-full text-center text-sm">
                              Item 2
                            </div>
                          </VStack>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">Wrap Layout:</h4>
                          <Wrap className="p-3 border rounded">
                            <Badge variant="secondary">Responsive</Badge>
                            <Badge variant="secondary">Wrapping</Badge>
                            <Badge variant="secondary">Layout</Badge>
                            <Badge variant="secondary">Component</Badge>
                          </Wrap>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">
                            For Component (List Rendering):
                          </h4>
                          <div className="p-3 border rounded space-y-2">
                            <For each={['React', 'Next.js', 'TypeScript', 'Tailwind']}>
                              {(item, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-primary rounded-full" />
                                  <span className="text-sm">{item}</span>
                                </div>
                              )}
                            </For>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">
                            Show Component (Conditional Rendering):
                          </h4>
                          <div className="p-3 border rounded space-y-2">
                            <Show when={true}>
                              <div className="text-sm text-green-600 flex items-center gap-2">
                                ✅ This is always visible
                              </div>
                            </Show>
                            <Show when={false}>
                              <div className="text-sm text-red-600">
                                ❌ This will never be visible
                              </div>
                            </Show>
                            <Show when={viewModel.products.length > 0}>
                              <div className="text-sm text-blue-600 flex items-center gap-2">
                                📦 Products loaded: {viewModel.products.length} items
                              </div>
                            </Show>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <ActivityForm />
                  </VStack>

                  <VStack className="gap-6">
                    <Show when={viewModel.products.length > 0 && !viewModel.isLoading}>
                      <ProductCard product={viewModel.products[0]} />
                    </Show>
                    <Show when={viewModel.isLoading}>
                      <LoadingCard />
                    </Show>

                    <Card>
                      <CardHeader>
                        <CardTitle>{t('activity.list.title')}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ActivityList />
                      </CardContent>
                    </Card>
                  </VStack>
                </div>

                <Separator />

                <Card>
                  <CardHeader>
                    <CardTitle>Products API Demo</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Interactive data table with search, pagination, and API integration
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
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
                  </CardContent>
                </Card>
              </VStack>
            </LimitedPage>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
