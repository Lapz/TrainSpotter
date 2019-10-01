import {
  createStyles,
  IconButton,
  Input,
  makeStyles,
  Paper,
  Theme
} from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"
import { useRouter } from "next/router"
import { ChangeEvent, KeyboardEvent, useState } from "react"

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

const SearchBar: React.FunctionComponent<{}> = () => {
  const classes = useStyles()
  const router = useRouter()

  const [query, setQuery] = useState<string>()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const handleEnter = async (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        await handleSubmit()
      default:
        break
    }
  }

  const handleSubmit = async () => {
    await router.push(`/results?station=${query}`)
  }

  return (
    <Paper className={classes.root}>
      <Input
        className={classes.input}
        placeholder={"Search For Station Times"}
        inputProps={{ "aria-label": "search for station times" }}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onKeyDown={handleEnter}
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
