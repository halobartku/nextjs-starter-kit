import { Suspense } from 'react';
import { ClientsContent } from './components/clients-content';
import { ResourceHeader } from '@/components/dashboard/resource-header';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export const metadata = {
  title: 'Clients',
  description: 'Manage your client relationships'
};

export default function ClientsPage() {
  return (
    <div className="space-y-4 md:space-y-6">
      <ResourceHeader
        title="Clients"
        description="Manage your client relationships"
        action={{
          label: 'Add Client',
          onClick: () => {/* TODO: Implement add client */}
        }}
      />
      
      <Suspense fallback={<LoadingSpinner />}>
        <ClientsContent />
      </Suspense>
    </div>
  );
}
