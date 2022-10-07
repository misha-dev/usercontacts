import { Navigate, Route, Routes } from "react-router-dom";

import { Login } from "../Authentication/Login/Login";

import { Registration } from "../Authentication/Registration/Registration";
import { Layout } from "../Layout/Layout";

export const MainRouter = () => {
  return (
    <Routes>
      <Route path="usercontacts" element={<Layout />}>
        <Route index element={<Registration />} />
        <Route path="register" element={<Registration />} />
        <Route path="login" element={<Login />} />
      </Route>
      <Route path="*" element={<Navigate to={"/usercontacts"} />} />
    </Routes>
  );
};
