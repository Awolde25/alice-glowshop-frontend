import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import logo from "./assets/logo.png";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [cart, setCart] = useState([]);
  const handleCheckout = () => {
    alert("Thank you for your purchase!");
    setCart([]);
  };

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <BrowserRouter>
      <Navbar cart={cart} />
      <div className="container mt-4">
        <Routes>
          <Route
            path="/"
            element={
              <div className="text-center my-5">
                <h1 className="display-4 fw-bold text-primary text-shadow">
                  Alice GlowShop
                </h1>
                <img
                  src={logo}
                  alt="Alice GlowShop Logo"
                  width="150"
                  className="my-3"
                />
                <p className="lead">Welcome to your makeup & beauty store!</p>

                <img
                  src="https://www.nuvoledibellezza.com/wp-content/uploads/2023/10/huda-beauty-pretty-grunge-palette-01-e1697366961257.jpg"
                  alt="Makeup Banner"
                  className="img-fluid rounded"
                />
              </div>
            }
          />
          <Route
            path="/products"
            element={
              <Products cart={cart} setCart={setCart} addToCart={addToCart} />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                setCart={setCart}
                handleCheckout={handleCheckout}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
