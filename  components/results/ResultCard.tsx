import {
  CircularProgress,
  Avatar,
  Grid,
  makeStyles,
  Paper,
  Typography
} from "@material-ui/core"
import { getRailLogo, getDepartureData } from "../../helpers/ResultCard"
import { IDeparture, TravelMode, IArrival } from "../../interfaces/Departure"
import DestinationTable from "./DestinationTable"
import { useState } from "react"
import useAsyncEffect from "use-async-effect"

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2)
  },
  logo: {
    marginLeft: theme.spacing(1)
  },
  text: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  }
}))

interface IProps {
  // inboundTrains: IDeparture[]
  // outboundTrains: IDeparture[]
  stationName: string
  services: TravelMode[]
  stationId: string
}

const ResultCard: React.FunctionComponent<IProps> = ({
  stationName,
  stationId,
  services
}) => {
  const classes = useStyles()

  const [inboundTrains, setInboundTrains] = useState<IArrival[]>()
  const [outboundTrains, setOutboundTrains] = useState<IArrival[]>()

  const [loadingInbound, setLoadingInbound] = useState<boolean>(true)
  const [loadingOutbound, setLoadingOutbound] = useState<boolean>(true)

  useAsyncEffect(async () => {
    const [outbound, inbound] = await getDepartureData(stationId)
    setInboundTrains(inbound)
    setLoadingInbound(false)
    setOutboundTrains(outbound)
    setLoadingOutbound(false)
  }, [])

  return (
    <Paper className={classes.root}>
      <Grid container justify="center" alignItems="center">
        <Typography component="h1">{stationName}</Typography>

        {services.map((service, index) => (
          <Avatar
            key={`${service}-${index}`}
            className={classes.logo}
            alt="img"
            src={getRailLogo(service)}
          />
        ))}
      </Grid>

      <Typography className={classes.text} component="h2">
        Inbound departures
      </Typography>
      {loadingInbound ? (
        <CircularProgress />
      ) : (
        <DestinationTable departures={inboundTrains ? inboundTrains : []} />
      )}
      <Typography className={classes.text} component="h2">
        Outbound departures
      </Typography>
      {loadingOutbound ? (
        <CircularProgress />
      ) : (
        <DestinationTable departures={outboundTrains ? outboundTrains : []} />
      )}
    </Paper>
  )
}

export default ResultCard
