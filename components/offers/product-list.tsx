import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Trash } from 'lucide-react';
import { useQueryWithToast } from '@/lib/hooks/use-query-with-toast';
import { formatCurrency } from '@/lib/utils';
import type { Product } from '@/types';

interface ProductListProps {
  value: Array<{ id: string; quantity: number }>;
  onChange: (value: Array<{ id: string; quantity: number }>) => void;
  disabled?: boolean;
}

export function ProductList({ value, onChange, disabled }: ProductListProps) {
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  const { data: products } = useQueryWithToast<Product[]>(
    ['products'],
    () => fetch('/api/products').then(res => res.json())
  );

  const handleAddProduct = () => {
    if (!selectedProductId) return;

    const newValue = [...value];
    const existingIndex = newValue.findIndex(item => item.id === selectedProductId);

    if (existingIndex >= 0) {
      newValue[existingIndex].quantity += quantity;
    } else {
      newValue.push({ id: selectedProductId, quantity });
    }

    onChange(newValue);
    setSelectedProductId('');
    setQuantity(1);
  };

  const handleRemoveProduct = (productId: string) => {
    onChange(value.filter(item => item.id !== productId));
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    onChange(
      value.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const selectedProducts = value
    .map(item => ({
      ...item,
      product: products?.find(p => p.id === item.id),
    }))
    .filter((item): item is typeof item & { product: Product } => !!item.product);

  const total = selectedProducts.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <select
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
          value={selectedProductId}
          onChange={e => setSelectedProductId(e.target.value)}
          disabled={disabled}
        >
          <option value="">Select a product</option>
          {products?.map(product => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>

        <Input
          type="number"
          min={1}
          value={quantity}
          onChange={e => setQuantity(parseInt(e.target.value, 10))}
          className="w-24"
          disabled={disabled}
        />

        <Button
          type="button"
          onClick={handleAddProduct}
          disabled={!selectedProductId || disabled}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedProducts.map(({ product, quantity }) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell className="text-right">
                {formatCurrency(product.price, product.currency)}
              </TableCell>
              <TableCell className="text-right">
                <Input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={e =>
                    handleQuantityChange(
                      product.id,
                      parseInt(e.target.value, 10)
                    )
                  }
                  className="w-20 ml-auto"
                  disabled={disabled}
                />
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(product.price * quantity, product.currency)}
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveProduct(product.id)}
                  disabled={disabled}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {selectedProducts.length > 0 && (
            <TableRow>
              <TableCell colSpan={3} className="text-right font-medium">
                Total
              </TableCell>
              <TableCell className="text-right font-medium">
                {formatCurrency(total, products?.[0]?.currency || 'USD')}
              </TableCell>
              <TableCell />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
