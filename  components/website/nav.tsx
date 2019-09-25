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
import React, { useState } from "react"
import SearchBar from "../searchbar/SearchBar"

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

const NavBar: React.FunctionComponent<{}> = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            className={classes.menuButton}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
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
