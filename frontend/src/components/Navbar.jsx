import React from "react";
import { Link } from "react-router-dom";
import { FaHandsHelping } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">

        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <FaHandsHelping className="me-2 text-warning" size={28} />
          Volunteer Relief
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/volunteer">Volunteer</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/disaster">Disasters</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/donation">Donate</Link>
            </li>

            <li className="nav-item ms-2">
              <Link className="btn btn-outline-light btn-sm" to="/login">
                Login
              </Link>
            </li>

            <li className="nav-item ms-2">
              <Link className="btn btn-warning btn-sm" to="/register">
                Register
              </Link>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;