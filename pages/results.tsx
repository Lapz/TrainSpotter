import { NextPage } from "next"
import ResultCard from "../components/results/ResultCard"
import Layout from "../components/website/Layout"

import { getStationData } from "../helpers/ResultCard"
import { IHubStation, ITrainStation, TravelMode } from "../interfaces/Departure"

interface IProps {
  stations: Array<IHubStation | ITrainStation>
}

const Results: NextPage<IProps> = ({ stations }) => (
  <Layout>
    {stations.map((station, index) => (
      <ResultCard
        key={index}
        stationName={(station as any).name || (station as any).commonName}
        services={station.modes}
        stationId={station.id}
      />
    ))}
  </Layout>
)

Results.getInitialProps = async (context) => {
  const { station } = context.query

  const stations = await getStationData(station as any)

  return {
    stations
  }
}

export default Results
