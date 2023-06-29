import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "@fortawesome/fontawesome-free/css/all.css";
import StyledInput from "../Components/StyledInput/StyledInput";
import BaseButton from "../Components/BaseButton/BaseButton";
import FadeInAlert from "../Components/FadeInAlert/FadeInAlert";

import api from "../Services/api";
import { login } from "../Services/auth";
import { motion } from "framer-motion";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [active, setActive] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const loginButtonRef = useRef(null);

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

        if (data.roles === "psychologist") navigate("/psychologist/patients");
        if (data.roles === "user") navigate("/user/psychologists");
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setActive(true);

      console.error("Erro na requisição", error.response);
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      loginButtonRef.current.click();
    }
  };

  return (
    <motion.div
      className="Login"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
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
                      <StyledInput
                        value={email}
                        setValue={setEmail}
                        placeholder={"Email"}
                        label="Email"
                        labelType="insideLabel"
                        onKeyUp={handleKeyPress}
                      />
                    </div>
                  </div>
                  <div className="d-flex col-12 justify-content-center mt-4">
                    <div className="input-container">
                      <StyledInput
                        value={password}
                        setValue={setPassword}
                        placeholder={"Senha"}
                        label="Senha"
                        labelType="insideLabel"
                        type="password"
                        onKeyUp={handleKeyPress}
                      />
                    </div>
                  </div>
                  <div className="d-flex col-12 justify-content-center mt-4">
                    <div className="input-container">
                      <FadeInAlert
                        message={errorMessage}
                        visible={active}
                        setVisible={setActive}
                      />
                    </div>
                  </div>
                  <div className="d-flex col-12 justify-content-center">
                    <div className="enter-button">
                      <BaseButton
                        type="primary-black"
                        ref={loginButtonRef}
                        onClick={handleLogin}
                      >
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
    </motion.div>
  );
}

export default Login;
