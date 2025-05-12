import { fireEvent, render, screen } from "@testing-library/react";

import MainContent from "@/components/sections/mainContent";
import { Film } from "@/types/film";

interface TestFilm extends Film {
  isFavorite?: boolean;
  isWatched?: boolean;
  userRating?: number;
  note?: string;
}

jest.mock("zustand");

const mockUseFilmStore = jest.fn();
jest.mock("@/store/filmStore", () => ({
  __esModule: true,
  useFilmStore: () => mockUseFilmStore(),
}));

jest.mock("lucide-react", () => ({
  Calendar: () => <div>CalendarIcon</div>,
  Clock: () => <div>ClockIcon</div>,
  Eye: () => <div>EyeIcon</div>,
  Heart: () => <div>HeartIcon</div>,
  NotebookPen: () => <div>NotebookPenIcon</div>,
  Star: () => <div>StarIcon</div>,
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    fill?: boolean;
    className?: string;
    sizes?: string;
    // eslint-disable-next-line @next/next/no-img-element
  }) => <img src={props.src} alt={props.alt} className={props.className} />,
}));

jest.mock("@/components/ui/starRating", () => ({
  StarRating: ({ rating }: { rating: number }) => (
    <div>StarRating: {rating}</div>
  ),
}));

jest.mock("@/components/sections/filmRatingDialog", () => ({
  FilmRatingDialog: jest.fn(() => null),
}));

describe("MainContent", () => {
  const mockFilms: TestFilm[] = [
    {
      id: "1",
      title: "My Neighbor Totoro",
      description: "Two sisters move to the country with their father...",
      director: "Hayao Miyazaki",
      producer: "Hayao Miyazaki",
      release_date: "1988",
      running_time: "86",
      rt_score: "93",
      image: "/totoro.jpg",
      isFavorite: false,
      isWatched: false,
    },
    {
      id: "2",
      title: "Spirited Away",
      description:
        "Spirited Away is an Oscar winning Japanese animated film about...",
      director: "Hayao Miyazaki",
      producer: "Toshio Suzuki",
      release_date: "2001",
      running_time: "125",
      rt_score: "97",
      image: "/spirited.jpg",
      isFavorite: true,
      isWatched: true,
      userRating: 4,
      note: "Animação linda",
    },
  ];

  beforeEach(() => {
    mockUseFilmStore.mockReset();
    mockUseFilmStore.mockImplementation(() => ({
      films: mockFilms,
      searchTerm: "",
      sortBy: null,
      filters: {
        favoritesOnly: false,
        watchedOnly: false,
        withNotesOnly: false,
        minRating: null,
        includeSynopsis: false,
      },
      toggleFavorite: jest.fn(),
      toggleWatched: jest.fn(),
      setNote: jest.fn(),
      setUserRating: jest.fn(),
      setFilms: jest.fn(),
      setSort: jest.fn(),
      setSearchTerm: jest.fn(),
      setFilter: jest.fn(),
      clearAllFilters: jest.fn(),
      getFilteredFilms: () => mockFilms,
    }));
  });

  it("deve renderizar cards de filme com informações básicas", () => {
    render(<MainContent />);

    expect(screen.getByText("My Neighbor Totoro")).toBeInTheDocument();
    expect(screen.getByText("Spirited Away")).toBeInTheDocument();

    expect(screen.getByText("1988")).toBeInTheDocument();
    expect(screen.getByText("2001")).toBeInTheDocument();
    const miyazakis = screen.getAllByText("Hayao Miyazaki");
    expect(miyazakis.length).toBeGreaterThan(0);
    expect(screen.getByText("Toshio Suzuki")).toBeInTheDocument();
    expect(screen.getByText("1h 26min")).toBeInTheDocument();
    expect(screen.getByText("2h 5min")).toBeInTheDocument();
    expect(screen.getByText("93%")).toBeInTheDocument();
    expect(screen.getByText("97%")).toBeInTheDocument();
  });

  it("deve chamar toggleWatched quando o botão Assistir for clicado", () => {
    const mockToggleWatched = jest.fn();
    mockUseFilmStore.mockImplementation(() => ({
      toggleWatched: mockToggleWatched,
      getFilteredFilms: () => mockFilms,
    }));

    render(<MainContent />);

    const watchButtons = screen.getAllByText("Assistir");
    fireEvent.click(watchButtons[0]);

    expect(mockToggleWatched).toHaveBeenCalledWith("1");
  });

  it("deve chamar toggleFavorite quando o botão Favoritar for clicado", () => {
    const mockToggleFavorite = jest.fn();
    mockUseFilmStore.mockImplementation(() => ({
      toggleFavorite: mockToggleFavorite,
      getFilteredFilms: () => mockFilms,
    }));

    render(<MainContent />);

    const favoriteButtons = screen.getAllByText("Favoritar");
    fireEvent.click(favoriteButtons[0]);

    expect(mockToggleFavorite).toHaveBeenCalledWith("1");
  });

  it("deve renderizar apenas filmes favoritos quando o filtro 'favoritesOnly' estiver ativo", () => {
    const filteredFavorites = [mockFilms[1]];

    mockUseFilmStore.mockImplementation(() => ({
      searchTerm: "",
      toggleFavorite: jest.fn(),
      toggleWatched: jest.fn(),
      setNote: jest.fn(),
      setUserRating: jest.fn(),
      getFilteredFilms: () => filteredFavorites,
      filters: {
        favoritesOnly: true,
        watchedOnly: false,
        withNotesOnly: false,
        minRating: null,
        includeSynopsis: false,
      },
    }));

    render(<MainContent />);

    expect(screen.getByText("Spirited Away")).toBeInTheDocument();

    expect(screen.queryByText("My Neighbor Totoro")).not.toBeInTheDocument();
  });

  it("deve renderizar apenas filmes assistidos quando apenas 'watchedOnly' estiver ativo", () => {
    mockUseFilmStore.mockImplementation(() => ({
      getFilteredFilms: () => mockFilms.filter((f) => f.isWatched),
      filters: {
        favoritesOnly: false,
        watchedOnly: true,
        withNotesOnly: false,
        minRating: null,
      },
    }));

    render(<MainContent />);
    expect(screen.getByText("Spirited Away")).toBeInTheDocument();
    expect(screen.queryByText("My Neighbor Totoro")).not.toBeInTheDocument();
  });

  it("deve renderizar apenas filmes com anotações quando 'withNotesOnly' estiver ativo", () => {
    mockUseFilmStore.mockImplementation(() => ({
      getFilteredFilms: () =>
        mockFilms.filter((f) => f.note && f.note.length > 0),
      filters: {
        favoritesOnly: false,
        watchedOnly: false,
        withNotesOnly: true,
        minRating: null,
      },
    }));

    render(<MainContent />);
    expect(screen.getByText("Spirited Away")).toBeInTheDocument();
    expect(screen.queryByText("My Neighbor Totoro")).not.toBeInTheDocument();
  });

  it("deve renderizar apenas filmes com avaliação maior ou igual a 4 quando 'minRating' estiver ativo", () => {
    mockUseFilmStore.mockImplementation(() => ({
      getFilteredFilms: () =>
        mockFilms.filter(
          (f) => f.userRating !== undefined && f.userRating >= 4,
        ),
      filters: {
        favoritesOnly: false,
        watchedOnly: false,
        withNotesOnly: false,
        minRating: 4,
      },
    }));

    render(<MainContent />);
    expect(screen.getByText("Spirited Away")).toBeInTheDocument();
    expect(screen.queryByText("My Neighbor Totoro")).not.toBeInTheDocument();
  });

  it("deve renderizar filmes ordenados por título de A a Z", () => {
    const sortedByTitle = [...mockFilms].sort((a, b) =>
      a.title.localeCompare(b.title),
    );

    mockUseFilmStore.mockImplementation(() => ({
      getFilteredFilms: () => sortedByTitle,
      filters: {},
      sortBy: "title-asc",
    }));

    render(<MainContent />);

    const titles = screen.getAllByRole("heading", { level: 3 });
    const renderedTitles = titles.map((el) => el.textContent);

    expect(renderedTitles).toEqual(
      ["My Neighbor Totoro", "Spirited Away"].sort(),
    );
  });

  it("deve renderizar filmes ordenados por duração (maior para o menor)", () => {
    const sortedByDurationDesc = [...mockFilms].sort(
      (a, b) => parseInt(b.running_time) - parseInt(a.running_time),
    );

    mockUseFilmStore.mockImplementation(() => ({
      getFilteredFilms: () => sortedByDurationDesc,
      filters: {},
      sortBy: "duration-desc",
    }));

    render(<MainContent />);

    const titles = screen.getAllByRole("heading", { level: 3 });
    const renderedTitles = titles.map((el) => el.textContent);

    expect(renderedTitles).toEqual(
      sortedByDurationDesc.map((film) => film.title),
    );
  });

  it("deve renderizar filmes ordenados por score (maior para menor)", () => {
    const sortedByScoreDesc = [...mockFilms].sort(
      (a, b) => parseInt(b.rt_score) - parseInt(a.rt_score),
    );

    mockUseFilmStore.mockImplementation(() => ({
      getFilteredFilms: () => sortedByScoreDesc,
      filters: {},
      sortBy: "score-desc",
    }));

    render(<MainContent />);

    const titles = screen.getAllByRole("heading", { level: 3 });
    const renderedTitles = titles.map((el) => el.textContent);

    expect(renderedTitles).toEqual(sortedByScoreDesc.map((film) => film.title));
  });

  it("deve renderizar filmes ordenados por userRating (maior para menor)", () => {
    const sortedByUserRatingDesc = [...mockFilms]
      .filter((f) => f.userRating !== undefined)
      .sort((a, b) => (b.userRating ?? 0) - (a.userRating ?? 0));

    mockUseFilmStore.mockImplementation(() => ({
      getFilteredFilms: () => sortedByUserRatingDesc,
      filters: {},
      sortBy: "userRating-desc",
    }));

    render(<MainContent />);
    const titles = screen.getAllByRole("heading", { level: 3 });
    const renderedTitles = titles.map((el) => el.textContent);

    expect(renderedTitles).toEqual(sortedByUserRatingDesc.map((f) => f.title));
  });
});
