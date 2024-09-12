import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routing/routes.tsx";
import NavBar from "./components/NavBar.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NavBar></NavBar>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
