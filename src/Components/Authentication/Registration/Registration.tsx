import { useFormik } from "formik";

import logo from "../../../imgs/logo.png";
import { GradientButton } from "../../Utils/Buttons/GradientButton/GradientButton";
import { LoginInput } from "../../Utils/FormInput/FormInput";
import { GradientHeader } from "../../Utils/Headers/GradientHeader/GradientHeader";
import { SimpleLink } from "../../Utils/Links/SimpleLink/SimpleLink";
import { WhiteLink } from "../../Utils/Links/WhiteLink/WhiteLink";

import cl from "./Registration.module.scss";

export const Registration = () => {
  interface ILoginFormik {
    name: string;
    username: string;
    email: string;
    password: string;
  }
  const formik = useFormik<ILoginFormik>({
    initialValues: { name: "", username: "", email: "", password: "" },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div className={cl.mainWrapper}>
      <div className={cl.logoSection}>
        <div className={cl.logoWithText}>
          <img src={logo} alt="logo" />
          <p>JOIN US</p>
        </div>

        <div className={cl.projectInfoWithText}>
          <p>See how it project</p>
          <p>is implemented</p>
          <p>on GitHub</p>
          <WhiteLink text="About Project" link="https://github.com/misha-dev/usercontacts" fontSize={1.3} />
        </div>
      </div>
      <div className={cl.registrationSection}>
        <GradientHeader text="Register Here" />
        <form className={cl.registrationForm} onSubmit={formik.handleSubmit}>
          <div className={cl.registrationInputs}>
            <LoginInput required={true} id="name" name="name" type="text" value={formik.values.name} onChange={formik.handleChange} text="Name" />
            <LoginInput required={true} id="username" name="username" type="text" onChange={formik.handleChange} value={formik.values.username} text="Username" />
            <LoginInput required={true} id="email" name="email" type="email" onChange={formik.handleChange} value={formik.values.email} text="Email" />
            <LoginInput required={true} id="password" name="password" type="password" onChange={formik.handleChange} value={formik.values.password} text="Password" />
          </div>
          <div className={cl.loginWrapper}>
            <div className={cl.formLogin}>
              <SimpleLink link="#" text="Log in here" fontSize={1} />
            </div>
            <div className={cl.formRegister}>
              <GradientButton fontSize={1.2} text="Register" type="submit" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
