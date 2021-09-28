import { Suspense, lazy, useState } from "react";
import clsx from "clsx";
import { alpha, makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";

const Input = lazy(() => import("@material-ui/core/Input"));
const Drawer = lazy(() => import("@material-ui/core/Drawer"));
const InputBase = lazy(() => import("@material-ui/core/InputBase"));
const IconButton = lazy(() => import("@material-ui/core/IconButton"));
const SearchIcon = lazy(() => import("@material-ui/icons/Search"));
const CancelIcon = lazy(() => import("@material-ui/icons/Cancel"));
const InputAdornment = lazy(() => import("@material-ui/core/InputAdornment"));


const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: 20,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    width: "100%",
    marginLeft: theme.spacing(3),
  },
  searchIcon: {
    color: "#fff",
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
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
  iconButton: {
    marginRight: 10,
  },
  hide: {
    display: 'none',
  },
}));

const SearchInput = ({ className='', onChange, value, ...rest }) => {
  const classes = useStyles();
  const [activeSearch, setActiveSearch] = useState(false);
  
  return (
    <div className={`${classes.search} ${className}`}>
      <Suspense fallback={<CircularProgress color="secondary"/>}>
      {!activeSearch && (
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
      )}
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
        onBlur={() => setActiveSearch(false)}
        onFocus={() => setActiveSearch(true)}
        onChange={onChange}
        endAdornment={
          <IconButton
            aria-label="Search"
            edge="end"
            className={classes.iconButton}
          >
            {activeSearch && <CancelIcon className={classes.searchIcon} />}
          </IconButton>
        }
      />
      </Suspense>
    </div>
  );
};

SearchInput.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

//searchInput drawer with button
function SearchInputDrawer() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Suspense fallback={<CircularProgress color="secondary"/>}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        className={clsx(classes.iconButton, open && classes.hide)}
      >
        <SearchIcon />
      </IconButton>
      <Drawer
        variant="persistent"
        anchor="top"
        open={open}
        >
          <Input
            id="standard-adornment-password"
            type='text'
            placeholder="Search..."
            className={classes.inputInput}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleDrawerClose}
                >
                  <CancelIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </Drawer>
    </Suspense>
  );
}


export { SearchInput, SearchInputDrawer };