// React ve gerekli hook'ları içe aktarır
import { useEffect, useState, useContext } from "react";
// useParams hook'unu react-router-dom'dan içe aktarır
import { useParams } from "react-router-dom";
// ProductItem bileşenini içe aktarır
import ProductItem from "./ProductItem";
// Products bileşenine stil uygulamak için gerekli CSS dosyasını içe aktarır
import "./products.css";
// Ant Design kütüphanesinden mesaj bileşenini içe aktarır
import { message } from "antd";
// CartContext'i içe aktarır, alışveriş sepeti verilerini almak için kullanılır
import { CartContext } from "../context/CartProvider";

// Products bileşeni tanımlanır
const Products = () => {
  // products state'ini tanımlar ve başlangıç değerini boş bir dizi olarak ayarlar
  const [products, setProducts] = useState([]);
  // useParams hook'u ile URL'den categoryId parametresini alır
  const { categoryId } = useParams();
  // CartContext'ten cartItems ve setCartItems'ı alır
  const { cartItems, setCartItems } = useContext(CartContext);
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
          console.log("Products fetched:", data);
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

  // categoryId varsa, ilgili kategorinin ürünlerini filtreler
  const filteredProducts = categoryId
    ? products.filter(product => product.categoryId === categoryId)
    : products;

  return (
    // products bölümünü oluşturur
    <section className="products">
      <div className="container">
        <div className="section-title">
          <h2>Ürünlerimiz1234</h2>
        </div>
        <div className="product-wrapper product-carousel flex wrap">
          {/* Filtrelenmiş ürünleri listeler */}
          {filteredProducts.map((product) => (
            <ProductItem productItem={product} key={product._id} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Products bileşenini dışa aktarır, böylece bu bileşen diğer dosyalarda kullanılabilir
export default Products;
