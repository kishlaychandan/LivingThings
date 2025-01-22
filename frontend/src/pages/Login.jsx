import React, { useState } from "react";
import Auth from "../components/Auth";
import Dashboard from "./Dashboard";

const Login = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return isAuthenticated ? <Dashboard /> : <Auth setIsAuthenticated={setIsAuthenticated} />;
};

export default Login;
