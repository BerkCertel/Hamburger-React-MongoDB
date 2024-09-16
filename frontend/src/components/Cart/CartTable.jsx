// useContext hook'unu React'ten içe aktarır
import { useContext } from "react";
// CartItem bileşenini içe aktarır
import CartItem from "./CartItem";
// CartContext'i içe aktarır, alışveriş sepeti verilerini almak için kullanılır
import { CartContext } from "../context/CartProvider";

// CartTable bileşeni tanımlanır
const CartTable = () => {
  // CartContext'ten cartItems'ı alır
  const { cartItems } = useContext(CartContext);

  return (
    // Alışveriş sepeti tablosu
    <table className="shop-table">
      <thead>
        <tr>
          {/* Boş hücre */}
          <th className="product-thumbnail">&nbsp;</th>
          <th className="product-thumbnail">&nbsp;</th>
          {/* Ürün adı sütunu */}
          <th className="product-name">Ürün</th>
          {/* Ürün fiyatı sütunu */}
          <th className="product-price">Fiyat</th>
          {/* Ürün miktarı sütunu */}
          <th className="product-quantity">Miktar</th>
          {/* Ürün ara toplam sütunu */}
          <th className="product-subtotal">Ara Toplam</th>
        </tr>
      </thead>
      <tbody className="cart-wrapper">
        {/* Sepet öğelerini listeler */}
        {cartItems.map((item) => (
          <CartItem cartItem={item} key={item._id} />
        ))}
      </tbody>
    </table>
  );
};

// CartTable bileşenini dışa aktarır, böylece bu bileşen diğer dosyalarda kullanılabilir
export default CartTable;
