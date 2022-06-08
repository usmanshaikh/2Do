import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { TextField } from "@mui/material";
import * as yup from "yup";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CustomButton from "../../../components/CustomButton/CustomButton";
import * as Msg from "../../../utils/constants/message.constants";
import * as Path from "../../../utils/constants/routePath.constants";
import styles from "./SignUp.module.scss";

const validationSchema = yup.object({
  name: yup
    .string()
    .required(Msg.NAME_REQUIRED)
    .matches(/^[aA-zZ\s]+$/, Msg.NAME_ONLY_ALPHABETS),
  email: yup.string().email(Msg.EMAIL_INVALID).required(Msg.EMAIL_REQUIRED),
  password: yup.string().min(Msg.PASSWORD_LENGTH, Msg.PASSWORD_MIN).required(Msg.PASSWORD_REQUIRED),
  confirmPassword: yup.string().when("password", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: yup.string().oneOf([yup.ref("password")], Msg.PASSWORD_NOT_MATCH),
  }),
});

const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log({ values });
    },
  });

  return (
    <div className={styles.signUpPageWrapper}>
      <Link to={`/${Path.AUTH}/${Path.LOGIN}`}>
        <KeyboardBackspaceIcon />
      </Link>
      <h1>Create Account</h1>
      <span>Hello! Sign up to get started</span>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          variant="standard"
          id="name"
          name="name"
          label="Name"
          autoComplete="off"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          variant="standard"
          id="email"
          name="email"
          label="Email"
          autoComplete="off"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          variant="standard"
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <TextField
          fullWidth
          variant="standard"
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
        />
        <CustomButton name="Sign up" type="submit" />
      </form>
      <span>
        Already have a account?
        <b>
          <Link to={`/${Path.AUTH}/${Path.LOGIN}`}>Login</Link>
        </b>
      </span>
    </div>
  );
};

export default SignUp;
