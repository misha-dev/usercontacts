import { LoaderCircle } from "components";
import { JSON_API } from "data";
import { Layout } from "features";
import { ContactsPage, LoginPage, RegistrationPage } from "pages/indetx";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { logOut, setUser } from "store/userSlice";
import { UserAuth } from "types";


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
              <Route index element={<ContactsPage />} />
            ) : (
              <>
                <Route index element={<RegistrationPage />} />
                <Route path="login" element={<LoginPage />} />
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
