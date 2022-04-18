// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";


/**
 * @description components imports
 */
import Header from "./components/Header";
import NewUser from "./containers/User";
import Login from "./containers/Login";
import UserList from "./containers/UserList";
import { PrivateRoute } from "./components/PrivateRoute";
import { GuestRoute } from "./components/GuestRoute";

const AppRoutes = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/login" element={<GuestRoute component={Login} />} />
        <Route path="/new" element={<PrivateRoute component={NewUser} />} />
        <Route
          path="/edit/:id"
          element={<PrivateRoute component={NewUser} />}
        />
        <Route path="/list" element={<PrivateRoute component={UserList} />} />

        {/* 404 page */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
