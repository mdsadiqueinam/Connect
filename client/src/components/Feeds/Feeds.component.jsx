import { lazy, Suspense } from "react";
import PropTypes from "prop-types";
import { TransitionGroup } from "react-transition-group";
import { CircularProgress, Fade, makeStyles } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { FETCH_TIMELINE } from "utils/graphQl/queries";
import handleErrors from "config/handleErrors";

const List = lazy(() => import("@material-ui/core/List"));
const ListItem = lazy(() => import("@material-ui/core/ListItem"));
const PostCard = lazy(() => import("../Post/PostCard.component"));

const useStyle = makeStyles((theme) => ({
  root: { maxWidth: 630, width: "100%" },
}))

export default function Feeds({ queryType, userId }) {
  const classes = useStyle();
  
  const { loading, data, fetchMore } = useQuery(FETCH_TIMELINE, {
    variables: { queryType, userId, offset: 0, limit: 10 },
    onError: (error) => handleErrors(error, `[${queryType}]: At Feeds:`),
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true,
  });
  var posts = [];
  if (data) {
    posts = data.getTimeline.posts;
  }


  return (
    <Suspense fallback={<CircularProgress />}>
      <List className={classes.root}>
        <Suspense fallback={<CircularProgress />}>
          {loading ? (
            <CircularProgress />
          ) : posts ? (
            posts.length > 0 ? (
              <Suspense fallback={<CircularProgress />}>
              <TransitionGroup>
                {posts.map((post) => (
                  <Fade key={post.id} timeout={500}>
                    <ListItem key={post.id}>
                      <PostCard post={post} queryType={queryType}/>
                    </ListItem>
                  </Fade>
                ))}
              </TransitionGroup>
            </Suspense>
            ) : (
              <h1> User have no posts to view </h1>
            )
          ) : (
            <CircularProgress />
          )}
        </Suspense>
      </List>
    </Suspense>
  );
}

Feeds.propTypes = {
  queryType: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};