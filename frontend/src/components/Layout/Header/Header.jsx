// React ve gerekli hookları içe aktarır.
import { useContext, useState } from "react";
// Header bileşenine stil uygulamak için gereken CSS dosyasını içe aktarır.
import "./header.css";
// PropTypes kütüphanesini içe aktarır, bileşen propslarının türlerini tanımlamak için kullanılır.
import Proptypes from "prop-types";
// Link ve useLocation kütüphanelerini react-router-dom'dan içe aktarır.
import { Link, useLocation } from "react-router-dom";
// CartContext'i içe aktarır, alışveriş sepeti verilerini almak için kullanılır.
import { CartContext } from "../../context/CartProvider";
// Kullanılacak ikonları içe aktarır.
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose, IoIosSearch, IoIosHeartEmpty } from "react-icons/io";
import { IoPersonOutline, IoExitOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
// Button ve Modal bileşenlerini antd kütüphanesinden içe aktarır.
import { Button, Modal } from "antd";
import { HiOutlineShoppingBag } from "react-icons/hi2";

// Header bileşeni, setIsSearchShow fonksiyonunu props olarak alır.
const Header = ({ setIsSearchShow }) => {
  // Sepet verilerini context'ten alır.
  const { cartItems } = useContext(CartContext);
  // Kullanıcı bilgisini localStorage'dan alır.
  const user = localStorage.getItem("user");
  // Sayfa yolunu almak için useLocation hook'unu kullanır.
  const { pathname } = useLocation();
  // Modal açık/kapalı durumu için state tanımlar.
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal'ı açan fonksiyon.
  const showModal = () => {
    setIsModalOpen(true);
  };

  // Modal'da onaylandığında çalışan fonksiyon.
  const handleOk = () => {
    setIsModalOpen(false);
    localStorage.removeItem("user"); // Kullanıcı bilgisini localStorage'dan kaldırır.
    window.location.href = "/"; // Ana sayfaya yönlendirir.
  };

  // Modal'da iptal edildiğinde çalışan fonksiyon.
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <header>
        <div className="global-notification">
          <div className="container">
            <p>
              Lezzetli Yemekleri Uygun Fiyata
              <a href="shop.html"> SİPARİŞ VER</a>
            </p>
          </div>
        </div>
        <div className="header-row">
          <div className="container">
            <div className="header-wrapper">
              <div className="header-mobile">
                <RxHamburgerMenu />
              </div>
              <div className="header-left">
                <Link to={"/"} className="logo">
                  <img src="logo.svg" alt="Logo" />
                </Link>
              </div>
              <div className="header-center" id="sidebar">
                <nav className="navigation">
                  <ul className="menu-list">
                    <li className="menu-list-item">
                      <Link
                        to={"/"}
                        className={`menu-link ${pathname === "/" && "active"}`}
                      >
                        Ana Sayfa
                      </Link>
                    </li>
                    <li className="menu-list-item megamenu-wrapper">
                      <Link
                        to={"/shop"}
                        className={`menu-link ${
                          pathname === "/shop" && "active"
                        }`}
                      >
                        Mağaza
                      </Link>
                    </li>
                    <li className="menu-list-item">
                      <Link
                        to={"/contact"}
                        className={`menu-link ${
                          pathname === "/contact" && "active"
                        }`}
                      >
                        İletişim
                      </Link>
                    </li>
                  </ul>
                </nav>
                {/* Mobilde kapanma ikonu */}
                {/* <i className="bi-x-circle" id="close-sidebar"></i> */}
              </div>
              <div className="header-right">
                <div className="header-right-links">
                  <Link to={"/auth"} className="header-account">
                    <IoPersonOutline style={{ fontSize: "20px" }} />
                  </Link>
                  <button
                    className="search-button"
                    onClick={() => setIsSearchShow(true)}
                  >
                    <IoIosSearch style={{ fontSize: "20px" }} />
                  </button>
                  <a href="#">
                    <IoIosHeartEmpty style={{ fontSize: "20px" }} />
                  </a>
                  <div className="header-cart">
                    <Link to={"/cart"} className="header-cart-link">
                      <HiOutlineShoppingBag style={{ fontSize: "20px" }} />
                      <span className="header-cart-count">
                        {cartItems.length}
                      </span>{" "}
                    </Link>
                  </div>
                  {user && (
                    <>
                      <IoExitOutline
                        onClick={showModal}
                        style={{
                          cursor: "pointer",
                          fontSize: "20px",
                          marginBottom: "5px",
                        }}
                      />
                      <Modal
                        title="Çıkış"
                        open={isModalOpen}
                        onOk={handleOk}
                        okText="Evet"
                        okType="danger"
                        cancelText="Hayır"
                        onCancel={handleCancel}
                      >
                        <p>Çıkış Yapmak İstediğinize Emin Misiniz?</p>
                      </Modal>{" "}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

// PropTypes tanımlaması: setIsSearchShow fonksiyon türünde olmalıdır.
Header.propTypes = {
  setIsSearchShow: Proptypes.func,
};

// Header bileşenini dışa aktarır, böylece bu bileşen diğer dosyalarda kullanılabilir.
export default Header;