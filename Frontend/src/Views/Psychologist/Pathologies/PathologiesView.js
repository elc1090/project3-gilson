import React from "react";
import "./PathologiesView.css";
import { useState } from "react";

const PathologiesView = () => {
  const [changingHeader] = useState(false);

  function getHeaderTextClass() {
    if (changingHeader) return "text-leave";
    else return "text-enter";
  }

  return (
    <header className="dashboard-header">
      <div className="d-flex inline-block row">
        <h1 className={`header-title ${getHeaderTextClass()}`}>
          <i className="fas fa-brain page-icon" /> <span>Patologias</span>
        </h1>
      </div>
    </header>
  );
};

export default PathologiesView;
