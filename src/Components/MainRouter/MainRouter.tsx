import { Navigate, Route, Routes } from "react-router-dom";

import { Layout } from "../Layout/Layout";
import { Login } from "../Login/Login";

export const MainRouter = () => {
  return (
    <Routes>
      <Route path="usercontacts" element={<Layout />}>
        <Route index element={<Login />} />
      </Route>
      <Route path="*" element={<Navigate to={"/usercontacts"} />} />
    </Routes>
  );
};
