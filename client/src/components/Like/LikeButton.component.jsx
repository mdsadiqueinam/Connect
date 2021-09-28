import React, { lazy, useContext, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { LIKE_POST_MUTATION } from "utils/graphQl/mutation";
import { AuthContext } from "context/Auth";

const IconButton = lazy(() => import("@material-ui/core/IconButton"));
const FavoriteIcon = lazy(() => import("@material-ui/icons/Favorite"));

export default function LikeButton({ id, likes, likeCount }) {
  const { user } = useContext(AuthContext);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.user === user.id)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const likeIcon = liked ? (
    <FavoriteIcon color="secondary" />
  ) : (
    <FavoriteIcon />
  );

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  return (
    <IconButton aria-label="add to favorites" onClick={likePost}>
      {likeIcon}
    </IconButton>
  );
}
