import React, { useEffect, useState } from "react";

const Products = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL);

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Fetch failed:", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

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
    <div>
      <h2 className="text-center mb-4">Our Products</h2>

      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-3 mb-4">
            <div className="card h-100 text-center p-2">
              <img
                src={product.image}
                alt={product.name}
                className="card-img-top"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  margin: "auto",
                  paddingTop: "10px",
                }}
              />

              <div className="card-body">
                <h5 style={{ fontSize: "16px", fontWeight: "bold" }}>
                  {product.name}
                </h5>

                <p style={{ fontSize: "14px", fontWeight: "500" }}>
                  ${product.price}
                </p>

                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
