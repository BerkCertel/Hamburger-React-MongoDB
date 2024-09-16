// React kütüphanesini içe aktarır
import React from "react";
// Categories bileşenini içe aktarır
import Categories from "../components/Categories/Categories";
// Products bileşenini içe aktarır
import Products from "../components/Products/Products";

// ShopPage bileşeni tanımlanır
export const ShopPage = () => {
  return (
    // React.Fragment kullanarak gereksiz DOM düğümlerini önler
    <React.Fragment>
      {/* Categories bileşenini çağırır */}
      <Categories />
      {/* Products bileşenini çağırır */}
      <Products />
    </React.Fragment>
  );
};

// ShopPage bileşenini dışa aktarır, böylece bu bileşen diğer dosyalarda kullanılabilir
export default ShopPage;
