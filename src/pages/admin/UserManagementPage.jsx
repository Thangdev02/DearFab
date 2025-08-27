import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Spinner, Alert, Pagination } from 'react-bootstrap';
import { getUsers } from '../../services/userApi';

function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // State cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

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

  // Tính toán người dùng hiển thị trên trang hiện tại
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Tính tổng số trang
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Xử lý chuyển trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
              {currentUsers.map(user => (
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
          {/* Phân trang */}
          <Pagination className="justify-content-center mt-3">
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default UserManagementPage;