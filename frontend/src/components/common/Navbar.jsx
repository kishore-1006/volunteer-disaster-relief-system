import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, Bell, LogOut, User as UserIcon, Home, Info, PhoneCall, LayoutDashboard } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useApp();
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-custom sticky-top">
      <div className="container-fluid px-4">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <div className="bg-primary text-white p-2 rounded-3 d-flex align-items-center justify-content-center shadow-sm">
            <ShieldAlert size={22} />
          </div>
          <div>
            <span className="fw-bold text-dark font-heading fs-5 d-block leading-tight">ReliefShield</span>
            <span className="text-muted fs-7 small d-none d-sm-block" style={{ fontSize: '0.72rem' }}>Volunteer Disaster Relief</span>
          </div>
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMain"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarMain">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4 gap-1">
            <li className="nav-item">
              <Link className="nav-link fw-medium text-secondary d-flex align-items-center gap-1 px-3" to="/">
                <Home size={17} /> Home
              </Link>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className="nav-link btn btn-link fw-medium text-secondary d-flex align-items-center gap-1 px-3 border-0 bg-transparent"
                onClick={() => navigate("/")}
              >
                <Home size={17} /> Home
              </button>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-medium text-secondary d-flex align-items-center gap-1 px-3" to="/contact">
                <PhoneCall size={17} /> Emergency Contact
              </Link>
            </li>
            {isAuthenticated && (
              <li className="nav-item">
                <Link className="nav-link fw-semibold text-primary d-flex align-items-center gap-1 px-3" to="/dashboard">
                  <LayoutDashboard size={17} /> Control Dashboard
                </Link>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-3">
            <span className="badge bg-danger-subtle text-danger border border-danger-subtle rounded-pill px-3 py-2 d-none d-md-inline-flex align-items-center gap-1 small">
              <span className="spinner-grow spinner-grow-sm text-danger" role="status" aria-hidden="true"></span>
              Emergency Hotline: 108 / 112
            </span>

            {isAuthenticated ? (
              <div className="dropdown">
                <button
                  className="btn btn-light rounded-pill border d-flex align-items-center gap-2 px-3 py-1.5"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: 32, height: 32 }}>
                    <UserIcon size={18} />
                  </div>
                  <div className="text-start d-none d-sm-block">
                    <div className="fw-semibold text-dark fs-7 leading-none" style={{ fontSize: '0.82rem' }}>{user?.name || 'Coordinator'}</div>
                    <div className="text-muted" style={{ fontSize: '0.7rem' }}>{user?.role || 'Admin'}</div>
                  </div>
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0 mt-2">
                  <li>
                    <Link className="dropdown-menu-item dropdown-item d-flex align-items-center gap-2" to="/profile">
                      <UserIcon size={16} /> My Profile
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger d-flex align-items-center gap-2" onClick={logout}>
                      <LogOut size={16} /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <Link to="/login" className="btn btn-outline-primary rounded-pill px-3 fw-semibold">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary rounded-pill px-3 fw-semibold shadow-sm">
                  Register Volunteer
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
