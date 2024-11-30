"use client";

import { useState } from 'react';
import { useQueryWithToast } from '@/lib/hooks/use-query-with-toast';
import { useMutationWithToast } from '@/lib/hooks/use-mutation-with-toast';
import { DndContext, DragOverlay, closestCorners } from '@dnd-kit/core';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { PipelineColumn } from './pipeline-column';
import { PipelineCard } from './pipeline-card';
import { PipelineStats } from './pipeline-stats';
import { PipelineFilters } from './pipeline-filters';
import { EmptyState } from '@/components/dashboard/empty-state';
import { useModalStore } from '@/stores/modal-store';
import type { Client, Offer, OfferStatus } from '@/types';

export function PipelineContent() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { openModal } = useModalStore();

  const { data: offers, isLoading: isLoadingOffers } = useQueryWithToast<Offer[]>(
    ['offers'],
    () => fetch('/api/offers').then(res => res.json())
  );

  const { data: clients, isLoading: isLoadingClients } = useQueryWithToast<Client[]>(
    ['clients'],
    () => fetch('/api/clients').then(res => res.json())
  );

  const updateOfferStatus = useMutationWithToast(
    async ({ offerId, status }: { offerId: string; status: OfferStatus }) => {
      const response = await fetch(`/api/offers/${offerId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error('Failed to update offer status');
      return response.json();
    },
    {
      invalidateQueries: [['offers']],
      successMessage: 'Offer status updated',
    }
  );

  if (isLoadingOffers || isLoadingClients) {
    return <LoadingSpinner />;
  }

  if (!offers?.length) {
    return (
      <EmptyState
        title="No offers yet"
        description="Create your first offer to get started"
        action={{
          label: 'Create Offer',
          onClick: () => openModal('createOffer'),
        }}
      />
    );
  }

  const handleDragEnd = async (offerId: string, newStatus: OfferStatus) => {
    if (!offers) return;
    const offer = offers.find(o => o.id === offerId);
    if (!offer || offer.status === newStatus) return;

    await updateOfferStatus.mutateAsync({ offerId, status: newStatus });
  };

  return (
    <div className="space-y-6">
      <PipelineStats offers={offers} />
      <PipelineFilters />
      
      <DndContext
        onDragStart={event => setActiveId(event.active.id as string)}
        onDragEnd={event => {
          const { active, over } = event;
          if (over) {
            handleDragEnd(active.id as string, over.id as OfferStatus);
          }
          setActiveId(null);
        }}
        collisionDetection={closestCorners}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {(['draft', 'sent', 'accepted', 'rejected', 'closed', 'paid'] as const).map(status => (
            <PipelineColumn
              key={status}
              status={status}
              offers={offers.filter(o => o.status === status)}
              clients={clients || []}
            />
          ))}
        </div>

        <DragOverlay>
          {activeId && offers && (
            <PipelineCard
              offer={offers.find(o => o.id === activeId)!}
              client={clients?.find(c => c.id === offers.find(o => o.id === activeId)?.clientId)}
            />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
