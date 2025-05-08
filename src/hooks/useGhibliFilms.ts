"use client";

import { useEffect } from "react";

import { ghibliService } from "@/services/api/route";
import { useFilmStore } from "@/store/filmStore";

export function useGhibliFilms() {
  const { films, setFilms, loading, error, setLoading, setError } =
    useFilmStore();
  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const data = await ghibliService.getFilms();
        setFilms(data);
        setError(null);
      } catch (error) {
        setError("Erro ao buscar os filmes");
        console.error("Erro ao buscar os filmes: ", error);
      } finally {
        setLoading(false);
      }
    };

    if (films.length === 0) {
      fetchFilms();
    }
  }, [films.length, setFilms, setLoading, setError]);
  return {
    loading,
    error,
  };
}
