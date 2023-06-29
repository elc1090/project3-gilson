import React from "react";
import Login from "./Views/Login";
import AdminLayout from "./Layout/Admin/DashboardLayout";
import DashboardAdmin from "./Views/Admin/Dashboard";
import PsychologistsList from "./Views/Admin/Psychologists/PsychologistsList";
import PsychologistsForm from "./Views/Admin/Psychologists/PsychologistsForm";
import PsychologistLayout from "./Layout/Psychologist/DashboardLayout";
import DashboardPsychologist from "./Views/Psychologist/Dashboard";
import PathologiesView from "./Views/Psychologist/Pathologies/PathologiesView";
import PatientsList from "./Views/Psychologist/Patients/PatientsList";
import PatientsForm from "./Views/Psychologist/Patients/PatientsForm";
import PatientView from "./Views/Psychologist/Patients/PatientView";
import SessionsList from "./Views/Psychologist/Sessions/SessionsList";
import NewSession from "./Views/Psychologist/Sessions/NewSession";
import SessionView from "./Views/Psychologist/Sessions/SessionView";

import { Routes, Route, useLocation } from "react-router-dom";

import { AnimatePresence } from "framer-motion";
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route exact path="/" element={<Login />} />

        {/* USER ROUTES */}
        <Route
          exact
          path="/user/dashboard"
          element={
            <AdminLayout>
              <DashboardAdmin />
            </AdminLayout>
          }
        />
        <Route
          exact
          path="/user/psychologists"
          element={
            <AdminLayout>
              <PsychologistsList />
            </AdminLayout>
          }
        />
        <Route
          exact
          path="/user/psychologists/new"
          element={
            <AdminLayout>
              <PsychologistsForm />
            </AdminLayout>
          }
        />

        {/* PSYCHOLOGIST ROUTES */}
        <Route
          exact
          path="/psychologist/dashboard"
          element={
            <PsychologistLayout>
              <DashboardPsychologist />
            </PsychologistLayout>
          }
        />
        <Route
          exact
          path="/psychologist/pathologies"
          element={
            <PsychologistLayout>
              <PathologiesView />
            </PsychologistLayout>
          }
        />
        <Route
          exact
          path="/psychologist/patients"
          element={
            <PsychologistLayout>
              <PatientsList />
            </PsychologistLayout>
          }
        />
        <Route
          exact
          path="/psychologist/patients/:patient_id"
          element={
            <PsychologistLayout>
              <PatientView />
            </PsychologistLayout>
          }
        />
        <Route
          exact
          path="/psychologist/patients/new"
          element={
            <PsychologistLayout>
              <PatientsForm />
            </PsychologistLayout>
          }
        />
        <Route
          exact
          path="/psychologist/sessions"
          element={
            <PsychologistLayout>
              <SessionsList />
            </PsychologistLayout>
          }
        />
        <Route
          exact
          path="/psychologist/sessions/:patient_id/new"
          element={
            <PsychologistLayout>
              <NewSession />
            </PsychologistLayout>
          }
        />
        <Route
          exact
          path="/psychologist/sessions/:session_id"
          element={
            <PsychologistLayout>
              <SessionView />
            </PsychologistLayout>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
