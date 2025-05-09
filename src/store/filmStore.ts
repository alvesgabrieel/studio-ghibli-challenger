import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Film } from "@/types/film";

interface FilmWithMeta extends Film {
  isFavorite?: boolean;
  isWatched?: boolean;
  note?: string;
  userRating?: number;
}

export interface FilmState {
  films: FilmWithMeta[];
  searchTerm: string;
  loading: boolean;
  error: string | null;
  sortBy: "title-asc" | "title-desc" | "duration-asc" | "duration-desc" | "score-asc" | "score-desc" | "userRating-asc" | "userRating-desc" | null;
  filters: {
    favoritesOnly: boolean;
    watchedOnly: boolean;
    withNotesOnly: boolean;
    minRating: number | null;
    includeSynopsis: boolean;
  };
  setFilms: (films: Film[]) => void;
  setSort: (sort: FilmState["sortBy"]) => void;
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
      sortBy: null,
      filters: {
        favoritesOnly: false,
        watchedOnly: false,
        withNotesOnly: false,
        minRating: null,
        includeSynopsis: false,
      },
      setLoading: (loading) => set({ loading }),
      setSort: (sort) => set({ sortBy: sort }),
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
       toggleFavorite: (id) => {
        set((state) => {
          const updatedFilms = state.films.map((film) =>
            film.id === id ? { ...film, isFavorite: !film.isFavorite } : film
          );

          const isFavorite = updatedFilms.find((film) => film.id === id)?.isFavorite;

          if (isFavorite) {
            toast.success("Filme adicionado aos favoritos!"); 
          } else {
            toast.warning("Filme removido dos favoritos!"); 
          }

          return { films: updatedFilms };
        });
      },
      toggleWatched: (id) => { 
        set((state) => {
          const updatedWatched = state.films.map((film) =>
            film.id === id ? { ...film, isWatched: !film.isWatched, } : film,            
          );

          const isWatched = updatedWatched.find((film) => film.id === id)?.isWatched;

          if (isWatched) {
            toast.success("Filme assistido!");
          } else {
            toast.error("Filme removido dos assistidos!");
          }

          return {films: updatedWatched}
        });
      },
       setNote: (id, note) => {
        set((state) => {
          const updatedFilms = state.films.map((film) =>
            film.id === id ? { ...film, note } : film
          );

          toast.success(`Informações do filme atualizada!`);

          return { films: updatedFilms };
        });
      },
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
          sortBy: null,
          filters: {
            favoritesOnly: false,
            watchedOnly: false,
            withNotesOnly: false,
            minRating: null,
            includeSynopsis: false,
          },
        }),
      getFilteredFilms: () => {
        const { films, searchTerm, filters, sortBy } = get();
        const {
          favoritesOnly,
          watchedOnly,
          withNotesOnly,
          minRating,
          includeSynopsis,
        } = filters;

        let filteredFilms = films.filter((film) => {
          if (favoritesOnly && !film.isFavorite) return false;
          if (watchedOnly && !film.isWatched) return false;
          if (withNotesOnly && !film.note) return false;

          if (minRating !== null) {
            const filmRating = film.userRating ?? 0
  
            //Casos especiais do select
            if (minRating === -1) return filmRating > 0; // "Classificados"
            if (minRating === -2) return filmRating === 0; // "Sem classificção" 
  
            if (filmRating !== minRating) return false;
          }

          if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            const matchesTitle = film.title.toLowerCase().includes(searchLower);
            const matchesDescription =
              includeSynopsis &&
              film.description.toLowerCase().includes(searchLower);

            return matchesTitle || matchesDescription;
          }

          return true;
        })
         // Apply sorting if specified
         if (sortBy) {
          filteredFilms = [...filteredFilms].sort((a, b) => {
            switch (sortBy) {
              case "title-asc":
                return a.title.localeCompare(b.title);
              case "title-desc":
                return b.title.localeCompare(a.title);
              case "duration-asc":
                return parseInt(a.running_time) - parseInt(b.running_time); 
              case "duration-desc":
                return parseInt(b.running_time) - parseInt(a.running_time); 
              case "score-asc":
                return parseInt(a.rt_score) - parseInt(b.rt_score);
              case "score-desc":
                return parseInt(b.rt_score) - parseInt(a.rt_score);
              case "userRating-asc":
                return (a.userRating || 0) - (b.userRating || 0);
              case "userRating-desc":
                return (b.userRating || 0) - (a.userRating || 0);
              default:
                return 0;
            }
          });
        }

        return filteredFilms;
        
      },
    }),
    {
      name: "film-storage",
    },
  ),
);
