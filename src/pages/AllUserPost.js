import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

// import Button from "../components/Button";
import Button from '../components/Button';
import Loading from '../components/Loading';
import List from '../components/ItemList';
import '../components/css/Item-List.css';
import mainImg from '../img/post_pic/mac-book.avif';

const AllUserPost = (prop) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log('prop : ' + prop.post_list);
  console.log('prop : ' + prop.userData.email);

  useEffect(() => {
    window.setTimeout(() => {
      setLoading(false);
    }, 1700);
  }, []);

  useEffect(() => {
    console.log('Component mounts');
    window.setTimeout(() => {
      console.log(prop.userData.email);
      const userId = prop.userData.email;
      console.log(userId);
      axios
        .get('http://localhost:8080/posts')
        .then((res) => {
          console.log(res);
          let { data } = res;

          setList(data.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
    }, 0);
  }, []);

  return (
    <div>
      {console.log(list)}
      {loading && <Loading />}
      {!loading && (
        <div>
          <div className="item-list-container">
            {list.map((e) =>
              prop.userData.email === e.user_id ? (
                <List key={e._id}>
                  <img className="list-image" src={mainImg} alt="list-img" />
                  <div className="list-desces">
                    <div className="list-desc post-num">No. {e.post_number}</div>
                    <div className="list-desc postTitle">
                      <Link className="nav-link" to={'/list/post/detail/' + e.post_number}>
                        {e.post_title}
                      </Link>
                    </div>
                    <div className="list-desc state">Condition: {e.condition}</div>
                    <div className="list-desc price">Price: ${e.price}</div>
                    <div className="list-desc seller-name">Seller: {e.user_id.split('@')[0]}</div>
                    <div className="list-desc location">Location: {e.location}</div>
                  </div>
                </List>
              ) : (
                ''
              )
            )}
          </div>
          <div className="item-list-page-btn-container">
            <Link className="btn-link" to="/myProfile">
              <Button className="btn" color="gray">
                Back to my profile
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUserPost;
