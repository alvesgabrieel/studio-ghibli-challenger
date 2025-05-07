"use client";

import { useEffect,useState } from "react";

import { ghibliService } from "@/services/api/route";
import { Film } from "@/types/film";



export function useGhibliFilms() {
    const [films, setFilms] = useState<Film[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFilms = async () => {
            try {
                setLoading(true)
                const data = await ghibliService.getFilms();
                setFilms(data);
            } catch {
                setError("Erro ao buscar os filmes")
            } finally {
                setLoading(false)
            }
        };
        fetchFilms();
    }, [])
    return { films, loading, error }
}