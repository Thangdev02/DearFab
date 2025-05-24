import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScrollReveal from 'scrollreveal';
import NavBar from './components/common/NavBar';
import Footer from './components/common/Footer';
import routes from './routes';
import { CartProvider } from './context/CartContext'; // Giả sử bạn đã có context này
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
          <NavBar onCartClick={handleShowCart} /> {/* Truyền prop để mở giỏ hàng từ NavBar */}
          
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>

          <Footer />

          {/* Sidebar giỏ hàng */}
          <CartSidebar show={showCart} handleClose={handleCloseCart} />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
