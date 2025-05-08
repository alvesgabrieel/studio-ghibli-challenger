import { useMemo, useState } from "react";

import { Film } from "@/types/film";

export function useFilmSearch(initialFilms: Film[]) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFilms = useMemo(() => {
    if (!searchTerm) return initialFilms;

    const term = searchTerm.toLowerCase();
    return initialFilms.filter((film) =>
      film.title.toLowerCase().includes(term),
    );
  }, [initialFilms, searchTerm]);

  return {
    filteredFilms,
    searchTerm,
    setSearchTerm,
  };
}
