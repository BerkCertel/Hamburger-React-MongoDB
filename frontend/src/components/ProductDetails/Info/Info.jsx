// PropTypes kütüphanesini içe aktarır, bileşen propslarının türlerini tanımlamak için kullanılır
import PropTypes from "prop-types";
// Info bileşenine stil uygulamak için gerekli CSS dosyasını içe aktarır
import "./info.css";
// useContext ve useRef hook'larını içe aktarır
import { useContext, useRef } from "react";
// CartContext'i içe aktarır, alışveriş sepeti verilerini almak için kullanılır
import { CartContext } from "../../../components/context/CartProvider";

// Info bileşeni tanımlanır, singleProduct props'unu alır
const Info = ({ singleProduct }) => {
  // quantityRef referansını oluşturur
  const quantityRef = useRef();
  // CartContext'ten addToCart ve cartItems'ı alır
  const { addToCart, cartItems } = useContext(CartContext);

  // Ürünün orijinal fiyatını alır
  const originalPrice = singleProduct.price.current;
  // Ürünün indirim yüzdesini alır
  const discountPercentage = singleProduct.price.discount;
  // İndirimli fiyatı hesaplar
  const discountedPrice =
    originalPrice - (originalPrice * discountPercentage) / 100;

  // Sepetteki ürünleri kontrol eder, eğer mevcut ürün sepette varsa filteredCard true döner
  const filteredCard = cartItems.find(
    (cartItem) => cartItem._id === singleProduct._id
  );
  console.log(singleProduct);

  return (
    // product-info sınıfı ile stil uygulanan ana div
    <div className="product-info">
      {/* Ürün başlığı */}
      <h1 className="product-title">{singleProduct.name}</h1>

      {/* Ürün fiyatı */}
      <div className="product-price">
        <s className="old-price">${singleProduct.price.current.toFixed(2)}</s>
        <strong className="new-price">${discountedPrice.toFixed(2)}</strong>
      </div>

      {/* Ürün açıklaması */}
      <div
        className="product-description"
        dangerouslySetInnerHTML={{ __html: singleProduct.description }}
      ></div>

      {/* Ürün varyasyonları formu */}
      <form className="variations-form">
        <div className="variations">
          <div className="cart-button">
            {/* Miktar giriş alanı */}
            <input
              type="number"
              defaultValue="1"
              min="1"
              id="quantity"
              ref={quantityRef}
            />
            {/* Sepete ekle butonu */}
            <button
              className="btn btn-lg btn-primary"
              id="add-to-cart"
              type="button"
              disabled={filteredCard} // Ürün sepetteyse buton devre dışı bırakılır
              onClick={() =>
                addToCart({
                  ...singleProduct,
                  price: discountedPrice,
                  quantity: parseInt(quantityRef.current.value),
                })
              }
            >
              Add to cart
            </button>
          </div>

          {/* Ekstra ürün butonları */}
          <div className="product-extra-buttons">
            <a href="#">
              <i className="bi bi-heart"></i>
              <span>Add to Wishlist</span>
            </a>
            <a href="#">
              <i className="bi bi-share"></i>
              <span>Share this Product</span>
            </a>
          </div>
        </div>
      </form>
      <div className="divider"></div>
    </div>
  );
};

// Info.propTypes tanımlaması, singleProduct'ın bir nesne olmasını zorunlu kılar
Info.propTypes = {
  singleProduct: PropTypes.object,
};

// Info bileşenini dışa aktarır, böylece bu bileşen diğer dosyalarda kullanılabilir
export default Info;
