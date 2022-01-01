import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import AlertContext from './AlertContext';

const AlertState = (props) => {
  const [alerts, setAlerts] = useState([]);

  // SET ALERT
  const setAlert = (msg, type) => {
    const id = uuid();
    setAlerts([...alerts, { msg, type, id }]);
  };

  return (
    <AlertContext.Provider
      value={{
        setAlert,
        alerts,
        setAlerts,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
