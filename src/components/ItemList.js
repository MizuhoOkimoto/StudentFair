import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

// import Button from "../components/Button";
import Button from '../components/Button';
import Loading from '../components/Loading';

const ItemList = styled.div`
  display: flex;
  justify-content: space-between;
  width: 680px;
  padding: 10px;
  // background-color: #f0efef;
  box-shadow: 0px 0px 10px gray;
  border-radius: 15px;
  margin: 5px 0 5px 0;
`;

export default ItemList;
