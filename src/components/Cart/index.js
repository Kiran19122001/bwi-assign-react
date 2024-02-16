import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { decrement, increment, remove } from "../../store/cartSlice";
import "./index.css";
import Navigation from "../Navigation";

const Cart = () => {
  const products = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onDecrement = (productId) => {
    dispatch(decrement(productId));
  };

  const onIncrease = (productId) => {
    dispatch(increment(productId));
  };

  const onRemove = (id) => {
    dispatch(remove(id));
  };

  // Calculate total order amount
  const totalOrderAmount = products.reduce(
    (total, product) => total + product.count * product.price,
    0
  );

  return (
    <>
      <Navigation />
      <div style={{ paddingBottom: "50px" }}>
        <ul className="d-flex justify-content-center align-items-center flex-wrap mt-5 ">
          {products.map((product) => (
            <li key={product.id} className="cart-list-item">
              <div className="d-flex align-items-center">
                <img
                  src={
                    product.images
                      ? product.images.find((item) =>
                          item.includes("thumbnail")
                        )
                      : product.thumbnail
                  }
                  alt="thumbnail"
                  className="cart-image"
                />{" "}
                <div className="title-cart px-3">
                  <h4> {product.title}</h4>
                  <p>by {product.brand}</p>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <button
                  type="button"
                  className="action-btns"
                  onClick={() => onDecrement(product.id)}
                >
                  -
                </button>
                <p className="items-number">{product.count}</p>{" "}
                {/* Display product count */}
                <button
                  type="button"
                  className="action-btns"
                  onClick={() => onIncrease(product.id)}
                >
                  +
                </button>
              </div>
              <p className="total-amount-item">
                ${product.count * product.price}/-
              </p>
              <button
                className="btn btn-danger"
                type="button"
                onClick={() => onRemove(product.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        {products.length === 0 ? (
          <div className="d-flex flex-column justify-content-center align-items-center">
            <p className="loading">No items in the cart</p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate("/")}
            >
              Shop Now
            </button>
          </div>
        ) : (
          <div className="order-container">
            <h3>Order total : ${totalOrderAmount}/-</h3>
            <p>
              <span className="fw-bold">{products.length}</span> items in the
              cart
            </p>
            <button type="button" className="btn btn-primary">
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
