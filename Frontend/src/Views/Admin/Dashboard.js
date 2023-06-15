import React from 'react';
import './Dashboard.css';
import {useState} from 'react';

const DashboardAdmin = () => {
  const [changingHeader, setChangingHeader] = useState(false);

  function getHeaderTextClass() {
    if (changingHeader) return 'text-leave';
    else return 'text-enter';
  }

  return (
    <header className="dashboard-header">
      <div className="d-flex inline-block row">
        <h1 className={`header-title ${getHeaderTextClass()}`}>
          <i className="fas fa-home page-icon" /> <span>Dashboard</span>
        </h1>
      </div>
    </header>
  );
};

export default DashboardAdmin;
