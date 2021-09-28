import React, { lazy, useState, useRef, Suspense } from "react";
import { makeStyles } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { CircularProgress } from "@material-ui/core";
import { CREATE_COMMENT_MUTATION } from "utils/graphQl/mutation";

const Button = lazy(() => import("@material-ui/core/Button"));
const InputBase = lazy(() => import("@material-ui/core/InputBase"));
const IconButton = lazy(() => import("@material-ui/core/IconButton"));
const InsertEmotionIcon = lazy(() => import("@material-ui/icons/InsertEmoticon"));

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    width: "100%",
  },
  inputInput: {
    transition: theme.transitions.create("width"),
    width: "100%",
  },
  Button: {
    marginRight: 10,
  },
}));

export default function CommentPost({ id }) {
  const classes = useStyles();
  const [comment, setComment] = useState("");

  const commentInputRef = useRef(null);

  const [createComment, { loading }] = useMutation(CREATE_COMMENT_MUTATION, {
    variables: {
      postId: id,
      body: comment,
    },
    onError: (err) => {
      if (err.message) {
        console.log(err.message);
      }
      if (err.graphQLErrors) {
        console.log(err.graphQLErrors);
      }
      if (err.networkError) {
        console.log(err.networkError);
      }
      if (err.extraInfo) {
        console.log(err.extraInfo);
      }
    },
    update: () => {
      setComment("");
      commentInputRef.current.blur();
    },
  });

  return (
    <Suspense fallback={<CircularProgress />}>
      <InputBase
        name="comment"
        placeholder="Add a comment..."
        onChange={(e) => setComment(e.target.value)}
        value={comment}
        ref={commentInputRef}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "comment" }}
        multiline={true}
        endAdornment={
          <Button
            color="primary"
            className={classes.Button}
            disabled={comment.trim() === ""}
            onClick={createComment}
          >
            {loading ? <CircularProgress size={20} /> : "Comment"}
          </Button>
        }
        startAdornment={
          <IconButton color="primary" className={classes.Button}>
            <InsertEmotionIcon />
          </IconButton>
        }
      />
    </Suspense>
  );
}
