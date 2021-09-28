import { lazy, Suspense } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useAuth } from "context/Auth";

const Container = lazy(() => import("@material-ui/core/Container"));
const Feeds = lazy(() => import("../../components/Feeds/Feeds.component"));
const CreatePost = lazy(() => import("../../components/Post/CreatePost.component"));

function HomePage() {
  const { user } = useAuth();
  return (
    <Suspense fallback={<LinearProgress />}>
      <Container className={"css-js-container "} style={{ marginTop: "5rem" }}>
        <Suspense fallback={<LinearProgress />}>
          <CreatePost />
          <Feeds queryType={"timeline"} userId={user.id}/>
        </Suspense>
      </Container>
    </Suspense>
  );
}

export default HomePage;
