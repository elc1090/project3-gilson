import React, { useState } from "react";
import { Tooltip } from "react-tooltip";
import "./SemaphoreInput.css"; // Importando o arquivo de estilos CSS

const Semaphore = ({ selectedLevel, onChange }) => {
  const [level, setLevel] = useState(selectedLevel);

  const handleLevelChange = (newLevel) => {
    setLevel(newLevel);
    onChange(newLevel);
  };

  return (
    <div className="semaphore">
      <div
        id="semaphore-tooltip-green"
        className={`circle green ${level === "green" ? "selected" : ""}`}
        onClick={() => handleLevelChange("verde")}
      />
      <div
        id="semaphore-tooltip-yellow"
        className={`circle yallow ${level === "amarelo" ? "selected" : ""}`}
        onClick={() => handleLevelChange("amarelo")}
      />
      <div
        id="semaphore-tooltip-red"
        className={`circle red ${level === "vermelho" ? "selected" : ""}`}
        onClick={() => handleLevelChange("vermelho")}
      />
      <Tooltip anchorSelect="#semaphore-tooltip-green" place="top">
        Baixa Relevância
      </Tooltip>
      <Tooltip anchorSelect="#semaphore-tooltip-yellow" place="top">
        Média Relevância
      </Tooltip>
      <Tooltip anchorSelect="#semaphore-tooltip-red" place="top">
        Alta Relevância
      </Tooltip>
    </div>
  );
};

export default Semaphore;
