import {
  AppBar,
  Box,
  Button,
  IconButton,
  makeStyles,
  Tab,
  Tabs,
  Toolbar,
  Typography
} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import React, { useState } from "react"

interface ITabPanelProps {
  index: number
  value: any
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  grow: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}))

const TabPanel: React.FunctionComponent<ITabPanelProps> = ({
  children,
  value,
  index,
  ...other
}) => (
  <Typography
    component="div"
    role="tabpanel"
    hidden={value !== index}
    id={`tabpanel-${index}`}
    {...other}
  >
    <Box p={3}>{children}</Box>
  </Typography>
)

const NavBar: React.FunctionComponent<{}> = () => {
  const classes = useStyles()

  const [value, setValue] = useState<number>(0)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) =>
    setValue(newValue)

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

          <Tabs value={value} onChange={handleChange}>
            <Tab label="Item One" />
            <Tab label="Item Two" />
          </Tabs>

          <div className={classes.grow} />

          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar
