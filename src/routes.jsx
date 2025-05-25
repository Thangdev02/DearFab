import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrderPage from './pages/OrderPage';
import ProductManagementPage from './pages/admin/ProductManagementPage';
import AdminLayout from './components/admin/adminLayouts';
import OrderManagement from './pages/admin/OrderManagement';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import UserManagementPage from './pages/admin/UserManagementPage';
import AboutUsPage from './pages/AboutUsPage';

// Placeholder for other admin pages

const routes = [
  { path: '/', element: <HomePage /> },
  { path: '/products', element: <ProductsPage /> },
  { path: '/product/:id', element: <ProductDetailPage /> },
  { path: '/cart', element: <CartPage /> },
  { path: '/checkout', element: <CheckoutPage /> },
  { path: '/about', element: <AboutUsPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/order', element: <OrderPage /> },
  { path: '/order-confirmation', element: <OrderConfirmationPage /> },
  
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { path: '', element: <AdminDashboardPage /> }, // /admin
      { path: 'products', element: <ProductManagementPage /> }, // /admin/products
      { path: 'orders', element: <OrderManagement /> }, // /admin/orders
      { path: 'users', element: <UserManagementPage /> }, // /admin/users
    ],
  },
];

export default routes;