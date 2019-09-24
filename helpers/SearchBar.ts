export const createStationQueryUrl = (query: string) =>
  `https://api.tfl.gov.uk/Stoppoint/search/${query}?modes=tube`
