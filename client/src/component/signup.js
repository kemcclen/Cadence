import React, { useState } from "react";
import "../component/signup.css";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [addUser] = useMutation(ADD_USER);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const { data, loading, error } = await addUser({
        variables: {
          username,
          password,
        },
      });
      if (loading) {
        return <div>Loading...</div>;
      }
      if (error) {
        setError(error.message);
      }
      if (data) {
        console.log("Signup Successful!", data);
        localStorage.setItem("token", data.addUser.token);
        navigate("/login");
      } else {
        setError("Something went wrong!");
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <form className='signup' onSubmit={handleSignup}>
      <div className='signup__field'>
        <i className='signup__icon fas fa-user'></i>
        <input
          type='text'
          className='signup__input'
          placeholder='User name / Email'
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className='signup__field'>
        <i className='signup__icon fas fa-lock'></i>
        <input
          type='password'
          className='signup__input'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className='signup__field'>
        <i className='signup__icon fas fa-lock'></i>
        <input
          type='password'
          className='signup__input'
          placeholder='Confirm Password'
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      {error && <div className='error'>{error}</div>}
      <button className='button signup__submit'>
        <span className='button__text'>Sign Up Now</span>
        <i className='button__icon fas fa-chevron-right'></i>
      </button>
    </form>
  );
};

export default Signup;
