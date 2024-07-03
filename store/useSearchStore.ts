import { create } from 'zustand';
import { useQuery } from '@tanstack/react-query';

interface SearchProps {
  keyword: string;
  setKeyword: (val: string) => void;
  start_searching: boolean;
  setStartSearching: () => void;
  setEndSearching: () => void;
}

export const useSearchStore = create<SearchProps>(set => ({
  keyword: '',
  start_searching: false,
  setKeyword: (val: string) => {
    set({ keyword: val });
  },
  setStartSearching: () => {
    set({ start_searching: true });
  },
  setEndSearching: () => {
    set({ start_searching: false });
  },
}));
