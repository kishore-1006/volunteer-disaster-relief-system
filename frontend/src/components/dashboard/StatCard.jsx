import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color = 'primary', change, changeType = 'positive', subtitle }) => {
  const colorMap = {
    primary: { bg: 'bg-primary-subtle', text: 'text-primary' },
    danger: { bg: 'bg-danger-subtle', text: 'text-danger' },
    success: { bg: 'bg-success-subtle', text: 'text-success' },
    warning: { bg: 'bg-warning-subtle', text: 'text-warning' },
    info: { bg: 'bg-info-subtle', text: 'text-info' },
  };

  const theme = colorMap[color] || colorMap.primary;

  return (
    <div className="glass-card p-4 h-100 position-relative overflow-hidden">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <span className="text-muted fw-semibold small text-uppercase" style={{ letterSpacing: '0.05em' }}>
          {title}
        </span>
        <div className={`stat-card-icon ${theme.bg} ${theme.text}`}>
          <Icon size={24} />
        </div>
      </div>

      <h3 className="fw-bold font-heading text-dark mb-1 fs-2">{value}</h3>

      <div className="d-flex align-items-center justify-content-between mt-2 pt-2 border-top border-light">
        <span className="text-muted small">{subtitle || 'Live Updated'}</span>
        {change && (
          <span
            className={`badge rounded-pill d-inline-flex align-items-center gap-1 ${
              changeType === 'positive'
                ? 'bg-success-subtle text-success'
                : 'bg-danger-subtle text-danger'
            }`}
            style={{ fontSize: '0.72rem' }}
          >
            {changeType === 'positive' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {change}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
