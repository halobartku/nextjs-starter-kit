"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { ClientCombobox } from './client-combobox';
import { ProductList } from './product-list';
import { DatePicker } from '@/components/ui/date-picker';
import { useQueryWithToast } from '@/lib/hooks/use-query-with-toast';
import { useMutationWithToast } from '@/lib/hooks/use-mutation-with-toast';
import type { Client, Offer } from '@/types';

const offerSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  clientId: z.string().min(1, 'Client is required'),
  value: z.number().min(0, 'Value must be positive'),
  currency: z.string().min(1, 'Currency is required'),
  validUntil: z.date().optional(),
  products: z.array(z.object({
    id: z.string(),
    quantity: z.number().min(1),
  })),
});

type OfferFormData = z.infer<typeof offerSchema>;

interface OfferFormProps {
  initialData?: Offer;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function OfferForm({ initialData, onSuccess, onCancel }: OfferFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const { data: clients } = useQueryWithToast<Client[]>(
    ['clients'],
    () => fetch('/api/clients').then(res => res.json())
  );

  const form = useForm<OfferFormData>({
    resolver: zodResolver(offerSchema),
    defaultValues: initialData || {
      title: '',
      description: '',
      clientId: '',
      value: 0,
      currency: 'USD',
      products: [],
    },
  });

  const createOffer = useMutationWithToast(
    async (data: OfferFormData) => {
      const response = await fetch('/api/offers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create offer');
      return response.json();
    },
    {
      onSuccess,
      successMessage: 'Offer created successfully',
      invalidateQueries: [['offers']],
    }
  );

  const updateOffer = useMutationWithToast(
    async (data: OfferFormData) => {
      const response = await fetch(`/api/offers/${initialData?.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update offer');
      return response.json();
    },
    {
      onSuccess,
      successMessage: 'Offer updated successfully',
      invalidateQueries: [['offers']],
    }
  );

  const onSubmit = async (data: OfferFormData) => {
    setIsLoading(true);
    try {
      if (initialData) {
        await updateOffer.mutateAsync(data);
      } else {
        await createOffer.mutateAsync(data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? 'Edit Offer' : 'Create Offer'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="clientId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client</FormLabel>
                  <FormControl>
                    <ClientCombobox
                      clients={clients || []}
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Value</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={e => field.onChange(parseFloat(e.target.value))}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <Select
                      {...field}
                      disabled={isLoading}
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="validUntil"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valid Until</FormLabel>
                  <FormControl>
                    <DatePicker
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="products"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Products</FormLabel>
                  <FormControl>
                    <ProductList
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {initialData ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
