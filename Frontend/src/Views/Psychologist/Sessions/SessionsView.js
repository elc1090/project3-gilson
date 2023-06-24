import React from "react";
import "./SessionsView.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import BaseButton from "../../../Components/BaseButton/BaseButton";

const SessionsView = () => {
  const navigate = useNavigate();
  const [changingHeader] = useState(false);

  function getHeaderTextClass() {
    if (changingHeader) return "text-leave";
    else return "text-enter";
  }

  function navigateToInitSession() {
    navigate(`/psychologist/sessions/new`);
  }

  return (
    <div className="sessions-container">
      <header className="dashboard-header">
        <div className="d-flex inline-block row">
          <h1 className={`header-title ${getHeaderTextClass()}`}>
            <i className="fas fa-clipboard-list page-icon" />{" "}
            <span>Sessões</span>
          </h1>
        </div>
      </header>

      <div className="page-body">
        <div className="row btn-container">
          <div className=" d-flex col-12 justify-content-start mb-4">
            <BaseButton type="primary-black" onClick={navigateToInitSession}>
              <i className="button-icon fas fa-plus " /> Iniciar nova sessão
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionsView;
