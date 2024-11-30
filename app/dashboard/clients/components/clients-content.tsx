"use client";

import { useQueryWithToast } from '@/lib/hooks/use-query-with-toast';
import { Card } from '@/components/ui/card';
import { EmptyState } from '@/components/dashboard/empty-state';
import { Users } from 'lucide-react';
import { ClientCard } from './client-card';
import type { Client } from '@/types';

export function ClientsContent() {
  const { data: clients, isLoading } = useQueryWithToast<Client[]>(
    ['clients'],
    () => fetch('/api/clients').then(res => res.json()),
    { errorMessage: 'Failed to load clients' }
  );

  if (!clients?.length) {
    return (
      <EmptyState
        icon={<Users className="w-12 h-12 text-muted-foreground" />}
        title="No clients yet"
        description="Add your first client to get started"
        action={{
          label: 'Add Client',
          onClick: () => {/* TODO: Implement add client */}
        }}
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {clients.map((client) => (
        <ClientCard
          key={client.id}
          client={client}
        />
      ))}
    </div>
  );
}
