import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link, redirect } from 'react-router-dom';

function logOut(prop) {
  axios.get('http://localhost:8080/users/logout').then((res) => {
    prop.userOut();
    window.location = '/';
  });
}

export default logOut;
