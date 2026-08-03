import React, { useState, useEffect } from 'react';

const VolunteerForm = ({ initialValues, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    skills: '',
    availabilityStatus: 'AVAILABLE',
    location: '',
    experienceYears: 1
  });

  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues);
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      experienceYears: parseInt(formData.experienceYears, 10) || 0
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label className="form-label fw-semibold">Full Name *</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="e.g. Dr. Rajesh Sharma"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">Email Address *</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="volunteer@relief.org"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label className="form-label fw-semibold">Phone Number *</label>
          <input
            type="text"
            name="phoneNumber"
            className="form-control"
            placeholder="+91 98765 43210"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">Location / Base City</label>
          <input
            type="text"
            name="location"
            className="form-control"
            placeholder="e.g. Kochi, Kerala"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label className="form-label fw-semibold">Availability Status</label>
          <select
            name="availabilityStatus"
            className="form-select"
            value={formData.availabilityStatus}
            onChange={handleChange}
          >
            <option value="AVAILABLE">AVAILABLE</option>
            <option value="ON_TASK">ON TASK</option>
            <option value="OFFLINE">OFFLINE</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">Field Experience (Years)</label>
          <input
            type="number"
            name="experienceYears"
            className="form-control"
            min="0"
            max="40"
            value={formData.experienceYears}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="form-label fw-semibold">Key Skills & Certifications</label>
        <input
          type="text"
          name="skills"
          className="form-control"
          placeholder="e.g. Medical Triage, Trauma Care, Drone Mapping"
          value={formData.skills}
          onChange={handleChange}
        />
      </div>

      <div className="d-flex justify-content-end gap-2 border-top pt-3">
        <button type="button" className="btn btn-light rounded-pill px-4" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary rounded-pill px-4 fw-semibold">
          {initialValues ? 'Update Volunteer' : 'Register Volunteer'}
        </button>
      </div>
    </form>
  );
};

export default VolunteerForm;
