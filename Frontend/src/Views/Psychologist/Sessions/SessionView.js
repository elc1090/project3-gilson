import React from "react";
import "./SessionView.css";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";

import ReactQuill from "react-quill";

import api from "../../../Services/api";

function SessionView() {
  const navigate = useNavigate();
  const [changingHeader] = useState(false);
  const [session, setSession] = useState({});
  const { session_id } = useParams();

  useEffect(() => {
    const loadSession = async () => {
      try {
        const { data } = await api.get(
          `psychologists/appointments/${session_id}`
        );
        setSession(data.appointment);
      } catch (error) {
        console.log(error.response.data.message);
        console.error("Erro na requisição", error.response);
      }
    };

    const fetchData = async () => {
      await loadSession();
    };

    fetchData();
  }, [session_id]);

  function getHeaderTextClass() {
    if (changingHeader) return "text-leave";
    else return "text-enter";
  }

  function getFormatedDate(date) {
    const dateObj = new Date(date);
    // Obter os componentes da data (dia, mês, ano)
    const day = dateObj.getDate().toString().padStart(2, "0");
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObj.getFullYear().toString();
    const hours = dateObj.getHours().toString().padStart(2, "0");
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");

    return `em ${day}/${month}/${year} às ${hours}:${minutes}min`;
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
  return (
    <div className="view-session-container">
      <header className="view-session-header d-none d-lg-block">
        <div className="d-flex row">
          <div className="col-lg-8 inline-block">
            <h1 className={`header-title ${getHeaderTextClass()}`}>
              <span>Sessão de {session?.patient?.name}</span>
            </h1>
            <h3 className={`${getHeaderTextClass()}`}>
              <i className="fas fa-calendar page-icon" />
              {getFormatedDate(session.created_at)}
            </h3>
          </div>
        </div>
      </header>

      <div className="page-body">
        <div className="row">
          <div className="col-lg-6">
            <div className="card p-0">
              <div className="card-header">
                <h3 className="card-title">Anotações Gerais</h3>
              </div>
              <div className="card-body">
                <ReactQuill
                  value={session.general_notes}
                  key={"1_react_quill"}
                  readOnly={true}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-4 mt-4 mt-lg-0">
            <div className="card p-0">
              <div className="card-header">
                <h3 className="card-title">Demandas criadas nesta sessão</h3>
              </div>
              <div className="card-body">
                {session?.demands?.length ? (
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
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {session.demands.map((row, index) => (
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
                                disabled
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
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <div className="d-flex justify-content-center align-items-center h-100">
                    <span className="text-muted">
                      Nenhuma demanda criada nesta sessão está ativa
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SessionView;
