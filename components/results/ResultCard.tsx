import {
  CircularProgress,
  Avatar,
  Grid,
  makeStyles,
  Paper,
  Typography,
  IconButton,
  Collapse
} from "@material-ui/core"
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp"

import Link from "next/link"
import { getRailLogo, getDepartureData } from "../../helpers/ResultCard"
import { IDeparture, TravelMode, IArrival } from "../../interfaces/Departure"
import DestinationTable from "./DestinationTable"
import { useState } from "react"
import useAsyncEffect from "use-async-effect"
import MapIcon from "@material-ui/icons/Map"
import ExploreIcon from "@material-ui/icons/Explore"
import InfoDialog from "../website/InfoDialog"
import MiniMap from "./MiniMap"

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
  lat: number
  long: number
  stationName: string
  services: TravelMode[]
  stationId: string
}

const ResultCard: React.FunctionComponent<IProps> = ({
  stationName,
  stationId,
  services,
  lat,
  long
}) => {
  const classes = useStyles()

  const [inboundTrains, setInboundTrains] = useState<IArrival[]>()
  const [outboundTrains, setOutboundTrains] = useState<IArrival[]>()

  const [loadingInbound, setLoadingInbound] = useState<boolean>(true)
  const [loadingOutbound, setLoadingOutbound] = useState<boolean>(true)
  const [mapOpen, setMapOpen] = useState<boolean>(false)
  const [collapseInbound, setCollapseInbound] = useState<boolean>(false)

  const [collapseOutbound, setCollapseOutbound] = useState<boolean>(false)

  const handleMapOpen = () => {
    setMapOpen(true)
  }

  const handleCollapseInbound = () => {
    setCollapseInbound(!collapseInbound)
  }

  const handleCollapseOutbound = () => {
    setCollapseOutbound(!collapseOutbound)
  }

  const handleMapClose = () => {
    setMapOpen(false)
  }

  console.log(stationId)
  useAsyncEffect(async () => {
    const [outbound, inbound] = await getDepartureData(stationId)

    console.log(outbound, inbound)
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

        <IconButton
          onClick={() => {
            window.location.href = `https://www.google.com/maps/dir/?api=1&destination=${lat},${long}`
          }}
        >
          <ExploreIcon />
        </IconButton>

        <IconButton onClick={handleMapOpen}>
          <MapIcon />
        </IconButton>
        <InfoDialog title="Map" open={mapOpen} onClose={handleMapClose}>
          <MiniMap
            width="auto"
            height={400}
            mode="place"
            query={stationName}
            lat={lat}
            long={long}
          />
        </InfoDialog>
      </Grid>

      <Grid container>
        <Typography className={classes.text} component="h2">
          Inbound departures
        </Typography>
        <IconButton onClick={handleCollapseInbound}>
          {collapseInbound ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </IconButton>
      </Grid>

      {loadingInbound ? (
        <CircularProgress />
      ) : (
        <Collapse in={collapseInbound}>
          <DestinationTable departures={inboundTrains ? inboundTrains : []} />
        </Collapse>
      )}
      <Grid container>
        <Typography className={classes.text} component="h2">
          Outbound departures
        </Typography>
        <IconButton onClick={handleCollapseOutbound}>
          {collapseOutbound ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </IconButton>
      </Grid>
      {loadingOutbound ? (
        <CircularProgress />
      ) : (
        <Collapse in={collapseOutbound}>
          <DestinationTable departures={outboundTrains ? outboundTrains : []} />
        </Collapse>
      )}
    </Paper>
  )
}

export default ResultCard
