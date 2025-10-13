import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {showSuccess,showError} from '../utils/toast.jsx'

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  
  // Review Modal States
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`http://localhost:5000/api/product/by/${id}`);
        
        if (response.data.status === 'success' && response.data.data.product) {
          setProduct(response.data.data.product);
        } else {
          setError('Product not found');
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError('Failed to load product. Please try again.');
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  const handleQuantityChange = (type) => {
    if (type === 'increment' && quantity < (product?.productStock || 0)) {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleSubmitReview = async () => {
    if (reviewRating === 0) {
      showError('Please select a rating');
      return;
    }

    try {
      setSubmittingReview(true);
      // Replace USER123456 with actual logged-in user ID from your auth system
      const userId = 'USER123456'; // TODO: Get from authentication context
      
      const response = await axios.post(
        `http://localhost:5000/api/review/${product.productId}/${userId}`,
        { userRating: reviewRating }
      );

      if (response.data.status === 'success') {
        showSuccess('Review submitted successfully!');
        setShowReviewModal(false);
        setReviewRating(0);
        // Refresh product data to show new rating
        window.location.reload();
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      showError(error.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-wrapper">
        <div className="loading-content">
          <div className="loader"></div>
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="error-wrapper">
        <div className="error-content">
          <i className="fa fa-exclamation-circle"></i>
          <h2>{error || 'Product not found'}</h2>
          <p>We couldn't find what you're looking for</p>
          <button onClick={() => navigate('/new-arrivals')} className="error-btn">
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  const discountedPrice = Math.floor(product.productPrice * 0.95);
  const savings = product.productPrice - discountedPrice;
  const productImages = product.productImage || [];
  const productCategories = product.productCategory || [];
  const isOutOfStock = product.productStock === 0;
  const currentImage = productImages[selectedImage]?.url || productImages[0]?.url || '';

  return (
    <>
      <div className="product-page">
        {/* Hero Section with Image */}
        <div className="product-hero">
          <div className="container-custom">
            <div className="hero-grid">
              {/* Left: Image Gallery */}
              <div className="gallery-section">
                <div className="main-image-box">
                  {currentImage ? (
                    <img 
                      src={currentImage} 
                      alt={product.productName}
                      className="hero-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/600?text=No+Image';
                      }}
                    />
                  ) : (
                    <div className="no-image-hero">
                      <i className="fa fa-image"></i>
                    </div>
                  )}
                  
                  {/* Badges */}
                  <div className="badges-container">
                    <span className="badge badge-discount">5% OFF</span>
                    {product.isNewArrival && <span className="badge badge-new">NEW</span>}
                    {product.isTrending && <span className="badge badge-trending">TRENDING</span>}
                  </div>
                  
                  {isOutOfStock && (
                    <div className="stock-overlay">
                      <span>OUT OF STOCK</span>
                    </div>
                  )}
                </div>

                {/* Thumbnails */}
                {productImages.length > 1 && (
                  <div className="thumbnails-row">
                    {productImages.map((image, index) => (
                      <div
                        key={image._id || index}
                        className={`thumb-item ${selectedImage === index ? 'active' : ''}`}
                        onClick={() => setSelectedImage(index)}
                      >
                        <img src={image.url} alt={`View ${index + 1}`} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Product Info */}
              <div className="info-section">
                {/* <div className="breadcrumb-nav">
                  <span onClick={() => navigate('/')}>Home</span>
                  <span className="sep">›</span>
                  <span onClick={() => navigate('/new-arrivals')}>New Arrivals</span>
                  <span className="sep">›</span>
                  <span className="active">{product.productName}</span>
                </div> */}

                {productCategories.length > 0 && (
                  <div className="category-chip">{productCategories[0]}</div>
                )}

                <h1 className="product-heading">{product.productName}</h1>
                <p className="product-sku">SKU: {product.productId}</p>

                {/* Rating */}
                <div className="rating-row">
                  <div className="stars-display">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={star <= Math.floor(product.averageRating) ? 'star filled' : 'star'}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="rating-text">
                    {product.averageRating.toFixed(1)} ({product.productRating?.length || 0} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="price-box">
                  <div className="price-row">
                    <span className="price-current">₹{discountedPrice.toLocaleString()}</span>
                    <span className="price-old">₹{product.productPrice.toLocaleString()}</span>
                  </div>
                  <div className="savings-tag">You save ₹{savings.toLocaleString()} (5%)</div>
                </div>

                {/* Stock */}
                <div className={`stock-badge ${isOutOfStock ? 'out' : 'in'}`}>
                  {isOutOfStock ? (
                    <>
                      <i className="fa fa-times-circle"></i> Out of Stock
                    </>
                  ) : product.productStock <= 5 ? (
                    <>
                      <i className="fa fa-exclamation-triangle"></i> Only {product.productStock} left!
                    </>
                  ) : (
                    <>
                      <i className="fa fa-check-circle"></i> In Stock ({product.productStock} units)
                    </>
                  )}
                </div>

                {/* Quantity */}
                {!isOutOfStock && (
                  <div className="quantity-box">
                    <label>Quantity</label>
                    <div className="qty-controls">
                      <button onClick={() => handleQuantityChange('decrement')} disabled={quantity <= 1}>
                        <i className="fa fa-minus"></i>
                      </button>
                      <input type="text" value={quantity} readOnly />
                      <button onClick={() => handleQuantityChange('increment')} disabled={quantity >= product.productStock}>
                        <i className="fa fa-plus"></i>
                      </button>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="actions-grid">
                  <button className="btn-primary" disabled={isOutOfStock}>
                    <i className="fa fa-shopping-bag"></i>
                    Add to Cart
                  </button>
                  <button className="btn-secondary" disabled={isOutOfStock}>
                    <i className="fa fa-bolt"></i>
                    Buy Now
                  </button>
                  <button className="btn-icon">
                    <i className="fa fa-heart"></i>
                  </button>
                  <button className="btn-review" onClick={() => setShowReviewModal(true)}>
                    <i className="fa fa-star"></i>
                    Add Review
                  </button>
                </div>

                {/* Features */}
                <div className="features-list">
                  <div className="feature-item">
                    <i className="fa fa-truck"></i>
                    <span>Free shipping on orders over ₹999</span>
                  </div>
                  <div className="feature-item">
                    <i className="fa fa-rotate-left"></i>
                    <span>7 days easy return policy</span>
                  </div>
                  <div className="feature-item">
                    <i className="fa fa-shield-halved"></i>
                    <span>100% authentic guarantee</span>
                  </div>
                  <div className="feature-item">
                    <i className="fa fa-clock"></i>
                    <span>Delivery in 3-5 business days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="details-section">
          <div className="container-custom">
            <div className="details-tabs">
              <div className="tab-content active">
                <h2>Product Description</h2>
                <p className="description-text">
                  {product.productDescription || 'No description available for this product.'}
                </p>

                <h3>Product Information</h3>
                <div className="info-table">
                  <div className="info-row">
                    <span className="info-label">Category</span>
                    <span className="info-value">{productCategories.join(', ') || 'N/A'}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Stock Availability</span>
                    <span className="info-value">{product.productStock} units</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Store ID</span>
                    <span className="info-value">{product.storeId}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Date Added</span>
                    <span className="info-value">
                      {new Date(product.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Last Updated</span>
                    <span className="info-value">
                      {new Date(product.updatedAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="modal-overlay" onClick={() => setShowReviewModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowReviewModal(false)}>
              <i className="fa fa-times"></i>
            </button>
            
            <h2>Rate this Product</h2>
            <p className="modal-subtitle">Share your experience with {product.productName}</p>
            
            <div className="rating-selector">
              <p className="rating-label">Your Rating</p>
              <div className="stars-interactive">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star-btn ${star <= (hoverRating || reviewRating) ? 'active' : ''}`}
                    onClick={() => setReviewRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    ★
                  </span>
                ))}
              </div>
              {reviewRating > 0 && (
                <p className="rating-desc">
                  {reviewRating === 1 && "Poor"}
                  {reviewRating === 2 && "Fair"}
                  {reviewRating === 3 && "Good"}
                  {reviewRating === 4 && "Very Good"}
                  {reviewRating === 5 && "Excellent"}
                </p>
              )}
            </div>

            <div className="modal-actions">
              <button 
                className="btn-cancel" 
                onClick={() => setShowReviewModal(false)}
                disabled={submittingReview}
              >
                Cancel
              </button>
              <button 
                className="btn-submit" 
                onClick={handleSubmitReview}
                disabled={submittingReview || reviewRating === 0}
              >
                {submittingReview ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .product-page {
          background: #ffffff;
          min-height: 100vh;
        }

        .container-custom {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* Hero Section */
        .product-hero {
          padding: 40px 0 60px;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: start;
        }

        /* Gallery */
        .gallery-section {
          position: sticky;
          top: 20px;
        }

        .main-image-box {
          position: relative;
          width: 100%;
          aspect-ratio: 1;
          background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
        }

        .hero-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .no-image-hero {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 80px;
          color: #cbd5e1;
        }

        .badges-container {
          position: absolute;
          top: 20px;
          left: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          z-index: 2;
        }

        .badge {
          padding: 8px 16px;
          border-radius: 30px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          width: fit-content;
        }

        .badge-discount {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .badge-new {
          background: #10b981;
          color: white;
        }

        .badge-trending {
          background: #f59e0b;
          color: white;
        }

        .stock-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.75);
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(4px);
        }

        .stock-overlay span {
          background: white;
          color: #dc2626;
          padding: 12px 32px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 18px;
        }

        .thumbnails-row {
          display: flex;
          gap: 12px;
          margin-top: 16px;
          overflow-x: auto;
          padding-bottom: 8px;
        }

        .thumb-item {
          flex-shrink: 0;
          width: 80px;
          height: 80px;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          border: 3px solid transparent;
          transition: all 0.3s ease;
        }

        .thumb-item:hover {
          border-color: #e2e8f0;
        }

        .thumb-item.active {
          border-color: #667eea;
        }

        .thumb-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Info Section */
        .info-section {
          padding-top: 8px;
        }

        .breadcrumb-nav {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #64748b;
          margin-bottom: 20px;
        }

        .breadcrumb-nav span {
          cursor: pointer;
          transition: color 0.2s;
        }

        .breadcrumb-nav span:hover:not(.sep):not(.active) {
          color: #334155;
        }

        .breadcrumb-nav .active {
          color: #0f172a;
          font-weight: 500;
        }

        .breadcrumb-nav .sep {
          cursor: default;
        }

        .category-chip {
          display: inline-block;
          background: #f1f5f9;
          color: #475569;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .product-heading {
          font-size: 36px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 8px 0;
          line-height: 1.2;
        }

        .product-sku {
          font-size: 14px;
          color: #94a3b8;
          margin: 0 0 20px 0;
        }

        .rating-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        .stars-display {
          display: flex;
          gap: 4px;
        }

        .star {
          font-size: 22px;
          color: #e2e8f0;
        }

        .star.filled {
          color: #fbbf24;
        }

        .rating-text {
          font-size: 15px;
          color: #64748b;
          font-weight: 500;
        }

        .price-box {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          padding: 24px;
          border-radius: 16px;
          margin-bottom: 24px;
        }

        .price-row {
          display: flex;
          align-items: baseline;
          gap: 16px;
          margin-bottom: 12px;
        }

        .price-current {
          font-size: 42px;
          font-weight: 800;
          color: #0f172a;
        }

        .price-old {
          font-size: 24px;
          color: #94a3b8;
          text-decoration: line-through;
        }

        .savings-tag {
          display: inline-block;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
        }

        .stock-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 14px 20px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 24px;
        }

        .stock-badge.in {
          background: #d1fae5;
          color: #065f46;
        }

        .stock-badge.out {
          background: #fee2e2;
          color: #991b1b;
        }

        .quantity-box {
          margin-bottom: 28px;
        }

        .quantity-box label {
          display: block;
          font-size: 15px;
          font-weight: 600;
          color: #334155;
          margin-bottom: 12px;
        }

        .qty-controls {
          display: flex;
          align-items: center;
          width: fit-content;
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
        }

        .qty-controls button {
          width: 44px;
          height: 44px;
          border: none;
          background: transparent;
          cursor: pointer;
          transition: background 0.2s;
          font-size: 14px;
          color: #475569;
        }

        .qty-controls button:hover:not(:disabled) {
          background: #f8fafc;
        }

        .qty-controls button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .qty-controls input {
          width: 60px;
          height: 44px;
          border: none;
          text-align: center;
          font-size: 16px;
          font-weight: 600;
          color: #0f172a;
          border-left: 1px solid #e2e8f0;
          border-right: 1px solid #e2e8f0;
        }

        .actions-grid {
          display: grid;
          grid-template-columns: 1fr 1fr auto;
          gap: 12px;
          margin-bottom: 32px;
        }

        .btn-primary, .btn-secondary, .btn-icon, .btn-review {
          padding: 16px 24px;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          grid-column: span 2;
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
        }

        .btn-secondary {
          background: #0f172a;
          color: white;
          grid-column: span 2;
        }

        .btn-secondary:hover:not(:disabled) {
          background: #1e293b;
          transform: translateY(-2px);
        }

        .btn-icon {
          width: 52px;
          padding: 16px;
          background: white;
          border: 2px solid #e2e8f0;
          color: #64748b;
        }

        .btn-icon:hover {
          border-color: #ef4444;
          color: #ef4444;
        }

        .btn-review {
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          color: white;
          grid-column: span 3;
        }

        .btn-review:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(251, 191, 36, 0.4);
        }

        .btn-primary:disabled, .btn-secondary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        .features-list {
          background: #f8fafc;
          padding: 24px;
          border-radius: 16px;
          display: grid;
          gap: 14px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          color: #475569;
        }

        .feature-item i {
          font-size: 18px;
          color: #667eea;
          width: 20px;
        }

        /* Details Section */
        .details-section {
          background: #f8fafc;
          padding: 60px 0;
        }

        .details-tabs {
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
        }

        .tab-content h2 {
          font-size: 28px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 16px 0;
        }

        .tab-content h3 {
          font-size: 20px;
          font-weight: 600;
          color: #334155;
          margin: 32px 0 16px 0;
        }

        .description-text {
          font-size: 16px;
          line-height: 1.8;
          color: #64748b;
          margin: 0 0 32px 0;
        }

        .info-table {
          display: grid;
          gap: 1px;
          background: #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
        }

        .info-row {
          display: grid;
          grid-template-columns: 200px 1fr;
          background: white;
          padding: 16px 20px;
        }

        .info-label {
          font-size: 14px;
          color: #64748b;
          font-weight: 600;
        }

        .info-value {
          font-size: 14px;
          color: #0f172a;
          font-weight: 500;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
        }

        .modal-content {
          background: white;
          border-radius: 24px;
          padding: 40px;
          max-width: 500px;
          width: calc(100% - 32px);
          position: relative;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 36px;
          height: 36px;
          border: none;
          background: #f1f5f9;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .modal-close:hover {
          background: #e2e8f0;
          transform: rotate(90deg);
        }

        .modal-content h2 {
          font-size: 28px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 8px 0;
        }

        .modal-subtitle {
          font-size: 15px;
          color: #64748b;
          margin: 0 0 32px 0;
        }

        .rating-selector {
          text-align: center;
          margin-bottom: 32px;
        }

        .rating-label {
          font-size: 16px;
          font-weight: 600;
          color: #334155;
          margin: 0 0 16px 0;
        }

        .stars-interactive {
          display: flex;
          gap: 12px;
          justify-content: center;
          margin-bottom: 12px;
        }

        .star-btn {
          font-size: 48px;
          color: #e2e8f0;
          cursor: pointer;
          transition: all 0.2s;
          user-select: none;
        }

        .star-btn:hover {
          transform: scale(1.2);
        }

        .star-btn.active {
          color: #fbbf24;
          transform: scale(1.1);
        }

        .rating-desc {
          font-size: 18px;
          font-weight: 600;
          color: #667eea;
          margin: 8px 0 0 0;
        }

        .modal-actions {
          display: flex;
          gap: 12px;
        }

        .btn-cancel, .btn-submit {
          flex: 1;
          padding: 14px;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-cancel {
          background: #f1f5f9;
          color: #475569;
        }

        .btn-cancel:hover:not(:disabled) {
          background: #e2e8f0;
        }

        .btn-submit {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .btn-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
        }

        .btn-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        /* Loading & Error */
        .loading-wrapper, .error-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8fafc;
        }

        .loading-content, .error-content {
          text-align: center;
          max-width: 400px;
        }

        .loader {
          width: 60px;
          height: 60px;
          border: 4px solid #e2e8f0;
          border-top: 4px solid #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .loading-content p {
          font-size: 16px;
          color: #64748b;
          margin: 0;
        }

        .error-content i {
          font-size: 80px;
          color: #ef4444;
          margin-bottom: 20px;
        }

        .error-content h2 {
          font-size: 28px;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 12px 0;
        }

        .error-content p {
          font-size: 16px;
          color: #64748b;
          margin: 0 0 28px 0;
        }

        .error-btn {
          padding: 14px 32px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .error-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .gallery-section {
            position: static;
          }

          .main-image-box {
            max-width: 600px;
            margin: 0 auto;
          }
        }

        @media (max-width: 768px) {
          .container-custom {
            padding: 0 16px;
          }

          .product-hero {
            padding: 24px 0 40px;
          }

          .product-heading {
            font-size: 28px;
          }

          .price-current {
            font-size: 32px;
          }

          .price-old {
            font-size: 20px;
          }

          .actions-grid {
            grid-template-columns: 1fr;
          }

          .btn-primary, .btn-secondary, .btn-review {
            grid-column: span 1;
          }

          .btn-icon {
            width: 100%;
          }

          .details-tabs {
            padding: 24px;
          }

          .info-row {
            grid-template-columns: 1fr;
            gap: 4px;
          }

          .modal-content {
            padding: 28px;
          }

          .stars-interactive {
            gap: 8px;
          }

          .star-btn {
            font-size: 40px;
          }
        }

        @media (max-width: 480px) {
          .product-heading {
            font-size: 24px;
          }

          .price-current {
            font-size: 28px;
          }

          .thumbnails-row {
            gap: 8px;
          }

          .thumb-item {
            width: 60px;
            height: 60px;
          }

          .breadcrumb-nav {
            font-size: 12px;
          }

          .modal-content h2 {
            font-size: 24px;
          }

          .star-btn {
            font-size: 36px;
          }
        }
      `}</style>
    </>
  );
};

export default ProductDetails;