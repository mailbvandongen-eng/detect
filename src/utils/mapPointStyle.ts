import { Circle, Fill, Stroke, Style } from 'ol/style'

/** One scale for all place markers, in CSS pixels (also on high-DPI phones). */
export function getMapPointRadius(resolution: number): number {
  if (resolution > 80) return 3
  if (resolution > 20) return 4
  if (resolution > 5) return 5
  return 6
}

export function createMapPointImage(color: string, resolution: number): Circle {
  return new Circle({
    radius: getMapPointRadius(resolution),
    fill: new Fill({ color }),
    stroke: new Stroke({ color: 'rgba(255,255,255,0.85)', width: 0.75 }),
  })
}

const styles = new Map<string, Style>()
export function getMapPointStyle(color: string, resolution: number): Style {
  const key = `${color}:${getMapPointRadius(resolution)}`
  let style = styles.get(key)
  if (!style) {
    style = new Style({ image: createMapPointImage(color, resolution) })
    styles.set(key, style)
  }
  return style
}
