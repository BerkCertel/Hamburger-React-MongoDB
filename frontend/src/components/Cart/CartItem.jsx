import PropTypes from "prop-types";
import { useContext } from "react";
import { CartContext } from "../context/CartProvider";
import { IoMdCloseCircle } from "react-icons/io";


const CartItem = ({ cartItem }) => {
  const { removeFromCart } = useContext(CartContext);

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);

    // Sepetten bir öğe kaldırıldığında güncellenmiş sepet verilerini locale kaydedin
    const updatedCartItems = JSON.stringify(cartItems);
    localStorage.setItem("cartItems", updatedCartItems);
  };

  return (
    <tr className="cart-item">
      <td></td>
      <td className="cart-image">
        <img src={cartItem.img} alt="" />{" "}
        <IoMdCloseCircle
          style={{
            top: "0",
            position: "absolute",
            left: "-10",
            fontSize: "20px",
            color: "red",
            cursor: "pointer",
            background:"black",
            borderRadius:"100%"
          }}
          onClick={() => handleRemoveFromCart(cartItem.id)} // handleRemoveFromCart fonksiyonunu kullanın
        />
      </td>
      <td>{cartItem.name}</td>
      <td>${cartItem.price.toFixed(2)}</td>{" "}
      <td className="product-quantity">{cartItem.quantity}</td>
      <td className="product-subtotal">
        ${(cartItem.price * cartItem.quantity).toFixed(2)}
      </td>
    </tr>
  );
};

export default CartItem;
CartItem.propTypes = {
  cartItem: PropTypes.object,
};
