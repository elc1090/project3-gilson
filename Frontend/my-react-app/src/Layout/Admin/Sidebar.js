import React, { useState } from "react";
import menuData from "./menu.json";
import { useNavigate } from "react-router-dom";
import BaseButton from "../../Components/BaseButton/BaseButton";
import "./Sidebar.css";

const Sidebar = () => {
  const currentPath = window.location.pathname;
  const pathSegments = currentPath.split("/");
  const role = pathSegments[2];
  const [selectedItem, setSelectedItem] = useState(role);

  const navigate = useNavigate();

  const handleItemClick = (link, role) => {
    setSelectedItem(role);
    navigate(link);
  };

  function logout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <div className="sidebar">
      <div className="logo-container">
        <img
          className={`logo-image mt-3 `}
          alt="Logo"
          src={"/logo-vertical-sem-fundo-xl.png"}
        ></img>
      </div>
      <div className="list-container">
        <ul className="menu">
          {menuData.map((item) => (
            <li
              className={`list-item ${item.role === selectedItem ? "selected" : ""
                }`}
              key={item.id}
              onClick={() => handleItemClick(item.link, item.role)}
            >
              <i className={`item-icon ${item.icon}`} />
              <span>{item.title}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="logout-container">
        <BaseButton
          type="primary-black"
          onClick={logout}
        >
          <i className="item-icon fas fa-right-from-bracket"></i> Sair
        </BaseButton>
      </div>
    </div>
  );
};

export default Sidebar;
