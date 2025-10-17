import { useState, useEffect } from 'react';
import { Trash2, Plus, Minus, ShoppingCart, Loader } from 'lucide-react';
import api from '../api/axios';
import { showSuccess, showError } from '../utils/toast';
import { useSelector, useDispatch } from 'react-redux';
import { setCartItems } from '../slice/slice.jsx';

const ShoppingCartPage = () => {
  const cartItems = useSelector(state => state.ecommerce.cart) || [];
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(state => state.ecommerce.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.userId) {
      fetchCartItems();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const fetchCartItems = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`/cart/${user?.userId}`);
      const products = response.data.data.cart.productId || [];
      dispatch(setCartItems(products));
    } catch (error) {
      console.error('Failed to fetch cart items:', error);
      showError('Failed to load cart items');
      dispatch(setCartItems([]));
    } finally {
      setIsLoading(false);
    }
  };

  

  const removeItem = async (productId) => {
    try {
      console.log('Removing item with ID:', productId);
      const response = await api.post(`/remove-from-cart`, {
        userId: user.userId,
        productId: [productId]
      });
      if (response.data.status === 'success') {
        showSuccess('Item removed from cart');
        fetchCartItems();
      }
    } catch (error) {
      console.error('Failed to remove item:', error);
      showError('Failed to remove item');
      fetchCartItems();
    }
  };

  const getProductImage = (item) => {
    const images = item.ProductImage || item.productImage;
    if (images && images.length > 0) {
      return images[0].url;
    }
    return 'https://via.placeholder.com/60?text=No+Image';
  };

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f8f9fa', paddingTop: '2rem', paddingBottom: '2rem' }}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="d-flex align-items-center mb-4">
              <ShoppingCart className="me-3" size={32} style={{ color: '#2874f0' }} />
              <h2 className="mb-0 fw-bold">Shopping Cart</h2>
              {!isLoading && cartItems.length > 0 && (
                <span className="ms-3 badge bg-primary"> items</span>
              )}
            </div>

            {isLoading && (
              <div className="text-center py-5">
                <Loader className="mb-3" size={48} style={{ color: '#2874f0', animation: 'spin 1s linear infinite' }} />
                <p className="text-muted">Loading your cart...</p>
              </div>
            )}

            {!isLoading && cartItems.length === 0 && (
              <div className="text-center py-5 bg-white rounded shadow-sm p-5">
                <ShoppingCart size={64} className="text-muted mb-3" />
                <h4 className="mb-2">Your cart is empty</h4>
                <p className="text-muted mb-4">Add some items to get started!</p>
                <a href="/" className="btn btn-primary px-4 py-2">Continue Shopping</a>
              </div>
            )}

            {!isLoading && cartItems.length > 0 && (
              <>
                <div className="shopping-cart">
                  {cartItems.map((item) => (
                    <div key={item.productId} className="cart-item bg-white rounded shadow-sm p-3 mb-3">
                      <div className="row align-items-center">
                        <div className="col-md-6 my-2">
                          <div className="d-flex align-items-center">
                            <img
                              src={getProductImage(item)}
                              alt={item.productName}
                              className="rounded"
                              style={{ 
                                width: '70px', 
                                height: '70px', 
                                objectFit: 'cover',
                                border: '1px solid #e0e0e0'
                              }}
                            />
                            <div className="ms-3 flex-grow-1">
                              <h6 className="mb-1 fw-semibold" style={{ 
                                fontSize: '0.95rem',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical'
                              }}>
                                {item.productName}
                              </h6>
                              <p className="text-muted small mb-1 d-lg-none">
                                ₹{item.productPrice.toLocaleString('en-IN')}
                              </p>
                              {item.productStock === 0 && (
                                <span className="badge bg-danger small">Out of Stock</span>
                              )}
                              {item.productStock > 0 && item.productStock <= 5 && (
                                <span className="badge bg-warning text-dark small">
                                  Only {item.productStock} left
                                </span>
                              )}
                              {item.productCategory && item.productCategory.length > 0 && (
                                <div className="mt-1">
                                  <span className="badge bg-light text-dark small">
                                    {item.productCategory[0]}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="col-md-2 my-2 d-none d-lg-block">
                          <span className="fw-semibold" style={{ fontSize: '1.1rem' }}>
                            ₹{item.productPrice.toLocaleString('en-IN')}
                          </span>
                        </div>

                        <div className="col-md-2 col-7 my-2">
                          <div className="d-flex align-items-center">
                            <button
                              className="btn btn-sm border d-flex align-items-center justify-content-center"
                              disabled={item.productStock === 0 || (item.quantity || 1) <= 1}
                              style={{ 
                                width: '34px', 
                                height: '34px', 
                                padding: 0,
                                borderRadius: '4px'
                              }}
                            >
                              <Minus size={16} />
                            </button>
                            <input
                              type="text"
                              value={item.quantity || 1}
                              readOnly
                              className="form-control text-center mx-2"
                              style={{ 
                                width: '55px', 
                                height: '34px',
                                fontWeight: '600'
                              }}
                            />
                            <button
                              className="btn btn-sm border d-flex align-items-center justify-content-center"
                              disabled={item.productStock === 0 || (item.quantity || 1) >= item.productStock}
                              style={{ 
                                width: '34px', 
                                height: '34px', 
                                padding: 0,
                                borderRadius: '4px'
                              }}
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>

                        <div className="col-md-2 col-5 my-2">
                          <button
                            className="btn btn-danger btn-sm d-flex align-items-center w-100 justify-content-center"
                            onClick={() => removeItem(item.id)}
                            style={{ height: '34px' }}
                          >
                            <Trash2 size={16} className="me-1" />
                            <span className="d-none d-sm-inline">Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="row mt-4">
                  <div className="col-lg-8"></div>
                  <div className="col-lg-4">
                    <div className="card shadow-sm border-0">
                      <div className="card-body p-4">
                        <h5 className="card-title mb-3 fw-bold">Order Summary</h5>
                        <div className="d-flex justify-content-between mb-2">
                          <span className="text-muted">Subtotal items</span>
                          <span className="fw-semibold">₹</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span className="text-muted">Shipping</span>
                          <span className="text-success fw-semibold">FREE</span>
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                          <span className="text-muted">Tax</span>
                          <span className="fw-semibold">₹0</span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between mb-4">
                          <h5 className="mb-0 fw-bold">Total</h5>
                          <h5 className="mb-0 text-primary fw-bold">
                            
                          </h5>
                        </div>
                        <button className="btn btn-primary w-100 py-2 fw-semibold mb-2">
                          Proceed to Checkout
                        </button>
                        <a href="/" className="btn btn-outline-secondary w-100 py-2">
                          Continue Shopping
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .cart-item {
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .cart-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
        }
        
        .btn {
          transition: all 0.2s;
        }
        
        .btn:hover:not(:disabled) {
          transform: scale(1.05);
        }
        
        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        @media (max-width: 768px) {
          .cart-item img {
            width: 55px !important;
            height: 55px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ShoppingCartPage;