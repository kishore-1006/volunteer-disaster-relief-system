import React, { useState, useMemo } from 'react';
import { CheckSquare } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import DataTable from '../components/tables/DataTable';
import SearchBar from '../components/ui/SearchBar';
import Modal from '../components/ui/Modal';
import TaskForm from '../components/forms/TaskForm';
import { useApp } from '../context/AppContext';
import { formatDate, getStatusBadgeClass } from '../utils/formatters';

function Task() {
  const { tasks, addTask, updateTask, deleteTask } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filterOptions = [
    { value: 'PENDING', label: 'Pending' },
    { value: 'IN_PROGRESS', label: 'In Progress' },
    { value: 'COMPLETED', label: 'Completed' },
  ];

  const filteredData = useMemo(() => {
    return tasks.filter((item) => {
      const matchesSearch =
        item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterValue === 'ALL' || item.status === filterValue;
      return matchesSearch && matchesFilter;
    });
  }, [tasks, searchTerm, filterValue]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    {
      header: 'Task',
      render: (row) => (
        <div>
          <div className="fw-semibold text-dark">{row.title}</div>
          <div className="text-muted small text-truncate" style={{ maxWidth: '280px' }}>{row.description}</div>
        </div>
      ),
    },
    {
      header: 'Status',
      render: (row) => (
        <span className={`badge-status ${getStatusBadgeClass(row.status)}`}>
          {row.status?.replace(/_/g, ' ')}
        </span>
      ),
    },
    {
      header: 'Volunteer ID',
      render: (row) => (
        <span className="small text-secondary">{row.assignedVolunteerId ?? '—'}</span>
      ),
    },
    {
      header: 'Disaster ID',
      render: (row) => (
        <span className="small text-secondary">{row.disasterId ?? '—'}</span>
      ),
    },
    {
      header: 'Created',
      render: (row) => (
        <span className="small text-muted">{formatDate(row.createdAt)}</span>
      ),
    },
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
    if (window.confirm('Are you sure you want to delete this relief task?')) {
      deleteTask(id);
    }
  };

  const handleSubmit = (formData) => {
    if (editingItem) {
      updateTask(editingItem.id, formData);
    } else {
      addTask(formData);
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
                <h1 className="page-title mb-0">Relief Dispatch Tasks</h1>
                <span className="badge bg-warning-subtle text-warning border border-warning-subtle rounded-pill px-2 py-1 small">
                  {tasks.filter((t) => t.status === 'IN_PROGRESS').length} In Progress
                </span>
              </div>
              <p className="page-subtitle">Create and manage field relief task assignments for volunteers</p>
            </div>
          </div>

          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={(val) => { setSearchTerm(val); setCurrentPage(1); }}
            filterValue={filterValue}
            onFilterChange={(val) => { setFilterValue(val); setCurrentPage(1); }}
            filterOptions={filterOptions}
            placeholder="Search tasks by title or description..."
            onAddClick={handleAdd}
            addButtonLabel="Dispatch Task"
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
            emptyMessage="No relief tasks found matching your criteria."
          />

          <Modal
            isOpen={isModalOpen}
            onClose={() => { setIsModalOpen(false); setEditingItem(null); }}
            title={editingItem ? 'Update Relief Task' : 'Dispatch New Relief Task'}
            size="lg"
          >
            <TaskForm
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

export default Task;
