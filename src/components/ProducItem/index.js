import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { add } from "../../store/cartSlice";
import Carousel from "react-bootstrap/Carousel";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import "./index.css";
import Navigation from "../Navigation";

const ProductItem = () => {
  const location = useLocation();
  const product = location.state.data;
  const [counts, setCounts] = useState({ [product.id]: 1 }); // Initialize count for current product
  const dispatch = useDispatch();

  const onAddItem = () => {
    dispatch(add({ item: product, count: counts[product.id] }));
  };

  const handleIncrement = () => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [product.id]: prevCounts[product.id] + 1,
    }));
  };

  const handleDecrement = () => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [product.id]:
        prevCounts[product.id] <= 1 ? 1 : prevCounts[product.id] - 1,
    }));
  };

  return (
    <>
      <Navigation />
      <div className="prod-main-cont">
        <div className="carausal-conainer">
          <Carousel
            nextIcon={
              <BsChevronRight style={{ color: "grey", fontSize: "3em" }} />
            }
            prevIcon={
              <BsChevronLeft style={{ color: "grey", fontSize: "3em" }} />
            }
          >
            {product.images.map((item, index) => (
              <Carousel.Item key={index}>
                <img
                  className="product-image-crs"
                  src={item}
                  alt={`Slide ${index + 1}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <div className="prod-cont-container">
          <h1 className="head-pd-items">Product Details</h1>
          <p>
            Title : <span className="product-d-data">{product.title}</span>
          </p>
          <p>
            Price : <span className="product-d-data">$ {product.price}/-</span>
          </p>
          <p>
            Brand : <span className="product-d-data">{product.brand}</span>
          </p>
          <p>
            Rating :{" "}
            <span className="product-d-data rating">{product.rating}</span>
          </p>
          <p>
            stock : <span className="product-d-data">{product.stock}</span>
          </p>

          <p>Description : </p>
          <p className="prod-descript">
            <span className="product-d-data">{product.description}</span>
          </p>

          <div className="d-flex align-items-center justify-content-between">
            <button
              type="button"
              className="action-btns"
              onClick={handleDecrement}
            >
              -
            </button>
            <p>{counts[product.id]}</p>
            <button
              type="button"
              className="action-btns"
              onClick={handleIncrement}
            >
              +
            </button>
          </div>
          <button className="add-buttnon" onClick={onAddItem}>
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
