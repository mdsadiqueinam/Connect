import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { LinearProgress } from "@material-ui/core";
import { CssBaseline } from "@material-ui/core";

import { AuthProvider } from "context/Auth";
import GlobalCss from "components/Styles/Style.component";

const PageNotFound = lazy(() => import("pages/PageNotFound/PageNotFound.page"));
const Header = lazy(() => import("components/Header/Header.component"));
const Routes = lazy(() => import("./config/Routes"));

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<LinearProgress />}>
          <GlobalCss>
            <CssBaseline />
            <Route path="/404" component={PageNotFound} />
            <Header />
            <Routes />
          </GlobalCss>
        </Suspense>
      </Router>
    </AuthProvider>
  );
};

export default App;
