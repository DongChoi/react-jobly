import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./NavBar";
import Routelist from "./Routelist";
import "./App.css";
import JoblyApi from "./api";
import jwt_decode from "jwt-decode";
import UserContext from "./userContext";

function App() {
  const [currUser, setcurrUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);
  useEffect(
    function fetchUserWhenMounted() {
      async function addToLocal() {
        if (token) {
          localStorage.setItem("token", token);
          let user = await getCurrUserFromToken(token);
          console.log("curr usser state:", user);
          setcurrUser(user);
        } else {
          localStorage.removeItem("token");
        }
        setIsLoading(false);
      }
      addToLocal();
    },
    [token]
  );
  //handle the loading logic

  //calls api to register user to backend
  async function register(formData) {
    const resp = await JoblyApi.register(formData);
    setToken(resp);
  }

  //calls api to login user to backend
  async function login(formData) {
    const resp = await JoblyApi.login(formData);
    setToken(resp);
  }

  //calls api to update user to backend
  async function updateUser(formData, username) {
    const resp = await JoblyApi.updateUser(formData, username);
    setcurrUser(resp);
    console.log("CURRENT USER AFTER UPDATE", currUser);
  }

  //calls api to get current user from token from backend
  async function getCurrUserFromToken(token) {
    let user = jwt_decode(token);
    JoblyApi.token = token;
    console.log("user", user);
    const currUser = await JoblyApi.getCurrUser(user.username);
    if (!currUser.applications) {
      currUser.applications = [];
    }
    return currUser;
  }

  async function applyJobs(jobId) {
    const resp = await JoblyApi.applyToJob(currUser.username, jobId);
    //currUser = {user:{firstname, applications:[]}}
    setcurrUser((user) => ({
      ...user,
      applications: [...user.applications, Number(jobId)],
    }));
    console.log("type of ", currUser.applications);
    // return resp;
  }

  function hasAppliedtoJob(jobId) {
    if (currUser.applications.includes(jobId)) {
      return true;
    }
    return false;
  }

  if (isLoading) {
    return (
      <div
        className="spinner-border"
        style={{ width: "3em", height: "3em" }}
      ></div>
    );
  }

  //logs out user
  function logOutUser() {
    setToken(null);
    setcurrUser(null);
  }

  return (
    <div className="bgimage">
      <UserContext.Provider value={{ currUser, hasAppliedtoJob }}>
        <BrowserRouter>
          <NavBar logOutUser={logOutUser} />
          <div>
            <Routelist
              applyJobs={applyJobs}
              login={login}
              register={register}
              updateUser={updateUser}
            />
          </div>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
