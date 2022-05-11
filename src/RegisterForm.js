import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterForm.css";

/**
 */
function RegisterForm({ register }) {
  const navigate = useNavigate();
  let initialFormData = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  };
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
      await register(formData);
      setFormData(initialFormData);
      navigate("/");
    } catch (error) {
      setErrorMsg(error);
    }
  }

  function renderForm() {
    return Object.keys(initialFormData).map((field) => {
      return (
        <div className="mb-3 card-body" key={field}>
          <input
            id={`Register-${field}`}
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
    <div className="registerContainer">
      <h2>Sign Up</h2>
      <form
        className="RegisterForm card align-self-center"
        onSubmit={handleSubmit}
      >
        {renderForm()}

        <button className="btn-primary rig btn btn-lrg registerForm-Btn">
          Signup
        </button>
      </form>
      {errorMsg.map((err) => (
        <p>{err}</p>
      ))}
    </div>
  );
}

export default RegisterForm;
