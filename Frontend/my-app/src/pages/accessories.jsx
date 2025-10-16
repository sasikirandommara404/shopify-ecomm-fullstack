import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../slice/slice.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import AddToCart from '../utils/cart.js'

export const Accessories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.ecommerce.productsList);
  const user = useSelector((state) => state.ecommerce.user); 
  
  const addtocart = async (productId) => {
    await AddToCart(productId, user?.userId);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getallproducts/Accessories');
        console.log(response.data.data.products);
        dispatch(setProducts(response.data.data.products));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [dispatch]); 
  
  const productLink = (id) => {
    navigate(`/productdetails/${id}`)
  }
  
  return (
    <>
      {/* Ultra Modern Accessories Banner */}
      <div 
        style={{
          position: 'relative',
          height: '350px',
          overflow: 'hidden',
          backgroundImage: 'url(https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=1500&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {/* Dark Overlay for Better Text Visibility */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(255,107,107,0.85) 0%, rgba(255,230,109,0.75) 50%, rgba(78,205,196,0.85) 100%)',
            zIndex: 1
          }}
        />
        {/* Animated Geometric Shapes */}
        <div 
          style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '200px',
            height: '200px',
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            animation: 'morph 8s ease-in-out infinite',
            zIndex: 2
          }}
        />
        <div 
          style={{
            position: 'absolute',
            bottom: '-60px',
            left: '-60px',
            width: '250px',
            height: '250px',
            background: 'rgba(255,255,255,0.12)',
            borderRadius: '63% 37% 54% 46% / 55% 48% 52% 45%',
            animation: 'morph 10s ease-in-out infinite reverse',
            zIndex: 2
          }}
        />
        <div 
          style={{
            position: 'absolute',
            top: '50%',
            right: '15%',
            width: '100px',
            height: '100px',
            background: 'rgba(255,255,255,0.18)',
            borderRadius: '50%',
            animation: 'float 6s ease-in-out infinite',
            transform: 'translateY(-50%)',
            zIndex: 2
          }}
        />

        {/* Diagonal Stripes Pattern */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.08) 35px, rgba(255,255,255,0.08) 70px)',
            animation: 'slide 20s linear infinite',
            zIndex: 2
          }}
        />

        <div className="container position-relative" style={{ zIndex: 10 }}>
          <div className="row align-items-center">
            <div className="col-lg-7">
              {/* Stylish Top Badge */}
              <div className="mb-3 d-flex align-items-center gap-2">
                <div 
                  style={{
                    width: '40px',
                    height: '2px',
                    background: 'white',
                    animation: 'expandWidth 2s ease-in-out infinite'
                  }}
                />
                <span 
                  style={{
                    background: 'white',
                    color: '#FF6B6B',
                    padding: '8px 20px',
                    borderRadius: '50px',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    letterSpacing: '1px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                    animation: 'bounce 2s ease-in-out infinite'
                  }}
                >
                  🎯 ACCESSORIES SPECIAL
                </span>
              </div>

              {/* Main Heading with Split Effect */}
              <div className="mb-3">
                <h1 
                  className="text-white mb-1"
                  style={{
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                    fontWeight: '900',
                    textShadow: '4px 4px 0px rgba(0,0,0,0.2)',
                    letterSpacing: '-2px',
                    lineHeight: '1.1'
                  }}
                >
                  SAVE BIG ON
                </h1>
                <h2 
                  style={{
                    fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                    fontWeight: '900',
                    background: 'linear-gradient(45deg, #FFF, #FFE66D)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '4px 4px 0px rgba(0,0,0,0.1)',
                    letterSpacing: '-2px',
                    lineHeight: '1',
                    animation: 'slideInRight 1s ease-out'
                  }}
                >
                  ACCESSORIES
                </h2>
              </div>

              {/* Discount Tag */}
              <div className="d-inline-flex align-items-center gap-3 mb-3">
                <div 
                  style={{
                    background: 'white',
                    padding: '15px 30px',
                    borderRadius: '15px',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                    transform: 'rotate(-2deg)',
                    animation: 'wiggle 3s ease-in-out infinite'
                  }}
                >
                  <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#FF6B6B', lineHeight: '1' }}>
                    2%
                  </div>
                  <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#333', letterSpacing: '1px' }}>
                    OFF
                  </div>
                </div>
                <div>
                  <div 
                    className="text-white"
                    style={{
                      fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                      fontWeight: '600',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                    }}
                  >
                    First Order Discount
                  </div>
                  <div 
                    className="text-white"
                    style={{
                      fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)',
                      opacity: 0.9
                    }}
                  >
                    Limited Time Offer! 🔥
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Stats Cards */}
            <div className="col-lg-5 d-none d-lg-block">
              <div className="d-flex flex-wrap gap-3 justify-content-end">
                {/* Products Count Card */}
                <div 
                  style={{
                    background: 'rgba(255,255,255,0.95)',
                    padding: '20px 25px',
                    borderRadius: '20px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid white',
                    minWidth: '120px',
                    textAlign: 'center',
                    animation: 'floatUp 3s ease-in-out infinite'
                  }}
                >
                  <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#FF6B6B', lineHeight: '1' }}>
                    {products.length}+
                  </div>
                  <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#666', marginTop: '5px', letterSpacing: '1px' }}>
                    PRODUCTS
                  </div>
                </div>

                {/* Quality Badge */}
                <div 
                  style={{
                    background: 'rgba(255,255,255,0.95)',
                    padding: '20px 25px',
                    borderRadius: '20px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid white',
                    minWidth: '120px',
                    textAlign: 'center',
                    animation: 'floatUp 3s ease-in-out infinite 0.5s'
                  }}
                >
                  <div style={{ fontSize: '2.5rem', lineHeight: '1' }}>
                    ⭐
                  </div>
                  <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#666', marginTop: '5px', letterSpacing: '1px' }}>
                    PREMIUM
                  </div>
                </div>

                {/* Shipping Badge */}
                <div 
                  style={{
                    background: 'rgba(255,255,255,0.95)',
                    padding: '20px 25px',
                    borderRadius: '20px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid white',
                    minWidth: '120px',
                    textAlign: 'center',
                    animation: 'floatUp 3s ease-in-out infinite 1s'
                  }}
                >
                  <div style={{ fontSize: '2.5rem', lineHeight: '1' }}>
                    🚚
                  </div>
                  <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#666', marginTop: '5px', letterSpacing: '1px' }}>
                    FREE SHIP
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave Decoration */}
        <div 
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '60px',
            background: 'white',
            clipPath: 'polygon(0 50%, 100% 0, 100% 100%, 0 100%)',
            zIndex: 3
          }}
        />
      </div>

      {/* Products Section */}
      <div className="py-3 py-md-5 bg-light">
        <div className="container">
          <div className="row">
            {products && products.length > 0 ? (
              products.map((product) => (
                <div className="col-6 col-md-3 mb-4" key={product._id}>
                  <div className="product-card">
                    <div className="product-card-img">
                      <img src={product.productImage[0]?.url} alt={product.productName} />
                    </div>
                    <div className="product-card-body">
                      <p className="product-brand">{product.productCategory[0]}</p>
                      <h5 className="product-name">
                        <a href="#">{product.productName}</a>
                      </h5>
                      <div>
                        <span className="selling-price">₹{product.productPrice}</span>
                        <span className="original-price">₹{Math.floor(product.productPrice * 1.2)}</span>
                      </div>
                      <div className="mt-2 button-row">
                        <button onClick={() => addtocart(product._id)} className="btn btn1">Add To Cart</button>
                        <a href="#" className="btn btn1"><i className="fa fa-heart"></i></a>
                        <button onClick={() => productLink(product.productId)} className="btn btn1">View</button>
                        <span className={`stock-badge ${product.productStock > 0 ? "bg-success" : "bg-danger"}`}>
                          {product.productStock > 0 ? "In Stock" : "Out of Stock"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No products available</p>
            )}
          </div>
        </div>
      </div>

      {/* Advanced Animations CSS */}
      <style>{`
        @keyframes morph {
          0%, 100% {
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
            transform: rotate(0deg);
          }
          50% {
            border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
            transform: rotate(180deg);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(-50%) translateX(0);
          }
          50% {
            transform: translateY(-50%) translateX(20px);
          }
        }

        @keyframes slide {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 70px 70px;
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes wiggle {
          0%, 100% {
            transform: rotate(-2deg);
          }
          50% {
            transform: rotate(2deg);
          }
        }

        @keyframes floatUp {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes slideInRight {
          0% {
            opacity: 0;
            transform: translateX(50px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes expandWidth {
          0%, 100% {
            width: 40px;
          }
          50% {
            width: 60px;
          }
        }

        @media (max-width: 576px) {
          .badge {
            font-size: 0.7rem !important;
            padding: 0.4rem 0.8rem !important;
          }
        }
      `}</style>
    </>
  );
};

export default Accessories;