import axios from 'axios';

function logOut(prop) {
  axios.get('https://student-fair-prj666.herokuapp.com/users/logout').then((res) => {
    prop.userOut();
    window.location = '/';
  });
}

export default logOut;
