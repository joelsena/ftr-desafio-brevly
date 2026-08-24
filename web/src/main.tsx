import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { StrictMode } from "react";

import { router } from "./routes";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
