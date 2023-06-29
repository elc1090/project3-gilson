import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import ReactQuill from "react-quill";
import "./PatientView.css";

import api from "../../../Services/api";
import BaseButton from "../../../Components/BaseButton/BaseButton";

function PatientView() {
  const navigate = useNavigate();
  const [changingHeader] = useState(false);
  const [patient, setPatient] = useState([]);
  const { patient_id } = useParams();

  useEffect(() => {
    const loadpatient = async () => {
      try {
        const { data } = await api.get(`psychologists/patients/${patient_id}`);
        setPatient(data.patient);
      } catch (error) {
        console.log(error.response.data.message);
        console.error("Erro na requisição", error.response);
      }
    };

    const fetchData = async () => {
      await loadpatient();
    };

    fetchData();
  }, [patient_id]);

  function getHeaderTextClass() {
    if (changingHeader) return "text-leave";
    else return "text-enter";
  }

  async function handleDelete() {
    try {
      await api.delete(`psychologists/patients/${patient_id}`);
      navigate("/psychologist/patients");
    } catch (error) {
      console.log(error.response.data.message);
      console.error("Erro na requisição", error.response);
    }
  }

  return (
    <div className="view-patient-container">
      <header className="view-patient-header d-none d-lg-block">
        <div className="d-flex row">
          <div className="d-flex inline-block row">
            <h1 className={`header-title ${getHeaderTextClass()}`}>
              <i className="fas fa-user page-icon" /> <span>Paciente</span>
            </h1>
          </div>
        </div>
      </header>

      <div className="page-body">
        <div className="row">
          <div className="col-12">
            <div className="card p-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-8">
                    <h3>{patient.name}</h3>
                    <h5 className="card-subtitle mb-2 mt-2 text-muted">
                      {patient.email}
                    </h5>
                  </div>
                  <div className="col-4">
                    <div className="d-flex justify-content-end">
                      <BaseButton type="primary-black" onClick={handleDelete}>
                        <span className="text-danger text-bolder">
                          <i className="button-icon fas fa-trash" />
                          Deletar
                        </span>{" "}
                        paciente
                      </BaseButton>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-3 mt-4">
                    <h5 className="mb-2 mt-2">
                      <i className="fas fa-genderless" /> Gênero:
                    </h5>
                    <h5 className="text-muted">{patient.gender}</h5>
                  </div>
                  <div className="col-lg-9 mt-4">
                    <h5 className="mb-2 mt-2">
                      <i className="fas fa-calendar" /> Data de Nascimento:
                    </h5>
                    <h5 className="text-muted">
                      {patient.birth_date}
                    </h5>
                  </div>
                  <div className="col-lg-3 mt-4">
                    <h5 className="mb-2 mt-2">
                      <i className="fas fa-phone" /> Telefone:
                    </h5>
                    <h5 className="text-muted">
                      {patient.phone}
                    </h5>
                  </div>
                  <div className="col-lg-3 mt-4">
                    <h5 className="mb-2 mt-2">
                      <i className="fas fa-id-card" /> CPF:
                    </h5>
                    <h5 className="text-muted">
                      {patient.cpf}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4 mb-4">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Diagnóstico</h3>
              </div>
              <div className="card-body">
                <ReactQuill
                  value={
                    patient.diagnosis?.length
                      ? patient.diagnosis[0].description
                      : ""
                  }
                  key={"1_react_quill"}
                  readOnly={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientView;
