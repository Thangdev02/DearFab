import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScrollReveal from 'scrollreveal';
import NavBar from './components/common/NavBar';
import Footer from './components/common/Footer';
import routes from './routes';
import { CartProvider } from './context/CartContext';
import CartSidebar from './pages/CartPage';

ScrollReveal().reveal('.reveal', {
  delay: 200,
  distance: '50px',
  duration: 1000,
  easing: 'ease-in-out',
});

function App() {
  const [showCart, setShowCart] = useState(false);

  const handleCloseCart = () => setShowCart(false);
  const handleShowCart = () => setShowCart(true);

  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  // Wrap non-admin routes with NavBar and Footer
                  route.path === '/admin' || route.path.startsWith('/admin/') ? (
                    route.element
                  ) : (
                    <>
                      <NavBar onCartClick={handleShowCart} />
                      {route.element}
                      <Footer />
                    </>
                  )
                }
              >
                {/* Handle nested routes for admin */}
                {route.children &&
                  route.children.map((childRoute) => (
                    <Route
                      key={childRoute.path}
                      path={childRoute.path}
                      element={childRoute.element}
                    />
                  ))}
              </Route>
            ))}
          </Routes>

          {/* Sidebar giỏ hàng */}
          <CartSidebar show={showCart} handleClose={handleCloseCart} />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;