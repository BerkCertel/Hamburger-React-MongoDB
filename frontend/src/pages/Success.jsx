// Ant Design kütüphanesinden Button ve Result bileşenlerini içe aktarır
import { Button, Result } from "antd";
// Link bileşenini react-router-dom'dan içe aktarır
import { Link } from "react-router-dom";

// Success bileşeni tanımlanır
const Success = () => {
  return (
    // success-page sınıfı ile stil uygulanan ana div
    <div className="success-page">
      <div className="container">
        {/* Result bileşeni, başarı mesajını ve ek bilgileri gösterir */}
        <Result
          status="success"
          title="Ödeme Başarılı!"
          subTitle="Siparişiniz başarıyla tamamlandı"
          extra={[
            // Ana sayfaya yönlendiren buton
            <Link to={"/"} key="home">
              <Button type="primary">Ana Sayfa</Button>
            </Link>
          ]}
        />
      </div>
    </div>
  );
};

// Success bileşenini dışa aktarır, böylece bu bileşen diğer dosyalarda kullanılabilir
export default Success;
