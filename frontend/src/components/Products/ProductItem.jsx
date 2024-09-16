import PropTypes from "prop-types";
import { useContext } from "react";
import { CartContext } from "../context/CartProvider";
import "./productItem.css";
import { Link } from "react-router-dom";
import { message } from "antd";

const ProductItem = ({ productItem }) => {
  const { cartItems, addToCart } = useContext(CartContext);

  const filteredCart = cartItems.find(
    (cartItem) => cartItem._id === productItem._id
  );
  const originalPrice = productItem.price.current;
  const discountPercentage = productItem.price.discount;

  const discountedPrice =
    originalPrice - (originalPrice * discountPercentage) / 100;

  const handleAddToCart = () => {
    addToCart({
      ...productItem,
      price: discountedPrice,
    });
    message.success("Ürün sepete eklendi!");
  };
  return (
    <div className="product-item flex">
      <div className="product-image">
        <Link to={`/product/${productItem._id}`}>
          <img src={productItem.img} alt={productItem.name} className="img1" />
        </Link>
      </div>
      <div className="product-info">
        <Link to={`/product/${productItem._id}`} className="product-title">
          {productItem.name}
        </Link>
        <div className="product-prices">
          <strong className="new-price">${discountedPrice.toFixed(2)}</strong>
          <span className="old-price">${originalPrice.toFixed(2)}</span>
        </div>
        <span className="product-discount">-{discountPercentage}%</span>
        <div className="product-links">
          <button
            className="add-to-cart"
            onClick={handleAddToCart}
            disabled={!!filteredCart}
          >
            <i className="bi bi-basket-fill"></i>
          </button>
          <button>
            <i className="bi bi-heart-fill"></i>
          </button>
          <Link to={`/product/${productItem._id}`} className="product-link">
            <i className="bi bi-eye-fill"></i>
          </Link>
          <button>
            <i className="bi bi-share-fill"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  productItem: PropTypes.object.isRequired,
};

export default ProductItem;