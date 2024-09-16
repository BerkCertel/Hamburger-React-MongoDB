// Info bileşenini içe aktarır
import Info from "./Info/Info";
// PropTypes kütüphanesini içe aktarır, bileşen propslarının türlerini tanımlamak için kullanılır
import PropTypes from "prop-types";
// Gallery bileşenini içe aktarır
import Gallery from "./Gallery/Gallery";
// ProductDetails bileşenine stil uygulamak için gerekli CSS dosyasını içe aktarır
import "./productDetails.css";

// ProductDetails bileşeni tanımlanır, singleProduct ve setSingleProduct props'unu alır
const ProductDetails = ({ singleProduct, setSingleProduct }) => {
  return (
    // single-product sınıfı ile stil uygulanan ana bölüm
    <section className="single-product">
      <div className="container">
        <div className="single-product-wrapper">
          <div className="single-content">
            <main className="site-main">
              {/* Gallery bileşeni, singleProduct props'u ile çağrılır */}
              <Gallery singleProduct={singleProduct} />
              {/* Info bileşeni, singleProduct props'u ile çağrılır */}
              <Info singleProduct={singleProduct} />
            </main>
          </div>
        </div>
      </div>
    </section>
  );
};

// PropTypes tanımlaması, singleProduct'ın bir nesne ve setSingleProduct'ın bir fonksiyon olmasını zorunlu kılar
ProductDetails.propTypes = {
  singleProduct: PropTypes.object,
  setSingleProduct: PropTypes.func,
};

// ProductDetails bileşenini dışa aktarır, böylece bu bileşen diğer dosyalarda kullanılabilir
export default ProductDetails;
