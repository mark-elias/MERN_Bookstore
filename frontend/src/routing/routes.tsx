import { createBrowserRouter } from "react-router-dom";

import HomePage from "../pages/HomePage";
import ShowBook from "../pages/ShowBook";
import CreateBook from "../pages/CreateBook";
import DeleteBook from "../pages/DeleteBook";
import EditBook from "../pages/EditBook";
import NavBar from "../components/NavBar";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <NavBar></NavBar>
        <div className="p-2 md:p-5">
          <HomePage></HomePage>
        </div>
      </>
    ),
  },
  {
    path: "/books/details/:id",
    element: (
      <>
        <NavBar></NavBar>
        <div className="p-2 md:p-5">
          <ShowBook />
        </div>
      </>
    ),
  },
  {
    path: "/books/create",
    element: (
      <>
        <NavBar></NavBar>
        <div className="p-2 md:p-5">
          <CreateBook />
        </div>
      </>
    ),
  },
  {
    path: "/books/delete/:id",
    element: (
      <>
        <NavBar></NavBar>
        <div className="p-2 md:p-5">
          <DeleteBook />
        </div>
      </>
    ),
  },
  {
    path: "/books/edit/:id",
    element: (
      <>
        <NavBar></NavBar>
        <div className="p-2 md:p-5">
          <EditBook />
        </div>
      </>
    ),
  },
]);

export default router;
