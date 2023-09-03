import { lazy } from "react";
import { useRoutes } from "react-router-dom";

const Home = lazy(() => import("@/pages/Home"));

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <Home />,
    },
  ]);
}
