import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ResourceHeader } from '@/components/dashboard/resource-header';

export default function PipelineLoading() {
  return (
    <div className="space-y-4 md:space-y-6">
      <ResourceHeader
        title="Pipeline"
        description="Track your sales pipeline and deal progress"
      />
      <LoadingSpinner />
    </div>
  );
}
