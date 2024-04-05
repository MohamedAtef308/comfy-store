import { TextInput, SubmitBtn } from "../components";
import { Link, Form } from "react-router-dom";

const Register = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-6-4"
      >
        <h4 className="text-center text-3xl font-bold">Register</h4>
        <TextInput type="text" label="username" name="username" />
        <TextInput type="email" label="email" name="email" />
        <TextInput type="password" label="password" name="password" />

        <div className="mt-4">
          <SubmitBtn text="Register" />
        </div>
        <p className="text-center">
          Already a member?
          <Link
            to="/login"
            className="ml-2 link link-hover link-primary capitalize"
          >
            Login
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Register;
