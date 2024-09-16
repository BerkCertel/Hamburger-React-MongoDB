// Login ve Register bileşenlerini içe aktarır
import Login from "./Login";
import Register from "./Register";
// Auth bileşenine stil uygulamak için gereken CSS dosyasını içe aktarır
import "./auth.css";

// Auth bileşeni tanımlanır
const Auth = () => {
  return (
    // account-page sınıfı ile stil uygulanan ana bölüm
    <section className="account-page">
      <div className="container">
        <div className="account-wrapper">
          {/* Login bileşenini çağırır */}
          <Login />
          {/* Register bileşenini çağırır */}
          <Register />
        </div>
      </div>
    </section>
  );
};

// Auth bileşenini dışa aktarır, böylece bu bileşen diğer dosyalarda kullanılabilir
export default Auth;