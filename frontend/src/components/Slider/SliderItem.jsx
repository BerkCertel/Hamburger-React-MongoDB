// Link bileşenini react-router-dom'dan içe aktarır
import { Link } from "react-router-dom";
// SliderItem bileşenine stil uygulamak için gerekli CSS dosyasını içe aktarır
import "./slider.css";
// PropTypes kütüphanesini içe aktarır, bileşen propslarının türlerini tanımlamak için kullanılır
import PropTypes from "prop-types";

// SliderItem bileşeni tanımlanır, imageSrc props'u alır
const SliderItem = ({ imageSrc }) => {
  return (
    <div>
      <div className="slider-item fade">
        {/* Slayt görüntüsü */}
        <div className="slider-image">
          <img src={imageSrc} className="img-fluid" alt="" />
        </div>
        {/* Slayt içeriği */}
        <div className="container">
          <p className="slider-title">Burger Mevsimi</p>
          <h2 className="slider-heading">70% İndirimi Kaçırma</h2>
          {/* Keşfet butonu, shop sayfasına yönlendirir */}
          <Link to="/shop" className="btn btn-lg btn-primary">
            Keşfet
          </Link>
        </div>
      </div>
    </div>
  );
};

// SliderItem bileşenini dışa aktarır, böylece bu bileşen diğer dosyalarda kullanılabilir
export default SliderItem;

// PropTypes tanımlaması: imageSrc string türünde olmalıdır
SliderItem.propTypes = {
  imageSrc: PropTypes.string,
};
