import { render, screen } from "@testing-library/react";

import Header from "./header";

describe("Teste de componente Header", () => {
  it("Renderiza corretamente o título e descrição", () => {
    render(<Header />);

    const title = screen.getByText("Studio Ghibli Films");
    expect(title).toBeInTheDocument();

    const subtitle = screen.getByText(
      "Explore o mundo mágico dos filmes do estúdio Ghibli. Marque seus favoritos e acompanhe suas animações assistidas.",
    );
    expect(subtitle).toBeInTheDocument();
  });
});
