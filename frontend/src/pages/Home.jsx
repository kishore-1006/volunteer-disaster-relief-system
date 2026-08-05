import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Users, Flame, Home as HomeIcon, HeartHandshake, CheckSquare, MapPin, Zap, BarChart3, Globe, ArrowRight, Shield } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useApp } from '../context/AppContext';

function Home() {
  const { disasters, volunteers, shelters, donations } = useApp();

  const features = [
    {
      icon: Flame,
      title: 'Disaster Monitoring',
      description: 'Track and manage active disaster incidents with severity levels, status updates and real-time reporting.',
      color: 'bg-danger-subtle text-danger'
    },
    {
      icon: Users,
      title: 'Volunteer Deployment',
      description: 'Register, assign, and track skilled volunteers with availability status and field experience.',
      color: 'bg-primary-subtle text-primary'
    },
    {
      icon: HomeIcon,
      title: 'Shelter Management',
      description: 'Monitor shelter capacity, occupancy, and status across evacuation camps in real-time.',
      color: 'bg-warning-subtle text-warning'
    },
    {
      icon: HeartHandshake,
      title: 'Donation Tracking',
      description: 'Record and trace monetary, medical, and food donations with full transparency.',
      color: 'bg-success-subtle text-success'
    },
    {
      icon: CheckSquare,
      title: 'Relief Task Dispatch',
      description: 'Create and assign critical relief tasks to volunteers with progress tracking.',
      color: 'bg-info-subtle text-info'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Comprehensive overview with stat cards, charts, and activity feeds for data-driven decisions.',
      color: 'bg-secondary-subtle text-secondary'
    }
  ];

  const steps = [
    {
      number: 1,
      title: 'Report & Register',
      description: 'Log disaster incidents and register volunteers with their skills and availability for rapid deployment.'
    },
    {
      number: 2,
      title: 'Coordinate & Dispatch',
      description: 'Assign relief tasks, allocate shelters, and match volunteers to disaster zones based on expertise.'
    },
    {
      number: 3,
      title: 'Track & Deliver',
      description: 'Monitor donations, track task completion, and ensure resources reach affected communities efficiently.'
    }
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="landing-hero" id="hero">
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row align-items-center">
            <div className="col-lg-7 animate-fade-in-up">
              <div className="hero-badge mb-4">
                <Zap size={14} />
                Emergency Response Coordination Platform
              </div>

              <h1 className="hero-title font-heading text-white mb-4">
                Together We Can
                <span className="d-block" style={{ background: 'linear-gradient(135deg, #93c5fd, #5eead4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Save Lives
                </span>
              </h1>

              <p className="hero-subtitle mb-5">
                A comprehensive disaster relief management system that connects volunteers,
                donors, and emergency teams to coordinate life-saving relief efforts efficiently.
              </p>

              <div className="d-flex flex-wrap gap-3 mb-5">
                <Link to="/register" className="btn btn-light btn-lg rounded-pill px-4 fw-semibold shadow d-flex align-items-center gap-2">
                  <Shield size={20} />
                  Become a Volunteer
                </Link>
                <Link to="/donation" className="btn btn-outline-light btn-lg rounded-pill px-4 fw-semibold d-flex align-items-center gap-2">
                  <HeartHandshake size={20} />
                  Donate Now
                </Link>
              </div>

              {/* Live Stats Bar */}
              <div className="landing-stats-bar animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="row g-4 text-center">
                  <div className="col-3">
                    <div className="stat-number animate-count">{volunteers.length}</div>
                    <div className="stat-label">Volunteers</div>
                  </div>
                  <div className="col-3">
                    <div className="stat-number animate-count" style={{ animationDelay: '0.1s' }}>{disasters.length}</div>
                    <div className="stat-label">Incidents</div>
                  </div>
                  <div className="col-3">
                    <div className="stat-number animate-count" style={{ animationDelay: '0.2s' }}>{shelters.length}</div>
                    <div className="stat-label">Shelters</div>
                  </div>
                  <div className="col-3">
                    <div className="stat-number animate-count" style={{ animationDelay: '0.3s' }}>{donations.length}</div>
                    <div className="stat-label">Donations</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-5 d-none d-lg-flex justify-content-center">
              <div className="position-relative animate-float">
                <div className="glass-card p-4" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(16px)', width: '320px' }}>
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="bg-danger p-2 rounded-circle">
                      <Flame size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="text-white fw-semibold small">Active Alert</div>
                      <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem' }}>Real-time monitoring</div>
                    </div>
                    <span className="badge bg-danger rounded-pill ms-auto pulse-glow">LIVE</span>
                  </div>
                  <div className="p-3 rounded-3 mb-2" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div className="text-white fw-semibold small mb-1">Kerala Flash Floods</div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem' }}>
                      <MapPin size={12} className="me-1" />Wayanad · Severity: CRITICAL
                    </div>
                  </div>
                  <div className="p-3 rounded-3" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div className="text-white fw-semibold small mb-1">Coastal Cyclone Storm</div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem' }}>
                      <MapPin size={12} className="me-1" />Visakhapatnam · Severity: HIGH
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5" style={{ background: '#ffffff' }} id="features">
        <div className="container py-5">
          <div className="text-center mb-5">
            <span className="accent-badge mb-3">
              <Globe size={14} /> Platform Capabilities
            </span>
            <h2 className="font-heading display-6 fw-bold text-dark mt-3">
              Everything You Need for
              <span className="text-primary"> Disaster Relief</span>
            </h2>
            <p className="text-muted mt-2 mx-auto" style={{ maxWidth: '600px' }}>
              A fully integrated system for managing every aspect of emergency disaster response,
              from volunteer deployment to transparent donation tracking.
            </p>
          </div>

          <div className="row g-4">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="col-md-6 col-lg-4">
                  <div className="feature-card h-100">
                    <div className={`feature-icon-wrap ${feature.color}`}>
                      <Icon size={26} />
                    </div>
                    <h5 className="font-heading fw-bold text-dark mb-2">{feature.title}</h5>
                    <p className="text-muted mb-0 small">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-5" style={{ background: '#f8fafc' }} id="how-it-works">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-5">
              <span className="accent-badge mb-3">
                <Zap size={14} /> Simple Process
              </span>
              <h2 className="font-heading display-6 fw-bold text-dark mt-3 mb-3">
                How It <span className="text-primary">Works</span>
              </h2>
              <p className="text-muted">
                Our platform streamlines the entire disaster relief workflow from incident reporting
                through volunteer coordination to final delivery of aid and resources.
              </p>
            </div>

            <div className="col-lg-7">
              <div className="d-flex flex-column gap-4">
                {steps.map((step) => (
                  <div key={step.number} className="how-it-works-step">
                    <div className="step-number">{step.number}</div>
                    <div className="glass-card p-4">
                      <h5 className="font-heading fw-bold text-dark mb-2">{step.title}</h5>
                      <p className="text-muted mb-0 small">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5" id="cta">
        <div className="container py-4">
          <div className="cta-section text-center text-white">
            <h2 className="font-heading display-6 fw-bold mb-3">
              Ready to Make a Difference?
            </h2>
            <p className="mx-auto mb-4" style={{ maxWidth: '500px', color: 'rgba(255,255,255,0.8)' }}>
              Join thousands of volunteers and donors who are actively saving lives
              through coordinated disaster relief operations.
            </p>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <Link to="/register" className="btn btn-light btn-lg rounded-pill px-5 fw-semibold shadow d-flex align-items-center gap-2">
                Get Started <ArrowRight size={18} />
              </Link>
              <Link to="/dashboard" className="btn btn-outline-light btn-lg rounded-pill px-5 fw-semibold">
                View Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;