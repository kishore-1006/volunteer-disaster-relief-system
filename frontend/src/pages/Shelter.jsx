import React, { useState, useMemo } from 'react';
import { Home as HomeIcon } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import DataTable from '../components/tables/DataTable';
import SearchBar from '../components/ui/SearchBar';
import Modal from '../components/ui/Modal';
import ShelterForm from '../components/forms/ShelterForm';
import { useApp } from '../context/AppContext';
import { getStatusBadgeClass } from '../utils/formatters';

function Shelter() {
  const { shelters, addShelter, updateShelter, deleteShelter } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filterOptions = [
    { value: 'OPEN', label: 'Open' },
    { value: 'FULL', label: 'Full' },
    { value: 'STANDBY', label: 'Standby' },
    { value: 'CLOSED', label: 'Closed' },
  ];

  const filteredData = useMemo(() => {
    return shelters.filter((item) => {
      const matchesSearch =
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterValue === 'ALL' || item.status === filterValue;
      return matchesSearch && matchesFilter;
    });
  }, [shelters, searchTerm, filterValue]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    {
      header: 'Shelter Name',
      render: (row) => (
        <div>
          <div className="fw-semibold text-dark">{row.name}</div>
        </div>
      )
    },
    {
      header: 'Location',
      render: (row) => <span className="small text-secondary">{row.location}</span>
    },
    {
      header: 'Capacity',
      render: (row) => <span className="small fw-semibold text-dark">{row.capacity}</span>
    },
    {
      header: 'Occupancy',
      render: (row) => {
        const percent = row.capacity > 0 ? Math.round((row.currentOccupancy / row.capacity) * 100) : 0;
        const barColor = percent > 90 ? '#dc2626' : percent > 60 ? '#d97706' : '#16a34a';
        return (
          <div style={{ minWidth: '120px' }}>
            <div className="d-flex justify-content-between small mb-1">
              <span className="text-muted">{row.currentOccupancy}/{row.capacity}</span>
              <span className="fw-semibold" style={{ color: barColor }}>{percent}%</span>
            </div>
            <div className="occupancy-bar">
              <div
                className="occupancy-fill"
                style={{ width: `${percent}%`, backgroundColor: barColor }}
              ></div>
            </div>
          </div>
        );
      }
    },
    {
      header: 'Contact',
      render: (row) => <span className="small text-secondary">{row.contactNumber}</span>
    },
    {
      header: 'Status',
      render: (row) => (
        <span className={`badge-status ${getStatusBadgeClass(row.status)}`}>
          {row.status}
        </span>
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
    if (window.confirm('Are you sure you want to remove this shelter?')) {
      deleteShelter(id);
    }
  };

  const handleSubmit = (formData) => {
    if (editingItem) {
      updateShelter(editingItem.id, formData);
    } else {
      addShelter(formData);
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
                <h1 className="page-title mb-0">Shelters & Camps</h1>
                <span className="badge bg-warning-subtle text-warning border border-warning-subtle rounded-pill px-2 py-1 small">
                  {shelters.filter(s => s.status === 'OPEN').length} Open
                </span>
              </div>
              <p className="page-subtitle">Manage evacuation shelters and relief camps</p>
            </div>
          </div>

          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={(val) => { setSearchTerm(val); setCurrentPage(1); }}
            filterValue={filterValue}
            onFilterChange={(val) => { setFilterValue(val); setCurrentPage(1); }}
            filterOptions={filterOptions}
            placeholder="Search shelters by name or location..."
            onAddClick={handleAdd}
            addButtonLabel="Add Shelter"
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
            emptyMessage="No shelters found matching your criteria."
          />

          <Modal
            isOpen={isModalOpen}
            onClose={() => { setIsModalOpen(false); setEditingItem(null); }}
            title={editingItem ? 'Update Shelter Details' : 'Register New Shelter'}
            size="lg"
          >
            <ShelterForm
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

export default Shelter;