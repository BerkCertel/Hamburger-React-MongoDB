// React ve useContext hook'unu içe aktarır
import React, { useContext } from "react";
// Cart bileşenine stil uygulamak için gerekli CSS dosyasını içe aktarır
import "./cart.css";
// Diğer bileşenleri içe aktarır
import CartCoupon from "./CartCoupon";
import CartTable from "./CartTable";
import CartTotals from "./CartTotal";
// CartContext'i içe aktarır, alışveriş sepeti verilerini almak için kullanılır
import { CartContext } from "../context/CartProvider"; // Eğer CartContext başka bir dosyadaysa yolu güncelleyin.

// Cart bileşeni tanımlanır
const Cart = () => {
  // CartContext'ten cartItems'ı alır
  const { cartItems } = useContext(CartContext);
  return (
    // cart-page sınıfı ile stil uygulanan ana bölüm
    <section className="cart-page">
      <div className="container">
        {/* Eğer sepette ürün varsa */}
        {cartItems.length > 0 ? (
          <div className="cart-page-wrapper">
            <form className="cart-form">
              <div className="shop-table-wrapper">
                {/* Sepet tablosu bileşeni */}
                <CartTable />
                {/* Sepet kupon bileşeni */}
                <CartCoupon />
              </div>
            </form>
            <div className="cart-collaterals">
              {/* Sepet toplamları bileşeni */}
              <CartTotals />
            </div>
          </div>
        ) : (
          // Eğer sepette ürün yoksa gösterilecek mesaj
          <h2>Sepette hiç ürün yok!</h2>
        )}
      </div>
    </section>
  );
};

// Cart bileşenini dışa aktarır, böylece bu bileşen diğer dosyalarda kullanılabilir
export default Cart;
