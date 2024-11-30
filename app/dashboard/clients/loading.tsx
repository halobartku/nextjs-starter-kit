import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ResourceHeader } from '@/components/dashboard/resource-header';

export default function ClientsLoading() {
  return (
    <div className="space-y-4 md:space-y-6">
      <ResourceHeader
        title="Clients"
        description="Manage your client relationships"
      />
      <LoadingSpinner />
    </div>
  );
}
