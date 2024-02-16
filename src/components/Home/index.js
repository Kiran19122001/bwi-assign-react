import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../Navigation";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import "./index.css";

const Home = () => {
  const [productsList, setProductsList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");

      const result = await response.json();
      setLoading(false);
      setProductsList(result.products);
      setFilteredProducts(result.products);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const onViewProduct = (product) => {
    navigate(`/products/${product.id}`, {
      state: { data: product },
    });
  };

  const handleFilter = () => {
    let filtered = productsList;

    if (searchTerm !== "") {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (minPrice !== "" && maxPrice !== "") {
      filtered = filtered.filter(
        (product) =>
          product.price >= parseFloat(minPrice) &&
          product.price <= parseFloat(maxPrice)
      );
    }

    setFilteredProducts(filtered);
  };

  return (
    <>
      <Navigation />
      <div className="main-home-container">
        <div className="sf-cont">
          <div className="price-range-container">
            <h4>Price range :</h4>
            <div className="d-flex align-items-center filter-conatiner">
              <select
                className="select-range"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              >
                <option value="">Min</option>
                <option value="0">0</option>
                <option value="100">100</option>
                <option value="500">500</option>
                <option value="1000">1000</option>
              </select>
              <p className="items-number">To</p>
              <select
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="select-range"
              >
                <option value="">Max</option>
                <option value="100">100</option>
                <option value="500">500</option>
                <option value="1000">1000</option>
                <option value="10000">10000+</option>
              </select>
            </div>
          </div>
          <div className="filter-container">
            <input
              type="search"
              placeholder="Search"
              className="searchInput"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <br />
            <button
              type="button"
              className="btn btn-primary m-5"
              onClick={handleFilter}
            >
              Apply Filters
            </button>
            <button
              type="button"
              className="btn btn-primary m-5"
              onClick={() => {
                setMinPrice("");
                setMaxPrice("");
                setSearchTerm("");
                setFilteredProducts(productsList);
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>
        {isLoading ? (
          <div>
            <p className="loading">Loading...</p>
          </div>
        ) : error ? (
          <div>
            <p className="loading">Failed to fetch products</p>
          </div>
        ) : (
          <ul className="parent-list-container">
            {filteredProducts.map((product) => (
              <li key={product.id} className="list-container">
                <Card
                  style={{
                    width: "25rem",
                    boxShadow: "0 0 10px 0px rgba(0,0,0.3)",
                  }}
                >
                  <Button
                    variant="Light"
                    onClick={() => onViewProduct(product)}
                  >
                    <Card.Img
                      variant="top"
                      src={
                        !product.images
                          ? product.images.find((item) =>
                              item.includes("thumbnail")
                            )
                          : product.thumbnail
                      }
                      className="product-image"
                    />
                    <Card.Body>
                      <Card.Title>{product.title}</Card.Title>
                      <Card.Title>Price : ${product.price}</Card.Title>
                      <Card.Text>
                        {product.description.length >= 40
                          ? product.description.slice(0, 40) + "..."
                          : product.description}
                      </Card.Text>
                    </Card.Body>
                  </Button>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Home;
