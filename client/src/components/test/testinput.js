import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { IconButton } from "@material-ui/core";
import { alpha, makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: 20,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    minWidth: "30%",
    marginLeft: theme.spacing(3),
    width: "auto",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    }
  },
  searchIcon: {
    color: "#fff",
    fontSize: "1.5rem",
    marginRight: "1rem",
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: '100%'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(2)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
  iconButton: {
    marginRight: 10,
  },
}));

export default function SearchInput() {
  const classes = useStyles();

  return (
    <div className={classes.search}>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
        endAdornment={
          <IconButton
            aria-label="Search"
            edge="end"
            className={classes.iconButton}
          >
            <SearchIcon className={classes.searchIcon} />
          </IconButton>
        }
      />
    </div>
  );
}

/* <div className={classes.search}>
  <div className={classes.searchIcon}>
    <SearchIcon />
  </div>
  <InputBase
    placeholder="Search…"
    classes={{
      root: classes.inputRoot,
      input: classes.inputInput,
    }}
    inputProps={{ "aria-label": "search" }}
  />
</div>; */
