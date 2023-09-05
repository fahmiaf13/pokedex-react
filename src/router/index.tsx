import { useRoutes } from "react-router-dom";
import { DefaultLayout } from "@/layouts";
import Home from "@/pages/Home";
import PokemonDetail from "@/pages/PokemonDetail";
import PokemonFavorite from "@/pages/PokemonFavorite";

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
      path: "/pokemon/:id",
      element: (
        <DefaultLayout>
          <PokemonDetail />
        </DefaultLayout>
      ),
    },
    {
      path: "/favorites",
      element: (
        <DefaultLayout>
          <PokemonFavorite />
        </DefaultLayout>
      ),
    },
  ]);
}
