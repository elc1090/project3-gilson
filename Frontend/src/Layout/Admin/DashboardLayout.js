import React from "react";
import Sidebar from "./Sidebar";
import "./DashboardLayout.css";
import { motion } from "framer-motion";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      <motion.div
        className="content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Layout;
