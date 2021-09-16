import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/router";

import Button from "../components/auth-button";
import Input from "../components/input";
// import GooglePrompt from "../components/google-prompt";
// import Or from "../components/or";

import { useAppMutation } from "../hooks/query-hook";
import { useToken, useUser } from "../hooks/auth-hook";

const schema = yup.object({
  username: yup
    .string()
    .min(2, "Must be at least 2 characters.")
    .required("Username is required"),
  email: yup
    .string()
    .email("Email must be a vaild email.")
    .required("Email is required."),
  password: yup.string().min(6, "Must be at least 6 characters").required(),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Must match password"),
});

const Register = () => {
  const router = useRouter();
  const { setToken } = useToken();
  const { setUser } = useUser();
  const { mutate, isLoading } = useAppMutation(
    {
      url: "/auth/local/register",
    },
    {
      onSuccess: (data) => {
        setToken(data.jwt);
        setUser(data?.user);

        router.push("/");
      },
      onError: (error) => {
        console.log(error?.message);
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: schema,
    validateOnBlur: true,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <form
      className="w-11/12 mx-auto max-w-[400px]"
      onSubmit={formik.handleSubmit}
    >
      <Input
        label="Username"
        value={formik.values.username}
        name="username"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        errorMessage={formik.errors.username}
        errored={formik.touched.username && formik.errors.username}
      />
      <Input
        label="Email"
        value={formik.values.email}
        name="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        errorMessage={formik.errors.email}
        errored={formik.touched.email && formik.errors.email}
      />
      <Input
        label="Password"
        type="password"
        value={formik.values.password}
        name="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        errorMessage={formik.errors.password}
        errored={formik.touched.password && formik.errors.password}
      />
      <Input
        label="Confirm Password"
        type="password"
        value={formik.values.confirm_password}
        name="confirm_password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        errorMessage={formik.errors.confirm_password}
        errored={
          formik.touched.confirm_password && formik.errors.confirm_password
        }
      />

      <Button loading={isLoading} type="submit">
        {" "}
        Register
      </Button>

      {/* <Or /> */}
      {/* <GooglePrompt text="Sign up with google." /> */}

      <p className="text-0.625rem font-noto font-thin text-center mt-6 text-greyish-100">
        <span>Have an account ?</span>
        <a className="text-blueish-250 ml-0.5 hover:underline" href="/login">
          Login
        </a>{" "}
        .
      </p>
    </form>
  );
};

export default Register;
