// React ve gerekli hook'ları içe aktarır
import { useEffect, useState } from "react";
// ProductItem bileşenini içe aktarır
import ProductItem from "./ProductItem";
// react-slick kütüphanesinden Slider bileşenini içe aktarır
import Slider from "react-slick";
// PropTypes kütüphanesini içe aktarır, bileşen propslarının türlerini tanımlamak için kullanılır
import PropTypes from "prop-types";
// FeaturedProducts bileşenine stil uygulamak için gerekli CSS dosyasını içe aktarır
import "./products.css";
// Ant Design kütüphanesinden mesaj bileşenini içe aktarır
import { message } from "antd";

// Slider için ileri buton bileşeni tanımlanır
function NextBtn({ onClick }) {
  return (
    <button className="glide__arrow glide__arrow--right" onClick={onClick}>
      <i className="bi bi-chevron-right"></i>
    </button>
  );
}

// NextBtn bileşeni için PropTypes tanımlanır
NextBtn.propTypes = {
  onClick: PropTypes.func,
};

// Slider için geri buton bileşeni tanımlanır
function PrevBtn({ onClick }) {
  return (
    <button className="glide__arrow glide__arrow--left" onClick={onClick}>
      <i className="bi bi-chevron-left"></i>
    </button>
  );
}

// PrevBtn bileşeni için PropTypes tanımlanır
PrevBtn.propTypes = {
  onClick: PropTypes.func,
};

// FeaturedProducts bileşeni tanımlanır
const FeaturedProducts = () => {
  // products state'ini tanımlar ve başlangıç değerini boş bir dizi olarak ayarlar
  const [products, setProducts] = useState([]);

  // API URL'sini çevre değişkenlerinden alır
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  // useEffect hook'u, bileşen yüklendiğinde ürünleri fetch eder
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // API'den ürünleri fetch eder
        const response = await fetch(`${apiUrl}/api/products`);

        if (response.ok) {
          const data = await response.json();
          // Ürünleri state'e kaydeder
          setProducts(data);
        } else {
          message.error("Veri getirme başarısız.");
        }
      } catch (error) {
        console.log("Veri hatası:", error);
      }
    };
    // Ürünleri fetch eden fonksiyonu çağırır
    fetchProducts();
  }, [apiUrl]);

  // Alışveriş sepeti state'ini tanımlar ve başlangıç değerini boş bir dizi olarak ayarlar
  const [cartItems, setCartItems] = useState([]);
  console.log(cartItems.length);

  // Slider bileşeni için ayarları tanımlar
  const sliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
    autoplaySpeed: 3000,
    autoplay: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    // products bölümünü oluşturur
    <section className="products">
      <div className="container">
        <div className="section-title">
          <h2>Öne Çıkarılanlar</h2>
        </div>
        <div className="product-wrapper product-carousel">
          {/* Slider bileşeni ile ürünleri gösterir */}
          <Slider {...sliderSettings}>
            {products.map((product) => (
              <ProductItem productItem={product} key={product._id} />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

// FeaturedProducts bileşenini dışa aktarır, böylece bu bileşen diğer dosyalarda kullanılabilir
export default FeaturedProducts;
