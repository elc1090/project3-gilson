import React from "react";
import "./PsychologistsList.css";
import "../../PageHeader.css";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import BaseButton from "../../../Components/BaseButton/BaseButton";

import api from "../../../Services/api";

const PsychologistsList = () => {
  const navigate = useNavigate();
  const [changingHeader] = useState(false);
  const [psychologists, setPsychologists] = useState([]);

  useEffect(() => {
    const loadPsychologists = async () => {
      try {
        const { data } = await api.get("users/psychologists");
        const psychologistsData = data.psychologists;
        setPsychologists(psychologistsData);
      } catch (error) {
        console.log(error.response.data.message);
        console.error("Erro na requisição", error.response);
      }
    };

    const fetchData = async () => {
      await loadPsychologists();
    };

    fetchData();
  }, []);

  function getHeaderTextClass() {
    if (changingHeader) return "text-leave";
    else return "text-enter";
  }

  function navigateToCreatePsychologist() {
    navigate(`/user/psychologists/new`);
  }
  return (
    <div className="psychologist-container">
      <header className="page-header">
        <div className="d-flex inline-block row">
          <h1 className={`header-title ${getHeaderTextClass()}`}>
            <i className="fas fa-people-group page-icon" />{" "}
            <span>Psicólogos</span>
          </h1>
        </div>
      </header>

      <div className="page-body">
        <div className="row btn-container">
          <div className=" d-flex col-12 justify-content-start mb-4">
            <BaseButton
              type="primary-black"
              onClick={navigateToCreatePsychologist}
            >
              <i className="button-icon fas fa-plus " /> Novo psicólogo
            </BaseButton>
          </div>
        </div>
        <div className="row">
          {psychologists?.length ? (
            psychologists.map((psychologist) => {
              return (
                <div
                  className="col-12 col-md-6 col-lg-4 col-xxl-3"
                  key={psychologist.user_id}
                >
                  <div
                    className="row psychologist-card"
                    onClick={() =>
                      navigate(
                        `/user/psychologists/${psychologist.psychologist_id}`
                      )
                    }
                  >
                    <div className="d-flex col-12 justify-content-center">
                      <img
                        className={`profile-img mt-3 `}
                        alt="Foto de Perfil do Psicólogo"
                        src={"/user-profile.png"}
                      ></img>
                    </div>
                    <div className="d-flex col-12 align-items-center flex-column text-white mb-3">
                      <h3>{psychologist.name}</h3>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <span className="empty-page">Nenhum psicólogo cadastrado</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PsychologistsList;
