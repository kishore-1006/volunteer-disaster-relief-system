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
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues);
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,15}$/;

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required.';
    } else if (!phoneRegex.test(formData.phoneNumber) || formData.phoneNumber.replace(/\D/g, '').length < 10) {
      newErrors.phoneNumber = 'Please enter a valid phone number (at least 10 digits).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      ...formData,
      experienceYears: parseInt(formData.experienceYears, 10) || 0
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label className="form-label fw-semibold">Full Name *</label>
          <input
            type="text"
            name="name"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            placeholder="e.g. Dr. Rajesh Sharma"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">Email Address *</label>
          <input
            type="email"
            name="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            placeholder="volunteer@relief.org"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label className="form-label fw-semibold">Phone Number *</label>
          <input
            type="text"
            name="phoneNumber"
            className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
            placeholder="+91 98765 43210"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          {errors.phoneNumber && <div className="invalid-feedback d-block">{errors.phoneNumber}</div>}
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
