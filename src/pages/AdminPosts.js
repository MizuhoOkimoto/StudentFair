import { Table, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../components/css/Admin.css';
import axios from 'axios';

function AdminPosts(prop) {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
  axios.get('http://localhost:8080/posts')
  .then((res) => {
    let data = res.data;
    setPosts(data);
    console.log(data);
  })
  .catch((error) => {
    console.log(error.response.data);
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
                <th>Post Number</th>
                <th>Username</th>
                <th>Category</th>
                <th>price</th>
                <th>Create Date</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((data) => (
                <tr
                  key={data._id}
                >
                  <td>{data.post_number}</td>
                  <td>{data.user_id}</td>
                  <td>{data.post_category}</td>
                  <td>{data.price}</td>
                  <td>{data.create_date}</td>
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
export default AdminPosts;
