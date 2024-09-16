// useState ve useEffect hook'larını içe aktarır
import { useState, useEffect } from "react";
// Ant Design bileşenlerini içe aktarır
import { Row, Col, Card, Statistic, message } from "antd";
// Recharts kütüphanesinden grafik bileşenlerini içe aktarır
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// DashboardPage bileşeni tanımlanır
const DashboardPage = () => {
  // State'ler tanımlanır ve başlangıç değerleri ayarlanır
  const [productSalesData, setProductSalesData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  // useEffect hook'u bileşen yüklendiğinde çalışır
  useEffect(() => {
    try {
      // LocalStorage'dan kaydedilen siparişleri alır
      const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];

      const minuteSales = {};
      const minuteCustomers = {};
      let totalRevenue = 0;
      const uniqueCustomers = new Set();

      // Her bir siparişi iteratif olarak işler
      savedOrders.forEach((order, index) => {
        // Tarih formatını kontrol eder ve parse eder
        const date = new Date(order.orderDate);
        if (isNaN(date)) {
          console.error(`Geçersiz tarih: ${order.orderDate} (order index: ${index})`);
          return;
        }
        const minute = date.toLocaleString('tr-TR', { hour: '2-digit', minute: '2-digit' });

        if (!minuteSales[minute]) {
          minuteSales[minute] = 0;
          minuteCustomers[minute] = new Set();
        }

        minuteSales[minute] += parseFloat(order.order);
        minuteCustomers[minute].add(order.email);
        totalRevenue += parseFloat(order.order);
        uniqueCustomers.add(order.email);
      });

      // Ürün satış verilerini oluşturur
      const productSalesData = Object.keys(minuteSales).map((minute) => ({
        name: minute,
        satilanUrunSayisi: minuteSales[minute],
      }));

      // Müşteri verilerini oluşturur
      const customerData = Object.keys(minuteCustomers).map((minute) => ({
        name: minute,
        musteriSayisi: minuteCustomers[minute].size,
      }));

      // State'leri günceller
      setProductSalesData(productSalesData);
      setCustomerData(customerData);
      setTotalSales(savedOrders.length);
      setTotalCustomers(uniqueCustomers.size); // Benzersiz müşteri sayısını ayarlar
      setTotalRevenue(totalRevenue);

    } catch (error) {
      console.log("Veri hatası:", error);
      message.error("Veri getirme başarısız.");
    }
  }, []);

  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Toplam Ürün Satışı" value={totalSales} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Toplam Müşteri Sayısı" value={totalCustomers} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Toplam Gelir" value={totalRevenue} prefix="$" />
          </Card>
        </Col>
      </Row>
      <Card style={{ marginTop: "20px" }}>
        <h2>Son Dakikadaki Ürün Satış Artışı</h2>
        <LineChart
          width={600}
          height={300}
          data={productSalesData}
          margin={{ top: 5, right: 30, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="satilanUrunSayisi"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </Card>
      <Card style={{ marginTop: "20px" }}>
        <h2>Son Dakikadaki Müşteri Artışı</h2>
        <LineChart
          width={600}
          height={300}
          data={customerData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="musteriSayisi"
            stroke="#82ca9d"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </Card>
    </div>
  );
};

// DashboardPage bileşenini dışa aktarır, böylece bu bileşen diğer dosyalarda kullanılabilir
export default DashboardPage;
