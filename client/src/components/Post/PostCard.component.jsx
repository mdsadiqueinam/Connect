import moment from "moment";
import handleErrors from "config/handleErrors";
import { lazy } from "react";
import { useMutation } from "@apollo/client";
import { makeStyles, Card } from "@material-ui/core";
import { FETCH_TIMELINE } from "utils/graphQl/queries";
import { DELETE_POST_MUTATION } from "utils/graphQl/mutation";

const PostMedia = lazy(() => import("./PostMedia.component"));
const PostFooter = lazy(() => import("./PostFooter.component"));
const PostHeader = lazy(() => import("./PostHeader.component"));
const PostContent = lazy(() => import("./PostBody.component"));

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    borderRadius: "10px",
  },
  
}));

export default function PostCard({
  post: {
    id,
    user: userId,
    username,
    body,
    image,
    likes,
    likeCount,
    comments,
    commentCount,
    createdAt,
  },
  queryType,
}) {
  const classes = useStyles();

  const [deletePost, { loading }] = useMutation(DELETE_POST_MUTATION, {
    variables: { postId: id },
    update(proxy) {
      const data = proxy.readQuery({
        query: FETCH_TIMELINE,
        variables: { queryType, userId },
      });
      proxy.writeQuery({
        query: FETCH_TIMELINE,
        variables: { queryType, userId },
        data: {
          getTimeline: data.getTimeline.filter((post) => post.id !== id),
        },
      });
    },
    onError: (err) => handleErrors(err, "postcard"),
  });

  const Date =
    moment(createdAt).diff(moment(), "days") < -1
      ? moment(createdAt).format("MMM Do YYYY")
      : moment(createdAt).fromNow();
      
  return (
    <Card className={classes.root} raised>
      <PostHeader
        userId={userId}
        username={username}
        createdAt={Date}
        handleDelete={deletePost}
        loading={loading}
      />

      {image && <PostMedia image={image} />}

      <PostContent body={body} />
      <PostFooter
        id={id}
        likes={likes}
        likeCount={likeCount}
        comments={comments}
        commentCount={commentCount}
      />
    </Card>
  );
}
