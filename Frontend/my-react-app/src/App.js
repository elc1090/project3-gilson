import React from "react";
import "./index.css";
import Login from "./Views/Login";
import DashboardLayout from "./Layout/Admin/DashboardLayout";
import DashboardAdmin from "./Views/Admin/Dashboard";
import PsychologistsView from "./Views/Admin/Psychologists/PsychologistsView";
import PsychologistsForm from "./Views/Admin/Psychologists/PsychologistsForm";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const App = () => {
  //const location = useLocation();
  return (
    <React.StrictMode>
      <BrowserRouter>
        <TransitionGroup>
          <CSSTransition key={"location.key"} classNames="fade" timeout={300}>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route
                exact
                path="/user/dashboard"
                element={
                  <DashboardLayout>
                    <DashboardAdmin />
                  </DashboardLayout>
                }
              />
              <Route
                exact
                path="/user/psychologists"
                element={
                  <DashboardLayout>
                    <PsychologistsView />
                  </DashboardLayout>
                }
              />
              <Route
                exact
                path="/user/psychologists/new"
                element={
                  <DashboardLayout>
                    <PsychologistsForm />
                  </DashboardLayout>
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
