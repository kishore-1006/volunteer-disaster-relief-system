import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

const DonationForm = ({ initialValues, onSubmit, onCancel }) => {
  const { disasters } = useApp();
  const [formData, setFormData] = useState({
    donorName: '',
    donationType: 'MONEY',
    amountOrQuantity: 0,
    disasterId: disasters.length > 0 ? disasters[0].id : '',
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
      amountOrQuantity: parseFloat(formData.amountOrQuantity) || 0,
      disasterId: parseInt(formData.disasterId, 10) || null,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label fw-semibold">Donor Name / Organization *</label>
        <input
          type="text"
          name="donorName"
          className="form-control"
          placeholder="e.g. Apex Tech Relief Foundation"
          value={formData.donorName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label className="form-label fw-semibold">Donation Type</label>
          <select
            name="donationType"
            className="form-select"
            value={formData.donationType}
            onChange={handleChange}
          >
            <option value="MONEY">Money (₹)</option>
            <option value="MEDICAL_KITS">Medical Kits</option>
            <option value="FOOD_PACKS">Food Packs</option>
            <option value="CLOTHING">Clothing</option>
            <option value="OTHER">Other Supplies</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">
            {formData.donationType === 'MONEY' ? 'Amount (₹)' : 'Quantity'} *
          </label>
          <input
            type="number"
            name="amountOrQuantity"
            className="form-control"
            min="1"
            placeholder={formData.donationType === 'MONEY' ? '500000' : '100'}
            value={formData.amountOrQuantity}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="form-label fw-semibold">Linked Disaster Incident</label>
        <select
          name="disasterId"
          className="form-select"
          value={formData.disasterId}
          onChange={handleChange}
        >
          <option value="">— No linked incident —</option>
          {disasters.map((d) => (
            <option key={d.id} value={d.id}>
              {d.title} ({d.location})
            </option>
          ))}
        </select>
      </div>

      <div className="d-flex justify-content-end gap-2 border-top pt-3">
        <button type="button" className="btn btn-light rounded-pill px-4" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary rounded-pill px-4 fw-semibold">
          {initialValues ? 'Update Donation' : 'Record Donation'}
        </button>
      </div>
    </form>
  );
};

export default DonationForm;
