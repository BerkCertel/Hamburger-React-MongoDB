// campaignSingle.css dosyasını içe aktarır, bu dosya CampaignSingle bileşenine stil uygulamak için kullanılır
import "./campaignSingle.css";

// CampaignSingle bileşeni tanımlanır
const CampaignSingle = () => {
  return (
    // campaign-single sınıfı ile stil uygulanmış bir bölüm oluşturur
    <section className="campaign-single">
      <div className="container">
        <div className="campaign-wrapper">
          {/* Kampanya metni */}
          <strong>40% İndirim</strong>
          <span></span>
          {/* Satın Al butonu */}
          <a href="#" className="btn btn-lg">
            Satın Al
            <i className="bi bi-arrow-right"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

// CampaignSingle bileşenini dışa aktarır, böylece bu bileşen diğer dosyalarda kullanılabilir
export default CampaignSingle;
