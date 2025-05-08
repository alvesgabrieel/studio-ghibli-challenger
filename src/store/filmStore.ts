import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Film } from "@/types/film";

interface FilmWithMeta extends Film {
  isFavorite?: boolean;
  isWatched?: boolean;
  note?: string;
  userRating?: number;
}

interface FilmState {
  films: FilmWithMeta[];
  searchTerm: string;
  loading: boolean;
  error: string | null;
  filters: {
    favoritesOnly: boolean;
    watchedOnly: boolean;
    withNotesOnly: boolean;
    minRating: number | null;
    includeSynopsis: boolean;
  };
  setFilms: (films: Film[]) => void;
  toggleFavorite: (id: string) => void;
  toggleWatched: (id: string) => void;
  setNote: (id: string, note: string) => void;
  setUserRating: (id: string, rating: number) => void;
  setSearchTerm: (term: string) => void;
  setFilter: (filter: Partial<FilmState["filters"]>) => void;
  clearAllFilters: () => void;
  getFilteredFilms: () => FilmWithMeta[];
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useFilmStore = create<FilmState>()(
  persist(
    (set, get) => ({
      films: [],
      searchTerm: "",
      loading: false,
      error: null,
      filters: {
        favoritesOnly: false,
        watchedOnly: false,
        withNotesOnly: false,
        minRating: null,
        includeSynopsis: false,
      },
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      setFilms: (films) =>
        set({
          films: films.map((film) => ({
            ...film,
            isFavorite: false,
            isWatched: false,
            note: "",
            userRating: 0,
          })),
        }),
      toggleFavorite: (id) =>
        set((state) => ({
          films: state.films.map((film) =>
            film.id === id ? { ...film, isFavorite: !film.isFavorite } : film,
          ),
        })),
      toggleWatched: (id) =>
        set((state) => ({
          films: state.films.map((film) =>
            film.id === id ? { ...film, isWatched: !film.isWatched } : film,
          ),
        })),
      setNote: (id, note) =>
        set((state) => ({
          films: state.films.map((film) =>
            film.id === id ? { ...film, note } : film,
          ),
        })),
      setUserRating: (id, rating) =>
        set((state) => ({
          films: state.films.map((film) =>
            film.id === id ? { ...film, userRating: rating } : film,
          ),
        })),
      setSearchTerm: (term) => set({ searchTerm: term }),
      setFilter: (filter) =>
        set((state) => ({
          filters: { ...state.filters, ...filter },
        })),
      clearAllFilters: () =>
        set({
          searchTerm: "",
          filters: {
            favoritesOnly: false,
            watchedOnly: false,
            withNotesOnly: false,
            minRating: null,
            includeSynopsis: false,
          },
        }),
      getFilteredFilms: () => {
        const { films, searchTerm, filters } = get();
        const {
          favoritesOnly,
          watchedOnly,
          withNotesOnly,
          minRating,
          includeSynopsis,
        } = filters;

        return films.filter((film) => {
          // Aplicar filtros de estado
          if (favoritesOnly && !film.isFavorite) return false;
          if (watchedOnly && !film.isWatched) return false;
          if (withNotesOnly && !film.note) return false;
          if (minRating !== null && (film.userRating || 0) < minRating)
            return false;

          // Aplicar busca
          if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            const matchesTitle = film.title.toLowerCase().includes(searchLower);
            const matchesDescription =
              includeSynopsis &&
              film.description.toLowerCase().includes(searchLower);

            return matchesTitle || matchesDescription;
          }

          return true;
        });
      },
    }),
    {
      name: "film-storage",
    },
  ),
);
