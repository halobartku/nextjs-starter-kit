import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ResourceHeader } from '@/components/dashboard/resource-header';

export default function OffersLoading() {
  return (
    <div className="space-y-4 md:space-y-6">
      <ResourceHeader
        title="Offers"
        description="Manage your offers and proposals"
      />
      <LoadingSpinner />
    </div>
  );
}
