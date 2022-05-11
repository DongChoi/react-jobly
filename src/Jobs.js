import React, { useState, useEffect, useContext } from "react";
import JoblyApi from "./api";
import JobCard from "./JobCard";
import Form from "./Form";
import UserContext from "./userContext";

//make api call -> update curruser.applications -> listen for changes to curruser
// everytime curruser changes rerender that component

/** state: an array of job objects
 *  fetches jobs from the api upon render
 */
function Jobs({ applyJobs }) {
  const { currUser } = useContext(UserContext);
  const [jobs, setJobs] = useState({
    jobData: null,
    isLoading: true,
  });

  //const [userJobs, setUserJobs] = useState([])
  const [searchQuery, setSearchQuery] = useState(undefined);

  useEffect(() => {
    async function getJobs() {
      console.log("searchQuery =", searchQuery);
      const resp = await JoblyApi.getJobs(searchQuery);
      setJobs({
        jobData: resp,
        isLoading: false,
      });
      //setUserJobs(currUser.applications)
    }
    getJobs();
  }, [searchQuery]);

  if (jobs.isLoading) {
    return (
      <div
        className="spinner-border"
        style={{ width: "3em", height: "3em" }}
      ></div>
    );
  }

  function search(searchJobs) {
    setSearchQuery(searchJobs);
  }

  async function handleApply(evt) {
    await applyJobs(evt.target.value);
  }

  return (
    <div>
      <Form search={search} />
      {jobs.jobData.length === 0 ? (
        <h4>No Jobs Found</h4>
      ) : (
        jobs.jobData.map((job) => {
          return <JobCard handleApply={handleApply} key={job.id} job={job} />;
        })
      )}
    </div>
  );
}

export default Jobs;
