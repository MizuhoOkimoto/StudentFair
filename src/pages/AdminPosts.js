import { Table, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/css/Admin.css';
import axios from 'axios';
import Moment from 'react-moment';

function AdminPosts({ isAdmin }) {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // if(!isAdmin){
    //   navigate('/login');
    //   return;
    // }
    axios
      .get('http://localhost:8080/posts')
      .then((res) => {
        let data = res.data;
        setPosts(data);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.log(error + ' Unable to get data from MongoDB');
      });
  }, [loading]);

  const clickToDelete = async (postNum) => {
    if (window.confirm('Are you sure to delete the post?') === true) {
      const res = await axios.delete(`http://localhost:8080/posts/deletePost/${postNum}`);
      console.log(res);
      alert('The post is deleted');
      setLoading(true);
    } else {
      alert('You canceled delete the post!');
    }
  };

  const clickToFilter = async (userData) => {
    console.log(userData);
    // Response the data(object) and see the 'data' attribute
    const response = await axios.get(`http://localhost:8080/posts/getUserPosts/${userData}`);
    console.log(response.data);
    setPosts(response.data);
  };

  const clickToUnfilter = async () => {
    const response = await axios.get(`http://localhost:8080/posts`);
    console.log(response.data);
    setPosts(response.data);
  };

  const clickToViewDetails = async (postNum) => {
    console.log(postNum);
    const response = await axios.get(`http://localhost:8080/posts/detail/${postNum}`);
    console.log(response);
    navigate(`/list/post/detail/${postNum}`);
  };
  const dateToFormat = '1976-04-19';
  if (posts) {
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
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((data) => (
                <tr key={data._id}>
                  <td
                    onClick={() => clickToViewDetails(data.post_number)}
                    style={{ color: 'blue', textDecoration: 'underline' }}
                  >
                    {data.post_number}
                  </td>
                  <td
                    onClick={() => clickToFilter(data.user_id)}
                    style={{ textDecoration: 'underline' }}
                  >
                    {' '}
                    {data.user_id}
                  </td>
                  <td>{data.post_category}</td>
                  <td>${data.price}</td>

                  <td>
                    <Moment format="YYYY/MM/DD">{data.create_date}</Moment>
                  </td>
                  <td
                    className="deleteUser"
                    style={{ color: 'blue' }}
                    onClick={() => clickToDelete(data.post_number)}
                  >
                    delete
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="back_btn">
          <Link style={{ color: 'blue' }} onClick={() => clickToUnfilter()}>
            View all posts
          </Link>
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
          <div className="message">There is no item post information</div>
        </div>
      </div>
    );
  }
}
export default AdminPosts;
