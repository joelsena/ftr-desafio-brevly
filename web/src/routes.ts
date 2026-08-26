import { createBrowserRouter } from "react-router";

import RedirectPage from "./pages/Redirect";
import NotFoundPage from "./pages/404";
import Home from "./pages/Home";

export const router = createBrowserRouter([
  { path: "/", Component: Home },
  { path: "/:shortUrl", Component: RedirectPage },
  { path: "*", Component: NotFoundPage },
]);
