import React, { lazy, Fragment, Suspense } from "react";
import PropTypes from "prop-types";
import { CircularProgress } from "@material-ui/core";

const Divider = lazy(() => import("@material-ui/core/Divider"));
const Collapse = lazy(() => import("@material-ui/core/Collapse"));
const CardActions = lazy(() => import("@material-ui/core/CardActions"));

const LikeButton = lazy(() => import("../Like/LikeButton.component"));
const CommentButton = lazy(() => import("../Comment/CommentButton.component"));
const PostComments = lazy(() => import("./PostComments.component"));


export default function PostFooter({
  id,
  likes,
  likeCount,
  comments,
  commentCount,
}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Fragment>
      <CardActions disableSpacing>
        <LikeButton id={id} likes={likes} likeCount={likeCount} />
        <CommentButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="comment post"
        />
      </CardActions>
      <Divider />
      <Suspense fallback={<CircularProgress />}>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <PostComments id={id} comments={comments} commentCount={commentCount}/>
        </Collapse>
      </Suspense>
    </Fragment>
  );
}

PostFooter.propTypes = {
  id: PropTypes.string.isRequired,
  likes: PropTypes.array.isRequired,
  likeCount: PropTypes.number.isRequired,
  comments: PropTypes.array.isRequired,
  commentCount: PropTypes.number.isRequired,
};