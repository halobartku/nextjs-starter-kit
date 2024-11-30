import { Card } from '@/components/ui/card';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import type { Offer } from '@/types';

interface PipelineStatsProps {
  offers: Offer[];
}

export function PipelineStats({ offers }: PipelineStatsProps) {
  const totalValue = offers.reduce((sum, offer) => sum + offer.value, 0);
  
  const sentOffers = offers.filter(o => o.status === 'sent').length;
  const acceptedOffers = offers.filter(o => o.status === 'accepted').length;
  const totalOffers = offers.length;

  const conversionRate = totalOffers > 0 
    ? (acceptedOffers / totalOffers) * 100
    : 0;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="p-4">
        <div className="text-sm font-medium text-muted-foreground">Total Value</div>
        <div className="text-2xl font-bold">
          {formatCurrency(totalValue, offers[0]?.currency || 'USD')}
        </div>
      </Card>

      <Card className="p-4">
        <div className="text-sm font-medium text-muted-foreground">Active Deals</div>
        <div className="text-2xl font-bold">{sentOffers}</div>
      </Card>

      <Card className="p-4">
        <div className="text-sm font-medium text-muted-foreground">Win Rate</div>
        <div className="text-2xl font-bold">{formatPercentage(conversionRate)}</div>
      </Card>
    </div>
  );
}
