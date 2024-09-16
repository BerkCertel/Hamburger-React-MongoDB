// React kütüphanesini içe aktarır
import React from "react";
// CategoryItem bileşenine stil uygulamak için gerekli CSS dosyasını içe aktarır
import "./categoryItem.css";
// PropTypes kütüphanesini içe aktarır, bileşen propslarının türlerini tanımlamak için kullanılır
import PropTypes from "prop-types";

// CategoryItem bileşeni tanımlanır, category ve onSelectCategory props'larını alır
const CategoryItem = ({ category, onSelectCategory }) => {
  return (
    // category-item sınıfı ile stil uygulanır ve kategori seçimi için onClick olayı tanımlanır
    <li className="category-item" onClick={() => onSelectCategory(category._id)}>
      <a href="">
        {/* Kategori görüntüsü */}
        <img src={category.img} alt="" className="category-image" />
        {/* Kategori başlığı */}
        <span className="category-title">{category.name}</span>
      </a>
    </li>
  );
};

// PropTypes tanımlaması: category nesne türünde ve gerekli, onSelectCategory fonksiyon türünde ve gerekli
CategoryItem.propTypes = {
  category: PropTypes.object.isRequired,
  onSelectCategory: PropTypes.func.isRequired,
};

// CategoryItem bileşenini dışa aktarır, böylece bu bileşen diğer dosyalarda kullanılabilir
export default CategoryItem;
