import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Flame,
  Users,
  Home,
  HeartHandshake,
  CheckSquare,
  User,
  ShieldAlert
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Disaster Incidents', path: '/disaster', icon: Flame },
    { label: 'Volunteer Roster', path: '/volunteer', icon: Users },
    { label: 'Shelters & Camps', path: '/shelter', icon: Home },
    { label: 'Donations & Supplies', path: '/donation', icon: HeartHandshake },
    { label: 'Relief Dispatch Tasks', path: '/task', icon: CheckSquare },
    { label: 'My Profile', path: '/profile', icon: User },
  ];

  return (
    <aside className="sidebar-container d-flex flex-column py-3 shadow-sm">
      <div className="px-4 mb-3 d-none d-md-block">
        <span className="text-uppercase text-muted fw-bold" style={{ fontSize: '0.7rem', letterSpacing: '0.08em' }}>
          Management Modules
        </span>
      </div>

      <nav className="nav flex-column gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <Icon size={19} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto px-3 pt-4">
        <div className="p-3 rounded-3 bg-light border text-center">
          <ShieldAlert size={28} className="text-primary mb-2" />
          <h6 className="fw-bold mb-1 fs-7">Emergency Operations</h6>
          <p className="text-muted mb-2" style={{ fontSize: '0.72rem' }}>
            System ready for API synchronization with Spring Boot Backend.
          </p>
          <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-2 py-1 small" style={{ fontSize: '0.68rem' }}>
            Mock API Active
          </span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
