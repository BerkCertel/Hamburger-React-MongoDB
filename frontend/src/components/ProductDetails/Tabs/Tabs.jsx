import { useState } from "react";
import PropTypes from "prop-types";


import "./Tabs.css";

const Tabs = ({ singleProduct, setSingleProduct }) => {
  const [activeTab, setActiveTab] = useState("desc");

  const handleTabClick = (e, tab) => {
    e.preventDefault();
    setActiveTab(tab);
  };

  return (
    <div className="single-tabs">
      {/* <ul className="tab-list">
        <li>
          {" "}
          <a
            href="#"
            className={`tab-button ${activeTab === "desc" ? "active" : ""}`}
            onClick={(e) => handleTabClick(e, "desc")}
          >
          </a>
          <div
            className="product-description"
            dangerouslySetInnerHTML={{ __html: singleProduct.description }}
          ></div>
        </li>
      </ul>
      <div className="tab-panel">
        <div
          className={`tab-panel-descriptions content ${
            activeTab === "desc" ? "active" : ""
          }`}
        ></div>
        <div
          className={`tab-panel-information content ${
            activeTab === "info" ? "active" : ""
          }`}
          id="info"
        ></div>
      </div> */}
    </div>
  );
};

Tabs.propTypes = {
  singleProduct: PropTypes.object,
  setSingleProduct: PropTypes.func,
};
export default Tabs;
