import { Badge } from '@/components/ui/badge';
import type { OfferStatus } from '@/types';

const STATUS_CONFIG: Record<OfferStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  draft: { label: 'Draft', variant: 'secondary' },
  sent: { label: 'Sent', variant: 'default' },
  accepted: { label: 'Accepted', variant: 'default' },
  rejected: { label: 'Rejected', variant: 'destructive' },
  closed: { label: 'Closed', variant: 'outline' },
  paid: { label: 'Paid', variant: 'default' },
};

interface StatusProps {
  status: OfferStatus;
}

export function Status({ status }: StatusProps) {
  const config = STATUS_CONFIG[status];

  return (
    <Badge variant={config.variant}>
      {config.label}
    </Badge>
  );
}
