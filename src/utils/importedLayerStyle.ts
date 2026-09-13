/**
 * Kleine, vaste puntschaal voor geïmporteerde lagen.
 * Ver uit beeld blijven punten bescheiden; dichtbij worden ze beter aanklikbaar.
 */
export function getAutomaticImportedPointRadius(resolution: number): number {
  if (resolution > 80) return 2
  if (resolution > 20) return 3
  if (resolution > 5) return 4
  return 5
}
