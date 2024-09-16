// useContext ve useState hook'larını React'ten içe aktarır
import { useContext, useState } from "react";
// useNavigate hook'unu react-router-dom'dan içe aktarır
import { useNavigate } from "react-router-dom"; // useHistory yerine useNavigate kullanılır
// CartContext'i içe aktarır, alışveriş sepeti verilerini almak için kullanılır
import { CartContext } from "../context/CartProvider";
// Ant Design kütüphanesinden mesaj bileşenini içe aktarır
import { message } from "antd";

// CartTotals bileşeni tanımlanır
const CartTotals = () => {
  // fastCargoChecked state'ini tanımlar ve başlangıç değerini false yapar
  const [fastCargoChecked, setFastCargoChecked] = useState(false);
  // CartContext'ten cartItems ve clearCart fonksiyonunu alır
  const { cartItems, clearCart } = useContext(CartContext);
  // Kullanıcı bilgilerini localStorage'dan alır
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  // useNavigate hook'unu kullanarak navigate fonksiyonunu alır
  const navigate = useNavigate();
  // email state'ini tanımlar ve başlangıç değerini kullanıcının e-posta adresi yapar
  const [email, setEmail] = useState(user ? user.email : "");

  // Sepet öğelerinin toplamlarını hesaplar
  const cartItemTotals = cartItems.map((item) => {
    const itemTotal = item.price * item.quantity;
    return itemTotal;
  });

  // Alt toplamı hesaplar
  const subTotals = cartItemTotals.reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
  }, 0);

  // Kargo ücreti
  const cargoFee = 15;

  // Toplam tutarı hesaplar, hızlı kargo seçildiyse kargo ücreti eklenir
  const cartTotals = fastCargoChecked
    ? (subTotals + cargoFee).toFixed(2)
    : subTotals.toFixed(2);

  // Ödeme işlemini gerçekleştiren fonksiyon
  const handlePayment = async () => {
    if (!user) {
      return message.info("Ödeme yapabilmek için giriş yapmalısınız!");
    }

    const body = {
      products: cartItems,
      user: user,
      cargoFee: fastCargoChecked ? cargoFee : 0,
    };

    try {
      clearCart();
      const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
      const newOrder = {
        order: cartTotals,
        email: user.email,
        orderDate: new Date().toISOString() // Sipariş tarihini ekler
      };
      savedOrders.push(newOrder);
      localStorage.setItem("orders", JSON.stringify(savedOrders));
      message.success("Ödeme başarılı! Sepetiniz temizlendi.");
      navigate("/success");
    } catch (error) {
      message.error("Ödeme işlemi sırasında bir hata oluştu.");
    }
  };

  return (
    <div className="cart-totals">
      <h2>Sepet Toplamları</h2>
      <table>
        <tbody>
          <tr className="cart-subtotal">
            <th>Ara Toplam</th>
            <td>
              <span id="subtotal">${subTotals.toFixed(2)}</span>{" "}
            </td>
          </tr>
          <tr>
            <th>Kargo</th>
            <td>
              <ul>
                <li>
                  <label>
                    Hızlı Kargo: $15.00
                    <input
                      type="checkbox"
                      id="fast-cargo"
                      checked={fastCargoChecked}
                      onChange={() => setFastCargoChecked(!fastCargoChecked)}
                    />{" "}
                  </label>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <th>Toplam</th>
            <td>
              <strong id="cart-total">${cartTotals}</strong>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="checkout">
        <button className="btn btn-lg" onClick={handlePayment}>
          Ödemeye Devam Et
        </button>{" "}
      </div>
    </div>
  );
};

// CartTotals bileşenini dışa aktarır, böylece bu bileşen diğer dosyalarda kullanılabilir
export default CartTotals;
