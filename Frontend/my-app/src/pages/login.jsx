import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser, updateUserInfo } from '../slice/slice.jsx';
import { showSuccess, showError } from '../utils/toast.jsx';
import { jwtDecode } from "jwt-decode";
import api, { setAccessToken } from '../api/axios.js';
import Register from './register.jsx';

const Login = ({ onClose }) => {
  const dispatch = useDispatch();
  const ref = useRef();
  const [registerPage, setRegisterPage] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const closeModel = (e) => {
    if (e.target === ref.current) {
      onClose();
    }
  };

  const handleLogin = async (e) => {
    e?.preventDefault();
    if (!email) {
      showError('Email is required');
      return;
    }
    if (!password) {
      showError('Password is required');
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post('/user/login', {
        email: email,
        password: password
      });
      
      if (response.data.status === 'success' && response.data.data?.accessToken) {
        const accessToken = response.data.data.accessToken;
        
        // Set the access token (this will persist it)
        setAccessToken(accessToken);
        
        // Decode and update Redux state
        const decodedData = jwtDecode(accessToken);
        dispatch(loginUser(true));
        dispatch(updateUserInfo(decodedData));
        
        showSuccess('Login Successful! Welcome to Shopfy');
        onClose();
      } else {
        showError('Login failed. Please check your credentials.');
      }
      
    } catch (err) {
      console.error('Login error:', err);
      
      // More specific error messages
      if (err.response?.status === 401) {
        showError('Invalid email or password');
      } else if (err.response?.status === 400) {
        showError(err.response.data?.message || 'Invalid request');
      } else if (err.response?.data?.message) {
        showError(err.response.data.message);
      } else {
        showError('Login failed. Please try again later.');
      }
      
      // Don't close modal on error so user can retry
    } finally {
      setIsLoading(false);
    }
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
          backgroundColor: "rgba(0,0,0,.5)",
          WebkitBackdropFilter: 'blur(3px)',
          backdropFilter: 'blur(3px)',
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1050,
          padding: "1rem",
        }}
      >
        <div 
          className="bg-white rounded shadow-lg position-relative" 
          style={{
            width: "100%",
            maxWidth: "400px",
            padding: "1.5rem",
            maxHeight: "90vh",
            overflowY: "auto",
            WebkitOverflowScrolling: "touch"
          }} 
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={onClose} 
            className='btn-close position-absolute' 
            style={{ top: "1rem", right: "1rem" }} 
            aria-label="Close"
          />
      
          <h2 className="text-center mb-2 fw-bold fs-4">Welcome to Shopfy</h2>
          <p className="mb-3 text-center text-muted small">Please login to your account</p>
          
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label small">Email</label>
              <input 
                type="email" 
                id="email" 
                placeholder='Enter email' 
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                autoComplete="email"
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="password" className="form-label small">Password</label>
              <input 
                type="password" 
                id="password" 
                placeholder='Enter password' 
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                autoComplete="current-password"
              />
            </div>
            
            <button 
              type="submit"
              className="btn btn-primary w-100 py-2" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Signing in...
                </>
              ) : 'Sign In'}
            </button>
            
            <div className="text-center mt-2">
              <a href="#" className="text-decoration-none small" onClick={(e) => e.preventDefault()}>
                Forgot Password?
              </a>
            </div>
            
            <hr className="my-3"/>
            
            <div className="text-center">
              <p className="text-muted mb-0 small">
                Don't have an account? <a href="#" className="text-decoration-none fw-semibold" onClick={
                  (e) => {
                    e.preventDefault();
                    setRegisterPage(true);
                  }
                }>Sign Up</a>
              </p>
            </div>
          </form>
        </div>
      </div>
      
      {registerPage && (
        <Register onClose={() => {
          setRegisterPage(false);
          onClose();
        }} />
      )}
    </>
  );
};

export default Login;