import { create } from 'zustand';

interface SearchState {
  query: string;
  suggestions: string[];
  recentSearches: string[];
  setQuery: (query: string) => void;
  setSuggestions: (suggestions: string[]) => void;
  addRecentSearch: (search: string) => void;
  clearRecentSearches: () => void;
}

export const useSearchStore = create<SearchState>((set, get) => ({
  query: '',
  suggestions: [],
  recentSearches: [],
  setQuery: (query) => set({ query }),
  setSuggestions: (suggestions) => set({ suggestions }),
  addRecentSearch: (search) => {
    const { recentSearches } = get();
    const newSearches = [search, ...recentSearches.filter(s => s !== search)].slice(0, 10);
    set({ recentSearches: newSearches });
  },
  clearRecentSearches: () => set({ recentSearches: [] }),
})); 