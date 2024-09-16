// React kütüphanesini içe aktarır
import React from "react";
// Slider bileşenini içe aktarır
import Slider from "../components/Slider/Slider";
// Categories bileşenini içe aktarır
import Categories from "../components/Categories/Categories";
// FeaturedProduct bileşenini içe aktarır, buradaki isim Products olarak değiştirilmiş
import FeaturedProducts from "../components/Products/FeaturedProduct";
// CampaignSingle bileşenini içe aktarır
import CampaignSingle from "../components/CampaignSingle/CampaignSingle";

// HomePage bileşeni tanımlanır
export const HomePage = () => {
  return (
    // React.Fragment kullanarak gereksiz DOM düğümlerini önler
    <React.Fragment>
      {/* Slider bileşeni */}
      <Slider />
      {/* Categories bileşeni */}
      <Categories />
      {/* FeaturedProducts bileşeni */}
      <FeaturedProducts />
      {/* CampaignSingle bileşeni */}
      <CampaignSingle />
    </React.Fragment>
  );
};
