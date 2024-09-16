// Gerekli modülleri ve bileşenleri içe aktarır
import { Button, Form, Input, Spin, message, InputNumber } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// UpdateCouponPage bileşeni tanımlanır
const UpdateCouponPage = () => {
  // Yükleme durumunu ve form durumunu ayarlamak için state tanımlar
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const params = useParams();
  const couponId = params.id; // URL parametresinden kupon kimliğini alır
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  // Form gönderildiğinde çağrılacak fonksiyon
  const onFinish = async (values) => {
    setLoading(true); // Yükleme durumunu true yapar
    try {
      // API'ye PUT isteği gönderir
      const response = await fetch(`${apiUrl}/api/coupons/${couponId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        // Kupon başarıyla güncellendiğinde başarı mesajı gösterir
        message.success("Kupon başarıyla güncellendi.");
      } else {
        // Hata durumunda hata mesajı gösterir
        message.error("Kupon güncellenirken bir hata oluştu.");
      }
    } catch (error) {
      // Konsola hata mesajı yazar
      console.log("Kupon güncelleme hatası:", error);
    } finally {
      // Yükleme durumunu false yapar
      setLoading(false);
    }
  };

  // Bileşen yüklendiğinde tek bir kuponu almak için API isteği yapar
  useEffect(() => {
    const fetchSingleCategory = async () => {
      setLoading(true); // Yükleme durumunu true yapar

      try {
        const response = await fetch(`${apiUrl}/api/coupons/${couponId}`);

        if (!response.ok) {
          throw new Error("Verileri getirme hatası");
        }

        const data = await response.json();

        if (data) {
          // Form alanlarını API'den gelen verilerle doldurur
          form.setFieldsValue({
            code: data.code,
            discountPercent: data.discountPercent,
          });
        }
      } catch (error) {
        // Konsola hata mesajı yazar
        console.log("Veri hatası:", error);
      } finally {
        // Yükleme durumunu false yapar
        setLoading(false);
      }
    };
    fetchSingleCategory();
  }, [apiUrl, couponId, form]);

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
          Güncelle
        </Button>
      </Form>
    </Spin>
  );
};

// UpdateCouponPage bileşenini dışa aktarır, böylece bu bileşen diğer dosyalarda kullanılabilir
export default UpdateCouponPage;
