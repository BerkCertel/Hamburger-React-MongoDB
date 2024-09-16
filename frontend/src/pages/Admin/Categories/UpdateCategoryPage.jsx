// Ant Design bileşenlerini içe aktarır
import { Button, Form, Input, Spin, message } from "antd";
// useEffect ve useState hook'larını içe aktarır
import { useEffect, useState } from "react";
// useParams hook'unu react-router-dom'dan içe aktarır
import { useParams } from "react-router-dom";

// UpdateCategoryPage bileşeni tanımlanır
const UpdateCategoryPage = () => {
  // State'ler tanımlanır ve başlangıç değerleri ayarlanır
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const params = useParams();
  const categoryId = params.id; // URL'den kategori ID'sini alır
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  // Form gönderildiğinde çalışacak fonksiyon
  const onFinish = async (values) => {
    setLoading(true);
    try {
      // PUT isteği ile kategoriyi günceller
      const response = await fetch(`${apiUrl}/api/categories/${categoryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      // API yanıtını kontrol eder
      if (response.ok) {
        message.success("Kategori başarıyla güncellendi.");
      } else {
        message.error("Kategori güncellenirken bir hata oluştu.");
      }
    } catch (error) {
      console.log("Kategori güncelleme hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Spin bileşeni, yükleme durumunda dönen bir animasyon gösterir
    <Spin spinning={loading}>
      <Form
        form={form}
        name="basic"
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item
          label="Kategori İsmi"
          name="name"
          rules={[
            {
              required: true,
              message: "Lütfen kategori adını girin!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Kategori Görseli (Link)"
          name="img"
          rules={[
            {
              required: true,
              message: "Lütfen kategori görsel linkini girin!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Güncelle
        </Button>
      </Form>
    </Spin>
  );
};

// UpdateCategoryPage bileşenini dışa aktarır, böylece bu bileşen diğer dosyalarda kullanılabilir
export default UpdateCategoryPage;
