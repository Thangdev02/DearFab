import React from 'react';
import ReactDOM from 'react-dom/client';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import App from './App';
import './styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </UserProvider>
  </React.StrictMode>
);