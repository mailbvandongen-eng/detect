/**
 * Vaste stapelvolgorde voor vlakken- en rasterlagen, bovenste eerst.
 *
 * Zonder vaste z-index legt OpenLayers een laag bovenop zodra hij voor het
 * eerst wordt aangezet, waardoor de volgorde van toeval afhing. Deze lagen
 * krijgen een z-index onder 10, zodat punt- en lijnlagen (AMK 10–11,
 * Romeinse wegen 20, hunebedden 25, Frankrijk 20–34) er altijd boven liggen.
 * De transparantieregelaar toont lagen in dezelfde volgorde.
 */
export const LAYER_STACK_ORDER = [
  'Kadastrale Grenzen',
  'Geomorfologie',
  'Gewaspercelen',
  'Bodemkaart',
  'IKAW',
  'Kansenkaart',
  'Essen',
  'Veengebieden',
  'FAMKE Steentijd',
  'FAMKE IJzertijd',
  'UIKAV Punten',
  'UIKAV Vlakken',
  'UIKAV Buffer',
  'UIKAV Expert',
  'UIKAV Indeling',
  'Archeo Onderzoeken',
  'Relictenkaart Vlakken',
  'Verdedigingslinies',
  'Inundatiegebieden',
  'AHN4 Hillshade Kleur',
  'AHN4 Multi-Hillshade NL',
  'AHN4 Hillshade NL',
  'AHN 0.5m',
  'AHN4 Hoogtekaart Kleur',
  'Paleokaart 800 n.Chr.',
  'Paleokaart 100 n.Chr.',
  'Paleokaart 500 v.Chr.',
  'Paleokaart 1500 v.Chr.',
  'Paleokaart 2750 v.Chr.',
  'Paleokaart 5500 v.Chr.',
  'Paleokaart 9000 v.Chr.',
  'TMK 1850',
  'Bonnebladen 1900',
] as const

const TOP_Z = 9.5
const STEP = 8 / LAYER_STACK_ORDER.length

/** Vaste z-index voor een laag uit de stapelvolgorde, anders undefined. */
export function getStackZIndex(name: string): number | undefined {
  const index = (LAYER_STACK_ORDER as readonly string[]).indexOf(name)
  return index === -1 ? undefined : TOP_Z - index * STEP
}
