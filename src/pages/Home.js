import styled from "styled-components";

import Card from "../components/ItemBox";

import { Link } from "react-router-dom";

// import Button from "../components/Button";
import Button from "../components/Button";

const Items = styled.div`
  width: ${(props) => {
    if (props.width) {
      return props.width;
    } else {
      return "40vw";
    }
  }};
  height: 20vw;
  margin: 0;
  padding-top: 0;
  background-size: cover;
  background-position: center;
  background-image: url("${(props) => props.url}");
`;

const MainImgContainer = styled.div`
  width: 100%;
  height: 300px;
  margin: 0;
  padding: 0;
  background-size: cover;
  background-position: center;
  background-image: url("https://images.unsplash.com/photo-1571867424488-4565932edb41?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80");
`;

const MainParagraph = styled.div`
  text-align: center;
  padding: 3vw;
  display: flex;
  justify-content: space-around;
  color: black;
`;

const SubParagraph = styled.div`
  text-align: center;
  padding: 3vw;
  color: black;
  background-color: ${(props) => {
    if (props.color) {
      return props.color;
    } else {
      return "antiquewhite";
    }
  }};
`;

const SubItemBoxes = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const Home = () => {
  return (
    <div>
      <MainImgContainer />
      <MainParagraph>
        <Link className="nav-link" to="/">
          <Card className="category-card">
            <h3>Life</h3>
            <Items url="https://images.unsplash.com/photo-1586250300376-bee39fc56013?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"></Items>
          </Card>
        </Link>
        <Link className="nav-link" to="/">
          <Card className="category-card">
            <h3>Study</h3>
            <Items url="https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80"></Items>
          </Card>
        </Link>
      </MainParagraph>
      <SubParagraph color="antiquewhite">
        <h1>New Arrivals</h1>
        <SubItemBoxes>
          <Link className="nav-link" to="/">
            <Card padding="15px" className="category-card">
              <h3>MacBook Air M2 Chip</h3>
              <Items
                width="20vw"
                url="https://images.unsplash.com/photo-1660833638050-41f95d8b94e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              ></Items>
              <p className="lead">Open Box</p>
              <Button color="packages">View More</Button>
            </Card>
          </Link>
          <Link className="nav-link" to="/">
            <Card padding="15px" className="category-card">
              <h3>Milk and Honey</h3>
              <Items
                width="20vw"
                url="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              ></Items>
              <p className="lead">Only 25cad A+ quality</p>
              <Button color="packages">View More</Button>
            </Card>
          </Link>
          <Link className="nav-link" to="/">
            <Card padding="15px" className="category-card">
              <h3>RTX 3060</h3>
              <Items
                width="20vw"
                url="https://images.unsplash.com/photo-1587134160474-cd3c9a60a34a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              ></Items>
              <p className="lead">No mining used for gaming</p>
              <Button color="packages">View More</Button>
            </Card>
          </Link>
          <Link className="nav-link" to="/">
            <Card padding="15px" className="category-card">
              <h3>iPhone 11</h3>
              <Items
                width="20vw"
                url="https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              ></Items>
              <p className="lead">AAA state no crack damage</p>
              <Button color="packages">View More</Button>
            </Card>
          </Link>
        </SubItemBoxes>
      </SubParagraph>
      <SubParagraph color="white">
        <h1>Latest Post</h1>
        <SubItemBoxes>
          <Link className="nav-link" to="/">
            <Card padding="15px" className="category-card">
              <h3>MacBook Air M2 Chip</h3>
              <Items
                width="20vw"
                url="https://images.unsplash.com/photo-1660833638050-41f95d8b94e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              ></Items>
              <p className="lead">Open Box</p>
              <Button color="packages">View More</Button>
            </Card>
          </Link>
          <Link className="nav-link" to="/">
            <Card padding="15px" className="category-card">
              <h3>Milk and Honey</h3>
              <Items
                width="20vw"
                url="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              ></Items>
              <p className="lead">Only 25cad A+ quality</p>
              <Button color="packages">View More</Button>
            </Card>
          </Link>
          <Link className="nav-link" to="/">
            <Card padding="15px" className="category-card">
              <h3>RTX 3060</h3>
              <Items
                width="20vw"
                url="https://images.unsplash.com/photo-1587134160474-cd3c9a60a34a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              ></Items>
              <p className="lead">No mining used for gaming</p>
              <Button color="packages">View More</Button>
            </Card>
          </Link>
          <Link className="nav-link" to="/">
            <Card padding="15px" className="category-card">
              <h3>iPhone 11</h3>
              <Items
                width="20vw"
                url="https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              ></Items>
              <p className="lead">AAA state no crack damage</p>
              <Button color="packages">View More</Button>
            </Card>
          </Link>
        </SubItemBoxes>
      </SubParagraph>
    </div>
  );
};

export default Home;
