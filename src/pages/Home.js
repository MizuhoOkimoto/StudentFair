import styled from "styled-components";

import { Link } from "react-router-dom";

// import Button from "../components/Button";
import Button from "../components/Button";

const MainImgContainer = styled.div`
  width: 100%;
  height: 400px;
  margin: 0;
  padding: 0;
  background-size: cover;
  background-position: center;
  background-image: url("https://images.unsplash.com/photo-1571867424488-4565932edb41?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80");
`;

const MainParagraph = styled.div`
  text-align: center;

  padding: 3vw;
`;

const Home = () => {
  return (
    <div>
      <MainImgContainer />
      <MainParagraph>
        <h3>Welcome to Student Fair!</h3>
        <p className="lead">
          The Student Fair section has a wealth of information on all the
          Student Buy&Sell items creatures from the entire game series.
        </p>
        <Link to="/allList">
          <Button color="primary" margin="margin: 10px">
            Click to see the All Items!
          </Button>
        </Link>
      </MainParagraph>
    </div>
  );
};

export default Home;
