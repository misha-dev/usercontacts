import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setUser } from "../../store/userSlice";
import { UserReduxType } from "../../types/UserType.types";

import { Login } from "../Authentication/Login/Login";

import { Registration } from "../Authentication/Registration/Registration";
import { Contacts } from "../Contacts/Contacts";
import { Layout } from "../Layout/Layout";

export const MainRouter = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [checkedLogged, setCheckedLogged] = useState(false);

  useEffect(() => {
    const user: UserReduxType = JSON.parse(localStorage.getItem("user")!) as UserReduxType;

    const checkIfLogged = async () => {
      const response = await fetch(`http://localhost:3001/600/users/${user.id}`, {
        method: "get",
        headers: { Authorization: `Bearer ${user.accessToken}` },
      });
      if (response.ok) {
        dispatch(setUser(user));
      } else {
        localStorage.clear();
      }
      setCheckedLogged(true);
    };

    if (user?.accessToken) {
      checkIfLogged();
    } else {
      setCheckedLogged(true);
    }
  }, []);

  return (
    <>
      {checkedLogged ? (
        <Routes>
          <Route path="usercontacts" element={<Layout />}>
            {user.id ? (
              <Route index element={<Contacts />} />
            ) : (
              <>
                <Route index element={<Registration />} />
                <Route path="login" element={<Login />} />
              </>
            )}
          </Route>
          <Route path="*" element={<Navigate to={"/usercontacts"} />} />
        </Routes>
      ) : null}
    </>
  );
};
