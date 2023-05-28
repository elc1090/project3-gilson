import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
//import "bootstrap/dist/css/bootstrap.min.css";
//import "@fortawesome/fontawesome-free/css/all.css";
import BaseInput from "../Components/BaseInput/BaseInput";
import BaseButton from "../Components/BaseButton/BaseButton";
import FadeInAlert from "../Components/FadeInAlert/FadeInAlert";

import api from '../Services/api';
import { login } from "../Services/auth";


function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [active, setActive] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  async function handleLogin() {
    if (!email || !password) {
      setErrorMessage("Preencha todos os campos");
      setActive(true);
      return;
    }

    try {
      const url = "/login";
      const user = { email, password };

      const { data } = await api.post(url, user);
      console.log(data);

      if (data.success) {
        console.log("Login bem-sucedido");
        login(data.auth.token, data.roles);

        navigate(`/${data.roles}/dashboard`);
      }

    } catch (error) {
      setErrorMessage(error.response.data.message);
      setActive(true);

      console.error("Erro na requisição", error.response);
    }
  }

  return (
    <div className="Login">
      <div className="brand-container">
        <img
          className={`brand-image mt-3 `}
          alt="Logo"
          src={"/logo-horizontal-sem-fundo.png"}
        ></img>
      </div>

      <div className="Login-body">
        <div className="d-flex justify-content-center">
          <div className="row login-container">
            <div className="d-flex col-12 justify-content-center">
              <div className="login-card">
                <div className="row">
                  <div className="d-flex col-12 justify-content-center">
                    <span className="login-title">Login</span>
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="d-flex col-12 justify-content-center">
                    <div className="input-container">
                      <BaseInput
                        value={email}
                        setValue={setEmail}
                        placeholder={"Email"}
                        label="Email"
                        labelType="insideLabel"
                      />
                    </div>
                  </div>
                  <div className="d-flex col-12 justify-content-center mt-4">
                    <div className="input-container">
                      <BaseInput
                        value={password}
                        setValue={setPassword}
                        placeholder={"Senha"}
                        label="Senha"
                        labelType="insideLabel"
                        type="password"
                      />
                    </div>
                  </div>
                  <div className="d-flex col-12 justify-content-center mt-4">
                    <div className="input-container">
                      <FadeInAlert message={errorMessage} visible={active} setVisible={setActive} />
                    </div>
                  </div>
                  <div className="d-flex col-12 justify-content-center">
                    <div className="enter-button">
                      <BaseButton type="primary-black" onClick={handleLogin}>
                        Entrar
                      </BaseButton>
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
}

export default Login;
