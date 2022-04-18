import React from "react";

import { Navigate } from "react-router-dom";

interface IGuestRoute {
  component: React.ComponentType;
}

export const GuestRoute = ({ component: Component, ...rest }: IGuestRoute) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (user?.email) return <Navigate to="/list" />;
  return <Component {...rest} />;
};
