import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Spinner, Alert } from 'react-bootstrap';
import { getUsers } from '../../services/userApi';

function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const response = await getUsers();
      if (response.success) {
        setUsers(response.users);
      } else {
        setError(response.message);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (users.length === 0) {
    return (
      <Container className="mt-4">
        <p>Không tìm thấy người dùng.</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Card className="shadow-sm" style={{ borderRadius: '10px' }}>
        <Card.Body>
          <Card.Title>Quản lý Người dùng</Card.Title>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Họ và tên</th>
                <th>Email</th>
                <th>Địa chỉ</th>
                <th>Số điện thoại</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td>{user.phone}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default UserManagementPage;
