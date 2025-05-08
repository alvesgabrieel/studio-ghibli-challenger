/**
 * Converte minutos para o formato horas e minutos
 * @param minutes Número total de minutos
 * @returns String formatada como "Xh Ymin" ou "Ymin" se menos de 1 hora
 */

export function formatRuntime(minutes: number | string): string {
  // Converte para número se for string
  const mins = typeof minutes === "string" ? parseInt(minutes) : minutes;

  if (isNaN(mins)) return "0min"; // Caso não seja um número válido

  if (mins < 60) {
    return `${mins}min`;
  }

  const hours = Math.floor(mins / 60);
  const remainingMinutes = mins % 60;

  return `${hours}h ${remainingMinutes}min`;
}
