import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <div>
        <Link to="/">BookStore</Link>
      </div>
    </nav>
  );
}

export default NavBar;
