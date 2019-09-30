import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
  Hidden
} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import Link from "next/link"
import React, { MouseEvent, useState } from "react"
import SearchBar from "../searchbar/SearchBar"
import NavMenu from "./NavMenu"
import firebase from "firebase/app"
import "firebase/auth"

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

  const handleLogin = async () => {
    try {
      await firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
    } catch (e) {
      console.log(e)
    }
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

          <Hidden xsDown>
            <Link href="/">
              <Typography variant="h4" className={classes.title}>
                TrainSpotter
              </Typography>
            </Link>
          </Hidden>

          <SearchBar />

          <Button onClick={handleLogin} color="inherit">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar
