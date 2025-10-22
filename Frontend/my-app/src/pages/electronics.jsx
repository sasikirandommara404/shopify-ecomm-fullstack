import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../slice/slice.jsx';
import axios from 'axios';
import '../App.css';
import {useNavigate} from 'react-router-dom'
import AddToCart from '../utils/cart.js';
import addToFavorite from '../utils/addtofavorite.js';
import { showError } from '../utils/toast.jsx';

export const Electronics = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const products = useSelector((state) => state.ecommerce.productsList);
  const user = useSelector(state=>state.ecommerce.user)
  const addtocart = (productId)=>{
    AddToCart(productId,user?.userId)
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getallproducts/electronics');
        console.log(response.data.data.products);
        dispatch(setProducts(response.data.data.products));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [dispatch]); 
  const productLink = (id)=>{
    navigate(`/productdetails/${id}`)
  }
  const addtofavorites = (productid)=>{
    if(!user){
      showError("Please Login to add wish list")
      return 
    }
    addToFavorite(productid,user.userId)
  }
  return (
    <>
      {/* Attractive Banner Section */}
      <div 
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '50px 20px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Animated Background Pattern */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)',
            backgroundSize: '40px 40px',
            animation: 'movePattern 20s linear infinite'
          }}
        />
        
        <div className="container position-relative">
          <div className="row align-items-center justify-content-center text-center">
            <div className="col-12 col-lg-10">
              {/* Decorative Element */}
              <div 
                className="mb-3"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '15px'
                }}
              >
                <span 
                  style={{
                    width: '60px',
                    height: '2px',
                    background: 'rgba(255,255,255,0.5)',
                    display: 'inline-block'
                  }}
                />
                <span 
                  className="badge px-3 py-2"
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.3)'
                  }}
                >
                  ⚡ SPECIAL OFFER
                </span>
                <span 
                  style={{
                    width: '60px',
                    height: '2px',
                    background: 'rgba(255,255,255,0.5)',
                    display: 'inline-block'
                  }}
                />
              </div>

              {/* Main Heading */}
              <h1 
                className="text-white mb-3"
                style={{
                  fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
                  fontWeight: '800',
                  textShadow: '2px 4px 8px rgba(0,0,0,0.3)',
                  letterSpacing: '-1px'
                }}
              >
                Get <span style={{
                  background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  display: 'inline-block',
                  animation: 'shimmer 3s infinite'
                }}>10% OFF</span> on Your First Order
              </h1>

              {/* Subtitle */}
              <p 
                className="text-white mb-4"
                style={{
                  fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                  fontWeight: '300',
                  opacity: 0.95,
                  maxWidth: '700px',
                  margin: '0 auto'
                }}
              >
                Premium Electronics at Unbeatable Prices
              </p>

              {/* Discount Highlight */}
              <div 
                className="d-flex flex-wrap justify-content-center gap-3 gap-md-4"
                style={{ marginTop: '30px' }}
              >
                <div 
                  className="px-4 py-3 rounded-3"
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  <div style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: '700', color: 'white' }}>
                    10%
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)', fontWeight: '500' }}>
                    DISCOUNT
                  </div>
                </div>

                <div 
                  className="px-4 py-3 rounded-3"
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  <div style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: '700', color: 'white' }}>
                    {products.length}+
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)', fontWeight: '500' }}>
                    PRODUCTS
                  </div>
                </div>

                <div 
                  className="px-4 py-3 rounded-3"
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  <div style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: '700', color: 'white' }}>
                    ⚡
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)', fontWeight: '500' }}>
                    FAST SHIP
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Bottom Wave */}
        <div 
          style={{
            position: 'absolute',
            bottom: '-1px',
            left: 0,
            width: '100%',
            overflow: 'hidden',
            lineHeight: 0
          }}
        >
          <svg 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none" 
            style={{
              width: '100%',
              height: '60px',
              fill: '#f8f9fa'
            }}
          >
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
          </svg>
        </div>
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
                        <button onClick={() => addtocart(product.id)} className="btn btn1">Add To Cart</button>
                        <button onClick ={()=>addtofavorites(product.id)} className="btn btn1"><i className="fa fa-heart"></i></button>
                        <button onClick={()=>productLink(product.productId)} className="btn btn1">View</button>
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

      {/* Animations CSS */}
      <style>{`
        @keyframes movePattern {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(40px, 40px);
          }
        }

        @keyframes shimmer {
          0%, 100% {
            filter: brightness(1);
          }
          50% {
            filter: brightness(1.3);
          }
        }

        @media (max-width: 576px) {
          .badge {
            font-size: 0.75rem !important;
            padding: 0.4rem 0.8rem !important;
          }
        }
      `}</style>
    </>
  );
};

export default Electronics;