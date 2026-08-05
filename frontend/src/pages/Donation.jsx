import React, { useState, useMemo } from 'react';
import { HeartHandshake, DollarSign, Package, Utensils, Shirt, TrendingUp } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import DataTable from '../components/tables/DataTable';
import SearchBar from '../components/ui/SearchBar';
import Modal from '../components/ui/Modal';
import DonationForm from '../components/forms/DonationForm';
import { useApp } from '../context/AppContext';
import { formatDate, formatCurrency } from '../utils/formatters';

function Donation() {
  const { donations, disasters, addDonation, updateDonation, deleteDonation } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filterOptions = [
    { value: 'MONEY', label: 'Money' },
    { value: 'MEDICAL_KITS', label: 'Medical Kits' },
    { value: 'FOOD_PACKS', label: 'Food Packs' },
    { value: 'CLOTHING', label: 'Clothing' },
    { value: 'OTHER', label: 'Other' },
  ];

  // Statistics
  const totalMonetary = donations
    .filter(d => d.donationType === 'MONEY')
    .reduce((sum, d) => sum + (d.amountOrQuantity || 0), 0);

  const totalMedicalKits = donations
    .filter(d => d.donationType === 'MEDICAL_KITS')
    .reduce((sum, d) => sum + (d.amountOrQuantity || 0), 0);

  const totalFoodPacks = donations
    .filter(d => d.donationType === 'FOOD_PACKS')
    .reduce((sum, d) => sum + (d.amountOrQuantity || 0), 0);

  const totalOtherItems = donations
    .filter(d => !['MONEY', 'MEDICAL_KITS', 'FOOD_PACKS'].includes(d.donationType))
    .reduce((sum, d) => sum + (d.amountOrQuantity || 0), 0);

  const statCards = [
    {
      title: 'Total Funds Raised',
      value: formatCurrency(totalMonetary),
      icon: DollarSign,
      bgClass: 'bg-success-subtle',
      textClass: 'text-success',
      subtitle: `${donations.filter(d => d.donationType === 'MONEY').length} monetary donations`
    },
    {
      title: 'Medical Kits',
      value: totalMedicalKits.toLocaleString(),
      icon: Package,
      bgClass: 'bg-primary-subtle',
      textClass: 'text-primary',
      subtitle: `${donations.filter(d => d.donationType === 'MEDICAL_KITS').length} supply batches`
    },
    {
      title: 'Food Packs',
      value: totalFoodPacks.toLocaleString(),
      icon: Utensils,
      bgClass: 'bg-warning-subtle',
      textClass: 'text-warning',
      subtitle: `${donations.filter(d => d.donationType === 'FOOD_PACKS').length} food drives`
    },
    {
      title: 'Other Supplies',
      value: totalOtherItems.toLocaleString(),
      icon: Shirt,
      bgClass: 'bg-info-subtle',
      textClass: 'text-info',
      subtitle: `${donations.filter(d => !['MONEY', 'MEDICAL_KITS', 'FOOD_PACKS'].includes(d.donationType)).length} contributions`
    },
  ];

  // Filter & search
  const filteredData = useMemo(() => {
    return donations.filter((item) => {
      const matchesSearch =
        item.donorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.donationType?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterValue === 'ALL' || item.donationType === filterValue;
      return matchesSearch && matchesFilter;
    });
  }, [donations, searchTerm, filterValue]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Badge helper
  const getDonationTypeBadge = (type) => {
    const map = {
      MONEY: { cls: 'badge-money', label: 'Money' },
      MEDICAL_KITS: { cls: 'badge-medical', label: 'Medical Kits' },
      FOOD_PACKS: { cls: 'badge-food', label: 'Food Packs' },
      CLOTHING: { cls: 'badge-info', label: 'Clothing' },
    };
    const entry = map[type] || { cls: 'badge-other', label: type?.replace('_', ' ') || 'Other' };
    return <span className={`badge-status ${entry.cls}`}>{entry.label}</span>;
  };

  // Find linked disaster title
  const getDisasterTitle = (disasterId) => {
    const d = disasters.find(dis => dis.id === disasterId);
    return d ? d.title : '—';
  };

  const columns = [
    {
      header: 'Donor',
      render: (row) => (
        <div className="d-flex align-items-center gap-3">
          <div
            className="bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center fw-bold"
            style={{ width: 38, height: 38, fontSize: '0.85rem', flexShrink: 0 }}
          >
            {row.donorName?.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="fw-semibold text-dark">{row.donorName}</div>
            <div className="text-muted small">{formatDate(row.donatedAt)}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Type',
      render: (row) => getDonationTypeBadge(row.donationType)
    },
    {
      header: 'Amount / Qty',
      render: (row) => (
        <span className="fw-bold text-dark">
          {row.donationType === 'MONEY'
            ? formatCurrency(row.amountOrQuantity)
            : `${(row.amountOrQuantity || 0).toLocaleString()} units`}
        </span>
      )
    },
    {
      header: 'Linked Disaster',
      render: (row) => (
        <span className="small text-secondary text-truncate d-inline-block" style={{ maxWidth: '200px' }}>
          {getDisasterTitle(row.disasterId)}
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
    if (window.confirm('Are you sure you want to remove this donation record?')) {
      deleteDonation(id);
    }
  };

  const handleSubmit = (formData) => {
    if (editingItem) {
      updateDonation(editingItem.id, formData);
    } else {
      addDonation(formData);
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
          {/* Page Header */}
          <div className="page-header d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">
            <div>
              <div className="d-flex align-items-center gap-2">
                <h1 className="page-title mb-0">Donations & Supplies</h1>
                <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-2 py-1 small">
                  {donations.length} Total
                </span>
              </div>
              <p className="page-subtitle">Track and manage all relief donations and supply contributions</p>
            </div>
            <div className="d-flex align-items-center gap-2">
              <span className="accent-badge">
                <TrendingUp size={14} />
                {formatCurrency(totalMonetary)} raised
              </span>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="row g-3 mb-4 animate-fade-in">
            {statCards.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="col-6 col-xl-3">
                  <div className="glass-card p-3 h-100">
                    <div className="d-flex align-items-start justify-content-between">
                      <div>
                        <p className="text-muted small fw-medium mb-1">{stat.title}</p>
                        <h4 className="font-heading fw-bold text-dark mb-1" style={{ fontSize: '1.3rem' }}>
                          {stat.value}
                        </h4>
                        <span className="text-muted" style={{ fontSize: '0.75rem' }}>{stat.subtitle}</span>
                      </div>
                      <div className={`stat-card-icon ${stat.bgClass} ${stat.textClass}`}>
                        <Icon size={22} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Search & Filter */}
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={(val) => { setSearchTerm(val); setCurrentPage(1); }}
            filterValue={filterValue}
            onFilterChange={(val) => { setFilterValue(val); setCurrentPage(1); }}
            filterOptions={filterOptions}
            placeholder="Search donations by donor name or type..."
            onAddClick={handleAdd}
            addButtonLabel="Record Donation"
          />

          {/* Data Table */}
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
            emptyMessage="No donation records found matching your criteria."
          />

          {/* Modal */}
          <Modal
            isOpen={isModalOpen}
            onClose={() => { setIsModalOpen(false); setEditingItem(null); }}
            title={editingItem ? 'Update Donation Record' : 'Record New Donation'}
            size="lg"
          >
            <DonationForm
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

export default Donation;