import React, { useContext, useState, useEffect } from "react";
import UserContext from "./userContext";
import "./ProfileForm.css";
/**
 *  Prop: updateUser function
 *  State: form data, and error messages
 *  Render profile form
 */
function ProfileForm({ updateUser }) {
  const { currUser } = useContext(UserContext);
  console.log("what is curruser", currUser);
  const [errorMsg, setErrorMsg] = useState([]);
  const initialFormData = {
    userData: {
      username: currUser.username,
      firstName: currUser.firstName,
      lastName: currUser.lastName,
      email: currUser.email,
    },
    isUpdated: false,
  };
  const [formData, setFormData] = useState(initialFormData);

  /** Update form input. */
  //ASK FOR A CLEANER WAY
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      userData: { ...fData.userData, [name]: value },
      isUpdated: false,
    }));
  }

  /** Call parent function to update.*/
  async function handleSubmit(evt) {
    evt.preventDefault();
    console.log("CURRUSER BEFORE UPDATE", currUser);
    let userData = { ...formData.userData };
    delete userData.username;

    try {
      await updateUser(userData, currUser.username);
      setFormData((fData) => ({
        userData: { ...fData.userData },
        isUpdated: true,
      }));
    } catch (error) {
      setErrorMsg(error);
    }
  }

  //separate file
  function renderForm() {
    return Object.keys(initialFormData.userData).map((field) => {
      return (
        <div className="mb-3" key={field}>
          <input
            disabled={field === "username"}
            id={`Profile-${field}`}
            name={field}
            className="form-control"
            placeholder={field}
            onChange={handleChange}
            value={formData.userData[field]}
            aria-label={field}
          />
        </div>
      );
    });
  }

  return (
    <div>
      <form className="ProfileForm-card" onSubmit={handleSubmit}>
        {renderForm()}

        <button className="btn-primary rig btn btn-sm ProfileForm-Btn">
          Save changes
        </button>
      </form>
      {errorMsg.map((err) => (
        <p>{err}</p>
      ))}
    </div>
  );
}

export default ProfileForm;
