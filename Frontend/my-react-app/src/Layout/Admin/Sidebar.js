import React, { useState } from "react";
import menuData from "./menu.json";
import { useNavigate } from "react-router-dom";
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

  return (
    <div className="sidebar">
      <div className="logo-container">
        <span>Logo</span>
      </div>
      <div className="list-container">
        <ul className="menu">
          {menuData.map((item) => (
            <li
              className={`list-item ${
                item.role === selectedItem ? "selected" : ""
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
    </div>
  );
};

export default Sidebar;
