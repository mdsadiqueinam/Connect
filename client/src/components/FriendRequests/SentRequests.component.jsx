import { lazy, Suspense, useState, Fragment } from "react";
import { useGetSentRequests } from "utils/Hooks/useGetFriendRequests"
import { makeStyles } from "@material-ui/styles"
import useInfiniteScroll from "react-infinite-scroll-hook"
import FriendRequestProgress from "./FriendRequestProgress";

const Button = lazy(() => import("@material-ui/core/Button"))
const RequestCard = lazy(() => import("./RequestCard.component"));
const FastForward = lazy(() => import("@material-ui/icons/FastForward"));

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    background: theme.palette.background.default,
    justifyContent: "center",
    alignItems: "center",
  },
}));

function SentRequestsList({ entries }) {
  return (
    <Fragment>
      { entries && entries.length > 0 ? entries.map(entry => (
        <RequestCard key={entry.id} user={entry} />
      )) : (<h2>No Sent Requests</h2>)}
    </Fragment>
  );
}


export default function SentRequests() {
  const classes = useStyles();
  const [isLoadMore, setIsLoadMore] = useState(false);
  const { data, loading, fetchMore } = useGetSentRequests({
    variables: { offset: 0, limit: 8 },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
  });

  const hasNextPage = data?.getSentRequests?.hasMore && isLoadMore;
  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: () => {
      fetchMore({
        variables: { offset: data?.getSentRequests?.offset + 1, limit: 4 },
      });
    }
  });

  return (
    <Fragment>
    <div className={classes.container} >
      <Suspense fallback={<FriendRequestProgress />}>
        <SentRequestsList entries={data?.getSentRequests?.requests} />
        { (loading || hasNextPage) && <FriendRequestProgress ref={sentryRef}/> }
      </Suspense>
    </div>
    {!isLoadMore && <Button fullWidth color="primary" onClick={() => setIsLoadMore(true)} endIcon={<FastForward color="primary"/>}>Load more</Button>}
    </Fragment>
  )
}
