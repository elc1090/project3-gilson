import React from "react";
import "./SessionsView.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import BaseButton from "../../../Components/BaseButton/BaseButton";
import api from "../../../Services/api";

const SessionsView = () => {
  const navigate = useNavigate();
  const [changingHeader] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [patients, setPatients] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const loadpatients = async () => {
      try {
        const { data } = await api.get("psychologists/patients");
        const patientsData = data.patients;
        setPatients(patientsData);
      } catch (error) {
        console.log(error.response.data.message);
        console.error("Erro na requisição", error.response);
      }
    };

    const loadSessions = async () => {
      try {
        const { data } = await api.get("psychologists/appointments");
        const sessionsData = data;
        console.log(sessionsData);
        setSessions(sessionsData);
      } catch (error) {
        console.log(error.response.data.message);
        console.error("Erro na requisição", error.response);
      }
    };

    const fetchData = async () => {
      await loadpatients();
      await loadSessions();
    };

    fetchData();
  }, []);

  function getHeaderTextClass() {
    if (changingHeader) return "text-leave";
    else return "text-enter";
  }

  function navigateToInitSession(patient_id) {
    navigate(`/psychologist/sessions/${patient_id}/new`);
  }

  function getFormatedDate(date) {
    const dateObj = new Date(date);

    // Obter os componentes da data (dia, mês, ano)
    const day = dateObj.getDate().toString().padStart(2, "0");
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObj.getFullYear().toString();

    return `${day}-${month}-${year}`;
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
            <BaseButton type="primary-black" onClick={() => setOpenModal(true)}>
              <i className="button-icon fas fa-plus " /> Iniciar nova sessão
            </BaseButton>
          </div>
        </div>
        <div className="row">
          {sessions?.length ? (
            <TableContainer sx={{ borderRadius: 0 }} component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Data</TableCell>
                    <TableCell>Paciente</TableCell>
                    <TableCell>Duração</TableCell>
                    <TableCell>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sessions.map((row, index) => (
                    <TableRow
                      key={"appointment_" + index}
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {index}
                      </TableCell>
                      <TableCell>{getFormatedDate(row.created_at)}</TableCell>
                      <TableCell>{row.patient.name}</TableCell>
                      <TableCell>{row.duration}</TableCell>
                      <TableCell> </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <span className="empty-page">Nenhuma sessão realizada</span>
          )}
        </div>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={() => setOpenModal(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openModal}>
          <div className="card patients-modal">
            <div className="card-header modal-header">
              <h1 className="card-title">
                <i className="fas fa-square-check mr-3 ml-2" />
                Selecione um paciente
              </h1>
            </div>
            <div className="modal-body">
              <div className="row">
                {patients?.length ? (
                  patients.map((patient) => {
                    return (
                      <div
                        className="col-12 col-md-6 col-lg-4 col-xxl-3"
                        key={patient.patient_id}
                      >
                        <div
                          className="row small-patient-card"
                          onClick={() =>
                            navigateToInitSession(patient.patient_id)
                          }
                        >
                          <div className="d-flex col-12 justify-content-center">
                            <img
                              className={`small-profile-img mt-3 `}
                              alt="Foto de Perfil do Psicólogo"
                              src={"/user-profile.png"}
                            ></img>
                          </div>
                          <div className="d-flex col-12 align-items-center flex-column text-white mb-3 mt-2">
                            <h5>{patient.name}</h5>
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
        </Fade>
      </Modal>
    </div>
  );
};

export default SessionsView;
