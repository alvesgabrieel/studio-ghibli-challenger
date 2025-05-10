"use client";

import { useEffect } from "react";

import { useFilmStore } from "@/store/filmStore";
import { Film } from "@/types/film";

export function FilmStoreInitializer({ films }: { films: Film[] }) {
  const { films: storeFilms, setFilms } = useFilmStore();

  useEffect(() => {
    if (storeFilms.length === 0 && films.length > 0) {
      setFilms(films);
    }
  }, [films, storeFilms.length, setFilms]);

  return null;
}
