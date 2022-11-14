import React, { useState } from "react";
// import JsonData from '../Mock-API.json'
import API from "./Data.json";
import ReactPaginate from "react-paginate"; //  Using react-paginate from the react library
import styled from "styled-components";
import GNavbar from "../../../components/Navbar/S-Navigator";
import Mobile from "../../../components/Navbar/Navbar";
import TopNav from "../../../components/Navbar/SuperAdminNav";

function SuperAdminComplaint() {
  const [events, setEvents] = useState(API.slice(0, 20));
  const [value, setvalue] = useState("");

  const [pageNumber, setPageNumber] = useState(0); // state representing the page we are on
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false); // state for Modal
  const [edit, setEdit] = useState(false); // state for Modal
  const [selected, setSelected] = useState("Filter");
  const [activeIndex, setActiveIndex] = useState(1);
  const handleClick = (index) => setActiveIndex(index);
  const checkActive = (index, className) =>
    activeIndex === index ? className : "";

  /** ======to do
   * 1. Handle all form event with handleChange function
   * 2. No need for Filter as all blog display at one.Navigate using the pagination
   */

  const handleOnchange = (val) => setvalue(val);
  // const [ API, setData ] = useState(API)
  const eventsPerPage = 9;
  const pagesVisited = pageNumber * eventsPerPage;

  const filterEvents = (catItem) => {
    const result = API.filter((curDate) => {
      return curDate.category === catItem;
    });
    setEvents(result);
  };

  const displayEvents = events
    .filter((event) => {
      if (searchTerm === "") {
        return event;
      } else if (
        event.first_name.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return event;
      }
    })
    .slice(pagesVisited, pagesVisited + eventsPerPage)
    .map((event) => {
      const { id, first_name, last_name, user, category } = event;

      return (
        <Complaint className="perComponent" key={id}>
          <div className="top_level">
            <div>
              <h2>Golden Gate Estate</h2>
              <p className="estateid">EIQ402</p>
            </div>
            <Action selected={selected} setSelected={setSelected} />
          </div>

          <div className="name_position">
            <img
              src="https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=721&q=80"
              alt="user"
            />
            <h3>
              {first_name} {last_name} <span>{user}</span>
            </h3>
          </div>
          <div className="handleFlow">
            <p>
              This dummy text is supposed to include complainets from respective
              admins, either escalated or direct, and the super admin has the
              prerogagative to mark them as resolved as soon as he attends to
              them. This dummy text is supposed to include complainets from
              respective admins, either escalated or direct, and the super admin
              has the prerogagative to mark them as resolved as soon as he
              attends to them
            </p>
          </div>

          <span>Jan 20, 2023</span>
        </Complaint>
      );
    }); // display items from 1 -6

  const pageCount = Math.ceil(events.length / eventsPerPage); // Rounding up

  const changePage = ({ selected }) => {
    // selected the number for the page we want to move too
    setPageNumber(selected);
  };

  return (
    <>
      <section className="change_ratio">
        <GNavbar complain="active_tab" />
        <Mobile />
        <div className="selected_tab">
          <TopNav />
          <div className="dashboard_container">
            <div className="event-container">
              <HandleSearchAndTab>
                <div className="tabs">
                  <span
                    className={`tab ${checkActive(1, "active")}`}
                    onClick={() => handleClick(1)}
                  >
                    <button onClick={(e) => setEvents(API)}>All</button>
                  </span>

                  <span
                    className={`tab ${checkActive(2, "active")}`}
                    onClick={() => handleClick(2)}
                  >
                    <button
                      className="btn"
                      onClick={() => filterEvents("Pending")}
                    >
                      Pending
                    </button>
                  </span>
                  <span
                    className={`tab ${checkActive(3, "active")}`}
                    onClick={() => handleClick(3)}
                  >
                    <button
                      className="btn"
                      onClick={() => filterEvents("Resolved")}
                    >
                      Resolved
                    </button>
                  </span>
                </div>
                <div className="event-input">
                  <div class="search_set">
                    <img
                      src="https://www.svgrepo.com/show/13682/search.svg"
                      alt=""
                    />
                    <input
                      className="eventt"
                      type="text"
                      name="name"
                      placeholder="Search"
                      onChange={(event) => {
                        setSearchTerm(event.target.value);
                      }}
                    />
                  </div>

                  {/* <FilterBy selected={selected} setSelected={setSelected} />

                <button
                  className="important-btn"
                  onClick={() => setOpenModal(true)}
                >
                  Create
                </button> */}
                </div>
              </HandleSearchAndTab>
            </div>

            <div className="panels">
              <div className={`panel ${checkActive(1, "active")}`}>
                <Wrapper>{displayEvents}</Wrapper>
              </div>
              <div className={`panel ${checkActive(2, "active")}`}>
                <Wrapper>{displayEvents}</Wrapper>
              </div>
              <div className={`panel ${checkActive(3, "active")}`}>
                <Wrapper>{displayEvents}</Wrapper>
              </div>
            </div>
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationButtons"}
              previousLinkClassName={"previousButton"}
              nextLinkClassName={"nextButton"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default SuperAdminComplaint;

const Action = ({ selected, setSelected }) => {
  const [isActive, setIsActive] = useState(false);
  const options = ["Resolved", "Pending"];
  return (
    <div className="select_me">
      <div className="select-btn" onClick={(e) => setIsActive(!isActive)}>
        <input type="text" value={selected} readOnly />

        <img
          src="https://www.svgrepo.com/show/356209/chevron-down.svg"
          alt="v"
        />
      </div>
      {isActive && (
        <div className="select_content">
          {options.map((option, index) => (
            <div
              className="select_items"
              onClick={(e) => {
                setSelected(option);
                setIsActive(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
const HandleSearchAndTab = styled.section`
  .container {
    margin-bottom: 20px;
  }
  .normal_tab {
    background: transparent;
  }
  .event-input {
    max-width: 675px;
  }
  @media (min-width: 760px) {
    display: flex;
    justify-content: space-between;
    .event-input {
      display: flex;
      justify-content: space-between;
      //   width: 57%;
      .select_me {
        margin-left: 10px;
        width: auto !important;
      }
      button {
        margin-top: 0;
        height: 45px;
      }
      .event-select {
        width: 20%;
      }
    }
  }
  @media (max-width: 540px) {
    .event-input {
      .event-select {
        display: none;
      }
    }
  }
  .tabs {
    margin: 0;
    margin-bottom: 30px;
    .tab {
      margin: 0;
      height: 45px;
      align-items: center;
      display: flex;
      justify-content: center;
      padding: 0;
      min-width: 100px;
      padding: 5px 20px;
      text-align: center;
      margin-right: 15px;
      border-bottom: 3px solid #c0c0c0;
      button {
        margin: 0;
        padding: 0 !important;
        padding: 10px;
        //styleName: Web/Small Copy;

        font-size: 16px;
        font-weight: 400;
        line-height: 17px;
        letter-spacing: 0em;
        text-align: left;
      }
    }
    .active {
      background: transparent;
      border-bottom: 3px solid #2d4bf3;
      button {
        color: #2d4bf3;
      }
    }
  }
  .normal_tab.add_tape {
    border-bottom: 2px solid yellow;
  }
`;
let Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;


  

  @media (max-width: 400px) {
    .eachAdminBlog {
      width: 100%;
    }
  }
  @media (min-width: 720px) {
    .perComponent {
      width: 48.5%;
    }
  }
  @media (min-width: 1200px) {
    .perComponent {
      width: 32.5%;
    }
  }
 
  }
`;

const Complaint = styled.div`
  background: #f6f6f6;
  border: 1px solid #e1e1e1;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
  .handleFlow {
    height: 150px;
    overflow: auto;
    margin: 20px 0;
  }
  .top_level {
    display: flex;
    justify-content: space-between;
    h2 {
      font-weight: 700;

      font-size: 18px;
      line-height: 21px;
      margin-bottom: 10px;
      margin-right: 10px;
    }
    .select_me {
      max-width: 150px;
      width: 100%;
    }
  }
  p {
    font-weight: 400;
    font-size: 16px;
    display: flex;
    align-items: center;
    color: #999999;
  }
  .name_position {
    margin-top: 15px;
    display: flex;

    img {
      width: 35px;
      height: 35px;
      margin-right: 10px;
      object-fit: cover;
      border-radius: 50%;
    }
    h3 {
      font-weight: 500;
      font-size: 16px;
      line-height: 16px;
      margin-top: 7px;
      span {
        font-weight: 700;
        color: #2d4bf3;
        font-size: 14px;
        margin-left: 10px;
        line-height: 13px;
        letter-spacing: -0.06em;
      }
    }
  }
`;
