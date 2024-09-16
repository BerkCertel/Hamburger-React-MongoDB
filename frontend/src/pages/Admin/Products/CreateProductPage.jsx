// Ant Design bileşenlerini içe aktarır
import { Button, Form, Input, Spin, message, InputNumber, Select } from "antd";
// useState ve useEffect hook'larını içe aktarır
import { useState, useEffect } from "react";
// ReactQuill bileşenini ve stil dosyasını içe aktarır
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// CreateProductPage bileşeni tanımlanır
const CreateProductPage = () => {
  // State'ler tanımlanır ve başlangıç değerleri ayarlanır
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  // Kategorileri getirmek için useEffect kullanılır
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);

      try {
        const response = await fetch(`${apiUrl}/api/categories`);

        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          message.error("Veri getirme başarısız.");
        }
      } catch (error) {
        console.log("Veri hatası:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [apiUrl]);

  // Form gönderildiğinde çalışacak fonksiyon
  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Ürün oluşturmak için API'ye POST isteği gönderir
      const response = await fetch(`${apiUrl}/api/products/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          price: {
            current: values.current,
            discount: values.discount,
          },
          img: values.img,
        }),
      });

      if (response.ok) {
        message.success("Ürün başarıyla oluşturuldu.");
        form.resetFields(); // Form alanlarını temizler
        console.log(values);
      } else {
        message.error("Ürün oluşturulurken bir hata oluştu.");
      }
    } catch (error) {
      console.log("Ürün oluşturma hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Spin bileşeni, yükleme durumunda dönen bir animasyon gösterir
    <Spin spinning={loading}>
      <Form name="basic" layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Ürün İsmi"
          name="name"
          rules={[
            {
              required: true,
              message: "Lütfen ürün adını girin!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Ürün Görseli (Link)"
          name="img"
          rules={[
            {
              required: true,
              message: "Lütfen ürün görsel linkini girin!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Ürün Açıklaması"
          name="description"
          rules={[
            {
              required: true,
              message: "Lütfen bir ürün açıklaması girin!",
            },
          ]}
        >
          <ReactQuill
            theme="snow"
            style={{
              backgroundColor: "white",
            }}
          />
        </Form.Item>
        <Form.Item
          label="Ürün Kategorisi"
          name="category"
          rules={[
            {
              required: true,
              message: "Lütfen ürün kategorisi girin!",
            },
          ]}
        >
          <Select>
            {categories.map((category) => {
              return (
                <Select.Option value={category._id} key={category._id}>
                  {category.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label="Fiyat"
          name="current"
          rules={[
            {
              required: true,
              message: "Lütfen ürün fiyatını girin!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item label="İndirim" name="discount">
          <InputNumber />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Oluştur
        </Button>
      </Form>
    </Spin>
  );
};

// CreateProductPage bileşenini dışa aktarır, böylece bu bileşen diğer dosyalarda kullanılabilir
export default CreateProductPage;
