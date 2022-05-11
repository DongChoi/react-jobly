import { Link } from "react-router-dom";
import React from "react";
import "./Card.css";
/** props: a single company obj
 * presentational component that displays a company card
 */
function CompanyCard({ company }) {
  return (
    <div className="card" style={{ width: "80em", height: "10em" }}>
      <Link to={`/companies/${company.handle}`}>
        <h2 className="company-title">{company.handle}</h2>
        <div className="card-body">
          <p className="company-description">{company.description}</p>
          <img src={company.logoUrl ? company.logoUrl : ""} alt="" />
        </div>
      </Link>
    </div>
  );
}

export default CompanyCard;
