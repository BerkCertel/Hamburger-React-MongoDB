// React ve gerekli hook'ları içe aktarır
import React, { useCallback, useEffect, useState } from "react";
// Ant Design bileşenlerini içe aktarır
import { Table, message, Button, Popconfirm, Space } from "antd";
// Ant Design ikonlarını içe aktarır
import { QuestionCircleOutlined } from "@ant-design/icons";
// useNavigate hook'unu react-router-dom'dan içe aktarır
import { useNavigate } from "react-router-dom";

// ProductPage bileşeni tanımlanır
function ProductPage() {
  // State'ler tanımlanır ve başlangıç değerleri ayarlanır
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_API_BASE_URL;

  // fetchData fonksiyonunu tanımladık
  const fetchData = async () => {
    setLoading(true);

    try {
      // Kategoriler ve ürünler için API isteklerini paralel olarak yapar
      const [categoriesResponse, productsResponse] = await Promise.all([
        fetch(`${apiURL}/api/categories`),
        fetch(`${apiURL}/api/products`),
      ]);

      if (!categoriesResponse.ok || !productsResponse.ok) {
        message.error("Veri getirme başarısız.");
      }

      // API yanıtlarını JSON formatına çevirir
      const [categoriesData, productsData] = await Promise.all([
        categoriesResponse.json(),
        productsResponse.json(),
      ]);

      // Ürün verilerine kategori isimlerini ekler
      const productsWithCategories = productsData.map((product) => {
        const categoryId = product.category;
        const category = categoriesData.find((item) => item._id === categoryId);

        return {
          ...product,
          categoryName: category ? category.name : "",
        };
      });

      setDataSource(productsWithCategories);
    } catch (error) {
      console.log("Veri hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  // Tablo sütunlarının tanımı
  const columns = [
    {
      title: "Image",
      dataIndex: "img",
      key: "img",
      render: (imgSrc) => (
        <img
          src={imgSrc}
          alt="Image"
          style={{ width: "100px", height: "100px" }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
      align: "center",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center",
      render: (price) => <span>{price.current.toFixed(2)} $</span>,
    },
    {
      title: "İndirim",
      dataIndex: "price",
      key: "price",
      render: (price) => <span>%{price.discount}</span>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => navigate(`/admin/products/update/${record._id}`)}
          >
            Düzenle
          </Button>
          <Popconfirm
            title="Ürünü Sil"
            description="Ürünü silmek istediğinize emin misiniz?"
            icon={
              <QuestionCircleOutlined
                style={{
                  color: "red",
                }}
              />
            }
            okText="Evet"
            cancelText="Hayır"
            okType="danger"
            onConfirm={() => deleteCategory(record._id)}
          >
            <Button type="primary" style={{ padding: "0px 30px" }} danger>
              Sil
            </Button>{" "}
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Kategoriyi silmek için fonksiyon
  const deleteCategory = async (productId) => {
    try {
      const response = await fetch(`${apiURL}/api/products/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        message.success("Ürün başarıyla silindi.");
        fetchData(); // fetchData fonksiyonunu burada çağırıyoruz
      } else {
        message.error("Silme işlemi başarısız.");
      }
    } catch (error) {
      console.log("Silme hatası:", error);
    }
  };

  // Bileşen yüklendiğinde fetchData fonksiyonunu çağırır
  useEffect(() => {
    fetchData(); // useEffect içinde fetchData fonksiyonunu çağırıyoruz
  }, [apiURL]);

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record._id}
      loading={loading}
      expandable={{
        expandedRowRender: (record) => (
          <div dangerouslySetInnerHTML={{ __html: record.description }} />
        ),
      }}
    />
  );
}

// ProductPage bileşenini dışa aktarır, böylece bu bileşen diğer dosyalarda kullanılabilir
export default ProductPage;
