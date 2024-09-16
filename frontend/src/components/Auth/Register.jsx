// useState hook'unu içe aktarır
import { useState } from "react";
// Ant Design kütüphanesinden mesaj bileşenini içe aktarır
import { message } from "antd";
// useNavigate hook'unu react-router-dom'dan içe aktarır
import { useNavigate } from "react-router-dom";

// Register bileşeni tanımlanır
const Register = () => {
  // formData adında bir state tanımlar ve başlangıç değerini ayarlar
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    adres: "",
  });

  // useNavigate hook'unu kullanarak navigate fonksiyonunu alır
  const navigate = useNavigate();
  // API URL'sini çevre değişkenlerinden alır
  const apiURL = import.meta.env.VITE_API_BASE_URL;

  // Form alanındaki değişiklikleri işleyen fonksiyon
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Kayıt işlemini gerçekleştiren fonksiyon
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiURL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // const { password, ...rest } = data; // Eğer şifreyi almak istemiyorsanız yorumu kaldırın.

        localStorage.setItem("user", JSON.stringify(data));
        message.success("Kayıt başarılı.");
        navigate("/");
      } else {
        const errorData = await response.json(); // Hata mesajını al
        message.error(
          `Kayıt başarısız: ${errorData.message || response.statusText}`
        );
      }
    } catch (error) {
      console.error("Kayıt hatası:", error);
      message.error("Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    // Kayıt formunun bulunduğu ana div
    <div className="account-column">
      <h2>Kayıt Ol</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>
            <span>
              Kullanıcı Adı <span className="required">*</span>
            </span>
            <input type="text" onChange={handleInputChange} name="username" />
          </label>
        </div>
        <div>
          <label>
            <span>
              Email Adresi <span className="required">*</span>
            </span>
            <input type="email" onChange={handleInputChange} name="email" />
          </label>
        </div>
        <div>
          <label>
            <span>
              Şifre <span className="required">*</span>
            </span>
            <input
              type="password"
              onChange={handleInputChange}
              name="password"
            />
          </label>
        </div>
        <div>
          <label>
            <span>
              Adres <span className="required">*</span>
            </span>
            <textarea
              style={{ resize: "none" }}
              onChange={handleInputChange}
              name="adres"
            ></textarea>
          </label>
        </div>
        <div className="privacy-policy-text remember">
          <p>
            Kişisel verileriniz, bu web sitesi boyunca deneyiminizi desteklemek,
            hesabınıza erişimi yönetmek ve gizlilik politikamızda açıklanan diğer
            amaçlar için kullanılacaktır. <a href="#">Gizlilik politikası.</a>
          </p>
          <button className="btn btn-sm sumbit-btn">Kayıt Ol</button>
        </div>
      </form>
    </div>
  );
};

// Register bileşenini dışa aktarır, böylece bu bileşen diğer dosyalarda kullanılabilir
export default Register;
