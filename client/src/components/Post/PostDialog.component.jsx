import { lazy, Suspense } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useAuth } from "context/Auth";

const Card = lazy(() => import("@material-ui/core/Card"));
const CardHeader = lazy(() => import("@material-ui/core/CardHeader"));
const UserAvatar = lazy(() => import("../Avatar/UserAvatar.component"));
const Typography = lazy(() => import("@material-ui/core/Typography"));
const PostForm = lazy(() => import("./PostForm.component"));

export default function PostDialog(props) {
  const { profile: { firstName, lastName, username, id: userId } } = useAuth();
  const name = `${firstName} ${lastName}`

  return (
    <Suspense fallback={<CircularProgress />}>
      <Card >
        <CardHeader
          avatar={<UserAvatar userId={userId} />}
          title={
            <Typography variant="h6">
              { name.trim() !== '' ? name.trim() : username }
            </Typography>
          }
        />
        <Suspense fallback={<CircularProgress />}>
            <PostForm {...props}/>
        </Suspense>
      </Card>
    </Suspense>
  );
}
