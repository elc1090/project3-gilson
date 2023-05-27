import React from 'react';
import Sidebar from './Sidebar';
import './DashboardLayout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
