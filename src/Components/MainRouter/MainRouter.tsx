import { Navigate, Route, Routes } from "react-router-dom";

import { Registration } from "../Authentication/Registration/Login";
import { Layout } from "../Layout/Layout";

export const MainRouter = () => {
  return (
    <Routes>
      <Route path="usercontacts" element={<Layout />}>
        <Route index element={<Registration />} />
      </Route>
      <Route path="*" element={<Navigate to={"/usercontacts"} />} />
    </Routes>
  );
};
