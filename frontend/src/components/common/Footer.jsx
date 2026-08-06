import React from 'react';
import { ShieldAlert, Heart, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-auto">
      <div className="container">
        <div className="row g-4 mb-4">
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="bg-primary text-white p-2 rounded-3">
                <ShieldAlert size={22} />
              </div>
              <h5 className="mb-0 font-heading text-white">ReliefShield System</h5>
            </div>
            <p className="text-secondary small mb-3">
              An integrated final-year Information Technology project platform empowering emergency disaster response, real-time shelter allocation, volunteer deployment, and transparent donation distribution.
            </p>
            <div className="d-flex gap-3 text-secondary">
              <span className="small d-flex align-items-center gap-1">
                <MapPin size={15} className="text-primary" /> National Disaster Cell
              </span>
            </div>
          </div>

          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold mb-3 text-light font-heading">Quick Links</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2 text-secondary">
              <li><Link to="/" className="text-decoration-none text-secondary hover-white">Home Landing</Link></li>
              <li><Link to="/about" className="text-decoration-none text-secondary hover-white">System Architecture</Link></li>
              <li><Link to="/contact" className="text-decoration-none text-secondary hover-white">Emergency Helplines</Link></li>
              <li><Link to="/dashboard" className="text-decoration-none text-secondary hover-white">Control Center</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-3 text-light font-heading">Relief Operations</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2 text-secondary">
              <li><Link to="/disaster" className="text-decoration-none text-secondary">Incident Monitoring</Link></li>
              <li><Link to="/volunteer" className="text-decoration-none text-secondary">Volunteer Registration</Link></li>
              <li><Link to="/shelter" className="text-decoration-none text-secondary">Evacuation Shelters</Link></li>
              <li><Link to="/donation" className="text-decoration-none text-secondary">Transparent Supplies</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-3 text-light font-heading">Emergency Hotlines</h6>
            <div className="bg-secondary bg-opacity-10 p-3 rounded-3 border border-secondary border-opacity-25">
              <div className="d-flex align-items-center gap-2 mb-2">
                <Phone size={16} className="text-danger" />
                <span className="fw-bold text-white small">National Emergency: 112</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <Mail size={16} className="text-info" />
                <span className="text-secondary small">control@reliefshield.org</span>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-secondary opacity-25 my-4" />

        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3 text-secondary small">
          <div>
            &copy; {new Date().getFullYear()} Volunteer Disaster Relief System | Information Technology Project
          </div>
          <div className="d-flex align-items-center gap-1">
            Built with <Heart size={14} className="text-danger fill-danger" /> using Spring Boot & React.js
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
