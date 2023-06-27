import React from "react";
import "./NewSession.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const NewSession = () => {
  const navigate = useNavigate();
  const [changingHeader] = useState(false);
  const [patient, setPatient] = useState({ name: "Gilson Garcia" });
  const { seconds, minutes, hours } = useStopwatch({ autoStart: true });
  const [rows, setRows] = useState([]);

  const [formData, setFormData] = useState({
    general_notes: "",
    diagnosis: "",
  });

  const [demmandModel, setDemmandModel] = useState({
    check: false,
    title: "",
    level: "",
  });

  function getHeaderTextClass() {
    if (changingHeader) return "text-leave";
    else return "text-enter";
  }

  function getSemaphoreColor(level) {
    switch (level) {
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

  const handleDemmandChange = (name, value) => {
    setDemmandModel((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (index) => {
    const updatedRows = [...rows];
    updatedRows[index] = {
      ...updatedRows[index],
      check: !updatedRows[index].check,
      updated: true,
    };
    setRows(updatedRows);
  };

  function handleAddDemmand() {
    const updatedRows = [...rows];
    updatedRows.push({
      check: false,
      title: demmandModel.title,
      level: demmandModel.level,
      updated: true,
    });
    setRows(updatedRows);
    setDemmandModel({ check: false, title: "", level: "" });
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddDemmand();
    }
  };

  function handleFinishSession() {
    navigate(`/psychologist/sessions`);
  }
  function handleCancelSession() {
    navigate(`/psychologist/sessions`);
  }

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
        <div className="d-flex row">
          <div className="col-lg-4">
            <div className="row">
              <div className="card p-0">
                <div className="card-header">
                  <h3 className="card-title">Anotações Gerais</h3>
                </div>
                <div className="card-body">
                  <ReactQuill
                    value={formData.general_notes}
                    onChange={(value) =>
                      handleQuillChanges("general_notes", value)
                    }
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
                    onChange={(value) => handleQuillChanges("diagnosis", value)}
                    key={"2_react_quill"}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 demand-column">
            <div className="row h-100">
              <div className="full-height card p-0">
                <div className="card-header">
                  <h3 className="card-title">Demandas</h3>
                </div>
                <div className="card-body">
                  {rows.length ? (
                    <TableContainer sx={{ borderRadius: 0 }} component={Paper}>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell
                              padding={"none"}
                              sx={{ maxWidth: "10px" }}
                              align="left"
                            >
                              <Checkbox disabled />
                            </TableCell>
                            <TableCell padding={"none"}>Título</TableCell>
                            <TableCell padding={"none"} align="left">
                              Relevância
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row, index) => (
                            <TableRow
                              key={row.title}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell width={"45px"} padding={"none"}>
                                <Checkbox
                                  checked={row.check}
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
                                      row.level
                                    )} selected`}
                                  />
                                  {(row.level === "low" && "Baixa") ||
                                    (row.level === "medium" && "Média") ||
                                    (row.level === "high" && "Alta") ||
                                    "N/A"}
                                </div>
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
                        setValue={(value) =>
                          handleDemmandChange("title", value)
                        }
                        type="primary-black"
                        placeholder={"Nova demanda"}
                        labelType={"insideLabel"}
                        icon={"fas fa-boxes-stacked"}
                        value={demmandModel.title}
                        onKeyUp={handleKeyPress}
                      ></StyledInput>
                    </div>
                    <div className="semaphore-container">
                      <Semaphore
                        selectedLevel={demmandModel.level}
                        onChange={(value) =>
                          handleDemmandChange("level", value)
                        }
                      />
                    </div>
                    <div>
                      <IconButton
                        id="add-demand-btn"
                        icon={"fas fa-plus"}
                        iconClass={"icon-xl"}
                        onClick={handleAddDemmand}
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
    </div>
  );
};

export default NewSession;
