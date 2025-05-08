import { Eye, Heart, NotebookPen, Star } from "lucide-react";

import { SearchBar } from "@/components/ui/searchBar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { StarRating } from "../ui/starRating";

const Nav = () => {
  return (
    <>
      <SearchBar />

      <div className="mb-2">
        {/* checkbox */}
        <div className="mb-8 flex justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox id="synopsis" />
            <label htmlFor="synopsis" className="text-sm font-medium">
              Include synopsis in search
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
              <Button variant="light-gray">
                <Eye className="size-4" /> Assistidos
              </Button>
              <Button variant="light-gray">
                <Heart className="size-4" /> Favoritos
              </Button>
              <Button variant="light-gray">
                <NotebookPen className="size-4" /> Com notas
              </Button>

              <Select>
                <SelectTrigger className="w-[200px]">
                  <Star className="size-4" />
                  <SelectValue placeholder="Classificação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os filmes</SelectItem>
                  <SelectItem value="rated">Classificados</SelectItem>
                  <SelectItem value="unrated">Sem classificação</SelectItem>

                  <div className="my-1 border-t border-gray-200 opacity-30" />

                  <SelectItem value="5">
                    <div className="flex items-center gap-2">
                      <StarRating rating={5} />
                      <span>5 estrelas</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="4">
                    <div className="flex items-center gap-2">
                      <StarRating rating={4} />
                      <span>4 estrelas</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="3">
                    <div className="flex items-center gap-2">
                      <StarRating rating={3} />
                      <span>3 estrelas</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="2">
                    <div className="flex items-center gap-2">
                      <StarRating rating={2} />
                      <span>2 estrelas</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="1">
                    <div className="flex items-center gap-2">
                      <StarRating rating={1} />
                      <span>1 estrela</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </nav>
          <Button variant="light-gray">Limpar tudo</Button>
        </div>
        <div className="mb-8">
          <p className="text-sm text-gray-500"> Filtros ativos:</p>
        </div>
      </div>
    </>
  );
};

export default Nav;
