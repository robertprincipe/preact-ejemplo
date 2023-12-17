import { Suspense, lazy } from "preact/compat";
import { Router as RouterWouter, Switch, Route } from "wouter";
import NotFound from "../pages/not-found";
import Layout from "./layout";


const Router = () => {
  return (
    <RouterWouter>
      <Layout>
        <Suspense fallback={null}>
          <Switch>
            <Route path="/" component={lazy(() => import("../pages/home"))} />
            <Route
              path="/posts"
              component={lazy(() => import("../pages/posts"))}
            />
            <Route
              path="/characters"
              component={lazy(() => import("../pages/characters"))}
            />
            <Route
              path="/pokemon"
              component={lazy(() => import("../pages/pokemon"))}
            />
            <Route
              path="/contact"
              component={lazy(() => import("../pages/contact"))}
            />
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Suspense>
      </Layout>
    </RouterWouter>
  );
}

export default Router