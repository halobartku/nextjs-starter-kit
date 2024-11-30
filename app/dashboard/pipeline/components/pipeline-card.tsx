import { useDraggable } from '@dnd-kit/core';
import { Card } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import type { Client, Offer } from '@/types';

interface PipelineCardProps {
  offer: Offer;
  client?: Client;
}

export function PipelineCard({ offer, client }: PipelineCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: offer.id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 cursor-move hover:shadow-md transition-shadow"
    >
      <div className="space-y-2">
        <div className="font-medium">{offer.title}</div>
        {client && (
          <div className="text-sm text-muted-foreground">
            {client.name}
          </div>
        )}
        <div className="text-sm font-medium">
          {formatCurrency(offer.value, offer.currency)}
        </div>
      </div>
    </Card>
  );
}
