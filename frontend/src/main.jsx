// ReactDOM modülünü içe aktarır, bu modül React bileşenlerini DOM'a render etmek için kullanılır.
import ReactDOM from "react-dom/client";
// BrowserRouter bileşenini react-router-dom'dan içe aktarır, bu bileşen uygulama için tarayıcı yönlendirmesini sağlar.
import { BrowserRouter } from "react-router-dom";
// slick-carousel kütüphanesinden gerekli CSS dosyalarını içe aktarır, bu kütüphane kaydırıcı (carousel) bileşenleri için kullanılır.
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// Uygulamanın genel stil dosyasını içe aktarır.
import "./index.css";
// Layout bileşenini içe aktarır, bu bileşen uygulamanın genel düzenini sağlar.
import { Layout } from "./layouts/Layout.jsx";
// App bileşenini içe aktarır, bu bileşen uygulamanın ana bileşenidir.
import App from "./App";
// CartProvider bileşenini içe aktarır, bu bileşen alışveriş sepeti verilerini yönetmek için bir context sağlar.
import CartProvider from "./components/context/CartProvider.jsx";

// Uygulamanın kök elemanını alır ve React uygulamasını bu kök elemanına render eder.
ReactDOM.createRoot(document.getElementById("root")).render(
  // BrowserRouter bileşenini kullanarak tarayıcı yönlendirmesini sağlar.
  <BrowserRouter>
    {/* CartProvider bileşenini kullanarak alışveriş sepeti verilerini tüm uygulama genelinde sağlar. */}
    <CartProvider>
      {/* Layout bileşenini kullanarak uygulamanın genel düzenini sağlar. */}
      <Layout>
        {/* App bileşenini render eder, bu bileşen uygulamanın ana bileşenidir. */}
        <App />
      </Layout>
    </CartProvider>
  </BrowserRouter>
);