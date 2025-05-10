import { render, screen } from "@testing-library/react";

import Nav from "./nav";

jest.mock("@/store/filmStore", () => ({
  useFilmStore: () => ({
    searchTerm: "",
    setSearchTerm: jest.fn(),
    filters: {
      favoritesOnly: false,
      watchedOnly: false,
      withNotesOnly: false,
      minRating: null,
      includeSynopsis: false,
    },
    setFilter: jest.fn(),
    clearAllFilters: jest.fn(),
    sortBy: null,
    setSort: jest.fn(),
  }),
}));

it("Renderização de todos elementos", () => {
  render(<Nav />);

  expect(screen.getByLabelText("Incluir sinopse na busca")).toBeInTheDocument();

  expect(screen.getByText("Assistidos")).toBeInTheDocument();
  expect(screen.getByText("Favoritos")).toBeInTheDocument();
  expect(screen.getByText("Com notas")).toBeInTheDocument();

  const selectButtons = screen.getAllByRole("combobox");
  expect(selectButtons[1]).toBeInTheDocument();

  expect(screen.getByText("Limpar tudo")).toBeInTheDocument();
});
