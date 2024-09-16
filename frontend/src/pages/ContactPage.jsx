// React kütüphanesini içe aktarır
import React from "react";
// Contact bileşenini içe aktarır
import Contact from "../components/Contact/Contact";

// ContactPage bileşeni tanımlanır
export const ContactPage = () => {
  return (
    // React.Fragment kullanarak gereksiz DOM düğümlerini önler
    <React.Fragment>
      {/* Contact bileşenini çağırır */}
      <Contact />
    </React.Fragment>
  );
};

// ContactPage bileşenini dışa aktarır, böylece bu bileşen diğer dosyalarda kullanılabilir
export default ContactPage;
