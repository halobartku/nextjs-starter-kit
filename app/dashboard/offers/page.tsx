import { Suspense } from 'react';
import { OffersContent } from './components/offers-content';
import { ResourceHeader } from '@/components/dashboard/resource-header';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export const metadata = {
  title: 'Offers',
  description: 'Manage your offers and proposals'
};

export default function OffersPage() {
  return (
    <div className="space-y-4 md:space-y-6">
      <ResourceHeader
        title="Offers"
        description="Manage your offers and proposals"
        action={{
          label: 'New Offer',
          onClick: () => {/* TODO: Implement new offer */}
        }}
      />
      
      <Suspense fallback={<LoadingSpinner />}>
        <OffersContent />
      </Suspense>
    </div>
  );
}
