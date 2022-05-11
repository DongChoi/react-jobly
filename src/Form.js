import React, { useState } from "react";
import "./Form.css";
/** prop: search function
 *  state: form data
 */
function Form({ search }) {
  //dont call it form // searchForm
  const [formData, setFormData] = useState("");

  function handleChange(evt) {
    setFormData(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    search(formData);
    setFormData("");
  }

  return (
    <div id="form-box">
      <form onSubmit={handleSubmit}>
        <input
          id="searchQuery"
          name="searchQuery"
          className="form-control"
          placeholder="Enter search term..."
          onChange={handleChange}
          value={formData}
          aria-label="Title"
        />
        <button
          id="search-button"
          className="btn-primary rig btn btn-sm searchForm-searchBtn"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default Form;
