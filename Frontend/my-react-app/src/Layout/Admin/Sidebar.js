import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import menuData from './menu.json';
import './Sidebar.css';

const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState(1);

  const handleItemClick = (itemId) => {
    setSelectedItem(itemId);
  };

  return (
    <div className="sidebar">
      <div className="logo-container"><span>Logo</span></div>
      <div className='list-container'>
        <ul className="menu">
          {menuData.map((item) => (
            <li
              className={`list-item ${item.id === selectedItem ? 'selected' : ''}`}
              key={item.id}
              onClick={() => handleItemClick(item.id)}
            >
              <Link to={item.link}>
                <i className={`item-icon ${item.icon}`} />
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
