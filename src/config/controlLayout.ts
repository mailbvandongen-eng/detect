/**
 * Vast knoppenschema voor de kaart.
 *
 * Elke kaartknop heeft één vaste plek in één dok. De volgorde in de lijst is
 * de volgorde op het scherm. Een verborgen knop laat geen gat achter: de
 * zichtbare knoppen achter hem schuiven door. Een nieuwe knop voeg je hier
 * toe op de gewenste plek en vraag je in het component op met
 * `useControlSlot('<id>', zichtbaar)`.
 */

export const CONTROL_STEP = 48 // 44 px knop + 4 px tussenruimte
export const CONTROL_EDGE = 8

const SAFE_TOP = 'max(0.5rem, env(safe-area-inset-top, 0.5rem))'

export type ControlDockId = 'topRight' | 'topRow' | 'left' | 'bottomLeft' | 'bottomRight' | 'bottomRow'

export const CONTROL_LAYOUT = {
  /** Rechterkolom, van boven naar beneden. */
  topRight: ['menu', 'layers', 'compass'],
  /** Bovenste rij, van rechts naar links naast de menuknop. */
  topRow: ['search'],
  /** Linkerkolom onder het weerblok, van boven naar beneden. */
  left: ['measure', 'draw', 'print'],
  /** Linkerkolom onderaan, van beneden naar boven. */
  bottomLeft: ['reset', 'presets', 'monumentFilter'],
  /** Rechterkolom onderaan, van beneden naar boven; GPS staat in de hoek. */
  bottomRight: ['gps', 'opacity', 'timeTravel'],
  /** Onderste rij, van rechts naar links naast de GPS-knop. */
  bottomRow: ['vondst', 'route', 'routeExtra'],
} as const satisfies Record<ControlDockId, readonly string[]>

export type ControlId = (typeof CONTROL_LAYOUT)[ControlDockId][number]

export function getControlDock(id: ControlId): ControlDockId {
  for (const dock of Object.keys(CONTROL_LAYOUT) as ControlDockId[]) {
    if ((CONTROL_LAYOUT[dock] as readonly string[]).includes(id)) return dock
  }
  throw new Error(`Onbekende kaartknop: ${id}`)
}

/** Plaats van een knop binnen zijn dok, alleen geteld over zichtbare knoppen. */
export function getControlIndex(id: ControlId, visible: ReadonlySet<string>): number {
  const order = CONTROL_LAYOUT[getControlDock(id)] as readonly string[]
  return order.filter(other => other === id || visible.has(other)).indexOf(id)
}

export interface ControlPosition {
  top?: string
  bottom?: string
  left?: string
  right?: string
}

export function getControlPosition(id: ControlId, visible: ReadonlySet<string>): ControlPosition {
  const offset = getControlIndex(id, visible) * CONTROL_STEP
  const px = (value: number) => `${value}px`
  switch (getControlDock(id)) {
    case 'topRight':
      return { top: `calc(${SAFE_TOP} + ${offset}px)`, right: px(CONTROL_EDGE) }
    case 'topRow':
      return { top: SAFE_TOP, right: px(CONTROL_EDGE + CONTROL_STEP + offset) }
    case 'left':
      return { top: `calc(${SAFE_TOP} + ${82 + offset}px)`, left: px(CONTROL_EDGE) }
    case 'bottomLeft':
      return { bottom: px(CONTROL_EDGE + offset), left: px(CONTROL_EDGE) }
    case 'bottomRight':
      return { bottom: px(CONTROL_EDGE + offset), right: px(CONTROL_EDGE) }
    case 'bottomRow':
      return { bottom: px(CONTROL_EDGE), right: px(CONTROL_EDGE + CONTROL_STEP + offset) }
  }
}
