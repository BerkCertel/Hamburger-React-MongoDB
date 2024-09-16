import { Spin, Table, message } from "antd"; // Ant Design kütüphanesinden Spin, Table ve message bileşenlerini içe aktarır.
import { useEffect, useState } from "react"; // React'ten useEffect ve useState hook'larını içe aktarır.

const OrderPage = () => {
  const [dataSource, setDataSource] = useState([]); // Sipariş verilerini tutmak için state tanımlanır.
  const [loading, setLoading] = useState(false); // Yüklenme durumunu tutmak için state tanımlanır.

  const columns = [
    {
      title: "Müşteri Email", // Kolon başlığı
      dataIndex: "email", // Verinin çekileceği anahtar
    },
    {
      title: "Sipariş Fiyatı", // Kolon başlığı
      dataIndex: "order", // Verinin çekileceği anahtar
    },
  ];

  useEffect(() => {
    const fetchData = () => {
      setLoading(true); // Yüklenme durumunu true yapar.
      try {
        const savedOrders = JSON.parse(localStorage.getItem("orders")) || []; // LocalStorage'dan sipariş verilerini çeker.
        setDataSource(savedOrders); // Verileri state'e aktarır.
      } catch (error) {
        console.log("Veri hatası:", error); // Hata durumunda konsola hata mesajı yazar.
        message.error("Veri getirme başarısız."); // Kullanıcıya hata mesajı gösterir.
      } finally {
        setLoading(false); // Yüklenme durumunu false yapar.
      }
    };
    fetchData(); // Fonksiyonu çağırır.
  }, []); // Boş bağımlılık dizisiyle sadece bileşen yüklendiğinde çalışır.

  return (
    <Spin spinning={loading}>
      {/* // Yüklenme durumunda dönen animasyon */}
      <Table
        dataSource={dataSource} // Verileri tabloya aktarır.
        columns={columns} // Kolonları tabloya aktarır.
        rowKey={(record) => record.email + record.totalprice} // Her satıra benzersiz bir anahtar atar.
        loading={loading} // Yüklenme durumunu tabloya aktarır.
      />
    </Spin>
  );
};

export default OrderPage; // Bileşeni dışa aktarır.
