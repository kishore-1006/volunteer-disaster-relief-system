import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, User, Mail, Lock, Phone, MapPin, Briefcase, UserPlus, Eye, EyeOff, Shield, Globe, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

function Register() {
  const { addVolunteer, login } = useApp();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    location: '',
    skills: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      addVolunteer({
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        skills: formData.skills,
        availabilityStatus: 'AVAILABLE',
        location: formData.location,
        experienceYears: 1,
      });
      login(formData.email, formData.password);
      setIsLoading(false);
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="auth-page">
      {/* Left Brand Panel */}
      <div className="col-lg-5 d-none d-lg-flex auth-brand-panel">
        <div className="position-relative" style={{ zIndex: 2 }}>
          <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none mb-5">
            <div className="bg-white bg-opacity-10 p-2 rounded-3 border" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
              <ShieldAlert size={24} className="text-white" />
            </div>
            <span className="text-white fw-bold fs-4 font-heading">ReliefShield</span>
          </Link>

          <h2 className="text-white font-heading fw-bold display-6 mb-3">
            Join the Relief<br />Network
          </h2>
          <p className="mb-5" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: '380px', lineHeight: 1.7 }}>
            Register as a volunteer to be part of a community saving lives during disasters.
            Your skills and availability can make a real difference.
          </p>

          <div className="d-flex flex-column gap-3">
            <div className="auth-feature-item">
              <div className="auth-feature-icon">
                <Shield size={18} className="text-white" />
              </div>
              <div>
                <div className="text-white fw-semibold small">Secure Registration</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem' }}>Your data is protected and encrypted</div>
              </div>
            </div>
            <div className="auth-feature-item">
              <div className="auth-feature-icon">
                <Globe size={18} className="text-white" />
              </div>
              <div>
                <div className="text-white fw-semibold small">Nationwide Network</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem' }}>Connect with relief teams across India</div>
              </div>
            </div>
            <div className="auth-feature-item">
              <div className="auth-feature-icon">
                <CheckCircle size={18} className="text-white" />
              </div>
              <div>
                <div className="text-white fw-semibold small">Instant Deployment</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem' }}>Get assigned to active operations immediately</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="col-lg-7 col-12 auth-form-panel">
        <div className="auth-form-card animate-fade-in">
          {/* Mobile logo */}
          <div className="d-lg-none text-center mb-4">
            <Link to="/" className="d-inline-flex align-items-center gap-2 text-decoration-none">
              <div className="bg-primary text-white p-2 rounded-3">
                <ShieldAlert size={24} />
              </div>
              <span className="fw-bold fs-4 font-heading text-dark">ReliefShield</span>
            </Link>
          </div>

          <h3 className="font-heading fw-bold text-dark mb-1">Create Account</h3>
          <p className="text-muted mb-4">Register as a volunteer to join disaster relief operations</p>

          <form onSubmit={handleSubmit}>
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold text-dark small">Full Name *</label>
                <div className="position-relative">
                  <User size={18} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                  <input
                    type="text"
                    name="name"
                    className="form-control auth-input ps-5"
                    placeholder="Dr. Rajesh Sharma"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold text-dark small">Email Address *</label>
                <div className="position-relative">
                  <Mail size={18} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                  <input
                    type="email"
                    name="email"
                    className="form-control auth-input ps-5"
                    placeholder="volunteer@relief.org"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold text-dark small">Phone Number *</label>
                <div className="position-relative">
                  <Phone size={18} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                  <input
                    type="text"
                    name="phoneNumber"
                    className="form-control auth-input ps-5"
                    placeholder="+91 98765 43210"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold text-dark small">Base Location</label>
                <div className="position-relative">
                  <MapPin size={18} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                  <input
                    type="text"
                    name="location"
                    className="form-control auth-input ps-5"
                    placeholder="Mumbai, Maharashtra"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold text-dark small">Skills & Certifications</label>
              <div className="position-relative">
                <Briefcase size={18} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                <input
                  type="text"
                  name="skills"
                  className="form-control auth-input ps-5"
                  placeholder="Medical Triage, Search & Rescue, Logistics"
                  value={formData.skills}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold text-dark small">Password *</label>
              <div className="position-relative">
                <Lock size={18} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="form-control auth-input ps-5 pe-5"
                  placeholder="Create a secure password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="btn btn-link position-absolute top-50 end-0 translate-middle-y me-2 text-muted p-0"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn auth-btn w-100 d-flex align-items-center justify-content-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Creating Account...
                </>
              ) : (
                <>
                  <UserPlus size={18} />
                  Register & Join Operations
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-muted small mb-0">
              Already have an account?{' '}
              <Link to="/login" className="fw-semibold text-primary text-decoration-none">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;