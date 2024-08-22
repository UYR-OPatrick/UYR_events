import { Link, useNavigate } from "react-router-dom";
import UYRLogo from "../Images/UYR GROUP LOGO - GOLD OUTLINE-p-800.png"
import { useContext } from "react";
import { UserContext } from "../App";

export default function Header() {
  const navigate = useNavigate();
  const user = useContext(UserContext)[0];

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary p-3">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img
            src={UYRLogo}
            alt="UYR Logo"
            width="80"
            height="80"
            className="d-inline-block align-text-center"
          />
        </Link>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link to="/" className="nav-link active">
              <h4>UYR Events</h4>
            </Link>
          </li>
        </ul>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/events" className="nav-link active">
                My Events
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className="nav-link active">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contacts" className="nav-link active">
                Contacts
              </Link>
            </li>
          </ul>
          <form className="d-flex mx-1" role="search">
            <input
              className="form-control mx-1"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-dark mx-1" type="submit">
              Search
            </button>
          </form>
          <button
            className="btn btn-outline-dark mx-1"
            onClick={() => navigate("/basket")}
          ><i className="bi bi-basket"></i> Basket</button>
          <button
            className="btn btn-outline-dark mx-1"
            onClick={() => navigate("/signin")}
          >
            {user ? 'Signed In' : 'Sign In'}
          </button>
        </div>
      </div>
    </nav>
  );
}
