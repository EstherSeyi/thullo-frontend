import Button from "../components/auth-button";
import Input from "../components/input";
import GooglePrompt from "../components/google-prompt";
import Or from "../components/or";

const Register = () => {
  return (
    <form className="w-11/12 mx-auto max-w-[400px]">
      <Input label="Username" />
      <Input label="Email" />
      <Input label="Password" type="password" />
      <Input label="Confirm Password" type="password" />

      <Button> Register</Button>

      <Or />
      <GooglePrompt text="Sign up with google." />

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
