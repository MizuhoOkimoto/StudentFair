import { Link } from 'react-router-dom';
import { App } from '../App';

//import { AiOutlineLogin } from "react-icons/ai";

import logo from '../img/studentFair_Logo.png';

import styled from 'styled-components';

import './css/Header.css';
import axios from 'axios';

function Header(prop){
    console.log(prop.flag);
    return (
    <header>
      <div className="navbar-container">
        <nav className="navbar">
          <Link className="navbar-brand" to="/">
            <img className="navbar-logo" src={logo} alt="Logo Img" />
          </Link>
          <div className="navbar-sub">
            <label htmlFor="drop" className="toggle">
              Menu +
            </label>
            <input type="checkbox" id="drop" />
            <ul className="menu">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <label htmlFor="drop-1" className="toggle">
                  Listings
                </label>
                <a href="#">Listings</a>
                <input type="checkbox" id="drop-1" />
                <ul>
                  <li>
                    <a href="/allList">All Lists</a>
                  </li>
                  <li>
                    <a href="/buyList">Buy List</a>
                  </li>
                  <li>
                    <a href="/sellList">Sell List</a>
                  </li>
                </ul>
              </li>
              <li>
                {prop.flag !== null ? <a href="/myProfile">My Page</a> : <a href="/logIn">Log In</a>}
              </li>
              <li>
                {prop.flag !== null ? <a href="/logOut">Log Out</a> : <a href="/signUp">Sign Up</a> }
              </li>
              
            </ul>
          </div>
        </nav>
      </div>
      {/* <nav className="navbar">
        <Link className="navbar-brand" to="/">
          <img className="navbar-logo" src={logo} alt="Logo Img" />
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
          <Link className="nav-link" to="/logIn">
            <p>Log In</p>
          </Link>
          <Link className="nav-link" to="/signUp">
            <p>Sign Up</p>
          </Link>
        </div>
      </nav> */}
      {/* ------------- */}

      {/* --------------- */}
      <div className="search-form-container">
        <form action="/" id="search" className="search-form" method="get">
          <div className="input-search">
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
            Search
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
