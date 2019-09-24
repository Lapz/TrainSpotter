import { Avatar, Grid, makeStyles, Paper, Typography } from "@material-ui/core"
import { getRailLogo } from "../../helpers/ResultCard"
import { IDeparture } from "../../interfaces/Departure"
import DestinationTable from "./DestinationTable"

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
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
  inboundTrains: IDeparture[]
  outboundTrains: IDeparture[]
}

const ResultCard: React.FunctionComponent<IProps> = ({
  inboundTrains,
  outboundTrains
}) => {
  const classes = useStyles()
  return (
    <Paper className={classes.root}>
      <Grid container spacing={2}>
        <Grid xs={6} item container justify="center" alignItems="center">
          <Typography component="h1">Ealing Broadway</Typography>
        </Grid>
        <Grid item xs={6} md container>
          <Avatar
            className={classes.logo}
            alt="img"
            src={getRailLogo("tflrail")}
          />
          <Avatar
            className={classes.logo}
            alt="img"
            src={getRailLogo("national-rail")}
          />
        </Grid>
      </Grid>

      <Typography className={classes.text} component="h2">
        Inbound departures
      </Typography>
      <DestinationTable departures={inboundTrains} />
      <Typography className={classes.text} component="h2">
        Outbound departures
      </Typography>
      <DestinationTable departures={outboundTrains} />
    </Paper>
  )
}

export default ResultCard
