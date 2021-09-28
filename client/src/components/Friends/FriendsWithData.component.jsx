import { lazy, Suspense } from "react";
import { FETCH_FRIEND_LIST } from "utils/Hooks/useGetFriends";
import { useApolloClient } from "@apollo/client";
import { makeStyles, alpha } from "@material-ui/core";
import { useAuth } from "context/Auth";
import useGetFriends from "utils/Hooks/useGetFriends";
import FriendListProgress from "./FriendListProgress.component";
import PropTypes from "prop-types";

import { SearchInput } from "components/Input/SearchInput.component";

const Paper = lazy(() => import("@material-ui/core/Paper"));
const Friends = lazy(() => import("./Friends.component"));
const Divider = lazy(() => import("@material-ui/core/Divider"));
const Button = lazy(() => import("@material-ui/core/Button"));
const Typography = lazy(() => import("@material-ui/core/Typography"));

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.background.default,
    margin: theme.spacing(2, 0),
    padding: theme.spacing(2),
    boxSizing: "border-box",
  },
  divider: {
    height: "2px",
    marginTop: theme.spacing(1),
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    boxSizing: "border-box",
  },
  searchInput: {
    maxWidth: "30%",
    backgroundColor: alpha(theme.palette.primary.light, 0.5),
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.light, 0.35),
    },
    marginBottom: theme.spacing(1),
  },
}));

function FriendsWithData({ userId, totalFriends }) {
  const { user } = useAuth();
  const client = useApolloClient();
  const classes = useStyles();
  const { data, loading, fetchMore } = useGetFriends(
    {
      variables: { userId, offset: 0, limit: 6, filter: "" },
      fetchPolicy: "network-only",
      nextFetchPolicy: "cache-first",
    },
    "FriendsWithData"
  );

  const handleLoadMore = () => {
    if (data?.getFriends?.hasMore) {
      fetchMore({
        variables: {
          offset: data.getFriends.offset + 1,
          filter: data?.getFriends?.filter,
        },
      });
    }
  };

  const handleChange = (e) => {
    client.writeQuery({
      query: FETCH_FRIEND_LIST,
      variables: {
        userId,
        offset: 0,
        limit: 6,
        filter: e.target.value,
      },
      data: {
        getFriends: {
          ...data.getFriends,
          filter: e.target.value,
          friendsDetails: [],
        },
      },
    });
    fetchMore({
      variables: {
        offset: 0,
        filter: e.target.value,
      },
    });
  };

  return (
    <Suspense fallback={<FriendListProgress />}>
      <Paper elevation={14} className={classes.root}>
        <div className={classes.header}>
          <Typography variant="h6" display={"block"}>
            Friends{" "}
            <Typography variant="body2" display="inline">
              {totalFriends}
            </Typography>
          </Typography>
          <SearchInput
            className={classes.searchInput}
            onChange={handleChange}
          />
          {user.id === userId && (
            <Button component={"a"} color="primary" href={"/friend-requests"}>
              Friend Requests
            </Button>
          )}
        </div>
        <Divider className={classes.divider} />
        <Friends
          entries={data?.getFriends?.friendsDetails}
          loading={loading}
          loadMore={handleLoadMore}
          hasMore={data?.getFriends?.hasMore}
        />
      </Paper>
    </Suspense>
  );
}

FriendsWithData.propTypes = {
  userId: PropTypes.string.isRequired,
  totalFriends: PropTypes.number,
};

export default FriendsWithData;
