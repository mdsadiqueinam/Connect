import { lazy, Suspense } from "react";
import { makeStyles } from "@material-ui/core";
import FriendListProgress from "./FriendListProgress.component";
import useInfiniteScroll from "react-infinite-scroll-hook";
import PropTypes from "prop-types";

const FriendCard = lazy(() => import("./FriendCard.component"));

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    overflow: "hidden",
    backgroundColor: theme.palette.background.default,
  },
}));

function Friends({ entries, loading, loadMore, hasMore }) {
  const classes = useStyles();

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage: hasMore && !loading,
    onLoadMore: loadMore,
  });

  return (
    <Suspense fallback={<FriendListProgress />}>
      <div className={classes.root}>
        {entries &&
          entries.map((entry) => <FriendCard key={entry.id} friend={entry} />)}
        {(loading || hasMore) && <FriendListProgress ref={sentryRef}/>}
      </div>
    </Suspense>
  );
}

Friends.propTypes = {
  LoadMore: PropTypes.func,
  loading: PropTypes.bool.isRequired,
  hasMore: PropTypes.bool,
};

export default Friends;
