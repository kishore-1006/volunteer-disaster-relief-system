import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User, Mail, Phone, MapPin, Briefcase, Calendar, Shield,
  Edit3, Award, Clock, CheckCircle, Activity, LogOut
} from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import { useApp } from '../context/AppContext';

function Profile() {
  const { user, volunteers, donations, tasks, disasters, logout, isAuthenticated } = useApp();
  const navigate = useNavigate();

  // Try to find matching volunteer record for extra data
  const volunteerRecord = volunteers.find(v => v.email === user?.email) || volunteers[0] || {};

  const completedTasks = tasks.filter(t => t.status === 'COMPLETED').length;
  const inProgressTasks = tasks.filter(t => t.status === 'IN_PROGRESS').length;
  const totalDonationsManaged = donations.length;
  const activeDisasters = disasters.filter(d => d.status === 'ACTIVE').length;

  const profileStats = [
    { label: 'Tasks Completed', value: completedTasks, icon: CheckCircle, color: 'success' },
    { label: 'Active Assignments', value: inProgressTasks, icon: Activity, color: 'primary' },
    { label: 'Donations Managed', value: totalDonationsManaged, icon: Award, color: 'warning' },
    { label: 'Active Disasters', value: activeDisasters, icon: Shield, color: 'danger' },
  ];

  const personalInfo = [
    { label: 'Full Name', value: user?.name || volunteerRecord.name || 'Coordinator', icon: User },
    { label: 'Email', value: user?.email || volunteerRecord.email || 'admin@reliefnet.org', icon: Mail },
    { label: 'Phone', value: volunteerRecord.phoneNumber || '+91 98765 43210', icon: Phone },
    { label: 'Location', value: volunteerRecord.location || 'Mumbai, Maharashtra', icon: MapPin },
    { label: 'Skills', value: volunteerRecord.skills || 'Operations Management, Leadership', icon: Briefcase },
    { label: 'Experience', value: `${volunteerRecord.experienceYears || 5} Years`, icon: Calendar },
    { label: 'Role', value: user?.role || 'ADMIN', icon: Shield },
  ];

  const initials = (user?.name || volunteerRecord.name || 'AC')
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <Navbar />
      <div className="page-layout">
        <Sidebar />
        <main className="page-content">
          {/* Page Header */}
          <div className="page-header d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">
            <div>
              <h1 className="page-title">My Profile</h1>
              <p className="page-subtitle">View and manage your volunteer profile information</p>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-primary rounded-pill px-3 fw-semibold d-flex align-items-center gap-2 shadow-sm">
                <Edit3 size={16} />
                Edit Profile
              </button>
              <button
                className="btn btn-outline-danger rounded-pill px-3 fw-semibold d-flex align-items-center gap-2"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>

          {/* Profile Card + Stats */}
          <div className="row g-4 mb-4 animate-fade-in">
            {/* Profile Card */}
            <div className="col-lg-4">
              <div className="glass-card p-4 text-center h-100">
                <div className="profile-avatar mx-auto mb-3">
                  {initials}
                </div>
                <h4 className="font-heading fw-bold text-dark mb-1">
                  {user?.name || volunteerRecord.name || 'Admin Coordinator'}
                </h4>
                <p className="text-muted small mb-3">
                  {user?.email || volunteerRecord.email || 'admin@reliefnet.org'}
                </p>

                <div className="d-flex justify-content-center gap-2 mb-3">
                  <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-1 small fw-semibold">
                    {user?.role || 'ADMIN'}
                  </span>
                  <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3 py-1 small fw-semibold">
                    <span className="spinner-grow spinner-grow-sm text-success me-1" role="status" style={{ width: '6px', height: '6px' }}></span>
                    Active
                  </span>
                </div>

                <div className="border-top pt-3">
                  <div className="d-flex align-items-center justify-content-center gap-2 text-muted small mb-2">
                    <MapPin size={14} />
                    {volunteerRecord.location || 'Mumbai, Maharashtra'}
                  </div>
                  <div className="d-flex align-items-center justify-content-center gap-2 text-muted small">
                    <Clock size={14} />
                    Member since Aug 2026
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="col-lg-8">
              <div className="row g-3 mb-3">
                {profileStats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="col-6">
                      <div className="profile-stat-card">
                        <div className={`stat-card-icon bg-${stat.color}-subtle text-${stat.color} mx-auto mb-2`}>
                          <Icon size={22} />
                        </div>
                        <h3 className="font-heading fw-bold text-dark mb-0">{stat.value}</h3>
                        <span className="text-muted small">{stat.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Skills Section */}
              <div className="glass-card p-4">
                <h6 className="font-heading fw-bold text-dark mb-3 d-flex align-items-center gap-2">
                  <Briefcase size={18} className="text-primary" />
                  Skills & Certifications
                </h6>
                <div className="d-flex flex-wrap gap-2">
                  {(volunteerRecord.skills || 'Operations Management, Leadership, Logistics')
                    .split(',')
                    .map((skill, idx) => (
                      <span
                        key={idx}
                        className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-2 small fw-medium"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="glass-card p-4 mb-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h5 className="font-heading fw-bold text-dark mb-0 d-flex align-items-center gap-2">
                <User size={18} className="text-primary" />
                Personal Information
              </h5>
              <button className="btn btn-sm btn-outline-primary rounded-pill px-3 d-flex align-items-center gap-1">
                <Edit3 size={14} />
                Edit
              </button>
            </div>

            <div className="row">
              {personalInfo.map((info, idx) => {
                const Icon = info.icon;
                return (
                  <div key={idx} className="col-md-6">
                    <div className="profile-info-row">
                      <div className="profile-info-label d-flex align-items-center gap-2">
                        <Icon size={14} className="text-primary" />
                        {info.label}
                      </div>
                      <div className="profile-info-value">{info.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="glass-card p-4">
            <h5 className="font-heading fw-bold text-dark mb-3 d-flex align-items-center gap-2">
              <Activity size={18} className="text-primary" />
              Recent Activity
            </h5>
            <div className="d-flex flex-column gap-3">
              {[
                { title: 'Deployed Medical Triage Unit at Camp A', time: '2 hours ago', type: 'task', color: 'primary' },
                { title: 'Coordinated 2,000 Water Ration Packs', time: '4 hours ago', type: 'completed', color: 'success' },
                { title: 'Approved ₹5,00,000 donation from Apex Tech', time: '6 hours ago', type: 'donation', color: 'warning' },
                { title: 'Updated shelter occupancy for Camp A', time: '1 day ago', type: 'shelter', color: 'info' },
              ].map((activity, idx) => (
                <div key={idx} className="d-flex align-items-start gap-3 pb-3" style={{ borderBottom: idx < 3 ? '1px solid #f1f5f9' : 'none' }}>
                  <div
                    className={`bg-${activity.color}-subtle text-${activity.color} rounded-circle d-flex align-items-center justify-content-center flex-shrink-0`}
                    style={{ width: 36, height: 36 }}
                  >
                    <Activity size={16} />
                  </div>
                  <div className="flex-grow-1">
                    <div className="fw-medium text-dark small">{activity.title}</div>
                    <div className="text-muted" style={{ fontSize: '0.75rem' }}>{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Profile;