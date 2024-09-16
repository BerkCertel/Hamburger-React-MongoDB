import "./contact.css";

// Contact bileşeni tanımlanır
const Contact = () => {
  return (
    // Ana bölüm: contact sınıfı ile stil uygulanır
    <section className="contact">
      <div className="contact-top">
        <div className="contact-map">
          {/* Google Maps iframe'i, belirli bir konumu göstermek için kullanılır */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3184.2356482233577!2d30.61836207641296!3d37.051867253471755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c39abd6e49aa8d%3A0x329b9c7bc561e87a!2sAntalya%20Bilim%20%C3%9Cniversitesi!5e0!3m2!1str!2str!4v1715959609027!5m2!1str!2str"
            style={{ border: 0 }} // iframe'in kenarlığını kaldırır
            allowFullScreen="" // Tam ekran moduna izin verir
            loading="lazy" // Haritanın tembel yüklenmesini sağlar
            referrerPolicy="no-referrer-when-downgrade" // Referrer politikasını ayarlar
            width="100%" // Genişlik %100 olarak ayarlanır
            height="500" // Yükseklik 500 piksel olarak ayarlanır
          ></iframe>
        </div>
      </div>
      <div className="contact-bottom">
        <div className="container">
          <div className="contact-titles">
            {/* Başlık ve açıklama metni */}
            <h2>Bize Ulaşın</h2>
            <p>
              Bize ulaşmak için aşağıdaki formu doldurabilirsiniz. Formda yer alan bilgiler, 
              size daha hızlı ve doğru bir şekilde yanıt verebilmemiz için önemlidir. 
              İsim, e-posta adresi ve mesajınızı belirterek bize sorularınızı, 
              geri bildirimlerinizi veya önerilerinizi iletebilirsiniz. 
              Formu doldurduktan sonra en kısa sürede sizinle iletişime geçeceğiz.
            </p>
          </div>
          <div className="contact-elements">
            {/* İletişim formu */}
            <form className="contact-form">
              {/* İsim alanı */}
              <div>
                <label>
                  İsim
                  <span>*</span>
                </label>
                <input type="text" required />
              </div>
              {/* E-posta alanı */}
              <div>
                <label>
                  Email
                  <span>*</span>
                </label>
                <input type="text" required />
              </div>
              {/* Başlık alanı */}
              <div>
                <label>
                  Başlık
                  <span>*</span>
                </label>
                <input type="text" required />
              </div>
              {/* Mesaj alanı */}
              <div>
                <label>
                  Mesaj
                  <span>*</span>
                </label>
                <textarea
                  id="author"
                  name="author"
                  type="text"
                  defaultValue=""
                  size="30"
                  required
                ></textarea>
              </div>
              {/* Gönder butonu */}
              <button className="btn btn-sm form-button">Send Message</button>
            </form>
            <div className="contact-info">
              <div className="contact-info-item">
                <div className="contact-info-texts">
                  {/* Şirket bilgileri */}
                  <strong>Clotya Store</strong>
                  <p className="contact-street">
                    Çıplaklı Mahallesi, Akdeniz Blv. No:290, 07070 Döşemealtı/Antalya, Türkiye
                  </p>
                  <a href="tel:555 555 55 55">+90 (242) 245 00 00</a>
                  <a href="mailto:contact@example.com">Email: contact@example.com</a>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-texts">
                  {/* Açılış saatleri */}
                  <strong>Açılış Saatleri</strong>
                  <p className="contact-date">Pazartesi - Cuma: 09:00 - 17:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact bileşenini dışa aktarır, böylece bu bileşen diğer dosyalarda kullanılabilir
export default Contact;