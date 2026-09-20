import React, { useState, useEffect } from 'react';

const TaskForm = ({ initialValues, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'PENDING',
    assignedVolunteerId: '',
    disasterId: '',
  });

  useEffect(() => {
    if (initialValues) {
      setFormData({
        title: initialValues.title || '',
        description: initialValues.description || '',
        status: initialValues.status || 'PENDING',
        assignedVolunteerId: initialValues.assignedVolunteerId || '',
        disasterId: initialValues.disasterId || '',
      });
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
      assignedVolunteerId: formData.assignedVolunteerId ? Number(formData.assignedVolunteerId) : null,
      disasterId: formData.disasterId ? Number(formData.disasterId) : null,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label fw-semibold">Task Title *</label>
        <input
          type="text"
          name="title"
          className="form-control"
          placeholder="e.g. Deploy Medical Triage Unit at Camp A"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label className="form-label fw-semibold">Task Status</label>
          <select
            name="status"
            className="form-select"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="PENDING">PENDING</option>
            <option value="IN_PROGRESS">IN PROGRESS</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">Assigned Volunteer ID</label>
          <input
            type="number"
            name="assignedVolunteerId"
            className="form-control"
            placeholder="e.g. 1"
            value={formData.assignedVolunteerId}
            onChange={handleChange}
            min="1"
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Linked Disaster ID</label>
        <input
          type="number"
          name="disasterId"
          className="form-control"
          placeholder="e.g. 1"
          value={formData.disasterId}
          onChange={handleChange}
          min="1"
        />
      </div>

      <div className="mb-4">
        <label className="form-label fw-semibold">Task Description & Objectives</label>
        <textarea
          name="description"
          className="form-control"
          rows="3"
          placeholder="Detail the task objectives, resources needed, and expected outcome..."
          value={formData.description}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="d-flex justify-content-end gap-2 border-top pt-3">
        <button type="button" className="btn btn-light rounded-pill px-4" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-warning rounded-pill px-4 fw-semibold text-dark">
          {initialValues ? 'Update Task' : 'Dispatch Task'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
