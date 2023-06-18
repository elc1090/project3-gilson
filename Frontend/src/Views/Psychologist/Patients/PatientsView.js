import React from "react";
import "./PatientsView.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import BaseButton from "../../../Components/BaseButton/BaseButton";

import api from "../../../Services/api";

const PatientsView = () => {
  const navigate = useNavigate();
  const [changingHeader] = useState(false);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const loadpatients = async () => {
      try {
        const { data } = await api.get("psychologist/patients");
        const patientsData = data.patients;
        setPatients(patientsData);
      } catch (error) {
        console.log(error.response.data.message);
        console.error("Erro na requisição", error.response);
      }
    };

    const fetchData = async () => {
      await loadpatients();
    };

    fetchData();
  }, []);

  function getHeaderTextClass() {
    if (changingHeader) return "text-leave";
    else return "text-enter";
  }

  function navigateToCreatePatient() {
    navigate(`/psychologist/patients/new`);
  }

  return (
    <div className="patients-container">
      <header className="patients-header">
        <div className="d-flex inline-block row">
          <h1 className={`header-title ${getHeaderTextClass()}`}>
            <i className="fas fa-people-group page-icon" />{" "}
            <span>Pacientes</span>
          </h1>
        </div>
      </header>

      <div className="page-body">
        <div className="row btn-container">
          <div className=" d-flex col-12 justify-content-start mb-4">
            <BaseButton type="primary-black" onClick={navigateToCreatePatient}>
              <i className="button-icon fas fa-plus " /> Novo paciente
            </BaseButton>
          </div>
        </div>
        <div className="row">
          {patients?.length ? (
            patients.map((patient) => {
              return (
                <div
                  className="col-12 col-md-6 col-lg-4 col-xxl-3"
                  key={patient.user_id}
                >
                  <div className="row patient-card">
                    <div className="d-flex col-12 justify-content-center">
                      <img
                        className={`profile-img mt-3 `}
                        alt="Foto de Perfil do Psicólogo"
                        src={"/user-profile.png"}
                      ></img>
                    </div>
                    <div className="d-flex col-12 align-items-center flex-column text-white mb-3">
                      <h3>{patient.name}</h3>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <span className="empty-page">Nenhum paciente cadastrado</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientsView;
