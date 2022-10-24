import Table from 'react-bootstrap/Table';
import '../components/css/Admin.css';

const Admin = () => {
  return (
    <div className="admin-container">
        <div className="admin-card">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>testname</td>
            <td>test</td>
            <td>test</td>
            <td>@111-111-1111</td>
            <td>Toronto</td>
          </tr>
          <tr>
            <td>testname</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>456-456-4564</td>
            <td>Niagara</td>
          </tr>
          <tr>
            <td>testname</td>
            <td>Jack</td>
            <td>Thornton</td>
            <td></td>
            <td>Niagara</td>
          </tr>
        </tbody>
      </Table>
      </div>
    </div>
  );
};

export default Admin;
