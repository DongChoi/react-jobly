import React, { useState, useEffect, useContext } from "react";
import JoblyApi from "./api";
import CompanyCard from "./CompanyCard";
import { v4 as uuid } from "uuid";
import Form from "./Form";
import UserContext from "./userContext";
import { Navigate } from "react-router-dom";

/** state: an array of companies
 * calls use effect to fetch array of companies upon render
 */
function Companies() {
  const { currUser } = useContext(UserContext);
  const [companies, setCompanies] = useState({
    companyData: null,
    isLoading: true,
  });
  const [searchQuery, setSearchQuery] = useState(undefined);
  useEffect(() => {
    async function getCompanies() {
      const resp = await JoblyApi.getCompanies(searchQuery);
      setCompanies({
        companyData: resp,
        isLoading: false,
      });
    }
    getCompanies();
  }, [searchQuery]);

  if (companies.isLoading) {
    return (
      <div
        className="spinner-border"
        style={{ width: "3em", height: "3em" }}
      ></div>
    );
  }

  function search(searchCompanies) {
    setSearchQuery(searchCompanies);
  }
  return (
    <div id="companies-box">
      <Form search={search} />
      {companies.companyData.length === 0 ? (
        <h4>No Companies Found</h4>
      ) : (
        companies.companyData.map((company) => {
          return <CompanyCard key={company.handle} company={company} />;
        })
      )}
    </div>
  );
}

export default Companies;
