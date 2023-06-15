import React from 'react';
import './PatientsView.css';
import {useState} from 'react';

const PatientsView = () => {
  const [changingHeader] = useState(false);

  function getHeaderTextClass() {
    if (changingHeader) return 'text-leave';
    else return 'text-enter';
  }

  return (
    <header className="dashboard-header">
      <div className="d-flex inline-block row">
        <h1 className={`header-title ${getHeaderTextClass()}`}>
          <i className="fas fa-people-group page-icon" /> <span>Pacientes</span>
        </h1>
      </div>
    </header>
  );
};

export default PatientsView;
