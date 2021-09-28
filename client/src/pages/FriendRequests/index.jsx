import { lazy, Suspense } from "react";

const Requests = lazy(() => import("components/FriendRequests"));
const Container = lazy(() => import("@material-ui/core/Container"));


export default function FriendRequests() {
  return (
    <Suspense >
      <Container className={"css-js-container css-js-page"}>
        <Requests />
      </Container>
    </Suspense>
  )
}
