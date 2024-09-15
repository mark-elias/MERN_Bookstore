import React from "react";
import { Link } from "react-router-dom";
import { FaBookDead } from "react-icons/fa";

function NavBar() {
  return (
    <nav className="bg-customDarkGreen">
      <div>
        <Link to="/" className="text-2xl flex gap-x-2 p-3">
          <FaBookDead></FaBookDead>
          MERN Bookstore Project
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
