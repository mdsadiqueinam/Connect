import React, { lazy } from "react";

const IconButton = lazy(() => import("@material-ui/core/IconButton"));
const QuestionAnswerIcon = lazy(() => import("@material-ui/icons/QuestionAnswer"));

export default function CommentPost(props) {
  return (
    <IconButton aria-label="share" {...props}>
      <QuestionAnswerIcon color="primary" />
    </IconButton>
  );
}
