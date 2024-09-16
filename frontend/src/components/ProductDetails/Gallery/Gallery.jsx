// useState ve useEffect hook'larını React'ten içe aktarır
import { useState, useEffect } from "react";
// PropTypes kütüphanesini içe aktarır, bileşen propslarının türlerini tanımlamak için kullanılır
import PropTypes from "prop-types";
// Gallery bileşenine stil uygulamak için gerekli CSS dosyasını içe aktarır
import "./gallery.css";

// Gallery bileşeni tanımlanır, singleProduct props'unu alır
function Gallery({ singleProduct }) {
  // singleImage state'ini tanımlar ve başlangıç değerini null yapar
  const [singleImage, setSingleImage] = useState(null);

  // useEffect hook'u, singleProduct değiştiğinde çalışır
  useEffect(() => {
    if (singleProduct) {
      // singleProduct var ise, singleImage state'ini günceller
      setSingleImage({
        img: singleProduct.img,
        imgIndex: 0,
      });
    }
  }, [singleProduct]);

  return (
    // Galeri bileşeninin ana div'i
    <div className="product-gallery">
      {/* Tek bir görüntü wrapper'ı */}
      <div className="single-image-wrapper">
        {/* singleImage var ise, görüntüyü gösterir */}
        {singleImage && <img src={singleImage.img} id="image" alt="" />}
      </div>
    </div>
  );
}

// Gallery.propTypes tanımlaması, singleProduct'ın bir nesne olmasını zorunlu kılar
Gallery.propTypes = {
  singleProduct: PropTypes.object.isRequired,
};

// Gallery bileşenini dışa aktarır, böylece bu bileşen diğer dosyalarda kullanılabilir
export default Gallery;
