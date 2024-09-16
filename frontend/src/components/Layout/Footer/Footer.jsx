// React kütüphanesini içe aktarır
import React from "react";
// Policy bileşenini içe aktarır
import Policy from "../Policy/Policy";
// Footer bileşenine stil uygulamak için gerekli CSS dosyasını içe aktarır
import "./footer.css";
// Link bileşenini react-router-dom'dan içe aktarır
import { Link } from "react-router-dom";

// footer bileşeni, sayfanın alt kısmında gösterilecek bilgileri içerir
function footer() {
  return (
    // React.Fragment, gereksiz DOM düğümlerini önlemek için kullanılır
    <React.Fragment>
      {/* Policy bileşenini çağırır */}
      <Policy />
      {/* footer etiketi, sayfanın altbilgisini tanımlar */}
      <footer className="footer">
        {/* widgets-row sınıfı, altbilgi widget'larını içerir */}
        <div className="widgets-row">
          <div className="container">
            <div className="footer-widgets">
              {/* Marka Bilgileri */}
              <div className="brand-info">
                <div className="footer-logo">
                  {/* Ana sayfaya yönlendiren logo */}
                  <Link to={"/"} className="logo">
                    <img
                      src="logo.svg"
                      alt="Logo"
                      style={{ width: "50%", left: "10%", position: "relative" }}
                    />
                  </Link>
                </div>
                <div className="footer-desc">
                  <p>
                    Quis ipsum suspendisse ultrices gravida. Risus commodo
                    viverra maecenas accumsan lacus vel facilisis in termapol.
                  </p>
                </div>
                <div className="footer-contact">
                  <p>
                    <a href="tel:555 555 55 55">(+800) 1234 5678 90</a> –{" "}
                    <a href="mailto:info@example.com">info@example.com</a>
                  </p>
                </div>
              </div>
              {/* Bilgiler Menüsü */}
              <div className="widget-nav-menu">
                <h4>Bilgiler</h4>
                <ul className="menu-list">
                  <li>
                    <a href="#">Hakkımızda</a>
                  </li>
                  <li>
                    <a href="#">Gizlilik Politikamız</a>
                  </li>
                </ul>
              </div>
              {/* Hesap Menüsü */}
              <div className="widget-nav-menu">
                <h4>Hesap</h4>
                <ul className="menu-list">
                  <li>
                    <a href="#">Panel</a>
                  </li>
                  <li>
                    <a href="#">Siparişlerim</a>
                  </li>
                  <li>
                    <a href="#">Hesap Bilgileri</a>
                  </li>
                  <li>
                    <a href="#">Siparişimi Takip Et</a>
                  </li>
                </ul>
              </div>
              {/* Kategoriler Menüsü */}
              <div className="widget-nav-menu">
                <h4>Kategoriler</h4>
                <ul className="menu-list">
                  <li>
                    <a href="#">Hamburger</a>
                  </li>
                  <li>
                    <a href="#">Patates Kızartması</a>
                  </li>
                  <li>
                    <a href="#">Ekstra</a>
                  </li>
                  <li>
                    <a href="#">İçecek</a>
                  </li>
                  <li>
                    <a href="#">Tatlı</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* Telif Hakkı ve Ekstra Bilgiler */}
        <div className="copyright-row">
          <div className="container">
            <div className="footer-copyright">
              <div className="site-copyright">
                <p>Copyright 2022 © E-Commerce Theme. All right reserved.</p>
              </div>
              <a href="#">
                <img src="img/footer/cards.png" alt="Ödeme Yöntemleri" />
              </a>
              <div className="footer-menu">
                <ul className="footer-menu-list">
                  <li className="list-item">
                    <a href="#">Gizlilik Politikası</a>
                  </li>
                  <li className="list-item">
                    <a href="#">Şartlar ve Koşullar</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
}

// footer bileşenini dışa aktarır, böylece bu bileşen diğer dosyalarda kullanılabilir
export default footer;
