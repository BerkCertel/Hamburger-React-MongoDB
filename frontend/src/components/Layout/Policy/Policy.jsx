// React kütüphanesinden React modülünü içe aktarır.
// Bu, React bileşenlerini tanımlamak için kullanılır.
import React from "react";

// Policy bileşenine stil uygulamak için gereken CSS dosyasını içe aktarır.
import "./Policy.css";

// İkonlar için gerekli modülleri react-icons kütüphanesinden içe aktarır.
// MdOutlineAccessTime ve FaMotorcycle ikonları kullanılır.
import { MdOutlineAccessTime } from "react-icons/md";
import { FaMotorcycle } from "react-icons/fa";

// Policy bileşeni, çeşitli müşteri hizmeti politikalarını gösterir
function Policy() {
  return (
    <div>
      {" "}
      {/* Policy section: Bu bölüm müşteri hizmeti politikalarını gösterir */}
      <section className="policy">
        <div className="container">
          {/* Policy listesi: Politika öğelerini listeleyen bir ul (unordered list) */}
          <ul className="policy-list">
            {/* Ücretsiz Teslimat: Teslimat ücreti olmadığını belirten öğe */}
            <li className="policy-item">
              {/* İkon: Motorsiklet ikonu */}
              <FaMotorcycle style={{ fontSize: "50px" }} />
              <div className="policy-texts">
                <strong>ÜCRETSİZ TESLİM</strong>
                <span>Teslimat ücreti yoktur.</span>
              </div>
            </li>
            {/* Açılış / Kapanış Saatleri: Çalışma saatlerini belirten öğe */}
            <li className="policy-item">
              {/* İkon: Saat ikonu */}
              <MdOutlineAccessTime style={{ fontSize: "50px" }} />
              <div className="policy-texts">
                <strong>AÇILIŞ / KAPANIŞ</strong>
                <span>09:00 - 24:00</span>
              </div>
            </li>
            {/* Ödeme Seçenekleri: Güvenli ödeme seçeneklerini belirten öğe */}
            <li className="policy-item">
              {/* İkon: Kredi kartı ikonu */}
              <i className="bi bi-credit-card"></i>
              <div className="policy-texts">
                <strong>ÖDEME SEÇENEKLERİ</strong>
                <span>Güvenli Ödeme</span>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

// Policy bileşenini dışa aktarır, böylece bu bileşen diğer dosyalarda kullanılabilir.
export default Policy;
