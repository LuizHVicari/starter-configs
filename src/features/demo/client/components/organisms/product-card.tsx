import Image from 'next/image';

import { Muted, VStack } from '@/components/atoms';
import { ModalPreview } from '@/components/molecules/modals/modal-preview';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Product } from '@/features/demo/shared/types/product-types';

interface Properties extends Omit<React.ComponentProps<typeof ModalPreview>, 'trigger'> {
  product: Product;
}

export function ProductCard({ product, ...properties }: Properties): React.JSX.Element {
  return (
    <Card className="hover:cursor-pointer hover:shadow-lg">
      <ModalPreview
        {...properties}
        trigger={
          <div>
            <CardHeader>
              <CardTitle>{product.title}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-row justify-between">
              <Image alt={product.title} height={100} src={product.thumbnail} width={100} />
              <VStack>
                <Muted>Price: {product.price}</Muted>
                <Muted>Category: {product.category}</Muted>
                <Muted>Stock: {product.stock}</Muted>
              </VStack>
            </CardContent>
          </div>
        }
      />
    </Card>
  );
}
