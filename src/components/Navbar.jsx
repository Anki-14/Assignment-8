import { Link, NavLink } from 'react-router-dom';
import { BsFillHouseDoorFill, BsPeopleFill, BsPersonPlusFill } from 'react-icons/bs';


const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top py-3 navbar-custom">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img
            src="https://www.innomatics.in/wp-content/uploads/2023/01/Innomatics-Logo1.png"
            alt="Brand Logo"
            className="brand-logo"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" exact>
                <BsFillHouseDoorFill className="icon" /> Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/students">
                <BsPeopleFill className="icon" /> Student List
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                <BsPersonPlusFill className="icon" /> Register Student
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
