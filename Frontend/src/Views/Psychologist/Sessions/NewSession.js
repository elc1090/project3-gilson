import React from "react";
import "./NewSession.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStopwatch } from "react-timer-hook";

import BaseButton from "../../../Components/BaseButton/BaseButton";
import IconButton from "../../../Components/IconButton/IconButton";
import StyledInput from "../../../Components/StyledInput/StyledInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const NewSession = () => {
  const navigate = useNavigate();
  const [changingHeader] = useState(false);
  const [patient, setPatient] = useState({ name: "Gilson Garcia" });
  const [formData, setFormData] = useState({
    general_notes: "",
    diagnosis: "",
  });

  function getHeaderTextClass() {
    if (changingHeader) return "text-leave";
    else return "text-enter";
  }

  const handleChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  function handleFinishSession() {
    navigate(`/psychologist/sessions`);
  }
  function handleCancelSession() {
    navigate(`/psychologist/sessions`);
  }

  const { seconds, minutes, hours } = useStopwatch({ autoStart: true });

  return (
    <div className="new-session-container">
      <header className="new-session-header">
        <div className="d-flex row">
          <div className="col-lg-6 inline-block">
            <h1 className={`header-title ${getHeaderTextClass()}`}>
              <span>Sessão de {patient.name}</span>
            </h1>
            <h3 className={`${getHeaderTextClass()}`}>
              <i className="fas fa-clock page-icon" />
              <span>{hours.toString().padStart(2, "0")}</span>:
              <span>{minutes.toString().padStart(2, "0")}</span>:
              <span>{seconds.toString().padStart(2, "0")}</span>
            </h3>
          </div>
          <div className="button-container d-flex col-lg-6 justify-content-end align-items-end">
            <div className="margin-right-sm">
              <BaseButton type="primary-black" onClick={handleFinishSession}>
                <span className="text-success text-bolder">
                  <i className="button-icon fas fa-check" />
                  Finalizar
                </span>{" "}
                sessão
              </BaseButton>
            </div>

            <div className="ml-4">
              <BaseButton
                className="ml-4"
                type="primary-black"
                onClick={handleCancelSession}
              >
                <span className="text-danger text-bolder">
                  <i className="button-icon fas fa-times" />
                  Cancelar
                </span>{" "}
                sessão
              </BaseButton>
            </div>
          </div>
        </div>
      </header>

      <div className="page-body">
        <div className="d-flex row justify-content-between">
          <div className="col-lg-4">
            <div className="row">
              <div className="card p-0">
                <div className="card-header">
                  <h3 className="card-title">Anotações Gerais</h3>
                </div>
                <div className="card-body">
                  <ReactQuill
                    value={formData.general_notes}
                    onChange={(value) => handleChange("general_notes", value)}
                    key={"1_react_quill"}
                  />
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="card p-0">
                <div className="card-header">
                  <h3 className="card-title">Diagnóstico</h3>
                </div>
                <div className="card-body">
                  <ReactQuill
                    value={formData.diagnosis}
                    onChange={(value) => handleChange("diagnosis", value)}
                    key={"2_react_quill"}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="row h-100">
              <div className="full-height card p-0">
                <div className="card-header">
                  <h3 className="card-title">Demandas</h3>
                </div>
                <div className="card-body"></div>
                <div className="card-footer">
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="input-sm-container margin-right-sm">
                      <StyledInput
                        type="primary-black"
                        placeholder={"Nova demanda"}
                        labelType={"insideLabel"}
                        icon={"fas fa-clock"}
                      ></StyledInput>
                    </div>
                    <div>
                      <IconButton icon={"fas fa-plus"} iconClass={"icon-md"} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewSession;
