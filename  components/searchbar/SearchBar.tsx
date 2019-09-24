import {
  IconButton,
  Paper,
  createStyles,
  InputBase,
  makeStyles,
  Theme
} from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"
import { useState, ChangeEvent } from "react"
import { createStationQueryUrl } from "../../helpers/SearchBar"
import Router, { useRouter } from "next/router"
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: 400
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1
    },
    iconButton: {
      padding: 10
    }
  })
)

const SearchBar: React.FunctionComponent<{}> = ({ children }) => {
  const classes = useStyles()

  const [query, setQuery] = useState<string>()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const handleSubmit = async () => {
    const router = useRouter()
    await router.push(`/search?query=${query}`)
  }

  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder={"Search For Station Times"}
        inputProps={{ "aria-label": "search for station times" }}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <IconButton
        className={classes.iconButton}
        aria-label="search"
        onClick={handleSubmit}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

export default SearchBar
