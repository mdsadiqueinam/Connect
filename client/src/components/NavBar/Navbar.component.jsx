import { lazy, Suspense, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useMutation } from "@apollo/client";
import { useApolloClient } from "@apollo/client";
import clsx from "clsx";

import {
  SearchInput,
  SearchInputDrawer,
} from "components/Input/SearchInput.component";
import { AuthContext } from "context/Auth";
import { LOGOUT_USER } from "utils/graphQl/mutation";

const Menu = lazy(() => import("@material-ui/core/Menu"));
const Badge = lazy(() => import("@material-ui/core/Badge"));
const AppBar = lazy(() => import("@material-ui/core/AppBar"));
const Toolbar = lazy(() => import("@material-ui/core/Toolbar"));
const Divider = lazy(() => import("@material-ui/core/Divider"));
const MenuItem = lazy(() => import("@material-ui/core/MenuItem"));
const MenuIcon = lazy(() => import("@material-ui/icons/Menu"));
const MailIcon = lazy(() => import("@material-ui/icons/Mail"));
const UserAvatar = lazy(() => import("../Avatar/UserAvatar.component"));
const IconButton = lazy(() => import("@material-ui/core/IconButton"));
const Typography = lazy(() => import("@material-ui/core/Typography"));
const ClippedDrawer = lazy(() => import("../SideBar/SideBar.component"));
const NotificationsIcon = lazy(() => import("@material-ui/icons/Notifications"));

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    display: "none",
    [theme.breakpoints.down("lg")]: {
      marginRight: theme.spacing(2),
      display: "block",
    },
  },
  title: {
    display: "block",
    textDecoration: "none",
    color: "white",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  searchButton: {
    display: "inline-block",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

export default function NavBar(props) {
  const client = useApolloClient();
  const context = useContext(AuthContext);
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const [logoutUser] = useMutation(LOGOUT_USER, {
    onCompleted: () => {
      context.logout();
      client.clearStore();
      history.push("/");
    },
  });

  const menuItemProfile = context.user
    ? {
        component: Link,
        to: {
          pathname: `/${context.user.username}`,
          state: { userId: context.user.id },
        },
      }
    : {};

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose} {...menuItemProfile}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <Divider />
      <MenuItem onClick={logoutUser}>Logout</MenuItem>
    </Menu>
  );

  return (
    <div className={clsx(classes.grow, classes.root)}>
      <Suspense fallback={<LinearProgress />}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              className={classes.title}
              variant="h6"
              noWrap
              component={Link}
              to="/home"
            >
              !Connect
            </Typography>

            <div style={{ flexGrow: 0.5 }} />
            <div className={classes.sectionDesktop} style={{ minWidth: "25%" }}>
              <SearchInput />
            </div>
            <div style={{ flexGrow: 0.5 }} />
            <div>
              <div className={classes.searchButton}>
                <SearchInputDrawer />
              </div>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                {context.user && <UserAvatar userId={context.user.id}/>}
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        <ClippedDrawer
          open={isDrawerOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
      </Suspense>
    </div>
  );
}
