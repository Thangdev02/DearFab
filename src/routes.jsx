import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrderPage from './pages/OrderPage';

const routes = [
  { path: '/', element: <HomePage /> },
  { path: '/products', element: <ProductsPage /> },
  { path: '/product/:id', element: <ProductDetailPage /> },
  { path: '/cart', element: <CartPage /> },
  { path: '/checkout', element: <CheckoutPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/login', element: <LoginPage /> },
  { path:'/order', element: < OrderPage />},
  { path: '/order-confirmation', element: <OrderConfirmationPage /> },
];

export default routes;