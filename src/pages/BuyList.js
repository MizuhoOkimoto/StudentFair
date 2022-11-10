import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

// import Button from "../components/Button";
import Button from '../components/Button';
import Loading from '../components/Loading';

function BuyList() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log('PokeList component mounts');

    window.setTimeout(() => {
      setLoading(false);
    }, 1700);
  }, []);
  axios
    .get('http://localhost:8080/posts/getBuyPost')
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  return (
    <div>
      {loading && <Loading />}
      {!loading && <p>Buy List</p>}
    </div>
  );
}

export default BuyList;
