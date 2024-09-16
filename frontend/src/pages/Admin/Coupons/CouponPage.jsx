// Gerekli React hook'larını içe aktarır
import React, { useCallback, useEffect, useState } from "react";
// Ant Design bileşenlerini ve ikonları içe aktarır
import { Table, message, Button, Popconfirm, Space } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
// useNavigate hook'unu react-router-dom'dan içe aktarır
import { useNavigate } from "react-router-dom";

// CouponPage bileşeni tanımlanır
function CouponPage() {
  // State'ler tanımlanır ve başlangıç değerleri ayarlanır
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_API_BASE_URL;

  // Popconfirm için onay ve iptal işlevleri
  const confirm = (e) => {
    console.log(e);
    message.success("Click on Yes");
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  // Tablo sütunları tanımlanır
  const columns = [
    {
      title: "Kupon Kodu",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "İndirim",
      dataIndex: "discountPercent",
      key: "discountPercent",
      align: "center",
      render: (text) => <b>%{text}</b>,
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
            onClick={() => navigate(`/admin/coupons/update/${record._id}`)}
          >
            Düzenle
          </Button>
          <Popconfirm
            title="Kuponu Sil"
            description="Kuponu silmek istediğinize emin misiniz?"
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
            onConfirm={() => deleteCoupon(record._id)}
          >
            <Button type="primary" style={{ padding: "0px 30px" }} danger>
              Sil
            </Button>{" "}
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Kuponları getiren fonksiyon tanımlanır
  const fetchCoupons = useCallback(
    async () => {
      try {
        const response = await fetch(`${apiURL}/api/coupons`);
        setLoading(true);
        if (response.ok) {
          const data = await response.json();
          setDataSource(data);
          console.log(data);
        } else {
          const errorData = await response.json(); // Hata mesajını al
          message.error(
            `Giriş başarısız: ${errorData.message || response.statusText}`
          );
        }
      } catch (error) {
        console.error("Giriş hatası:", error);
        message.error(
          "Giriş sırasında bir hata oluştu. Lütfen tekrar deneyin."
        );
      } finally {
        setLoading(false);
      }
    },
    [apiURL]
  );

  // Kuponu silen fonksiyon tanımlanır
  const deleteCoupon = async (couponId) => {
    try {
      const response = await fetch(`${apiURL}/api/coupons/${couponId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        message.success("Kupon başarıyla silindi.");
        fetchCoupons();
      } else {
        message.error("Silme işlemi başarısız.");
      }
    } catch (error) {
      console.log("Silme hatası:", error);
    }
  };

  // Bileşen yüklendiğinde kuponları getirmek için useEffect kullanılır
  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  return (
    // Kuponları tablo şeklinde gösterir
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record._id}
      loading={loading}
    />
  );
}

// CouponPage bileşenini dışa aktarır, böylece bu bileşen diğer dosyalarda kullanılabilir
export default CouponPage;
