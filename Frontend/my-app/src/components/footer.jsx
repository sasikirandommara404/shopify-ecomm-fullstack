import React from 'react';

const Footer = () => {
  return (
    <div>
      {/* Newsletter Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '60px 20px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)',
          backgroundSize: '30px 30px'
        }} />
        
        <div className="container position-relative">
          <div className="row align-items-center text-center text-md-start">
            <div className="col-md-6 mb-4 mb-md-0">
              <h2 className="text-white fw-bold mb-2" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
                Subscribe to Our Newsletter
              </h2>
              <p className="text-white" style={{ opacity: 0.9, fontSize: '1.1rem' }}>
                Get the latest updates on new products and exclusive offers!
              </p>
            </div>
            <div className="col-md-6">
              <div className="input-group" style={{ maxWidth: '500px', margin: '0 auto' }}>
                <input 
                  type="email" 
                  className="form-control form-control-lg" 
                  placeholder="Enter your email"
                  style={{
                    border: 'none',
                    borderRadius: '50px 0 0 50px',
                    padding: '15px 25px'
                  }}
                />
                <button 
                  className="btn btn-dark btn-lg"
                  style={{
                    borderRadius: '0 50px 50px 0',
                    padding: '15px 35px',
                    fontWeight: '600'
                  }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Section */}
      <div style={{
        background: 'linear-gradient(180deg, #1a1a2e 0%, #0f0f1e 100%)',
        color: 'white',
        padding: '60px 0 30px'
      }}>
        <div className="container">
          <div className="row g-4">
            {/* Company Info */}
            <div className="col-lg-4 col-md-6">
              <div className="mb-4">
                <h3 className="fw-bold mb-3" style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: '2rem'
                }}>
                  Shopfy
                </h3>
                <div style={{
                  width: '60px',
                  height: '4px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '2px',
                  marginBottom: '20px'
                }} />
                <p style={{ 
                  color: 'rgba(255,255,255,0.7)', 
                  lineHeight: '1.8',
                  fontSize: '0.95rem'
                }}>
                  Shopfy is your one-stop online store for all your needs. From electronics to fashion, 
                  we bring quality products at unbeatable prices right to your doorstep.
                </p>
              </div>
              
              {/* Social Links */}
              <div>
                <h6 className="mb-3 fw-bold" style={{ fontSize: '0.9rem', letterSpacing: '1px' }}>
                  FOLLOW US
                </h6>
                <div className="d-flex gap-3">
                  {[
                    { icon: 'fab fa-facebook-f', color: '#1877f2' },
                    { icon: 'fab fa-twitter', color: '#1da1f2' },
                    { icon: 'fab fa-instagram', color: '#e4405f' },
                    { icon: 'fab fa-youtube', color: '#ff0000' }
                  ].map((social, index) => (
                    <a 
                      key={index}
                      href="#" 
                      style={{
                        width: '45px',
                        height: '45px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '1.2rem',
                        transition: 'all 0.3s',
                        textDecoration: 'none'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = social.color;
                        e.currentTarget.style.transform = 'translateY(-5px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <i className={social.icon}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-lg-2 col-md-6 col-6">
              <h5 className="fw-bold mb-4">Quick Links</h5>
              <div style={{
                width: '40px',
                height: '3px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                marginBottom: '20px'
              }} />
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {['Home', 'About Us', 'Contact Us', 'Blogs', 'Sitemaps'].map((link, index) => (
                  <li key={index} style={{ marginBottom: '12px' }}>
                    <a 
                      href="/" 
                      style={{
                        color: 'rgba(255,255,255,0.7)',
                        textDecoration: 'none',
                        fontSize: '0.95rem',
                        transition: 'all 0.3s',
                        display: 'inline-block'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#667eea';
                        e.currentTarget.style.paddingLeft = '10px';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                        e.currentTarget.style.paddingLeft = '0';
                      }}
                    >
                      <i className="fas fa-chevron-right me-2" style={{ fontSize: '0.7rem' }}></i>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Shop Now */}
            <div className="col-lg-2 col-md-6 col-6">
              <h5 className="fw-bold mb-4">Shop Now</h5>
              <div style={{
                width: '40px',
                height: '3px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                marginBottom: '20px'
              }} />
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {['Collections', 'Trending', 'New Arrivals', 'Featured', 'Cart'].map((link, index) => (
                  <li key={index} style={{ marginBottom: '12px' }}>
                    <a 
                      href="#" 
                      style={{
                        color: 'rgba(255,255,255,0.7)',
                        textDecoration: 'none',
                        fontSize: '0.95rem',
                        transition: 'all 0.3s',
                        display: 'inline-block'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#667eea';
                        e.currentTarget.style.paddingLeft = '10px';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                        e.currentTarget.style.paddingLeft = '0';
                      }}
                    >
                      <i className="fas fa-chevron-right me-2" style={{ fontSize: '0.7rem' }}></i>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="col-lg-4 col-md-6">
              <h5 className="fw-bold mb-4">Reach Us</h5>
              <div style={{
                width: '40px',
                height: '3px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                marginBottom: '20px'
              }} />
              
              <div className="mb-3">
                <div className="d-flex align-items-start mb-3">
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(102, 126, 234, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '15px',
                    flexShrink: 0
                  }}>
                    <i className="fa fa-map-marker-alt" style={{ color: '#667eea' }}></i>
                  </div>
                  <p style={{ 
                    color: 'rgba(255,255,255,0.7)', 
                    margin: 0,
                    fontSize: '0.95rem',
                    lineHeight: '1.6'
                  }}>
                    444, Bannerugatta Main Road, Bangalore, India - 560076
                  </p>
                </div>

                <div className="d-flex align-items-center mb-3">
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(102, 126, 234, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '15px'
                  }}>
                    <i className="fa fa-phone" style={{ color: '#667eea' }}></i>
                  </div>
                  <a 
                    href="tel:+919949783936" 
                    style={{
                      color: 'rgba(255,255,255,0.7)',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      transition: 'color 0.3s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#667eea'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                  >
                    +91 9949783936
                  </a>
                </div>

                <div className="d-flex align-items-center">
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(102, 126, 234, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '15px'
                  }}>
                    <i className="fa fa-envelope" style={{ color: '#667eea' }}></i>
                  </div>
                  <a 
                    href="mailto:shopifyshop@gmail.com" 
                    style={{
                      color: 'rgba(255,255,255,0.7)',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      transition: 'color 0.3s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#667eea'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                  >
                    shopifyshop@gmail.com
                  </a>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mt-4">
                <h6 className="mb-3 fw-bold" style={{ fontSize: '0.9rem' }}>
                  WE ACCEPT
                </h6>
                <div className="d-flex gap-2 flex-wrap">
                  {['cc-visa', 'cc-mastercard', 'cc-paypal', 'cc-amex'].map((payment, index) => (
                    <div 
                      key={index}
                      style={{
                        padding: '8px 12px',
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '8px'
                      }}
                    >
                      <i className={`fab fa-${payment}`} style={{ fontSize: '1.5rem', color: '#667eea' }}></i>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div style={{
        background: '#0a0a14',
        padding: '25px 0',
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <p style={{ 
                color: 'rgba(255,255,255,0.6)', 
                margin: 0,
                fontSize: '0.9rem'
              }}>
                © 2024 <span style={{ color: '#667eea', fontWeight: '600' }}>Shopfy</span> - Ecommerce. All rights reserved.
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center',
                gap: '15px',
                color: 'rgba(255,255,255,0.6)',
                fontSize: '0.9rem'
              }}>
                <span>Get Connected:</span>
                {[
                  { icon: 'fab fa-facebook', url: '#' },
                  { icon: 'fab fa-twitter', url: '#' },
                  { icon: 'fab fa-instagram', url: '#' },
                  { icon: 'fab fa-youtube', url: '#' }
                ].map((social, index) => (
                  <a 
                    key={index}
                    href={social.url}
                    style={{
                      color: 'rgba(255,255,255,0.6)',
                      fontSize: '1.1rem',
                      transition: 'all 0.3s',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#667eea';
                      e.currentTarget.style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <i className={social.icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;