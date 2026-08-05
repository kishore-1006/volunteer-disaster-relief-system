import React, { useState, useMemo } from 'react';
import { Users } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import DataTable from '../components/tables/DataTable';
import SearchBar from '../components/ui/SearchBar';
import Modal from '../components/ui/Modal';
import VolunteerForm from '../components/forms/VolunteerForm';
import { useApp } from '../context/AppContext';
import { getStatusBadgeClass } from '../utils/formatters';

function Volunteer() {
  const { volunteers, addVolunteer, updateVolunteer, deleteVolunteer } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filterOptions = [
    { value: 'AVAILABLE', label: 'Available' },
    { value: 'ON_TASK', label: 'On Task' },
    { value: 'OFFLINE', label: 'Offline' },
  ];

  const filteredData = useMemo(() => {
    return volunteers.filter((item) => {
      const matchesSearch =
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.skills?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterValue === 'ALL' || item.availabilityStatus === filterValue;
      return matchesSearch && matchesFilter;
    });
  }, [volunteers, searchTerm, filterValue]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    {
      header: 'Volunteer',
      render: (row) => (
        <div className="d-flex align-items-center gap-3">
          <div
            className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold"
            style={{ width: 38, height: 38, fontSize: '0.85rem' }}
          >
            {row.name?.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="fw-semibold text-dark">{row.name}</div>
            <div className="text-muted small">{row.email}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Phone',
      render: (row) => <span className="small text-secondary">{row.phoneNumber}</span>
    },
    {
      header: 'Skills',
      render: (row) => (
        <span className="small text-secondary text-truncate d-inline-block" style={{ maxWidth: '180px' }}>
          {row.skills}
        </span>
      )
    },
    {
      header: 'Location',
      render: (row) => <span className="small text-secondary">{row.location}</span>
    },
    {
      header: 'Status',
      render: (row) => (
        <span className={`badge-status ${getStatusBadgeClass(row.availabilityStatus)}`}>
          {row.availabilityStatus?.replace('_', ' ')}
        </span>
      )
    },
    {
      header: 'Exp.',
      render: (row) => (
        <span className="small fw-semibold text-dark">{row.experienceYears}y</span>
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
    if (window.confirm('Are you sure you want to remove this volunteer?')) {
      deleteVolunteer(id);
    }
  };

  const handleSubmit = (formData) => {
    if (editingItem) {
      updateVolunteer(editingItem.id, formData);
    } else {
      addVolunteer(formData);
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
                <h1 className="page-title mb-0">Volunteer Roster</h1>
                <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-2 py-1 small">
                  {volunteers.filter(v => v.availabilityStatus === 'AVAILABLE').length} Available
                </span>
              </div>
              <p className="page-subtitle">Manage and deploy disaster relief volunteers</p>
            </div>
          </div>

          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={(val) => { setSearchTerm(val); setCurrentPage(1); }}
            filterValue={filterValue}
            onFilterChange={(val) => { setFilterValue(val); setCurrentPage(1); }}
            filterOptions={filterOptions}
            placeholder="Search by name, email, skills, or location..."
            onAddClick={handleAdd}
            addButtonLabel="Register Volunteer"
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
            emptyMessage="No volunteers found matching your criteria."
          />

          <Modal
            isOpen={isModalOpen}
            onClose={() => { setIsModalOpen(false); setEditingItem(null); }}
            title={editingItem ? 'Update Volunteer Details' : 'Register New Volunteer'}
            size="lg"
          >
            <VolunteerForm
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

export default Volunteer;