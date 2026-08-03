import React from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const ToastNotification = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const bgClasses = {
    success: 'bg-success text-white',
    danger: 'bg-danger text-white',
    warning: 'bg-warning text-dark',
    info: 'bg-info text-white',
  };

  const IconMap = {
    success: CheckCircle,
    danger: AlertCircle,
    warning: AlertCircle,
    info: Info,
  };

  const IconComponent = IconMap[toast.type] || CheckCircle;

  return (
    <div
      className="position-fixed bottom-0 end-0 p-3"
      style={{ zIndex: 9999 }}
    >
      <div
        className={`toast show align-items-center shadow-lg border-0 ${bgClasses[toast.type] || bgClasses.success}`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex p-2 align-items-center">
          <IconComponent className="me-2 flex-shrink-0" size={20} />
          <div className="toast-body fw-medium">{toast.message}</div>
        </div>
      </div>
    </div>
  );
};

export default ToastNotification;
