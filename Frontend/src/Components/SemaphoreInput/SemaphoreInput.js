import React, { useState } from "react";
import { Tooltip } from "react-tooltip";
import "./SemaphoreInput.css"; // Importando o arquivo de estilos CSS

const Semaphore = ({ selectedLevel, onChange, onlyView }) => {
  const [level, setLevel] = useState(selectedLevel);

  const handleLevelChange = (newLevel) => {
    setLevel(newLevel);
    onChange(newLevel);
  };

  return (
    <div className="semaphore">
      <div
        id="semaphore-tooltip-green"
        className={`circle green ${level === "low" ? "selected" : ""}`}
        onClick={() => handleLevelChange("low")}
      />
      <div
        id="semaphore-tooltip-yellow"
        className={`circle yellow ${level === "medium" ? "selected" : ""}`}
        onClick={() => handleLevelChange("medium")}
      />
      <div
        id="semaphore-tooltip-red"
        className={`circle red ${level === "high" ? "selected" : ""}`}
        onClick={() => handleLevelChange("high")}
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
