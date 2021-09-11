import Input from "../components/input";
import Button from "../components/auth-button";
import GooglePrompt from "../components/google-prompt";
import Or from "../components/or";

const Login = () => {
  return (
    <form className="w-11/12 mx-auto max-w-[400px]">
      <Input label="Username or email" />
      <Input label="Password" />

      <a
        className="w-max block ml-auto text-0.625rem font-noto font-thin text-blueish-250"
        href="#"
      >
        Forgot Password ?
      </a>
      <Button>Login</Button>

      <Or />

      <GooglePrompt text="Sign in with google." />

      <p className="text-0.625rem font-noto font-thin text-center mt-6 text-greyish-100">
        <span>First time here ?</span>
        <a className="text-blueish-250 ml-0.5 hover:underline">
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
