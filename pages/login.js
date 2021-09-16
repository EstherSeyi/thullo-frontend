import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/router";

import Input from "../components/input";
import Button from "../components/auth-button";
// import GooglePrompt from "../components/google-prompt";
// import Or from "../components/or";

import { useAppMutation } from "../hooks/query-hook";
import { useToken, useUser } from "../hooks/auth-hook";

const schema = yup.object({
  identifier: yup.string().required("Username or email is required"),
  password: yup.string().min(6, "Must be at least 6 characters").required(),
});

const Login = () => {
  const router = useRouter();
  const { setToken } = useToken();
  const { setUser } = useUser();
  const { mutate, isLoading } = useAppMutation(
    {
      url: "/auth/local",
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
      identifier: "",
      password: "",
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
        label="Username or email"
        value={formik.values.identifier}
        name="identifier"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        errorMessage={formik.errors.identifier}
        errored={formik.touched.identifier && formik.errors.identifier}
      />
      <Input
        label="Password"
        value={formik.values.password}
        name="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        type="password"
        errorMessage={formik.errors.password}
        errored={formik.touched.password && formik.errors.password}
      />

      <a
        className="w-max block ml-auto text-0.625rem font-noto font-thin text-blueish-250"
        href="/forgot-password"
      >
        Forgot Password ?
      </a>
      <Button type="submit" loading={isLoading}>
        Login
      </Button>

      {/* <Or /> */}

      {/* <GooglePrompt text="Sign in with google." /> */}

      <p className="text-0.625rem font-noto font-thin text-center mt-6 text-greyish-100">
        <span>First time here ?</span>
        <a className="text-blueish-250 ml-0.5 hover:underline" href="/test">
          Login as test user
        </a>{" "}
        <span>or</span>
        <a className="text-blueish-250 ml-0.5 hover:underline" href="/register">
          Register
        </a>
        .
      </p>
    </form>
  );
};

export default Login;
