import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../component/login.css";
import { useLazyQuery } from "@apollo/client";
import { LOGIN_USER } from "../utils/queries";
import Auth from "../utils/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [login] = useLazyQuery(LOGIN_USER, {
    onCompleted: (data) => {
      console.log("Login Successful!", data.login);
      Auth.login(data.login.token);
    },
    onError: (error) => {
      console.error(error);
      setError("Invalid email or password");
    },
    fetchPolicy: "network-only",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login({
        variables: {
          username: email,
          password,
        },
      });
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className='container'>
      <div className='screen'>
        <div className='screen__content'>
          <form className='login' onSubmit={handleSubmit}>
            <div className='login__field'>
              <input
                type='email'
                placeholder='Email'
                className='login__input'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='login__field'>
              <input
                type='password'
                placeholder='Password'
                className='login__input'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <div>{error}</div>}
            <button type='submit' className='login__submit'>
              Login
            </button>
          </form>
          <div className='signup-link'>
            <Link to='/signup' className='signup'>
              Sign Up Instead
            </Link>
          </div>
        </div>
        <div className='screen__background'>
          <div className='screen__background__shape1'></div>
          <div className='screen__background__shape2'></div>
          <div className='screen__background__shape3'></div>
          <div className='screen__background__shape4'></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
