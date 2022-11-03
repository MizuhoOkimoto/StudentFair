import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

// import Button from "../components/Button";
import Button from '../components/Button';
import Loading from '../components/Loading';
import List from '../components/ItemList';
import '../components/css/Item-List.css';

const AllList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listNum, setListNum] = useState(1);

  let temp = [];

  useEffect(() => {
    window.setTimeout(() => {
      setLoading(false);
    }, 1700);
  }, []);

  let menu;
  useEffect(() => {
    console.log('Component mounts');

    window.setTimeout(() => {
      axios
        .get('http://localhost:8080/posts')
        .then((res) => {
          console.log(res);
          const { data } = res;
          // let tempData = [];
          // for (let i = listNum - 1; i < listNum * 5; i++) {
          //   tempData.push(data[i]);
          // }
          setList(data);
          // console.log(list);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 0);
  }, []);

  const renderPageButton = (e) => {
    Math.ceil(list.length / 5);
    for (let i = 0; i < Math.ceil(list.length / 5); i++) {
      temp.push(i + 1);
    }
    console.log(temp);
  };

  const pageBtnClicked = (e) => {
    console.log(e);
  };

  const createBtnPressed = () => {
    window.location = '/createPost';
  };

  return (
    <div>
      {console.log(list)}
      {loading && <Loading />}
      {!loading && (
        <div>
          <div className="item-list-container">
            <div className="item-list-create-post-button">
              <Button onClick={createBtnPressed} className="create-button" color="tomato">
                Create Post
              </Button>
            </div>
            {list.map((e) => (
              <List key={e._id}>
                <img
                  className="list-image"
                  src="https://images.unsplash.com/photo-1660833638050-41f95d8b94e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                  alt="list-img"
                />
                <div className="list-desces">
                  <div className="list-desc post-num">No. {e.post_number}</div>
                  <div className="list-desc postTitle">
                    <Link className="nav-link" to="/itemdetail">
                      {e.post_title}
                    </Link>
                  </div>
                  <div className="list-desc state">Condition: {e.condition}</div>
                  <div className="list-desc price">Price: ${e.price}</div>
                  <div className="list-desc seller-name">Seller: {e.user_id.split('@')[0]}</div>
                  <div className="list-desc location">Location: {e.location}</div>
                </div>
              </List>
            ))}
          </div>
          <div className="item-list-page-btn-container">
            <div className="item-list-page-btn">
              <div className="page-btn">{'<'}</div>
              {renderPageButton(Math.ceil(list.length / 5))}
              {temp.map((e) => (
                <div
                  key={e}
                  onClick={() => {
                    pageBtnClicked(e);
                  }}
                  className="page-btn"
                >
                  {e}
                </div>
              ))}
              <div className="page-btn">{'>'}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllList;
