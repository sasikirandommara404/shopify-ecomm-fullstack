import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../slice/slice.jsx';
import axios from 'axios';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import AddToCart from '../utils/cart.js';


export const NewArrivals = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.ecommerce.productsList);
  const navigate= useNavigate()
  const user = useSelector(state=>state.ecommerce.user)
  const addtocart = (productId)=>{
      AddToCart(productId,user?.userId)
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getallproducts/newArrivals');
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
  
  return (
    <>
      {/* Banner Section */}
      <div style={styles.bannerContainer}>
        <div style={styles.bannerOverlay}></div>
        <div style={styles.bannerContent}>
          <div style={styles.badgeContainer}>
            <span style={styles.badge}>NEW</span>
          </div>
          <h1 style={styles.bannerTitle}>
            New Arrivals
          </h1>
          <p style={styles.bannerSubtitle}>
            Fresh styles just landed
          </p>
          <div style={styles.discountTag}>
            <span style={styles.discountText}>5% OFF</span>
            <span style={styles.discountSubtext}>on all new arrivals</span>
          </div>
          <button style={styles.shopButton}>
            Shop Now
            <span style={styles.arrow}>→</span>
          </button>
        </div>
        <div style={styles.decorativeCircle1}></div>
        <div style={styles.decorativeCircle2}></div>
      </div>

      {/* Products Section */}
      <div className="py-3 py-md-5 bg-light">
        <div className="container">
          <div className="row">
            {products && products.length > 0 ? (
              products.map((product) => (
                <div className="col-6 col-md-3 mb-4" key={product._id}>
                  <div className="product-card">
                    <div className="product-card-img" style={{position: 'relative'}}>
                      <img src={product.productImage[0]?.url} alt={product.productName} />
                      {/* 5% Discount Badge */}
                      <span style={styles.productDiscountBadge}>-5%</span>
                    </div>
                    <div className="product-card-body">
                      <p className="product-brand">{product.productCategory[0]}</p>
                      <h5 className="product-name">
                        <a href="#">{product.productName}</a>
                      </h5>
                      <div>
                        <span className="selling-price">
                          ₹{Math.floor(product.productPrice * 0.95)}
                        </span>
                        <span className="original-price">
                          ₹{product.productPrice}
                        </span>
                      </div>
                      <div className="mt-2 button-row">
                        <buton onClick={() => addtocart(product.id)}  className="btn btn1">Add To Cart</buton>
                        <a href="#" className="btn btn1"><i className="fa fa-heart"></i></a>
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
    </>
  );
};

const styles = {
  bannerContainer: {
    position: 'relative',
    height: '350px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: '0',
  },
  bannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.2)',
    zIndex: 1,
  },
  bannerContent: {
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
    color: 'white',
    padding: '0 20px',
    maxWidth: '800px',
  },
  badgeContainer: {
    marginBottom: '15px',
  },
  badge: {
    display: 'inline-block',
    padding: '8px 20px',
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    borderRadius: '30px',
    fontSize: '12px',
    fontWeight: '600',
    letterSpacing: '2px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
  bannerTitle: {
    fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
    fontWeight: '800',
    margin: '10px 0',
    textShadow: '2px 4px 8px rgba(0, 0, 0, 0.3)',
    letterSpacing: '-1px',
  },
  bannerSubtitle: {
    fontSize: 'clamp(1rem, 3vw, 1.5rem)',
    marginBottom: '25px',
    opacity: '0.95',
    fontWeight: '300',
    letterSpacing: '1px',
  },
  discountTag: {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    padding: '15px 35px',
    borderRadius: '50px',
    marginBottom: '30px',
    boxShadow: '0 8px 20px rgba(245, 87, 108, 0.4)',
    transform: 'rotate(-2deg)',
  },
  discountText: {
    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
    fontWeight: '800',
    display: 'block',
    lineHeight: '1',
  },
  discountSubtext: {
    fontSize: 'clamp(0.75rem, 2vw, 1rem)',
    fontWeight: '400',
    opacity: '0.9',
  },
  shopButton: {
    background: 'white',
    color: '#667eea',
    border: 'none',
    padding: '15px 40px',
    fontSize: '1.1rem',
    fontWeight: '600',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
  },
  arrow: {
    transition: 'transform 0.3s ease',
  },
  decorativeCircle1: {
    position: 'absolute',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.1)',
    top: '-200px',
    right: '-100px',
    zIndex: 0,
  },
  decorativeCircle2: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.08)',
    bottom: '-150px',
    left: '-80px',
    zIndex: 0,
  },
  productDiscountBadge: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    color: 'white',
    padding: '5px 12px',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: '700',
    boxShadow: '0 2px 8px rgba(245, 87, 108, 0.4)',
    zIndex: 10,
  }
};

export default NewArrivals;