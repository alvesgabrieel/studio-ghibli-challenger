import { act } from "@testing-library/react";
import { toast as importedToast } from "sonner";

import { useFilmStore } from "@/store/filmStore";
import { Film } from "@/types/film";

interface MockToast {
  success: jest.Mock;
  warning: jest.Mock;
  error: jest.Mock;
}

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    warning: jest.fn(),
    error: jest.fn(),
  },
}));

const toast = importedToast as unknown as MockToast;

const ghibliFilms: Film[] = [
  {
    id: "1",
    title: "Castle in the Sky",
    description:
      "The adventures of Pazu and Sheeta in search of the legendary floating castle",
    director: "Hayao Miyazaki",
    producer: "Isao Takahata",
    release_date: "1986",
    rt_score: "95",
    running_time: "124",
    image: "pazu.jpg",
  },
  {
    id: "2",
    title: "My Neighbor Totoro",
    description:
      "The story of two sisters who move to the countryside and befriend magical creatures",
    director: "Hayao Miyazaki",
    producer: "Hayao Miyazaki",
    release_date: "1988",
    rt_score: "93",
    running_time: "86",
    image: "totoro.jpg",
  },
  {
    id: "3",
    title: "Kiki's Delivery Service",
    description: "A young witch starts a delivery service in a new city",
    director: "Hayao Miyazaki",
    producer: "Hayao Miyazaki",
    release_date: "1989",
    rt_score: "97",
    running_time: "102",
    image: "kiki.jpg",
  },
  {
    id: "4",
    title: "Princess Mononoke",
    description:
      "Prince Ashitaka gets involved in the struggle between forest gods and humans",
    director: "Hayao Miyazaki",
    producer: "Toshio Suzuki",
    release_date: "1997",
    rt_score: "92",
    running_time: "134",
    image: "mononoke.jpg",
  },
];

describe("Store de Filmes do Studio Ghibli", () => {
  beforeEach(() => {
    useFilmStore.setState({
      films: [],
      searchTerm: "",
      sortBy: null,
      filters: {
        favoritesOnly: false,
        watchedOnly: false,
        withNotesOnly: false,
        minRating: null,
        includeSynopsis: false,
      },
    });
    jest.clearAllMocks();
  });

  test("deve inicializar com valores padrão", () => {
    const state = useFilmStore.getState();
    expect(state.films).toEqual([]);
    expect(state.searchTerm).toBe("");
  });

  describe("Manipulação de Filmes", () => {
    test("deve adicionar filmes com metadados padrão", () => {
      act(() => {
        useFilmStore.getState().setFilms(ghibliFilms);
      });

      const { films } = useFilmStore.getState();
      expect(films).toHaveLength(4);
      expect(films[0]).toEqual({
        ...ghibliFilms[0],
        isFavorite: false,
        isWatched: false,
        note: "",
        userRating: 0,
      });
    });

    test("deve alternar status de favorito", () => {
      act(() => {
        useFilmStore.getState().setFilms(ghibliFilms);
      });

      act(() => {
        useFilmStore.getState().toggleFavorite("1");
      });

      let film = useFilmStore.getState().films.find((f) => f.id === "1");
      expect(film?.isFavorite).toBe(true);
      expect(toast.success).toHaveBeenCalledWith(
        "Filme adicionado aos favoritos!",
      );

      act(() => {
        useFilmStore.getState().toggleFavorite("1");
      });

      film = useFilmStore.getState().films.find((f) => f.id === "1");
      expect(film?.isFavorite).toBe(false);
      expect(toast.warning).toHaveBeenCalledWith(
        "Filme removido dos favoritos!",
      );
    });

    test("deve adicionar nota a um filme", () => {
      act(() => {
        useFilmStore.getState().setFilms(ghibliFilms);
        useFilmStore.getState().setNote("2", "Ótimo filme para crianças");
      });

      const film = useFilmStore.getState().films.find((f) => f.id === "2");
      expect(film?.note).toBe("Ótimo filme para crianças");
    });
  });

  describe("Filtros e Busca", () => {
    beforeEach(() => {
      act(() => {
        useFilmStore.getState().setFilms(ghibliFilms);

        useFilmStore.getState().toggleFavorite("1");
        useFilmStore.getState().toggleFavorite("3");
        useFilmStore.getState().toggleWatched("1");
        useFilmStore.getState().toggleWatched("2");
        useFilmStore.getState().setNote("1", "Clássico absoluto");

        const films = useFilmStore.getState().films;
        const updatedFilms = films.map((film) => {
          const ratings: Record<string, number> = {
            "1": 5,
            "2": 4,
            "3": 3,
            "4": 4,
          };
          return {
            ...film,
            userRating: ratings[film.id] || 0,
          };
        });

        useFilmStore.setState({ films: updatedFilms });
      });
    });

    test("deve filtrar por favoritos", () => {
      act(() => {
        useFilmStore.getState().setFilter({ favoritesOnly: true });
      });

      const result = useFilmStore.getState().getFilteredFilms();
      expect(result).toHaveLength(2);
      expect(result.map((f) => f.id)).toEqual(["1", "3"]);
    });

    test("deve filtrar por assistidos", () => {
      act(() => {
        useFilmStore.getState().setFilter({ watchedOnly: true });
      });

      const result = useFilmStore.getState().getFilteredFilms();
      expect(result).toHaveLength(2);
      expect(result.map((f) => f.id)).toEqual(["1", "2"]);
    });

    test("deve buscar por título", () => {
      act(() => {
        useFilmStore.getState().setSearchTerm("Totoro");
      });

      const result = useFilmStore.getState().getFilteredFilms();
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe("My Neighbor Totoro");
    });
  });

  describe("Ordenação", () => {
    beforeEach(() => {
      act(() => {
        useFilmStore.getState().setFilms(ghibliFilms);
      });
    });

    test("deve ordenar por título (A-Z)", () => {
      act(() => {
        useFilmStore.getState().setSort("title-asc");
      });

      const result = useFilmStore.getState().getFilteredFilms();
      expect(result.map((f) => f.title)).toEqual([
        "Castle in the Sky",
        "Kiki's Delivery Service",
        "My Neighbor Totoro",
        "Princess Mononoke",
      ]);
    });

    test("deve ordenar por duração (crescente)", () => {
      act(() => {
        useFilmStore.getState().setSort("duration-asc");
      });

      const result = useFilmStore.getState().getFilteredFilms();
      expect(result.map((f) => f.title)).toEqual([
        "My Neighbor Totoro",
        "Kiki's Delivery Service",
        "Castle in the Sky",
        "Princess Mononoke",
      ]);
    });

    test("deve ordenar por avaliação (decrescente)", () => {
      act(() => {
        useFilmStore.getState().setSort("score-desc");
      });

      const result = useFilmStore.getState().getFilteredFilms();
      expect(result.map((f) => f.title)).toEqual([
        "Kiki's Delivery Service",
        "Castle in the Sky",
        "My Neighbor Totoro",
        "Princess Mononoke",
      ]);
    });
  });
});
