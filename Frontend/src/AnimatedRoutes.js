import React from "react";
import Login from "./Views/Login";
import AdminLayout from "./Layout/Admin/DashboardLayout";
import DashboardAdmin from "./Views/Admin/Dashboard";
import PsychologistsView from "./Views/Admin/Psychologists/PsychologistsView";
import PsychologistsForm from "./Views/Admin/Psychologists/PsychologistsForm";
import PsychologistLayout from "./Layout/Psychologist/DashboardLayout";
import DashboardPsychologist from "./Views/Psychologist/Dashboard";
import PathologiesView from "./Views/Psychologist/Pathologies/PathologiesView";
import PatientsView from "./Views/Psychologist/Patients/PatientsView";
import PatientsForm from "./Views/Psychologist/Patients/PatientsForm";
import SessionsView from "./Views/Psychologist/Sessions/SessionsView";
import NewSession from "./Views/Psychologist/Sessions/NewSession";

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
              <PsychologistsView />
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
              <PatientsView />
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
              <SessionsView />
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
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
