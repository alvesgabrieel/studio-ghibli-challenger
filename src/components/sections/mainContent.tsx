import { BookOpen, Calendar, Clock, Eye, Heart, Star } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { useGhibliFilms } from "@/hooks/useGhibliFilms";
import { formatRuntime } from "@/utils/formatRuntime";

const MainContent = () => {
  const { films, loading, error } = useGhibliFilms();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {films.map((film) => (
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
            <div className="mb-3 flex items-center gap-2">
              <div className="flex items-center gap-1 text-yellow-600">
                <Star className="h-4 w-4 fill-yellow-400" />
                <span className="text-sm font-medium">{film.rt_scorr}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <Star className="h-4 w-4" />
                <span className="text-sm">4.5</span>
              </div>
            </div>

            {/* Descrição (limitada a 3 linhas) */}
            <p className="mb-3 line-clamp-3 text-sm text-gray-600">
              {film.description}
            </p>

            {/* Diretor e Produtor */}
            <div className="mb-4 grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="font-medium text-gray-500">Director</p>
                <p>{film.director}</p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Producer</p>
                <p>{film.producer}</p>
              </div>
            </div>

            {/* Caixa de notas do usuário */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Your notes..."
                className="w-full rounded border px-3 py-2 text-sm focus:ring-1 focus:ring-gray-400 focus:outline-none"
                maxLength={60}
              />
            </div>

            {/* Botões de ação */}
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 gap-1 text-sm"
                  size="sm"
                >
                  <Eye className="h-4 w-4" />
                  Watched
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 gap-1 text-sm"
                  size="sm"
                >
                  <Heart className="h-4 w-4" />
                  Favorite
                </Button>
              </div>
              <Button className="gap-1 text-sm" size="sm">
                <BookOpen className="h-4 w-4" />
                Add Note
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainContent;
