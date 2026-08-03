import React from 'react';
import { Flame, Users, HeartHandshake, Home, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const RecentActivities = () => {
  const { activities } = useApp();

  const iconMap = {
    disaster: { icon: Flame, color: 'text-danger bg-danger-subtle' },
    volunteer: { icon: Users, color: 'text-primary bg-primary-subtle' },
    donation: { icon: HeartHandshake, color: 'text-success bg-success-subtle' },
    shelter: { icon: Home, color: 'text-warning bg-warning-subtle' },
  };

  return (
    <div className="glass-card p-4 h-100">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h5 className="font-heading fw-bold m-0 text-dark">Recent Field Activities</h5>
        <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill">
          Live Stream
        </span>
      </div>

      <div className="d-flex flex-column gap-3">
        {activities.map((act) => {
          const conf = iconMap[act.type] || iconMap.disaster;
          const Icon = conf.icon;
          return (
            <div key={act.id} className="d-flex align-items-start gap-3 p-2 rounded-3 hover-bg-light">
              <div className={`p-2 rounded-circle ${conf.color} flex-shrink-0`}>
                <Icon size={18} />
              </div>
              <div className="flex-grow-1 min-width-0">
                <h6 className="mb-0 text-dark fw-semibold fs-7">{act.title}</h6>
                <p className="mb-0 text-muted small text-truncate">{act.subtitle}</p>
              </div>
              <div className="text-muted small d-flex align-items-center gap-1 flex-shrink-0" style={{ fontSize: '0.75rem' }}>
                <Clock size={12} />
                {act.time}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivities;
