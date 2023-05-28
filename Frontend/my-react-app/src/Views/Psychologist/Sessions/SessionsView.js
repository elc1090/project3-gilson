import React from "react";
import "./SessionsView.css";
import { useState } from "react";

const SessionsView = () => {
  const [changingHeader] = useState(false);

  function getHeaderTextClass() {
    if (changingHeader) return "text-leave";
    else return "text-enter";
  }

  return (
    <header className="dashboard-header">
      <div className="d-flex inline-block row">
        <h1 className={`header-title ${getHeaderTextClass()}`}>
          <i className="fas fa-clipboard-list page-icon" /> <span>Sessões</span>
        </h1>
      </div>
    </header>
  );
};

export default SessionsView;
