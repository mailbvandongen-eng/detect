/** Compose all OpenLayers render surfaces, in DOM order and viewport coordinates. */
export function composeMapCanvas(target: HTMLElement, size: number[], title?: string): HTMLCanvasElement {
  const surfaces = Array.from(target.querySelectorAll<HTMLCanvasElement>('.ol-layer canvas'))
    .filter(canvas => canvas.width > 0 && canvas.height > 0)
  if (!surfaces.length) throw new Error('Geen kaartbeeld beschikbaar')
  const canvas = document.createElement('canvas')
  const scale = window.devicePixelRatio || 1
  const titleHeight = title === undefined ? 0 : 50
  canvas.width = Math.round(size[0] * scale)
  canvas.height = Math.round((size[1] + titleHeight) * scale)
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Geen tekenoppervlak beschikbaar')
  ctx.scale(scale, scale)
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, size[0], size[1] + titleHeight)
  ctx.save()
  ctx.translate(0, titleHeight)
  ctx.beginPath(); ctx.rect(0, 0, size[0], size[1]); ctx.clip()
  for (const surface of surfaces) {
    ctx.save()
    const opacity = surface.parentElement?.style.opacity || surface.style.opacity
    ctx.globalAlpha = opacity === '' || opacity === undefined ? 1 : Number(opacity)
    const transform = surface.style.transform
    if (transform) {
      const matrix = new DOMMatrix(transform)
      ctx.transform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.e, matrix.f)
    } else {
      ctx.scale(parseFloat(surface.style.width || String(size[0])) / surface.width,
        parseFloat(surface.style.height || String(size[1])) / surface.height)
    }
    const background = surface.parentElement?.style.backgroundColor
    if (background) { ctx.fillStyle = background; ctx.fillRect(0, 0, surface.width, surface.height) }
    ctx.drawImage(surface, 0, 0)
    ctx.restore()
  }
  ctx.restore()
  if (title !== undefined) {
    ctx.fillStyle = '#1f2937'; ctx.font = 'bold 24px system-ui'; ctx.textAlign = 'center'
    ctx.fillText(title, size[0] / 2, 35)
  }
  ctx.fillStyle = '#6b7280'; ctx.font = '12px system-ui'; ctx.textAlign = 'left'
  ctx.fillText('Detect', 10, size[1] + titleHeight - 10)
  ctx.textAlign = 'right'
  ctx.fillText(new Date().toLocaleString('nl-NL'), size[0] - 10, size[1] + titleHeight - 10)
  return canvas
}
