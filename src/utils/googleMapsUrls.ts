const formatCoordinate = (latitude: number, longitude: number) => `${latitude},${longitude}`

export function buildGoogleMapsLocationUrl(latitude: number, longitude: number): string {
  const params = new URLSearchParams({
    api: '1',
    query: formatCoordinate(latitude, longitude)
  })

  return `https://www.google.com/maps/search/?${params.toString()}`
}

export function buildGoogleStreetViewUrl(latitude: number, longitude: number): string {
  const params = new URLSearchParams({
    api: '1',
    map_action: 'pano',
    viewpoint: formatCoordinate(latitude, longitude)
  })

  return `https://www.google.com/maps/@?${params.toString()}`
}
