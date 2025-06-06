import { IoIosArrowDown } from "react-icons/io";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function capitalizeWords(str) {
  if (!str) return "";
  return str
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}


function List() {
  const [selectedSpec, setSelectedSpec] = useState(null);
  const [listLen, setListLen] = useState(0);
  return (
    <>
      <div className="toggle-component">
        <div className="search-heading">
          {
            selectedSpec &&
            <h1>
              {capitalizeWords(selectedSpec)}
            </h1>
          }
          <label className="count-txt">{listLen} Results</label>
        </div>
        <div className="filters-container">
          <button className="filter-btn is-icon">
            <span>Sort By</span>
            <IoIosArrowDown />
          </button>
          <button className="filter-btn is-icon">
            <span>Rating</span>
            <IoIosArrowDown />
          </button>
          <button className="filter-btn is-icon">
            <span>Provider Gender</span>
            <IoIosArrowDown />
          </button>
        </div>

        <Outlet context={{ setSelectedSpec, setListLen }}/>
      </div>
    </>
  )
}
export default List;