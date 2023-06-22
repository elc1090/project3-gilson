import React from "react";
import "./PatientsForm.css";
import "../../PageHeader.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BaseButton from "../../../Components/BaseButton/BaseButton";
import BaseInput from "../../../Components/BaseInput/BaseInput";
import BaseDropdown from "../../../Components/BaseDropdown/BaseDropdown";

import api from "../../../Services/api";

function PatientsForm() {
  const navigate = useNavigate();
  const [changingHeader] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "psychologist",
    cpf: "",
    birth_date: "",
    phone: "",
    gender: "",
  });
  const [genderOptions] = useState(["Masculino", "Feminino", "Outro"]);

  async function handleSubmitForm() {
    try {
      await api.post("/psychologists/patients", formData);
      navigate("/psychologist/patients");
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
            <i className="fas fa-plus page-icon" /> <span>Novo Paciente</span>
          </h1>
        </div>
      </header>

      <div className="page-body">
        <div className="d-flex row">
          <div className="col-md-12 mt-4">
            <h2 className="text-bolder">Dados Pessoais:</h2>
          </div>
          <div className="col-lg-6 col-xl-4">
            <BaseInput
              value={formData.name}
              setValue={(value) => handleChange("name", value)}
              placeholder={"Nome Completo"}
              icon="fas fa-user"
              label={"Nome"}
              type={"input"}
            />
          </div>
          <div className="col-lg-6 col-xl-4">
            <BaseInput
              value={formData.birth_date}
              setValue={(value) => handleChange("birth_date", value)}
              placeholder={"Data de Nascimento"}
              icon="fas fa-calendar"
              label={"Data de Nascimento"}
              type={"input"}
            />
          </div>
          <div className="col-lg-6 col-xl-4">
          <BaseDropdown
            value={formData.gender}
            setValue={(value) => handleChange("gender", value)}
            placeholder={"Sexo"}
            icon="fas fa-genderless"
            label={"Sexo"}
          >
            {genderOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </BaseDropdown>
          </div>
          <div className="col-lg-4">
            <BaseInput
              value={formData.cpf}
              setValue={(value) => handleChange("cpf", value)}
              placeholder={"CPF"}
              icon="fas fa-id-card"
              label={"CPF"}
              type={"input"}
            />
          </div>

          <div className="col-md-12">
            <h2 className="text-bolder">Contato:</h2>
          </div>
          <div className="col-md-6">
            <BaseInput
              value={formData.email}
              setValue={(value) => handleChange("email", value)}
              placeholder={"Email"}
              label={"Email"}
              icon="fas fa-envelope"
              type="email"
            />
          </div>
          <div className="col-md-6 d-none d-md-block"></div>

          <div className="col-md-6">
            <BaseInput
              value={formData.phone}
              setValue={(value) => handleChange("phone", value)}
              placeholder={"Telefone"}
              icon="fas fa-phone"
              label={"Telefone"}
              type={"phone"}
            />
          </div>
          <div className="col-md-6"> </div>
          <div className="col-12 submit-session">
            <BaseButton type="primary-black" onClick={handleSubmitForm}>
              <i className="button-icon fas fa-check " /> Salvar Perfil
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientsForm;
