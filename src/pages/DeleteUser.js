import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function DeleteUser(prop) {
  const [result, setResult] = useState('');

  const inputData = {
    email: prop.usermail(),
  };
  console.log(inputData.email);
  axios.post('http://localhost:8080/users/delete', inputData).then((res) => {
    console.log(res.data);
    if (res.data === true) {
      window.location = '/';
      prop.clear();
    } else {
      window.location = '/myProfile';
    }
  });

  return (
    <div>
      <p>{result}</p>
    </div>
  );
}

export default DeleteUser;
