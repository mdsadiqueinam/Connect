import React, { lazy, Suspense } from "react";
import { CircularProgress } from "@material-ui/core";

const Divider = lazy(() => import("@material-ui/core/Divider"));
const ListItem = lazy(() => import("@material-ui/core/ListItem"));
const CommentCard = lazy(() => import("./CommentCard.component"));

export default function CommentListItem(props) {
  return (
    <Suspense fallback={<CircularProgress />}>
        <ListItem>
          <CommentCard {...props} />
        </ListItem>
        <Divider
          variant="inset"
          component="li"
          style={{ marginTop: "10px", marginBottom: "10px" }}
        />
    </Suspense>
  );
}
