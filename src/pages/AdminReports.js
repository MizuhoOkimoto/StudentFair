import { Table, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../components/css/Admin.css';
import axios from 'axios';

function AdminReports(prop) {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
  axios.get('http://localhost:8080/reports')
  .then((res) => {
    let data = res.data;
    setPosts(data);
    console.log(data);
  })
  .catch((error) => {
    console.log(error + " Unable to get data from MongoDB");
  })
},[]);

  if (posts) {
    return (
      <div className="admin-container">
        <div className="switch-page">
        <Link to="/admin">
          <Button className="users-btn">
            Users
          </Button>
          </Link>
          <Link to="/AdminPosts">
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
                <th>Report Number</th>
                <th>Username</th>
                <th>Category</th>
                <th>title</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((data) => (
                <tr
                  key={data._id}
                >
                  <td>{data.report_number}</td>
                  <td>{data.user_id}</td>
                  <td>{data.category}</td>
                  <td>{data.title}</td>
                  <td>{data.description}</td>
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
          <Button className="users-btn">
            Users
          </Button>
          </Link>
          <Link to="/AdminPosts">
          <Button className="posts-btn">
            Posts
          </Button>
          </Link>
          <Button className="reports-btn">
            Reports
          </Button>
        <div className="message">There is no item post information</div>
        </div>
        </div>
    );
  }
}
export default AdminReports;
