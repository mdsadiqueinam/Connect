import { lazy, Suspense, useState, Fragment } from "react";
import { useGetReceivedRequests } from "utils/Hooks/useGetFriendRequests"
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

function ReceivedRequestsList({ entries }) {
  return (
    <Fragment>
      { entries && entries.map(entry => (
        <RequestCard key={entry.id} user={entry} />
      ))}
    </Fragment>
  );
}


export default function ReceivedRequests() {
  const classes = useStyles();
  const [isLoadMore, setIsLoadMore] = useState(false);
  const { data, loading, fetchMore } = useGetReceivedRequests({
    variables: { offset: 0, limit: 3 },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
  });

  const hasNextPage = data?.getReceivedRequests?.hasMore && isLoadMore;
  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: () => {
      fetchMore({
        variables: { offset: data?.getReceivedRequests?.offset + 1, limit: 5 },
      });
    }
  });
  // console.log(data?.getReceivedRequests?.requests);
  return (
    <Fragment>
    <div className={classes.container} >
      <Suspense fallback={<FriendRequestProgress />}>
        <ReceivedRequestsList entries={data?.getReceivedRequests?.requests} />
        { (loading || hasNextPage) && <FriendRequestProgress ref={sentryRef}/> }
      </Suspense>
    </div>
    {!isLoadMore && <Button fullWidth color="primary" onClick={() => setIsLoadMore(true)} endIcon={<FastForward color="primary"/>}>Load more</Button>}
    </Fragment>
  )
}
