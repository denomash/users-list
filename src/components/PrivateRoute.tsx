import React from "react";

import { Navigate } from "react-router-dom";
import { UserListProvider } from "../contexts/UserListProvider";

interface IPrivateRoute {
  component: React.ComponentType;
}

export const PrivateRoute = ({
  component: Component,
  ...rest
}: IPrivateRoute) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (user?.email)
    return (
      <UserListProvider email={user.email}>
        <Component {...rest} />
      </UserListProvider>
    );
  return <Navigate to="/login" />;
};
