import { Table, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../components/css/Admin.css';
import axios from 'axios';

function Admin(prop) {
  const [users, setUsers] = useState(null);
  //let history = useNavigate();

  useEffect(() => {
  axios.get('http://localhost:8080/users')
  .then((res) => {
    let data = res.data;
    setUsers(data);
    console.log(data);
  })
  .catch((error) => {
    console.log(error.response.data);
  })
},[]);

  if (users) {
    return (
      <div className="admin-container">
        <div className="switch-page">
          <Button className="users-btn">
            Users
          </Button>
          <Link to="/adminPosts">
          <Button className="posts-btn">
            Posts
          </Button>
          </Link>
          <Button className="reports-btn">
            Reports
          </Button>
        </div>
        <div className="user-table">
          <Table className="table" striped bordered hover>
            <thead>
              <tr>
                <th>User id</th>
                <th>Username</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone</th>
                <th>City</th>
              </tr>
            </thead>
            <tbody>
              {users.map((data) => (
                <tr
                  key={data._id}
                >
                  <td>{data._id}</td>
                  <td>{data.email}</td>
                  <td>{data.fname}</td>
                  <td>{data.lname}</td>
                  <td>{data.phone}</td>
                  <td>{data.city}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  } else {
    return <div>There is no user information</div>;
  }
}
export default Admin;
