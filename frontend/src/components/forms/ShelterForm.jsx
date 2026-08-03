import React, { useState, useEffect } from 'react';

const ShelterForm = ({ initialValues, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    capacity: 100,
    currentOccupancy: 0,
    contactNumber: '',
    status: 'OPEN'
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
      capacity: parseInt(formData.capacity, 10) || 0,
      currentOccupancy: parseInt(formData.currentOccupancy, 10) || 0,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label fw-semibold">Shelter / Camp Name *</label>
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="e.g. Central St. Mary Relief Camp"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label className="form-label fw-semibold">Location / Address *</label>
          <input
            type="text"
            name="location"
            className="form-control"
            placeholder="e.g. Kalpetta Town, Wayanad"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">Contact Phone Number</label>
          <input
            type="text"
            name="contactNumber"
            className="form-control"
            placeholder="+91 4936 202100"
            value={formData.contactNumber}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-md-4">
          <label className="form-label fw-semibold">Total Capacity</label>
          <input
            type="number"
            name="capacity"
            className="form-control"
            min="1"
            value={formData.capacity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4">
          <label className="form-label fw-semibold">Current Occupancy</label>
          <input
            type="number"
            name="currentOccupancy"
            className="form-control"
            min="0"
            value={formData.currentOccupancy}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label fw-semibold">Shelter Status</label>
          <select
            name="status"
            className="form-select"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="OPEN">OPEN</option>
            <option value="FULL">FULL</option>
            <option value="STANDBY">STANDBY</option>
            <option value="CLOSED">CLOSED</option>
          </select>
        </div>
      </div>

      <div className="d-flex justify-content-end gap-2 border-top pt-3">
        <button type="button" className="btn btn-light rounded-pill px-4" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary rounded-pill px-4 fw-semibold">
          {initialValues ? 'Update Shelter' : 'Create Shelter'}
        </button>
      </div>
    </form>
  );
};

export default ShelterForm;
