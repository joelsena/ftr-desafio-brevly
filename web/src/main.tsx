import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { StrictMode } from "react";

import { ToastContainer } from "./components/ToastContainer.tsx";
import { ToastProvider } from "./context/toast.tsx";
import { router } from "./routes";
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <RouterProvider router={router} />

        <ToastContainer />
      </ToastProvider>
    </QueryClientProvider>
  </StrictMode>,
);
