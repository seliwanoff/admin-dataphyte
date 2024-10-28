import React from "react";
//import logo from "./logo.svg";

import "./App.css";
import RouteWrapper from "./routes/route";
import { BrowserRouter as Router, useLocation } from "react-router-dom";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <RouteWrapper />
      </Router>
    </>
  );
};

export default App;
