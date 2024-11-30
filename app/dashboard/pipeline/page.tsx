import { Suspense } from 'react';
import { PipelineContent } from './components/pipeline-content';
import { ResourceHeader } from '@/components/dashboard/resource-header';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export const metadata = {
  title: 'Pipeline',
  description: 'Track your sales pipeline'
};

export default function PipelinePage() {
  return (
    <div className="space-y-4 md:space-y-6">
      <ResourceHeader
        title="Pipeline"
        description="Track your sales pipeline and deal progress"
      />
      
      <Suspense fallback={<LoadingSpinner />}>
        <PipelineContent />
      </Suspense>
    </div>
  );
}
