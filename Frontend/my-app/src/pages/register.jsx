import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser, updateUserInfo } from '../slice/slice.jsx';
import { showSuccess, showError } from '../utils/toast.jsx';
import { jwtDecode } from "jwt-decode";
import api, { setAccessToken } from '../api/axios.js';
import Login from './login.jsx';

const Register = ({ onClose }) => {
  const [showLogin, setShowLogin] = useState(false);
  const dispatch = useDispatch();
  const ref = useRef();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mobileNumber: '',
    address: {
      street: '',
      city: '',
      state: '',
      pincode: ''
    }
  });
  const [isLoading, setIsLoading] = useState(false);

  const closeModel = (e) => {
    if (e.target === ref.current) {
      onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleRegister = async (e) => {
    e?.preventDefault();
    
    if (!formData.firstName) {
      showError('First name is required');
      return;
    }
    if (!formData.lastName) {
      showError('Last name is required');
      return;
    }
    if (!formData.email) {
      showError('Email is required');
      return;
    }
    if (!formData.password) {
      showError('Password is required');
      return;
    }
    if (!formData.mobileNumber) {
      showError('Mobile number is required');
      return;
    }
    if (!formData.address.street) {
      showError('Street address is required');
      return;
    }
    if (!formData.address.city) {
      showError('City is required');
      return;
    }
    if (!formData.address.state) {
      showError('State is required');
      return;
    }
    if (!formData.address.pincode) {
      showError('Pincode is required');
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post('/user/register', formData);
      
      if (response.data.status === 'success' || response.data.message === 'account created successfully') {
        showSuccess('Registration Successful! Welcome To Shopfy');
        // Close register modal and show login modal
        onClose();
        setShowLogin(true);
      } else {
        showError('Registration Failed');
      }
      
    } catch (err) {
      showError('Please Try again after sometime');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwitchToLogin = () => {
    onClose(); // Close register modal first
    setShowLogin(true); // Then show login modal
  };

  return (
    <>
    <div 
      ref={ref} 
      onClick={closeModel} 
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)",
        backgroundColor: "rgba(0,0,0,.6)",
        WebkitBackdropFilter: 'blur(8px)',
        backdropFilter: 'blur(8px)',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1051,
        padding: "1rem",
        animation: "fadeIn 0.3s ease-in-out"
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .register-modal {
          animation: slideUp 0.4s ease-out;
        }
        .form-control:focus {
          border-color: #6366f1 !important;
          box-shadow: 0 0 0 0.2rem rgba(99, 102, 241, 0.15) !important;
        }
        .gradient-btn {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          border: none;
          transition: all 0.3s ease;
        }
        .gradient-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(99, 102, 241, 0.3);
        }
        .gradient-btn:disabled {
          opacity: 0.7;
        }
        .input-icon {
          position: relative;
        }
        .form-control {
          transition: all 0.2s ease;
        }
        .form-control:focus {
          transform: translateY(-2px);
        }
        .link-button {
          cursor: pointer;
          display: inline;
        }
        .link-button:hover {
          text-decoration: underline;
        }
      `}</style>
      
      <div 
        className="bg-white rounded-4 shadow-lg position-relative register-modal" 
        style={{
          width: "100%",
          maxWidth: "600px",
          padding: "2rem",
          maxHeight: "90vh",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          border: "1px solid rgba(99, 102, 241, 0.1)"
        }} 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className='btn-close position-absolute' 
          style={{ 
            top: "1.5rem", 
            right: "1.5rem",
            opacity: 0.6
          }} 
          aria-label="Close"
        />
    
        <div className="text-center mb-4">
          <div 
            style={{
              width: "60px",
              height: "60px",
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem",
              boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)"
            }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <line x1="20" y1="8" x2="20" y2="14"></line>
              <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
          </div>
          <h2 className="fw-bold mb-2" style={{ fontSize: "1.75rem", color: "#1e293b" }}>Create Your Account</h2>
          <p className="text-muted mb-0">Join Shopfy and start shopping today</p>
        </div>
        
        <form onSubmit={handleRegister}>
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="firstName" className="form-label fw-semibold small" style={{ color: "#475569" }}>First Name</label>
              <input 
                type="text" 
                id="firstName" 
                name="firstName"
                placeholder='John' 
                className="form-control form-control-lg"
                style={{ 
                  borderRadius: "10px",
                  border: "2px solid #e2e8f0",
                  padding: "0.75rem 1rem"
                }}
                value={formData.firstName}
                onChange={handleChange}
                required
                disabled={isLoading}
                autoComplete="given-name"
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="lastName" className="form-label fw-semibold small" style={{ color: "#475569" }}>Last Name</label>
              <input 
                type="text" 
                id="lastName" 
                name="lastName"
                placeholder='Doe' 
                className="form-control form-control-lg"
                style={{ 
                  borderRadius: "10px",
                  border: "2px solid #e2e8f0",
                  padding: "0.75rem 1rem"
                }}
                value={formData.lastName}
                onChange={handleChange}
                required
                disabled={isLoading}
                autoComplete="family-name"
              />
            </div>
            
            <div className="col-12">
              <label htmlFor="email" className="form-label fw-semibold small" style={{ color: "#475569" }}>Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                placeholder='john.doe@example.com' 
                className="form-control form-control-lg"
                style={{ 
                  borderRadius: "10px",
                  border: "2px solid #e2e8f0",
                  padding: "0.75rem 1rem"
                }}
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoading}
                autoComplete="email"
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="password" className="form-label fw-semibold small" style={{ color: "#475569" }}>Password</label>
              <input 
                type="password" 
                id="password" 
                name="password"
                placeholder='••••••••' 
                className="form-control form-control-lg"
                style={{ 
                  borderRadius: "10px",
                  border: "2px solid #e2e8f0",
                  padding: "0.75rem 1rem"
                }}
                value={formData.password}
                onChange={handleChange}
                required
                disabled={isLoading}
                autoComplete="new-password"
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="mobileNumber" className="form-label fw-semibold small" style={{ color: "#475569" }}>Mobile Number</label>
              <input 
                type="tel" 
                id="mobileNumber" 
                name="mobileNumber"
                placeholder='+1 (555) 000-0000' 
                className="form-control form-control-lg"
                style={{ 
                  borderRadius: "10px",
                  border: "2px solid #e2e8f0",
                  padding: "0.75rem 1rem"
                }}
                value={formData.mobileNumber}
                onChange={handleChange}
                required
                disabled={isLoading}
                autoComplete="tel"
              />
            </div>

            <div className="col-12">
              <label htmlFor="street" className="form-label fw-semibold small" style={{ color: "#475569" }}>Street Address</label>
              <input 
                type="text" 
                id="street" 
                name="address.street"
                placeholder='123 Main Street, Apt 4B' 
                className="form-control form-control-lg"
                style={{ 
                  borderRadius: "10px",
                  border: "2px solid #e2e8f0",
                  padding: "0.75rem 1rem"
                }}
                value={formData.address.street}
                onChange={handleChange}
                required
                disabled={isLoading}
                autoComplete="street-address"
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="city" className="form-label fw-semibold small" style={{ color: "#475569" }}>City</label>
              <input 
                type="text" 
                id="city" 
                name="address.city"
                placeholder='New York' 
                className="form-control form-control-lg"
                style={{ 
                  borderRadius: "10px",
                  border: "2px solid #e2e8f0",
                  padding: "0.75rem 1rem"
                }}
                value={formData.address.city}
                onChange={handleChange}
                required
                disabled={isLoading}
                autoComplete="address-level2"
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="state" className="form-label fw-semibold small" style={{ color: "#475569" }}>State</label>
              <input 
                type="text" 
                id="state" 
                name="address.state"
                placeholder='NY' 
                className="form-control form-control-lg"
                style={{ 
                  borderRadius: "10px",
                  border: "2px solid #e2e8f0",
                  padding: "0.75rem 1rem"
                }}
                value={formData.address.state}
                onChange={handleChange}
                required
                disabled={isLoading}
                autoComplete="address-level1"
              />
            </div>

            <div className="col-12">
              <label htmlFor="pincode" className="form-label fw-semibold small" style={{ color: "#475569" }}>Pincode</label>
              <input 
                type="text" 
                id="pincode" 
                name="address.pincode"
                placeholder='10001' 
                className="form-control form-control-lg"
                style={{ 
                  borderRadius: "10px",
                  border: "2px solid #e2e8f0",
                  padding: "0.75rem 1rem"
                }}
                value={formData.address.pincode}
                onChange={handleChange}
                required
                disabled={isLoading}
                autoComplete="postal-code"
              />
            </div>
          </div>
          
          <button 
            type="submit"
            className="btn btn-lg w-100 mt-4 gradient-btn text-white fw-semibold" 
            style={{ 
              padding: "0.875rem",
              borderRadius: "10px",
              fontSize: "1rem",
              letterSpacing: "0.5px"
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Creating Your Account...
              </>
            ) : (
              <>
                Create Account
                <svg 
                  style={{ marginLeft: "8px", marginBottom: "2px" }}
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </>
            )}
          </button>
          
          <div className="text-center mt-4">
            <p className="text-muted mb-0">
              Already have an account?{' '}
              <span 
                className="text-decoration-none fw-semibold link-button" 
                style={{ color: "#6366f1" }}
                onClick={handleSwitchToLogin}
              >
                Sign In
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
    {showLogin && <Login onClose={() => setShowLogin(false)} />}
    </>
  );
};

export default Register;