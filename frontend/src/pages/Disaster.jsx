import React, { useState, useMemo } from 'react';
import { Flame, AlertTriangle } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import DataTable from '../components/tables/DataTable';
import SearchBar from '../components/ui/SearchBar';
import Modal from '../components/ui/Modal';
import DisasterForm from '../components/forms/DisasterForm';
import { useApp } from '../context/AppContext';
import { formatDate, getSeverityBadgeClass, getStatusBadgeClass } from '../utils/formatters';

function Disaster() {
  const { disasters, addDisaster, updateDisaster, deleteDisaster } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filterOptions = [
    { value: 'ACTIVE', label: 'Active' },
    { value: 'UNDER_CONTROL', label: 'Under Control' },
    { value: 'RESOLVED', label: 'Resolved' },
  ];

  const filteredData = useMemo(() => {
    return disasters.filter((item) => {
      const matchesSearch =
        item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterValue === 'ALL' || item.status === filterValue;
      return matchesSearch && matchesFilter;
    });
  }, [disasters, searchTerm, filterValue]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    {
      header: 'Incident',
      render: (row) => (
        <div>
          <div className="fw-semibold text-dark">{row.title}</div>
          <div className="text-muted small text-truncate" style={{ maxWidth: '250px' }}>{row.description}</div>
        </div>
      )
    },
    {
      header: 'Location',
      render: (row) => (
        <span className="small text-secondary">{row.location}</span>
      )
    },
    {
      header: 'Severity',
      render: (row) => (
        <span className={`badge-status ${getSeverityBadgeClass(row.severityLevel)}`}>
          {row.severityLevel}
        </span>
      )
    },
    {
      header: 'Status',
      render: (row) => (
        <span className={`badge-status ${getStatusBadgeClass(row.status)}`}>
          {row.status?.replace('_', ' ')}
        </span>
      )
    },
    {
      header: 'Reported',
      render: (row) => (
        <span className="small text-muted">{formatDate(row.reportedAt)}</span>
      )
    }
  ];

  const handleAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (row) => {
    setEditingItem(row);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this disaster incident?')) {
      deleteDisaster(id);
    }
  };

  const handleSubmit = (formData) => {
    if (editingItem) {
      updateDisaster(editingItem.id, formData);
    } else {
      addDisaster(formData);
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  return (
    <>
      <Navbar />
      <div className="page-layout">
        <Sidebar />
        <main className="page-content">
          <div className="page-header d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">
            <div>
              <div className="d-flex align-items-center gap-2">
                <h1 className="page-title mb-0">Disaster Incidents</h1>
                <span className="badge bg-danger-subtle text-danger border border-danger-subtle rounded-pill px-2 py-1 small">
                  {disasters.filter(d => d.status === 'ACTIVE').length} Active
                </span>
              </div>
              <p className="page-subtitle">Monitor and manage disaster incidents across regions</p>
            </div>
          </div>

          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={(val) => { setSearchTerm(val); setCurrentPage(1); }}
            filterValue={filterValue}
            onFilterChange={(val) => { setFilterValue(val); setCurrentPage(1); }}
            filterOptions={filterOptions}
            placeholder="Search incidents by title or location..."
            onAddClick={handleAdd}
            addButtonLabel="Report Incident"
          />

          <DataTable
            columns={columns}
            data={paginatedData}
            onEdit={handleEdit}
            onDelete={handleDelete}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredData.length}
            itemsPerPage={itemsPerPage}
            emptyMessage="No disaster incidents found matching your criteria."
          />

          <Modal
            isOpen={isModalOpen}
            onClose={() => { setIsModalOpen(false); setEditingItem(null); }}
            title={editingItem ? 'Update Disaster Incident' : 'Report New Disaster Incident'}
            size="lg"
          >
            <DisasterForm
              initialValues={editingItem}
              onSubmit={handleSubmit}
              onCancel={() => { setIsModalOpen(false); setEditingItem(null); }}
            />
          </Modal>
        </main>
      </div>
    </>
  );
}

export default Disaster;