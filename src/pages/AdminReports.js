import { Table, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/css/Admin.css';
import axios from 'axios';

function AdminReports({ isAdmin }) {
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // if(!isAdmin){
    //   navigate('/login');
    //   return;
    // }
    axios
      .get('http://localhost:8080/reports')
      .then((res) => {
        let data = res.data;
        setReports(data);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.log(error + ' Unable to get data from MongoDB');
      });
  }, [loading]);

  const clickToFilter = async (userData) => {
    console.log(userData);
    // Response the data(object) and see the 'data' attribute
    const response = await axios.get(`http://localhost:8080/reports/getUserReports/${userData}`);
    console.log(response.data);
    setReports(response.data);
  };

  const clickToUnfilter = async () => {
    const response = await axios.get(`http://localhost:8080/reports`);
    console.log(response.data);
    setReports(response.data);
  };

  if (reports) {
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
                <th>Report Number</th>
                <th>Username</th>
                <th>Category</th>
                <th>title</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((data) => (
                <tr key={data._id}>
                  <td>{data.report_number}</td>
                  <td onClick={() => clickToFilter(data.user_id)}>{data.user_id}</td>
                  <td>{data.category}</td>
                  <td>{data.title}</td>
                  <td>{data.description}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="back_btn">
          <Link style={{ color: 'blue' }} onClick={() => clickToUnfilter()}>
            View all reports
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
          <div className="message">There is no report information</div>
        </div>
      </div>
    );
  }
}
export default AdminReports;
