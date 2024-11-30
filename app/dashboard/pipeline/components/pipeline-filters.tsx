import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { DateRangePicker } from '@/components/ui/date-range-picker';

export function PipelineFilters() {
  const [search, setSearch] = useState('');

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <Input
        placeholder="Search offers..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="md:w-[300px]"
      />

      <Select>
        <option value="all">All Statuses</option>
        <option value="draft">Draft</option>
        <option value="sent">Sent</option>
        <option value="accepted">Accepted</option>
        <option value="rejected">Rejected</option>
        <option value="closed">Closed</option>
        <option value="paid">Paid</option>
      </Select>

      <DateRangePicker
        placeholder="Select date range"
        className="md:w-[300px]"
      />
    </div>
  );
}
