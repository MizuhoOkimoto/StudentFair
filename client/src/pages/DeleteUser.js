import axios from 'axios';

function DeleteUser(prop) {
  //const [result, setResult] = useState('');

  const inputData = {
    email: prop.usermail(),
  };
  console.log(inputData.email);
  axios.post('https://student-fair-prj666.herokuapp.com/users/delete', inputData).then((res) => {
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
      <p></p>
    </div>
  );
}

export default DeleteUser;
