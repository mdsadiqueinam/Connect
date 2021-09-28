import { lazy } from 'react';
import { makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const Chat = lazy(() => import('@material-ui/icons/Chat'));
const List = lazy(() => import('@material-ui/core/List'));
const Event = lazy(() => import('@material-ui/icons/Event'));
const Drawer = lazy(() => import('@material-ui/core/Drawer'));
const Toolbar = lazy(() => import('@material-ui/core/Toolbar'));
const Divider = lazy(() => import('@material-ui/core/Divider'));
const RssFeed = lazy(() => import('@material-ui/icons/RssFeed'));
const ListItem = lazy(() => import('@material-ui/core/ListItem'));
const Bookmark = lazy(() => import('@material-ui/icons/Bookmark'));
const ListItemIcon = lazy(() => import('@material-ui/core/ListItemIcon'));
const ListItemText = lazy(() => import('@material-ui/core/ListItemText'));
const PeopleIcon = lazy(() => import('@material-ui/icons/People'));

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function SideBar({ open: isDrawerOpen, handleDrawerToggle }) {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <div className={classes.root}>      
      <Drawer
        className={classes.drawer}
        variant={isMobile ? "temporary" : "permanent"}
        classes={{
          paper: classes.drawerPaper,
        }}
        open={isDrawerOpen}
        onClose={handleDrawerToggle}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
              <ListItem button component={NavLink} exact to={"/home"} activeClassName={"Mui-selected"}>
                <ListItemIcon><RssFeed color="primary"/> </ListItemIcon>
                <ListItemText primary="Feeds" />
              </ListItem>
              <ListItem button >
                <ListItemIcon><Chat color="primary"/> </ListItemIcon>
                <ListItemText primary="Chat" />
              </ListItem>
              <ListItem button component={NavLink} exact to={"/friend-requests"} activeClassName={"Mui-selected"}>
                  <ListItemIcon><PeopleIcon color="primary"/> </ListItemIcon>
                  <ListItemText primary="Friend Requests" />
              </ListItem>
              <ListItem button >
                  <ListItemIcon><Bookmark color="primary"/> </ListItemIcon>
                  <ListItemText primary="Bookmark" />
              </ListItem>
              <ListItem button >
                  <ListItemIcon><Event color="primary"/> </ListItemIcon>
                  <ListItemText primary="Event" />
              </ListItem>
          </List>

          <Divider />
        </div>
      </Drawer>
    </div>
  );
}
