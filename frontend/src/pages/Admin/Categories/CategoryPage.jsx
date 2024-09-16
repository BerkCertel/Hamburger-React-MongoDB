// React ve gerekli hook'ları içe aktarır
import React, { useCallback, useEffect, useState } from "react";
// Ant Design bileşenlerini içe aktarır
import { Table, message, Button, Popconfirm, Space } from "antd";
// Ant Design ikonlarını içe aktarır
import { QuestionCircleOutlined } from "@ant-design/icons";
// useNavigate hook'unu react-router-dom'dan içe aktarır
import { useNavigate } from "react-router-dom";

// CategoryPage bileşeni tanımlanır
function CategoryPage() {
  // State'ler tanımlanır ve başlangıç değerleri ayarlanır
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_API_BASE_URL;

  // Popconfirm bileşeni için onay fonksiyonu
  const confirm = (e) => {
    console.log(e);
    message.success("Evet'e tıkladınız");
  };

  // Popconfirm bileşeni için iptal fonksiyonu
  const cancel = (e) => {
    console.log(e);
    message.error("Hayır'a tıkladınız");
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
      render: (text) => <b>{text}</b>,
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
            onClick={() => navigate(`/admin/categories/update/${record._id}`)}
          >
            Düzenle
          </Button>
          <Popconfirm
            title="Kategoriyi Sil"
            description="Kategoriyi silmek istediğinize emin misiniz?"
            onCancel={cancel}
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

  // Kategorileri API'den çekmek için useCallback hook'u kullanılır
  const fetchCategories = useCallback(
    async () => {
      try {
        const response = await fetch(`${apiURL}/api/categories`);
        setLoading(true);
        if (response.ok) {
          const data = await response.json();
          setDataSource(data);
          console.log(data);
        } else {
          const errorData = await response.json(); // Hata mesajını al
          message.error(
            `Veri getirme başarısız: ${errorData.message || response.statusText}`
          );
        }
      } catch (error) {
        console.error("Veri getirme hatası:", error);
        message.error(
          "Veri getirme sırasında bir hata oluştu. Lütfen tekrar deneyin."
        );
      } finally {
        setLoading(false);
      }
    },
    [apiURL]
  );

  // Kategoriyi silmek için fonksiyon
  const deleteCategory = async (categoryId) => {
    try {
      const response = await fetch(`${apiURL}/api/categories/${categoryId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        message.success("Kategori başarıyla silindi.");
        fetchCategories();
      } else {
        message.error("Silme işlemi başarısız.");
      }
    } catch (error) {
      console.log("Silme hatası:", error);
    }
  };

  // Bileşen yüklendiğinde kategorileri çekmek için useEffect hook'u kullanılır
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record._id}
      loading={loading}
    />
  );
}

// CategoryPage bileşenini dışa aktarır, böylece bu bileşen diğer dosyalarda kullanılabilir
export default CategoryPage;
