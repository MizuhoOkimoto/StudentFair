import axios from 'axios';

function logOut(prop) {
  axios.get('http://localhost:8080/users/logout').then((res) => {
    prop.userOut();
    window.location = '/';
  });
}

export default logOut;
