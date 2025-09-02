import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Chart from 'chart.js/auto'; // Import Chart.js
import { FaUsers, FaChalkboardTeacher, FaUserFriends, FaMoneyBillWave } from 'react-icons/fa'; // Icons
import { getProducts } from '../../services/api';
import { getOrders } from '../../services/orderApi';
import { getUsers } from '../../services/userApi';

function AdminDashboardPage() {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalOrders: 0,
        totalUsers: 0,
        productsThisMonth: 0,
        ordersThisMonth: 0,
        revenueTotal: 0,
        revenueThisMonth: 0,
        usersThisMonth: 0,
    });
    const [productChart, setProductChart] = useState(null);
    const [orderChart, setOrderChart] = useState(null);
    const [revenueChart, setRevenueChart] = useState(null);
    const [topOrders, setTopOrders] = useState([]);

    // Custom function to parse Vietnamese date format "02:00 24 thg 5, 2025"
    const parseVietnameseDate = (dateString) => {
        try {
            console.log('Parsing date:', dateString); // Debug log
            // Remove "thg" and trim extra spaces
            const cleanedDateString = dateString.replace(/thg\s*/, '').trim();
            console.log('Cleaned date string:', cleanedDateString); // Debug log
            // Split into components: [time, day, month, year]
            const parts = cleanedDateString.split(/\s+/);
            if (parts.length !== 4) throw new Error('Invalid date format');

            const time = parts[0]; // "02:00"
            const day = parseInt(parts[1], 10); // 24
            const month = parseInt(parts[2], 10) - 1; // 5 (months are 0-based in JS)
            const year = parseInt(parts[3], 10); // 2025

            if (isNaN(day) || isNaN(month) || isNaN(year)) throw new Error('Invalid number in date');

            // Split time into hours and minutes
            const [hours, minutes] = time.split(':').map(Number);
            if (isNaN(hours) || isNaN(minutes)) throw new Error('Invalid time format');

            // Validate month (0-11) and day (1-31)
            if (month < 0 || month > 11 || day < 1 || day > 31) throw new Error('Invalid month or day');

            // Create a new Date object
            const parsedDate = new Date(year, month, day, hours, minutes);
            if (isNaN(parsedDate.getTime())) throw new Error('Invalid Date after construction');
            console.log('Parsed date:', parsedDate.toISOString()); // Debug log
            return parsedDate;
        } catch (error) {
            console.error('Error parsing date:', dateString, error.message);
            return null; // Return null for invalid dates
        }
    };

    const fetchStats = async () => {
        try {
            // Fetch products
            const productsResponse = await getProducts();
            const products = Array.isArray(productsResponse) ? productsResponse : [];

            // Fetch orders
            const ordersResponse = await getOrders();
            const orders = ordersResponse?.data?.items || [];

            // Fetch users
            const usersResponse = await getUsers();
            const users = usersResponse.success ? usersResponse.users : [];

            const currentDate = new Date(); // Today: May 25, 2025, 07:40 PM +07
            const currentMonth = currentDate.getMonth(); // 4 (May is 0-based)
            const currentYear = currentDate.getFullYear(); // 2025

            // Calculate stats
            const totalProducts = products?.length || 0;
            const totalOrders = orders?.length || 0;
            const totalUsers = users?.length || 0;

            // Products this month
            const productsThisMonth = products?.filter(p => {
                const createdAt = new Date(p.createdAt || p.dateAdded || currentDate);
                return createdAt.getMonth() === currentMonth && createdAt.getFullYear() === currentYear;
            }).length || 0;

            // Orders this month
            const ordersThisMonth = orders?.filter(o => {
                const orderDate = parseVietnameseDate(o.orderDate);
                if (!orderDate) return false; // Skip invalid dates
                return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
            }).length || 0;

            // Revenue
            const revenueTotal = orders.filter(o => o.status !== 'Pending').reduce((sum, o) => sum + (o.totalPrice || 0), 0) || 0;
            const revenueThisMonth = orders
    .filter(o => {
        if (!o.status || o.status.toLowerCase() !== "Pending") return false; 
        const orderDate = parseVietnameseDate(o.orderDate);
        if (!orderDate) return false;
        return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
    })
    .reduce((sum, o) => sum + (o.totalPrice || 0), 0) || 0;
            // Users this month
            const usersThisMonth = users?.filter(u => {
                const createdAt = new Date(u.createdAt || u.dateJoined || currentDate);
                return createdAt.getMonth() === currentMonth && createdAt.getFullYear() === currentYear;
            }).length || 0;

            // Top 5 orders by totalPrice
            const topOrdersList = [...orders]
                .sort((a, b) => (b.totalPrice || 0) - (a.totalPrice || 0))
                .slice(0, 5);

            setStats({
                totalProducts,
                totalOrders,
                totalUsers,
                productsThisMonth,
                ordersThisMonth,
                revenueTotal,
                revenueThisMonth,
                usersThisMonth,
            });
            setTopOrders(topOrdersList);

            // Destroy existing charts
            if (productChart) productChart.destroy();
            if (orderChart) orderChart.destroy();
            if (revenueChart) revenueChart.destroy();

            // Product Chart (Bar Chart)
            const ctxProduct = document.getElementById('productChart')?.getContext('2d');
            if (ctxProduct) {
                setProductChart(new Chart(ctxProduct, {
                    type: 'bar',
                    data: {
                        labels: ['Total Products', 'Products This Month'],
                        datasets: [{
                            label: 'Products',
                            data: [totalProducts, productsThisMonth],
                            backgroundColor: ['#6c757d', '#17a2b8'],
                            borderColor: ['#5a6268', '#138496'],
                            borderWidth: 1,
                        }],
                    },
                    options: {
                        scales: { y: { beginAtZero: true, max: Math.max(totalProducts, 20) } },
                        responsive: true,
                        maintainAspectRatio: false,
                    },
                }));
            }

            // Order Chart (Bar Chart)
            const ctxOrder = document.getElementById('orderChart')?.getContext('2d');
            if (ctxOrder) {
                setOrderChart(new Chart(ctxOrder, {
                    type: 'bar',
                    data: {
                        labels: ['Total Orders', 'Orders This Month'],
                        datasets: [{
                            label: 'Orders',
                            data: [totalOrders, ordersThisMonth],
                            backgroundColor: ['#6c757d', '#28a745'],
                            borderColor: ['#5a6268', '#218838'],
                            borderWidth: 1,
                        }],
                    },
                    options: {
                        scales: { y: { beginAtZero: true, max: Math.max(totalOrders, 20) } },
                        responsive: true,
                        maintainAspectRatio: false,
                    },
                }));
            }

            // Revenue Chart (Bar Chart)
            const ctxRevenue = document.getElementById('revenueChart')?.getContext('2d');
            if (ctxRevenue) {
                setRevenueChart(new Chart(ctxRevenue, {
                    type: 'bar',
                    data: {
                        labels: ['Total Revenue', 'Revenue This Month'],
                        datasets: [{
                            label: 'Revenue (VND)',
                            data: [revenueTotal, revenueThisMonth],
                            backgroundColor: ['#6c757d', '#ffc107'],
                            borderColor: ['#5a6268', '#e0a800'],
                            borderWidth: 1,
                        }],
                    },
                    options: {
                        scales: { y: { beginAtZero: true, ticks: { callback: value => `${value / 1000000}M VND` } } },
                        responsive: true,
                        maintainAspectRatio: false,
                    },
                }));
            }
        } catch (err) {
            console.error('Error fetching stats:', err);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    return (
        <Container className="mt-4">
            <h2 style={{ fontWeight: 'bold', color: '#188755' }}>Admin Dashboard</h2>
            <p>Ngày Giờ Hiện Tại {new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' })}</p>
            <Row className="g-3 mb-4">
                <Col md={3}>
                <Card className="text-center shadow-sm" style={{ background: '#01552e', borderRadius: '10px', padding: '15px' }}>
                <Card.Body style={{ color: '#ffffff' }}>
                            <FaUsers size={30} />
                            <Card.Title>Products</Card.Title>
                            <Card.Text className="fs-4">{stats.totalProducts}</Card.Text>
                            <Button as={Link} to="/admin/products" variant="outline-light" size="sm">Quản lý</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="text-center shadow-sm" style={{ background: '#01552e', borderRadius: '10px', padding: '15px' }}>
                        <Card.Body style={{ color: '#ffffff' }} >
                            <FaChalkboardTeacher size={30} />
                            <Card.Title>Đơn Hàng</Card.Title>
                            <Card.Text className="fs-4">{stats.totalOrders}</Card.Text>
                            <Button as={Link} to="/admin/orders" variant="outline-light" size="sm">Quản lý</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                <Card className="text-center shadow-sm" style={{ background: '#01552e', borderRadius: '10px', padding: '15px' }}>
                <Card.Body style={{ color: '#ffffff' }}>
                            <FaUserFriends size={30} />
                            <Card.Title>Người dùng</Card.Title>
                            <Card.Text className="fs-4">{stats.totalUsers}</Card.Text>
                            <Button as={Link} to="/admin/users" variant="outline-light" size="sm">Quản lý</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                <Card className="text-center shadow-sm" style={{ background: '#01552e', borderRadius: '10px', padding: '15px' }}>
                <Card.Body style={{ color: '#ffffff' }}>
                            <FaMoneyBillWave size={30} />
                            <Card.Title>Doanh Thu</Card.Title>
                            <Card.Text className="fs-4">{(stats.revenueTotal / 1000000).toFixed(1)}M VND</Card.Text>
                            <Button as={Link} to="/admin/orders" variant="outline-light" size="sm">Quản lý</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="g-4">
                <Col md={4}>
                    <Card className="shadow-sm" style={{ borderRadius: '10px' }}>
                        <Card.Body>
                            <Card.Title style={{ color: '#188755' }}>Thống Kê</Card.Title>
                            <div style={{ position: 'relative', height: '250px' }}>
                                <canvas id="productChart"></canvas>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="shadow-sm" style={{ borderRadius: '10px' }}>
                        <Card.Body>
                            <Card.Title style={{ color: '#188755' }}>Thống Kê Đơn Hàng</Card.Title>
                            <div style={{ position: 'relative', height: '250px' }}>
                                <canvas id="orderChart"></canvas>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="shadow-sm" style={{ borderRadius: '10px' }}>
                        <Card.Body>
                            <Card.Title style={{ color: '#188755' }}>Thống Kê Doanh Thu</Card.Title>
                            <div style={{ position: 'relative', height: '250px' }}>
                                <canvas id="revenueChart"></canvas>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col md={6}>
                    <Card className="shadow-sm" style={{ borderRadius: '10px' }}>
                        <Card.Body>
                            <Card.Title style={{ color: '#188755' }}>Top 5 Đơn Hàng</Card.Title>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>Mã Đơn Hàng #</th>
                                        <th>Tổng Giá (VND)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {topOrders.map((order) => {
                                        const parsedDate = parseVietnameseDate(order.orderDate);
                                        return (
                                            <tr key={order.id}>
                                                <td>{order.id || 'N/A'}</td>
                                                <td>{order.totalPrice ? order.totalPrice.toLocaleString('vi-VN') : 'N/A'}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mt-5">
                <Col>
                    <h4>Quick Actions</h4>
                    <div className="d-flex gap-3">
                        <Button as={Link} to="/admin/products" variant="outline-success" size="sm">Add New Product</Button>
                        <Button as={Link} to="/admin/orders" variant="outline-success" size="sm">View Recent Orders</Button>
                        <Button as={Link} to="/admin/users" variant="outline-success" size="sm">Manage Users</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default AdminDashboardPage;