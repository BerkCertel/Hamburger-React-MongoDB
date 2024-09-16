// useEffect ve useState hook'larını içe aktarır
import { useEffect, useState } from "react";
// Footer bileşenini içe aktarır
import Footer from "../components/Layout/Footer/Footer";
// Header bileşenini içe aktarır
import Header from "../components/Layout/Header/Header";
// PropTypes kütüphanesini içe aktarır, bileşen propslarının türlerini tanımlamak için kullanılır
import Proptypes from "prop-types";
// Search bileşenini içe aktarır, bu bileşen arama modalını temsil eder
import Search from "../components/Modals/Search/Search";
// Dialog bileşenini içe aktarır, bu bileşen dialog modalını temsil eder
import Dialog from "../components/Modals/Dialog/Dialog";

// MainLayout bileşeni tanımlanır, bu bileşen genel düzeni sağlar
const MainLayout = ({ children }) => {
  // isSearchShow ve isDialogShow adında state'ler tanımlar ve başlangıç değerlerini ayarlar
  const [isSearchShow, setIsSearchShow] = useState(false);
  const [isDialogShow, setIsDialogShow] = useState(false);

  // useEffect hook'u, bileşen yüklendiğinde çalışır
  useEffect(() => {
    // dialog durumu localStorage'dan alınır veya varsayılan olarak true ayarlanır
    const dialogStatus = localStorage.getItem("dialog")
      ? JSON.parse(localStorage.getItem("dialog"))
      : localStorage.setItem("dialog", JSON.stringify(true));

    // 2 saniye sonra dialog modalını gösterir
    setTimeout(() => {
      setIsDialogShow(dialogStatus);
    }, 2000);
  }, []);

  return (
    // Ana düzeni temsil eden div
    <div className="main-layout">
      {/* Dialog bileşeni, dialog modalını temsil eder */}
      <Dialog isDialogShow={isDialogShow} setIsDialogShow={setIsDialogShow} />
      {/* Search bileşeni, arama modalını temsil eder */}
      <Search isSearchShow={isSearchShow} setIsSearchShow={setIsSearchShow} />
      {/* Header bileşeni, üst kısımdaki başlık (header) kısmını temsil eder */}
      <Header setIsSearchShow={setIsSearchShow} />
      {/* children prop'u, ana bileşenin içeriğini temsil eder */}
      {children}
      {/* Footer bileşeni, alt kısımdaki (footer) kısmını temsil eder */}
      <Footer />
    </div>
  );
};

// PropTypes tanımlaması: children node türünde olmalıdır
MainLayout.propTypes = {
  children: Proptypes.node,
};

// MainLayout bileşenini dışa aktarır, böylece bu bileşen diğer dosyalarda kullanılabilir
export default MainLayout;
