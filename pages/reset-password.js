import Input from "../components/input";
import Button from "../components/auth-button";

const ResetPassword = () => {
  return (
    <form
      className="w-11/12 mx-auto max-w-[400px]"
      // onSubmit={formik.handleSubmit}
    >
      <Input label="New Password" />
      <Input label="Confirm New Password" />

      <Button type="submit">Reset</Button>

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

export default ResetPassword;
