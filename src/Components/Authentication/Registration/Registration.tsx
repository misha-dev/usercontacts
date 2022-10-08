import { Form, Formik } from "formik";

import * as Yup from "yup";

import logo from "../../../imgs/logo.png";
import { useAppDispatch } from "../../../store/hooks";
import { setUser } from "../../../store/userSlice";
import { UserReduxType, userType } from "../../../types/UserType.types";
import { GradientButton } from "../../Utils/Buttons/GradientButton/GradientButton";
import { FormInputWithValidation } from "../../Utils/FormInput/FormInputWithValidation/FormInputWithValidation";
import { GradientHeader } from "../../Utils/Headers/GradientHeader/GradientHeader";
import { SimpleLink } from "../../Utils/Links/SimpleLink/SimpleLink";
import { WhiteLink } from "../../Utils/Links/WhiteLink/WhiteLink";

import cl from "./Registration.module.scss";

export const Registration = () => {
  const dispatch = useAppDispatch();
  const onSubmit = (values: userType) => {
    fetch("http://localhost:3001/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((res) => {
        return res.json();
      })
      .then(({ user, accessToken }: { user: UserReduxType; accessToken: string }) => {
        user.accessToken = accessToken;
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(setUser(user));
      })
      .catch((error) => {
        alert("Something went wrong:(");
      });
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required").min(3, "Should be at least 3 letters!"),
    username: Yup.string().required("Required").min(3, "Should be at least 3 letters!"),
    email: Yup.string().required("Required").email("Invalid email format!"),
    password: Yup.string().required("Required").min(5, "Should be at least 5 letters"),
  });

  const initialValues: userType = { name: "", username: "", email: "", password: "" };

  return (
    <div className={cl.mainWrapper}>
      <div className={cl.logoSection}>
        <div className={cl.logoWithText}>
          <img src={logo} alt="logo" />
          <p>JOIN US</p>
        </div>

        <div className={cl.projectInfoWithText}>
          <p>See how is project</p>
          <p>is implemented</p>
          <p>on GitHub</p>
          <WhiteLink text="About Project" link="https://github.com/misha-dev/usercontacts" />
        </div>
      </div>
      <div className={cl.registrationSection}>
        <GradientHeader text="Register Here" />
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          <Form className={cl.registrationForm}>
            <div className={cl.registrationInputs}>
              <FormInputWithValidation required={true} id="name" name="name" type="text" text="Name" />

              <FormInputWithValidation required={true} id="username" name="username" type="text" text="Username" />

              <FormInputWithValidation required={true} id="email" name="email" type="email" text="Email" />

              <FormInputWithValidation required={true} id="password" name="password" type="password" text="Password" />
            </div>
            <div className={cl.loginWrapper}>
              <div className={cl.formLogin}>
                <SimpleLink link="/usercontacts/login" text="Log in here" />
              </div>
              <div className={cl.formRegister}>
                <GradientButton text="Register" type="submit" />
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
