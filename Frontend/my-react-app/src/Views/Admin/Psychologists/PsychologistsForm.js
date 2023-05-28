import React from "react";
import "./PsychologistsForm.css";
import "../../PageHeader.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BaseButton from "../../../Components/BaseButton/BaseButton";
import BaseInput from "../../../Components/BaseInput/BaseInput";

import api from "../../../Services/api";

const PsychologistsView = () => {
  const navigate = useNavigate();
  const [changingHeader] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "psychologist",
    cpf: "",
    crp: "",
  });

  async function handleSubmitForm() {
    try {
        await api.post("/users/psychologists", formData);
        navigate("/user/psychologists")
    } catch (error) {
        console.log(error);
        console.error(error.response.data);
    }
  }

  const handleChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  function getHeaderTextClass() {
    if (changingHeader) return "text-leave";
    else return "text-enter";
  }

  return (
    <div className="form-container">
      <header className="page-header">
        <div className="d-flex inline-block row">
          <h1 className={`header-title ${getHeaderTextClass()}`}>
            <i className="fas fa-plus page-icon" /> <span>Novo Psicólogo</span>
          </h1>
        </div>
      </header>

      <div className="page-body">
        <div className="d-flex row justify-content-center">
          <div className="col-md-12">
            <h2>Perfil:</h2>
            <hr />
          </div>
          <div className="form-group-centered">
            <div className="col-12">
              <label className="input-label">Email</label>
              <BaseInput
                value={formData.email}
                setValue={(value) => handleChange("email", value)}
                placeholder={"Email"}
                icon="fas fa-envelope"
                labelType="insideLabel"
              />
            </div>
            <div className="col-12 mt-4">
              <label className="input-label">Senha</label>
              <BaseInput
                value={formData.password}
                setValue={(value) => handleChange("password", value)}
                placeholder={"Senha"}
                icon="fas fa-lock"
                labelType="insideLabel"
                type="password"
              />
            </div>
          </div>

          <div className="col-md-12">
            <h2>Dados Pessoais:</h2>
            <hr />
          </div>
          <div className="col-md-6">
            <label className="input-label">Nome</label>
            <BaseInput
              value={formData.name}
              setValue={(value) => handleChange("name", value)}
              placeholder={"Nome"}
              icon="fas fa-user"
              labelType="insideLabel"
            />
          </div>
          <div className="col-md-6">
            <label className="input-label">CPF</label>
            <BaseInput
              value={formData.cpf}
              setValue={(value) => handleChange("cpf", value)}
              placeholder={"CPF"}
              icon="fas fa-id-card"
              labelType="insideLabel"
            />
          </div>
          <div className="col-md-6 mt-4">
            <label className="input-label">CRP</label>
            <BaseInput
              value={formData.crp}
              setValue={(value) => handleChange("crp", value)}
              placeholder={"CRP"}
              icon="fas fa-id-badge"
              labelType="insideLabel"
            />
          </div>

          <div className="col-12 submit-session">
            <BaseButton type="primary-black" onClick={handleSubmitForm}>
              <i className="button-icon fas fa-check " /> Salvar Perfil
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PsychologistsView;
