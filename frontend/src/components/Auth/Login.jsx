// auth.css dosyasını içe aktarır, bileşene stil uygular
import "./auth.css";
// useNavigate hook'unu react-router-dom'dan içe aktarır
import { useNavigate } from "react-router-dom";
// Ant Design kütüphanesinden mesaj bileşenini içe aktarır
import { message } from "antd";
// useState hook'unu içe aktarır
import { useState } from "react";

// Login bileşeni tanımlanır
const Login = () => {
  // formData adında bir state tanımlar ve başlangıç değerini ayarlar
  const [formData, setFormData] = useState({
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

  // Giriş işlemini gerçekleştiren fonksiyon
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiURL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        localStorage.setItem("user", JSON.stringify(data));
        message.success("Giriş başarılı.");
        if (data.role === "admin") {
          window.location.href="/admin"
        } else {
          navigate("/");
        }
      } else {
        const errorData = await response.json(); // Hata mesajını al
        message.error(
          `Giriş başarısız: ${errorData.message || response.statusText}`
        );
      }
    } catch (error) {
      console.error("Giriş hatası:", error);
      message.error("Giriş sırasında bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    // Giriş formunun bulunduğu ana div
    <div className="account-column">
      <h2>Giriş</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            <span>
              Email <span className="required">*</span>
            </span>
            <input type="text" name="email" onChange={handleInputChange} />
          </label>
        </div>
        <div>
          <label>
            <span>
              Şifre <span className="required">*</span>
            </span>
            <input
              type="password"
              name="password"
              onChange={handleInputChange}
            />
          </label>
        </div>
        <p className="remember">
          <label>
            <input type="checkbox" />
            <span>Beni Hatırla</span>
          </label>
          <button className="btn btn-sm">Giriş</button>
        </p>
        <a href="#" className="form-link">
          Şifremi unuttum.
        </a>
      </form>
    </div>
  );
};

// Login bileşenini dışa aktarır, böylece bu bileşen diğer dosyalarda kullanılabilir
export default Login;
