"use client";

import { Calendar, Clock, Eye, Heart, NotebookPen, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { highlightMatch } from "@/components/ui/highlight";
import { useFilmStore } from "@/store/filmStore";
import { formatRuntime } from "@/utils/formatRuntime";

import { StarRating } from "../ui/starRating";
import { FilmRatingDialog } from "./filmRatingDialog";

const MainContent = () => {
  const {
    toggleFavorite,
    toggleWatched,
    setNote,
    setUserRating,
    getFilteredFilms,
    searchTerm,
  } = useFilmStore();

  const [isMounted, setIsMounted] = useState(false);
  const [expandedFilmId, setExpandedFilmId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState<{
    id: string;
    note?: string;
    userRating?: number;
  } | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filteredFilms = getFilteredFilms();

  const handleOpenDialog = (film: {
    id: string;
    note?: string;
    userRating?: number;
  }) => {
    setSelectedFilm(film);
    setDialogOpen(true);
  };

  const handleSaveRating = (rating: number, note: string) => {
    if (!selectedFilm) return;
    setUserRating(selectedFilm.id, rating);
    setNote(selectedFilm.id, note);
  };

  const handleToggleExpand = (id: string) => {
    setExpandedFilmId(expandedFilmId === id ? null : id);
  };

  if (!isMounted) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-96 animate-pulse rounded-lg bg-gray-200" />
        ))}
      </div>
    );
  }

  if (filteredFilms.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-gray-500">Nenhum filme encontrado</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredFilms.map((film) => (
          <div
            key={film.id}
            className="group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md"
          >
            {/* Imagem do filme */}
            <div className="relative aspect-[2/3] overflow-hidden">
              <Image
                src={film.image}
                alt={`Poster do filme ${film.title}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>

            {/* Conteúdo textual */}
            <div className="p-4">
              {/* Título */}
              <h3 className="mb-1 text-lg font-semibold">{film.title}</h3>

              {/* Ano e Duração */}
              <div className="mb-2 flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {film.release_date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {formatRuntime(film.running_time)}
                </span>
              </div>

              {/* Pontuação */}
              <div className="mb-3 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1 text-yellow-600">
                  <Star className="h-4 w-4 fill-yellow-400" />
                  <span className="text-sm font-medium">{film.rt_score}%</span>
                </div>
                <div>
                  {film.userRating ? (
                    <div className="flex items-center gap-1 text-gray-500">
                      <Star className="h-4 w-4" />
                      <span className="text-sm">{film.userRating}</span>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">Não avaliado</p>
                  )}
                </div>
              </div>

              {/* Descrição (limitada a 3 linhas) */}
              <div className="mb-3">
                <p
                  className={`text-sm text-gray-600 ${expandedFilmId === film.id ? "" : "line-clamp-3"}`}
                >
                  {highlightMatch(film.description, searchTerm)}
                </p>
                {film.description.length > 150 && (
                  <button
                    onClick={() => handleToggleExpand(film.id)}
                    className="mt-1 text-xs text-blue-600 hover:underline"
                  >
                    {expandedFilmId === film.id
                      ? "Mostrar menos"
                      : "Mostrar mais"}
                  </button>
                )}
              </div>

              {/* Diretor e Produtor */}
              <div className="mb-4 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="font-medium text-gray-500">Director</p>
                  <p className="line-clamp-1">{film.director}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-500">Producer</p>
                  <p className="line-clamp-1">{film.producer}</p>
                </div>
              </div>

              {/* Botões de ação */}
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <Button
                    variant={film.isWatched ? "default" : "outline"}
                    className="flex-1 gap-1 text-sm"
                    size="sm"
                    onClick={() => toggleWatched(film.id)}
                  >
                    <Eye className="h-4 w-4" />
                    {film.isWatched ? "Visto" : "Assistir"}
                  </Button>

                  <Button
                    variant={film.isFavorite ? "destructive" : "outline"}
                    className="flex-1 gap-1 text-sm"
                    size="sm"
                    onClick={() => toggleFavorite(film.id)}
                  >
                    <Heart className="h-4 w-4" />
                    {film.isFavorite ? "Favorito" : "Favoritar"}
                  </Button>
                </div>

                <Button
                  variant="outline"
                  className="gap-1 text-sm"
                  size="sm"
                  onClick={() =>
                    handleOpenDialog({
                      id: film.id,
                      note: film.note,
                      userRating: film.userRating,
                    })
                  }
                >
                  <NotebookPen className="h-4 w-4" />
                  {film.note || film.userRating
                    ? "Editar nota"
                    : "Adicionar nota"}
                </Button>

                {(film.userRating !== undefined || film.note) && (
                  <div className="mt-2 space-y-1 text-sm">
                    {film.userRating !== undefined && film.userRating > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">
                          Sua classificação:
                        </span>
                        <StarRating rating={film.userRating} size="sm" />
                      </div>
                    )}
                    {film.note && (
                      <p className="line-clamp-1 text-gray-600">
                        <span className="font-medium">Nota:</span> {film.note}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedFilm && (
        <FilmRatingDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          filmId={selectedFilm.id}
          initialRating={selectedFilm.userRating || 0}
          initialNote={selectedFilm.note || ""}
          onSave={handleSaveRating}
        />
      )}
    </>
  );
};

export default MainContent;
