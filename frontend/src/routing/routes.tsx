import { createBrowserRouter } from "react-router-dom";

import HomePage from "../pages/HomePage";
import ShowBook from "../pages/ShowBook";
import CreateBook from "../pages/CreateBook";
import DeleteBook from "../pages/DeleteBook";
import EditBook from "../pages/EditBook";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/books/details/:id", element: <ShowBook /> },
  { path: "/books/create", element: <CreateBook /> },
  { path: "/books/delete/:id", element: <DeleteBook /> },
  { path: "/books/edit/:id", element: <EditBook /> },
]);

export default router;
