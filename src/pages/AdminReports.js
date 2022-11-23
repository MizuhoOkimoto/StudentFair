import { Table, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/css/Admin.css';
import axios from 'axios';

function AdminReports(props) {
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(false);
  const [review, setReviewed] = useState(false);

  // State variable to keep track of all the expanded rows
  // By default, nothing expanded. Hence initialized with empty array.
  const [expandedRows, setExpandedRows] = useState([]);
  // State variable to keep track which row is currently expanded.
  const [expandState, setExpandState] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if(!props.isAdmin){
      navigate('/login');
      return;
    }
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

  /**
   * This function gets called when show/hide link is clicked.
   */
  const handleEpandRow = (event, reportNum) => {
    const currentExpandedRows = expandedRows;
    const isRowExpanded = currentExpandedRows.includes(reportNum);

    let obj = {};
    isRowExpanded ? (obj[reportNum] = false) : (obj[reportNum] = true);
    setExpandState(obj);

    // If the row is expanded, we are here to hide it. Hence remove
    // it from the state variable. Otherwise add to it.
    const newExpandedRows = isRowExpanded
      ? currentExpandedRows.filter((id) => id !== reportNum)
      : currentExpandedRows.concat(reportNum);
    setExpandedRows(newExpandedRows);
  };

  const clickReviewed = async () => {
    review(true);
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
                <th>Expand</th>
                {/* TODO */}
                {/* <th>Manage</th> */}
              </tr>
            </thead>
            <tbody>
              {reports.map((data) => (
                <>
                  <tr key={data.report_number}>
                    <td>{data.report_number}</td>
                    <td onClick={() => clickToFilter(data.user_id)}>{data.user_id}</td>
                    <td>{data.category}</td>
                    <td>{data.title}</td>
                    <td className="desc">
                      {data.description.length > 60
                        ? `${data.description.substring(0, 60)}...`
                        : data.description}
                    </td>
                    <td>
                      <Button
                        variant="link"
                        onClick={(event) => handleEpandRow(event, data.report_number)}
                        className="report_manage_btn"
                      >
                        {expandState[data.report_number] ? 'Hide' : 'Show'}
                      </Button>
                    </td>
                    {/* TODO
                    <td onClick={() => clickReviewed()}><input type="checkbox" />Reviewed</td> */}
                  </tr>
                  <>
                    {expandedRows.includes(data.report_number) ? (
                      <tr key={data.report_number}>
                        <td colSpan="6">
                          <div
                          // style={{ backgroundColor: '#343A40', color: '#FFF', padding: '10px' }}
                          >
                            <p className="desc_title"> Description </p>
                            <p>{data.description}</p>
                          </div>
                        </td>
                      </tr>
                    ) : null}
                  </>
                </>
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
