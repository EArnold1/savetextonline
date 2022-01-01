import React, { useContext } from 'react';
import AlertContext from '../contexts/alert/AlertContext';

const Alerts = () => {
  const { alerts } = useContext(AlertContext);

  return (
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.type} my-2`}>
        <i className="fas fa-info-circle"></i> {alert.msg}
      </div>
    ))
  );
};

export default Alerts;
