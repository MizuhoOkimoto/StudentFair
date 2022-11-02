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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.setTimeout(() => {
      setLoading(false);
    }, 1700);
  }, []);

  let menu;
  axios
    .get('http://localhost:8080/posts')
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <div>
      {loading && <Loading />}
      {!loading && (
        <div>
          <div className="item-list-container">
            <List>
              <img
                className="list-image"
                src="https://images.unsplash.com/photo-1660833638050-41f95d8b94e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                alt="list-img"
              />
              <div className="list-desces">
                <div className="list-desc title">
                  <Link className="nav-link" to="/itemdetail">
                    MacBook Air M2 Chip
                  </Link>
                </div>
                <div className="list-desc state">Open Box</div>
                <div className="list-desc price">$ 1445</div>
                <div className="list-desc seller-name">Jun Song</div>
                <div className="list-desc location">Toronto</div>
              </div>
            </List>
            <List>
              <img
                className="list-image"
                src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                alt="list-img"
              />
              <div className="list-desces">
                <div className="list-desc title">Milk and Honey</div>
                <div className="list-desc state">A+ quality</div>
                <div className="list-desc price">$ 25</div>
                <div className="list-desc seller-name">Mizuho Okimoto</div>
                <div className="list-desc location">Losedale</div>
              </div>
            </List>
            <List>
              <img
                className="list-image"
                src="https://images.unsplash.com/photo-1587134160474-cd3c9a60a34a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="list-img"
              />
              <div className="list-desces">
                <div className="list-desc title">RTX 3060</div>
                <div className="list-desc state">No mining used for gaming</div>
                <div className="list-desc price">$ 1445</div>
                <div className="list-desc seller-name">Wonchul Choi</div>
                <div className="list-desc location">Thornhill</div>
              </div>
            </List>
            <List>
              <img
                className="list-image"
                src="https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="list-img"
              />
              <div className="list-desces">
                <div className="list-desc title">iPhone 11</div>
                <div className="list-desc state">AAA state no crack damage</div>
                <div className="list-desc price">$ 995</div>
                <div className="list-desc seller-name">Jun Song</div>
                <div className="list-desc location">Toronto</div>
              </div>
            </List>
          </div>
          <div className="item-list-page-btn-container">
            <div className="item-list-page-btn">
              <div className="page-btn">{'<'}</div>
              <div className="page-btn">1</div>
              <div className="page-btn">2</div>
              <div className="page-btn">3</div>
              <div className="page-btn">4</div>
              <div className="page-btn">...</div>
              <div className="page-btn">{'>'}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllList;
