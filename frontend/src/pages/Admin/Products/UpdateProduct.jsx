// Ant Design bileşenlerini içe aktarır
import { Button, Form, Input, Spin, message, Select, InputNumber } from "antd";
// useEffect ve useState hook'larını içe aktarır
import { useEffect, useState } from "react";
// useParams hook'unu react-router-dom'dan içe aktarır
import { useParams } from "react-router-dom";
// ReactQuill bileşenini ve stil dosyasını içe aktarır
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// UpdateProductPage bileşeni tanımlanır
const UpdateProductPage = () => {
  // State'ler tanımlanır ve başlangıç değerleri ayarlanır
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();
  const params = useParams();
  const productId = params.id;
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  // Form gönderildiğinde çalışacak fonksiyon
  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Ürünü güncellemek için API'ye PUT isteği gönderir
      const response = await fetch(`${apiUrl}/api/products/${productId}`, {
        method: "PUT",
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
        message.success("Ürün başarıyla güncellendi.");
      } else {
        message.error("Ürün güncellenirken bir hata oluştu.");
      }
    } catch (error) {
      console.log("Ürün güncelleme hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  // Bileşen yüklendiğinde mevcut ürünü ve kategorileri getirmek için useEffect kullanılır
  useEffect(() => {
    // Tek bir ürünü getirmek için fonksiyon tanımlanır
    const fetchSingleCategory = async () => {
      setLoading(true);

      try {
        const response = await fetch(`${apiUrl}/api/products/${productId}`);

        if (!response.ok) {
          throw new Error("Verileri getirme hatası");
        }

        const data = await response.json();

        if (data) {
          form.setFieldsValue({
            name: data.name,
            img: data.img,
            discount: data.price.discount,
            current: data.price.current,
            description: data.description,
            category: data.category,
          });
        }
      } catch (error) {
        console.log("Veri hatası:", error);
      } finally {
        setLoading(false);
      }
    };

    // Kategorileri getirmek için fonksiyon tanımlanır
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

    fetchSingleCategory();
    fetchCategories();
  }, [apiUrl, productId, form]);

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
          Güncelle
        </Button>
      </Form>
    </Spin>
  );
};

// UpdateProductPage bileşenini dışa aktarır, böylece bu bileşen diğer dosyalarda kullanılabilir
export default UpdateProductPage;
