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
import Link from "next/link"
import React, { MouseEvent, useState } from "react"
import SearchBar from "../searchbar/SearchBar"
import NavMenu from "./NavMenu"

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

const NavBar: React.FunctionComponent<{}> = () => {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const handleNavClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleNavClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            className={classes.menuButton}
            aria-label="menu"
            onClick={handleNavClick}
          >
            <MenuIcon />
          </IconButton>
          <NavMenu anchorEl={anchorEl} handleClose={handleNavClose} />
          <Link href="/">
            <Typography variant="h4" className={classes.title}>
              TrainSpotter
            </Typography>
          </Link>

          <SearchBar />

          <div className={classes.grow} />

          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar
