import { useRoutes } from "react-router-dom";
import { DefaultLayout } from "@/layouts";
import Home from "@/pages/Home";
import PokemonDetail from "@/pages/PokemonDetail";

// const Home = lazy(() => import("@/pages/Home"));
// const PokemonDetail = lazy(() => import("@/pages/PokemonDetail"));

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: (
        <DefaultLayout>
          <Home />
        </DefaultLayout>
      ),
    },
    {
      path: "/:id",
      element: (
        <DefaultLayout>
          <PokemonDetail />
        </DefaultLayout>
      ),
    },
  ]);
}
