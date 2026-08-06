import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ShieldAlert, ArrowLeft } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

function NotFound() {
  return (
    <>
      <Navbar />

      <main className="d-flex align-items-center justify-content-center py-5" style={{ minHeight: '75vh', background: 'linear-gradient(180deg, #f8fafc 0%, #edf2f7 100%)' }}>
        <div className="container py-5 text-center">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-9">
              {/* Badge Icon */}
              <div className="d-inline-flex align-items-center justify-content-center p-3 rounded-circle bg-danger-subtle text-danger mb-4 shadow-sm" style={{ width: '80px', height: '80px' }}>
                <ShieldAlert size={40} />
              </div>

              {/* Large 404 Heading */}
              <h1 className="display-1 fw-bold font-heading mb-0" style={{ fontSize: 'calc(4rem + 4vw)', background: 'linear-gradient(135deg, #0f172a 0%, #1e40af 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '-0.04em' }}>
                404
              </h1>

              {/* Title */}
              <h2 className="font-heading h3 text-dark fw-bold mb-3">
                Page Not Found
              </h2>

              {/* Description */}
              <p className="text-muted fs-6 mx-auto mb-4" style={{ maxWidth: '480px' }}>
                Oops! The page you are looking for doesn't exist or has been moved to another location in the disaster relief system.
              </p>

              {/* Action Buttons */}
              <div className="d-flex flex-wrap justify-content-center gap-3">
                <Link to="/" className="btn btn-primary rounded-pill px-4 py-2.5 fw-semibold shadow-sm d-inline-flex align-items-center gap-2">
                  <Home size={18} />
                  Back to Home
                </Link>
                <button onClick={() => window.history.back()} className="btn btn-outline-secondary rounded-pill px-4 py-2.5 fw-semibold d-inline-flex align-items-center gap-2">
                  <ArrowLeft size={18} />
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default NotFound;
