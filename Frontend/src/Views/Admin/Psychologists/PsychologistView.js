import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import "./PsychologistView.css";

import api from "../../../Services/api";
import BaseButton from "../../../Components/BaseButton/BaseButton";

function PsychologistView() {
  const navigate = useNavigate();
  const [changingHeader] = useState(false);
  const [psychologist, setPatient] = useState([]);
  const { psychologist_id } = useParams();

  useEffect(() => {
    const loadPsychologist = async () => {
      try {
        const { data } = await api.get(
          `users/psychologists/${psychologist_id}`
        );
        setPatient(data.psychologist);
      } catch (error) {
        console.log(error.response.data.message);
        console.error("Erro na requisição", error.response);
      }
    };

    const fetchData = async () => {
      await loadPsychologist();
    };

    fetchData();
  }, [psychologist_id]);

  function getHeaderTextClass() {
    if (changingHeader) return "text-leave";
    else return "text-enter";
  }

  async function handleDelete() {
    try {
      await api.delete(`users/psychologists/${psychologist_id}`);
      navigate("/user/psychologists");
    } catch (error) {
      console.log(error.response.data.message);
      console.error("Erro na requisição", error.response);
    }
  }

  return (
    <div className="view-psychologist-container">
      <header className="view-psychologist-header d-none d-lg-block">
        <div className="d-flex row">
          <div className="d-flex inline-block row">
            <h1 className={`header-title ${getHeaderTextClass()}`}>
              <i className="fas fa-user page-icon" /> <span>Psicólogo</span>
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
                    <h3>{psychologist.name}</h3>
                    <h5 className="card-subtitle mb-2 mt-2 text-muted">
                      {psychologist.user?.email}
                    </h5>
                  </div>
                  <div className="col-4">
                    <div className="d-flex justify-content-end">
                      <BaseButton type="primary-black" onClick={handleDelete}>
                        <span className="text-danger text-bolder">
                          <i className="button-icon fas fa-trash" />
                          Deletar
                        </span>{" "}
                        psicólogo
                      </BaseButton>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-3 mt-4">
                    <h5 className="mb-2 mt-2">
                      <i className="fas fa-id-card" /> CPF:
                    </h5>
                    <h5 className="text-muted">{psychologist.cpf}</h5>
                  </div>
                  <div className="col-lg-3 mt-4">
                    <h5 className="mb-2 mt-2">
                      <i className="fas fa-id-badge" /> CRP:
                    </h5>
                    <h5 className="text-muted">{psychologist.crp}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PsychologistView;
