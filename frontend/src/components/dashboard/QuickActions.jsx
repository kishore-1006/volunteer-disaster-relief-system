import React from 'react';
import { PlusCircle, Flame, UserPlus, HeartHandshake, CheckSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Report Disaster',
      path: '/disasters',
      icon: Flame,
      btnClass: 'btn-outline-danger',
      desc: 'Log critical emergency incident'
    },
    {
      title: 'Register Volunteer',
      path: '/volunteers',
      icon: UserPlus,
      btnClass: 'btn-outline-primary',
      desc: 'Add new responder to roster'
    },
    {
      title: 'Record Donation',
      path: '/donations',
      icon: HeartHandshake,
      btnClass: 'btn-outline-success',
      desc: 'Log incoming relief funds or goods'
    },
    {
      title: 'Dispatch Relief Task',
      path: '/relief-tasks',
      icon: CheckSquare,
      btnClass: 'btn-outline-warning text-dark',
      desc: 'Assign urgent field task'
    }
  ];

  return (
    <div className="glass-card p-4 h-100">
      <h5 className="font-heading fw-bold text-dark mb-3">Quick Dispatch Operations</h5>
      <p className="text-muted small mb-4">Fast actions to manage disaster relief resources immediately.</p>

      <div className="row g-3">
        {actions.map((act, idx) => {
          const Icon = act.icon;
          return (
            <div key={idx} className="col-12 col-sm-6">
              <button
                className={`btn ${act.btnClass} w-100 p-3 rounded-3 text-start d-flex align-items-center gap-3 shadow-sm transition-all`}
                onClick={() => navigate(act.path)}
              >
                <div className="p-2 rounded-circle bg-white shadow-sm flex-shrink-0">
                  <Icon size={20} />
                </div>
                <div>
                  <div className="fw-semibold text-dark fs-7">{act.title}</div>
                  <div className="text-muted" style={{ fontSize: '0.72rem' }}>{act.desc}</div>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
