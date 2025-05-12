import { fireEvent, render, screen } from "@testing-library/react";

import { FilmRatingDialog } from "@/components/sections/filmRatingDialog";

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

jest.mock("@/components/ui/starRating", () => ({
  StarRating: ({ rating, onRatingChange }: StarRatingProps) => (
    <div>
      <button onClick={() => onRatingChange(rating + 1)}>
        Aumentar avaliação
      </button>
      <span>{rating}</span>
    </div>
  ),
}));

describe("FilmRatingDialog", () => {
  it("Renderiza corretamente com os props iniciais", () => {
    render(
      <FilmRatingDialog
        open={true}
        onOpenChange={() => {}}
        filmId="1"
        onSave={jest.fn()}
      />,
    );

    expect(screen.getByText("Classificar Filme")).toBeInTheDocument();
    expect(screen.getByText("Selecione uma avaliação")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Digite suas notas sobre o filme..."),
    ).toBeInTheDocument();
  });

  it("Atualiza a avaliação ao clicar no botão de aumentar avaliação", async () => {
    render(
      <FilmRatingDialog
        open={true}
        onOpenChange={() => {}}
        filmId="1"
        onSave={jest.fn()}
      />,
    );

    const ratingText = screen.getByText("0");

    fireEvent.click(screen.getByText("Aumentar avaliação"));

    expect(ratingText).toHaveTextContent("1");
  });

  it("Atualiza a nota corretamente", async () => {
    render(
      <FilmRatingDialog
        open={true}
        onOpenChange={() => {}}
        filmId="1"
        onSave={jest.fn()}
      />,
    );

    const textarea = screen.getByPlaceholderText(
      "Digite suas notas sobre o filme...",
    );

    fireEvent.change(textarea, { target: { value: "Excelente filme!" } });

    expect(textarea).toHaveValue("Excelente filme!");
  });

  it("Chama onSave com a avaliação e a nota quando salvar", async () => {
    const mockOnSave = jest.fn();
    render(
      <FilmRatingDialog
        open={true}
        onOpenChange={() => {}}
        filmId="1"
        onSave={mockOnSave}
      />,
    );

    fireEvent.click(screen.getByText("Aumentar avaliação"));
    fireEvent.change(
      screen.getByPlaceholderText("Digite suas notas sobre o filme..."),
      { target: { value: "Ótimo filme!" } },
    );

    const saveButton = screen.getByText("Salvar");

    fireEvent.click(saveButton);

    expect(mockOnSave).toHaveBeenCalledWith(1, "Ótimo filme!");
  });
});
