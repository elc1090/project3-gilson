import React, { useState } from "react";
import { Tooltip } from "react-tooltip";
import "./SemaphoreInput.css"; // Importando o arquivo de estilos CSS

const Semaphore = ({ selectedLevel, onChange }) => {
  const handleLevelChange = (newLevel) => {
    onChange(newLevel);
  };

  return (
    <div className="semaphore">
      <div
        id="semaphore-tooltip-green"
        className={`circle green ${selectedLevel === "low" ? "selected" : ""}`}
        onClick={() => handleLevelChange("low")}
      />
      <div
        id="semaphore-tooltip-yellow"
        className={`circle yellow ${selectedLevel === "medium" ? "selected" : ""}`}
        onClick={() => handleLevelChange("medium")}
      />
      <div
        id="semaphore-tooltip-red"
        className={`circle red ${selectedLevel === "high" ? "selected" : ""}`}
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
