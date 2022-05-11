import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  static token = null;
  // Remember, the backend needs to be authorized with a token
  // We're providing a token you can use to interact with the backend API
  // DON'T MODIFY THIS TOKEN

  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  // "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  // "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};
    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. {descrption:"sdf", jobs: [{},{},...]} */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get all the companies */
  static async getCompanies(name) {
    //companies
    const res = await this.request("companies", { name });
    return res.companies;
  }
  //companies/?name=blah
  /** Get all the jobs */
  static async getJobs(title) {
    let res = await this.request("jobs", { title });
    return res.jobs;
  }

  static async register(formData) {
    let res = await this.request("auth/register", formData, "post");
    return res.token;
  }

  static async getCurrUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async login(username) {
    let res = await this.request("auth/token", username, "post");
    return res.token;
  }

  static async updateUser(formData, username) {
    let res = await this.request(`users/${username}`, formData, "patch");
    return res.user;
  }

  //Returns {"applied": jobId}
  static async applyToJob(username, jobId) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
    return res;
  }
}

export default JoblyApi;
