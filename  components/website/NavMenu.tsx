import { Menu, MenuItem } from "@material-ui/core"
import Link from "next/link"
import { MouseEvent, useState } from "react"

interface IProps {
  anchorEl: null | HTMLElement
  handleClose: () => void
}
const NavMenu: React.FunctionComponent<IProps> = ({
  handleClose,
  anchorEl
}) => {
  return (
    <Menu
      id="nav-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <Link href="/">
        <MenuItem onClick={handleClose}>Home</MenuItem>
      </Link>
      <MenuItem onClick={handleClose}>Favourites</MenuItem>
      {/* <MenuItem onClick={handleClose}>Logout</MenuItem> */}
    </Menu>
  )
}

export default NavMenu
