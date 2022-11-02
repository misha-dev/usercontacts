import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logOut, setUser } from "../../store/userSlice";
import { UserAuth } from "../../types/UserType.types";
import { JSON_API } from "../../Utils/constants";

import { Login } from "../Authentication/Login/Login";

import { Registration } from "../Authentication/Registration/Registration";
import { Contacts } from "../Contacts/Contacts";
import { Layout } from "../Layout/Layout";
import { LoaderCircle } from "../Utils/LoaderCircle/LoaderCircle";

export const MainRouter = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [checkedLogged, setCheckedLogged] = useState(false);

  useEffect(() => {
    const userAuth: UserAuth = JSON.parse(localStorage.getItem("userAuth")!);

    const checkIfLogged = async () => {
      try {
        const response = await fetch(`${JSON_API}/600/users/${userAuth.userId}`, {
          method: "get",
          headers: { Authorization: `Bearer ${userAuth.accessToken}` },
        });
        if (response.ok) {
          const user = await response.json();
          dispatch(setUser(user));
        } else {
          localStorage.clear();
          dispatch(logOut());
        }
      } catch (error) {
        console.log("server is unavailable");
        localStorage.clear();
        dispatch(logOut());
      }
      setCheckedLogged(true);
    };

    if (userAuth?.accessToken) {
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
      ) : (
        <div style={{ height: "100vh" }}>
          <LoaderCircle size={9} />
        </div>
      )}
    </>
  );
};
