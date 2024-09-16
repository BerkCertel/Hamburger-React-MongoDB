// React, useEffect ve useState hook'larını içe aktarır
import React, { useEffect, useState } from "react";
// Ant Design kütüphanesinden mesaj bileşenini içe aktarır
import { message } from "antd";
// useNavigate hook'unu react-router-dom'dan içe aktarır
import { useNavigate } from "react-router-dom";
// CategoryItem bileşenini içe aktarır
import CategoryItem from "./CategoryItem";
// Categories bileşenine stil uygulamak için gerekli CSS dosyasını içe aktarır
import "./categories.css";

// Categories bileşeni tanımlanır
const Categories = () => {
  // categories state'ini tanımlar ve başlangıç değerini boş bir dizi olarak ayarlar
  const [categories, setCategories] = useState([]);
  // API URL'sini çevre değişkenlerinden alır
  const apiURL = import.meta.env.VITE_API_BASE_URL;
  // navigate fonksiyonunu kullanmak için useNavigate hook'unu çağırır
  const navigate = useNavigate();

  // useEffect hook'u, bileşen yüklendiğinde kategorileri fetch eder
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // API'den kategorileri fetch eder
        const response = await fetch(`${apiURL}/api/categories`);
        if (response.ok) {
          const data = await response.json();
          // Kategorileri state'e kaydeder
          setCategories(data);
          console.log("Categories fetched:", data);
        } else {
          const errorData = await response.json(); // Hata mesajını al
          message.error(
            `Veri getirtme başarısız: ${errorData.message || response.statusText}`
          );
        }
      } catch (error) {
        console.error("Veri getirtme hatası:", error);
        message.error(
          "Veri getirtme sırasında bir hata oluştu. Lütfen tekrar deneyin."
        );
      }
    };

    // Kategorileri fetch eden fonksiyonu çağırır
    fetchCategories();
  }, [apiURL]);

  // Bir kategori seçildiğinde çalışacak fonksiyon
  const handleCategorySelect = (categoryId) => {
    // Seçilen kategoriye ait ürünler sayfasına yönlendirir
    navigate(`/products/${categoryId}`);
  };

  return (
    // categories bölümünü oluşturur
    <section className="categories">
      <div className="container">
        <div className="section-title">
          <h2>Kategoriler</h2>
        </div>
        <ul className="category-list">
          {/* Kategorileri listeleyen bileşen */}
          {categories.map((category) => (
            <CategoryItem
              key={category._id}
              category={category}
              onSelectCategory={handleCategorySelect}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

// Categories bileşenini dışa aktarır, böylece bu bileşen diğer dosyalarda kullanılabilir
export default Categories;
