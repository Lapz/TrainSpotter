import {
  Avatar,
  CircularProgress,
  Collapse,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Typography
} from "@material-ui/core"
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp"
import StarBorderIcon from "@material-ui/icons/StarBorder"
import StarIcon from "@material-ui/icons/Star"
import ExploreIcon from "@material-ui/icons/Explore"
import MapIcon from "@material-ui/icons/Map"
import firebase from "firebase/app"
import Link from "next/link"
import { useState } from "react"
import useAsyncEffect from "use-async-effect"
import { getDepartureData, getRailLogo } from "../../helpers/ResultCard"
import { IArrival, TravelMode } from "../../interfaces/Departure"
import { useStore } from "../../stores"
import InfoDialog from "../website/InfoDialog"
import DestinationTable from "./DestinationTable"
import MiniMap from "./MiniMap"
import undefined from "firebase/empty-import"
// tslint:disable-next-line: no-var-requires
require("firebase/database")

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

  const store = useStore()

  const [inboundTrains, setInboundTrains] = useState<IArrival[]>()
  const [outboundTrains, setOutboundTrains] = useState<IArrival[]>()

  const [loadingInbound, setLoadingInbound] = useState<boolean>(true)
  const [loadingOutbound, setLoadingOutbound] = useState<boolean>(true)
  const [mapOpen, setMapOpen] = useState<boolean>(false)
  const [collapseInbound, setCollapseInbound] = useState<boolean>(false)

  const [collapseOutbound, setCollapseOutbound] = useState<boolean>(false)
  const [favourited, setFavourited] = useState<boolean>(false)

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

  const handleAddFav = async () => {
    const db = await firebase.database()
    const userFavouritesRefs = db.ref(
      `users/${store.user ? store.user.uid : ""}/favouriteStations`
    )

    let entry: string = ""

    await userFavouritesRefs.on("value", (snapshot) => {
      entry = snapshot.val()[stationName]
    })

    if (entry) {
      const map: {
        [key: string]: null
      } = {}
      map[stationName] = null
      await userFavouritesRefs.set(map)
    } else {
      const map: {
        [key: string]: string
      } = {}
      map[stationName] = stationId
      await userFavouritesRefs.set(map)
    }
  }

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

        {Boolean(store.user) ? (
          <IconButton onClick={handleAddFav}>
            {favourited ? <StarIcon /> : <StarBorderIcon />}
          </IconButton>
        ) : null}
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
