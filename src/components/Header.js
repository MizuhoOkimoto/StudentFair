import { Link } from "react-router-dom";

import styled from "styled-components";

import "./css/Header.css";

const Header = () => {
  return (
    <header>
      <nav className="navbar">
        <Link className="navbar-brand" to="/">
          <h1>Student Fair</h1>
        </Link>
        <div className="navbar-sub">
          <Link className="nav-link" to="/">
            <p>Home</p>
          </Link>
          <Link className="nav-link" to="/allList">
            <p>AllList</p>
          </Link>
          <Link className="nav-link" to="/buyList">
            <p>BuyList</p>
          </Link>
          <Link className="nav-link" to="/sellList">
            <p>SellList</p>
          </Link>
        </div>
      </nav>
      <div className="search-form-container">
        <form action="/" id="search" className="search-form" method="post">
          <div className="input-container">
            <label htmlFor="searchValue"></label>
            <input
              type="text"
              id="searchValue"
              name="searchValue"
              placeholder="What item you looking for?"
            />
          </div>
          <div className="input-container">
            <label htmlFor="location">Location</label>
            <select aria-label="pick_location" id="location">
              <option value="Toronto">Toronto</option>
              <option value="Niagara">Niagara</option>
              <option value="Kingston">Kingston</option>
              <option value="Vancouver">Vancouver</option>
              <option value="Montreal">Montreal</option>
            </select>
          </div>
          <div className="input-container">
            <div className="typeOfService">
              <label htmlFor="buyOrSell"></label>
              <select aria-label="type_guest" id="buyOrSell">
                <option>All List</option>
                <option>Buy List</option>
                <option>Sell List</option>
              </select>
            </div>
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
