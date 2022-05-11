import React, { useContext, useState } from "react";
import UserContext from "./userContext";
import "./Card.css";
/** prop: one single job object
 * presentational component that displays a single job card
 */
function JobCard({ job, handleApply, isDisabled }) {
  const { hasAppliedtoJob } = useContext(UserContext);
  const [apply, setApply] = useState(hasAppliedtoJob(job.id));
  async function handleSubmit(evt) {
    evt.preventDefault();
    console.log(evt.target);
    await handleApply(evt);
    setApply(true);
  }

  return (
    <div className="card">
      <h2>{job.title}</h2>
      <h4>{job.companyName || ""}</h4>
      <p>salary: {job.salary || ""}</p>
      <p>equity: {job.equity || ""}</p>
      <button
        value={job.id}
        id={job.id}
        disabled={apply}
        onClick={handleSubmit}
        className="apply btn btn-danger"
      >
        {apply ? "Applied" : "Apply"}
      </button>
    </div>
  );
}

export default JobCard;
