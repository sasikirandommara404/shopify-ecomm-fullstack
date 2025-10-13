import React, { useState, useEffect } from 'react';

const EcommerceSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&h=800&fit=crop',
      tag: 'NEW COLLECTION',
      title: 'Summer Fashion 2025',
      description: 'Discover the hottest trends of the season',
      discount: 'Up to 50% OFF',
      buttonText: 'Shop Now',
      buttonLink: '/fashion'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1920&h=800&fit=crop',
      tag: 'BEST SELLER',
      title: 'Premium Watches',
      description: 'Timeless elegance for every occasion',
      discount: 'Free Shipping',
      buttonText: 'Explore Collection',
      buttonLink: '/accessories'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1920&h=800&fit=crop',
      tag: 'LIMITED OFFER',
      title: 'Tech Accessories',
      description: 'Upgrade your digital lifestyle today',
      discount: 'Buy 2 Get 1 Free',
      buttonText: 'Shop Deals',
      buttonLink: '/electronics'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ecommerce-slider">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .ecommerce-slider {
          position: relative;
          width: 100%;
          height: 350px;
          overflow: hidden;
          background: #f8f9fa;
          font-family: 'Poppins', sans-serif;
        }
        
        .slide {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
          transform: translateX(100%);
          transition: all 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
        }
        
        .slide.active {
          opacity: 1;
          transform: translateX(0);
        }
        
        .slide.prev {
          transform: translateX(-100%);
        }
        
        .slide-bg {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
        
        .slide-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.3) 50%, transparent 100%);
        }
        
        .slide-content {
          position: absolute;
          top: 50%;
          left: 8%;
          transform: translateY(-50%);
          max-width: 600px;
          z-index: 2;
          color: white;
        }
        
        .slide-tag {
          display: inline-block;
          padding: 8px 20px;
          background: #ff4757;
          color: white;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.5px;
          margin-bottom: 20px;
          border-radius: 4px;
          animation: slideDown 0.6s ease forwards;
        }
        
        .active .slide-tag {
          animation: slideDown 0.6s ease forwards;
        }
        
        .slide-title {
          font-size: 48px;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 12px;
          color: white;
          text-shadow: 2px 2px 8px rgba(0,0,0,0.3);
        }
        
        .active .slide-title {
          animation: slideUp 0.7s ease forwards 0.1s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        
        .slide-description {
          font-size: 16px;
          font-weight: 400;
          color: rgba(255,255,255,0.95);
          margin-bottom: 10px;
        }
        
        .active .slide-description {
          animation: slideUp 0.8s ease forwards 0.2s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        
        .slide-discount {
          font-size: 22px;
          font-weight: 700;
          color: #ffd700;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .active .slide-discount {
          animation: slideUp 0.9s ease forwards 0.3s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        
        .slide-actions {
          display: flex;
          gap: 16px;
          align-items: center;
        }
        
        .active .slide-actions {
          animation: slideUp 1s ease forwards 0.4s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 40px;
          background: white;
          color: #000;
          font-size: 16px;
          font-weight: 600;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }
        
        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 30px rgba(0,0,0,0.3);
        }
        
        .btn-secondary {
          display: inline-flex;
          align-items: center;
          padding: 16px 32px;
          background: transparent;
          color: white;
          font-size: 16px;
          font-weight: 600;
          border: 2px solid white;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        
        .btn-secondary:hover {
          background: white;
          color: #000;
        }
        
        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 56px;
          height: 56px;
          background: white;
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
          box-shadow: 0 4px 15px rgba(0,0,0,0.15);
        }
        
        .nav-btn:hover {
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 6px 20px rgba(0,0,0,0.25);
        }
        
        .nav-btn.prev {
          left: 30px;
        }
        
        .nav-btn.next {
          right: 30px;
        }
        
        .slide-indicators {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 12px;
          z-index: 10;
        }
        
        .indicator {
          width: 12px;
          height: 12px;
          background: rgba(255,255,255,0.5);
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }
        
        .indicator.active {
          background: white;
          width: 40px;
          border-radius: 6px;
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Tablet */
        @media (max-width: 1024px) {
          .slide-content {
            max-width: 500px;
          }
          
          .slide-title {
            font-size: 42px;
          }
        }
        
        /* Mobile */
        @media (max-width: 768px) {
          .slide-overlay {
            background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.2) 100%);
          }
          
          .slide-content {
            left: 0;
            right: 0;
            bottom: 100px;
            top: auto;
            transform: none;
            padding: 0 24px;
            max-width: 100%;
            text-align: center;
          }
          
          .slide-tag {
            font-size: 10px;
            padding: 6px 16px;
            margin-bottom: 16px;
          }
          
          .slide-title {
            font-size: 36px;
            margin-bottom: 12px;
          }
          
          .slide-description {
            font-size: 15px;
            margin-bottom: 10px;
          }
          
          .slide-discount {
            font-size: 20px;
            margin-bottom: 20px;
          }
          
          .slide-actions {
            flex-direction: column;
            gap: 12px;
          }
          
          .btn-primary, .btn-secondary {
            padding: 14px 32px;
            font-size: 14px;
            width: 100%;
            max-width: 280px;
            justify-content: center;
          }
          
          .nav-btn {
            width: 44px;
            height: 44px;
          }
          
          .nav-btn.prev {
            left: 16px;
          }
          
          .nav-btn.next {
            right: 16px;
          }
          
          .slide-indicators {
            bottom: 30px;
          }
        }
        
        /* Small Mobile */
        @media (max-width: 480px) {
          .slide-title {
            font-size: 26px;
          }
        }
      `}</style>

      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`slide ${index === currentSlide ? 'active' : index === currentSlide - 1 || (currentSlide === 0 && index === slides.length - 1) ? 'prev' : ''}`}
        >
          <img src={slide.image} alt={slide.title} className="slide-bg" />
          <div className="slide-overlay" />
          <div className="slide-content">
            <div className="slide-tag">{slide.tag}</div>
            <h1 className="slide-title">{slide.title}</h1>
            <p className="slide-description">{slide.description}</p>
            <div className="slide-discount">{slide.discount}</div>
            <div className="slide-actions">
              <a href={slide.buttonLink} className="btn-primary">
                {slide.buttonText}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
              <a href="#" className="btn-secondary">
                Learn More
              </a>
            </div>
          </div>
        </div>
      ))}

      <button className="nav-btn prev" onClick={prevSlide} aria-label="Previous">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button className="nav-btn next" onClick={nextSlide} aria-label="Next">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <div className="slide-indicators">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default EcommerceSlider;