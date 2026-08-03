import React, { useState, useEffect } from 'react';

const DisasterForm = ({ initialValues, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    severityLevel: 'HIGH',
    status: 'ACTIVE'
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
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label fw-semibold">Disaster Title *</label>
        <input
          type="text"
          name="title"
          className="form-control"
          placeholder="e.g. Coastal Cyclone Storm"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label className="form-label fw-semibold">Location / District *</label>
          <input
            type="text"
            name="location"
            className="form-control"
            placeholder="e.g. Wayanad, Kerala"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">Severity Level</label>
          <select
            name="severityLevel"
            className="form-select"
            value={formData.severityLevel}
            onChange={handleChange}
          >
            <option value="CRITICAL">CRITICAL</option>
            <option value="HIGH">HIGH</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="LOW">LOW</option>
          </select>
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label className="form-label fw-semibold">Incident Status</label>
          <select
            name="status"
            className="form-select"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="UNDER_CONTROL">UNDER CONTROL</option>
            <option value="RESOLVED">RESOLVED</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="form-label fw-semibold">Incident Description & Relief Needs</label>
        <textarea
          name="description"
          className="form-control"
          rows="3"
          placeholder="Detail affected population, damage scale, and urgent needs..."
          value={formData.description}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="d-flex justify-content-end gap-2 border-top pt-3">
        <button type="button" className="btn btn-light rounded-pill px-4" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary rounded-pill px-4 fw-semibold">
          {initialValues ? 'Update Incident' : 'Report Incident'}
        </button>
      </div>
    </form>
  );
};

export default DisasterForm;
