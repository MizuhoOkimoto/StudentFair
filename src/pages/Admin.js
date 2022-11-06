import { Table, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../components/css/Admin.css';
import axios from 'axios';

function Admin(prop) {
  const [users, setUsers] = useState(null);
  //let history = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:8080/users')
      .then((res) => {
        let data = res.data;
        setUsers(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error + ' Unable to get data from MongoDB');
      });
  }, []);

  const clickToDelete = () => {
    if (window.confirm('Are you sure to delete your account?') === true) {
      alert('Your account is safely deleted.');
      
    } else {
      alert('You canceled delete your account!');
    }
  };

  if (users) {
    return (
      <div className="admin-container">
        <div className="switch-page">
          <Button className="users-btn">Users</Button>
          <Link to="/adminPosts">
            <Button className="posts-btn">Posts</Button>
          </Link>
          <Link to="/AdminReports">
            <Button className="reports-btn">Reports</Button>
          </Link>
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
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>
              {users.map((data) => (
                <tr key={data._id}>
                  <td>{data._id}</td>
                  <td>{data.email}</td>
                  <td>{data.fname}</td>
                  <td>{data.lname}</td>
                  <td>{data.phone}</td>
                  <td>{data.city}</td>
                  <td className="deleteUser" style={{ color: 'blue' }} onClick={clickToDelete}>
                    delete
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  } else {
    return (
      <div className="admin-container">
        <div className="switch-page">
          <Link to="/admin">
            <Button className="users-btn">Users</Button>
          </Link>
          <Link to="/AdminPosts">
            <Button className="posts-btn">Posts</Button>
          </Link>
          <Link to="/AdminReports">
            <Button className="reports-btn">Reports</Button>
          </Link>
          <div className="message">There is no user information</div>
        </div>
      </div>
    );
  }
}
export default Admin;
