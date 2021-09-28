import { lazy } from "react";
import { useProfile } from "context/Profile";

const CardMedia = lazy(() => import("@material-ui/core/CardMedia"));

export default function AuthUserCoverImage(props) {
  const { profile } = useProfile();

  var coverUrl = profile.coverPicture;

  if (!coverUrl || (coverUrl && coverUrl.trim("https://") === "")) {
    coverUrl = "https://cdn.pixabay.com/photo/2017/01/30/16/11/sunset-2021266_960_720.jpg";
  }

  return (
    <CardMedia
      image={coverUrl}
      {...props}
    />
  );
}

// https://cdn.pixabay.com/photo/2017/01/30/16/11/sunset-2021266_960_720.jpg
