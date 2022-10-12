import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

// import Button from "../components/Button";
import Button from '../components/Button';
import Loading from '../components/Loading';
import List from '../components/ItemList';

const AllList = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log('PokeList component mounts');

    window.setTimeout(() => {
      setLoading(false);
    }, 1700);
  }, []);
  return (
    <div>
      {loading && <Loading />}
      {!loading && (
        <div>
          <div>All List</div>
          <div>
            <List></List>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllList;
