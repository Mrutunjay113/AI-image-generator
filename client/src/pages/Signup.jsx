import React, { useState } from "react";
import { FormField } from "../components";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
import { signup, login } from "../utils";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [auth, setAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const handleShow = () => {
    setIsLogin(!isLogin);
    console.log(isLogin);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLogin) {
      console.log(isLogin);
      //const response = await login(form);
      console.log(response.data.statusText);
      if (response) {
        localStorage.setItem("authenticated", response.data.data.email);
        navigate("/");
      } else {
        console.log(response);
      }
      // setForm({ name: "", email: "", password: "" });
    } else {
      const response = await signup(form);
      if (response) {
        console.log(response.data.statusText);
        localStorage.setItem("authenticated", response.data.data.email);
        console.log(response);
        navigate("/");
      } else {
        console.log(response);
      }
    }
  };
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  return (
    <form className="mt-16 max-w-3xl mx-auto" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        {isLogin && (
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="John doe"
            value={form.name}
            handleChange={handleChange}
          />
        )}
        <FormField
          labelName="Email"
          type="email"
          name="email"
          placeholder="email"
          value={form.email}
          handleChange={handleChange}
        />
        <FormField
          labelName="password"
          type="password"
          name="password"
          placeholder="password"
          value={form.password}
          handleChange={handleChange}
        />
        <button
          type="submit"
          className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          {isLogin ? "Sign up" : "Login"}
        </button>
        <p
          onClick={handleShow}
          className="mt-3 text-black font-medium text-end"
        >
          {isLogin ? "Login?" : "Signup"}
        </p>
      </div>
    </form>
  );
};

export default Signup;
