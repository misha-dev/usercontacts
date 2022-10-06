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
    validate: (values) => {
      const errors = {} as ILoginFormik;
      if (!values.name) {
        errors.name = "Required";
      } else if (!/.{3,}/gi.test(values.name)) {
        errors.name = "Name should be at least 3 letters!";
      }
      if (!values.email) {
        errors.email = "Required";
      } else if (!/^[a-z0-9]+@[a-z]+\.[a-z]{2,4}$/gi.test(values.email)) {
        errors.email = "Invalid email format!";
      }
      if (!values.username) {
        errors.username = "Required";
      } else if (!/.{3,}/gi.test(values.username)) {
        errors.username = "Should be at least 3 letters!";
      }
      if (!values.password) {
        errors.password = "Required";
      } else if (!/.{5,}/gi.test(values.password)) {
        errors.password = "Pass should be at least 5 letters!";
      }

      return errors;
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
          <p>See how is project</p>
          <p>is implemented</p>
          <p>on GitHub</p>
          <WhiteLink text="About Project" link="https://github.com/misha-dev/usercontacts" />
        </div>
      </div>
      <div className={cl.registrationSection}>
        <GradientHeader text="Register Here" />
        <form className={cl.registrationForm} onSubmit={formik.handleSubmit}>
          <div className={cl.registrationInputs}>
            <div className={cl.inputWrapper}>
              <LoginInput required={true} onBlur={formik.handleBlur} id="name" name="name" type="text" value={formik.values.name} onChange={formik.handleChange} text="Name" />
              {formik.touched.name && formik.errors.name ? <div className={cl.registerFormError}>{formik.errors.name}</div> : null}
            </div>

            <div className={cl.inputWrapper}>
              <LoginInput required={true} onBlur={formik.handleBlur} id="username" name="username" type="text" onChange={formik.handleChange} value={formik.values.username} text="Username" />
              {formik.touched.username && formik.errors.username ? <div className={cl.registerFormError}>{formik.errors.username}</div> : null}
            </div>

            <div className={cl.inputWrapper}>
              <LoginInput required={true} onBlur={formik.handleBlur} id="email" name="email" type="email" onChange={formik.handleChange} value={formik.values.email} text="Email" />
              {formik.touched.email && formik.errors.email ? <div className={cl.registerFormError}>{formik.errors.email}</div> : null}
            </div>

            <div className={cl.inputWrapper}>
              <LoginInput required={true} onBlur={formik.handleBlur} id="password" name="password" type="password" onChange={formik.handleChange} value={formik.values.password} text="Password" />
              {formik.touched.password && formik.errors.password ? <div className={cl.registerFormError}>{formik.errors.password}</div> : null}
            </div>
          </div>
          <div className={cl.loginWrapper}>
            <div className={cl.formLogin}>
              <SimpleLink link="#" text="Log in here" />
            </div>
            <div className={cl.formRegister}>
              <GradientButton text="Register" type="submit" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
