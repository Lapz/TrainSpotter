import axios from "axios"
import {
  IArrival,
  IDeparture,
  IHubStation,
  ITrainStation,
  StationStopType
} from "../interfaces/Departure"
import { createStationQueryUrl } from "./SearchBar"

export const getRailLogo = (railType: string) => {
  switch (railType) {
    case "tube":
      return "/static/tfl/tube.svg"

    case "national-rail":
      return "/static/tfl/national-rail.svg"

    case "tflrail":
      return "/static/tfl/tflrail.svg"
    case "bus":
      return "/static/tfl/bus.svg"
    case "overground":
      return "/static/tfl/overground.svg"
    case "dlr":
      return "/static/tfl/dlr.svg"

    default:
      return `unknown rail type: ${railType}`
  }
}

export const getStationData = async (text: string) => {
  const url = createStationQueryUrl(text)

  const res = await axios.get(url)

  const [hubs, stations] = completeMatches(res)

  const hubRequests = hubs.map((hub) => {
    return axios.get(`https://api.tfl.gov.uk/StopPoint/${hub.id}/`)
  })

  let hubData: any[] = (await axios.all(hubRequests)) as any

  hubData = hubData.map((hub) => {
    return filterHubIDS(hub.data as IHubStation)
  })

  const mergedArray = [...hubData, ...stations] as any

  return [].concat.apply([], mergedArray) as Array<IHubStation | ITrainStation>
}

export const completeMatches = (res: any) => {
  const trainStations: ITrainStation[] = res.data.matches

  const hubStations = trainStations.filter((station) => {
    if (station.id.split("")[0] === "H") {
      return true
    }
  })

  const normalStations = trainStations.filter((station) => {
    if (station.id.split("")[0] !== "H") {
      return true
    }
  })

  return [hubStations, normalStations]
}

export const filterHubIDS = (hubData: IHubStation) => {
  const allIds = hubData.children
  const tubeIds = allIds.filter((stationData) => {
    return (
      stationData.stopType === StationStopType.NAPTAN_METRO ||
      stationData.stopType === StationStopType.NAPTAN_RAIL
    )
  })
  return tubeIds
}

export const getDepartureData = async (stationId: string) => {
  const url = `https://api.tfl.gov.uk/StopPoint/${stationId}/Arrivals?mode=tube`

  const res = await axios.get(url)

  return filterTrains(stationId, res.data as IArrival[])
}

export const filterTrains = (stationId: string, trains: IArrival[]) => {
  const outBoundStations = trains.filter((train) => {
    return train.direction === "outbound"
  })

  const inBoundStations = trains.filter((train) => {
    return (
      train.direction === "inbound" || train.destinationNaptanId === stationId
    )
  })

  return [outBoundStations, inBoundStations]
}
// function hubIDStationRequest(hubIDSArray) {
//   var hubUrls = hubIDSArray.forEach(hubData => {
//     var hubReqUrl = createHubStationUrl(hubData.id);
//     return axios.get(hubReqUrl);
//   });
//   return hubUrls;
// }
