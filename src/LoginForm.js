import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

/** Prop: login function
 *  State: form data, and error messages
 *  Render Login form
 */
function LoginForm({ login }) {
  const navigate = useNavigate();
  let initialFormData = { username: "", password: "" };
  const [formData, setFormData] = useState(initialFormData);
  const [errorMsg, setErrorMsg] = useState([]);
  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  /** Call parent function and clear form. */
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await login(formData);
      setFormData(initialFormData);
      navigate("/");
    } catch (error) {
      setErrorMsg(error);
    }
  }
  //do the same for register write the bad path

  function renderForm() {
    return Object.keys(initialFormData).map((field) => {
      return (
        <div className="mb-3 card-body" key={field}>
          <input
            id={`login-${field}`}
            name={field}
            type={field === "password" ? "password" : "text"}
            className="form-control"
            placeholder={field}
            onChange={handleChange}
            value={formData[field]}
            aria-label={field}
          />
        </div>
      );
    });
  }
  return (
    <div className="loginContainer">
      <h2>Login</h2>
      <form
        className="loginForm card align-self-center"
        onSubmit={handleSubmit}
      >
        {renderForm()}

        <button className="btn-primary rig btn btn-lrg loginForm-Btn">
          Log in
        </button>
      </form>
      {errorMsg.map((err) => (
        <p>{err}</p>
      ))}
    </div>
  );
}

export default LoginForm;
