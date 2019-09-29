import { NextPage } from "next"
import ResultCard from "../components/results/ResultCard"
import Layout from "../components/website/Layout"

import { Card, makeStyles, Typography } from "@material-ui/core"
import { getStationData } from "../helpers/ResultCard"
import { IHubStation, ITrainStation, TravelMode } from "../interfaces/Departure"

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  }
}))

interface IProps {
  stations: Array<IHubStation | ITrainStation>
}

const Results: NextPage<IProps> = ({ stations }) => {
  const classes = useStyles()
  return (
    <Layout>
      {stations.length == 0 ? (
        <Card className={classes.root}>
          <Typography component="h1">No Station Found</Typography>
        </Card>
      ) : (
        stations.map((station, index) => (
          <ResultCard
            key={index}
            stationName={(station as any).name || (station as any).commonName}
            services={station.modes}
            stationId={station.id}
            lat={station.lat}
            long={station.lon}
          />
        ))
      )}
    </Layout>
  )
}

Results.getInitialProps = async (context) => {
  const { station } = context.query

  const stations = await getStationData(station as any)

  return {
    stations
  }
}

export default Results
