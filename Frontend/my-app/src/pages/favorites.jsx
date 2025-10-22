import { useState, useEffect } from 'react';
import { Heart, X, Star, Package, Sparkles, ShoppingBag } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import api from '../api/axios.js';
import { setWishList } from '../slice/slice.jsx';
import { showError, showSuccess } from '../utils/toast';
import AddToCart from '../utils/cart';
import { useNavigate } from 'react-router-dom';

const FavoritesPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const favorites = useSelector((state) => state.ecommerce.wishlist); 
    const user = useSelector(state => state.ecommerce.user);
    const [loading, setLoading] = useState(true);
    const [removingId, setRemovingId] = useState(null);

    const fetchFavorites = async () => {
        try {
            const response = await api.get(`favorites/${user?.userId}`);
            const products = response.data.data.favorite.productId || [];
            dispatch(setWishList(products));                
            setLoading(false);
        } catch (error) {
            console.error('Error fetching favorites:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchFavorites();
        } else {
            setLoading(false);
        }  
    }, [user, dispatch]);

    const removeFromWishList = async (productId) => {
        try {
            if (!user) {
                showError("Please login");
                return;
            }
            
            setRemovingId(productId);
            const response = await api.post('remove-from-favorites', {
                userId: user.userId,
                productId: productId
            });
            
            if (response.data.message === "Product removed from favorites successfully") {
                showSuccess("Product removed from wishlist");
                await fetchFavorites();
            } else {
                showError(response.data.message);
            }
        } catch (error) {
            console.log(error);
            showError("Something went wrong please try again later");
        } finally {
            setRemovingId(null);
        }
    };

    const addtocart = (id) => {
        if (!user) {
            showError("Please Login");
            return;
        }
        AddToCart(id, user.userId);
    };

    const taketohomepage = () => {
        navigate('/');
    };

    if (loading) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: '#fafbfc' }}>
                <div className="text-center">
                    <div className="spinner-border" style={{ width: '3rem', height: '3rem', color: '#6366f1' }} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3 fs-5 fw-medium" style={{ color: '#1e293b' }}>Loading your favorites...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ background: '#fafbfc', minHeight: '100vh' }}>
            <div className="container py-5">
                
                {favorites.length === 0 && (
                    <div className="text-center py-5">
                        <div className="mx-auto mb-4" style={{ width: '160px', height: '160px', background: 'linear-gradient(135deg, #fef3f2 0%, #fff1f2 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px dashed #fca5a5' }}>
                            <Heart size={70} style={{ color: '#fca5a5', strokeWidth: 1.5 }} />
                        </div>
                        <h3 className="mb-3 fw-bold" style={{ color: '#1e293b' }}>Your wishlist is waiting</h3>
                        <p className="mb-4" style={{ color: '#64748b', maxWidth: '400px', margin: '0 auto' }}>
                            Discover amazing products and save them here for later
                        </p>
                        <button 
                            onClick={taketohomepage}
                            className="btn btn-lg px-5 py-3 fw-semibold border-0" 
                            style={{ 
                                background: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
                                color: 'white',
                                borderRadius: '50px',
                                boxShadow: '0 10px 30px rgba(236, 72, 153, 0.3)',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-3px)';
                                e.currentTarget.style.boxShadow = '0 15px 40px rgba(236, 72, 153, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 10px 30px rgba(236, 72, 153, 0.3)';
                            }}>
                            <ShoppingBag size={20} className="me-2" style={{ marginTop: '-2px' }} />
                            Start Shopping
                        </button>
                    </div>
                )}

                {/* Products Grid */}
                {favorites.length > 0 && (
                    <div className="row g-4">
                        {favorites.map((product) => {
                            const averageRating = product.averageRating;
                            const imageUrl = product.productImage?.[0]?.url || 'https://via.placeholder.com/500';
                            const inStock = product.productStock > 0;

                            return (
                                <div key={product._id} className="col-6 col-md-4 col-lg-3">
                                    <div className="product-card h-100 position-relative" 
                                         style={{ 
                                           background: 'white',
                                           borderRadius: '20px',
                                           overflow: 'hidden',
                                           border: '1px solid #e2e8f0',
                                           transform: removingId === product._id ? 'scale(0.95)' : 'scale(1)',
                                           opacity: removingId === product._id ? 0.5 : 1,
                                           transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                         }}>

                                        {/* Remove Button */}
                                        <button 
                                            disabled={removingId === product._id}
                                            className="btn position-absolute border-0 d-flex align-items-center justify-content-center"
                                            onClick={() => removeFromWishList(product.id)}
                                            style={{ 
                                              top: '12px',
                                              right: '12px',
                                              width: '36px', 
                                              height: '36px', 
                                              background: 'rgba(255, 255, 255, 0.95)', 
                                              backdropFilter: 'blur(10px)',
                                              borderRadius: '50%',
                                              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                              zIndex: 10,
                                              transition: 'all 0.2s ease'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = '#fee2e2';
                                                e.currentTarget.style.transform = 'scale(1.1)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
                                                e.currentTarget.style.transform = 'scale(1)';
                                            }}>
                                            {removingId === product._id ? (
                                                <span className="spinner-border spinner-border-sm" role="status" style={{ width: '16px', height: '16px' }}></span>
                                            ) : (
                                                <X size={18} style={{ color: '#ef4444' }} />
                                            )}
                                        </button>

                                        {/* Product Image */}
                                        <div className="position-relative overflow-hidden" style={{ height: '260px', background: '#f8fafc' }}>
                                            <img 
                                                src={imageUrl} 
                                                alt={product.productName}
                                                className="w-100 h-100 product-image"
                                                style={{ objectFit: 'cover', transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
                                            />
                                            
                                            {/* Stock Badge */}
                                            {!inStock && (
                                                <div className="position-absolute bottom-0 start-0 end-0 text-center py-2 text-white fw-semibold"
                                                     style={{ 
                                                         background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.4))', 
                                                         backdropFilter: 'blur(5px)',
                                                         fontSize: '0.85rem'
                                                     }}>
                                                    <Package size={16} className="me-2" />
                                                    Out of Stock
                                                </div>
                                            )}
                                        </div>

                                        {/* Product Info */}
                                        <div className="p-4">
                                            {/* Category Badge */}
                                            {product.productCategory && product.productCategory.length > 0 && (
                                                <div className="mb-2">
                                                    <span className="badge" style={{ 
                                                        background: '#f1f5f9', 
                                                        color: '#475569',
                                                        fontSize: '0.7rem',
                                                        fontWeight: '600',
                                                        padding: '4px 10px',
                                                        borderRadius: '6px',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.5px'
                                                    }}>
                                                        {product.productCategory[0]}
                                                    </span>
                                                </div>
                                            )}

                                            {/* Product Name */}
                                            <h5 className="fw-bold mb-2" style={{ 
                                                fontSize: '1rem', 
                                                lineHeight: '1.4',
                                                color: '#1e293b',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden'
                                            }}>
                                                {product.productName}
                                            </h5>
                                           
                                            {/* Rating */}
                                            {product.productRating && product.productRating.length > 0 && (
                                                <div className="d-flex align-items-center mb-3">
                                                    <div className="d-flex align-items-center me-2" style={{
                                                        background: '#fef3c7',
                                                        padding: '2px 8px',
                                                        borderRadius: '6px'
                                                    }}>
                                                        <Star size={14} fill="#f59e0b" color="#f59e0b" className="me-1" />
                                                        <span className="fw-bold" style={{ fontSize: '0.85rem', color: '#92400e' }}>
                                                            {averageRating}
                                                        </span>
                                                    </div>
                                                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                                                        ({product.productRating.length})
                                                    </span>
                                                </div>
                                            )}

                                            {/* Price */}
                                            <div className="mb-3">
                                                <div className="d-flex align-items-baseline gap-2 mb-1">
                                                    <span className="fs-4 fw-bold" style={{ color: '#0f172a' }}>
                                                        ₹{product.productPrice.toFixed(2)}
                                                    </span>
                                                    {product.originalPrice && product.originalPrice > product.productPrice && (
                                                        <span className="text-decoration-line-through" style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                                                            ₹{product.originalPrice.toFixed(2)}
                                                        </span>
                                                    )}
                                                </div>
                                                {product.originalPrice && product.originalPrice > product.productPrice && (
                                                    <div>
                                                        <span className="badge" style={{
                                                            background: '#dcfce7',
                                                            color: '#15803d',
                                                            fontSize: '0.75rem',
                                                            fontWeight: '600',
                                                            padding: '3px 8px',
                                                            borderRadius: '6px'
                                                        }}>
                                                            Save ₹{(product.originalPrice - product.productPrice).toFixed(2)}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Low Stock Warning */}
                                            {inStock && product.productStock <= 5 && (
                                                <p className="mb-3" style={{ 
                                                    fontSize: '0.8rem',
                                                    color: '#f59e0b',
                                                    background: '#fef3c7',
                                                    padding: '6px 10px',
                                                    borderRadius: '8px',
                                                    fontWeight: '600'
                                                }}>
                                                    ⚡ Only {product.productStock} left!
                                                </p>
                                            )}

                                            {/* Add to Cart Button */}
                                            <button 
                                                disabled={!inStock}
                                                onClick={() => addtocart(product.id)}
                                                className="btn w-100 fw-semibold py-2 border-0"
                                                style={{ 
                                                    background: inStock 
                                                        ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' 
                                                        : '#cbd5e1',
                                                    color: 'white',
                                                    borderRadius: '12px',
                                                    fontSize: '0.9rem',
                                                    transition: 'all 0.3s ease',
                                                    boxShadow: inStock ? '0 4px 12px rgba(99, 102, 241, 0.3)' : 'none'
                                                }}
                                                onMouseEnter={(e) => {
                                                    if (inStock) {
                                                      e.currentTarget.style.transform = 'translateY(-2px)';
                                                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(99, 102, 241, 0.4)';
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.transform = 'translateY(0)';
                                                    e.currentTarget.style.boxShadow = inStock ? '0 4px 12px rgba(99, 102, 241, 0.3)' : 'none';
                                                }}>
                                                <ShoppingBag size={16} className="me-2" style={{ marginTop: '-2px' }} />
                                                {inStock ? 'Add to Cart' : 'Out of Stock'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Continue Shopping CTA */}
                {favorites.length > 0 && (
                    <div className="text-center mt-5 pt-4">
                        <div className="mx-auto" style={{ maxWidth: '500px' }}>
                            <div className="p-5" style={{ 
                                background: 'linear-gradient(135deg, #fef3f2 0%, #fff1f2 100%)',
                                borderRadius: '24px',
                                border: '2px solid #fecaca'
                            }}>
                                <Sparkles size={32} className="mb-3" style={{ color: '#ec4899' }} />
                                <h4 className="fw-bold mb-3" style={{ color: '#0f172a' }}>
                                    Discover More Treasures
                                </h4>
                                <p className="mb-4" style={{ color: '#64748b', fontSize: '0.95rem' }}>
                                    Keep exploring and find more products you'll love
                                </p>
                                <button 
                                    onClick={taketohomepage} 
                                    className="btn btn-lg px-5 py-3 fw-semibold border-0"
                                    style={{ 
                                        background: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
                                        color: 'white',
                                        borderRadius: '50px',
                                        boxShadow: '0 10px 30px rgba(236, 72, 153, 0.3)',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-3px)';
                                        e.currentTarget.style.boxShadow = '0 15px 40px rgba(236, 72, 153, 0.4)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(236, 72, 153, 0.3)';
                                    }}>
                                    <ShoppingBag size={20} className="me-2" style={{ marginTop: '-2px' }} />
                                    Continue Shopping
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                .product-card {
                    cursor: pointer;
                }
                .product-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.12);
                    border-color: #cbd5e1;
                }
                .product-card:hover .product-image {
                    transform: scale(1.08);
                }
            `}</style>
        </div>
    );
};

export default FavoritesPage;