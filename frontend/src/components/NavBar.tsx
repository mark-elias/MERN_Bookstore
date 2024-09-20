import { Link } from "react-router-dom";
import { FaBookDead } from "react-icons/fa";

function NavBar() {
  return (
    <nav className="bg-customGreen p-3 shadow-2xl">
      <div className="inline-block">
        <Link to="/" className="text-2xl flex items-center gap-x-2">
          <FaBookDead />
          MERN Bookstore Project
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;