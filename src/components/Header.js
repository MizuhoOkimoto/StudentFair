import { Link } from "react-router-dom";

import styled from "styled-components";

const NavButton = styled.div`
  font-size: 20px;
`;

const Header = () => {
  return (
    <header>
      <nav className="navbar">
        <Link className="navbar-brand" to="/">
          <h1>Student Fair</h1>
        </Link>
        <div className="navbar-collapse">
          <div className="navbar-nav">
            <Link className="nav-link" to="/">
              <NavButton>Home</NavButton>
            </Link>
            <Link className="nav-link" to="/allList">
              <NavButton>AllList</NavButton>
            </Link>
            <Link className="nav-link" to="/buyList">
              <NavButton>BuyList</NavButton>
            </Link>
            <Link className="nav-link" to="/sellList">
              <NavButton>SellList</NavButton>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
