import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, Mail, Lock, LogIn, Users, HeartHandshake, Flame, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';

function Login() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login(email, password);
      setIsLoading(false);
      navigate('/dashboard');
    }, 600);
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
            Welcome Back,<br />Coordinator
          </h2>
          <p className="mb-5" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: '380px', lineHeight: 1.7 }}>
            Access the disaster relief command center to manage operations,
            track resources, and coordinate life-saving efforts.
          </p>

          <div className="d-flex flex-column gap-2">
            <div className="auth-feature-item">
              <div className="auth-feature-icon">
                <Flame size={18} className="text-white" />
              </div>
              <div>
                <div className="text-white fw-semibold small">Real-time Monitoring</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem' }}>Track active disasters and shelter status</div>
              </div>
            </div>
            <div className="auth-feature-item">
              <div className="auth-feature-icon">
                <Users size={18} className="text-white" />
              </div>
              <div>
                <div className="text-white fw-semibold small">Volunteer Coordination</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem' }}>Deploy and manage relief teams instantly</div>
              </div>
            </div>
            <div className="auth-feature-item">
              <div className="auth-feature-icon">
                <HeartHandshake size={18} className="text-white" />
              </div>
              <div>
                <div className="text-white fw-semibold small">Donation Transparency</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem' }}>Full audit trail for all relief resources</div>
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

          <h3 className="font-heading fw-bold text-dark mb-1">Sign In</h3>
          <p className="text-muted mb-4">Enter your credentials to access the command center</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold text-dark small">Email Address</label>
              <div className="position-relative">
                <Mail size={18} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                <input
                  type="email"
                  className="form-control auth-input ps-5"
                  placeholder="coordinator@reliefshield.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold text-dark small">Password</label>
              <div className="position-relative">
                <Lock size={18} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control auth-input ps-5 pe-5"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="rememberMe" />
                <label className="form-check-label small text-muted" htmlFor="rememberMe">Remember me</label>
              </div>
              <Link to="#" className="small fw-semibold text-primary text-decoration-none">Forgot password?</Link>
            </div>

            <button
              type="submit"
              className="btn auth-btn w-100 d-flex align-items-center justify-content-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Authenticating...
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  Sign In to Dashboard
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-muted small mb-0">
              New to the platform?{' '}
              <Link to="/register" className="fw-semibold text-primary text-decoration-none">
                Register as Volunteer
              </Link>
            </p>
          </div>

          <div className="mt-4 p-3 rounded-3 bg-light border text-center">
            <p className="text-muted small mb-1 fw-medium">Demo Access</p>
            <p className="text-muted small mb-0" style={{ fontSize: '0.78rem' }}>
              Enter any email and password to access the dashboard
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;