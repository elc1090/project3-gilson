import React from "react";
import "./NewSession.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStopwatch } from "react-timer-hook";

import BaseButton from "../../../Components/BaseButton/BaseButton";
import IconButton from "../../../Components/IconButton/IconButton";
import StyledInput from "../../../Components/StyledInput/StyledInput";
import Semaphore from "../../../Components/SemaphoreInput/SemaphoreInput";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";

import { Tooltip } from "react-tooltip";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import api from "../../../Services/api";

const NewSession = () => {
  const navigate = useNavigate();
  const [changingHeader] = useState(false);
  const [patient, setPatient] = useState({});
  const [demands, setDemands] = useState([]);
  const [demandsToRemoval, setDemandsToRemoval] = useState([]);
  const { patient_id } = useParams();
  const { seconds, minutes, hours } = useStopwatch({ autoStart: true });

  const [formData, setFormData] = useState({
    general_notes: "",
    diagnosis_description: "",
    diagnosis_id: "",
  });

  const [demandModel, setDemandModel] = useState({
    addressed: false,
    title: "",
    relevance: "",
  });

  useEffect(() => {
    const loadPatient = async () => {
      try {
        const { data } = await api.get(`psychologists/patients/${patient_id}`);
        const patientsData = data.patient;
        setPatient(patientsData);
      } catch (error) {
        console.log(error.response.data.message);
        console.error("Erro na requisição", error.response);
      }
    };

    const loadPatientDemands = async () => {
      try {
        const { data } = await api.get(
          `psychologists/patients/${patient_id}/demands`
        );
        const demandsData = data.demands;
        setDemands(demandsData);
      } catch (error) {
        console.log(error.response.data.message);
        console.error("Erro na requisição", error.response);
      }
    };

    const loadPatientDiagnosis = async () => {
      try {
        const { data } = await api.get(
          `psychologists/patients/${patient_id}/diagnosis`
        );
        const diagnosisData = data.diagnosis;
        if (diagnosisData.length > 0) {
          setFormData((prevData) => ({
            ...prevData,
            diagnosis_description: diagnosisData[0].description,
            diagnosis_id: diagnosisData[0].diagnosis_id,
          }));
        }
      } catch (error) {
        console.log(error.response.data.message);
        console.error("Erro na requisição", error.response);
      }
    };

    const fetchData = async () => {
      await loadPatient();
      await loadPatientDemands();
      await loadPatientDiagnosis();
    };

    fetchData();
  }, [patient_id]);

  function getHeaderTextClass() {
    if (changingHeader) return "text-leave";
    else return "text-enter";
  }

  function getSemaphoreColor(relevance) {
    switch (relevance) {
      case "low":
        return "green";
      case "medium":
        return "yellow";
      case "high":
        return "red";
      default:
        return "";
    }
  }

  const handleQuillChanges = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDemandChange = (name, value) => {
    setDemandModel((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (index) => {
    const updatedDemands = [...demands];
    updatedDemands[index] = {
      ...updatedDemands[index],
      addressed: !updatedDemands[index].addressed,
      updated: true,
    };
    setDemands(updatedDemands);
  };

  function handleAddDemand() {
    if (!demandModel.title || !demandModel.relevance) return;

    const updatedDemands = [...demands];
    updatedDemands.push({
      addressed: false,
      title: demandModel.title,
      relevance: demandModel.relevance,
      updated: true,
    });
    setDemands(updatedDemands);
    setDemandModel({ addressed: false, title: "", relevance: "" });
  }

  function handleRemoveDemand(index) {
    const updatedDemands = [...demands];
    const demand = updatedDemands[index];
    if (demand.demand_id) {
      setDemandsToRemoval((prevDemands) => [...prevDemands, demand.demand_id]);
    }
    updatedDemands.splice(index, 1);
    setDemands(updatedDemands);
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddDemand();
    }
  };

  function handleFinishSession() {
    try {
      const demandsToUpdate = demands.filter((demand) => demand.updated);
      const demandsToSave = demands.filter((demand) => !demand.demand_id);
      const duration = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

      const data = {
        ...formData,
        demandsToSave: demandsToSave,
        demandsToRemoval: demandsToRemoval,
        demandsToUpdate: demandsToUpdate,
        duration: duration,
      };

      api.post(`psychologists/patients/${patient_id}/appointments`, data);
    } catch (error) {
      console.log(error.response.data.message);
      console.error("Erro na requisição", error.response);
    }
    navigate(`/psychologist/sessions`);
  }
  function handleCancelSession() {
    navigate(`/psychologist/sessions`);
  }

  return (
    <div className="new-session-container">
      <header className="new-session-header">
        <div className="d-flex row">
          <div className="col-lg-8 inline-block">
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
          <div className="button-container d-flex col-lg-4 justify-content-end align-items-end">
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
        <div className="row h-100">
          <div className="col-lg-4">
            <div className="full-height card p-0">
              <div className="card-header">
                <h3 className="card-title">Anotações Gerais</h3>
              </div>
              <div className="card-body">
                <ReactQuill
                  className="styled-ql"
                  value={formData.general_notes}
                  onChange={(value) =>
                    handleQuillChanges("general_notes", value)
                  }
                  key={"1_react_quill"}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-4 mt-4 mt-lg-0">
            <div className="full-height card p-0">
              <div className="card-header">
                <h3 className="card-title">Diagnóstico</h3>
              </div>
              <div className="card-body">
                <ReactQuill
                  className="styled-ql"
                  value={formData.diagnosis_description}
                  onChange={(value) =>
                    handleQuillChanges("diagnosis_description", value)
                  }
                  key={"2_react_quill"}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-4 mt-4 mt-lg-0">
            <div className="full-height card p-0">
              <div className="card-header">
                <h3 className="card-title">Demandas</h3>
              </div>
              <div className="card-body">
                {demands.length ? (
                  <TableContainer
                    sx={{ borderRadius: 0 }}
                    component={Paper}
                    style={{ maxHeight: 472 }}
                  >
                    <Table aria-label="simple table" stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            padding={"none"}
                            sx={{ maxWidth: "10px" }}
                            align="left"
                          >
                            <Checkbox disabled />
                          </TableCell>
                          <TableCell padding={"none"}>
                            <strong>Título</strong>
                          </TableCell>
                          <TableCell padding={"none"} align="left">
                            <strong>Relevância</strong>
                          </TableCell>
                          <TableCell padding={"none"} align="center">
                            <strong>Ações</strong>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {demands.map((row, index) => (
                          <TableRow
                            key={row.title + index}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell width={"45px"} padding={"none"}>
                              <Checkbox
                                checked={Boolean(row.addressed)}
                                onChange={() => handleCheckboxChange(index)}
                              />
                            </TableCell>
                            <TableCell
                              padding={"none"}
                              component="th"
                              scope="row"
                            >
                              {row.title}
                            </TableCell>
                            <TableCell
                              width={"20%"}
                              padding={"none"}
                              align="left"
                            >
                              <div className="d-flex align-items-center">
                                <div
                                  className={`circle ${getSemaphoreColor(
                                    row.relevance
                                  )} selected`}
                                />
                                {(row.relevance === "low" && "Baixa") ||
                                  (row.relevance === "medium" && "Média") ||
                                  (row.relevance === "high" && "Alta") ||
                                  "N/A"}
                              </div>
                            </TableCell>
                            <TableCell
                              width={"80px"}
                              padding={"none"}
                              align="center"
                            >
                              <IconButton
                                onClick={() => handleRemoveDemand(index)}
                                icon={"fas fa-trash custom-text-danger"}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <div className="d-flex justify-content-center align-items-center h-100">
                    <span className="text-muted">
                      Nenhuma demanda adicionada
                    </span>
                  </div>
                )}
              </div>
              <div className="card-footer">
                <div
                  className="d-flex footer-container align-items-center justify-content-center"
                  tabIndex={0}
                  onKeyUp={handleKeyPress}
                >
                  <div className="input-sm-container margin-right-sm">
                    <StyledInput
                      setValue={(value) => handleDemandChange("title", value)}
                      type="primary-black"
                      placeholder={"Nova demanda"}
                      labelType={"insideLabel"}
                      icon={"fas fa-boxes-stacked"}
                      value={demandModel.title}
                      onKeyUp={handleKeyPress}
                    ></StyledInput>
                  </div>
                  <div className="semaphore-container">
                    <Semaphore
                      selectedLevel={demandModel.relevance}
                      onChange={(value) =>
                        handleDemandChange("relevance", value)
                      }
                    />
                  </div>
                  <div>
                    <IconButton
                      id="add-demand-btn"
                      icon={"fas fa-plus"}
                      iconClass={"icon-xl"}
                      onClick={handleAddDemand}
                    />
                    <Tooltip anchorSelect="#add-demand-btn" place="top">
                      Adicionar Demanda
                    </Tooltip>
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
