import React, { lazy, Suspense } from "react";
import PropTypes from "prop-types";
import { Fade, CircularProgress } from "@material-ui/core";
import { TransitionGroup } from "react-transition-group";

const List = lazy(() => import("@material-ui/core/List"));
const CardContent = lazy(() => import("@material-ui/core/CardContent"));
const Typography = lazy(() => import("@material-ui/core/Typography"));

const CommentPost = lazy(() => import("../Comment/CommentPost.component"));
const CommentListItem = lazy(() => import("../Comment/CommentListItem.component"));

export default function PostComments({
  id,
  comments,
  commentCount,
  maxHeight = "50vh",
  ...rest
}) {
  return (
    <Suspense fallback={<CircularProgress />}>
      <CardContent {...rest}>
        <List style={{ maxHeight: maxHeight, overflow: "auto" }}>
          <TransitionGroup>
            {comments &&
              comments.map((comment) => (
                <Fade key={comment.id}>
                  <CommentListItem key={comment.id} postId={id} comment={comment} />
                </Fade>
              ))}
          </TransitionGroup>
        </List>
        <Typography
          variant="caption"
          color="textSecondary"
          component="p"
          style={{ margin: "10px", fontSize: "15px" }}
        >
          {commentCount} comments
        </Typography>
        <CommentPost id={id} />
      </CardContent>
    </Suspense>
  );
}

PostComments.propTypes = {
  id: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  commentCount: PropTypes.number.isRequired,
  className: PropTypes.string,
  maxHeight: PropTypes.string,
};
