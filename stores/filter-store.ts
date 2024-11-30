import { create } from 'zustand';
import { OfferStatus } from '@/types';

interface DateRange {
  from: Date | null;
  to: Date | null;
}

interface FilterStore {
  search: string;
  status: OfferStatus | 'all';
  dateRange: DateRange;
  setSearch: (search: string) => void;
  setStatus: (status: OfferStatus | 'all') => void;
  setDateRange: (dateRange: DateRange) => void;
  resetFilters: () => void;
}

const initialState = {
  search: '',
  status: 'all' as const,
  dateRange: {
    from: null,
    to: null,
  },
};

export const useFilterStore = create<FilterStore>((set) => ({
  ...initialState,
  setSearch: (search) => set({ search }),
  setStatus: (status) => set({ status }),
  setDateRange: (dateRange) => set({ dateRange }),
  resetFilters: () => set(initialState),
}));
