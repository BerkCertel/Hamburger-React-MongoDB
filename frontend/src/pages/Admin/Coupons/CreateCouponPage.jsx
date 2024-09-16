// Gerekli modülleri ve bileşenleri içe aktarır
import { Button, Form, Input, Spin, message, InputNumber } from "antd";
import { useState } from "react";

// CreateCouponPage bileşeni tanımlanır
const CreateCouponPage = () => {
  // Yükleme durumunu ve form durumunu ayarlamak için state tanımlar
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  // Form gönderildiğinde çağrılacak fonksiyon
  const onFinish = async (values) => {
    setLoading(true); // Yükleme durumunu true yapar
    try {
      // API'ye POST isteği gönderir
      const response = await fetch(`${apiUrl}/api/coupons/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        // Kupon başarıyla oluşturulduğunda başarı mesajı gösterir ve formu sıfırlar
        message.success("Kupon başarıyla oluşturuldu.");
        form.resetFields();
      } else {
        // Hata durumunda hata mesajı gösterir
        message.error("Kupon oluşturulurken bir hata oluştu.");
      }
    } catch (error) {
      // Konsola hata mesajı yazar
      console.log("Kupon oluşturma hatası:", error);
    } finally {
      // Yükleme durumunu false yapar
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Form name="basic" layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Kupon İsmi"
          name="code"
          rules={[
            {
              required: true,
              message: "Lütfen kupon adını girin!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Kupon İndirim Oranı"
          name="discountPercent"
          rules={[
            {
              required: true,
              message: "Lütfen bir kupon indirim oranı girin!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Oluştur
        </Button>
      </Form>
    </Spin>
  );
};

// CreateCouponPage bileşenini dışa aktarır, böylece bu bileşen diğer dosyalarda kullanılabilir
export default CreateCouponPage;
