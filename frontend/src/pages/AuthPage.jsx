// React kütüphanesini içe aktarır
import React from "react";
// Auth bileşenini içe aktarır
import Auth from "../components/Auth/Auth";

// AuthPage bileşeni tanımlanır
const AuthPage = () => {
  return (
    // React.Fragment kullanarak gereksiz DOM düğümlerini önler
    <React.Fragment>
      {/* Auth bileşenini çağırır */}
      <Auth />
    </React.Fragment>
  );
};

// AuthPage bileşenini dışa aktarır, böylece bu bileşen diğer dosyalarda kullanılabilir
export default AuthPage;
