// React ve useState hook'unu içe aktarır
import React, { useState } from "react";
// App bileşenine stil uygulamak için gereken CSS dosyasını içe aktarır
import "./App.css";
// Route ve Routes bileşenlerini react-router-dom'dan içe aktarır
import { Route, Routes } from "react-router-dom";
// Sayfa bileşenlerini içe aktarır
import { HomePage } from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import CartPage from "./pages/CartPage";
import ShopPage from "./pages/ShopPage";
import ContactPage from "./pages/ContactPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import UserPage from "./pages/Admin/UserPage";
import CategoryPage from "./pages/Admin/Categories/CategoryPage";
import UpdateCategoryPage from "./pages/Admin/Categories/UpdateCategoryPage";
import CreateCategoryPage from "./pages/Admin/Categories/CreateCategoryPage";
import CreateProductPage from "./pages/Admin/Products/CreateProductPage";
import ProductPage from "./pages/Admin/Products/ProductPage";
import UpdateProductPage from "./pages/Admin/Products/UpdateProduct";
import CouponPage from "./pages/Admin/Coupons/CouponPage";
import CreateCouponPage from "./pages/Admin/Coupons/CreateCouponPage";
import UpdateCouponPage from "./pages/Admin/Coupons/UpdateCouponPage";
import Success from "./pages/Success";
import OrderPage from "./pages/Admin/OrderPage";
import DashboardPage from "./pages/Admin/DashboardPage";
// Products bileşenini içe aktarır
import Products from "./components/Products/Products";

// App bileşeni tanımlanır
function App() {
  return (
    // Routes bileşeni, farklı yollar için bileşenleri tanımlar
    <Routes>
      {/* Ana sayfa yolu */}
      <Route path="/" element={<HomePage />} />
      {/* Mağaza sayfası yolu */}
      <Route path="/shop" element={<ShopPage />} />
      {/* İletişim sayfası yolu */}
      <Route path="/contact" element={<ContactPage />} />
      {/* Alışveriş sepeti sayfası yolu */}
      <Route path="/cart" element={<CartPage />} />
      {/* Kimlik doğrulama sayfası yolu */}
      <Route path="/auth" element={<AuthPage />} />
      {/* Ürün detay sayfası yolu */}
      <Route path="/product/:id" element={<ProductDetailsPage />} />
      {/* Başarılı işlem sayfası yolu */}
      <Route path="/success" element={<Success />} />
      {/* Belirli bir kategorideki ürünler sayfası yolu */}
      <Route path="/products/:categoryId" element={<Products />} />
      {/* Admin paneli için yollar */}
      <Route path="/admin/*">
        <Route index element={<DashboardPage />} />
        <Route path="users" element={<UserPage />} />
        <Route path="categories" element={<CategoryPage />} />
        <Route path="categories/update/:id" element={<UpdateCategoryPage />} />
        <Route path="categories/create/" element={<CreateCategoryPage />} />
        <Route path="products" element={<ProductPage />} />
        <Route path="products/create/" element={<CreateProductPage />} />
        <Route path="products/update/:id" element={<UpdateProductPage />} />
        <Route path="coupons" element={<CouponPage />} />
        <Route path="coupons/update/:id" element={<UpdateCouponPage />} />
        <Route path="coupons/create/" element={<CreateCouponPage />} />
        <Route path="orders" element={<OrderPage />} />
      </Route>
    </Routes>
  );
}

// App bileşenini dışa aktarır, böylece bu bileşen diğer dosyalarda kullanılabilir
export default App;
