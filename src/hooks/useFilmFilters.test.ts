import { act, renderHook } from "@testing-library/react";

import { useFilmSearch } from "@/hooks/useFilmFilters";
import { Film } from "@/types/film";

const mockFilms: Film[] = [
  {
    id: "1",
    title: "Howl's Moving Castle",
    release_date: "2004",
    running_time: "119",
    rt_score: "87",
    description:
      "When an unconfident young woman is cursed with an old body by a spiteful witch",
    director: "Hayao Miyazaki",
    producer: "Toshio Suzuki",
    image: "howl.jpg",
  },
  {
    id: "2",
    title: "Spirited Away",
    release_date: "2001",
    running_time: "125",
    rt_score: "97",
    description: "A young girl wanders into a world of gods and spirits",
    director: "Hayao Miyazaki",
    producer: "Toshio Suzuki",
    image: "chihiro.jpg",
  },
  {
    id: "3",
    title: "Princess Mononoke",
    release_date: "1997",
    running_time: "134",
    rt_score: "93",
    description:
      "A prince becomes involved in the struggle between forest gods and humans",
    director: "Hayao Miyazaki",
    producer: "Toshio Suzuki",
    image: "mononoke.jpg",
  },
];

describe("useFilmSearch", () => {
  it("deve retornar todos os filmes quando searchTerm estiver vazio", () => {
    const { result } = renderHook(() => useFilmSearch(mockFilms));

    expect(result.current.filteredFilms).toEqual(mockFilms);
    expect(result.current.searchTerm).toBe("");
  });

  it("deve filtrar filmes corretamente pelo título", () => {
    const { result } = renderHook(() => useFilmSearch(mockFilms));

    act(() => {
      result.current.setSearchTerm("spir");
    });

    expect(result.current.filteredFilms).toEqual([
      {
        id: "2",
        title: "Spirited Away",
        release_date: "2001",
        running_time: "125",
        rt_score: "97",
        description: "A young girl wanders into a world of gods and spirits",
        director: "Hayao Miyazaki",
        producer: "Toshio Suzuki",
        image: "chihiro.jpg",
      },
    ]);
  });

  it("deve ser case insensitive", () => {
    const { result } = renderHook(() => useFilmSearch(mockFilms));

    act(() => {
      result.current.setSearchTerm("MONONOKE");
    });

    expect(result.current.filteredFilms).toEqual([
      {
        id: "3",
        title: "Princess Mononoke",
        release_date: "1997",
        running_time: "134",
        rt_score: "93",
        description:
          "A prince becomes involved in the struggle between forest gods and humans",
        director: "Hayao Miyazaki",
        producer: "Toshio Suzuki",
        image: "mononoke.jpg",
      },
    ]);
  });

  it("deve retornar array vazio quando não houver matches", () => {
    const { result } = renderHook(() => useFilmSearch(mockFilms));

    act(() => {
      result.current.setSearchTerm("xyz");
    });

    expect(result.current.filteredFilms).toEqual([]);
  });
});
