// React'in Fragment bileşenini ve gerekli hook'ları içe aktarır
import { Fragment, useEffect, useState } from "react";
// ProductDetails bileşenini içe aktarır
import ProductDetails from "../components/ProductDetails/ProductDetails";
// useParams hook'unu react-router-dom'dan içe aktarır
import { useParams } from "react-router-dom";

// ProductDetailsPage bileşeni tanımlanır
const ProductDetailsPage = () => {
  // singleProduct state'ini tanımlar ve başlangıç değerini null yapar
  const [singleProduct, setSingleProduct] = useState(null);
  // useParams hook'u ile URL'den productId parametresini alır
  const { id: productId } = useParams();
  // API URL'sini çevre değişkenlerinden alır
  const apiURL = import.meta.env.VITE_API_BASE_URL;

  // useEffect hook'u, bileşen yüklendiğinde ve productId değiştiğinde ürünü fetch eder
  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        // API'den tek bir ürünü fetch eder
        const response = await fetch(`${apiURL}/api/products/${productId}`);

        if (!response.ok) {
          throw new Error("Verileri getirme hatası");
        }

        const data = await response.json();
        // Ürünü state'e kaydeder
        setSingleProduct(data);
      } catch (error) {
        console.log("Veri hatası:", error);
      }
    };
    // Ürünü fetch eden fonksiyonu çağırır
    fetchSingleProduct();
  }, [apiURL, productId]);

  return (
    // Fragment kullanarak gereksiz DOM düğümlerini önler
    <Fragment>
      {singleProduct && ( // singleProduct tanımlıysa
        <Fragment>
          <ProductDetails
            singleProduct={singleProduct}
            setSingleProduct={setSingleProduct}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

// ProductDetailsPage bileşenini dışa aktarır, böylece bu bileşen diğer dosyalarda kullanılabilir
export default ProductDetailsPage;
