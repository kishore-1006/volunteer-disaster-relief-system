import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, Mail, Lock, LogIn, Users, HeartHandshake, Flame, Eye, EyeOff, KeyRound } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Modal from '../components/ui/Modal';

function Login() {
  const { login, forgotPassword, resetPassword } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Forgot Password State
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotStep, setForgotStep] = useState(1); // 1 = request token, 2 = reset password
  const [resetEmail, setResetEmail] = useState('');
  const [resetTokenInput, setResetTokenInput] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isForgotLoading, setIsForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState('');

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);
    if (result && result.success) {
      navigate('/dashboard');
    }
  };

  const handleOpenForgotModal = (e) => {
    e.preventDefault();
    setResetEmail(email || '');
    setResetTokenInput('');
    setNewPassword('');
    setForgotError('');
    setForgotStep(1);
    setIsForgotModalOpen(true);
  };

  const handleRequestToken = async (e) => {
    e.preventDefault();
    if (!resetEmail.trim()) {
      setForgotError('Please enter your email address.');
      return;
    }
    setIsForgotLoading(true);
    setForgotError('');
    const res = await forgotPassword(resetEmail);
    setIsForgotLoading(false);
    if (res && res.success) {
      if (res.resetToken) {
        setResetTokenInput(res.resetToken);
      }
      setForgotStep(2);
    } else if (res && res.message) {
      setForgotError(res.message);
    }
  };

  const handleConfirmReset = async (e) => {
    e.preventDefault();
    if (!resetTokenInput.trim()) {
      setForgotError('Please enter the reset token.');
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setForgotError('New password must be at least 6 characters long.');
      return;
    }
    setIsForgotLoading(true);
    setForgotError('');
    const res = await resetPassword({
      email: resetEmail,
      token: resetTokenInput,
      newPassword: newPassword,
    });
    setIsForgotLoading(false);
    if (res && res.success) {
      setIsForgotModalOpen(false);
      setEmail(resetEmail);
    } else if (res && res.message) {
      setForgotError(res.message);
    }
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

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label fw-semibold text-dark small">Email Address</label>
              <div className="position-relative">
                <Mail size={18} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                <input
                  type="email"
                  className={`form-control auth-input ps-5 ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="coordinator@reliefshield.org"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
                  }}
                  required
                />
                {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold text-dark small">Password</label>
              <div className="position-relative">
                <Lock size={18} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`form-control auth-input ps-5 pe-5 ${errors.password ? 'is-invalid' : ''}`}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: null }));
                  }}
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
                {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="rememberMe" />
                <label className="form-check-label small text-muted" htmlFor="rememberMe">Remember me</label>
              </div>
              <button
                type="button"
                className="btn btn-link p-0 small fw-semibold text-primary text-decoration-none"
                onClick={handleOpenForgotModal}
              >
                Forgot password?
              </button>
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
              Enter your registered email and password to access the command center
            </p>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
        title={forgotStep === 1 ? "Forgot Password" : "Reset Your Password"}
      >
        {forgotStep === 1 ? (
          <form onSubmit={handleRequestToken}>
            <p className="text-muted small mb-3">
              Enter your registered email address and we will generate a secure password reset token.
            </p>

            {forgotError && (
              <div className="alert alert-danger py-2 px-3 small rounded-3 mb-3">
                {forgotError}
              </div>
            )}

            <div className="mb-4">
              <label className="form-label fw-semibold text-dark small">Email Address</label>
              <div className="position-relative">
                <Mail size={18} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                <input
                  type="email"
                  className="form-control auth-input ps-5"
                  placeholder="volunteer@relief.org"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary rounded-pill px-4"
                onClick={() => setIsForgotModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary rounded-pill px-4 fw-semibold"
                disabled={isForgotLoading}
              >
                {isForgotLoading ? 'Generating...' : 'Get Reset Token'}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleConfirmReset}>
            <p className="text-muted small mb-3">
              Enter the reset token generated for <strong>{resetEmail}</strong> and create your new password.
            </p>

            {forgotError && (
              <div className="alert alert-danger py-2 px-3 small rounded-3 mb-3">
                {forgotError}
              </div>
            )}

            <div className="mb-3">
              <label className="form-label fw-semibold text-dark small">Reset Token</label>
              <div className="position-relative">
                <KeyRound size={18} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                <input
                  type="text"
                  className="form-control auth-input ps-5"
                  placeholder="e.g. 8A3F12C0"
                  value={resetTokenInput}
                  onChange={(e) => setResetTokenInput(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold text-dark small">New Password</label>
              <div className="position-relative">
                <Lock size={18} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                <input
                  type="password"
                  className="form-control auth-input ps-5"
                  placeholder="Minimum 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary rounded-pill px-4"
                onClick={() => setIsForgotModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary rounded-pill px-4 fw-semibold"
                disabled={isForgotLoading}
              >
                {isForgotLoading ? 'Updating Password...' : 'Reset Password'}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}

export default Login;