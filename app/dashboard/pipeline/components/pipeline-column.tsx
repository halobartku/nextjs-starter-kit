import { useDroppable } from '@dnd-kit/core';
import { Status } from './status';
import { PipelineCard } from './pipeline-card';
import type { Client, Offer, OfferStatus } from '@/types';

interface PipelineColumnProps {
  status: OfferStatus;
  offers: Offer[];
  clients: Client[];
}

export function PipelineColumn({ status, offers, clients }: PipelineColumnProps) {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div
      ref={setNodeRef}
      className="flex flex-col h-full min-h-[500px] p-4 bg-muted/50 rounded-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <Status status={status} />
        <div className="text-sm text-muted-foreground">
          {offers.length}
        </div>
      </div>

      <div className="space-y-3">
        {offers.map(offer => (
          <PipelineCard
            key={offer.id}
            offer={offer}
            client={clients.find(c => c.id === offer.clientId)}
          />
        ))}
      </div>
    </div>
  );
}
