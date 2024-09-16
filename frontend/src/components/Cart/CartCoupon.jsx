// Ant Design kütüphanesinden mesaj bileşenini içe aktarır
import { message } from "antd";
// useContext, useState ve useEffect hook'larını içe aktarır
import { useContext, useState, useEffect } from "react";
// CartContext'i içe aktarır, alışveriş sepeti verilerini almak için kullanılır
import { CartContext } from "../context/CartProvider";

// CartCoupon bileşeni tanımlanır
const CartCoupon = () => {
  // couponCode ve isCouponApplied state'lerini tanımlar
  const [couponCode, setCouponCode] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  // CartContext'ten cartItems ve setCartItems'ı alır
  const { cartItems } = useContext(CartContext);
  const { setCartItems } = useContext(CartContext); // Ayrı satırlara alındı
  // API URL'sini çevre değişkenlerinden alır
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  // useEffect hook'u, bileşen yüklendiğinde kaydedilmiş kupon bilgilerini alır
  useEffect(() => {
    const savedCouponApplied = localStorage.getItem("isCouponApplied");
    if (savedCouponApplied) {
      setIsCouponApplied(JSON.parse(savedCouponApplied));
    }
  }, []);

  // Kuponu uygulayan fonksiyon
  const applyCoupon = async () => {
    if (isCouponApplied) {
      return message.warning("Kupon kodu zaten uygulandı.");
    }

    if (couponCode.trim().length === 0) {
      return message.warning("Boş değer girilimez.");
    }

    try {
      const res = await fetch(`${apiUrl}/api/coupons/code/${couponCode}`);

      if (!res.ok) {
        return message.warning("Girdiğiniz kupon kodu yanlış!");
      }

      const data = await res.json();
      const discountPercent = data.discountPercent;

      const updatedCartItems = cartItems.map((item) => {
        const updatePrice = item.price * (1 - discountPercent / 100);
        return { ...item, price: updatePrice };
      });

      setCartItems(updatedCartItems);
      setIsCouponApplied(true);
      localStorage.setItem("isCouponApplied", true);

      message.success(`${couponCode} kupon kodu başarıyla uygulandı.`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="actions-wrapper">
      <div className="coupon">
        <input
          type="text"
          className="input-text"
          placeholder="Kupon kodu"
          onChange={(e) => setCouponCode(e.target.value)}
          value={couponCode}
          disabled={isCouponApplied}
        />
        <button className="btn" type="button" onClick={applyCoupon} disabled={isCouponApplied}>
          Kuponu Uygula
        </button>
      </div>
    </div>
  );
};

// CartCoupon bileşenini dışa aktarır, böylece bu bileşen diğer dosyalarda kullanılabilir
export default CartCoupon;
