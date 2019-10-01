export interface IDeparture {
  line: string
  platform?: string
  destination: string
  eta: number
}

export enum TravelMode {
  TUBE = "tube",
  BUS = "bus",
  NATIONAL_RAIL = "national-rail",
  TFL_RAIL = "tflrail"
}

export interface ITrainStation {
  modes: TravelMode[]
  zone: string
  id: "string"
  name: string
  lat: number
  lon: number
}

export interface IHubStation {
  naptanId: string
  modes: TravelMode[]
  id: string
  icsCode: string
  commonName: string
  children: IHubStation[]
  stopType: StationStopType
  lat: number
  lon: number
}

export enum StationStopType {
  INTERCHANGE = "TransportInterchange",
  NAPTAN_METRO = "NaptanMetroStation",
  NAPTAN_RAIL = "NaptanRailStation"
}

export interface IArrival {
  id: string
  naptanId: string
  stationName: string
  platformName: string
  lineName: string
  destinationName: string
  direction: "inbound" | "outbound"
  towards: string
  timeToStation: number
  destinationNaptanId: string
}
