import styled from 'styled-components';

import Card from '../components/ItemBox';

import { Link } from 'react-router-dom';
import axios from 'axios';
// import Button from "../components/Button";
import Button from '../components/Button';

import buyCategoryImg from '../img/home_pic/buy_category_img.avif';
import sellCategoryImg from '../img/home_pic/sell_category_img.avif';
import mainBannerImg from '../img/home_pic/main_banner_img.avif';

import latestPostImg1 from '../img/post_pic/mac-book.avif';
import latestPostImg2 from '../img/post_pic/note-nook.avif';
import latestPostImg3 from '../img/post_pic/graphic-card.avif';
import latestPostImg4 from '../img/post_pic/iphone-phone.avif';

import categoryImg1 from '../img/home_pic/category-computer.avif';
import categoryImg2 from '../img/home_pic/category-textbook.avif';
import categoryImg3 from '../img/home_pic/category-labmaterials.avif';
import categoryImg4 from '../img/home_pic/category-electronics.avif';

const Items = styled.div`
  width: ${(props) => {
    if (props.width) {
      return props.width;
    } else {
      return '40vw';
    }
  }};
  height: 20vw;
  margin: 0;
  padding-top: 0;
  background-size: cover;
  background-position: center;
  background-image: url('${(props) => props.url}');
  display: inline-block;
`; // Added line 24 to aligned images to the center

const MainImgContainer = styled.div`
  width: 100%;
  height: 300px;
  margin: 0;
  padding: 0;
  background-size: cover;
  background-position: center;
  background-image: url('${mainBannerImg}');
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
      return 'antiquewhite';
    }
  }};
`;

const SubItemBoxes = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

function Home(prop) {
  axios.get('http://localhost:8080/posts').then((res) => {
    prop.setPostList(res.data);
  });

  return (
    <div>
      <MainImgContainer />
      <MainParagraph>
        <Link className="nav-link" to="/">
          <Card className="category-card">
            <h3>Buy</h3>
            <Items url={buyCategoryImg}></Items>
          </Card>
        </Link>
        <Link className="nav-link" to="/">
          <Card className="category-card">
            <h3>Sell</h3>
            <Items url={sellCategoryImg}></Items>
          </Card>
        </Link>
      </MainParagraph>
      <SubParagraph color="antiquewhite">
        <h1>New Post</h1>
        <SubItemBoxes>
          <Link className="nav-link" to="/">
            <Card padding="15px" className="category-card">
              <h3>MacBook Air M2 Chip</h3>
              <Items width="20vw" url={latestPostImg1}></Items>
              <p className="lead">Open Box</p>
              <Button color="packages">View More</Button>
            </Card>
          </Link>
          <Link className="nav-link" to="/">
            <Card padding="15px" className="category-card">
              <h3>Milk and Honey</h3>
              <Items width="20vw" url={latestPostImg2}></Items>
              <p className="lead">Only 25cad A+ quality</p>
              <Button color="packages">View More</Button>
            </Card>
          </Link>
          <Link className="nav-link" to="/">
            <Card padding="15px" className="category-card">
              <h3>RTX 3060</h3>
              <Items width="20vw" url={latestPostImg3}></Items>
              <p className="lead">No mining used for gaming</p>
              <Button color="packages">View More</Button>
            </Card>
          </Link>
          <Link className="nav-link" to="/">
            <Card padding="15px" className="category-card">
              <h3>iPhone 11</h3>
              <Items width="20vw" url={latestPostImg4}></Items>
              <p className="lead">AAA state no crack damage</p>
              <Button color="packages">View More</Button>
            </Card>
          </Link>
        </SubItemBoxes>
      </SubParagraph>
      <SubParagraph color="white">
        <h1>Category</h1>
        <SubItemBoxes>
          <Link className="nav-link" to="/">
            <Card padding="15px" className="category-card">
              <h3>Computer Accessories</h3>
              <Items width="20vw" url={categoryImg1}></Items>
              {/* <p className="lead">Open Box</p> */}
              <br />
              <Button color="gray">View More</Button>
            </Card>
          </Link>
          <Link className="nav-link" to="/">
            <Card padding="15px" className="category-card">
              <h3>Textbook</h3>
              <Items width="20vw" url={categoryImg2}></Items>
              {/* <p className="lead">Only 25cad A+ quality</p> */}
              <br />
              <Button color="gray">View More</Button>
            </Card>
          </Link>
          <Link className="nav-link" to="/">
            <Card padding="15px" className="category-card">
              <h3>Lab Materials</h3>
              <Items width="20vw" url={categoryImg3}></Items>
              {/* <p className="lead">No mining used for gaming</p> */}
              <br />
              <Button color="gray">View More</Button>
            </Card>
          </Link>
          <Link className="nav-link" to="/">
            <Card padding="15px" className="category-card">
              <h3>Electronics </h3>
              <Items width="20vw" url={categoryImg4}></Items>
              {/* <p className="lead">AAA state no crack damage</p> */}
              <br />
              <Button color="gray">View More</Button>
            </Card>
          </Link>
        </SubItemBoxes>
      </SubParagraph>
    </div>
  );
}

export default Home;
