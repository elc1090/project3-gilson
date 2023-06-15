import React from 'react';
import './index.css';
import Login from './Views/Login';

import AdminLayout from './Layout/Admin/DashboardLayout';
import DashboardAdmin from './Views/Admin/Dashboard';
import PsychologistsView from './Views/Admin/Psychologists/PsychologistsView';
import PsychologistsForm from './Views/Admin/Psychologists/PsychologistsForm';

import PsychologistLayout from './Layout/Psychologist/DashboardLayout';
import DashboardPsychologist from './Views/Psychologist/Dashboard';
import PathologiesView from './Views/Psychologist/Pathologies/PathologiesView';
import PatientsView from './Views/Psychologist/Patients/PatientsView';
import SessionsView from './Views/Psychologist/Sessions/SessionsView';

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

const App = () => {
  // const location = useLocation();
  return (
    <React.StrictMode>
      <BrowserRouter>
        <TransitionGroup>
          <CSSTransition key={'location.key'} classNames="fade" timeout={300}>
            <Routes>
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
                path="/psychologist/sessions"
                element={
                  <PsychologistLayout>
                    <SessionsView />
                  </PsychologistLayout>
                }
              />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </BrowserRouter>
    </React.StrictMode>
  );
};
export default App;
