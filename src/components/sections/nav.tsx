import { Eye, Heart, NotebookPen, Star } from "lucide-react";

import { SearchBar } from "@/components/ui/searchBar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFilmStore } from "@/store/filmStore";

import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { StarRating } from "../ui/starRating";

const Nav = () => {
  const { searchTerm, setSearchTerm, filters, setFilter, clearAllFilters } =
    useFilmStore();

  return (
    <>
      <SearchBar
        value={searchTerm}
        onChange={(value: string) => setSearchTerm(value)}
      />

      <div className="mb-2">
        {/* checkbox */}
        <div className="mb-8 flex justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="synopsis"
              checked={filters.includeSynopsis}
              onCheckedChange={(checked) =>
                setFilter({ includeSynopsis: Boolean(checked) })
              }
            />
            <label htmlFor="synopsis" className="text-sm font-medium">
              Incluir sinopse na busca
            </label>
          </div>

          {/* filtros */}
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtro" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="item1">Título (A-Z)</SelectItem>
              <SelectItem value="item2">Título (Z-A)</SelectItem>
              <SelectItem value="item3">Duração (Mais curto)</SelectItem>
              <SelectItem value="item4">Duração (Mais longo)</SelectItem>
              <SelectItem value="item5">Classificação (Mais alta)</SelectItem>
              <SelectItem value="item6">Classificação (Mais baixa)</SelectItem>
              <SelectItem value="item7">Pontuação (Mais baixa)</SelectItem>
              <SelectItem value="item8">Pontuação (Mais baixa)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/*Nav*/}
        <div className="mb-8 flex justify-between">
          <nav>
            <div className="flex gap-1.5">
              <span className="flex items-center">Filtros:</span>
              <Button
                variant={filters.watchedOnly ? "default" : "light-gray"}
                onClick={() => setFilter({ watchedOnly: !filters.watchedOnly })}
              >
                <Eye className="size-4" /> Assistidos
              </Button>
              <Button
                variant={filters.favoritesOnly ? "destructive" : "light-gray"}
                onClick={() =>
                  setFilter({ favoritesOnly: !filters.favoritesOnly })
                }
              >
                <Heart className="size-4" /> Favoritos
              </Button>
              <Button
                variant={filters.withNotesOnly ? "default" : "light-gray"}
                onClick={() =>
                  setFilter({ withNotesOnly: !filters.withNotesOnly })
                }
              >
                <NotebookPen className="size-4" /> Com notas
              </Button>

              <Select
                value={filters.minRating ? filters.minRating.toString() : "all"}
                onValueChange={(value) =>
                  setFilter({
                    minRating: value === "all" ? null : parseInt(value),
                  })
                }
              >
                <SelectTrigger className="w-[200px]">
                  <Star className="size-4" />
                  <SelectValue placeholder="Classificação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os filmes</SelectItem>
                  <SelectItem value="-1">Classificados</SelectItem>
                  <SelectItem value="-2">Sem classificação</SelectItem>

                  <div className="my-1 border-t border-gray-200 opacity-30" />

                  {[5, 4, 3, 2, 1].map((rating) => (
                    <SelectItem key={rating} value={rating.toString()}>
                      <div className="flex items-center gap-2">
                        <StarRating rating={rating} />
                        <span>
                          {rating} estrela{rating !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </nav>
          <Button variant="light-gray" onClick={clearAllFilters}>
            Limpar tudo
          </Button>
        </div>
        <div className="mb-8">
          <p className="text-sm text-gray-500">
            {" "}
            Filtros ativos: {Object.values(filters).filter(Boolean).length}
          </p>
        </div>
      </div>
    </>
  );
};

export default Nav;
