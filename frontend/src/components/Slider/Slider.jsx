// useState hook'unu React'ten içe aktarır
import { useState } from "react";
// SliderItem bileşenini içe aktarır
import SliderItem from "./SliderItem";

// Slider bileşeni tanımlanır
function Slider() {
  // currentSlide state'ini tanımlar ve başlangıç değerini 0 yapar
  const [currentSlide, setCurrentSlide] = useState(0);

  // Bir sonraki slayda geçmek için kullanılan fonksiyon
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % 3); // 3 slayt arasında geçiş yapar
  };

  // Bir önceki slayda geçmek için kullanılan fonksiyon
  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + 3) % 3); // 3 slayt arasında geçiş yapar
  };

  return (
    <div>
      {/* slider bölümü */}
      <section className="slider">
        <div className="slider-elements">
          {/* currentSlide değerine göre SliderItem bileşenini gösterir */}
          {currentSlide === 0 && (
            <SliderItem imageSrc="img/slider/slider1.svg" />
          )}
          {currentSlide === 1 && (
            <SliderItem imageSrc="img/slider/slider2.svg" />
          )}
          {currentSlide === 2 && (
            <SliderItem imageSrc="img/slider/slider3.svg" />
          )}
          {/* Slayt geçiş butonları */}
          <div className="slider-buttons">
            <button onClick={prevSlide}>
              <i className="bi bi-chevron-left"></i>
            </button>
            <button onClick={nextSlide}>
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
          {/* Slayt noktaları */}
          <div className="slider-dots">
            <button
              className={`slider-dot ${currentSlide === 0 ? "active" : ""}`}
              onClick={() => setCurrentSlide(0)}
            >
              <span></span>
            </button>
            <button
              className={`slider-dot ${currentSlide === 1 ? "active" : ""}`}
              onClick={() => setCurrentSlide(1)}
            >
              <span></span>
            </button>
            <button
              className={`slider-dot ${currentSlide === 2 ? "active" : ""}`}
              onClick={() => setCurrentSlide(2)}
            >
              <span></span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// Slider bileşenini dışa aktarır, böylece bu bileşen diğer dosyalarda kullanılabilir
export default Slider;
