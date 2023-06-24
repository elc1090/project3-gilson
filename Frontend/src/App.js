import React from 'react';
import './index.css';
import AnimatedRoutes from './AnimatedRoutes';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <AnimatedRoutes/>
    </Router>
  );
};

export default App;
