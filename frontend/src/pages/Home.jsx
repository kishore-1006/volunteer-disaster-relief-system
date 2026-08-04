import React from "react";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />

      <section
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/images/hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="text-center text-white">
          <h1 className="display-2 fw-bold">
            Together We Can Save Lives
          </h1>

          <p className="lead mt-3">
            Volunteer Disaster Relief System helps volunteers, donors and
            disaster management teams coordinate relief efforts efficiently.
          </p>

          <div className="mt-4">
            <button className="btn btn-warning btn-lg me-3">
              Become a Volunteer
            </button>

            <button className="btn btn-outline-light btn-lg">
              Donate Now
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
<section className="container py-5">
  <div className="text-center mb-5">
    <h2 className="fw-bold">Our Key Features</h2>
    <p className="text-muted">
      Connecting volunteers, donors and disaster response teams.
    </p>
  </div>

  <div className="row">

    <div className="col-md-4">
      <div className="card shadow p-4 text-center">
        <h3>🧑‍🤝‍🧑</h3>
        <h5>Volunteer Management</h5>
        <p>Manage volunteers easily.</p>
      </div>
    </div>

    <div className="col-md-4">
      <div className="card shadow p-4 text-center">
        <h3>💰</h3>
        <h5>Donation Tracking</h5>
        <p>Track donations securely.</p>
      </div>
    </div>

    <div className="col-md-4">
      <div className="card shadow p-4 text-center">
        <h3>🚨</h3>
        <h5>Disaster Alerts</h5>
        <p>Receive emergency updates.</p>
      </div>
    </div>

  </div>
</section>
export default Home;