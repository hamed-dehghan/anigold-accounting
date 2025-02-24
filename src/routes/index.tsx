import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes";
import MainLayout from "../layouts/Main";
import { Suspense } from "react";
import Spinner from "../common/loading/spinner";

const RoutesList = () => {
  return (
    <Router>
      {/* <Routes>
        {routes.map(
          ({ layout = <MainLayout />, path, element }, i) => {
            return (
              <Route key={i} element={layout}>
                <Route >
                  <Route
                    path={path}
                    element={
                      <Suspense fallback={<Spinner />}>{element}</Suspense>
                    }
                  />
                </Route>
              </Route>
            )
          }
        )}
      </Routes> */}
    </Router>
  );
};

export default RoutesList;