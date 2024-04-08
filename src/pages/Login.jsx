import React from "react";
import { Form, Link, redirect } from "react-router-dom";
import { TextInput, SubmitBtn } from "../components";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { loginUser } from "../features";

export const action = (store) => {
  return async ({ request }) => {
    const data = Object.fromEntries(await request.formData());

    try {
      const response = await customFetch.post("/auth/local", data);
      store.dispatch(loginUser(response.data));
      toast.success(`Welcome, ${response.data.user.username}`);
      return redirect("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error?.message || "Error Happened!");
      return null;
    }
  };
};

const Login = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <TextInput
          type="email"
          label="email"
          name="identifier"
          defaultValue="test@test.com"
        />
        <TextInput
          type="password"
          label="password"
          name="password"
          defaultValue="secret"
        />
        <div className="mt-4">
          <SubmitBtn text="Login" />
        </div>
        <button type="button" className="btn btn-secondary btn-block">
          Guest User
        </button>
        <p className="text-center">
          Not a member yet?
          <Link
            to="/register"
            className="ml-2 link link-hover link-primary capitalize"
          >
            register
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Login;
