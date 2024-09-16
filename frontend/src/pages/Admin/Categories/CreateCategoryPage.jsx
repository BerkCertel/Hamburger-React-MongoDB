// Ant Design bileşenlerini içe aktarır
import { Button, Form, Input, Spin, message } from "antd";
// useState hook'unu içe aktarır
import { useState } from "react";

// CreateCategoryPage bileşeni tanımlanır
const CreateCategoryPage = () => {
  // State'ler tanımlanır ve başlangıç değerleri ayarlanır
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  // Form gönderildiğinde çalışacak fonksiyon
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/categories/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      // API yanıtını kontrol eder
      if (response.ok) {
        message.success("Kategori başarıyla oluşturuldu.");
        form.resetFields(); // Form alanlarını temizler
      } else {
        message.error("Kategori oluşturulurken bir hata oluştu.");
      }
    } catch (error) {
      console.log("Kategori oluşturma hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Spin bileşeni, yükleme durumunda dönen bir animasyon gösterir
    <Spin spinning={loading}>
      <Form
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        form={form}
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
          Oluştur
        </Button>
      </Form>
    </Spin>
  );
};

// CreateCategoryPage bileşenini dışa aktarır, böylece bu bileşen diğer dosyalarda kullanılabilir
export default CreateCategoryPage;
