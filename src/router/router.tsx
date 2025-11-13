import React from "react";
import { createBrowserRouter } from "react-router-dom";
import PageNotFound from "../pages/pageNotFound";
import MainLayout from "../layout";
import CharactersPage from "../pages/characters";
import HeroPage from "../pages/heroPage";
import LoginPage from "../pages/login";

const withSuspense = (node: React.ReactNode) => (
  <React.Suspense fallback={null}>{node}</React.Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: withSuspense(<LoginPage />) },
      { path: "login", element: withSuspense(<LoginPage />) },
      { path: "home", element: withSuspense(<HeroPage />) },
      { path: "person", element: withSuspense(<CharactersPage />) },
    ],
  },
  {
    path: "*",
    element: withSuspense(<PageNotFound />),
  },
]);

export default router;
