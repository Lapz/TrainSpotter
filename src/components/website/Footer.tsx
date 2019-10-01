import {
  Container,
  Divider,
  makeStyles,
  Paper,
  Typography
} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  },
  footer: {
    backgroundColor: theme.palette.background.paper
  }
}))

const Footer: React.FunctionComponent<{}> = () => {
  const classes = useStyles()

  return (
    <footer className={classes.root}>
      <Divider />

      <Container maxWidth="sm">
        <Typography variant="body1">
          Made with ❤ by
          <a href="github.com/lapz">Lenard Pratt</a>
        </Typography>
      </Container>
    </footer>
  )
}

export default Footer
