// Utility Helper Functions

export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (e) {
    return dateString;
  }
};

export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const getSeverityBadgeClass = (severity) => {
  switch (severity?.toUpperCase()) {
    case 'CRITICAL':
      return 'badge-critical';
    case 'HIGH':
      return 'badge-warning';
    case 'MEDIUM':
    case 'LOW':
      return 'badge-info';
    default:
      return 'badge-info';
  }
};

export const getStatusBadgeClass = (status) => {
  switch (status?.toUpperCase()) {
    case 'ACTIVE':
    case 'OPEN':
    case 'AVAILABLE':
    case 'COMPLETED':
      return 'badge-success';
    case 'IN_PROGRESS':
    case 'ON_TASK':
    case 'UNDER_CONTROL':
      return 'badge-warning';
    case 'FULL':
    case 'CRITICAL':
    case 'OFFLINE':
      return 'badge-critical';
    default:
      return 'badge-info';
  }
};
