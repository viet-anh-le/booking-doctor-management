import { IoIosArrowDown } from "react-icons/io";
import { Outlet } from "react-router-dom";

function List() {
  return (
    <>
      <div className="toggle-component">
        <div className="search-heading">
          <h1>
            Primary Care
            <label className="heading-subtxt"> near </label>
            Los Angeles, CA
          </h1>
          <label className="count-txt">20 Results</label>
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

        <Outlet/>
      </div>
    </>
  )
}
export default List;