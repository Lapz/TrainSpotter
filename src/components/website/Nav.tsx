import {
  AppBar,
  Button,
  Hidden,
  IconButton,
  makeStyles,
  Toolbar,
  Typography
} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import firebase from "firebase/app"
import "firebase/auth"
import { observer } from "mobx-react-lite"
import Link from "next/link"
import React, { MouseEvent, useState } from "react"
import useAsyncEffect from "use-async-effect"
import { useStore } from "../../stores"
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

const NavBar: React.FunctionComponent<{}> = observer(() => {
  const classes = useStyles()
  const store = useStore()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const handleNavClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleNavClose = () => {
    setAnchorEl(null)
  }

  const handleLogin = async () => {
    await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  const handleLogout = async () => {
    await firebase.auth().signOut()
  }

  useAsyncEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        store.setUser({
          displayName: user.displayName
        })
      } else {
        store.logOut()
      }
    })
  })

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

          {store.user ? (
            <Button onClick={handleLogout} color="inherit">
              Logout
            </Button>
          ) : (
            <Button onClick={handleLogin} color="inherit">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
})

export default NavBar
