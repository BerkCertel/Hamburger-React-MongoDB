// React kütüphanesini içe aktarır
import React from "react";
// Ant Design bileşenlerini içe aktarır
import { Button, Layout, Menu } from "antd";
// PropTypes kütüphanesini içe aktarır, bileşen propslarının türlerini tanımlamak için kullanılır
import PropTypes from "prop-types";
// Ant Design'in Sider bileşenini içe aktarır
import Sider from "antd/es/layout/Sider";
// Ant Design ikonlarını içe aktarır
import {
  DashboardOutlined,
  AppstoreOutlined,
  LaptopOutlined,
  BarcodeOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
// useNavigate hook'unu react-router-dom'dan içe aktarır
import { useNavigate } from "react-router-dom";
// Ant Design Layout bileşenlerini içe aktarır
import { Content, Header } from "antd/es/layout/layout";

// Kullanıcının rolünü almak için yardımcı bir fonksiyon tanımlar
const getUserRole = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? user.role : null;
};

// AdminLayout bileşeni tanımlanır
export const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const userRole = getUserRole();
  const menuItems = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => {
        navigate(`/admin`);
      },
    },
    {
      key: "2",
      icon: <AppstoreOutlined />,
      label: "Kategoriler",
      path: "/",
      children: [
        {
          key: "3",
          label: "Kategori Listesi",
          path: "/admin/categories",
          onClick: () => {
            navigate(`/admin/categories`);
          },
        },
        {
          key: "4",
          label: "Yeni Kategori Oluştur",
          path: "/admin/categories/create",
          onClick: () => {
            navigate("/admin/categories/create");
          },
        },
      ],
    },
    {
      key: "5",
      icon: <LaptopOutlined />,
      label: "Ürünler",
      path: "/",
      children: [
        {
          key: "6",
          label: "Ürün Listesi",
          path: "/admin/products",
          onClick: () => {
            navigate(`/admin/products`);
          },
        },
        {
          key: "7",
          label: "Yeni Ürün Oluştur",
          path: "/admin/products/create",
          onClick: () => {
            navigate("/admin/products/create");
          },
        },
      ],
    },
    {
      key: "8",
      icon: <BarcodeOutlined />,
      label: "Kuponlar",
      path: "/admin/coupons",
      children: [
        {
          key: "9",
          label: "Kupon Listesi",
          path: "/admin/coupons",
          onClick: () => {
            navigate(`/admin/coupons`);
          },
        },
        {
          key: "10",
          label: "Yeni Kupon Oluştur",
          path: "/admin/coupons/create",
          onClick: () => {
            navigate("/admin/coupons/create");
          },
        },
      ],
    },
    {
      key: "11",
      icon: <UserOutlined />,
      label: "Kullanıcı Listesi",
      path: "/admin/users",
      onClick: () => {
        navigate(`/admin/users`);
      },
    },
    {
      key: "12",
      icon: <ShoppingCartOutlined />,
      label: "Siparişler",
      onClick: () => {
        navigate(`/admin/orders`);
      },
    },
    {
      key: "13",
      icon: <RollbackOutlined />,
      label: "Ana Sayfaya Git",
      path: "/",
      onClick: () => {
        window.location.href = "/";
      },
    },
  ];

  if (userRole === "admin") {
    return (
      <div className="admin-layout">
        <Layout
          style={{
            minHeight: "100vh",
          }}
        >
          <Sider width={200} theme="dark">
            <Menu mode="vertical" style={{ height: "100%" }} items={menuItems} />
          </Sider>
          <Layout>
            <Header>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "white",
                }}
              >
                <h2>Admin Paneli</h2>
              </div>
            </Header>
            <Layout>
              <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  minHeight: 360,
                }}
              >
                <div>{children}</div>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  } else {
    return (window.location.href = "/");
  }
};

// AdminLayout bileşenini dışa aktarır, böylece bu bileşen diğer dosyalarda kullanılabilir
export default AdminLayout;

// PropTypes tanımlaması: children node türünde olmalıdır
AdminLayout.propTypes = {
  children: PropTypes.node,
};
