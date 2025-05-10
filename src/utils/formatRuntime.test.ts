import { formatRuntime } from "@/utils/formatRuntime";

describe("Teste para função de formatação de horas", () => {
  test("formata corretamente minutos menores que 60", () => {
    expect(formatRuntime(0)).toBe("0min");
    expect(formatRuntime(30)).toBe("30min");
    expect(formatRuntime(59)).toBe("59min");
  });

  test("formata corretamente 60 minutos como 1 hora", () => {
    expect(formatRuntime(60)).toBe("1h 0min");
  });

  test("formata corretamente minutos maiores que 60", () => {
    expect(formatRuntime(90)).toBe("1h 30min");
    expect(formatRuntime(125)).toBe("2h 5min");
    expect(formatRuntime(183)).toBe("3h 3min");
  });

  test("lida corretamente com strings como entrada", () => {
    expect(formatRuntime("45")).toBe("45min");
    expect(formatRuntime("120")).toBe("2h 0min");
    expect(formatRuntime("75")).toBe("1h 15min");
  });
});
